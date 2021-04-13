<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use think\Db;
use think\Env;
use think\Cache;

class Index extends Frontend
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';
    protected $layout = '';

    public function index()
    {
        return $this->view->fetch('index');
    }

    public function xy1()
    {
        $value = Db::name('config')->where('name','xy1')->value('value');
        $this->view->assign('content',$value);
        return $this->view->fetch('xy1');
    }
    public function xy2(){
        $value = Db::name('config')->where('name','xy2')->value('value');
        $this->view->assign('content',$value);
        return $this->view->fetch('xy1');
    }
    public function pay()
    {
        $user = Db::name('app_user')->where('open_id',$_GET['open_id'])->find();
        if(!$user){
            exit('该商家收款码已失效');
        }
        $shop = Db::name('app_shop')->where('user_id',$user['id'])->find();
        if(!$shop){
            exit('该商家收款码已失效');
        }

        $this->view->assign('icon',substr($shop['image'],0,4)=="http" ? $shop['image'] : Db::name('config')->where('name','wx_pay_url')->value('value').'/'.$shop['image']);
        $this->view->assign('name',$shop['name']);
        $this->view->assign('open_id',$_GET['open_id']);
        $this->view->assign('appid',Env::get('small.wxpay_appid'));
        if (strstr($_SERVER['HTTP_USER_AGENT'], 'AlipayClient')) {
            $orderNo = Date('YmdHis').rand(100000,999999);
            $this->view->assign('orderNo',$orderNo);
            return $this->view->fetch('alipay');
        }else if(strstr($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger')){
            return $this->view->fetch('wxpay');
        }else {
            return $this->view->fetch('nopay');
        }
        die;
    }

    //生成 sha1 签名
    private function makeWxSha1Sign($arr){
        $str = "";
        //升序数组的键
        $keyArr = [];
        foreach ($arr as $k => $v) {
            array_push($keyArr,$k);
        }
        sort($keyArr);
        reset($keyArr);

        //升序数组的字符串拼接，删除signature
        foreach ($keyArr as $key => $value) {
            $linker = '';
            if($key!=0){
                $linker = '&';
            }
            $str .= $linker.$value.'='.$arr[$value];
        }
        //字符串SHA1
        $signature = sha1($str);
        return $signature;
    }

    //微信公众号 票据
    private function getWxTicket($access_token){
        $ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='.$access_token.'&type=jsapi';
        $ticketResp = file_get_contents($ticketUrl);
        if(!$ticketResp) die('ticket 获取失败');
        $ticketData = json_decode($ticketResp, true);
        if( isset($ticketData['ticket']) ){
            $ticket = $ticketData['ticket'];
            cache::set('wx_share_ticket',$ticket,7200);
            return $ticket;
        }else{
            die('ticket 解析错误');
        }

    }
    //微信公众号 token
    private function getWxAccessToken(){
        $tokeUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".Env::get('small.wxpay_appid')."&secret=".Env::get('small.wxpay_secret');
        $tokenResp = file_get_contents($tokeUrl);
        if(!$tokenResp) die('token 服务器返回失败');
        $tokenData = json_decode($tokenResp, true);
        if( !isset($tokenData['access_token']) ) die('access_token获取失败');
        return $tokenData['access_token'];
    }

    public function wxpaysuccess()
    {
        $signData['url']=Db::name('config')->where('name','wx_pay_url')->value('value')."/index.php/index/index/wxpaysuccess?out_trade_no=".$_GET['out_trade_no'];
        // var_dump(Db::name('config')->where('name','wx_pay_url')->value('value'));die;
        // string(94) "http://km.3kilometre.com//index.php/index/index/wxpaysuccess?out_trade_no=20210329235741949796"
        $ticket = '';

        // if($redis_ticket = Cache::get('wx_share_ticket')){
        //     echo 1;die;
        //     $ticket = $redis_ticket;
        // }else{
        //     echo 2;die;

        $access_token = $this->getWxAccessToken(); //获取微信access_token
        $ticket = $this->getWxTicket($access_token); //获取微信ticket
        // }
        $signData['jsapi_ticket'] = $ticket;
        $signData['noncestr'] = 'abs1004';
        $signData['timestamp'] = time();
        $sign = $this->makeWxSha1Sign($signData); // 生成微信签名
        $signData['sign'] = $sign;
        // var_dump($signData);die;

        $red = Db::name('app_account_log')->where('order_id',$_GET['out_trade_no'])->where('type',4)->value('amount');
        $red = sprintf('%.2f',$red);
        $this->view->assign('appid',Env::get('small.wxpay_appid'));
        $this->view->assign('signData',$signData);
        $this->view->assign('red',$red);
        $this->view->assign('out_trade_no',$_GET['out_trade_no']);
        return $this->view->fetch('wxpaysuccess');
    }
    public function alisuccess()
    {
        // 获取小程序码
        $access_token = getaccesstokensmall(Env::get('small.appid'),Env::get('small.secret'));
        $url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token={$access_token}";
        $param = json_encode([
            'scene'=>'orderNo_'.$_GET['out_trade_no'],
            'page'=>'pages/hbExchange/index',
        ]);
        $result = systemSendHttpsRequest($url,$param);
        $ercode = ROOT_PATH."public/uploads/qrcode/".$_GET['out_trade_no']."_alipay.jpeg";
        file_put_contents($ercode, $result);

        $red = Db::name('app_account_log')->where('order_id',$_GET['out_trade_no'])->where('type',4)->value('amount');
        $red = sprintf('%.2f',$red);
        $this->view->assign('red',$red);
        $this->view->assign('small',systemGetRequestHost()."/uploads/qrcode/".$_GET['out_trade_no']."_alipay.jpeg");
        return $this->view->fetch('alisuccess');
    }
    public function wxpay(){
        // 获取微信支付参数
        $appid=Env::get('small.wxpay_appid');
        $appsecret=Env::get('small.wxpay_secret');
        $code = $_POST['code'];
        $open_id = $_POST['open_id'];
        $shopUser = Db::name('app_user')->where('open_id',$open_id)->find();
        if(!$shopUser){
            exit(json_encode(['code'=>201,'msg'=>'该商家收款码已失效','data'=>[]]));
        }
        $shop = Db::name('app_shop')->where('user_id',$shopUser['id'])->find();
        if(!$shop) exit(json_encode(['code'=>201,'msg'=>'该商家收款码已失效','data'=>[]]));
        $proportion = Db::name('app_shop_proportion')->where('id',$shop['proportion_id'])->find();
        if(!$proportion) exit(json_encode(['code'=>201,'msg'=>'该商家收款配置失效','data'=>[]]));
        $price =$_POST['money'];
        $red = $price*($proportion['give_red_proportion']/100);//红包
        $rake = $price*($proportion['divide_proportion']/100);//抽成
        $amount = $price-$rake;//店铺收款金额
        $url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$appsecret."&code=".$code."&grant_type=authorization_code";
        //3.拉取用户的openid
        $res = file_get_contents($url);
        // $res = '{"access_token":"40_u3Ghj51gNTBKJaA347-_AiliABabRKcDXgJrsglft40CK_0bIne3JXHNcSPRoMN348XOYE0RXi8UNG8gXhZeXQ","expires_in":7200,"refresh_token":"40_7QzTRcsy65hLtFHXDblTJ5cM0pfnjE-ZKvG2d0bU76NwqzlOynLQhfJowRRTNefckAoeb5phJcrEXu6RYDCObA","openid":"oWsRB6kowHiHBBJGL56qtmQiqAKk","scope":"snsapi_userinfo"}';
        $res = json_decode($res,true);
        if(isset($res['errcode'])) exit(json_encode(['code'=>$res['errcode'],'msg'=>$res['errmsg']]));
        $orderSn = Date('YmdHis').rand(100000,999999);
        $open_id = $res['openid'];
        $response = file_get_contents('https://api.weixin.qq.com/sns/userinfo?access_token='.$res['access_token'].'&openid='.$res['openid']);
        $response = json_decode($response,true);
        $union_id = $response['unionid'];
        // $union_id = 'unionId';
        $user = Db::name('app_user')->where('union_id',$union_id)->find();
        $recieveData = [
            'user_id' => $shop['user_id'],
            'order_id' => $orderSn,
            'type' => 3,
            'balance_type' => 'amount',
            'amount' => $amount,
            'amount_actual' => $price,
            'amount_commission' => 0,
            'consumer_user_id' => 0,
            'consumer_account' => '',
            'pay_type' => 0,
            'income_type' => 0,
            'remark' => '店铺收款',
            'status' => 0,
            'createtime' => time(),
        ];
        $redData = [
            'user_id' => 0,
            'order_id' => $orderSn,
            'type' => 4,
            'balance_type' => 'balance',
            'amount' => $red,
            'amount_actual' => $price,
            'amount_commission' => 0,
            'consumer_user_id' => $shop['user_id'],
            'consumer_account' => '',
            'pay_type' => 0,
            'income_type' => 0,
            'union_id' => $union_id,
            'remark' => '买单送红包',
            'status' => 0,
            'createtime' => time(),
        ];
        if($user){
            $recieveData['consumer_user_id'] = $user['id'];
            $recieveData['consumer_account'] = $user['mobile'];
            $redData['user_id'] = $user['id'];
        }
        Db::name('app_account_log')->insert($redData);
        Db::name('app_account_log')->insert($recieveData);
        $type = 'buy';
        $wxpayRes = $this->runwxpay($type,intval($price*100),$open_id,$orderSn,$appid,Env::get('small.wxpay_mchid'),Env::get('small.wxpay_mchkey'),Env::get('small.wxpay_notify'));
        if($wxpayRes['errcode'] == 200){
            exit(json_encode(['code'=>$wxpayRes['errcode'],'msg'=>$wxpayRes['msg'],'data'=>$wxpayRes['data']]));
        }else{
            exit(json_encode(['code'=>$wxpayRes['errcode'],'msg'=>$wxpayRes['msg'],'data'=>[]]));
        }
    }

    function runwxpay($type,$total_fee,$open_id,$order_id,$appid,$mch_id,$mch_key,$notify_url)
    {

        if(empty($total_fee)){
            return $this->response([],201,'金额有误');
        }
        // app支付不需要传open_id
        if(empty($open_id)){
            return $this->response([],201,'登录失效，请重新登录(open_id参数有误)');
        }
        if(empty($order_id)){
            return $this->response([],201,'自定义订单有误');
        }
        // $appid = 'wx3e875d39bf8c5a80';//如果是公众号 就是公众号的appid;小程序就是小程序的appid;APP用APP应用的APPID;
        $body = '';//自定义内容
        switch($type){
            case 'buy':
                $body = '买单';
                break;
            default:
                return $this->response([],201,'订单类型错误');
                break;
        }
        $mch_id = $mch_id;//商户账号
        $KEY = $mch_key;//商户账号API安全密钥
        $sub_appid = ''; //当前调起支付的小程序APPID 服务商模式（受理机构模式）专用 不用请注释
        $sub_mch_id = ''; //微信支付分配的子商户号 服务商模式（受理机构模式）专用 不用请注释
        $nonce_str = stringGetRandom(32);//随机字符串

        // $nonce_str = '3L0jfP618ftHsmzWG58S4gJ9DMSemwIj';
        // $notify_url = urlencode('https://cswy.loveu.life/app/index.php?i=1&c=entry&a=wxcallback&do=setting&op=set&m=xfeng_community');
        $out_trade_no = $order_id;//商户订单号
        // $out_trade_no = '2017111715535389406433';//商户订单号
        $spbill_create_ip = $_SERVER['SERVER_ADDR'];

        // $spbill_create_ip = '127.0.0.1';

        $trade_type = 'JSAPI';//交易类型 默认JSAPI APP支付请填写APP，公众号相关的支付可填写（JSAPI，NATIVE）
        //这里是按照顺序的 因为下面的签名是按照(字典序)顺序 排序错误 肯定出错
        $post['appid'] = $appid;
        $post['body'] = $body;
        $post['mch_id'] = $mch_id;
        $post['nonce_str'] = $nonce_str;//随机字符串
        $post['notify_url'] = $notify_url;
        $post['openid'] = $open_id;
        $post['out_trade_no'] = $out_trade_no;
        $post['spbill_create_ip'] = $spbill_create_ip;//服务器终端的ip
        $post['total_fee'] = intval($total_fee); //总金额 最低为一分钱 必须是整数
        $post['trade_type'] = $trade_type;
        $sign = $this->MakeSign($post,$KEY); //签名
        $this->sign = $sign;
        $post_xml = '<xml>
<appid>' . $appid . '</appid>
<body>' . $body . '</body>
<mch_id>' . $mch_id . '</mch_id>
<nonce_str>' . $nonce_str . '</nonce_str>
<notify_url>' . $notify_url . '</notify_url>
<openid>' . $open_id . '</openid>
<out_trade_no>' . $out_trade_no . '</out_trade_no>
<spbill_create_ip>' . $spbill_create_ip . '</spbill_create_ip>
<total_fee>' . $total_fee . '</total_fee>
<trade_type>' . $trade_type . '</trade_type>
<sign>' . $sign . '</sign>
</xml> ';
        //统一下单接口prepay_id
        $url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
        $xml = $this->http_request($url,$post_xml); //POST方式请求http
        $array = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
        // $array = $this->xml2array($xml); //将【统一下单】api返回xml数据转换成数组，全要大写
        if($array['return_code'] == 'SUCCESS' && $array['result_code'] == 'SUCCESS'){
            $time = time();
            $tmp = []; //临时数组用于签名
            $tmp['appId'] = $appid;
            $tmp['nonceStr'] = $nonce_str;
            $tmp['package'] = 'prepay_id=' . $array['prepay_id'];
            $tmp['signType'] = 'MD5';
            $tmp['timeStamp'] = "$time";
            $data['state'] = 1;
            $data['timeStamp'] = "$time"; //时间戳
            $data['nonceStr'] = $nonce_str; //随机字符串
            $data['signType'] = 'MD5'; //签名算法，暂支持 MD5
            $data['package'] = 'prepay_id=' . $array['prepay_id']; //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
            $data['paySign'] = $this->MakeSign($tmp,$KEY); //签名,具体签名方案参见微信公众号支付帮助文档;
            $data['out_trade_no'] = $out_trade_no;
        }else{
            $data['state'] = 0;
            $data['text'] = "错误";
            $data['RETURN_CODE'] = $array['return_code'];
            $data['RETURN_MSG'] = $array['return_msg'];
        }
        // $data['toy_art_no'] = $toy_art_no;
        return $this->response($data,200,'操作成功');
    }


    /**
     * 生成签名, $KEY就是支付key
     * @return 签名
     */
    public function MakeSign($params,$KEY)
    {
        //签名步骤一：按字典序排序数组参数
        ksort($params);
        $string = $this->urlToParams($params); //参数进行拼接key=value&k=v
        // dump($string);die;

        //签名步骤二：在string后加入KEY
        $string = $string . "&key=" . $KEY;
        //签名步骤三：MD5加密
        $string = md5($string);
        //签名步骤四：所有字符转为大写
        $result = strtoupper($string);
        return $result;
    }

    /**
     * 将参数拼接为url: key=value&key=value
     * @param $params
     * @return string
     */
    public function urlToParams($params)
    {
        // file_put_contents('2.txt',json_encode($params).'-----',FILE_APPEND);
        $string = '';
        if(!empty($params)){
            $array = array();
            foreach($params as $key => $value){
                $array[] = $key . '=' . $value;
            }
            $string = implode("&",$array);
        }
        return $string;
    }

    /**
     * 调用接口， $data是数组参数
     * @return 签名
     */
    public function http_request($url,$data = null,$headers = array())
    {
        $curl = curl_init();
        if(count($headers) >= 1){
            curl_setopt($curl,CURLOPT_HTTPHEADER,$headers);
        }
        curl_setopt($curl,CURLOPT_URL,$url);
        curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,FALSE);
        curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,FALSE);
        if(!empty($data)){
            curl_setopt($curl,CURLOPT_POST,1);
            curl_setopt($curl,CURLOPT_POSTFIELDS,$data);
        }
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }

    //获取xml里面数据，转换成array
    private function xml2array($xml)
    {
        $p = xml_parser_create();
        xml_parse_into_struct($p,$xml,$vals,$index);
        xml_parser_free($p);
        $data = "";
        foreach($index as $key => $value){
            if($key == 'xml' || $key == 'XML') continue;
            $tag = $vals[$value[0]]['tag'];
            $value = $vals[$value[0]]['value'];
            $data[$tag] = $value;
        }
        return $data;
    }

    /**
     * 将xml转为array
     * @param string $xml
     * return array
     */
    public function xml_to_array($xml)
    {
        if(!$xml){
            return false;
        }
        //将XML转为array
        //禁止引用外部xml实体
        libxml_disable_entity_loader(true);
        $data = json_decode(json_encode(simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA)),true);
        return $data;
    }

    function post_data()
    {
        $receipt = $_REQUEST;
        if($receipt == null){
            $receipt = file_get_contents("php://input");
            if($receipt == null){
                $receipt = $GLOBALS['HTTP_RAW_POST_DATA'];
            }
        }
        return $receipt;
    }

    // 回调
    function wxcallback()
    {
        $post = $this->post_data(); //接受POST数据XM L个数
        //         $post = "<xml><appid><![CDATA[wx51a233b845ec6af8]]></appid>
        // <bank_type><![CDATA[OTHERS]]></bank_type>
        // <cash_fee><![CDATA[1]]></cash_fee>
        // <fee_type><![CDATA[CNY]]></fee_type>
        // <is_subscribe><![CDATA[Y]]></is_subscribe>
        // <mch_id><![CDATA[1605719307]]></mch_id>
        // <nonce_str><![CDATA[nrRzJMw0MUeEgVlIBcZp9ybnVfZys9sZ]]></nonce_str>
        // <openid><![CDATA[orfGs6r_iNjQDfcfGW_V-EtZ-DvM]]></openid>
        // <out_trade_no><![CDATA[20210315141742420600]]></out_trade_no>
        // <result_code><![CDATA[SUCCESS]]></result_code>
        // <return_code><![CDATA[SUCCESS]]></return_code>
        // <sign><![CDATA[A8A625BA78A89E0FBA6BD3ED33F9B090]]></sign>
        // <time_end><![CDATA[20210315141745]]></time_end>
        // <total_fee>1</total_fee>
        // <trade_type><![CDATA[JSAPI]]></trade_type>
        // <transaction_id><![CDATA[4200000993202103155779748941]]></transaction_id>
        // </xml>";
        file_put_contents(ROOT_PATH . '1.txt',$post);
        // $this->return_success();
        $post_data = $this->xml_to_array($post);//微信支付成功，返回回调地址url的数据：XML转数组Array
        // dump($post_data);die;
        $postSign = $post_data['sign'];
        // unset($post_data['sign']);

        /* 微信官方提醒：
        * 商户系统对于支付结果通知的内容一定要做【签名验证】,
        * 并校验返回的【订单金额是否与商户侧的订单金额】一致，
        * 防止数据泄漏导致出现“假通知”，造成资金损失。
        */
        // ksort($post_data);// 对数据进行排序
        // $str = $this->urlToParams($post_data);//对数组数据拼接成key=value字符串
        // dump($str);die;
        // $user_sign = strtoupper(md5($str)); //再次生成签名，与$postSign比较
        // dump($user_sign);die;
        // 查询订单
        $order = Db::name('app_account_log')->where([
            'order_id' => $post_data['out_trade_no'],
            'type' => '3',
            'balance_type' => 'amount',
            'user_id' => ['>',0],
        ])->find();
        if(!$order) $this->return_fail($post_data['out_trade_no'],'未查询到订单');
        if($order['status'] != 0)  $this->return_fail($post_data['out_trade_no'],'订单已处理');
        // 获取商家比例
        $proportion = Db::name('app_account_log')->alias('order')
            ->join('app_shop shop','shop.user_id = order.user_id','left')
            ->join('app_shop_proportion proportion','proportion.id = shop.proportion_id','left')
            ->where('order.order_id',$post_data['out_trade_no'])
            ->where('order.type','3')
            ->field('proportion.*')
            ->find();
        // ->select(false);
        // var_dump($proportion);die;
        if(!$proportion) $this->return_fail($post_data['out_trade_no'],'proportion not find');
        // 获取商家推广人
        $shop = Db::name('app_shop')->where('user_id',$order['user_id'])->find();
        if(!$shop) $this->return_fail($post_data['out_trade_no'],'shop not find');
        $inv = Db::name('app_user')->where('id',$shop['inv_user_id'])->find(); //直推人
        if(!$inv) $this->return_fail($post_data['out_trade_no'],'inv not find');
        $data = [
            'inv' => 0,
            'inv_user_id' => 0,
            'area' => 0,
            'area_user_id' => 0,
            'city' => 0,
            'city_user_id' => 0,
        ];
        if($inv['roles'] == 4){
            $agent = Db::name('app_agent')->where('user_id',$inv['id'])->find();
            if($agent['city'] == $shop['city_id']){
                //市代直推
                $data['city'] = 2;
                $data['city_user_id'] = $inv['id'];
            }else{
                // 市代跨区直推视为推广员
                $data['inv'] = 1;
                $data['inv_user_id'] = $inv['id'];
                // 区代
                $area = Db::name('app_agent')->where('area',$shop['area_id'])->where('roles',3)->find();
                if($area){
                    $data['area'] = '0.5';
                    $data['area_user_id'] = $area['user_id'];
                    $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                    if($city){
                        $data['city'] = '0.5';
                        $data['city_user_id'] = $city['user_id'];
                    }
                }else{
                    $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                    if($city){
                        $data['city'] = '1';
                        $data['city_user_id'] = $city['user_id'];
                    }
                }
            }
        }else if($inv['roles'] == 3){
            $agent = Db::name('app_agent')->where('user_id',$inv['id'])->find();
            if($agent['area'] == $shop['area_id']){
                //区代直推
                $data['area'] = '1.5';
                $data['area_user_id'] = $inv['id'];
                $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                if($city){
                    $data['city'] = '0.5';
                    $data['city_user_id'] = $city['user_id'];
                }
            }else{
                // 区代跨区直推视为推广员
                $data['inv'] = 1;
                $data['inv_user_id'] = $inv['id'];
                // 区代
                $area = Db::name('app_agent')->where('area',$shop['area_id'])->where('roles',3)->find();
                if($area){
                    $data['area'] = '0.5';
                    $data['area_user_id'] = $area['user_id'];
                    $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                    if($city){
                        $data['city'] = '0.5';
                        $data['city_user_id'] = $city['user_id'];
                    }
                }else{

                    $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                    if($city){
                        $data['city'] = '1';
                        $data['city_user_id'] = $city['user_id'];
                    }
                }
            }
        }else{
            $data['inv'] = 1;
            $data['inv_user_id'] = $inv['id'];
            // 区代
            $area = Db::name('app_agent')->where('area',$shop['area_id'])->where('roles',3)->find();
            if($area){
                $data['area'] = '0.5';
                $data['area_user_id'] = $area['user_id'];
                $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                if($city){
                    $data['city'] = '0.5';
                    $data['city_user_id'] = $city['user_id'];
                }
            }else{

                $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                if($city){
                    $data['city'] = '1';
                    $data['city_user_id'] = $city['user_id'];
                }
            }
        }

        $amount = $order['amount_actual'] - $order['amount'];

        // 商家收款
        Db::name('app_user')->where('id',$order['user_id'])->setInc($order['balance_type'],$order['amount']);
        Db::name('app_account_log')->where('order_id',$post_data['out_trade_no'])->where('type',3)->update([
            'status' => 1,
            'credittime' => time(),
        ]);
        if($data['inv'] > 0){
            // 推广员收益
            Db::name('app_user')->where('id',$data['inv_user_id'])->setInc('commission',$order['amount_actual']*$data['inv']/100);
            Db::name('app_user')->where('id',$data['inv_user_id'])->setInc('commission_accumulative',$order['amount_actual']*$data['inv']/100);
            Db::name('app_account_log')->insert([
                'user_id' => $data['inv_user_id'],
                'order_id' => $order['order_id'],
                'type' => 3,
                'income_type' => 0,
                'balance_type' => 'commission',
                'amount' => $order['amount_actual']*$data['inv']/100,
                'amount_actual' => $order['amount_actual']*$data['inv']/100,
                'consumer_user_id' => $order['consumer_user_id'],
                'consumer_account' => $order['consumer_account'],
                'pay_type' => $order['pay_type'],
                'remark' => '推广员收益',
                'status' => 1,
                'createtime' => time(),
                'credittime' => time(),
            ]);
        }

        if($data['area'] > 0){
            // 区代收益
            Db::name('app_user')->where('id',$data['area_user_id'])->setInc('commission',$amount*$data['area']/100);
            Db::name('app_user')->where('id',$data['area_user_id'])->setInc('commission_accumulative',$amount*$data['area']/100);
            Db::name('app_account_log')->insert([
                'user_id' => $data['area_user_id'],
                'order_id' => $order['order_id'],
                'type' => 3,
                'income_type' => 0,
                'balance_type' => 'commission',
                'amount' => $amount*$data['area']/100,
                'amount_actual' => $amount*$data['area']/100,
                'consumer_user_id' => $order['consumer_user_id'],
                'consumer_account' => $order['consumer_account'],
                'pay_type' => $order['pay_type'],
                'remark' => '区代收益',
                'status' => 1,
                'createtime' => time(),
                'credittime' => time(),
            ]);
        }
        if($data['city'] > 0){
            // 市代收益
            Db::name('app_user')->where('id',$data['city_user_id'])->setInc('commission',$amount*$data['city']/100);
            Db::name('app_user')->where('id',$data['city_user_id'])->setInc('commission_accumulative',$amount*$data['city']/100);
            Db::name('app_account_log')->insert([
                'user_id' => $data['city_user_id'],
                'order_id' => $order['order_id'],
                'type' => 3,
                'income_type' => 0,
                'balance_type' => 'commission',
                'amount' => $amount*$data['city']/100,
                'amount_actual' => $amount*$data['city']/100,
                'consumer_user_id' => $order['consumer_user_id'],
                'consumer_account' => $order['consumer_account'],
                'pay_type' => $order['pay_type'],
                'remark' => '市代收益',
                'status' => 1,
                'createtime' => time(),
                'credittime' => time(),
            ]);
        }
        // 用户红包
        $order = Db::name('app_account_log')->where([
            'order_id' => $post_data['out_trade_no'],
            'type' => '4',
            'balance_type' => 'balance',
            'user_id' => ['>',0],
        ])->find();
        if($order){
            Db::name('app_user')->where('id',$order['user_id'])->setInc($order['balance_type'],$order['amount']);
            if($order['balance_type'] == 'balance'){
                Db::name('app_user')->where('id',$order['user_id'])->setInc('balance_accumulative',$order['amount']);
            }
            if($order['balance_type'] == 'amount'){
                Db::name('app_user')->where('id',$order['user_id'])->setInc('amount_accumulative',$order['amount']);
            }
            Db::name('app_account_log')->where([
                'order_id' => $post_data['out_trade_no'],
                'type' => '4',
                'balance_type' => 'balance',
                'user_id' => ['>',0],
            ])->update([
                'status' => 1,
                'credittime' => time(),
            ]);
        }
        $this->return_success();
    }


    // 回调
    function wxcallback_promotor()
    {
        $post = $this->post_data(); //接受POST数据XM L个数
        //         $post = "<xml><appid><![CDATA[wx51a233b845ec6af8]]></appid>
        // <bank_type><![CDATA[OTHERS]]></bank_type>
        // <cash_fee><![CDATA[1]]></cash_fee>
        // <fee_type><![CDATA[CNY]]></fee_type>
        // <is_subscribe><![CDATA[Y]]></is_subscribe>
        // <mch_id><![CDATA[1605719307]]></mch_id>
        // <nonce_str><![CDATA[cDgLAeHcQa2LPq3k26upcg8GOUuVTKTe]]></nonce_str>
        // <openid><![CDATA[orfGs6r_iNjQDfcfGW_V-EtZ-DvM]]></openid>
        // <out_trade_no><![CDATA[20210309213609416933]]></out_trade_no>
        // <result_code><![CDATA[SUCCESS]]></result_code>
        // <return_code><![CDATA[SUCCESS]]></return_code>
        // <sign><![CDATA[145F4108F2EF7BC7AA566366DB83BDA6]]></sign>
        // <time_end><![CDATA[20210309213613]]></time_end>
        // <total_fee>1</total_fee>
        // <trade_type><![CDATA[JSAPI]]></trade_type>
        // <transaction_id><![CDATA[4200000992202103099938919600]]></transaction_id>
        // </xml>";
        file_put_contents(ROOT_PATH . '2345.txt',$post);
        // $this->return_success();


        // die;
        // $post = file_get_contents(ROOT_PATH.'1.txt');
        $post_data = $this->xml_to_array($post);//微信支付成功，返回回调地址url的数据：XML转数组Array
        // dump($post_data);die;
        $postSign = $post_data['sign'];
        // unset($post_data['sign']);

        /* 微信官方提醒：
        * 商户系统对于支付结果通知的内容一定要做【签名验证】,
        * 并校验返回的【订单金额是否与商户侧的订单金额】一致，
        * 防止数据泄漏导致出现“假通知”，造成资金损失。
        */
        // ksort($post_data);// 对数据进行排序
        // $str = $this->urlToParams($post_data);//对数组数据拼接成key=value字符串
        // dump($str);die;
        // $user_sign = strtoupper(md5($str)); //再次生成签名，与$postSign比较
        // dump($user_sign);die;
        // 查询订单
        $order = Db::name('app_order')->where([
            'order_sn' => $post_data['out_trade_no'],
            'status' => 0
        ])->update([
            'status' => 1,
            'paytime' => time(),
        ]);
        $this->return_success();
    }

    /*
    * 给微信发送确认订单金额和签名正确，SUCCESS信息 -xzz0521
    */
    private function return_success()
    {
        $return['return_code'] = 'SUCCESS';
        $return['return_msg'] = 'OK';
        $xml_post = '<xml>
<return_code>' . $return['return_code'] . '</return_code>
<return_msg>' . $return['return_msg'] . '</return_msg>
</xml>';
        echo $xml_post;
        exit;
    }

    /*
    * 错误
    */
    private function return_fail($ordernum,$error)
    {
        echo $error;die;
        Db::name('pay_error')->insert([
            'order_id' => $ordernum,
            'content' => $error,
            'created' => time(),
        ]);
        exit;
    }

    protected function response($data,$errcode,$msg)
    {
        return ['data' => $data,'errcode' => intval($errcode),'msg' => $msg];
    }
    function alicallback(){
        //         $_POST = json_decode('{
        //     "gmt_create": "2021-03-06 15:35:16",
        //     "charset": "UTF-8",
        //     "seller_email": "hzsglkj@163.com",
        //     "subject": "购物",
        //     "sign": "uc823wcqeB6Zu0upKOpMJmR3sRmCtx7ad0lQZVkc9b3rurzJKllAjGY06lIvlZkTFbrJr5JrE3h6sC/jzIeEdQu7YRR1zTRsdZWOJ+AWL2Od2bf3BZKfM+Y3wP+UnQtX+ycyWARgFUIdqWLko9loBg0MBd10mXH/ZEbQoZJvwXKS3IJypg/g8eY4D4OzxkeSBjXb5wM2iNCgtBzhfoyk3aV+3t7TPDoovQXGg4Gqyi6qUtvukzRR/68OzE2mnH/vxA1CQydYDGsPKE7a+UXVAUqASy4a81a26B36xlV+dE9Br8poP3WAxBLSP1OLnboA0G/ZuYBBodkajOyQ+pHW9A==",
        //     "body": "购买商品",
        //     "buyer_id": "2088902537105060",
        //     "invoice_amount": "1.00",
        //     "notify_id": "2021030600222153517005061432792824",
        //     "fund_bill_list": "[{\"amount\":\"1.00\",\"fundChannel\":\"ALIPAYACCOUNT\"}]",
        //     "notify_type": "trade_status_sync",
        //     "trade_status": "TRADE_SUCCESS",
        //     "receipt_amount": "1.00",
        //     "buyer_pay_amount": "1.00",
        //     "app_id": "2019041263833732",
        //     "sign_type": "RSA2",
        //     "seller_id": "2088431979012864",
        //     "gmt_payment": "2021-03-06 15:35:17",
        //     "notify_time": "2021-03-06 15:35:17",
        //     "version": "1.0",
        //     "out_trade_no": "20210306153508212857",
        //     "total_amount": "1.00",
        //     "trade_no": "2021030622001405061409398835",
        //     "auth_app_id": "2019041263833732",
        //     "buyer_logon_id": "189****6887",
        //     "point_amount": "0.00"
        // }',true);

        // vendor('alipay.AopSdk');
        // $aop = new \AopClient();
        // $aop->alipayrsaPublicKey = C('RAS_PUBLIC_KEY');
        // $res = $aop->rsaCheckV1($_POST, NULL, "RSA2");
        file_put_contents('alipayReturn2.txt',json_encode($_POST));
        // die;
        //         $_POST = json_decode('{
        //     "gmt_create": "2021-03-05 15:52:40",
        //     "charset": "UTF-8",
        //     "seller_email": "hzsglkj@163.com",
        //     "subject": "购物",
        //     "sign": "ZYJwrrFF63nednvjQQKbn/KTkkarLmCaqFga+bQvCGnNgfCAnJqo1UmP6V2y2Ixz2q5WsZlkR2rCKeFxR+4vcSqvCcbNHU3FirQticN4XFoeB7qLArIcmCCHNmZVSB91P6No7e1/A7SbWliHHp6vzmU8REMwJTjDHilv6x1dzL2Jcvk/oABA3qgDWTWo1nefTafwQzaqMEXmo/NnTuHBb1w5tnB8Sq0xhNnisLhR8ThqqZ0xQoghTu7lockBEoT6FR/9gbiY25WMj81pkntVhYrF4hwzDQPP01rgk5NyHMn/0F1fVYXoLaMW5XKg7vYYjZwCf1RNQXJGjrt7O+a0pA==",
        //     "body": "购买商品",
        //     "buyer_id": "2088912334294113",
        //     "invoice_amount": "0.01",
        //     "notify_id": "2021030500222155241094111442069962",
        //     "fund_bill_list": "[{\"amount\":\"0.01\",\"fundChannel\":\"PCREDIT\"}]",
        //     "notify_type": "trade_status_sync",
        //     "trade_status": "TRADE_SUCCESS",
        //     "receipt_amount": "0.01",
        //     "buyer_pay_amount": "0.01",
        //     "app_id": "2019041263833732",
        //     "sign_type": "RSA2",
        //     "seller_id": "2088431979012864",
        //     "gmt_payment": "2021-03-05 15:52:41",
        //     "notify_time": "2021-03-05 15:55:01",
        //     "version": "1.0",
        //     "out_trade_no": "20210305155231455112",
        //     "total_amount": "0.01",
        //     "trade_no": "2021030522001494111418526284",
        //     "auth_app_id": "2019041263833732",
        //     "buyer_logon_id": "768***@qq.com",
        //     "point_amount": "0.00"
        // }',true);
        // dump($_POST);die;
        $post_data = $_POST;
        if(($_POST['trade_status'] == 'TRADE_SUCCESS' || $_POST['trade_status'] == 'TRADE_FINISHED')){
            Db::name('app_account_log')->where('order_id',$post_data['out_trade_no'])->update([
                'ali_open_id' => $post_data['buyer_id'],
            ]);
            // 查询订单
            $order = Db::name('app_account_log')->where([
                'order_id' => $post_data['out_trade_no'],
                'type' => '3',
                'balance_type' => 'amount',
                'user_id' => ['>',0],
            ])->find();
            if(!$order) exit('未查询到订单');
            // 获取商家比例
            $proportion = Db::name('app_account_log')->alias('order')
                ->join('app_shop shop','shop.user_id = order.user_id','left')
                ->join('app_shop_proportion proportion','proportion.id = shop.proportion_id','left')
                ->where('order.order_id',$post_data['out_trade_no'])
                ->where('order.type','3')
                ->field('proportion.*')
                ->find();
            // ->select(false);
            // var_dump($proportion);die;
            if(!$proportion) $this->return_fail($post_data['out_trade_no'],'proportion not find');
            // 获取商家推广人
            $shop = Db::name('app_shop')->where('user_id',$order['user_id'])->find();
            if(!$shop) exit('shop not find');
            $inv = Db::name('app_user')->where('id',$shop['inv_user_id'])->find(); //直推人
            if(!$inv) exit('inv not find');
            $data = [
                'inv' => 0,
                'inv_user_id' => 0,
                'area' => 0,
                'area_user_id' => 0,
                'city' => 0,
                'city_user_id' => 0,
            ];
            if($inv['roles'] == 4){
                $agent = Db::name('app_agent')->where('user_id',$inv['id'])->find();
                if($agent['city'] == $shop['city_id']){
                    //市代直推
                    $data['city'] = 2;
                    $data['city_user_id'] = $inv['id'];
                }else{
                    // 市代跨区直推视为推广员
                    $data['inv'] = 1;
                    $data['inv_user_id'] = $inv['id'];
                    // 区代
                    $area = Db::name('app_agent')->where('area',$shop['area_id'])->where('roles',3)->find();
                    if($area){
                        $data['area'] = '0.5';
                        $data['area_user_id'] = $area['user_id'];
                        $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                        if($city){
                            $data['city'] = '0.5';
                            $data['city_user_id'] = $city['user_id'];
                        }
                    }else{
                        $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                        if($city){
                            $data['city'] = '1';
                            $data['city_user_id'] = $city['user_id'];
                        }
                    }
                }
            }else if($inv['roles'] == 3){
                $agent = Db::name('app_agent')->where('user_id',$inv['id'])->find();
                if($agent['area'] == $shop['area_id']){
                    //区代直推
                    $data['area'] = '1.5';
                    $data['area_user_id'] = $inv['id'];
                    $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                    if($city){
                        $data['city'] = '0.5';
                        $data['city_user_id'] = $city['user_id'];
                    }
                }else{
                    // 区代跨区直推视为推广员
                    $data['inv'] = 1;
                    $data['inv_user_id'] = $inv['id'];
                    // 区代
                    $area = Db::name('app_agent')->where('area',$shop['area_id'])->where('roles',3)->find();
                    if($area){
                        $data['area'] = '0.5';
                        $data['area_user_id'] = $area['user_id'];
                        $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                        if($city){
                            $data['city'] = '0.5';
                            $data['city_user_id'] = $city['user_id'];
                        }
                    }else{

                        $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                        if($city){
                            $data['city'] = '1';
                            $data['city_user_id'] = $city['user_id'];
                        }
                    }
                }
            }else{
                $data['inv'] = 1;
                $data['inv_user_id'] = $inv['id'];
                // 区代
                $area = Db::name('app_agent')->where('area',$shop['area_id'])->where('roles',3)->find();
                if($area){
                    $data['area'] = '0.5';
                    $data['area_user_id'] = $area['user_id'];
                    $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                    if($city){
                        $data['city'] = '0.5';
                        $data['city_user_id'] = $city['user_id'];
                    }
                }else{

                    $city = Db::name('app_agent')->where('city',$shop['city_id'])->where('roles',4)->find();
                    if($city){
                        $data['city'] = '1';
                        $data['city_user_id'] = $city['user_id'];
                    }
                }
            }
            $amount = $order['amount_actual'] - $order['amount'];
            // 商家收款
            Db::name('app_user')->where('id',$order['user_id'])->setInc($order['balance_type'],$order['amount']);
            if($data['inv'] > 0){
                // 推广员收益
                Db::name('app_user')->where('id',$data['inv_user_id'])->setInc('commission',$order['amount_actual']*$data['inv']/100);
                Db::name('app_user')->where('id',$data['inv_user_id'])->setInc('commission_accumulative',$order['amount_actual']*$data['inv']/100);
                Db::name('app_account_log')->insert([
                    'user_id' => $data['inv_user_id'],
                    'order_id' => $order['order_id'],
                    'type' => 3,
                    'income_type' => 0,
                    'balance_type' => 'commission',
                    'amount' => $order['amount_actual']*$data['inv']/100,
                    'amount_actual' => $order['amount_actual']*$data['inv']/100,
                    'consumer_user_id' => $order['consumer_user_id'],
                    'consumer_account' => $order['consumer_account'],
                    'pay_type' => $order['pay_type'],
                    'remark' => '推广员收益',
                    'status' => 1,
                    'createtime' => time(),
                    'credittime' => time(),
                ]);
            }
            if($data['area'] > 0){
                // 区代收益
                Db::name('app_user')->where('id',$data['area_user_id'])->setInc('commission',$amount*$data['area']/100);
                Db::name('app_user')->where('id',$data['area_user_id'])->setInc('commission_accumulative',$amount*$data['area']/100);
                Db::name('app_account_log')->insert([
                    'user_id' => $data['area_user_id'],
                    'order_id' => $order['order_id'],
                    'type' => 3,
                    'income_type' => 0,
                    'balance_type' => 'commission',
                    'amount' => $amount*$data['area']/100,
                    'amount_actual' => $amount*$data['area']/100,
                    'consumer_user_id' => $order['consumer_user_id'],
                    'consumer_account' => $order['consumer_account'],
                    'pay_type' => $order['pay_type'],
                    'remark' => '区代收益',
                    'status' => 1,
                    'createtime' => time(),
                    'credittime' => time(),
                ]);
            }
            if($data['city'] > 0){
                // 市代收益
                Db::name('app_user')->where('id',$data['city_user_id'])->setInc('commission',$amount*$data['city']/100);
                Db::name('app_user')->where('id',$data['city_user_id'])->setInc('commission_accumulative',$amount*$data['city']/100);
                Db::name('app_account_log')->insert([
                    'user_id' => $data['city_user_id'],
                    'order_id' => $order['order_id'],
                    'type' => 3,
                    'income_type' => 0,
                    'balance_type' => 'commission',
                    'amount' => $amount*$data['city']/100,
                    'amount_actual' => $amount*$data['city']/100,
                    'consumer_user_id' => $order['consumer_user_id'],
                    'consumer_account' => $order['consumer_account'],
                    'pay_type' => $order['pay_type'],
                    'remark' => '市代收益',
                    'status' => 1,
                    'createtime' => time(),
                    'credittime' => time(),
                ]);
            }

            Db::name('app_account_log')->where('order_id',$post_data['out_trade_no'])->where('type','3')->update([
                'status' => 1,
                'credittime' => time(),
            ]);
            // 用户红包
            $order = Db::name('app_account_log')->where([
                'order_id' => $post_data['out_trade_no'],
                'type' => 4,
                'balance_type' => 'balance',
            ])->find();
            if(!$order) exit('未查询到订单');
            $user = Db::name('app_user')->where('ali_open_id',$post_data['buyer_id'])->find();
            if($user){
                Db::name('app_user')->where('ali_open_id',$post_data['buyer_id'])->setInc($order['balance_type'],$order['amount']);
                if($order['balance_type'] == 'balance'){
                    Db::name('app_user')->where('ali_open_id',$post_data['buyer_id'])->setInc('balance_accumulative',$order['amount']);
                }
                if($order['balance_type'] == 'amount'){
                    Db::name('app_user')->where('ali_open_id',$post_data['buyer_id'])->setInc('amount_accumulative',$order['amount']);
                }
                Db::name('app_account_log')->where('order_id',$post_data['out_trade_no'])->where('type','4')->update([
                    'status' => 1,
                    'credittime' => time(),
                ]);
            }
            exit('success');
        }else{
            exit('error');
        }
    }

}

<?php
class Helper_wxclientpay
{
    private $_APPID = '';

    private $_MCHID = '';

    private $_WXKEY = '';

    private $_APPSECRET = '';

    /**
     * 返回请求的域名
     * @return string
     */
    static function systemGetRequestHost()
    {
        $http = (isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!='off')?'https://':'http://';
        $http = $http.$_SERVER['SERVER_NAME'];
        $port = $_SERVER["SERVER_PORT"]==80?'':':'.$_SERVER["SERVER_PORT"];
        $url = $http.$port;
        $host = $url.'/';
        return $host;
    }
    /**
     * 获取终端IP
     * @return Ambigous <string, unknown>
     */
    public static function get_ip()
    {
        if(isset($_SERVER['HTTP_X_REAL_IP']) && $_SERVER['HTTP_X_REAL_IP']<>'')
        {
            $onlineip = htmlentities($_SERVER['HTTP_X_REAL_IP']);
        }else if(isset($_SERVER['REMOTE_ADDR'])){
            $onlineip = $_SERVER['REMOTE_ADDR'];
        }else{
            $onlineip = '127.0.0.1';
        }
        return $onlineip;
    }
    /**
     * 支付初始化
     * @param string $appid
     * @param string $mchid
     * @param string $wxkey
     * @param string $appsecret
     */
    function __construct($appid,$mchid,$wxkey,$appsecret)
    {
        $this->_APPID = trim($appid);
        $this->_MCHID = trim($mchid);
        $this->_WXKEY = trim($wxkey);
        $this->_APPSECRET = trim($appsecret);
        require_once "WxPay.Config.php";
        require_once "WxPay.Exception.php";
        require_once "WxPay.Data.php";
        require_once "WxPay.Api.php";
        // require_once 'wxpayapi.php';
    }
    /**
    * 统一下单 https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1
    * @param 用户openid,如果是公众号和网站下 $openid
    * @param 产品描述 $body
    * @param 产品价格，单位分 $money
    * @param 订单号 $out_trade_no
    * @param 下单类型 APP|JSAPI $trade_type
    * @param string 回调附加数据 $callbackData
    * @param string 回调地址 $notityUrl
    * @return array('code'=>0,'prepay_id'=>$result['prepay_id'],'msg'=>''); code==0可使用prepay_id
    */
    function pay($openid,$body,$total_fee,$out_trade_no,$trade_type,$callbackData ,$notityUrl )
    {
        // 调用微信进行支付
        WxPayConfig::$APPID = $this->_APPID;
        WxPayConfig::$APPSECRET = $this->_APPSECRET;
        WxPayConfig::$KEY = $this->_WXKEY;
        WxPayConfig::$MCHID = $this->_MCHID;
        // dump($callbackData);die;
        $Device_info='WEB';
        //给需要提交的必须参数赋值
        $wxpay = new WxPayUnifiedOrder();
        $wxpay->SetAppid($this->_APPID);//设置微信分配的公众账号ID
        $wxpay->SetMch_id($this->_MCHID);//设置微信支付分配的商户号
        $wxpay->SetDevice_info($Device_info);//设置微信支付分配的终端设备号，与下单一致
        $wxpay->SetBody(trim($body));//设置商品或支付单简要描述
        $wxpay->SetOut_trade_no($out_trade_no);//设置商户系统内部的订单号
        $wxpay->SetAttach($callbackData);//设置自定义数据
        $wxpay->SetTotal_fee(intval($total_fee));//设置订单总金额，单位为分，只能为整数
        $wxpay->SetSpbill_create_ip(self::get_ip());//终端ip
        $wxpay->SetNotify_url($notityUrl);//设置接收微信支付异步通知回调地址
        $wxpay->SetTrade_type($trade_type);//设置取值如下：JSAPI，NATIVE，APP
        $wxpay->SetOpenid($openid);//设置trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识

        $result =  WxPayApi::unifiedOrder($wxpay);//这里会设置nonce_str、sign
        if(is_array($result) && isset($result['result_code']) && $result['result_code'] == 'SUCCESS' && $result['appid'] == $this->_APPID ){
            $result = array('code'=>0,'prepay_id'=>$result['prepay_id'],'msg'=>'');
        }else{
            $result = array('code'=>4,'prepay_id'=>'','msg'=>$result['return_msg']);
        }
        return $result;
    }

    /**
    * 退款 https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_4&index=6
    * @param 微信订单号 $transaction_id   微信订单号
    * @param 商户订单号 $out_trade_no  商户系统内部的订单号
    * @param 商户退款单号 $out_refund_no  商户侧传给微信的退款单号
    * @param 订单总价，单位分 $total_fee
    * @param 退款总价，单位分 $refund_fee
    * @return array('code'=>0,'prepay_id'=>$result['prepay_id'],'msg'=>''); code==0可使用prepay_id
    *
    * 注意：curl错误代码58   需要设置商户证书路径为绝对路径
    */
    function refund($transaction_id,$out_trade_no,$out_refund_no,$total_fee,$refund_fee)
    {
        WxPayConfig::$APPID = $this->_APPID;
        WxPayConfig::$APPSECRET = $this->_APPSECRET;
        WxPayConfig::$KEY = $this->_WXKEY;
        WxPayConfig::$MCHID = $this->_MCHID;

        $wxpay = new WxPayRefund();
        $wxpay->SetAppid($this->_APPID);//设置微信分配的公众账号ID
        $wxpay->SetMch_id($this->_MCHID);//设置微信支付分配的商户号
        $wxpay->SetTransaction_id($transaction_id);//设置微信订单号
        $wxpay->SetOut_trade_no($out_trade_no);//设置商户订单号
        $wxpay->SetOut_refund_no($out_refund_no);//设置商户退款单号
        $wxpay->SetTotal_fee(intval($total_fee));//设置订单总金额，单位为分，只能为整数
        $wxpay->SetRefund_fee(intval($refund_fee));//设置退款总金额，单位为分，只能为整数
        $wxpay->SetOp_user_id($this->_MCHID);//这个参数文档中没有，sdk中却是必填，填MCHID
        $result =  WxPayApi::refund($wxpay);//这里会设置nonce_str、sign

        if(is_array($result) && isset($result['result_code']) && $result['result_code'] == 'SUCCESS' && $result['appid'] == $this->_APPID ){
            $result = array('code'=>0,'msg'=>'success');
        }else{
            $result = array('code'=>4,'msg'=>$result['err_code_des']);
        }
        return $result;
    }


    /**
    * 企业付款到零钱 https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_4&index=6
    * @param 商户订单号 $order_id  商户系统内部的订单号
    * @param 个人open_id $open_id
    * @param 付款金额 $amount
    * @param 备注 $desc
    * @return array('code'=>0,'prepay_id'=>$result['prepay_id'],'msg'=>''); code==0可使用prepay_id
    *
    * 注意：curl错误代码58   需要设置商户证书路径为绝对路径
    */
    function transfers($order_id,$open_id,$amount,$desc)
    {
        WxPayConfig::$APPID = $this->_APPID;
        WxPayConfig::$APPSECRET = $this->_APPSECRET;
        WxPayConfig::$KEY = $this->_WXKEY;
        WxPayConfig::$MCHID = $this->_MCHID;

        $unifiedOrder = new WxPayUnifiedOrder();
        $param = [
            'mch_appid'        => $this->_APPID,
            'mchid'            => $this->_MCHID,
            'partner_trade_no' => $order_id,
            'openid'           => $open_id,
            'check_name'       => 'NO_CHECK',
            'amount'           => $amount,
            'desc'             => $desc,
            'spbill_create_ip' => $_SERVER['REMOTE_ADDR'],
        ];
        $unifiedOrder->SetValues($param);
        $unifiedOrder->SetNonce_str($this->getNonceStr());
        $unifiedOrder->SetSign();
        $xmlParam = $unifiedOrder->ToXml();

        $row = $this->postXmlCurl($xmlParam, 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers', true);
        $result = $unifiedOrder->FromXml($row);
        if(is_array($result) && isset($result['result_code']) && $result['result_code'] == 'SUCCESS' && $result['mch_appid'] == $this->_APPID ){
            $result = array('code'=>0,'msg'=>'success');
        }else{
            $result = array('code'=>4,'msg'=>'企业付款失败');
        }
        return $result;
    }


    


    /**
     * 获取客户端支付参数
     * @param 预支付订单号 $prePayid
     * @return array()
     */
    function getClientPayInfo($prePayid)
    {
        $param = array(
            'appid'=>$this->_APPID,
            'partnerid'=>$this->_MCHID,
            'prepayid'=>$prePayid,
            'package'=>"Sign=WXPay",
            'noncestr'=>self::getNonceStr(),
            'timestamp'=>time(),
        );
        ksort($param);
        $stringA = '';
        foreach ($param as $k=>$v){
            $stringA .= sprintf("%s=%s&",$k,$v);
        }
        $stringA = trim($stringA,'&');

        $stringA = $stringA ."&key=" . $this->_WXKEY;


        $sign = strtoupper(md5($stringA));

        $param['sign']= $sign;
        $param['packagevalue'] = $param['package'];
        unset($param['package']);
        return $param;
    }

    function getJsString($info)
    {
        return 'jmw://wxpayinfo/'.base64_encode(json_encode($info));
    }
    /**
     *
     * 产生随机字符串，不长于32位
     * @param int $length
     * @return 产生的随机字符串
     */
    public static function getNonceStr($length = 32)
    {
        $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        $str ="";
        for ( $i = 0; $i < $length; $i++ )  {
            $str .= substr($chars, mt_rand(0, strlen($chars)-1), 1);
        }
        return $str;
    }

    /**
     * 以post方式提交xml到对应的接口url
     * @param string $xml  需要post的xml数据
     * @param string $url  url
     * @param bool $useCert 是否需要证书，默认不需要
     * @param int $second   url执行超时时间，默认30s
     * @throws WxPayException
     */
    function postXmlCurl($xml, $url, $useCert = false, $second = 30){
        $ch = curl_init();
        //设置超时
        curl_setopt($ch, CURLOPT_TIMEOUT, $second);

        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,TRUE);
        //curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,2);//严格校验
        //设置header
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        //要求结果为字符串且输出到屏幕上
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        if($useCert == true){
            //设置证书
            //使用证书：cert 与 key 分别属于两个.pem文件
            //商户平台->账户中心->api安全->下载证书
            curl_setopt($ch,CURLOPT_SSLCERTTYPE,'PEM');
            curl_setopt($ch,CURLOPT_SSLCERT, '/data/wwwroot/fogotoy/apiclient_cert.pem');
            curl_setopt($ch,CURLOPT_SSLKEYTYPE,'PEM');
            curl_setopt($ch,CURLOPT_SSLKEY, '/data/wwwroot/fogotoy/apiclient_key.pem');
        }

        //post提交方式
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
        //运行curl
        $data = curl_exec($ch);
        //返回结果
        if($data){
            curl_close($ch);
            return $data;
        } else {
            $error = curl_errno($ch);
            curl_close($ch);
            throw new WxPayException("curl出错，错误码:$error");
        }
    }
}
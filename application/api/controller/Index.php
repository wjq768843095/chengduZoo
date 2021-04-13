<?php

namespace app\api\controller;

use app\common\controller\Api;
use think\Db;
use think\Env;
use app\admin\model\Area;
/**
 * 首页接口
 */
class Index extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    /**
     * 首页
     *
     */
    public function index()
    {
        $this->success('请求成功');
    }
    protected function successJson($data = [], $sign = '', $errorCode = '', $status = 'success', $errorMsg = '')
    {
        echo json_encode([
            'data' => $data,
            'sign' => $sign,
            'errorCode' => $errorCode,
            'status' => $status,
            'errorMsg' => $errorMsg,
        ]);
        die;
    }
    protected function errorJson($data = [], $sign = '', $errorCode = 201, $status = 'fail', $errorMsg = '')
    {
        echo json_encode([
            'data' => $data,
            'sign' => $sign,
            'errorCode' => $errorCode,
            'status' => $status,
            'errorMsg' => $errorMsg,
        ]);
        die;
    }
    public function advertisementListText(){
        $notice = Db::name('config')->where('name','app_notice')->value('value');
        $noticeEn = Db::name('config')->where('name','app_notice_en')->value('value');
        $banner = Db::name('config')->where('name','app_banner')->value('value');
        $data = [
            [
                "content" => $notice,
                "contentEn" => $noticeEn,
                "fontColor" => "red",
                "id" => 12,
                "imgUrl" => systemGetRequestHost().$banner,
                "isPoppingUp" => 0,
                "jumpUrl" => "",
                "noticeBar" => "block",
                "tags" => "",
                "title" => ""
            ]
        ];
        $this->successJson($data);

    }
    public function listSimpleSpotProducts(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['spotNo']) || !$params['spotNo']) $this->error('spotNo参数错误');
        $products = Db::name('app_goods')->order('id desc')->select();
        $data = [];
        foreach($products as $product){
            $data[] = [
                "bgColor" => "",
                "englishName" => $product['name_en'],
                "imgUrl" => systemGetRequestHost().$product['thumb_image'],
                "num" => 0,
                "payPrice" => $product['price'],
                "productApply" => $product['productApply'],
                "productApplyEn" => $product['productApplyEn'],
                "productName" => $product['name'],
                "productNo" => $product['id'],
                "productNotice" => $product['prompt'],
                "productNoticeEn" => $product['prompt_en'],
                "admissionTime" => $product['admissionTime'],
                "admissionTimeEn" => $product['admissionTimeEn'],
                "whetherUserId" => "0"
            ];
        }
        $this->successJson($data);
    }
    public function getSpot(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['spotNo']) || !$params['spotNo']) $this->error('spotNo参数错误');
        $banner = Db::name('config')->where('name','app_banner')->value('value');
        $descriptions = Db::name('config')->where('name','app_descriptions')->value('value');
        $latitude = Db::name('config')->where('name','app_latitude')->value('value');
        $longitude = Db::name('config')->where('name','app_longitude')->value('value');
        $closeHours = Db::name('config')->where('name','app_closeHours')->value('value');
        $openingHours = Db::name('config')->where('name','app_openingHours')->value('value');
        $spotAddress = Db::name('config')->where('name','app_spotAddress')->value('value');
        $spotCity = Db::name('config')->where('name','app_spotCity')->value('value');
        $spotIntroduct = Db::name('config')->where('name','app_spotIntroduct')->value('value');
        $spotLevel = Db::name('config')->where('name','app_spotLevel')->value('value');
        $spotName = Db::name('config')->where('name','app_spotName')->value('value');
        $spotNo = Db::name('config')->where('name','app_spotNo')->value('value');
        $spotPhone = Db::name('config')->where('name','app_spotPhone')->value('value');
        $data = [
            "closeHours" => $closeHours,
            "descriptions" => $descriptions,
            "floorPrice" => "0",
            "imgUrl" => systemGetRequestHost().$banner,
            "latitude" => $latitude,
            "longitude" => $longitude,
            "openTime" => $openingHours."-".$closeHours,
            "openingHours" => $openingHours,
            "spotAddress" => $spotAddress,
            "spotCity" => $spotCity,
            "spotIntroduct" => $spotIntroduct,
            "spotLevel" => $spotLevel,
            "spotName" => $spotName,
            "spotNo" => $spotNo,
            "spotPhone" => $spotPhone,
            "useType" => ""
        ];
        $this->successJson($data);

    }
    public function listSpotProducts(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['spotNo']) || !$params['spotNo']) $this->error('spotNo参数错误');
        if(!isset($params['openId']) || !$params['openId']) $this->error('openId参数错误');
        $data = [];
        // $data['']
        exit('{
	"data": {
		"special_announcement": [{
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "3333",
			"ticketTabContent": "4444"
		}],
		"instructions": "这里是内容",
		"ticket_features": [{
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "æ éæ¢ç¥¨",
			"ticketTabContent": "æ éæ¢ç¥¨ï¼ç´æ¥ç¨è®¢åéé¢çäºç»´ç æ«ç å¥å­ï¼æèç¨èº«ä»½è¯å·è¯å¥å­ã"
		}, {
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "éä¹°éç¨",
			"ticketTabContent": "21:00åå¯é¢å®ä»æ¥ç¥¨ï¼è´­ä¹°æåå21:00åå¯ä»¥æ£ç¥¨ã"
		}],
		"spotRecommends": [],
		"cost_description": [{
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "è´¹ç¨åå«",
			"ticketTabContent": "åäººä¸æ¬¡å¥å­åè§è´¹ç¨"
		}, {
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "The fee is inclusive",
			"ticketTabContent": "One-person one-time admission fee"
		}, {
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "å¤æ³¨",
			"ticketTabContent": "ç½ç»çµå­é¨ç¥¨ä¸æä¾åæ¢å®ç¥¨çªå£çº¸è´¨é¨ç¥¨ï¼éè¦çº¸è´¨é¨ç¥¨çæ¸¸å®¢å»ºè®®å°åç©é¦å®ç¥¨çªå£è´­ç¥¨"
		}],
		"refund_instruction": [{
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "",
			"ticketTabContent": "æªä½¿ç¨çç¥¨å¯éãUnused tickets are refundable"
		}],
		"spot_recommends": [{
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "",
			"ticketTabContent": "ä¸ºè´¯å½»è½å®ä¸­å¤®ãçãå¸å³äºåå¥½æ°å èºçå¸¸æåé²æ§å·¥ä½çç¸å³è¦æ±ï¼æ ¹æ®å½å¡é¢èé²èæ§æºå¶ç»¼åç»ãå³äºåå¥½2021å¹´åæ¦åæ¥èæé´æ°å èºçç«æé²æ§å·¥ä½çéç¥ãããåå·ç2021å¹´æ°å èºçç«æé²æ§å·¥ä½æåçéç¥ãï¼å·ç«æåã2021ã14å·ï¼ç­ä¸çº§é¨é¨ç¸å³è¦æ±ï¼ç»åç®åæå¸ç«æé²æ§å½¢å¿ï¼ç°å°æé¦å¨æ¥èæé´ï¼2021å¹´2æ10æ¥è³2æ28æ¥ï¼å¼æ¾ç¸å³äºé¡¹å¬åå¦ä¸ï¼       ä¸ãå¼æ¾æ¶é´ æ¯æ¥ä¸å9â¶00âæä¸22â¶00ï¼21â¶00åæ­¢å®ç¥¨ï¼åæ­¢å¥é¦ã       äºãé¢çº¦æ¹å¼ ï¼ä¸ï¼å³æ³¨éæ²éååç©é¦å¾®ä¿¡å¬ä¼å·âéæ²éååç©é¦âï¼æ ¹æ®åè§éæ±å¡«åç¸å³ä¿¡æ¯å®åé¢çº¦ã ï¼äºï¼æ æºè½è®¾å¤çç¾¤ä½å¯å°äººå·¥æå¡çªå£ç°åºå®åé¢çº¦ã ï¼ä¸ï¼ä¸ºåå¥½éå³°åè§ï¼æ¸¸å®¢å¯é¢çº¦ä¸ä¸ªæ¶æ®µï¼9ï¼00-13ï¼00ï¼26466äººï¼ï¼13ï¼00-17ï¼00ï¼30877äººï¼ï¼17ï¼00-21ï¼00ï¼30877äººï¼ã       ä¸ãç¥¨ä»·åè´­ç¥¨æ¹å¼ ï¼ä¸ï¼ç¥¨ä»· 1ãéæ²éååç©é¦å¨ä»·é¨ç¥¨70å/äºº.æ¬¡ã 2ãå¯¹6å¨å²ï¼ä¸å«6å¨å²ï¼â18å¨å²ï¼å«18å¨å²ï¼æªæå¹´äººãå¨æ¥å¶å¤§å­¦æ¬ç§åä»¥ä¸å­¦åå­¦çå­ææè¯ä»¶å®è¡åä»·ä¼æ ã 3ãä»¥ä¸äººç¾¤åè´¹ï¼ ï¼1ï¼æææè¯ä»¶çç¦»ä¼äººåãæ®ç¾äººï¼å«åæ®è¯ï¼ãå60å¨å²ä»¥ä¸ï¼å«60å¨å²ï¼èå¹´äººï¼æææè¯ä»¶çç°å½¹åäººï¼æè­¦å®è¯çå¬å®å¹²è­¦ï¼æé©å½çå£«è¯ä¹¦çé©å½çå±ï¼ææé½å¸æè²å±é¢åçãç¹çº§æå¸ï¼æ ¡é¿ï¼è£èªè¯ãçï¼ ï¼2ï¼ å¯¹6å¨å²ä»¥ä¸ï¼å«6å¨å²ï¼æèº«é«1.3ç±³ä»¥ä¸ï¼å«1.3ç±³ï¼çå¿ç«¥å®è¡åè´¹ï¼éç±çæ¤äººå­ç¥¨å¸¦é¢å¥é¦ï¼çæ¤äººä¸äº«ååè´¹ï¼ï¼  ï¼3ï¼å»å¡äººåç¸å³åè´¹ä¼æ  A.å¯¹ææææè¯ä»¶çå¨å½ï¼å«æ¸¯æ¾³å°å°åºï¼ææå»å¡å·¥ä½èæ¬äººå®è¡åè´¹ãå¯¹ä¸ºæå»ç«æä¸­å±¥èå°½è´£èæ®èçå»å¡äººåãä¸­å½äººæ°è§£æ¾åãäººæ°è­¦å¯ãç¤¾åºå·¥ä½èãæç»å·¥ä½ç»ãå¿æ¿èçç´ç³»äº²å±ï¼å­ææè¯æææå®è¡åè´¹ãå¯¹æç«ä¸çº¿å»çå«çäººåçç´ç³»äº²å±ï¼å­ç¸å³è¯æææå®è¡åè´¹ã B.å¯¹åå·çæ´éå»çééååå¶éè¡ç´ç³»äº²å±ï¼ç´ç³»äº²å±ä¸è¶è¿3äººï¼ï¼å­ç¸å³è¯æææå®è¡åè´¹ã       ï¼äºï¼è´­ç¥¨æ¹å¼ 1ãä½¿ç¨å¾®ä¿¡ææ¯ä»å®ç°åºæ«ç èªå©è´­ä¹°çµå­ç¥¨ã 2ãçº¿ä¸OTAå¹³å°ï¼ç¾å¢ãå¤§ä¼ç¹è¯ãæºç¨ãå»åªå¿ãåç¨ãé©´å¦å¦ç­ï¼è´­ä¹°çµå­ç¥¨ã 3ãéè¿âéæ²éååç©é¦âå®æ¹å¾®ä¿¡å¬ä¼å·è´­ç¥¨ã 4ãå­ææèº«ä»½è¯ä»¶å¨äººå·¥æå¡çªå£å®åè´­ç¥¨ã 5ãç¬¦ååè´¹æ¿ç­çè§ä¼å»ºè®®æåå°æé¦å®æ¹å¾®ä¿¡å¬ä¼å·ä¸å®åé¢çº¦ï¼æ æ³é¢çº¦èå¯æèº«ä»½è¯åä»¶éåç¸å³è¯ä»¶å°äººå·¥æå¡çªå£åæ¢å¥é¦å­è¯ã æ¸©é¦¨æç¤ºï¼ä¸ºé¿åäººåèéãåå°æ¥è§¦åæéæ¶é´ï¼å»ºè®®å¤§å®¶å°½éå¨çº¿ä¸è´­ç¥¨ï¼é¢çº¦ï¼ï¼é¨ç¥¨ï¼çº¸è´¨ç¥¨åçµå­ç¥¨ï¼å½æ¥ææï¼æ«ç ä½åºã       åãå¥é¦æµç¨ 1ãå®åè´­ç¥¨ 2ãåºç¤ºåå·å¤©åºå¥åº·éäºç»´ç ï¼æ«ææé¦åºæç ï¼ç»¿ç èåå¾æµæ¸©åºã 3ãè¿å¥æµæ¸©åºï¼ä½æ¸©æ­£å¸¸èåå¾æ£ç¥¨åºã 4ãç¨è´­ç¥¨æ¶å¡«åçèº«ä»½è¯æè´­ç¥¨äºç»´ç ï¼æ£ç¥¨è¿é¸å¥é¦ã       äºãæ¸¸è§é¡»ç¥ 1ãå¥é¦æ¸¸å®¢éç§¯æéåå·¥ä½äººåæ¯æ¥å¯¹å±ååå¬å±åºåçæ¶ææ¯ãæ¸æ´ç»´æ¤å·¥ä½ç­å·¥ä½ï¼ææåè§ï¼å±åè¥é ææãæ¸æ´ãèéãå®å¨çåè§ç¯å¢ã 2ãæ¸¸å®¢å¦å¨æ¸¸è§è¿ç¨ä¸­ï¼åºç°åç­æèº«ä½ä¸éç­æåµï¼è¯·åæ¶èç³»åç©é¦å·¥ä½äººåãå¯¹äºçä¼¼æ°å èºçæ£èï¼å°å¯¹å¶è¿è¡ä¸´æ¶éç¦»ï¼å¹¶ææå³è§å®æ¥ååå¤çã 3ãå ç«æé²æ§éè¦ï¼æé¦ä¸æ¥å¾æ¥èªéä½é£é©å°åºä¸æ 7æ¥åæ ¸é¸æ£æµé´æ§æ¥ååä½æ¸©é«äº37.3åº¦æ¸¸å®¢åè§ï¼æ¬è¯·è°è§£ã"
		}],
		"invoice_description": [{
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "åç¥¨è¯´æ",
			"ticketTabContent": "åéæ¨çè´­ç¥¨ä¿¡æ¯ï¼å¼ç¥¨èµæï¼æ¶ä»¶é®ç®±è³éæ²éåçµå­ç¥¨å¬ä¼å·ï¼èç³»åå°å®¢æå¸®æ¨å¤çã"
		}],
		"ticketSpecies": [{
			"bgColor": "",
			"englishName": "General Ticket",
			"imgUrl": "https://gopiao2.leleu.cn/files/jpg/58391daf21f04d55a70a00a88ff37cd1.jpg",
			"num": "0",
			"payPrice": 70.00,
			"productApply": "æäººï¼æ´å¤ä¿¡æ¯ï¼è¯·æ¥çé¢è®¢é¡»ç¥",
			"productName": "æäººç¥¨",
			"productNo": "61770767",
			"productNotice": "æ«ç å¥å­ æ æ³åæ¢çº¸è´¨é¨ç¥¨",
			"whetherUserId": "0"
		}, {
			"bgColor": "",
			"englishName": "Half-Price Ticket",
			"imgUrl": "https://gopiao2.leleu.cn/files/jpg/519d54f4c89747028c6c900bb44f9190.jpg",
			"num": "0",
			"payPrice": 35.00,
			"productApply": "å­¦ç,å¿ç«¥ï¼æ´å¤ä¿¡æ¯ï¼è¯·æ¥çé¢è®¢é¡»ç¥",
			"productName": "å¿ç«¥ãå­¦çç¥¨",
			"productNo": "88645542",
			"productNotice": "æ«ç å¥å­ æ æ³åæ¢çº¸è´¨é¨ç¥¨",
			"whetherUserId": "0"
		}],
		"packageTickets": [],
		"baggage_deposit": [{
			"ticketRuleCertificates": "",
			"ticketRuleContent": "",
			"ticketRuleType": "",
			"ticketTab": "",
			"ticketTabContent": ""
		}]
	},
	"sign": "4743ce32d775e8bb8ea3b4e28054530a",
	"errorCode": "",
	"status": "success",
	"errorMsg": ""
}');
    }

    public function getApp(){
        exit('{
	"data": {
		"bookDays": 30,
		"contactNumber": "",
		"isCheckHealthCode": "1",
		"spotNo": "13056873",
		"userName": "éæ²éåçµå­ç¥¨",
		"userNo": "260810",
		"version": "v1",
		"whetherRealName": "1"
	},
	"sign": "a85e2a9bfaf4a30ca7316faf0ad74628",
	"errorCode": "",
	"status": "success",
	"errorMsg": ""
}');
    }
    public function getSmallWechatOpenId(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['code']) || !$params['code']) $this->error('code参数错误');
        $appid = Env::get('small.appid');
        $secret = Env::get('small.secret');
        $grant_type = 'authorization_code';
        $js_code = $params['code'];
        $url = "https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$secret}&js_code={$js_code}&grant_type={$grant_type}";
        $res = json_decode(file_get_contents($url),true);
        if(isset($res['errcode'])){
            $this->error('授权失败');
        }
        $data['openid'] = $res['openid'];
        $data['session_key'] = $res['session_key'];
        $this->successJson(['openid' => $data['openid']]);
    }
    public function getUserInfo(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['openId']) || !$params['openId']) $this->error('openId参数错误');
        exit('{
	"data": {
		"nickName": "",
		"openid": "",
		"phoneNum": ""
	},
	"sign": "e6bb7002f2bf4955078cc06807ad550e",
	"errorCode": "",
	"status": "success",
	"errorMsg": ""
}');
    }
    public function listOrders(){
        // $this->checkNeedParam([
        //     'openId'=>'openId',
        //     'payStatus'=>'payStatus',//005002  005001
        //     'orderStatus'=>'orderStatus',//004001 004004
        // ]);
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['openId']) || !$params['openId']) $this->error('openId参数错误');
        $where = [];
        // 待支付
        if(isset($params['payStatus']) && $params['payStatus'] == "005002"){
            $where['status'] = 0;
        }
        // 待使用
        if(isset($params['payStatus']) && $params['payStatus'] == "005001"){
            $where['status'] = 1;
        }
        // 退款售后
        if(isset($params['orderStatus']) && $params['orderStatus'] == "004004"){
            $where['status'] = 3;
        }
        // <view style="margin-top:14px;color:#33a7e0 " wx:if="{{item.payStatus=='005001'&&item.orderStatus=='004007'}}">
        //         {{languageType==''?'出票中':''}}
        //     </view>
        //         <view style="margin-top:14px;color:#ff871c" wx:if="{{item.payStatus=='005002'}}">
        //         {{languageType==''?'未支付':''}}
        //     </view>
        //         <view style="margin-top:14px;color:#fa421d" wx:if="{{item.payStatus=='005001'&&item.orderStatus=='004777'}}">
        //         {{languageType==''?'出票失败':''}}
        //     </view>
        //         <view style="margin-top:14px;color:#646665" wx:if="{{item.payStatus=='005001'&&item.orderStatus=='004002'}}">
        //         {{languageType==''?'已使用':''}}
        //     </view>
        //         <view style="margin-top:14px;color:#07b461" wx:if="{{item.payStatus=='005001'&&item.orderStatus=='004001'}}">
        //         {{languageType==''?'待使用':''}}
        //     </view>
        //         <view style="margin-top:14px;color:#fa421d" wx:if="{{item.payStatus=='005001'&&item.orderStatus=='004004'}}">
        //         {{languageType==''?'已退款':''}}
        //     </view>
        $orderList = Db::name('app_order')->where('open_id',$params['openId'])->where($where)->order('id desc')->select();
        $data = [];
        foreach($orderList as $order){
            $payStatus = '005001';
            if($order['status'] == 0) $payStatus = '005002';
            $orderStatus = '';
            if($order['status'] == 1) $orderStatus = '004001';
            if($order['status'] == 2) $orderStatus = '004002';
            if($order['status'] == 3) $orderStatus = '004004';
            $refundStatus = '';
            if($order['status'] == 1) $refundStatus = '002777';
            $data[] = [
                'openId' => $order['open_id'],
                'orderNo' => $order['order_sn'],
                'orderStatus' => $orderStatus,
                'orders' => [
                    [
                    'customerName' => 'test01',
                    'eMail' => '',
                    'isQrCode' => '0',
                    'orderQuantity' => '1',
                    'orderStatus' => $orderStatus,
                    'payPrice' => sprintf('%.2f',$order['price']),
                    'playTime' => date('Y-m-d',$order['playtime']),
                    'productEnglishName' => $order['goods_name_en'],
                    'productImg' => systemGetRequestHost().$order['avatar'],
                    'productName' => $order['goods_name'],
                    'productNo' => $order['gid'],
                    'refundStatus' => $refundStatus,
                    'subOrderNo' => $order['order_sn_child'],
                    'totalAmount' => sprintf('%.2f',$order['price']),
                    ]
                ],
                'payStatus' =>$payStatus,
                'purchaseTime' => date('Y-m-d H:i:s',$order['createtime']),
                'spotName' => 'spotName',
                'totalAmount' => sprintf('%.2f',$order['price']),
            ];
        }
        $this->successJson($data);

    }
    public function getOrder(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['openId']) || !$params['openId']) $this->error('openId参数错误');
        if(!isset($params['orderNo']) || !$params['orderNo']) $this->error('orderNo参数错误');
        $order = Db::name('app_order')->where('order_sn_child',$params['orderNo'])->order('id desc')->find();
        $data = [];
        $payStatus = '005001';
        if($order['status'] == 0) $payStatus = '005002';
        $orderStatus = '';
        if($order['status'] == 1) $orderStatus = '004001';
        if($order['status'] == 2) $orderStatus = '004002';
        if($order['status'] == 3) $orderStatus = '004004';
        $refundStatus = '';
        if($order['status'] == 1) $refundStatus = '002777';
        //         exit('{
        // 	"data": {
        // 		"orders": [{
        // 			"customerName": "ä¸å®¶å¼º",
        // 			"customerUserIdSha256": "511123199310115156",
        // 			"eMail": "",
        // 			"electronicTicket": "566040958400309651",
        // 			"isQrCode": 0,
        // 			"orderQuantity": 1,
        // 			"orderStatus": "004001",
        // 			"orderVoucherno": "589663504",
        // 			"payPrice": 35.00,
        // 			"playTime": "2021-04-14",
        // 			"productEnglishName": "Half-Price Ticket",
        // 			"productImg": "https://gopiao2.leleu.cn/files/jpg/519d54f4c89747028c6c900bb44f9190.jpg",
        // 			"productName": "å¿ç«¥ãå­¦çç¥¨",
        // 			"productNo": "88645542",
        // 			"qrcodeUrl": "https://gopiao1.leleu.cn/files/Qrcode/b62642cb-9e55-450f-9ec4-8b8bbcbcff5f.jpg",
        // 			"refundStatus": "002001",
        // 			"subOrderNo": "3639368268991772",
        // 			"totalAmount": 35.00
        // 		}],
        // 		"payStatus": "005001",
        // 		"payType": "006001",
        // 		"purchaseTime": "2021-04-13 23:16:23",
        // 		"totalAmount": 35.00
        // 	},
        // 	"sign": "2545336372736ea91fe4afc16619d9a4",
        // 	"errorCode": "",
        // 	"status": "success",
        // 	"errorMsg": ""
        // }');
        $data = [
            'openId' => $order['open_id'],
            'orderNo' => $order['order_sn_child'],
            'orderStatus' => $orderStatus,
            'orders' => [
                [
                    'customerName' => 'test01',
                    'customerUserIdSha256' => $order['idcard'],
                    'electronicTicket' => $order['ercode_number'],
                    'eMail' => '',
                    'isQrCode' => '0',
                    'orderQuantity' => '1',
                    'orderStatus' => $orderStatus,
                    'payPrice' => sprintf('%.2f',$order['price']),
                    'playTime' => date('Y-m-d',$order['playtime']),
                    'productEnglishName' => $order['goods_name_en'],
                    'productImg' => systemGetRequestHost().$order['avatar'],
                    'productName' => $order['goods_name'],
                    'productNo' => $order['gid'],
                    'refundStatus' => $refundStatus,
                    "qrcodeUrl"=> "https://gopiao1.leleu.cn/files/Qrcode/b62642cb-9e55-450f-9ec4-8b8bbcbcff5f.jpg",
                    'subOrderNo' => $order['order_sn_child'],
                    'totalAmount' => sprintf('%.2f',$order['price']),
                ]
            ],
            'payStatus' =>$payStatus,
            'purchaseTime' => date('Y-m-d H:i:s',$order['createtime']),
            'spotName' => 'spotName',
            'totalAmount' => sprintf('%.2f',$order['price']),
        ];
        $this->successJson($data);
    }
    public function refundOrder(){
        exit('{
	"data": "{}",
	"sign": "8ce2bcfa4746a488ec4eca8f2ac4e985",
	"errorCode": "",
	"status": "success",
	"errorMsg": ""
}');
    }
    public function getUserPhoneNum(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['openId']) || !$params['openId']) $this->error('openId参数错误');
        if(!isset($params['encryptedData']) || !$params['encryptedData']) $this->error('encryptedData参数错误');
        if(!isset($params['iv']) || !$params['iv']) $this->error('iv参数错误');
        exit('{
	"data": "18227679394",
	"sign": "193a1918adff235461869fd892467f1c",
	"errorCode": "",
	"status": "success",
	"errorMsg": ""
}');
    }
    public function getHealthCode(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['name']) || !$params['name']) $this->error('name参数错误');
        if(!isset($params['idCardNo']) || !$params['idCardNo']) $this->error('idCardNo参数错误');
        $this->checkNeedParam([
            'name'=>'name',
            'idCardNo'=>'idCardNo',
        ]);
        exit('{
	"data": {
		"code": "200",
		"data": {
			"healthCode": "00",
			"healthMSG": ""
		},
		"msg": ""
	},
	"sign": "9df3e2c1551d7e195cb318c087e96e37",
	"errorCode": "",
	"status": "success",
	"errorMsg": ""
}');
    }

    public function createOrder(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['openId']) || !$params['openId']) $this->error('openId参数错误');
        if(!isset($params['customerPhone']) || !$params['customerPhone']) $this->error('customerPhone参数错误');
        if(!isset($params['customerName']) || !$params['customerName']) $this->error('customerName参数错误');
        $order_sn = date('YmdHis').rand(1000,9999);
        $playTime = time();
        if(isset($params['playTime'])){
            if($params['playTime'] == 'today') $playTime = time();
            else if($params['playTime'] == 'tomorrow') $playTime = time() + 3600*24;
            else if($params['playTime'] == 'aftertomorrow') $playTime = time() + 3600*24*2;
            else $playTime = strtotime($params['playTime']);
        }
        foreach($params['data'] as $info){
            $goods = Db::name('app_goods')->where('id',$info['productNo'])->find();
            if(!$goods) $this->errorJson('商品不存在');
            for($i=0;$i<$info['nums'];$i++){
                Db::name('app_order')->insert([
                    'open_id' => $params['openId'],
                    'gid' => $goods['id'],
                    'goods_name' => $goods['name'],
                    'goods_name_en' => $goods['name_en'],
                    'name' => $params['customerName'],
                    'mobile' => $params['customerPhone'],
                    'idcard' => $params['customerUserId'],
                    'avatar' => $goods['thumb_image'],
                    'order_sn' => $order_sn,
                    'order_sn_child' => date('YmdHis').rand(1000,9999),
                    'ercode_number' => date('YmdHis').rand(1000000,9999999),
                    'price' => $goods['price'],
                    'createtime' => time(),
                    'playtime' => $playTime,
                ]);
            }

        }
        $this->successJson(['orderNo' => $order_sn]);
    }
    public function wechatPay(){
        $params = json_decode(file_get_contents('php://input'),true);
        if(!isset($params['orderNo']) || !$params['orderNo']) $this->error('orderNo参数错误');
        if(!isset($params['openId']) || !$params['openId']) $this->error('openId参数错误');
        $orderList = Db::name('app_order')->where('order_sn',$params['orderNo'])->select();
        if(count($orderList) <= 0) $this->error('订单不存在');
        $total_fee = Db::name('app_order')->where('order_sn',$params['orderNo'])->sum('price');
        $total_fee = intval($total_fee * 100);
        $total_fee = 1;
        $this->pay('orderpay',$total_fee,$params['openId'],$params['orderNo']);
    }
    // 首先在服务器端调用微信【统一下单】接口，返回prepay_id和sign签名等信息给前端，前端调用微信支付接口
    //recharge 余额充值
    function pay($type,$total_fee,$open_id,$order_id){

        if(empty($total_fee)){
            $this->response([],201,'金额有误');
        }
        // app支付不需要传open_id
        if(empty($open_id)){
            $this->response([],201,'登录失效，请重新登录(open_id参数有误)');
        }
        if(empty($order_id)){
            $this->response([],201,'自定义订单有误');
        }
        $appid = Env::get('small.appid');//如果是公众号 就是公众号的appid;小程序就是小程序的appid;APP用APP应用的APPID;
        $body = '';//自定义内容
        switch ($type) {
            case 'orderpay':
                $body = '订单支付';
                break;
            default:
                $this->response([],201,'订单类型错误');
                break;
        }
        $mch_id = Env::get('small.wxpay_mchid');//商户账号
        $KEY = Env::get('small.wxpay_mchkey');//商户账号API安全密钥
        $sub_appid = ''; //当前调起支付的小程序APPID 服务商模式（受理机构模式）专用 不用请注释
        $sub_mch_id = ''; //微信支付分配的子商户号 服务商模式（受理机构模式）专用 不用请注释
        $nonce_str = stringGetRandom(32);//随机字符串
        // $nonce_str = '3L0jfP618ftHsmzWG58S4gJ9DMSemwIj';
        $notify_url = Env::get('small.wxpay_notify_promotor'); //支付完成回调地址url,不能带参数
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
        // dump($sign);die;
        $this->sign = $sign;
        $post_xml = '<xml>
        <appid>'.$appid.'</appid>
        <body>'.$body.'</body>
        <mch_id>'.$mch_id.'</mch_id>
        <nonce_str>'.$nonce_str.'</nonce_str>
        <notify_url>'.$notify_url.'</notify_url>
        <openid>'.$open_id.'</openid>
        <out_trade_no>'.$out_trade_no.'</out_trade_no>
        <spbill_create_ip>'.$spbill_create_ip.'</spbill_create_ip>
        <total_fee>'.$total_fee.'</total_fee>
        <trade_type>'.$trade_type.'</trade_type>
        <sign>'.$sign.'</sign>
        </xml> ';
        //统一下单接口prepay_id
        $url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
        $xml = $this->http_request($url,$post_xml); //POST方式请求http
        $array = $this->xml2array($xml); //将【统一下单】api返回xml数据转换成数组，全要大写
        if($array['RETURN_CODE'] == 'SUCCESS' && $array['RESULT_CODE'] == 'SUCCESS'){
            $time = time();
            $tmp=[]; //临时数组用于签名
            $tmp['appId'] = $appid;
            $tmp['nonceStr'] = $nonce_str;
            $tmp['package'] = 'prepay_id='.$array['PREPAY_ID'];
            $tmp['signType'] = 'MD5';
            $tmp['timeStamp'] = "$time";
            $data['state'] = 1;
            $data['timeStamp'] = "$time"; //时间戳
            $data['nonceStr'] = $nonce_str; //随机字符串
            $data['signType'] = 'MD5'; //签名算法，暂支持 MD5
            $data['package'] = 'prepay_id='.$array['PREPAY_ID']; //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
            $data['paySign'] = $this->MakeSign($tmp,$KEY); //签名,具体签名方案参见微信公众号支付帮助文档;
            $data['out_trade_no'] = $out_trade_no;
        }else{
            $data['state'] = 0;
            $data['text'] = "错误";
            $data['RETURN_CODE'] = $array['RETURN_CODE'];
            $data['RETURN_MSG'] = $array['RETURN_MSG'];
        }
        //         exit('{
        // 	"data": {
        // 		"timeStamp": "1617963574",
        // 		"package": "prepay_id=wx091819347257440266dcbff4f802420000",
        // 		"packageStr": "wx091819347257440266dcbff4f802420000",
        // 		"paySign": "23EA3F52A5842A0441DEDBBB9ED8938F",
        // 		"appId": "wx3f1ae219880fe419",
        // 		"signType": "MD5",
        // 		"nonceStr": "mxSLYHh9H537LZXZ7cnommuqINeFyJxh"
        // 	},
        // 	"sign": "b8c2842469eca29bf9bd1a64af909014",
        // 	"errorCode": "",
        // 	"status": "success",
        // 	"errorMsg": ""
        // }');
        $this->successJson([
            'appId' => $appid,
            'timeStamp' => $data['timeStamp'],
            'nonceStr' => $data['nonceStr'],
            'package' => $data['package'],
            'signType' => $data['signType'],
            'paySign' => $data['paySign'],
        ]);
    }



    /**
     * 生成签名, $KEY就是支付key
     * @return 签名
     */
    public function MakeSign( $params,$KEY){
        //签名步骤一：按字典序排序数组参数
        ksort($params);
        $string = $this->urlToParams($params); //参数进行拼接key=value&k=v
        // dump($string);die;

        //签名步骤二：在string后加入KEY
        $string = $string . "&key=".$KEY;
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
    public function urlToParams( $params ){
        // file_put_contents('2.txt',json_encode($params).'-----',FILE_APPEND);
        $string = '';
        if( !empty($params) ){
            $array = array();
            foreach( $params as $key => $value ){
                $array[] = $key.'='.$value;
            }
            $string = implode("&",$array);
        }
        return $string;
    }
    /**
     * 调用接口， $data是数组参数
     * @return 签名
     */
    public function http_request($url,$data = null,$headers=array())
    {
        $curl = curl_init();
        if( count($headers) >= 1 ){
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        }
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data)){
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }
    //获取xml里面数据，转换成array
    private function xml2array($xml){
        $p = xml_parser_create();
        xml_parse_into_struct($p, $xml, $vals, $index);
        xml_parser_free($p);
        $data = [];
        foreach ($index as $key=>$value) {
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
    public function xml_to_array($xml){
        if(!$xml){
            return false;
        }
        //将XML转为array
        //禁止引用外部xml实体
        libxml_disable_entity_loader(true);
        $data = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
        return $data;
    }

    function post_data(){
        $receipt = $_REQUEST;
        if($receipt==null){
            $receipt = file_get_contents("php://input");
            if($receipt == null){
                $receipt = $GLOBALS['HTTP_RAW_POST_DATA'];
            }
        }
        return $receipt;
    }
    // 回调
    function callback(){
        $post = $this->post_data(); //接受POST数据XM L个数
        // $post = "<xml><appid><![CDATA[wx437d1dd6a1fb2eca]]></appid>
        // <bank_type><![CDATA[CFT]]></bank_type>
        // <cash_fee><![CDATA[1]]></cash_fee>
        // <fee_type><![CDATA[CNY]]></fee_type>
        // <is_subscribe><![CDATA[N]]></is_subscribe>
        // <mch_id><![CDATA[1410707502]]></mch_id>
        // <nonce_str><![CDATA[wzYEkhRqFE7nC5vfTWgL1g5rgYYWv76M]]></nonce_str>
        // <openid><![CDATA[oESjm5X1bE2RjkSG9NFkBGrOs7LE]]></openid>
        // <out_trade_no><![CDATA[2018110114415933843288]]></out_trade_no>
        // <result_code><![CDATA[SUCCESS]]></result_code>
        // <return_code><![CDATA[SUCCESS]]></return_code>
        // <sign><![CDATA[9D8C4B089BA42E86A5EE4CB1D1AC1612]]></sign>
        // <time_end><![CDATA[20181101144221]]></time_end>
        // <total_fee>1</total_fee>
        // <trade_type><![CDATA[JSAPI]]></trade_type>
        // <transaction_id><![CDATA[4200000226201811012445474412]]></transaction_id>
        // </xml>";
        file_put_contents(ROOT_PATH.'1.txt',$post);
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
        $order = Db::name('app_order')->where('order_id',$post_data['out_trade_no'])->find();
        if(!$order) $this->return_fail($post_data['out_trade_no'],'未查询到订单');
        // 验证价格
        if(sprintf('%.2f',$order['price'])*100 == $post_data['total_fee']){
            $time = time();
            if($post_data['return_code']=='SUCCESS'&&$postSign){

                /*
                * 首先判断，订单是否已经更新为支付成功，因为微信会总共发送8次回调确认
                * 其次，订单已经支付，直接返回SUCCESS，否则更新后支付
                */
                if($order['status'] == 1){
                    $this->return_success();
                }else{
                    // 托管费
                    if($order['type'] == 'hosting'){
                        // Db::startTrans();
                        // try{
                        $toy = Db::name('app_toy')->where('toy_art_no',$order['toy_art_no'])->find();
                        if($toy && $toy['status'] == 0){
                            Db::name('app_toy')->where('toy_art_no',$order['toy_art_no'])->update([
                                'status' => 1,
                                'toy_status' => 'waitrent',
                                'hosting_reser_time' => $time,
                            ]);
                            sys_income('hosting',$order['hosting_fee'],'玩具托管费用',$time);
                        }else{
                            Db::name('app_pay_error')->insert([
                                'order_id' => $post_data['out_trade_no'],
                                'content' => '重复支付托管服务费的订单',
                                'created' => $time,
                            ]);
                        }
                        // Db::commit();
                        // } catch (\Exception $e) {
                        // Db::rollback();
                        // }
                    }

                    Db::name('app_order')->where('order_id',$post_data['out_trade_no'])->update([
                        'status' => 1,
                        'pay_time' => $time,
                    ]);
                    $this->return_success();
                }
            }
        }else{
            $this->return_fail($post_data['out_trade_no'],'价格验证失败');
        }
    }
    /*
    * 给微信发送确认订单金额和签名正确，SUCCESS信息 -xzz0521
    */
    private function return_success(){
        $return['return_code'] = 'SUCCESS';
        $return['return_msg'] = 'OK';
        $xml_post = '<xml>
        <return_code>'.$return['return_code'].'</return_code>
        <return_msg>'.$return['return_msg'].'</return_msg>
        </xml>';
        echo $xml_post;exit;
    }
    /*
    * 错误
    */
    private function return_fail($ordernum,$error){
        Db::name('pay_error')->insert([
            'order_id' => $ordernum,
            'content' => $error,
            'created' => time(),
        ]);
        exit;
    }

    protected function response($data,$errcode,$msg)
    {
        $result = ['data'=>$data,'errcode'=>intval($errcode),'msg'=>$msg];
        $result = json_encode($result,JSON_UNESCAPED_UNICODE);
        echo($result);die;
    }
}

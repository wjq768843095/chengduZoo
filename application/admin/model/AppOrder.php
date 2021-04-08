<?php

namespace app\admin\model;

use think\Model;


class AppOrder extends Model
{

    

    

    // 表名
    protected $name = 'app_order';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'status_text',
        'type_text',
        'verif_text',
        'effectivetime_text',
        'veriftime_text'
    ];
    

    
    public function getStatusList()
    {
        return ['0' => __('Status 0'), '1' => __('Status 1'), '2' => __('Status 2'), '3' => __('Status 3')];
    }

    public function getTypeList()
    {
        return ['0' => __('Type 0'), '1' => __('Type 1')];
    }

    public function getVerifList()
    {
        return ['0' => __('Verif 0'), '1' => __('Verif 1')];
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type']) ? $data['type'] : '');
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getVerifTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['verif']) ? $data['verif'] : '');
        $list = $this->getVerifList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getEffectivetimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['effectivetime']) ? $data['effectivetime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getVeriftimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['veriftime']) ? $data['veriftime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setEffectivetimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setVeriftimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


}

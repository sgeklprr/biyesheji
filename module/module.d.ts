
declare interface EModuleForm<T>{
    form:T;
}

declare interface EModuleReadForm<T,R>{
    form:T;
    readMap:R;
}



declare interface EAdmins {
    // 帐号 。
    username?:string;
    // 密码 。
    pwd?:string;
        
}

declare type EAdminsForm = EModuleForm<EAdmins>;
declare interface EYonghu {
    // 账号 。
    zhanghao?:string;
    // 密码 。
    mima?:string;
    // 姓名 。
    xingming?:string;
    // 性别 。
    // 可选项:男,女。
    xingbie?:string;
    // 手机 。
    shouji?:string;
    // 邮箱 。
    youxiang?:string;
    // 头像 。
    touxiang?:string;
    // openid 。
    openid?:string;
        
}

declare type EYonghuForm = EModuleForm<EYonghu>;
declare interface ELunbotu {
    // 标题 。
    title?:string;
    // 图片 。
    image?:string;
    // 连接地址 。
    url?:string;
        
}

declare type ELunbotuForm = EModuleForm<ELunbotu>;
declare interface EChangdi {
    // 场地编号 。
    changdibianhao?:string;
    // 场地名称 。
    changdimingcheng?:string;
    // 类型 。
    // 可选项:羽毛球场,乒乓球场,篮球场。
    leixing?:"羽毛球场"|"乒乓球场"|"篮球场";
    // 场地图片 。
    changditupian?:string;
    // 开放时间 。
    kaifangshijian?:string;
    // 场地状态 。
    // 可选项:开放,关闭,维护中。
    changdizhuangtai?:"开放"|"关闭"|"维护中";
    // 场地价格 。
    changdijiage?:number;
    // 预约须知 。
    yuyuexuzhi?:string;
    // 场地简介 。
    changdijianjie?:string;
            // 场地预约的数量。
    changdiyuyueCount?:number;

}

declare type EChangdiForm = EModuleForm<EChangdi>;
declare interface EChangdiyuyue {
    // 场地id 。
    changdiid?:number;
    // 场地名称 。
    changdimingcheng?:string;
    // 场地价格 。
    changdijiage?:number;
    // 类型 。
    // 可选项:羽毛球场,乒乓球场,篮球场。
    leixing?:"羽毛球场"|"乒乓球场"|"篮球场";
    // 场地图片 。
    changditupian?:string;
    // 预约编号 。
    yuyuebianhao?:string;
    // 预约日期 。
    yuyueriqi?:string;
    // 预约时段 。
    // 可选项:08：00-10：00,10：00-12：00,12：00-14：00,14：00-16：00,16：00-18：00,18：00-20：00,20：00-22：00。
    yuyueshiduan?:"08：00-10：00"|"10：00-12：00"|"12：00-14：00"|"14：00-16：00"|"16：00-18：00"|"18：00-20：00"|"20：00-22：00";
    // 预约人姓名 。
    yuyuerenxingming?:string;
    // 联系电话 。
    lianxidianhua?:string;
    // 预约状态 。
    // 可选项:待支付,待审核,通过,不通过。
    yuyuezhuangtai?:"待支付"|"待审核"|"通过"|"不通过";
    // 预约人 。
    yuyueren?:string;
        iszf?:string;
    // 场地审核的数量。
    changdishenheCount?:number;
    // 取消的数量。
    quxiaoCount?:number;

}

declare type EChangdiyuyueForm = EModuleReadForm<EChangdiyuyue,EChangdi>;
declare interface EChangdishenhe {
    // 场地预约id 。
    changdiyuyueid?:number;
    // 场地id 。
    changdiid?:number;
    // 场地名称 。
    changdimingcheng?:string;
    // 类型 。
    // 可选项:羽毛球场,乒乓球场,篮球场。
    leixing?:"羽毛球场"|"乒乓球场"|"篮球场";
    // 预约编号 。
    yuyuebianhao?:string;
    // 预约日期 。
    yuyueriqi?:string;
    // 预约时段 。
    // 可选项:08：00-10：00,10：00-12：00,12：00-14：00,14：00-16：00,16：00-18：00,18：00-20：00,20：00-22：00。
    yuyueshiduan?:"08：00-10：00"|"10：00-12：00"|"12：00-14：00"|"14：00-16：00"|"16：00-18：00"|"18：00-20：00"|"20：00-22：00";
    // 预约人 。
    yuyueren?:string;
    // 审核 。
    // 可选项:通过,不通过。
    shenhe?:"通过"|"不通过";
    // 备注 。
    beizhu?:string;
    // 审核时间 。
    addtime?:string;
        
}

declare type EChangdishenheForm = EModuleReadForm<EChangdishenhe,EChangdiyuyue>;
declare interface EQuxiao {
    // 场地预约id 。
    changdiyuyueid?:number;
    // 场地id 。
    changdiid?:number;
    // 场地名称 。
    changdimingcheng?:string;
    // 场地价格 。
    changdijiage?:number;
    // 预约编号 。
    yuyuebianhao?:string;
    // 预约日期 。
    yuyueriqi?:string;
    // 预约时段 。
    // 可选项:08：00-10：00,10：00-12：00,12：00-14：00,14：00-16：00,16：00-18：00,18：00-20：00,20：00-22：00。
    yuyueshiduan?:"08：00-10：00"|"10：00-12：00"|"12：00-14：00"|"14：00-16：00"|"16：00-18：00"|"18：00-20：00"|"20：00-22：00";
    // 预约人 。
    yuyueren?:string;
    // 取消原因 。
    quxiaoyuanyin?:string;
    // 取消时间 。
    addtime?:string;
    // 备注 。
    beizhu?:string;
        
}

declare type EQuxiaoForm = EModuleReadForm<EQuxiao,EChangdiyuyue>;
declare interface ELiuyan {
    // 类型 。
    // 可选项:反馈,建议。
    leixing?:"反馈"|"建议";
    // 姓名 。
    xingming?:string;
    // 联系电话 。
    lianxidianhua?:string;
    // 留言内容 。
    liuyanneirong?:string;
    // 留言人 。
    liuyanren?:string;
    // 状态 。
    zhuangtai?:string;
    // 回复内容 。
    huifuneirong?:string;
        
}

declare type ELiuyanForm = EModuleForm<ELiuyan>;
declare interface EShoucang {
    // 用户 。
    username?:string;
    // 关联表id 。
    xwid?:number;
    // 关联表 。
    biao?:string;
    // 标题 。
    biaoti?:string;
    // 收藏时间 。
    addtime?:string;
        
}

declare type EShoucangForm = EModuleForm<EShoucang>;
declare interface ETiezi {
    // 标题 。
    biaoti?:string;
    // 图片 。
    tupian?:string;
    // 帖子分类 。
    tiezifenlei?:number;
    // 内容 。
    neirong?:string;
    // 发帖人 。
    fatieren?:string;
    // 添加时间 。
    addtime?:string;
            // 帖子回复的数量。
    tiezihuifuCount?:number;

}

declare type ETieziForm = EModuleForm<ETiezi>;
declare interface ETiezifenlei {
    // 分类名称 。
    fenleimingcheng?:string;
        
}

declare type ETiezifenleiForm = EModuleForm<ETiezifenlei>;
declare interface ETiezihuifu {
    // 帖子id 。
    tieziid?:number;
    // 标题 。
    biaoti?:string;
    // 回复 。
    huifu?:number;
    // 回复内容 。
    huifuneirong?:string;
    // 图片 。
    tupian?:string;
    // 回复人 。
    huifuren?:string;
    // 添加时间 。
    addtime?:string;
        
}

declare type ETiezihuifuForm = EModuleReadForm<ETiezihuifu,ETiezi>;
declare interface EDianzan {
    // 用户 。
    username?:string;
    // 关联表id 。
    biaoid?:number;
    // 关联表 。
    biao?:string;
    // 标题 。
    biaoti?:string;
    // 点赞时间 。
    addtime?:string;
        
}

declare type EDianzanForm = EModuleForm<EDianzan>;


declare interface EResponseData<T>{
    // 为0 表示成功，其他表示错误码
    code:number;
    // 错误信息
    msg:string;
    // 数据
    data:T;
}

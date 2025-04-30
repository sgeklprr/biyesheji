import { session } from "@/utils/utils";

export default [
    {
        path: "pay",
        name: "AdminPay",
        component: () => import("@/views/zhifu/zhifu.vue"),
        meta: { authLogin: true },
    },

    {
        path: "admins",
        name: "AdminadminsList",
        component: () => import("@/views/admins/list.vue"),
        meta: { title: "管理员列表", authLogin: true },
    },

    {
        path: "admins/add",
        name: "AdminadminsAdd",
        component: () => import("@/views/admins/add.vue"),
        meta: { title: "添加管理员", authLogin: true },
    },
    {
        path: "admins/updt",
        name: "AdminadminsUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/admins/updt.vue"),
        meta: { title: "编辑管理员", authLogin: true },
    },
    {
        path: "admins/updtself",
        name: "AdminadminsUpdtSelf",
        props: (route) => ({ id: session("id") }),
        component: () => import("@/views/admins/updtself.vue"),
        meta: { title: "更新个人资料", authLogin: true },
    },
    {
        path: "yonghu",
        name: "AdminyonghuList",
        component: () => import("@/views/yonghu/list.vue"),
        meta: { title: "用户列表", authLogin: true },
    },

    {
        path: "yonghu/add",
        name: "AdminyonghuAdd",
        component: () => import("@/views/yonghu/add.vue"),
        meta: { title: "添加用户", authLogin: true },
    },
    {
        path: "yonghu/updt",
        name: "AdminyonghuUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/yonghu/updt.vue"),
        meta: { title: "编辑用户", authLogin: true },
    },
    {
        path: "yonghu/updtself",
        name: "AdminyonghuUpdtSelf",
        props: (route) => ({ id: session("id") }),
        component: () => import("@/views/yonghu/updtself.vue"),
        meta: { title: "更新个人资料", authLogin: true },
    },
    {
        path: "lunbotu",
        name: "AdminlunbotuList",
        component: () => import("@/views/lunbotu/list.vue"),
        meta: { title: "轮播图列表", authLogin: true },
    },

    {
        path: "lunbotu/add",
        name: "AdminlunbotuAdd",
        component: () => import("@/views/lunbotu/add.vue"),
        meta: { title: "添加轮播图", authLogin: true },
    },
    {
        path: "lunbotu/updt",
        name: "AdminlunbotuUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/lunbotu/updt.vue"),
        meta: { title: "编辑轮播图", authLogin: true },
    },
    {
        path: "changdi",
        name: "AdminchangdiList",
        component: () => import("@/views/changdi/list.vue"),
        meta: { title: "场地列表", authLogin: true },
    },

    {
        path: "changdi/add",
        name: "AdminchangdiAdd",
        component: () => import("@/views/changdi/add.vue"),
        meta: { title: "添加场地", authLogin: true },
    },
    {
        path: "changdi/updt",
        name: "AdminchangdiUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/changdi/updt.vue"),
        meta: { title: "编辑场地", authLogin: true },
    },
    {
        path: "changdi/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminchangdiDetail",
        component: () => import("@/views/changdi/detail.vue"),
        meta: { title: "场地详情", authLogin: true },
    },
    {
        path: "changdiyuyue",
        name: "AdminchangdiyuyueList",
        component: () => import("@/views/changdiyuyue/list.vue"),
        meta: { title: "场地预约列表", authLogin: true },
    },

    {
        path: "changdiyuyue/yuyueren",
        name: "AdminchangdiyuyueListyuyueren",
        component: () => import("@/views/changdiyuyue/yuyueren.vue"),
        meta: { title: "场地预约列表", authLogin: true },
    },

    {
        path: "changdiyuyue/add",
        name: "AdminchangdiyuyueAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/changdiyuyue/add.vue"),
        meta: { title: "添加场地预约", authLogin: true },
    },
    {
        path: "changdiyuyue/updt",
        name: "AdminchangdiyuyueUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/changdiyuyue/updt.vue"),
        meta: { title: "编辑场地预约", authLogin: true },
    },
    {
        path: "changdiyuyue/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminchangdiyuyueDetail",
        component: () => import("@/views/changdiyuyue/detail.vue"),
        meta: { title: "场地预约详情", authLogin: true },
    },
    {
        path: "changdishenhe",
        name: "AdminchangdishenheList",
        component: () => import("@/views/changdishenhe/list.vue"),
        meta: { title: "场地审核列表", authLogin: true },
    },

    {
        path: "changdishenhe/yuyueren",
        name: "AdminchangdishenheListyuyueren",
        component: () => import("@/views/changdishenhe/yuyueren.vue"),
        meta: { title: "场地审核列表", authLogin: true },
    },

    {
        path: "changdishenhe/add",
        name: "AdminchangdishenheAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/changdishenhe/add.vue"),
        meta: { title: "添加场地审核", authLogin: true },
    },
    {
        path: "changdishenhe/updt",
        name: "AdminchangdishenheUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/changdishenhe/updt.vue"),
        meta: { title: "编辑场地审核", authLogin: true },
    },
    {
        path: "changdishenhe/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminchangdishenheDetail",
        component: () => import("@/views/changdishenhe/detail.vue"),
        meta: { title: "场地审核详情", authLogin: true },
    },
    {
        path: "quxiao",
        name: "AdminquxiaoList",
        component: () => import("@/views/quxiao/list.vue"),
        meta: { title: "取消列表", authLogin: true },
    },

    {
        path: "quxiao/yuyueren",
        name: "AdminquxiaoListyuyueren",
        component: () => import("@/views/quxiao/yuyueren.vue"),
        meta: { title: "取消列表", authLogin: true },
    },

    {
        path: "quxiao/add",
        name: "AdminquxiaoAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/quxiao/add.vue"),
        meta: { title: "添加取消", authLogin: true },
    },
    {
        path: "quxiao/updt",
        name: "AdminquxiaoUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/quxiao/updt.vue"),
        meta: { title: "编辑取消", authLogin: true },
    },
    {
        path: "quxiao/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminquxiaoDetail",
        component: () => import("@/views/quxiao/detail.vue"),
        meta: { title: "取消详情", authLogin: true },
    },
    {
        path: "liuyan",
        name: "AdminliuyanList",
        component: () => import("@/views/liuyan/list.vue"),
        meta: { title: "留言列表", authLogin: true },
    },

    {
        path: "liuyan/liuyanren",
        name: "AdminliuyanListliuyanren",
        component: () => import("@/views/liuyan/liuyanren.vue"),
        meta: { title: "留言列表", authLogin: true },
    },

    {
        path: "liuyan/add",
        name: "AdminliuyanAdd",
        component: () => import("@/views/liuyan/add.vue"),
        meta: { title: "添加留言", authLogin: true },
    },
    {
        path: "liuyan/updt",
        name: "AdminliuyanUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/liuyan/updt.vue"),
        meta: { title: "编辑留言", authLogin: true },
    },
    {
        path: "shoucang",
        name: "AdminshoucangList",
        component: () => import("@/views/shoucang/list.vue"),
        meta: { title: "收藏列表", authLogin: true },
    },

    {
        path: "shoucang/username",
        name: "AdminshoucangListusername",
        component: () => import("@/views/shoucang/username.vue"),
        meta: { title: "收藏列表", authLogin: true },
    },

    {
        path: "tiezi",
        name: "AdmintieziList",
        component: () => import("@/views/tiezi/list.vue"),
        meta: { title: "帖子列表", authLogin: true },
    },

    {
        path: "tiezi/fatieren",
        name: "AdmintieziListfatieren",
        component: () => import("@/views/tiezi/fatieren.vue"),
        meta: { title: "帖子列表", authLogin: true },
    },

    {
        path: "tiezi/add",
        name: "AdmintieziAdd",
        component: () => import("@/views/tiezi/add.vue"),
        meta: { title: "添加帖子", authLogin: true },
    },
    {
        path: "tiezi/updt",
        name: "AdmintieziUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tiezi/updt.vue"),
        meta: { title: "编辑帖子", authLogin: true },
    },
    {
        path: "tiezi/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdmintieziDetail",
        component: () => import("@/views/tiezi/detail.vue"),
        meta: { title: "帖子详情", authLogin: true },
    },
    {
        path: "tiezifenlei",
        name: "AdmintiezifenleiList",
        component: () => import("@/views/tiezifenlei/list.vue"),
        meta: { title: "帖子分类列表", authLogin: true },
    },

    {
        path: "tiezifenlei/add",
        name: "AdmintiezifenleiAdd",
        component: () => import("@/views/tiezifenlei/add.vue"),
        meta: { title: "添加帖子分类", authLogin: true },
    },
    {
        path: "tiezifenlei/updt",
        name: "AdmintiezifenleiUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tiezifenlei/updt.vue"),
        meta: { title: "编辑帖子分类", authLogin: true },
    },
    {
        path: "tiezihuifu",
        name: "AdmintiezihuifuList",
        component: () => import("@/views/tiezihuifu/list.vue"),
        meta: { title: "帖子回复列表", authLogin: true },
    },

    {
        path: "tiezihuifu/huifuren",
        name: "AdmintiezihuifuListhuifuren",
        component: () => import("@/views/tiezihuifu/huifuren.vue"),
        meta: { title: "帖子回复列表", authLogin: true },
    },

    {
        path: "tiezihuifu/add",
        name: "AdmintiezihuifuAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tiezihuifu/add.vue"),
        meta: { title: "添加帖子回复", authLogin: true },
    },
    {
        path: "tiezihuifu/updt",
        name: "AdmintiezihuifuUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tiezihuifu/updt.vue"),
        meta: { title: "编辑帖子回复", authLogin: true },
    },
    {
        path: "dianzan",
        name: "AdmindianzanList",
        component: () => import("@/views/dianzan/list.vue"),
        meta: { title: "点赞列表", authLogin: true },
    },
    {
        path: "tongji",
        name: "Pagetongji",
        component: () => import("@/views/tongji.vue"),
        meta: { title: "统计", authLogin: true },
    },
    {
        path: "dianzan/username",
        name: "AdmindianzanListusername",
        component: () => import("@/views/dianzan/username.vue"),
        meta: { title: "点赞列表", authLogin: true },
    },
];

export default [
    {
        label: "账号管理",
        to: "",
        children: [
            {
                label: "管理员账号管理",
                to: { path: "/admin/admins" },
            },
            {
                label: "管理员账号添加",
                to: { path: "/admin/admins/add" },
            },
            {
                label: "密码修改",
                to: { path: "/admin/mod" },
            },
        ],
    },
    {
        label: "用户管理",
        to: "",
        children: [
            {
                label: "用户添加",
                to: { path: "/admin/yonghu/add" },
            },
            {
                label: "用户查询",
                to: { path: "/admin/yonghu" },
            },
        ],
    },
    {
        label: "场地管理",
        to: "",
        children: [
            {
                label: "场地添加",
                to: { path: "/admin/changdi/add" },
            },
            {
                label: "场地查询",
                to: { path: "/admin/changdi" },
            },
        ],
    },
    {
        label: "场地预约管理",
        to: "",
        children: [
            {
                label: "场地预约查询",
                to: { path: "/admin/changdiyuyue" },
            },
            {
                label: "场地审核查询",
                to: { path: "/admin/changdishenhe" },
            },
            {
                label: "取消查询",
                to: { path: "/admin/quxiao" },
            },
        ],
    },
    {
        label: "交流论坛管理",
        to: "",
        children: [
            {
                label: "帖子分类添加",
                to: { path: "/admin/tiezifenlei/add" },
            },
            {
                label: "帖子分类查询",
                to: { path: "/admin/tiezifenlei" },
            },
            {
                label: "帖子查询",
                to: { path: "/admin/tiezi" },
            },
            {
                label: "帖子回复查询",
                to: { path: "/admin/tiezihuifu" },
            },
        ],
    },
    {
        label: "留言管理",
        to: "",
        children: [
            {
                label: "留言查询",
                to: { path: "/admin/liuyan" },
            },
        ],
    },
    {
        label: "预约统计",
        to: "",
        children: [
            {
                label: "预约统计",
                to: { path: "/admin/tongji" },
            },
        ],
    },
    {
        label: "轮播图管理",
        to: "",
        children: [
            {
                label: "轮播图添加",
                to: { path: "/admin/lunbotu/add" },
            },
            {
                label: "轮播图查询",
                to: { path: "/admin/lunbotu" },
            },
        ],
    },
];

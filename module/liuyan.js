import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

/**
 * 响应式的对象数据
 * @return {ELiuyan}
 */

export const LiuyanCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        leixing: "",
        xingming: $session.xingming,
        lianxidianhua: $session.lianxidianhua,
        liuyanneirong: "",
        liuyanren: $session.username,
        zhuangtai: "待回复",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ELiuyanForm>}
 */
export const canLiuyanCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = LiuyanCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取留言 模块的表单字段数据
 * @return {ELiuyanForm}
 */
export const useLiuyanCreateForm = () => {
    const form = LiuyanCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canLiuyanSelect = (filter, result) => {
    http.post("/api/liuyan/selectPages").then((res) => {
        if (res.code == 0) {
            extend(result, res.data);
        } else {
            ElMessageBox.alert(res.msg);
        }
    });
};

/**
 * 获取分页数据
 * @param filter
 */
export const useLiuyanSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canLiuyanSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ELiuyan>}
 */
export const canLiuyanFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/liuyan/findById", { id }).then((res) => {
            if (res.code == 0) {
                resolve(res.data);
            } else {
                reject(new Error(res.msg));
            }
        }, reject);
    });
};

/**
 * 根据id 获取一行数据
 * @param id
 * @return {ELiuyan}
 */
export const useLiuyanFindById = (id) => {
    var form = reactive({});

    canLiuyanFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ELiuyan} data
 * @return {Promise<EResponseData<ELiuyan>>}
 */
export const canLiuyanInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/liuyan/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("liuyan_insert", res.data);
                        event.emit("liuyan_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

/**
 * 根据数据更新数据库
 * @param {ELiuyan} data
 * @return {Promise<EResponseData<ELiuyan>>}
 */
export const canLiuyanUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/liuyan/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("liuyan_update", res.data);
                        event.emit("liuyan_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

/**
 * 根据id 或者列表id
 * @param {number|number[]} id
 * @return {Promise<EResponseData<string>>}
 */
export const canLiuyanDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/liuyan/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("liuyan_delete", res.data);
                        event.emit("liuyan_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

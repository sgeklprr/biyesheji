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
 * @return {ETiezifenlei}
 */

export const TiezifenleiCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        fenleimingcheng: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETiezifenleiForm>}
 */
export const canTiezifenleiCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = TiezifenleiCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取帖子分类 模块的表单字段数据
 * @return {ETiezifenleiForm}
 */
export const useTiezifenleiCreateForm = () => {
    const form = TiezifenleiCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canTiezifenleiSelect = (filter, result) => {
    http.post("/api/tiezifenlei/selectPages").then((res) => {
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
export const useTiezifenleiSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTiezifenleiSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETiezifenlei>}
 */
export const canTiezifenleiFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tiezifenlei/findById", { id }).then((res) => {
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
 * @return {ETiezifenlei}
 */
export const useTiezifenleiFindById = (id) => {
    var form = reactive({});

    canTiezifenleiFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETiezifenlei} data
 * @return {Promise<EResponseData<ETiezifenlei>>}
 */
export const canTiezifenleiInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tiezifenlei/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezifenlei_insert", res.data);
                        event.emit("tiezifenlei_change", res.data);
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
 * @param {ETiezifenlei} data
 * @return {Promise<EResponseData<ETiezifenlei>>}
 */
export const canTiezifenleiUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tiezifenlei/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezifenlei_update", res.data);
                        event.emit("tiezifenlei_change", res.data);
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
export const canTiezifenleiDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tiezifenlei/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezifenlei_delete", res.data);
                        event.emit("tiezifenlei_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

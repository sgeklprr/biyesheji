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
 * @return {EChangdi}
 */

export const ChangdiCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        changdibianhao: rule.getID(),
        changdimingcheng: "",
        leixing: "",
        changditupian: "",
        kaifangshijian: "",
        changdizhuangtai: "开放",
        changdijiage: "",
        yuyuexuzhi: "",
        changdijianjie: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EChangdiForm>}
 */
export const canChangdiCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = ChangdiCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取场地 模块的表单字段数据
 * @return {EChangdiForm}
 */
export const useChangdiCreateForm = () => {
    const form = ChangdiCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canChangdiSelect = (filter, result) => {
    http.post("/api/changdi/selectPages").then((res) => {
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
export const useChangdiSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canChangdiSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EChangdi>}
 */
export const canChangdiFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/changdi/findById", { id }).then((res) => {
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
 * @return {EChangdi}
 */
export const useChangdiFindById = (id) => {
    var form = reactive({});

    canChangdiFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EChangdi} data
 * @return {Promise<EResponseData<EChangdi>>}
 */
export const canChangdiInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/changdi/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdi_insert", res.data);
                        event.emit("changdi_change", res.data);
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
 * @param {EChangdi} data
 * @return {Promise<EResponseData<EChangdi>>}
 */
export const canChangdiUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/changdi/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdi_update", res.data);
                        event.emit("changdi_change", res.data);
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
export const canChangdiDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/changdi/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdi_delete", res.data);
                        event.emit("changdi_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

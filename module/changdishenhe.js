import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

import { canChangdiyuyueFindById } from "./changdiyuyue";

/**
 * 响应式的对象数据
 * @return {EChangdishenhe}
 */

export const ChangdishenheCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        changdimingcheng: "",
        leixing: "",
        yuyuebianhao: "",
        yuyueriqi: "",
        yuyueshiduan: "",
        yuyueren: $session.username,
        shenhe: "",
        beizhu: "",
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["changdiyuyueid", "changdiid", "changdimingcheng", "leixing", "yuyuebianhao", "yuyueriqi", "yuyueshiduan", "yuyueren"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EChangdishenheForm>}
 */
export const canChangdishenheCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = ChangdishenheCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canChangdiyuyueFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.changdiyuyueid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取场地审核 模块的表单字段数据
 * @return {EChangdishenheForm}
 */
export const useChangdishenheCreateForm = (id) => {
    const form = ChangdishenheCreateForm();
    const formReactive = reactive(form);

    const readMap = reactive({});
    canChangdiyuyueFindById(id).then(
        (map) => {
            exportForm(formReactive, map);
            extend(readMap, map);
            formReactive.changdiyuyueid = map.id;
        },
        (err) => {
            ElMessageBox.alert(err.message);
        }
    );
    return { form: formReactive, readMap };
};

export const canChangdishenheSelect = (filter, result) => {
    http.post("/api/changdishenhe/selectPages").then((res) => {
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
export const useChangdishenheSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canChangdishenheSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EChangdishenhe>}
 */
export const canChangdishenheFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/changdishenhe/findById", { id }).then((res) => {
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
 * @return {EChangdishenhe}
 */
export const useChangdishenheFindById = (id) => {
    var form = reactive({});

    canChangdishenheFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EChangdishenhe} data
 * @return {Promise<EResponseData<EChangdishenhe>>}
 */
export const canChangdishenheInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/changdishenhe/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdishenhe_insert", res.data);
                        event.emit("changdishenhe_change", res.data);
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
 * @param {EChangdishenhe} data
 * @return {Promise<EResponseData<EChangdishenhe>>}
 */
export const canChangdishenheUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/changdishenhe/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdishenhe_update", res.data);
                        event.emit("changdishenhe_change", res.data);
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
export const canChangdishenheDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/changdishenhe/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdishenhe_delete", res.data);
                        event.emit("changdishenhe_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

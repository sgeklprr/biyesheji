import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

import { canChangdiFindById } from "./changdi";

/**
 * 响应式的对象数据
 * @return {EChangdiyuyue}
 */

export const ChangdiyuyueCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        changdimingcheng: "",
        changdijiage: "",
        leixing: "",
        changditupian: "",
        yuyuebianhao: rule.getID(),
        yuyueriqi: rule.date("Y-m-d"),
        yuyueshiduan: "",
        yuyuerenxingming: $session.xingming,
        lianxidianhua: $session.shouji,
        yuyuezhuangtai: "待支付",
        yuyueren: $session.username,
        iszf: "否",
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["changdiid", "changdimingcheng", "changdijiage", "leixing", "changditupian"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EChangdiyuyueForm>}
 */
export const canChangdiyuyueCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = ChangdiyuyueCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canChangdiFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.changdiid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取场地预约 模块的表单字段数据
 * @return {EChangdiyuyueForm}
 */
export const useChangdiyuyueCreateForm = (id) => {
    const form = ChangdiyuyueCreateForm();
    const formReactive = reactive(form);

    const readMap = reactive({});
    canChangdiFindById(id).then(
        (map) => {
            exportForm(formReactive, map);
            extend(readMap, map);
            formReactive.changdiid = map.id;
        },
        (err) => {
            ElMessageBox.alert(err.message);
        }
    );
    return { form: formReactive, readMap };
};

export const canChangdiyuyueSelect = (filter, result) => {
    http.post("/api/changdiyuyue/selectPages").then((res) => {
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
export const useChangdiyuyueSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canChangdiyuyueSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EChangdiyuyue>}
 */
export const canChangdiyuyueFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/changdiyuyue/findById", { id }).then((res) => {
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
 * @return {EChangdiyuyue}
 */
export const useChangdiyuyueFindById = (id) => {
    var form = reactive({});

    canChangdiyuyueFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EChangdiyuyue} data
 * @return {Promise<EResponseData<EChangdiyuyue>>}
 */
export const canChangdiyuyueInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/changdiyuyue/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdiyuyue_insert", res.data);
                        event.emit("changdiyuyue_change", res.data);
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
 * @param {EChangdiyuyue} data
 * @return {Promise<EResponseData<EChangdiyuyue>>}
 */
export const canChangdiyuyueUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/changdiyuyue/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdiyuyue_update", res.data);
                        event.emit("changdiyuyue_change", res.data);
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
export const canChangdiyuyueDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/changdiyuyue/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("changdiyuyue_delete", res.data);
                        event.emit("changdiyuyue_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

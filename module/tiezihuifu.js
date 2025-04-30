import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

import { canTieziFindById } from "./tiezi";

/**
 * 响应式的对象数据
 * @return {ETiezihuifu}
 */

export const TiezihuifuCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        biaoti: "",
        huifu: "",
        huifuneirong: "",
        tupian: "",
        huifuren: $session.username,
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["tieziid", "biaoti"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETiezihuifuForm>}
 */
export const canTiezihuifuCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = TiezihuifuCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canTieziFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.tieziid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取帖子回复 模块的表单字段数据
 * @return {ETiezihuifuForm}
 */
export const useTiezihuifuCreateForm = (id) => {
    const form = TiezihuifuCreateForm();
    const formReactive = reactive(form);

    const readMap = reactive({});
    canTieziFindById(id).then(
        (map) => {
            exportForm(formReactive, map);
            extend(readMap, map);
            formReactive.tieziid = map.id;
        },
        (err) => {
            ElMessageBox.alert(err.message);
        }
    );
    return { form: formReactive, readMap };
};

export const canTiezihuifuSelect = (filter, result) => {
    http.post("/api/tiezihuifu/selectPages").then((res) => {
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
export const useTiezihuifuSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTiezihuifuSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETiezihuifu>}
 */
export const canTiezihuifuFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tiezihuifu/findById", { id }).then((res) => {
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
 * @return {ETiezihuifu}
 */
export const useTiezihuifuFindById = (id) => {
    var form = reactive({});

    canTiezihuifuFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETiezihuifu} data
 * @return {Promise<EResponseData<ETiezihuifu>>}
 */
export const canTiezihuifuInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tiezihuifu/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezihuifu_insert", res.data);
                        event.emit("tiezihuifu_change", res.data);
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
 * @param {ETiezihuifu} data
 * @return {Promise<EResponseData<ETiezihuifu>>}
 */
export const canTiezihuifuUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tiezihuifu/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezihuifu_update", res.data);
                        event.emit("tiezihuifu_change", res.data);
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
export const canTiezihuifuDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tiezihuifu/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezihuifu_delete", res.data);
                        event.emit("tiezihuifu_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

export const useTiezihuifudianzan = (id, iss, count) => {
    const is_dianzan = iss ? iss : ref(false);
    const dianzanCount = count ? count : ref(0);

    http.get("/api/tiezihuifu/getdianzan", { id }).then((res) => {
        if (res.code == 0) {
            is_dianzan.value = res.data.is_dianzan;
            dianzanCount.value = res.data.dianzanCount;
        }
    });

    return { is_dianzan, dianzanCount };
};

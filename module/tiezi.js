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
 * @return {ETiezi}
 */

export const TieziCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        biaoti: "",
        tupian: "",
        tiezifenlei: "",
        neirong: "",
        fatieren: $session.username,
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETieziForm>}
 */
export const canTieziCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = TieziCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取帖子 模块的表单字段数据
 * @return {ETieziForm}
 */
export const useTieziCreateForm = () => {
    const form = TieziCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canTieziSelect = (filter, result) => {
    http.post("/api/tiezi/selectPages").then((res) => {
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
export const useTieziSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTieziSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETiezi>}
 */
export const canTieziFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tiezi/findById", { id }).then((res) => {
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
 * @return {ETiezi}
 */
export const useTieziFindById = (id) => {
    var form = reactive({});

    canTieziFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETiezi} data
 * @return {Promise<EResponseData<ETiezi>>}
 */
export const canTieziInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tiezi/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezi_insert", res.data);
                        event.emit("tiezi_change", res.data);
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
 * @param {ETiezi} data
 * @return {Promise<EResponseData<ETiezi>>}
 */
export const canTieziUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tiezi/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezi_update", res.data);
                        event.emit("tiezi_change", res.data);
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
export const canTieziDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tiezi/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tiezi_delete", res.data);
                        event.emit("tiezi_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

export const useTiezishoucang = (id, iss, count) => {
    const is_shoucang = iss ? iss : ref(false);
    const shoucangCount = count ? count : ref(0);

    http.get("/api/tiezi/getshoucang", { id }).then((res) => {
        if (res.code == 0) {
            is_shoucang.value = res.data.is_shoucang;
            shoucangCount.value = res.data.shoucangCount;
        }
    });

    return { is_shoucang, shoucangCount };
};

export const useTiezidianzan = (id, iss, count) => {
    const is_dianzan = iss ? iss : ref(false);
    const dianzanCount = count ? count : ref(0);

    http.get("/api/tiezi/getdianzan", { id }).then((res) => {
        if (res.code == 0) {
            is_dianzan.value = res.data.is_dianzan;
            dianzanCount.value = res.data.dianzanCount;
        }
    });

    return { is_dianzan, dianzanCount };
};

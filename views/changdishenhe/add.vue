<template>
    <div class="views-changdishenhe-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加场地审核 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="场地名称 " prop="changdimingcheng"> {{ form.changdimingcheng }} </el-form-item>

                    <el-form-item v-if="isRead" label="类型 " prop="leixing"> {{ form.leixing }} </el-form-item>

                    <el-form-item v-if="isRead" label="预约编号 " prop="yuyuebianhao"> {{ form.yuyuebianhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="预约日期 " prop="yuyueriqi"> {{ form.yuyueriqi }} </el-form-item>

                    <el-form-item v-if="isRead" label="预约时段 " prop="yuyueshiduan"> {{ form.yuyueshiduan }} </el-form-item>

                    <el-form-item v-if="isRead" label="预约人 " prop="yuyueren"> {{ form.yuyueren }} </el-form-item>

                    <el-form-item label="审核 " prop="shenhe" required :rules="[{required:true, message:'请填写审核'}]">
                        <el-select v-model="form.shenhe"
                            ><el-option label="通过" value="通过"></el-option>
                            <el-option label="不通过" value="不通过"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="备注 " prop="beizhu"> <el-input type="textarea" v-model="form.beizhu"></el-input> </el-form-item>

                    <el-form-item v-if="btnText">
                        <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form></el-card
            >
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";
    import rule from "@/utils/rule";
    import router from "@/router";

    import { ref, reactive, computed } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { ElMessage, ElMessageBox } from "element-plus";
    import { useChangdishenheCreateForm, canChangdishenheInsert } from "@/module";

    const route = useRoute();
    const props = defineProps({
        id: [String, Number],
        btnText: {
            type: String,
            default: "保存",
        },
        isRead: {
            type: Boolean,
            default: true,
        },
        isHouxu: {
            type: Boolean,
            default: true,
        },
        labelWidth: {
            type: String,
            default: "140px",
        },
    });
    const { form, readMap } = useChangdishenheCreateForm(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);
    var submit = () => {
        return new Promise((resolve, reject) => {
            formModel.value
                .validate()
                .then((res) => {
                    if (loading.value) return;
                    loading.value = true;
                    canChangdishenheInsert(form).then(
                        (res) => {
                            loading.value = false;
                            if (res.code == 0) {
                                emit("success", res.data);
                                if (props.isHouxu) {
                                    ElMessage.success("添加成功");
                                    router.go(-1);
                                }
                            } else {
                                ElMessageBox.alert(res.msg);
                            }
                            resolve(res);
                        },
                        (err) => {
                            loading.value = false;
                            ElMessageBox.alert(err.message);
                            reject(err);
                        }
                    );
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };
</script>

<style scoped lang="scss">
    .views-changdishenhe-add {
    }
</style>

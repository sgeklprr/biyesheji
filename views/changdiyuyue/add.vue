<template>
    <div class="views-changdiyuyue-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加场地预约 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="场地名称 " prop="changdimingcheng"> {{ form.changdimingcheng }} </el-form-item>

                    <el-form-item v-if="isRead" label="场地价格 " prop="changdijiage" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                        {{form.changdijiage}}
                    </el-form-item>

                    <el-form-item v-if="isRead" label="类型 " prop="leixing"> {{ form.leixing }} </el-form-item>

                    <el-form-item v-if="isRead" label="场地图片 " prop="changditupian"> <e-img :src="form.changditupian" style="max-width: 120px" /> </el-form-item>

                    <el-form-item label="预约编号 " prop="yuyuebianhao" :rules="[{required:true, message:'请填写预约编号'}]">
                        <el-input type="text" placeholder="输入预约编号" style="width: 450px" v-model="form.yuyuebianhao" />
                    </el-form-item>

                    <el-form-item label="预约日期 " prop="yuyueriqi" :rules="[{required:true, message:'请填写预约日期'}]">
                        <el-date-picker v-model="form.yuyueriqi" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="预约时段 " prop="yuyueshiduan" required :rules="[{required:true, message:'请填写预约时段'}]">
                        <el-select v-model="form.yuyueshiduan"
                            ><el-option label="08：00-10：00" value="08：00-10：00"></el-option>
                            <el-option label="10：00-12：00" value="10：00-12：00"></el-option>
                            <el-option label="12：00-14：00" value="12：00-14：00"></el-option>
                            <el-option label="14：00-16：00" value="14：00-16：00"></el-option>
                            <el-option label="16：00-18：00" value="16：00-18：00"></el-option>
                            <el-option label="18：00-20：00" value="18：00-20：00"></el-option>
                            <el-option label="20：00-22：00" value="20：00-22：00"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="预约人姓名 " prop="yuyuerenxingming">
                        <el-input type="text" placeholder="输入预约人姓名" style="width: 450px" v-model="form.yuyuerenxingming" />
                    </el-form-item>

                    <el-form-item label="联系电话 " prop="lianxidianhua" :rules="[{validator:rule.checkPhone, message:'请输入正确手机号码'}]">
                        <el-input type="text" placeholder="输入联系电话" style="width: 450px" v-model="form.lianxidianhua" />
                    </el-form-item>

                    <el-form-item label="预约人 " prop="yuyueren"> <el-input v-model="form.yuyueren" readonly style="width: 250px"></el-input> </el-form-item>

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
    import { useChangdiyuyueCreateForm, canChangdiyuyueInsert } from "@/module";

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
    const { form, readMap } = useChangdiyuyueCreateForm(props.id);
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
                    canChangdiyuyueInsert(form).then(
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
    .views-changdiyuyue-add {
    }
</style>

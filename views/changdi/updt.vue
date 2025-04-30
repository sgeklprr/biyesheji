<template>
    <div class="views-changdi-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加场地 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item label="场地编号 " prop="changdibianhao" :rules="[{required:true, message:'请填写场地编号'}]">
                        <el-input type="text" placeholder="输入场地编号" style="width: 450px" v-model="form.changdibianhao" />
                    </el-form-item>

                    <el-form-item label="场地名称 " prop="changdimingcheng" required :rules="[{required:true, message:'请填写场地名称'}]">
                        <el-input type="text" placeholder="输入场地名称" style="width: 450px" v-model="form.changdimingcheng" />
                    </el-form-item>

                    <el-form-item label="类型 " prop="leixing" required :rules="[{required:true, message:'请填写类型'}]">
                        <el-select v-model="form.leixing"
                            ><el-option label="羽毛球场" value="羽毛球场"></el-option>
                            <el-option label="乒乓球场" value="乒乓球场"></el-option>
                            <el-option label="篮球场" value="篮球场"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="场地图片 " prop="changditupian"> <e-upload-image v-model="form.changditupian" is-paste></e-upload-image> </el-form-item>

                    <el-form-item label="开放时间 " prop="kaifangshijian">
                        <el-input type="text" placeholder="输入开放时间" style="width: 450px" v-model="form.kaifangshijian" />
                    </el-form-item>

                    <el-form-item label="场地状态 " prop="changdizhuangtai">
                        <el-select v-model="form.changdizhuangtai"
                            ><el-option label="开放" value="开放"></el-option>
                            <el-option label="关闭" value="关闭"></el-option>
                            <el-option label="维护中" value="维护中"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                        label="场地价格 "
                        prop="changdijiage"
                        required
                        :rules="[{required:true, message:'请填写场地价格'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入场地价格" style="width: 450px" v-model.number="form.changdijiage" />
                    </el-form-item>

                    <el-form-item label="预约须知 " prop="yuyuexuzhi"> <el-input type="textarea" v-model="form.yuyuexuzhi"></el-input> </el-form-item>

                    <el-form-item label="场地简介 " prop="changdijianjie"> <el-input type="textarea" v-model="form.changdijianjie"></el-input> </el-form-item>

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
    import { useChangdiFindById, canChangdiFindById, canChangdiUpdate } from "@/module";

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
    const form = useChangdiFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canChangdiUpdate(form).then(
                (res) => {
                    loading.value = false;
                    if (res.code == 0) {
                        emit("success", res.data);
                        if (props.isHouxu) {
                            ElMessage.success("更新成功");
                            router.go(-1);
                        }
                    } else {
                        ElMessageBox.alert(res.msg);
                    }
                },
                (err) => {
                    loading.value = false;
                    ElMessageBox.alert(err.message);
                }
            );
        });
    };
</script>

<style scoped lang="scss">
    .views-changdi-updt {
    }
</style>

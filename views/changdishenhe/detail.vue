<template>
    <div class="views-changdishenhe-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 场地审核详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="场地名称"> {{ map.changdimingcheng }} </el-descriptions-item>
                        <el-descriptions-item label="类型"> {{ map.leixing }} </el-descriptions-item>
                        <el-descriptions-item label="预约编号"> {{ map.yuyuebianhao }} </el-descriptions-item>
                        <el-descriptions-item label="预约日期"> {{ map.yuyueriqi }} </el-descriptions-item>
                        <el-descriptions-item label="预约时段"> {{ map.yuyueshiduan }} </el-descriptions-item>
                        <el-descriptions-item label="预约人"> {{ map.yuyueren }} </el-descriptions-item>
                        <el-descriptions-item label="审核"> {{ map.shenhe }} </el-descriptions-item>
                        <el-descriptions-item label="审核时间"> {{ map.addtime }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="备注"> {{ map.beizhu }} </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="no-print" v-if="isShowBtn">
                    <el-button @click="$router.go(-1)">返回</el-button>
                    <el-button @click="$print('#printdetail')">打印</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";

    import { ref, reactive, watch, computed } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { extend } from "@/utils/extend";
    import { useChangdishenheFindById, canChangdishenheFindById } from "@/module";

    const route = useRoute();
    const props = defineProps({
        id: {
            type: [Number, String],
        },
        isShowBtn: {
            type: Boolean,
            default: true,
        },
    });

    /**
     * 获取详情页面的一行数据,当url参数id变更时，当url参数id变更时，自动更新map中的数据
     * @type {EChangdishenhe}
     */
    const map = useChangdishenheFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canChangdishenheFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-changdishenhe-detail {
    }
</style>

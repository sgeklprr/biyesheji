<template>
    <div class="views-changdi-list">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 场地查询 </span>
                    </div>
                </template>

                <div class="form-search">
                    <el-form @submit.prevent.stop :inline="true" size="small">
                        <el-form-item label="关键字">
                            <el-input v-model="search.keyword" style="width: 150px" placeholder="搜索关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="场地编号">
                            <el-input v-model="search.changdibianhao"></el-input>
                        </el-form-item>
                        <el-form-item label="场地名称">
                            <el-input v-model="search.changdimingcheng"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="search.leixing"
                                ><el-option label="请选择" value=""></el-option><el-option label="羽毛球场" value="羽毛球场"></el-option>
                                <el-option label="乒乓球场" value="乒乓球场"></el-option>
                                <el-option label="篮球场" value="篮球场"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="场地状态">
                            <el-select v-model="search.changdizhuangtai"
                                ><el-option label="请选择" value=""></el-option><el-option label="开放" value="开放"></el-option>
                                <el-option label="关闭" value="关闭"></el-option>
                                <el-option label="维护中" value="维护中"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchSubmit" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-table border :data="lists" style="width: 100%" @sort-change="sortChange" highlight-current-row>
                    <el-table-column type="index" label="#"></el-table-column>
                    <!-- 序号 -->

                    <el-table-column prop="changdibianhao" label="场地编号" width="130">
                        <template #default="{row}"> {{ row.changdibianhao }} </template>
                    </el-table-column>
                    <el-table-column prop="changdimingcheng" label="场地名称">
                        <template #default="{row}"> {{ row.changdimingcheng }} </template>
                    </el-table-column>
                    <el-table-column prop="leixing" label="类型" width="130">
                        <template #default="{row}"> {{ row.leixing }} </template>
                    </el-table-column>
                    <el-table-column prop="changditupian" label="场地图片" width="100">
                        <template #default="{row}"> <e-img :src="row.changditupian" style="max-width: 120px" /> </template>
                    </el-table-column>
                    <el-table-column prop="kaifangshijian" label="开放时间" width="130">
                        <template #default="{row}"> {{ row.kaifangshijian }} </template>
                    </el-table-column>
                    <el-table-column prop="changdizhuangtai" label="场地状态" width="100">
                        <template #default="{row}"> {{ row.changdizhuangtai }} </template>
                    </el-table-column>
                    <el-table-column sortable="custom" prop="changdijiage" label="场地价格" width="130">
                        <template #default="{row}"> {{row.changdijiage}} </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="250">
                        <template #default="{row}">
                            <el-button-group>

                                <el-tooltip effect="dark" content="详情" placement="top-start"
                                    ><el-button type="info" :icon="InfoFilled" size="small" @click="$router.push('/admin/changdi/detail?id='+row.id)">详情</el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="编辑" placement="top-start"
                                    ><el-button type="success" :icon="Edit" size="small" @click="$router.push('/admin/changdi/updt?id='+row.id)">编辑</el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="删除" placement="top-start"
                                    ><el-button type="danger" :icon="Delete" size="small" @click="deleteItems(row.id)">删除</el-button>
                                </el-tooltip>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="e-pages" style="margin-top: 10px; text-align: center">
                    <el-pagination
                        @current-change="loadList"
                        :page-sizes="[12, 24, 36, 48,60]"
                        v-model:current-page="search.page"
                        v-model:page-size="search.pagesize"
                        @size-change="sizeChange"
                        layout="total, sizes, prev, pager, next"
                        :total="totalCount"
                    >
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";
    import router from "@/router";

    import { ref, reactive, watch, unref, onBeforeMount } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { canChangdiSelect, useChangdiSelect, canChangdiDelete } from "@/module";
    import { extend } from "@/utils/extend";
    import { ElMessageBox, ElMessage } from "element-plus";
    import { Plus, Search, InfoFilled, Edit, Delete } from "@element-plus/icons-vue";

    const route = useRoute();
    const search = reactive({
        keyword: "",
        changdibianhao: "",
        changdimingcheng: "",
        leixing: "",
        changdizhuangtai: "",
        page: 1, // 当前页
        pagesize: 12, // 每页行数
        orderby: "id", // 排序字段
        sort: "desc", // 排序类型
    });
    extend(search, route.query);
    // 链接参数变化时更新这些内容
    watch(
        () => route.query,
        () => {
            extend(search, route.query);
            loadList(1);
        },
        { deep: true }
    );

    // 总行数
    const totalCount = ref(0);
    /**
     * 列表数据
     * @type {EChangdi[]}
     */
    const lists = ref([]);
    // 加载状态
    const loading = ref(false);

    // 排序操作
    const sortChange = (e) => {
        console.log(e);
        if (e.order == null) {
            search.orderby = "id";
            search.sort = "desc";
        } else {
            search.orderby = e.prop;
            search.sort = e.order == "ascending" ? "asc" : "desc";
        }
        loadList(1);
    };
    // 设置页数多少
    const sizeChange = (e) => {
        search.pagesize = e;
        loadList(1);
    };

    const deleteItems = (ids) => {
        return new Promise((resolve, reject) => {
            ElMessageBox.confirm("确定删除？")
                .then((res) => {
                    canChangdiDelete(ids).then((res) => {
                        if (res.code == 0) {
                            ElMessage.success("删除成功");
                            loadList(search.page);
                            resolve(res.data);
                        } else {
                            ElMessage.error(res.msg);
                        }
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    // 加载场地列表方法
    const loadList = (page) => {
        // 加载
        if (unref(loading)) return;
        loading.value = true;
        search.page = page;

        http.post("/api/changdi/selectPages", search).then(
            (res) => {
                loading.value = false;
                if (res.code == 0) {
                    var data = res.data;
                    lists.value = data.lists.records;
                    totalCount.value = data.lists.total;
                }
            },
            (err) => {
                loading.value = false;
                ElMessage.error(err.message);
            }
        );
    };

    onBeforeMount(() => {
        loadList(1);
    });
    const searchSubmit = () => {
        loadList(1);
    };
</script>

<style scoped lang="scss">
    .views-changdi-list {
    }
</style>

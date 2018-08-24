<template>
    <div class="app-table-form">
        <div class="app-query-form">
            <!-- 查询条件 -->
            <slot v-if="!noQuery" name="query-form"></slot>
            <div class="app-query-item">
                <el-button v-if="!noQuery" type="primary" @click="queryInfo">查询</el-button>
                <el-button v-if="!noQuery" @click="resetQuery">重置</el-button>
                <!-- 业务性功能按钮 -->
                <slot name="handle-button"></slot>
            </div>
        </div>
        <div v-if="isTable" class="table-list">
            <!-- table主体 -->
            <slot name="table-list"></slot>
            <!-- 是否需要分页组件 -->
            <template v-if="pagination">
                <div type="pagination">
                    <el-pagination layout="prev, pager, next" :current-page.sync="currentPage" :page-size="pageSize" :total="total" @current-change="queryInfo"></el-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppTableForm',
        props: {
            isTable: {
                type: Boolean,
                default: true
            },
            pagination: {
                type: Boolean,
                default: true
            },
            pageSize: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                default: 0
            },
            noQuery: {
                type: Boolean,
                default: false
            },
            queryForm: {
                type: String,
                default: "queryFilters"
            }
        },
        data() {
            return {
                currentPage: 1,
                queryFilters: {}
            }
        },
        activated() {
            this.queryInfo('query');
        },
        methods: {
            resetQueryFilters({key, value}) {
                this.queryFilters[key] = value;
            },
            // 请求查询
            queryInfo(type) {
                var params = {
                    pageNo: this.currentPage ? this.currentPage : 1,
                    pageSize: this.pageSize,
                }
                if (!this.pagination) {
                    params = {}
                }
                if (type != 'reset') {
                    if (this.queryFilters) {
                        for (var key in this.queryFilters) {
                            params[key] = this.queryFilters[key]
                        }
                    }
                }
                this.$parent[this.queryForm] = params;
                this.$emit('to-query', params);
            },
            resetQuery() {
                this.currentPage = 1;
                this.$children.forEach((item) => {
                    if (item.componentName == "app-query-input" || item.componentName == "app-query-dict-select") {
                        item.value = null;
                    }
                })
                this.queryInfo('reset');
            }
        }
    }
</script>
<template>
    <el-dialog width='30%' :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="dialogClose">
        <el-table ref="tabUserRole" :data="tableData" row-key="id" border max-height="350" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column width="50" type="selection" :reserve-selection="true"></el-table-column>
            <el-table-column prop="code" label="角色编号"></el-table-column>
            <el-table-column prop="name" label="角色名称"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
	    	<el-button @click="dialogClose">取消</el-button>
	    	<el-button type="primary" @click="saveForm">保存</el-button>
	  	</span>
    </el-dialog>
</template>

<script>
    export default {
        name: "userRole",
        props: {
            activeItem: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                dialogVisible: false,
                dialogTitle: "角色列表",
                tableData: [],
                multipleSelection: []
            }
        },
        methods: {
            dialogOpen: function () {
                /*打开用户选择角色窗体*/
                var params = this.activeItem.id;
                this.$http.post({
                    url: '/role/roleList',
                    params
                }).then(res => {
                    this.tableData = res.roles;

                    var filterData = res.userRole;
                    filterData.forEach((filter_item, filter_index) => {
                        var filter_obj = this.tableData.filter(function (item) {
                            return item.id == filter_item;
                        })
                        if (filter_obj.length > 0) {
                            this.$refs.tabUserRole.toggleRowSelection(filter_obj[0], true);
                        }
                    });


                });
            },
            dialogClose: function () {
                /*关闭用户选择角色窗体*/
                this.multipleSelection = [];
                this.$refs.tabUserRole.clearSelection();
                this.dialogVisible = false;
            },
            handleSelectionChange: function (val) {
                /*选择Table角色*/
                this.multipleSelection = val;
            },
            saveForm: function () {
                /*保存用户所属角色*/
                var params = {list: [], user: {id: this.activeItem.id}};
                this.multipleSelection.forEach((item, index) => {
                    var param_info = {};
                    param_info.role = {id: item.id};
                    param_info.user = {id: this.activeItem.id};
                    params.list.push(param_info);

                });
                console.log(params);
                this.$http.post({
                    url: '/role/savaUserRole',
                    params
                }).then(res => {
                    this.dialogVisible = false;
                });

            },
            Open: function () {
                /*开启窗体_对外方法*/
                this.dialogVisible = true;
            },
            Close: function () {
                /*关闭窗体_对外方法*/
                this.dialogVisible = false;
            }
        }
    }
</script>

<style scoped>

</style>
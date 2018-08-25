<template>
    <div class="main-content">
        <app-table-form @to-query="queryInfo" :total="total">
            <template slot="query-form">
                <app-query-input label="用户姓名" property="userName" placeholder="请输入用户姓名"></app-query-input>
            </template>
            <el-button slot="handle-button" type="success" @click="addUser">新增</el-button>
            <template slot="table-list">
                <div type="title"><i class="el-icon-tickets"></i>用户列表</div>
                <el-table :data="tableData" border max-height="350" style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="loginName" label="用户账户"></el-table-column>
                    <el-table-column prop="userName" label="用户姓名"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button size='mini' @click="editUser(scope.row)">修改</el-button>
                            <el-button size='mini' @click="delUser(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </app-table-form>
        <user-form ref="userDialog"></user-form>
        <user-role-form ref="editUserRoleDialog"></user-role-form>
        <user-auth-form ref="editUserAuthDialog"></user-auth-form>
    </div>
</template>
<script>
    import userForm from "./userForm";
    import userRoleForm from "./userRoleForm";
    import userAuthForm from "./userAuthForm";
    import { getUserList, deleteUser } from "@/api/user"

    export default {
        name: "userManage",
        components: {
            userForm,
            userRoleForm,
            userAuthForm
        },
        data() {
            return {
                total: 0,
                queryFilters: {},
                tableData: [],
            };
        },
        methods: {
            queryInfo: function (params) {
                getUserList(params).then(res => {
                    this.total = res.data.total
                    this.tableData = res.data.list
                })
            },
            stopUser: function (tag) {
                /*停用用户和使用用户功能按钮*/
                var params = tag.id;
                if (tag.isvalidate == "Y") {
                    /*調用禁用*/
                    this.$http.post({
                        url: '/sysUser/stopUser',
                        params
                    }).then(res => {
                        this.queryInfo(this.queryFilters);
                    });
                } else {
                    /*調用啟動*/
                    this.$http.post({
                        url: '/sysUser/useUser',
                        params
                    }).then(res => {
                        this.queryInfo(this.queryFilters);
                    });
                }
            },
            tabelH:function(h){
                h(()=>{
                    return false
                })
            },
            // 删除用户
            delUser: function (item) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser({id: item.id}).then(res => {
                        this.$message.success('删除成功')
                        this.queryInfo(this.queryFilters)        
                    })
                })
            },
            // 新增用户
            addUser: function () {
                this.$refs.userDialog.open();
            },
            // 编辑用户信息
            editUser: function (item) {
                this.$refs.userDialog.open(item);
            },
            // 编辑用户角色
            editRole: function (item) {
                this.$refs.editUserRoleDialog.open(item);
            },
            editAuth: function (item) {
                this.$refs.editUserAuthDialog.open(item);
            }
        }
    }
</script>

<style scoped>

</style>
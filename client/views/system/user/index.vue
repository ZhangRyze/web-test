<template>
    <div class="main-content">
        <app-table-form @to-query="queryInfo" :total="total">
            <template slot="query-form">
                <app-query-input label="用户姓名" property="userName" placeholder="请输入用户姓名"></app-query-input>
                <app-query-dict-select dict-type="user_type" option-first="全部" label="用户类型" property="userType" placeholder="请选择用户类型"></app-query-dict-select>
            </template>
            <el-button slot="handle-button" type="success" @click="addUser">新增</el-button>
            <template slot="table-list">
                <div type="title"><i class="el-icon-tickets"></i>用户列表</div>
                <el-table :data="tableData" border max-height="350" style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="loginName" label="用户账户"></el-table-column>
                    <el-table-column prop="userName" label="用户姓名"></el-table-column>
                    <el-table-column prop="userType.name" label="用户类型"></el-table-column>
                    <el-table-column prop="state" label="用户类型">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.state ? 'success' : 'danger'">{{scope.row.state ? '启用' : '停用'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-button size='mini' @click="editUser(scope.row)">修改</el-button>
                            <el-button size='mini' v-if="scope.row.state === 0" type="success" @click="enableUser(scope.row)">启用</el-button>
                            <el-button size='mini' v-if="scope.row.state === 1" type="warning" @click="disableUser(scope.row)">停用</el-button>
                            <el-button size='mini' type="danger" @click="delUser(scope.row)">删除</el-button>
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
    import { getUserList, deleteUser, getUserInfo, updateUser } from "@/api/system/user"

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
                params = params || this.queryFilters
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
                var _me = this
                _me.$confirm('此操作将永久删除该用户, 是否继续?', '提示').then(() => {
                    deleteUser({id: item._id}).then(res => {
                        _me.$message.success('删除成功')
                        _me.queryInfo(_me.queryFilters)        
                    })
                })
            },
            // 新增用户
            addUser: function () {
                this.$refs.userDialog.open();
            },
            // 编辑用户信息
            editUser: function (item) {
                getUserInfo({id: item._id}).then(res => {
                    this.$refs.userDialog.open(res.data);
                })
            },
            enableUser(item){
                updateUser({id: item._id, state: 1}).then(res => {
                    this.$message.success("启用成功")
                    this.queryInfo(this.queryFilters)        
                })
            },
            disableUser(item){
                updateUser({id: item._id, state: 0}).then(res => {
                    this.$message.success("停用成功")
                    this.queryInfo(this.queryFilters)        
                })
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
<template>
    <el-dialog width='30%' :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="close">
        <el-form :model="formData">
            <el-form-item label="登录账户">
                <el-input v-model="formData.loginName" placeholder="请输入登录账户"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名">
                <el-input v-model="formData.userName" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
                <el-input type="password" v-model="formData.password" placeholder="请输入用户密码"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="formData.contact" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" :row="2" v-model="formData.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
	    	<el-button @click="close">取消</el-button>
	    	<el-button type="primary" @click="saveForm">确定</el-button>
	  	</span>
    </el-dialog>
</template>

<script>
    import { addUser, getUserInfo } from "@/api/user"
    export default {
        name: "userForm",
        data() {
            return {
                activeItem: null,
                dialogVisible:false,
                dialogTitle:"提示",
                formData: {}
            }
        },
        methods: {
            open: function (item) {
                console.log(item);
                
                this.activeItem = item || null;
                this.dialogVisible = true;
            }, 
            close: function () {
                this.formData = {};
                this.dialogVisible = false;
            },
            dialogOpen() {
                if (this.activeItem) {
                    getUserInfo({id: this.activeItem._id}).then(res => {
                        this.formData = res.data
                    })
                } else {
                    // 新增初始化
                    this.formData = {};
                    this.dialogTitle="新增用户";
                }
            },
            saveForm() {
                var params = this.formData
                addUser(params).then(res => {
                    console.log('成功');
                    this.close()
                })
            }, 
        }
    }
</script>

<style scoped>

</style>
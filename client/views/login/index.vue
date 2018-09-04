<template>
    <div class="sys-login">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
            <div class="form-title">登录系统</div>
            <el-form-item prop="name">
                <el-input v-model="loginForm.loginName" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button width="100%" type="primary" @click="submitForm()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login } from '@/api/system/common'
export default {
    data() {
        return {
            loginForm: {
                name: '',
                password: '',
                captcha: ''
            },
            loginRules: {
                loginName: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password :[
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
            },
        }
    },
    methods: {
        submitForm(){
            var _me = this
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    login({
                        loginName: _me.loginForm.loginName,
                        password: _me.loginForm.password
                    }).then(res => {
                        console.log(res);
                        this.$router.push('system')
                    })
                }
            });
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-title{
    text-align: center;
    color: #666;
    margin-bottom: 20px;
    font-size: 20px;
}
.sys-login{
    width: 100%;
    height: 100%;
    background-color: #52bab5;
    padding-top: 150px;
    display: flex;
    justify-content: center;
}
.sys-login .el-form{
    width: 400px;
    height: 200px;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
}
.sys-login .el-button{
    width: 100%;
}
</style>
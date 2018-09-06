<template>
    <div class="home-header">
        <div>
            <div class="logo" @click="toIndex">
                <slot name="logo"></slot>
            </div>
            <div class="header-handle">
            	<div>{{userName}}</div>
            	<div>
                    <router-link :to="{name: 'home'}">退出</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import homeRoutes from '@/router/homeRoutes';
import store from '@/store'

export default {
    name: 'homeHeader',
    data() {
        return {
            menuList: [],
            userName: null
        }
    },
    created(){
        this.menuList = homeRoutes;
        this.userName = store.state.user.userName
    },
    methods:{
        toIndex(){
            this.$router.push('/')
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-header{
   height: 60px;
   flex-shrink: 0;
   border-bottom: 1px solid #ddd;
}
.home-header>div{
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.header-handle{
    display: flex;
    align-items: center;
}
.header-handle>div{
    padding: 0 5px;
}
.header-handle>div+div:before{
    content: '|';
    margin-right: 10px;
}
.header-handle span{
    cursor: pointer;
}
.header-handle span:hover{
    text-decoration: underline;
}
</style>

<template>
    <div class="home-header">
        <div>
            <div class="logo">
                <slot name="logo"></slot>
            </div>
            <div class="home-nav">
                <div v-for="menu in menuList" :key="menu.name">
                    <router-link :to="{name: menu.name}">{{menu.tag}}</router-link>
                </div>
            </div>
            <div class="header-handle">
            	<div>
                    <router-link :to="{name: 'system'}">控制台</router-link>
                </div>
            	<div>
                    <router-link :to="{name: 'login'}">登录</router-link>
                </div>
            	<div>
                    <router-link :to="{name: 'home'}">注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import homeRoutes from '@/router/homeRoutes';

export default {
    name: 'homeHeader',
    data() {
        return {
            menuList: []
        }
    },
    created(){
        this.menuList = homeRoutes;
    },
    methods:{

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-header{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100px;
    text-align: center;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    box-shadow: 0 0px 20px rgba(0, 0, 0, .1);
}
.home-header>div{
    height: 100%;
    width: 1038px;
    margin: 0 auto;
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
.home-nav{
    display: flex;
    font-size: 13px;
}
.home-nav>div{
    padding: 0 5px;
}
.home-nav>div+div:before{
    content: "/";
    margin-right: 10px;
}
.home-nav a{
    color: #666;
    text-decoration: none;
}
.home-nav a.router-link-exact-active{
    color: #00b49d;
}
</style>

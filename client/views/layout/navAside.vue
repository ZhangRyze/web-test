<template>
    <div class="nav-aside">
        <el-menu router ref="navbar" :default-active="defActive" menu-trigger="click" unique-opened>
            <nav-bar-item v-for="(item, n) in menuList" :key="n" :item="item" :navIndex="item.path"></nav-bar-item>
        </el-menu>
    </div>
</template>
<script>
import NavBarItem from './navBarItem';
import store from '@/store'

export default {
    name: 'homeHeader',
    data() {
        return {
            menuList:[]
        }
    },
    computed:{
        defActive(){
            return this.$route.path
        }
    },
    created(){
        this.menuList = store.state.user.auths;
    },
    methods: {

    },
    components: { NavBarItem }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-aside{
    width: 200px;
}
.nav-aside .el-menu{
    height: 100%;
}
</style>

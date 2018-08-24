<template>
    <div class="nav-aside">
        <el-menu router ref="navbar" :default-active="defActive" menu-trigger="click" unique-opened>
            <nav-bar-item v-for="(item, n) in menuList" :item="item" :navIndex="String(n)" :key="n"></nav-bar-item>
        </el-menu>
    </div>
</template>
<script>
import NavBarItem from './navBarItem';

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
    created() {
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

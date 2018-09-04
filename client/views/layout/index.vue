<template>
    <div class="wrapper" v-loading="loading">
        <nav-header v-once>
            <p slot="logo">管理平台</p>
        </nav-header>
        <section class="main-container">
            <nav-aside></nav-aside>
            <keep-alive>
                <router-view @switchLoading="loadingState"></router-view>
            </keep-alive>
        </section>
    </div>
</template>
<script>
import navHeader from './navHeader'
import navAside from './navAside'
import { getUserAuths } from '@/api/system/common'

export default {
    name: 'manageLayout',
    data() {
        return {
            loading: false
        }
    },
    created(){
        getUserAuths().then(res => {
            console.log(res);
        })
    },
    methods:{
        loadingState(val){
            this.loading = val;
        }
    },
    components:{
        navAside,
        navHeader
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.main-container{
    flex: 1;
    display: flex;
}
</style>

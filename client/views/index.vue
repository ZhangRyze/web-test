<template>
    <div class="wrapper">
        <sys-header v-once>
            <p slot="logo">平台</p>
        </sys-header>
        <section class="main-content">
            <div>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </section>
    </div>
</template>
<script>
import HeaderBar from './layout/homeHeader'

export default {
    name: 'homeLayout',
    data() {
        return {}
    },
    created(){
    },
    methods:{

    },
    components:{
        "sys-header": HeaderBar,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-content{
    padding-top: 100px;
}
.main-content>div{
    padding-top: 5px;
    width: 1038px;
    margin: 0 auto;
}
</style>

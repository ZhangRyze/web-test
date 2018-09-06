<template>
    <el-submenu v-if="item.children && item.children.length" :index="navIndex">
        <!-- 创建父级菜单 -->
        <template slot="title">
        	<i v-if="item.icon" class="item.icon"></i>
        	{{ item.meta.tag }}
        </template>
        <!-- 创建子菜单 -->
        <nav-bar-item v-for="(subItem, i) in item.children" :key="i" :navIndex="navIndex +'/'+ subItem.path" :item="subItem" >
        </nav-bar-item>
    </el-submenu>

    <el-menu-item v-else :index="navIndex" :route="{path: item.path}">
    	<i class="el-icon-location"></i>
    	{{ item.meta.tag }}
    </el-menu-item>
</template>

<script>
export default {
    name: 'NavBarItem',
    props: ['item','navIndex']
}
</script>
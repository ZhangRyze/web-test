<template>
	<div class="main-content">
        <div class="app-query-form">
            <el-button type="success" @click="addProject">新建文件夹</el-button>
        </div>
        <div>
            <el-menu style="width:200px;">
                <el-menu-item v-for="(path, index) in paths" :key="index" index="path">{{path}}</el-menu-item>
            </el-menu>
            <div class="files-box">
                <div v-for="(file, index) in files" :key="index">
                    <img :src="baseUrl + file.path">
                </div>
            </div>
        </div>
        <file-form ref="fileDialog"></file-form>
	</div>
</template>
<script>
import fileForm from './fileForm'
import { getPath, getFiles } from '@/api/system/files'
export default {
	name: 'filesManager',
	components:{
		fileForm
	},
	data() {
		return {
            baseUrl:'http://localhost:3000/',
            paths:[],
            files:[]
      	}
    },
    activated(){
        this.queryInfo()
    },
	methods: {
		addProject(){
			this.$refs.fileDialog.open()
		},
        queryInfo(){
            getPath().then( res=>{
                this.paths = res.data
                getFiles({'name': 'banners'}).then(_res => {
                    this.files = _res.data
                })
            })
        }
	}
}
</script>
<style>

</style>


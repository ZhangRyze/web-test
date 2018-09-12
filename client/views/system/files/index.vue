<template>
	<div class="main-content">
        <div>
            <el-button type="success">新建文件夹</el-button>
        </div>
        <div>
            <div v-for='path in paths'>{{path}}</div>
        </div>
	</div>
</template>
<script>
import { getPath } from '@/api/system/files'
export default {
	name: 'filesManager',
	data() {
		return {
            paths:[]
      	}
    },
    activated(){
        getPath().then( res=>{
            this.paths = res.data
        })
    },
	methods: {
        
	}
}
</script>

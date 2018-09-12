<template>
	<div class="main-content">
        <el-upload
            ref='upload'
            action='http://localhost:3000/banner/upload'
            multiple
            :limit='5'
            :with-credentials="true"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            name='banners'>
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
	</div>
</template>
<script>

export default {
	name: 'bannerManager',
	data() {
		return {
            fileList:[]
      	}
    },
    watch:{
        fileList(val){
            console.log(val);
            
        }
    },
	methods: {
        handlePreview(){
            console.log(file)
        },
        handleRemove(){},
	}
}
</script>

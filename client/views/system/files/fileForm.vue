<template>
	<el-dialog width='30%' :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="close">
		<el-form :model="formData" label-width="100px">
			<el-form-item label="文件夹名称">
				<el-input v-model="formData.name" placeholder="请输入文件夹名称"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
	    	<el-button @click="close">取消</el-button>
	    	<el-button type="primary" @click="saveForm">确定</el-button>
	  	</span>
	</el-dialog>
</template>
<script>
import { createPath } from "@/api/system/files"
export default {
	name: 'fileForm',
	data(){
		return {
			activeItem: null,
			dialogVisible:false,
			dialogTitle:"新增文件夹",
			formData: {}
		}
	},
	methods: {
		open: function (item, activeItem) {
			this.dialogVisible = true;
		}, 
		close: function () {
			this.formData = {};
			this.dialogVisible = false;
		},
		dialogOpen() {
			this.dialogTitle = this.activeItem ? "修改文件夹" : "新增文件夹" 
			this.formData = this.activeItem ? this.activeItem : {}
		},
		saveForm(){
			var params = this.formData
			createPath(params).then(res => {
				this.close()
				this.$parent.queryInfo()
			})
		},
	}
}
</script>
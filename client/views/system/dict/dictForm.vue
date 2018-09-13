<template>
	<el-dialog width='30%' :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="close">
		<el-form :model="formData" label-width="100px">
			<el-form-item label="字典编码">
				<el-input v-model="formData.code" placeholder="请输入字典编码"></el-input>
			</el-form-item>
			<el-form-item label="字典类型">
				<el-input v-model="formData.codeName" placeholder="请输入字典类型"></el-input>
			</el-form-item>
			<el-form-item label="字典名称">
				<el-input v-model="formData.name" placeholder="请输入字典名称"></el-input>
			</el-form-item>
			<el-form-item label="字典顺序">
				<el-input v-model="formData.sort_no" placeholder="请输入字典顺序"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
	    	<el-button @click="close">取消</el-button>
	    	<el-button type="primary" @click="saveForm">确定</el-button>
	  	</span>
	</el-dialog>
</template>
<script>
import { handleDict } from "@/api/system/dict"
export default {
	name: 'dictForm',
	data(){
		return {
			code: "",
			codeName: "",
			activeItem: null,
			dialogVisible:false,
			dialogTitle:"新增用户",
			formData: {}
		}
	},
	methods: {
		open: function (item, activeItem) {
			this.code = activeItem ? activeItem.code : ""
			this.codeName = activeItem ? activeItem.codeName : ""
			this.activeItem = item || null
			this.dialogVisible = true;
		}, 
		close: function () {
			this.formData = {};
			this.dialogVisible = false;
		},
		dialogOpen() {
			this.dialogTitle = this.activeItem ? "字典修改" : "新增字典" 
			this.formData = this.activeItem ? this.activeItem : {
				code: this.code || "",
				codeName: this.codeName || ""
			}
		},
		saveForm(){
			var params = this.formData
			handleDict(params).then(res => {
				this.close()
				this.$parent.queryInfo()
			})
		},
	}
}
</script>
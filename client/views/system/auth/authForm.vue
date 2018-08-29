<template>
	<el-dialog width='30%' :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="close">
		<el-form :model="formData" label-width="100px">
			<el-form-item label="权限名称">
				<el-input v-model="formData.name" placeholder="请输入权限名称"></el-input>
			</el-form-item>
			<el-form-item label="权限链接">
				<el-input v-model="formData.auth" placeholder="请输入权限链接"></el-input>
			</el-form-item>
			<el-form-item label="权限图标">
				<el-input v-model="formData.authIcon" placeholder="请输入权限图标"></el-input>
			</el-form-item>
			<el-form-item label="权限可见">
			    <el-radio-group v-model="formData.state">
					<el-radio :label="1">显示</el-radio>
					<el-radio :label="0">隐藏</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="权限排序">
				<el-input v-model="formData.sort_no" placeholder="请输入权限排序"></el-input>
			</el-form-item>
			<el-form-item label="权限标识">
				<el-input v-model="formData.symbol" placeholder="请输入权限排序"></el-input>
			</el-form-item>
			<el-form-item label="权限备注">
				<el-input type="textarea" v-model="formData.remark" placeholder="请输入权限备注"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
	    	<el-button @click="close">取消</el-button>
	    	<el-button type="primary" @click="saveForm">确定</el-button>
		</span>
	</el-dialog>
</template>
<script>
import { handleAuth } from "@/api/system/auth"
export default {
	name: 'authForm',
	data(){
		return {
			parent: null,
			dialogTitle:"新增权限",
			dialogVisible: false,
			activeItem: null,
			formData: {
				state: 1
			}
		}
	},
	methods: {
		open(item, id){
			this.parent = id || null
			this.activeItem = item || null
			this.dialogVisible = true
		},
		close: function () {
			this.formData = {
				state: 1
			};
			this.dialogVisible = false;
		},
		dialogOpen() {
			this.dialogTitle = this.activeItem ? "权限修改" : "新增权限" 
			this.formData = this.activeItem ? this.activeItem : {
				state: 1
			}
		},
		saveForm(){
			var params = this.formData
			if(this.parent) params["parent"] = this.parent
			handleAuth(params).then(res => {
				this.close()
				this.$parent.queryInfo()
			})
		},
	}
}
</script>
<template>
	<el-dialog width='30%' :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="close">
		<el-form :model="formData" label-width="100px">
			<el-form-item label="角色编码">
				<el-input v-model="formData.code" placeholder="请输入角色编码"></el-input>
			</el-form-item>
			<el-form-item label="角色名称">
				<el-input v-model="formData.name" placeholder="请输入角色名称"></el-input>
			</el-form-item>
			<el-form-item label="角色权限">
				<el-tree ref="tree" :data="treeData" show-checkbox node-key="_id" default-expand-all :default-checked-keys="formData.auths" :props="defaultProps"></el-tree>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
	    	<el-button @click="close">取消</el-button>
	    	<el-button type="primary" @click="saveForm">确定</el-button>
	  	</span>
	</el-dialog>
</template>
<script>
import { handleRole } from "@/api/system/role"
import { getAuthList } from "@/api/system/auth"
export default {
	name: 'roleForm',
	data(){
		return {
			dialogVisible:false,
			dialogTitle:"新增角色",
			formData: {},
			treeData:[],
			defaultProps:{
          		children: 'children',
          		label: 'name'
			}
		}
	},
	methods: {
		open: function (item, activeItem) {
			this.activeItem = item || null
			this.dialogVisible = true;
			getAuthList().then((res) => {
				this.treeData = res.data
			})
		}, 
		close: function () {
			this.formData = {};
			this.dialogVisible = false;
		},
		dialogOpen() {
			this.dialogTitle = this.activeItem ? "角色修改" : "新增角色" 
			this.formData = this.activeItem ? this.activeItem : {}
		},
		saveForm(){
			var params = this.formData
			params['auths'] = this.$refs.tree.getCheckedKeys()
			handleRole(params).then(res => {
				this.close()
				this.$parent.queryInfo()
			})
		},
	}
}
</script>
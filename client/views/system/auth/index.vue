<template>
	<div class="main-content">
		<app-table-form @to-query="queryInfo" :pagination="false" no-query>
			<el-button slot="handle-button" @click="queryInfo">查询</el-button>
			<el-button slot="handle-button" type="success" @click="addProject">新增</el-button>
			<template slot="table-list">
				<div type="title"><i class="el-icon-tickets"></i>权限列表</div>
    			<app-tree-table :data="tableData" :columns="columns" border>
			    	<el-table-column prop="sort_no" label="权限排序" width="180"></el-table-column>
			    	<el-table-column prop="auth" label="权限链接"></el-table-column>
			    	<el-table-column prop="symbol" label="权限标识"></el-table-column>
			    	<el-table-column prop="state" label="可见">
			        	<template slot-scope="scope">
							<el-tag :type="scope.row.state?'':'info'">{{ scope.row.state ? '显示' : '隐藏' }}</el-tag>
			        	</template>
					</el-table-column>
			      	<el-table-column label="操作" width="235">
			        	<template slot-scope="scope">
					        <el-button size='mini' @click="editProject(scope.row)">修改</el-button>
					        <el-button size='mini' type="success" @click="addProject(scope.row)">新增下级</el-button>
					        <el-button size='mini' type="danger" @click="delProject(scope.row)">删除</el-button>
			        	</template>
			      	</el-table-column>
    			</app-tree-table>
			</template>
		</app-table-form>
		<auth-form ref="authDialog"></auth-form>
	</div>
</template>
<script>
import authForm from './authForm'
import { getAuthList, deleteAuth, getAuthInfo } from '@/api/system/auth'

export default {
	name: 'authManage',
	components:{
		authForm
	},
	data() {
		return {
			columns:[{
				width: 200,
				value: "name",
				text: "权限名称"
			}],
			total: 0,
			queryFilters:{},
			tableData:[],
			activeId: null
      	}
	},
	methods: {
		addProject(item){
			let _id = item ? item._id : null
			this.$refs.authDialog.open(false, _id)
		},
		delProject(item){
			var _me = this
			_me.$confirm('此操作将永久删除该权限, 是否继续?', '提示').then(() => {
				deleteAuth({id: item._id}).then(res => {
					_me.$message.success('删除成功')
					_me.queryInfo(_me.queryFilters)        
				})
			})
		},
		editProject(item){
			getAuthInfo({id: item._id}).then(res => {
				this.$refs.authDialog.open(res.data);
			})
		},
		queryInfo(params){
			params = params || this.queryFilters;
			getAuthList(params).then(res => {
				this.tableData = res.data
			})
		}
	}
}
</script>

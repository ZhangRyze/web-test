<template>
	<div class="main-content">
		<app-table-form @to-query="queryInfo" :total="total">
            <template slot="query-form">
                <app-query-input label="角色名称" property="name" placeholder="请输入用户姓名"></app-query-input>
            </template>
			<el-button slot="handle-button" type="success" @click="addProject">新增</el-button>
			<template slot="table-list">
				<div type="title"><i class="el-icon-tickets"></i>角色列表</div>
				<el-table :data="tableData" border max-height="350" style="width: 100%">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column prop="code" label="角色编号"></el-table-column>
					<el-table-column prop="name" label="角色名称"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="250">
					    <template slot-scope="scope">
					        <el-button size='mini' @click="editProject(scope.row)">修改</el-button>
					        <el-button size='mini' type="danger" @click="delProject(scope.row)">删除</el-button>
					    </template>
				    </el-table-column>
				</el-table>
			</template>
		</app-table-form>
		<role-form ref="roleDialog"></role-form>
	</div>
</template>
<script>
import roleForm from './roleForm'
import { getRoleList, deleteRole, getRoleInfo } from '@/api/system/role'

export default {
	name: 'roleManage',
	components:{
		roleForm
	},
	data() {
		return {
			total: 0,
			queryFilters:{},
			tableData:[],
      	}
	},
	methods: {
		addProject(item){
			let _id = item ? item._id : null
			this.$refs.roleDialog.open(false, _id)
		},
		delProject(item){
			var _me = this
			_me.$confirm('此操作将永久删除该角色, 是否继续?', '提示').then(() => {
				deleteRole({id: item._id}).then(res => {
					_me.$message.success('删除成功')
					_me.queryInfo(_me.queryFilters)        
				})
			})
		},
		editProject(item){
			getRoleInfo({id: item._id}).then(res => {
				this.$refs.roleDialog.open(res.data);
			})
		},
		queryInfo(params){
			params = params || this.queryFilters;
			getRoleList(params).then(res => {
				this.total = res.data.total
				this.tableData = res.data.list
			})
		}
	}
}
</script>

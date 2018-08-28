<template>
	<div class="main-content">
		<app-table-form @to-query="queryInfo" :total="total">
			<template slot="query-form">
				<app-query-input label="字典编号" property="code" placeholder="请输入字典编号"></app-query-input>
				<app-query-input label="字典类型" property="codeName" placeholder="请输入字典名称"></app-query-input>
			</template>
			<el-button slot="handle-button" type="success" @click="addProject">新增</el-button>
			<template slot="table-list">
				<div type="title"><i class="el-icon-tickets"></i>字典列表</div>
				<el-table :data="tableData" border max-height="350" style="width: 100%">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column prop="code" label="字典编号"></el-table-column>
					<el-table-column prop="codeName" label="字典类型"></el-table-column>
					<el-table-column prop="name" label="字典名称"></el-table-column>
				    <el-table-column fixed="right" label="操作" width="250">
					    <template slot-scope="scope">
					        <el-button size='mini' @click="editProject(scope.row)">修改</el-button>
					        <el-button size='mini' @click="addKeys(scope.row)">添加键值</el-button>
					        <el-button size='mini' type="danger" @click="delProject(scope.row)">删除</el-button>
					    </template>
				    </el-table-column>
				</el-table>
			</template>
		</app-table-form>
		<dict-form ref="dictDialog"></dict-form>
	</div>
</template>
<script>
import dictForm from './dictForm'
import { getDictList, deleteDict, getDictInfo } from "@/api/system/dict"


export default {
	name: 'dictManage',
	components:{
		dictForm
	},
	data() {
		return {
			total: 0,
			queryFilters:{},
			activeItem: null,
			tableData:[],
		}
	},
	methods: {
		addProject(){
			this.$refs.dictDialog.open()
		},
		addKeys(item){
			this.$refs.dictDialog.open(false, item)
		},
		delProject(row){
			var _me = this
			_me.$confirm('此操作将永久删除该字典, 是否继续?', '提示').then(() => {
				deleteDict({id: item._id}).then(res => {
					_me.$message.success('删除成功')
					_me.queryInfo(_me.queryFilters)        
				})
			})
		},
		editProject(row){
			getDictInfo({id: row._id}).then(res => {
				this.$refs.dictDialog.open(res.data);
			})
		},
		checkProject(row){
			getDictInfo({id: row._id}).then(res => {
				this.$refs.dictTableDialog.open(res.data);
			})
		},
		queryInfo(params){
            params = params || this.queryFilters
			getDictList(params).then(res => {
				this.total = res.data.total
				this.tableData = res.data.list
			})
		}
	}
}

</script>
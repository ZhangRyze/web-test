<template>
	<div class="main-content">
		<app-table-form @to-query="queryInfo" :total="total">
			<template slot="query-form">
				<app-query-input label="字典编号" property="code" placeholder="请输入字典编号"></app-query-input>
				<app-query-input label="字典名称" property="name" placeholder="请输入字典名称"></app-query-input>
			</template>
			<el-button slot="handle-button" type="success" @click="addProject">新增</el-button>
			<template slot="table-list">
				<div type="title"><i class="el-icon-tickets"></i>字典列表</div>
				<el-table :data="tableData" border max-height="350" style="width: 100%">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column prop="code" label="字典编号"></el-table-column>
					<el-table-column prop="name" label="字典名称"></el-table-column>
				    <el-table-column fixed="right" label="操作">
					    <template slot-scope="scope">
					        <el-button size='mini' @click="editProject(scope.row)">修改</el-button>
					        <el-button size='mini' @click="checkProject(scope.row)">查看</el-button>
					        <el-button size='mini' type="danger" @click="delProject(scope.row)">删除</el-button>
					    </template>
				    </el-table-column>
				</el-table>
			</template>
		</app-table-form>
		<dict-form :dialog-title="dialogTitle" :active-item="activeItem" :dialog-visible="dialogVisible"></dict-form>
		<dict-table-form :dialog-title="dialogTableTitle" :active-item="activeItem" :dialog-visible="dialogTableVisible"></dict-table-form>
	</div>
</template>
<script>
import dictForm from './dictForm'
import dictTableForm from './dictTableForm'
import { getDictList } from "@/api/system/dict"


export default {
	name: 'dictManage',
	components:{
		dictForm,
		dictTableForm
	},
	data() {
		return {
			total: 0,
			queryFilters:{},
			activeItem: null,
			dialogTitle:"新增字典",
			dialogVisible:false,
			dialogTableTitle:"字典集合",
			dialogTableVisible:false,
			tableData:[],
		}
	},
	methods: {
		addProject(){
			this.dialogTitle = "新增字典";
			this.dialogVisible = true;
		},
		delProject(row){
			var params = row.id
			this.$http.delete({
				name:'字典',
				url: '/dictionary/deleteDictionary',
				params
			}).then(res => {
				this.queryInfo();
            })
		},
		editProject(row){
			this.dialogTitle = "字典修改";
			this.activeItem = row;
			this.dialogVisible = true;
		},
		checkProject(row){
			this.dialogTableTitle = "字典集合";
			this.activeItem = row;
			this.dialogTableVisible = true;
		},
		queryInfo(params){
			if(!params) params = this.queryFilters;
			getDictList(params).then(res => {
				console.log(res);
				
			})
		}
	}
}

</script>
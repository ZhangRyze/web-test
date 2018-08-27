<template>
	<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="dialogClose">
		<div class="dialog-table-handle" v-if="activeItem">
			<div class="handle-text">
				<span>父字典编号:{{activeItem.code}}</span>
				<span>父字典名称:{{activeItem.name}}</span>
			</div>
			<el-button size='mini' type="success" @click="addProject">新增</el-button>
		</div>
		<el-table :data="dictData" border>
			<el-table-column type="index" width="50"></el-table-column>
		    <el-table-column property="code" label="字典编号" width="150"></el-table-column>
		    <el-table-column property="name" label="字典名称" width="200"></el-table-column>
		    <el-table-column fixed="right" label="操作">
			    <template slot-scope="scope">
			        <el-button size='mini' @click="editProject(scope.row)">修改</el-button>
			        <el-button size='mini' type="danger" @click="delProject(scope.row)">删除</el-button>
			    </template>
		    </el-table-column>
		</el-table>
		<el-dialog width="30%" :title="dialogFormTitle" :visible.sync="dialogFormVisible" append-to-body @close="innerDialogClose">
			<el-form :model="formData">
				<el-form-item label="字典编码">
					<el-input v-model="formData.code" placeholder="请输入字典编码"></el-input>
				</el-form-item>
				<el-form-item label="字典名称">
					<el-input v-model="formData.name" placeholder="请输入字典名称"></el-input>
				</el-form-item>
				<el-form-item label="字典顺序">
					<el-input v-model="formData.sort_no" placeholder="请输入字典顺序"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取消</el-button>
		    	<el-button type="primary" @click="saveForm">确定</el-button>
		  	</span>
		</el-dialog>
		<div slot="footer" class="dialog-footer">
		  <el-button @click="dialogClose">取消</el-button>
		</div>
	</el-dialog>
</template>
<script>
export default {
	name: 'dictTabelForm',
	props: {
		dialogTitle:{
            type: String,
            default: '提示'
		},
        dialogVisible: {
            type: Boolean,
            default: false
        },
        activeItem:{
            type: Object,
            default: null
        }
	},
	data(){
		return {
			dictData:[],
          	formData:{},
          	dialogFormTitle: '新增字典',
          	dialogFormVisible: false
		}
	},
	methods: {
		dialogOpen(){
			var params = this.activeItem.id;
			this.$http.post({
				url: '/dictionary/getNextDictionary',
				params
			}).then(res => {
				this.dictData = res;
            }).catch(error=>{
            	console.error('ERROR', error);
            })
		},
		dialogClose(){
			this.dictData = [];
			this.$parent.dialogTableVisible = false;
		},
		innerDialogClose(){
			this.formData = {};
		},
		saveForm(){
			var params = this.formData;
			params['parent'] = this.activeItem.id;
			this.$http.post({
				url: '/dictionary/addDictionary',
				params
			}).then(res => {
				this.dialogOpen();
            	this.dialogFormVisible = false;
            }).catch(error=>{
            	console.error('ERROR', error);
            })
		},
		addProject(){
			this.dialogFormVisible = true;
		},
		editProject(row){
			var params = row.id
			this.$http.post({
				url: '/dictionary/findById',
				params
			}).then(res => {
				this.formData = res;
				this.dialogFormTitle = "字典修改";
				this.dialogFormVisible = true;
            }).catch(error=>{
            	console.error('ERROR', error);
            })
		},
		delProject(row){
			var params = row.id
			this.$http.delete({
				name:'字典',
				url: '/dictionary/deleteDictionary',
				params
			}).then(res => {
				this.dialogOpen();
            }).catch(error=>{
            	console.error('ERROR', error);
            })
		}
	}
}
</script>
<template>
	<el-dialog width='30%' :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="dialogClose">
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
	    	<el-button @click="dialogClose">取消</el-button>
	    	<el-button type="primary" @click="saveForm">确定</el-button>
	  	</span>
	</el-dialog>
</template>
<script>

export default {
	name: 'dictForm',
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
			formData: {}
		}
	},
	methods: {
		dialogOpen(){
			if(this.activeItem){
				var params = this.activeItem.id
				this.$http.post({
					url: '/dictionary/findById',
					params
				}).then(res => {
					this.formData = res;
	            }).catch(error=>{
	            	console.error('ERROR', error);
	            })
			}else{
				this.formData = {};
			}
		},
		dialogClose(){
			this.formData = {};
			this.$parent.activeItem = null;
			this.$parent.dialogVisible = false;
		},
		saveForm(){
			var params = this.formData
			this.$http.post({
				url: '/dictionary/addDictionary',
				params
			}).then(res => {
				this.dialogClose();
				this.$parent.queryInfo();
            }).catch(error=>{
            	console.error('ERROR', error);
            })
		},
	}
}
</script>
<template>
    <el-dialog width='30%' :title="dialogTitle" :visible.sync="dialogVisible" @open="dialogOpen" @close="dialogClose">
        <el-tree ref="authTree" :data="treeData" show-checkbox node-key="id" default-expand-all :props="defaultProps"></el-tree>
        <span slot="footer" class="dialog-footer">
	    	<el-button @click="dialogClose">取消</el-button>
	    	<el-button type="primary" @click="saveForm">保存</el-button>
	  	</span>
    </el-dialog>
</template>

<script>
    export default {
        name: "userAuthForm",
        props: {
            activeItem: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                dialogVisible: false,
                dialogTitle: "权限列表",
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        methods: {
            dialogOpen: function () {
                var params = this.activeItem.id;
                this.$http.post({
                    url: '/auth/getAuthByUser',
                    params
                }).then(res => {
                    this.treeData = this.$tools.convertTree(res.auth, 'parent');
                    var userAuth = [];
                    res.auth.forEach(item => {
                        if(res.userAuth.indexOf(item.id) >= 0 && item["children"] == undefined){
                            userAuth.push(item.id);
                        }
                    });
                    this.$refs.authTree.setCheckedKeys(userAuth);
                });
            },
            dialogClose: function () {
                this.dialogVisible = false;
                this.treeData = [];
            },
            saveForm: function () {
                var selectionNodeIds = this.$refs.authTree.getCheckedKeys();
                var selectionHalfNodeIds = this.$refs.authTree.getHalfCheckedKeys();
                var params = {user: {id: this.activeItem.id}, list: []};

                selectionNodeIds.forEach(nodeid => {
                    var nodeInfo = {};
                    nodeInfo.user = {id: this.activeItem.id};
                    nodeInfo.authority = {id: nodeid};
                    params.list.push(nodeInfo);
                });

                selectionHalfNodeIds.forEach(nodeid => {
                    var nodeInfo = {};
                    nodeInfo.user = {id: this.activeItem.id};
                    nodeInfo.authority = {id: nodeid};
                    params.list.push(nodeInfo);
                });

                this.$http.post({
                    url: '/auth/saveUserAuth',
                    params
                }).then(res => {
                    this.dialogVisible = false;
                });
            },
            Open: function () {
                this.dialogVisible = true;
            },
            Close: function () {
                this.dialogVisible = false;
            }


        }
    }
</script>

<style scoped>

</style>
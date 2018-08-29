<template>
	<el-table :data="formData" :row-style="showRow" v-bind="$attrs">
		<el-table-column v-if="columns.length===0" label="#" width="150">
			<template slot-scope="scope">
				<span class="ms-tree-space" :style="{width:scope.row._level*18 + 'px'}"></span>
				<span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.row)">
					<i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
					<i v-else class="el-icon-caret-bottom"></i>
				</span>
				{{scope.row._order}}
			</template>
		</el-table-column>
		<el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
			<template slot-scope="scope">
				<span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
				<span class="tree-ctrl" v-if="iconShow(index, scope.row)" @click="toggleExpanded(scope.row)">
					<i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
					<i v-else class="el-icon-caret-bottom"></i>
				</span>
				{{scope.row[column.value]}}
			</template>
		</el-table-column>
		<slot></slot>
	</el-table>
</template>
<script>
import treeToArray from './eval'

export default {
	name: 'AppTreeTable',
	props: {
		data: {
			type: [Array, Object],
			required: true
		},
		columns: {
			type: Array,
			default: () => []
		},
		evalFunc: Function,
		evalArgs: Array,
		expandAll: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			formData:[]
		}
	},
	watch:{
		data(){
			let tmp
			if (!Array.isArray(this.data)) {
				tmp = [this.data]
			} else {
				tmp = this.data
			}
			const func = this.evalFunc || treeToArray
			const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
			let newVal = func.apply(null, args)
			newVal.forEach((item_1)=>{
				this.formData.forEach((item_2)=>{
					if(item_1._id == item_2._id){
						item_1._expanded = item_2._expanded;
					}
				})
			})
			this.formData = newVal;
		}
	},
	methods: {
		showRow: function(row) {
			const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
			row.row._show = show
			return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
		},
		// 切换下级是否展开
		toggleExpanded: function(record) {
			record._expanded = !record._expanded
		},
		// 图标显示
		iconShow(index, record) {
			return (index === 0 && record.children && record.children.length > 0)
		}
	}
}
</script>
<style scoped>
	.ms-tree-space {
		position: relative;
		top: 1px;
		display: inline-block;
		font-style: normal;
		font-weight: 400;
		line-height: 1;
		height: 14px;
	}
	.ms-tree-space:before {
		content: ""
	}
	.processContainer{
		width: 100%;
		height: 100%;
	}
	table td {
		line-height: 26px;
	}
	.tree-ctrl{
		position: relative;
		cursor: pointer;
		color: #2196F3;
		margin-left: -18px;
	}
</style>

/**
* @Author: jianglei
* @Date:   2017-10-12 12:06:49
*/
'use strict'
import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null, order = null) {
	let tmp = []
	Array.from(data).forEach(function(record, index) {
		if (record._expanded === undefined) {
			Vue.set(record, '_expanded', expandAll)
		}
		let _order = index+1;
		let _level = 1
		if (level !== undefined && level !== null) {
			_level = level + 1
			_order = order + "-" + _order
		}
		Vue.set(record, '_level', _level)
		Vue.set(record, '_order', _order)
		// 如果有父元素
		if (parent) {
			Vue.set(record, 'parent', parent)
		}
		tmp.push(record)
		if (record.children && record.children.length > 0) {
			const children = treeToArray(record.children, expandAll, record, _level, _order)
			tmp = tmp.concat(children)
		}
	})
	return tmp
}

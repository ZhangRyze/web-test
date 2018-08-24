// 组件全局注册
import Vue from 'vue'

import AppTitle from '@/components/AppTitle'
import AppDictSelect from '@/components/AppDictSelect'
import AppTableForm from '@/components/AppTableForm'
import AppQueryInput from '@/components/AppQueryInput'
import AppQueryDictSelect from '@/components/AppQueryDictSelect'
import AppTreeTable from '@/components/AppTreeTable'

// 组件库
let Components = [
    AppTitle,
    AppDictSelect,
    AppTableForm,
    AppQueryInput,
    AppQueryDictSelect,
    AppTreeTable
]

// 注册全局组件
Components.forEach((com) =>{
	if(com.name) Vue.component(com.name, com)
})

export default Vue
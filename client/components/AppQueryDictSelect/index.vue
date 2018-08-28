<template>
    <div class="app-query-item">
        <label class="app-query-item-label" v-if="label">{{label}}</label>
        <div class="app-query-item-content">
            <el-select v-model="value" :placeholder="placeholder" @change="valueChange">
                <el-option v-if="optionFirst" :label="optionFirst?optionFirst:'全部'" value=""></el-option>
                <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
import { dictList } from "@/api/system/dict"
export default {
    name: 'AppQueryDictSelect',
    props: {
        dictType: {
            type: String,
            default: null
        },
        optionFirst: {
            type: String,
            default: null
        },
        operator: {
            type: String,
            default: 'like'
        },
        paramType: {
            type: String,
            default: 'Object'
        },
        property: {
            type: String,
            default: null
        },
        placeholder:{
            type: String,
            default: '请选择'
        },
        label:{
            type: String,
            default: null
        }
    },
    data(){
        return {
            componentName:'app-query-dict-select',
            value: null,
            options: []
        }
    },
    created(){
        if(this.dictType){
            this.queryDictList();
        }
    },
    mounted(){
        this.valueChange()
    },
    methods:{
        valueChange(val){
            this.$parent.resetQueryFilters({
                key: this.property,
                value: val ? val : ""
            })
        },
        queryDictList(){
            dictList({ code: this.dictType }).then(res => {
                this.options = res.data
            })
        },
    }
}
</script>
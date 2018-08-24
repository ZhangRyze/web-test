<template>
    <div class="app-query-item">
        <label class="app-query-item-label" v-if="label">{{label}}</label>
        <div class="app-query-item-content">
            <el-select v-model="value" :placeholder="placeholder" @change="valueChange">
                <el-option v-if="optionFirst" :label="optionFirst?optionFirst:'全部'" value=""></el-option>
                <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
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
            var params = {
                code: this.dictType
            }
            this.$http.get({
                url: '/dictionary/seachDictionary',
                params
            }).then(res => {
                this.options = res;
            })
        },
    }
}
</script>
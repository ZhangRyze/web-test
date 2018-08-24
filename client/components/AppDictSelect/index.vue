<template>
    <el-select v-model="value" :placeholder="placeholder" @change="valueChange" v-bind="$attrs">
        <el-option v-if="optionFirst" :label="optionFirst?optionFirst:'全部'" value=""></el-option>
        <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>
</template>

<script>
export default {
    name: 'AppDictSelect',
    props: {
        placeholder: {
            type: String,
            default: '请选择'
        },
        dictType: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        },
        optionFirst: {
            type: String,
            default: null
        }
    },
    data(){
        return {
            options:[],
        }
    },
    created(){
        if(this.dictType){
            this.queryDictList();
        }
    },
    methods:{
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
        valueChange(val){
            this.$emit('input', val);
        }
    }
}
</script>
<template>
    <el-select v-model="value" :placeholder="placeholder" @change="valueChange" v-bind="$attrs">
        <el-option v-if="optionFirst" :label="optionFirst?optionFirst:'全部'" value=""></el-option>
        <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"></el-option>
    </el-select>
</template>

<script>
import { dictList } from "@/api/system/dict"

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
        optionFirst: {
            type: String,
            default: null
        }
    },
    data(){
        return {
            value: null,
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
            dictList({ code: this.dictType }).then(res => {
                this.options = res.data
            })
        },
        valueChange(val){
            console.log(val);
            
            this.$emit('input', val);
        }
    }
}
</script>
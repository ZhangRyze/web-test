<template>
    <el-select v-model="value" :placeholder="placeholder" @change="valueChange" v-bind="$attrs">
        <el-option v-if="optionFirst" :label="optionFirst?optionFirst:'全部'" value=""></el-option>
        <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"></el-option>
    </el-select>
</template>

<script>
import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export default {
    name: 'AppSelect',
    props: {
        placeholder: {
            type: String,
            default: '请选择'
        },
        selectUrl: {
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
    activated(){
        if(this.selectUrl){
            this.queryList();
        }
    },
    methods:{
        queryList(){
            axios.post({
                url: selectUrl,
                data
            }).then(res => {
                this.options = res.data
            })
        },
        valueChange(val){
            this.$emit('input', val);
        }
    }
}
</script>
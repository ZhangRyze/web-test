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
import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export default {
    name: 'AppQuerySelect',
    props: {
        selectUrl: {
            type: String,
            default: null
        },
        optionFirst: {
            type: String,
            default: null
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
            componentName:'app-query-select',
            value: null,
            options: []
        }
    },
    activated(){
        if(this.selectUrl){
            this.queryList();
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
        queryList(){
            axios.post({
                url: this.selectUrl
            }).then(res => {
                this.options = res.data
            })
        },
    }
}
</script>
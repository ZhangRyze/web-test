<template>
    <div class="app-query-item">
        <label class="app-query-item-label" v-if="label">{{label}}</label>
        <div class="app-query-item-content">
            <el-input v-model="value" :placeholder="placeholder"></el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppQueryInput',
    props: {
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
            default: null
        },
        label:{
            type: String,
            default: null
        }
    },
    data(){
        return {
            componentName:'app-query-input',
            value: ""
        }
    },
    mounted(){
        this.valueChange()
    },
    watch:{
        value(val){
            this.valueChange(val)
        }
    },
    methods:{
        valueChange(val){
            this.$parent.resetQueryFilters({
                key: this.property,
                value: val ? val : "",
            })
        }
    }
}
</script>
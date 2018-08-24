## 调用说明
全局可调用，通过``` <app-table-form></app-table-form> ```调用，此组件只用来作为列表查询用。

## 查询方法
@to-query="xxx"或者v-on:to-query="xxx"，"xxx"为当前页面的查询方法，回调值为构建完成的参数。

## prop说明

#### *pagination*

是否需要分页插件，默认为true，若不需要标签绑定:pagination="false"。

#### *pageSize* **选填**

分也时需要参数，默认为10，需要自定义绑定:pageSize="20"

#### *total* **需要分页插件时必填**

分页插件的总条数，默认为0，需要实时传入值。

#### *noQuery* **选填**

是否需要查询条件，如不需要则绑定:noQuery="false"

#### *isTable* **选填**

是否是table查询，默认为true，如不需要则绑定:isTable="false"，设置isTable为false时则不需要传如分页相关

#### *queryForm* **选填**

父组件用来接收参数的对象，默认为"queryFilters"
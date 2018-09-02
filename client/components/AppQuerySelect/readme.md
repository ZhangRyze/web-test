## 调用说明
全局可调用，通过``` <app-query-dict-select></app-query-dict-select> ```调用

## prop说明
#### *dictType* **必填**

来源于字典表的字典编号，通过在标签添加``` dict-type="xxx" ```调用查询。

#### *property* **必填**

查询条件的key

#### *optionFirst* **选填**

用于是否需要有一个无值选项，例如：全部或者请选择。如果不需要就不填，如果需要通过``` option-first="xxx" ```调用。

#### *placeholder* **选填**

用于显示无选择时输入框内容，如果需要通过``` placeholder="xxx" ```调用。

#### *operator* **选填**

查询条件key与value的关系，默认是等于也就是"like"

#### *paramType* **选填**

查询条件的数据类型，默认为Object,暂无其他

#### *label* **选填**

查询条件的名称
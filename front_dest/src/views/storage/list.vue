<template>
  <div>
    <div class="search_form">
      <a-input placeholder="请输入仓库名称" v-model="searchForm.name"  style="width:200px;margin-right:30px;"></a-input>
      <a-input placeholder="请输仓库地址" v-model="searchForm.address" style="width:200px;margin-right:30px;"></a-input>
      <a-select placeholder="选择仓库状态" allowClear v-model="searchForm.status" style="width:200px;margin-right:30px;">
        <a-select-option :value="1">
          开启
        </a-select-option>
        <a-select-option :value="0">
          关闭
        </a-select-option>
      </a-select>
      <div>
        <a-date-picker @change="onChange" placeholder="请选择创建日期" style="margin-right:30px;"/>
      </div>
      <a-button style="margin-right:20px;" @click="getList">查询</a-button>
      <a-button type="primary" @click='showDrawer' v-if='$store.getters.userInfo.power == 1'>新增</a-button>
    </div>
    <a-table
      :columns="columns"
      bordered
      :loading="loading.list"
      :data-source="data"
      size="middle"
      :expandedRowKeys.sync="expandedRowKeys"
      :defaultExpandedRowKeys='expandedRowKeys'
      rowKey='id'
      @expand='expand'
      :pagination='{
        total:data.length,
        showTotal:(total)=>"共" + total + "条数据"
      }'>
      <a-table
        slot="expandedRowRender"
        slot-scope="text,record"
        :columns="innerColumns"
        :data-source="innerData"
        :pagination="false"
        size="middle"
      >
      </a-table>
      <template slot="status" slot-scope="text">
        <a-tag :color="text == 0 ? 'red' : 'green'">
          {{text == 0 ? "关闭" : "开启"}}
        </a-tag>
      </template>
      <template slot="operation" slot-scope="text,record">
        <a-button type="link" @click='updateUser(record)' v-if='$store.getters.userInfo.power == 1'>修改</a-button>
        <a-button type="link" @click='setStatus(record)' v-if='$store.getters.userInfo.power == 1'> {{record.status == 0 ? "开启仓库" : "关闭仓库"}}</a-button>
        <a-button type="link" @click='deleteStorageList(record.id)' v-if='$store.getters.userInfo.power == 1'>删除</a-button>
      </template>
    </a-table>
    <a-drawer
      :title="drawerTitle + '仓库'"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form  :model="form">
        <a-form-item label="仓库名称" required>
          <a-input v-model="form.name" allowClear/>
        </a-form-item>
        <a-form-item label="仓库地址" required>
          <a-input v-model="form.address" allowClear/>
        </a-form-item>
        <a-form-item label="仓库状态" required>
          <a-select placeholder="选择仓库状态" allowClear v-model="form.status" style="width:200px">
            <a-select-option :value="1">
              开启
            </a-select-option>
            <a-select-option :value="0">
              关闭
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item required>
          <a-date-picker @change="onChangeForm" placeholder="请选择创建日期" :default-value="moment(form.openDate)" style="width:200px" :allowClear='false'/>
        </a-form-item>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="submit">
          确定
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { addAndUpdateStorage, deleteStorage, getStorageList } from '@/api/storageData'
import moment from 'moment'
export default{
  data(){
    return{
      drawerTitle:"新增",
      expandedRowKeys:[],
      form:{
        id:"",
        name:'',
        address:'',
        status:1,
        openDate:this.getCurrentDate()
      },
      searchForm:{
        name:'',
        address:'',
        status:undefined,
        openDate:undefined
      },
      loading:{
        list:false,
      },
      innerData:[],
      columns:[
        {
          dataIndex: 'id',
          title: 'id',
          key:'id'
        },
        {
          title: '仓库名称',
          dataIndex: 'name',
          key: 'age',
        },
        {
          title: '仓库地址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '仓库状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots:{customRender:"status"}
        },
        {
          title: '创建日期',
          dataIndex: 'openDate',
          key: 'openDate',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          width:300
        },
      ],
      innerColumns:[
        {
          dataIndex: 'name',
          title: '货物名称',
          key:'name'
        },
        {
          dataIndex: 'type',
          title: '货物类型',
          key:'type'
        },
        {
          dataIndex: 'total',
          title: '库存量',
          key:'total'
        },
        {
          dataIndex: 'providerName',
          title: '货物供应商',
          key:'providerName'
        },
        {
          dataIndex: 'providerPhone',
          title: '供应商联系方式',
          key:'providerPhone'
        },

      ],
      data:[],
      visible:false
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    moment,
    expand(isExpand,obj){
      console.log(isExpand,obj)
      if (!this.expandedRowKeys.length && isExpand) {
        this.expandedRowKeys.push(obj.id)
      }else if(!isExpand) {
        this.expandedRowKeys = []
      }else if(this.expandedRowKeys.length && isExpand){
        this.expandedRowKeys = [obj.id]
      }else{
        this.expandedRowKeys = [obj.id]
      }
      this.innerData = obj.goods
      console.log(this.expandedRowKeys)
    },
    onChange(date, dateString){
      console.log(date, dateString)
      this.searchForm.openDate = dateString
    },
    onChangeForm(date, dateString){
      this.form.openDate = dateString
    },
    async getList(){
      const params = new URLSearchParams()
      for (const key in this.searchForm) {
        params.append(key, this.searchForm[key])
      }
      this.loading.list = true
      let res = await getStorageList(params)
      console.log(res);
      this.data = res.data
      this.loading.list = false
    },
    showDrawer() {
      console.log(this.form)
      this.drawerTitle = "新增"
      this.visible = true;
    },
    updateUser(data){
      this.drawerTitle = "修改"
      this.visible = true;
      this.form = JSON.parse(JSON.stringify(data))
    },
    onClose() {
      this.form = {
        id:"",
        name:'',
        address:'',
        status:1,
        openDate:this.getCurrentDate()
      }
      this.visible = false;
    },
    async submit(){
      if (!this.form.name) return this.$message.warning("请输入仓库名称")
      if (!this.form.address) return this.$message.warning("请输入仓库地址")
      const params = new URLSearchParams()
      for (const key in this.form) {
        params.append(key, this.form[key])
      }
      let res = await addAndUpdateStorage(params)
      console.log(res)
      if (res.data){
        this.$message.success(this.drawerTitle + "成功")
        this.getList()
        this.onClose()
      }else{
        this.$message.error(res.msg)
      }
    },
    async setStatus(data){
      data.status = data.status === 1 ? 0 : 1
      const params = new URLSearchParams()
      for (const key in data) {
        params.append(key, data[key])
      }
      let res = await addAndUpdateStorage(params)
      if (res.data){
        this.$message.success("设置成功")
        this.getList()
      }else{
        this.$message.error(res.msg)
      }
    },
    async deleteStorageList(id){
      const params = new URLSearchParams()
      params.append("id",id)
      let res = await deleteStorage(params)
      if (!res.status){
        this.$message.success(res.msg)
        this.getList()
      }else{
        this.$message.error(res.msg)

      }
    },
    getCurrentDate(){
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = currentDate.getDate().toString().padStart(2, '0');
      const formattedDateTime = `${year}-${month}-${day}`;
      return formattedDateTime;
    }
  }
}
</script>
<style scoped>
.search_form{
  width: 100%;
  display: flex;
  height: 50px;
}
</style>
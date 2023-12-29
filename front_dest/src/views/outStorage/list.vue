<template>
  <div>
    <div class="search_form">
      <a-select
        placeholder="选择货物"
        v-model="searchForm.goodsId"
        style="width:200px;margin-right:30px;"
        @change="handleChange"
        allowClear
        :show-arrow="false"
        :filter-option="false"
        show-search
        @search='handleGoodsSearch'
      >
        <a-select-option v-for="i in goodsList" :key="i.id">
          {{i.name}}
        </a-select-option>
      </a-select>
      <a-select
        placeholder="选择仓库"
        v-model="searchForm.storageId"
        style="width:200px;margin-right:30px;"
        @change="handleChange"
        allowClear
        :show-arrow="false"
        :filter-option="false"
        show-search
        @search='handleStorageSearch'
      >
        <a-select-option v-for="i in storageList" :key="i.id">
          {{i.name}}
        </a-select-option>
      </a-select>
      <a-select
        placeholder="选择供应商"
        v-model="searchForm.providerId"
        style="width:200px;margin-right:30px;"
        @change="handleChange"
        allowClear
        :show-arrow="false"
        :filter-option="false"
        show-search
        @search='handleProviderSearch'
      >
        <a-select-option v-for="i in providerList" :key="i.id">
          {{i.name}}
        </a-select-option>
      </a-select>
      <a-select
        placeholder="选择客户"
        v-model="searchForm.customerId"
        style="width:200px;margin-right:30px;"
        @change="handleChange"
        allowClear
        :show-arrow="false"
        :filter-option="false"
        show-search
        @search='handleCustomerSearch'
      >
        <a-select-option v-for="i in customerList" :key="i.id">
          {{i.name}}
        </a-select-option>
      </a-select>
      <a-select
        placeholder="选择管理员"
        v-model="searchForm.userId"
        style="width:200px;margin-right:30px;"
        @change="handleChange"
        allowClear
        :show-arrow="false"
        :filter-option="false"
        show-search
        @search='handleUserSearch'
      >
        <a-select-option v-for="i in userList" :key="i.id">
          {{i.name}}
        </a-select-option>
      </a-select>
      <div>
        <a-date-picker @change="onChange" placeholder="请选择入库日期" style="margin-right:30px;"/>
      </div>
    </div>
    <div class='search_form' style='justify-content: flex-end;'>
      <a-button style="margin-right:20px;" @click="getList">查询</a-button>
      <a-button type="primary" @click='showDrawer' style='margin-right: 30px' v-if='$store.getters.userInfo.power == 1'>新增</a-button>
    </div>
    <a-table :columns="columns" bordered :loading="loading.list" :data-source="data" size="middle" :pagination='{
        total:data.length,
        showTotal:(total)=>"共" + total + "条数据"
      }'>
      <template slot="operation" slot-scope="text,record">
        <a-button type="link" @click='updateUser(record)' v-if='$store.getters.userInfo.power == 1'>修改</a-button>
        <a-button type="link" @click='deleteOutStorageList(record.id)' v-if='$store.getters.userInfo.power == 1'>删除</a-button>
      </template>
    </a-table>
    <a-drawer
      :title="drawerTitle + '入库订单'"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form  :model="form">
        <a-form-item label="选择货物" required>
          <a-select
            placeholder="选择货物"
            v-model="form.goodsId"
            style="margin-right:30px;"
            @change="handleChange"
            allowClear
            :disabled='drawerTitle == "修改"'
            :show-arrow="false"
            :filter-option="false"
            show-search
            @search='handleGoodsSearch'
          >
            <a-select-option v-for="i in goodsList" :key="i.id">
              {{i.name}}---{{i.providerName}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择仓库" required>
          <a-select
            placeholder="选择仓库"
            v-model="form.storageId"
            :disabled='drawerTitle == "修改"'
            style="margin-right:30px;"
            @change="handleChange"
            allowClear
            :show-arrow="false"
            :filter-option="false"
            show-search
            @search='handleStorageSearch'
          >
            <a-select-option v-for="i in storageList" :key="i.id">
              {{i.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label='入库数量' required>
          <a-input-number :min='1' :max='300' v-model='form.total' style=" width: 100%; margin-right:30px;"></a-input-number>
        </a-form-item>
        <a-form-item label='选择客户' required>
          <a-select
            placeholder="选择客户"
            v-model="form.customerId"
            style="margin-right:30px;"
            @change="handleChange"
            allowClear
            :show-arrow="false"
            :filter-option="false"
            show-search
            @search='handleCustomerSearch'
          >
            <a-select-option v-for="i in customerList" :key="i.id">
              {{i.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label='选择入库日期' required >
          <a-date-picker @change="onChangeForm" :disabled='drawerTitle == "修改"' placeholder="请选择入库日期" :default-value="moment(form.time)" style="width:200px" :allowClear='false'/>
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
import { getGoodsList, addAndUpdateGoods, deleteGoods } from '@/api/goods'
import moment from 'moment'
import { addAndUpdatePAC, deletePAC, getPADList } from '@/api/providerAndCustomer'
import {getStorageList} from "@/api/storageData"
import { addAndUpdateInStorage, deleteInStorage, getInStorageList } from '@/api/inStorage'
import { getUserList } from '@/api/user'
import { addAndUpdateOutStorage, deleteOutStorage, getOutStorageList } from '@/api/outStorage'
export default{
  data(){
    return{
      providerList:[],
      customerList:[],
      userList:[],
      goodsList:[],
      storageList:[],
      drawerTitle:"新增",
      form:{
        id:'',
        goodsId:undefined,
        storageId:undefined,
        customerId:undefined,
        total:undefined,
        userId:undefined,
        time:this.getCurrentDate(),
      },
      searchForm:{
        goodsId:undefined,
        storageId:undefined,
        customerId:undefined,
        providerId:undefined,
        userId:undefined,
        time:'',
      },
      storageStatus:0,
      loading:{
        list:false,
      },
      columns:[
        {
          dataIndex: 'id',
          title: 'id',
          key:'id'
        },
        {
          title: '货物名称',
          dataIndex: 'goodsName',
          key: 'goodsName',
        },
        {
          title: '存放仓库',
          dataIndex: 'storageName',
          key: 'storageName',
        },
        {
          title: '货物供应商',
          dataIndex: 'providerName',
          key: 'providerName',
        },
        {
          title: '总数',
          dataIndex: 'total',
          key: 'total',
        },
        {
          title: '客户',
          dataIndex: 'customerName',
          key: 'customerName',
        },
        {
          title: '创建人',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: '创建人联系方式',
          dataIndex: 'userPhone',
          key: 'userPhone',
        },
        {
          title: '入库时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          width:180
        },
      ],
      data:[],
      visible:false,
    }
  },
  mounted() {
    this.getList()
    this.handleProviderSearch('')
    this.handleCustomerSearch('')
    this.handleGoodsSearch('')
    this.handleStorageSearch('')
    this.handleUserSearch('')
  },
  methods:{
    moment,
    handleChange(value){
      console.log(value)
    },
    handleProviderSearch(value){
      const params = new URLSearchParams()
      params.append("type",0)
      params.append('name',value || "")
      params.append("address","")
      params.append("phone","")
      getPADList(params).then(res=>{
        this.providerList = res.data
      })
    },
    handleCustomerSearch(value){
      const params = new URLSearchParams()
      params.append("type",1)
      params.append('name',value || "")
      params.append("address","")
      params.append("phone","")
      getPADList(params).then(res=>{
        this.customerList = res.data
      })
    },
    handleGoodsSearch(value){
      const params = new URLSearchParams()
      params.append("type","")
      params.append("providerId",undefined)
      params.append('name',value || "")
      getGoodsList(params).then(res=>{
        this.goodsList = res.data
      })
    },
    handleStorageSearch(value){
      const params = new URLSearchParams()
      params.append("address","")
      params.append("status",this.storageStatus)
      params.append("openDate",undefined)
      params.append('name',value || "")
      getStorageList(params).then(res=>{
        this.storageList = res.data
      })
    },
    handleUserSearch(value){
      const params = new URLSearchParams()
      params.append('name',value || "")
      getUserList(params).then(res=>{
        this.userList = res.data
      })
    },
    onChange(date, dateString){
      console.log(date, dateString)
      this.searchForm.time = dateString
    },
    onChangeForm(date, dateString){
      this.form.time = dateString
    },
    async getList(){
      const params = new URLSearchParams()
      for (const key in this.searchForm) {
        params.append(key, this.searchForm[key])
      }
      this.loading.list = true
      let res = await getOutStorageList(params)
      console.log(res);
      this.data = res.data
      this.loading.list = false
    },
    showDrawer() {
      this.storageStatus = 1
      this.handleStorageSearch("")
      console.log(this.form)
      this.drawerTitle = "新增"
      this.visible = true;
    },
    updateUser(data){
      this.drawerTitle = "修改"
      this.visible = true;
      this.storageStatus = 1
      this.handleStorageSearch("")
      this.form = JSON.parse(JSON.stringify(data))
      console.log(this.form )
    },
    onClose() {
      this.storageStatus = 0
      this.handleStorageSearch("")
      this.form = {
        id:'',
        goodsId:undefined,
        storageId:undefined,
        total:undefined,
        userId:undefined,
        time:this.getCurrentDate(),
      }
      this.visible = false;
    },
    async submit(){
      if (!this.form.goodsId) return this.$message.warning("请选择货物")
      if (!this.form.storageId) return this.$message.warning("请选择存放仓库")
      if (!this.form.total) return this.$message.warning("请填写存放数量")
      if (!this.form.customerId) return this.$message.warning("请选择客户")
      this.form.userId = this.$store.getters.userInfo.id
      const params = new URLSearchParams()
      for (const key in this.form) {
        params.append(key, this.form[key])
      }
      console.log(this.form)
      let res = await addAndUpdateOutStorage(params)
      console.log(res)
      if (res.data){
        this.$message.success(this.drawerTitle + "成功")
        this.getList()
        this.onClose()
      }else{
        this.$message.error(res.msg)
      }
    },
    async deleteOutStorageList(id){
      const params = new URLSearchParams()
      params.append("id",id)
      let res = await deleteOutStorage(params)
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
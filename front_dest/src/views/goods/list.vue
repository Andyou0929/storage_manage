<template>
  <div>
    <div class="search_form">
      <a-input placeholder="请输入货物名称" v-model="searchForm.name"  style="width:200px;margin-right:30px;"></a-input>
      <a-input placeholder="请输入货物类型" v-model="searchForm.type" style="width:200px;margin-right:30px;"></a-input>
      <a-select
        placeholder="选择供应商"
        v-model="searchForm.providerId"
        style="width:200px;margin-right:30px;"
        @change="handleChange"
        allowClear
        :show-arrow="false"
        :filter-option="false"
        show-search
        @search='handleSearch'
      >
        <a-select-option v-for="i in providerList" :key="i.id">
          {{i.name}}
        </a-select-option>
      </a-select>
      <a-button style="margin-right:20px;" @click="getList">查询</a-button>
      <a-button type="primary" @click='showDrawer' v-if='$store.getters.userInfo.power == 1'>新增</a-button>
    </div>
    <a-table :columns="columns" bordered :loading="loading.list" :data-source="data" size="middle" :pagination='{
        total:data.length,
        showTotal:(total)=>"共" + total + "条数据"
      }'>
      <template slot="operation" slot-scope="text,record">
        <a-button type="link" @click='updateUser(record)' v-if='$store.getters.userInfo.power == 1'>修改</a-button>
        <a-button type="link" @click='deleteStorageList(record.id)' v-if='$store.getters.userInfo.power == 1'>删除</a-button>
      </template>
    </a-table>
    <a-drawer
      :title="drawerTitle + '货物'"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form  :model="form">
        <a-form-item label="货物名称" required>
          <a-input v-model="form.name" allowClear/>
        </a-form-item>
        <a-form-item label="货物类型" required>
          <a-input v-model="form.type" allowClear/>
        </a-form-item>
        <a-form-item label="货物供应商" required>
          <a-select
            placeholder="选择供应商"
            v-model="form.providerId"
            style="width:200px;margin-right:30px;"
            @change="handleChange"
            allowClear
            :show-arrow="false"
            :filter-option="false"
            show-search
            @search='handleSearch'
          >
            <a-select-option v-for="i in providerList" :key="i.id">
              {{i.name}}
            </a-select-option>
          </a-select>
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
export default{
  data(){
    return{
      providerList:[],
      drawerTitle:"新增",
      form:{
        id:'',
        name:'',
        providerId:undefined,
        type:""
      },
      searchForm:{
        name:'',
        providerId:undefined,
        type:""
      },
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
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '货物类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '货物供应商',
          dataIndex: 'providerName',
          key: 'providerName',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          width:300
        },
      ],
      data:[],
      visible:false
    }
  },
  mounted() {
    this.getList()
    this.handleSearch('')
  },
  methods:{
    moment,
    handleChange(value){
      console.log(value)
    },
    handleSearch(value){
      const params = new URLSearchParams()
      params.append("type",0)
      params.append('name',value || "")
      params.append("address","")
      params.append("phone","")
      getPADList(params).then(res=>{
        this.providerList = res.data
        console.log(this.providerList,'        console.log(this.providerList)\n')
      })


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
      let res = await getGoodsList(params)
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
        id:'',
        name:'',
        providerId:undefined,
        type:""
      }
      this.visible = false;
    },
    async submit(){
      if (!this.form.name) return this.$message.warning("请输入货物名称")
      if (!this.form.type) return this.$message.warning("请输入货物类型")
      if (!this.form.providerId) return this.$message.warning("请选择货物供应商")
      const params = new URLSearchParams()
      for (const key in this.form) {
        params.append(key, this.form[key])
      }
      console.log(this.form)
      let res = await addAndUpdateGoods(params)
      console.log(res)
      if (res.data){
        this.$message.success(this.drawerTitle + "成功")
        this.getList()
        this.onClose()
      }else{
        this.$message.error(res.msg)
      }
    },
    async deleteStorageList(id){
      const params = new URLSearchParams()
      params.append("id",id)
      let res = await deleteGoods(params)
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
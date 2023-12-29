<template>
  <div>
    <div class="search_form">
      <a-input placeholder="请输入客户名称" v-model="searchForm.name"  style="width:200px;margin-right:30px;"></a-input>
      <a-input placeholder="请输入客户地址" v-model="searchForm.address" style="width:200px;margin-right:30px;"></a-input>
      <a-input placeholder="请输入客户联系方式" v-model="searchForm.phone" style="width:200px;margin-right:30px;"></a-input>
      <a-button style="margin-right:20px;" @click="getList">查询</a-button>
      <a-button type="primary" @click='showDrawer' v-if='$store.getters.userInfo.power == 1'>新增</a-button>
    </div>
    <a-table :columns="columns" bordered :loading="loading.list" :data-source="data" size="middle" :pagination='{
        total:data.length,
        showTotal:(total)=>"共" + total + "条数据"
      }'>
      <template slot="status" slot-scope="text">
        <a-tag :color="text == 0 ? 'red' : 'green'">
          {{text == 0 ? "关闭" : "开启"}}
        </a-tag>
      </template>
      <template slot="operation" slot-scope="text,record">
        <a-button type="link" @click='updateUser(record)' v-if='$store.getters.userInfo.power == 1'>修改</a-button>
        <a-button type="link" @click='deleteStorageList(record.id)' v-if='$store.getters.userInfo.power == 1'>删除</a-button>
      </template>
    </a-table>
    <a-drawer
      :title="drawerTitle + '客户'"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form  :model="form">
        <a-form-item label="客户名称" required>
          <a-input v-model="form.name" allowClear/>
        </a-form-item>
        <a-form-item label="客户地址" required>
          <a-input v-model="form.address" allowClear/>
        </a-form-item>
        <a-form-item label="客户联系方式" required>
          <a-input v-model="form.phone" allowClear/>
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
import { addAndUpdatePAC, deletePAC, getPADList } from '@/api/providerAndCustomer'
export default{
  data(){
    return{
      drawerTitle:"新增",
      form:{
        id:'',
        name:'',
        address:'',
        phone:'',
        type:1
      },
      searchForm:{
        name:'',
        address:'',
        phone:'',
        type:1
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
          title: '客户名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '客户地址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '客户联系方式',
          dataIndex: 'phone',
          key: 'phone',
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
  },
  methods:{
    moment,
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
      let res = await getPADList(params)
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
      this.form.type = 1
    },
    onClose() {
      this.form = {
        id:'',
        name:'',
        address:'',
        phone:'',
        type:1
      }
      this.visible = false;
    },
    async submit(){
      if (!this.form.name) return this.$message.warning("请输入客户名称")
      if (!this.form.address) return this.$message.warning("请输入客户地址")
      if (!this.form.phone) return this.$message.warning("请输入客户联系方式")
      const params = new URLSearchParams()
      for (const key in this.form) {
        params.append(key, this.form[key])
      }
      console.log(this.form)
      let res = await addAndUpdatePAC(params)
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
      params.append("type",this.form.type)
      let res = await deletePAC(params)
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
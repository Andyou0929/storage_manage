<template>
    <div>
        <div class="search_form">
            <a-input placeholder="请输入姓名" v-model="searchForm.name"  style="width:200px;margin-right:30px;"></a-input>
            <a-input placeholder="请输联系方式" v-model="searchForm.phone" style="width:200px;margin-right:30px;"></a-input>
            <a-select placeholder="是否为管理员" allowClear v-model="searchForm.power" style="width:200px;margin-right:30px;">
                <a-select-option :value="1">
                    是管理员
                </a-select-option>
                <a-select-option :value="2">
                    不是管理员
                </a-select-option>
            </a-select>
            <a-button style="margin-right:20px;" @click="getList">查询</a-button>
            <a-button type="primary" v-if='$store.getters.userInfo.power == 1' @click='showDrawer'>新增</a-button>
        </div>
        <a-table :columns="columns" bordered :loading="loading.list" :data-source="data" size="middle" :pagination='{
        total:data.length,
        showTotal:(total)=>"共" + total + "条数据"
      }'>
            <template slot="power" slot-scope="text">
                <a-tag :color="text == 0 ? 'green' : 'red'">
                    {{text == 0 ? "用户" : "管理员"}}
                </a-tag>
            </template>
            <template slot="operation" slot-scope="text,record" >
              <a-button type="link" @click='updateUser(record)' v-if='$store.getters.userInfo.power == 1'>修改</a-button>
              <a-button type="link" @click='setPower(record)' v-if='$store.getters.userInfo.power == 1'> {{record.power == 0 ? "设置管理员" : "取消管理员"}}</a-button>
              <a-button type="link" @click='deleteUser(record.id)' v-if='$store.getters.userInfo.power == 1'>删除</a-button>
            </template>
        </a-table>
      <a-drawer
        :title="drawerTitle + '用户'"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form  :model="form">
          <a-form-item label="用户名" required>
            <a-input v-model="form.name" allowClear :disabled='drawerTitle == "修改"'/>
          </a-form-item>
          <a-form-item label="联系方式" required>
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
import { addUser, getUserList, updatePower, deleteUser, updateUser } from '@/api/user'
    export default{
        data(){
           return{
             drawerTitle:"新增",
             form:{
               id:"",
               name:'',
               phone:'',
               password:"123456",
               power:0,
             },
            searchForm:{
                name:'',
                phone:'',
                power:undefined,
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
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'age',
                },
                {
                    title: '联系方式',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: '是否为管理员',
                    dataIndex: 'power',
                    key: 'power',
                    scopedSlots:{customRender:"power"}
                },
                {
                    title: '操作',
                    scopedSlots: { customRender: 'operation' },
                    width:300,
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
            async getList(){
                 const params = new URLSearchParams()
                for (const key in this.searchForm) {
                    params.append(key, this.searchForm[key])
                }
                this.loading.list = true
                let res = await getUserList(params)
                console.log(res);
                this.data = res.data
                this.loading.list = false
            },
            showDrawer() {
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
                phone:'',
                password:"123456",
                power:0,
              }
              this.visible = false;
            },
          async submit(){
              if (!this.form.name) return this.$message.warning("请输入用户名")
              if (!this.form.phone) return this.$message.warning("请输入联系方式")
              if (this.drawerTitle == "新增"){
                this.form.id =  "U" +new Date().getTime()
                const params = new URLSearchParams()
                for (const key in this.form) {
                  params.append(key, this.form[key])
                }
                let res = await addUser(params)
                console.log(res)
                if (res.data){
                  this.$message.success("新增成功，默认密码为'123456'")
                  this.getList()
                }else{
                  this.$message.error(res.msg)
                }
                this.onClose()
              }else{
                const params = new URLSearchParams()
                for (const key in this.form) {
                  params.append(key, this.form[key])
                }
                console.log(this.form)
                let res = await updateUser(params)
                if (res.data){
                  this.$message.success("修改成功")
                  this.getList()
                }else{
                  this.$message.error(res.msg)
                }
                this.onClose()
              }
          },
          async setPower(data){
            const params = new URLSearchParams()
            params.append("id",data.id)
            params.append("power",data.power)
            let res = await updatePower(params)
            if (res.data){
              this.$message.success("设置成功")
              this.getList()
            }else{
              this.$message.error(res.msg)
            }
          },
          async deleteUser(id){
            const params = new URLSearchParams()
            params.append("id",id)
              let res = await deleteUser(params)
              if (!res.status){
                this.$message.success(res.msg)
                this.getList()
              }else{
                this.$message.error(res.msg)

              }
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
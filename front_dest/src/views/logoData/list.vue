<template>
  <div>
    <div class="search_form">
      <a-input placeholder="请输入管理员姓名" v-model="searchForm.name"  style="width:200px;margin-right:30px;"></a-input>
      <a-input placeholder="请输操作内容" v-model="searchForm.operation" style="width:200px;margin-right:30px;"></a-input>
      <a-button style="margin-right:20px;" @click="getList">查询</a-button>
    </div>
    <a-table :columns="columns" bordered :loading="loading.list" :data-source="data" size="middle" :pagination='{
        total:data.length,
        showTotal:(total)=>"共" + total + "条数据"
      }'>
    </a-table>
  </div>
</template>
<script>
import {getLogDataList} from "@/api/logData"
export default{
  data(){
    return{
      searchForm:{
        name:'',
        operation:'',
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
          key: 'name',
        },
        {
          title: '联系方式',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '操作内容',
          dataIndex: 'operation',
          key: 'operation',
        },
        {
          title: '操作时间',
          dataIndex: 'operationDate',
          customRender:(text)=>text || "--",
          key: 'operationDate',
        }
      ],
      data:[],
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
      let res = await getLogDataList(params)
      console.log(res);
      this.data = res.data
      this.loading.list = false
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
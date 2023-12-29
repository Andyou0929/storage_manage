<template>
  <div>
      <div style='display: flex;justify-content: space-evenly'>
        <a-card v-for='item in allCount' :key='item.key' hoverable style='width: 200px;display: flex'>
          <div class='title' v-html='item.name'></div>
          <div class='num'>{{item.num}}</div>
        </a-card>
      </div>
      <div style='margin-top: 25px'>
        <span>仓库货物统计</span>
        <div ref="chart" style="width: 100%; height: 400px;"></div>
      </div>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/home'
import * as echarts from 'echarts';
import { getStorageList } from '@/api/storageData'

export default {
  name: 'index',
  data(){
    return{
      allCount:[
        { key: 'storagedata',num:0,name:'&nbsp;&nbsp;仓库数量'},
        { key: 'goods',num:0,name:'&nbsp;&nbsp;货物数量'},
        { key: 'provider',num:0,name:'供应商数量'},
        { key: 'customer',num:0,name:'&nbsp;&nbsp;顾客数量'}
      ],
      EChartsData:{
        xAxis:[],
        yAxis:[],
      }
    }
  },
  mounted() {
    this.getCount()
    this.getStorageList()
  },
  methods:{
    async getCount(){
      let res = await getGoodsList()
      console.log(res)
      this.allCount.forEach(item=>{
        item.num = res.data[item.key]
      })
    },
    getStorageList(){
      const params = new URLSearchParams()
      params.append("address","")
      params.append("status","")
      params.append("openDate",undefined)
      params.append('name',"")
      getStorageList(params).then(res=>{
        console.log(res)
        this.EChartsData.xAxis = res.data.map(item=>item.name)
        this.EChartsData.yAxis = res.data.map(item=> item.goods.reduce((sum,i) => sum + i.total,0))
        console.log(this.EChartsData)
        this.initChart();
      })
    },
    sum(data){
      return
    },
    initChart() {
      this.$nextTick(()=>{
        // 获取容器
        const chartContainer = this.$refs.chart;

        // 初始化 ECharts 实例
        const myChart = echarts.init(chartContainer);

        // 设置图表配置项和数据
        const option = {
          xAxis: {
            type: 'category',
            data: this.EChartsData.xAxis
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.EChartsData.yAxis,
              type: 'bar',
              label: {
                show: true,
                position: 'top', // 可以根据需要调整位置
                formatter: '{c}', // 显示数据值
              },
              itemStyle: {
                // 设置柱形的颜色，可以是单一颜色，也可以是渐变色
                color: 'skyblue',
                // 可以通过设置 color 数组来为每个柱形指定不同的颜色
                // color: ['#FF5733', '#33FF57', '#5733FF', '#FF33D1', '#33C4FF'],
              },
            }
          ],

        };

        // 使用配置项设置图表
        myChart.setOption(option);
      })
    },
  }
}
</script>

<style scoped>
.title{
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  width: 100%;
}
.num{
  width: 100%;
  color: #1890ff;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
</style>
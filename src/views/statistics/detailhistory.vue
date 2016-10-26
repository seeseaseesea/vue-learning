<style>
.chart {

    width: 780px ;
    height: 500px;
    position: relative;

}
.chart2 {

    width: 780px ;
    height: 400px;
    position: relative;

}
</style>
<template>
<div class="pressure">
  <div class="row clearfix">
    <div class="col-md-12 column">
      <div class="page-header">
        <h1>
          <small><span style="color:#1bb2d8">a</span></small></h1>
      </div>
    </div>
  </div>
  <div class="row clearfix">
    <br/>
    <br/>
    <div class="col-md-12 column">
      <h4>
        <small>{{date}}a &nbsp;&nbsp;</small><button class="btn btn-default" @click="recompute">重新计算</button>
                <span style="color:#1bb2d8">{{msg1}}</span></h4>
                
      <div class="chart" v-echarts="barChartOption"></div>
    </div>
  </div>
  <div class="row clearfix">
    <br/>
    <br/>
      <div class="col-md-12 column">
      <table class="table table-hover table-bordered">
        <tbody>
          <tr>
            <th width="9%">a</th>
            <td width="13%">{{count}}</td>
            <th style=" color:red " width="13%">a</th>
            <td style=" color:red " width="13%">{{black}}</td></tr>
          <tr>
            <th width="13%">a</th>
            <td width="1d%">{{send}}</td>
            <th width="13%">a</th>
            <td width="13%">{{receive}}</td></tr>
          <tr>
            <th width="13%">a</th>
            <td width="13%">{{ip_max_send}}</td>
            <th width="13%">a</th>
            <td width="13%">{{ip_max_send_rate}}%</td></tr>
          <tr>
            <th width="13%">a(ms)</th>
            <td width="13%">{{avg_delay}}</td>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
    <div class="row clearfix">
   
    <div class="col-md-12 column">     
       <h4>
        <small>a</small></h4>
      <div class="chart2" v-echarts="lineChartOption"></div>
    </div>  
  </div>
  <div class="row clearfix">
    <div class="col-md-12 column">
         <h4>
        <small>a</small></h4>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
           <th width="9%">a</th>
            <th width="14%">a</th>
            <th width="10%">a</th>
            <th width="12%">a</th>
            <th width="15%">a</th>
            <th width="15%">a</th>
            <th width="15%">a(ms)</th>
            <th width="10%">a</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="term in tableList">
            <td style=" color:red " v-show="term.status>1" v-text="($index)+1"></td>
            <td v-show="term.status<=1" v-text="($index)+1"></td>
            <td style=" color:red " v-show="term.status>1" v-text="term.ip"></td>
            <td v-show="term.status<=1" v-text="term.ip"></td>
            <td style=" color:red " v-show="term.status>1" v-text="term.name"></td>
            <td v-show="term.status<=1" v-text="term.name"></td>
            <td style=" color:red " v-show="term.status>1" v-text="term.port"></td>
            <td v-show="term.status<=1" v-text="term.port"></td>
            <td style=" color:red " v-show="term.status>1" v-text="term.send"></td>
            <td v-show="term.status<=1" v-text="term.send"></td>
            <td style=" color:red " v-show="term.status>1" v-text="term.receive"></td>
            <td v-show="term.status<=1" v-text="term.receive"></td>
            <td style=" color:red " v-show="term.status>1" v-text="term.avg_delay"></td>
            <td v-show="term.status<=1" v-text="term.avg_delay"></td>
            <td style=" color:red " v-show="term.status>1" v-text="term.connections"></td>            
            <td v-show="term.status<=1" v-text="term.connections"></td>            
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="8">
              <div class="pull-left">
                <button class="btn btn-default" @click="refresh">刷新</button></div>
              <div class="pull-right">
                <boot-page v-ref:page="" :async="false" :data="lists" :lens="lenArr" :page-len="pageLen" :param="param"></boot-page>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-12">
      <a v-link="{ path: '/history' }">返回</a></div>
    </div><br/>
    <br/>
    <br/>
    <br/>
</div>
</template>
<script>    
import bootPage from '../../components/BootPage.vue';

module.exports = {
  data: function() {
    return {
      msg1:'',
      avg_delay: '',
      receive: '',
      black: '',
      count: '',

      count: '',
      ip_max_send_rate: '',
      ip_max_send: '',
      send:'', 
      date: '',
      account: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      // 表格
      lenArr: [15, 40, 100],
      // 每页显示长度设置
      pageLen: 5,
      // 可显示的分页数
      // url: '/bootpage/', // 请求路径
      param: {
        active: '',
        // 当前页码
        length: '' // 每页显示个数
      },
      // 传递参数
      lists: [{
        name: 1,
        rule: 'luozh1'
      }

      ],
      // 表格原始数据
      tableList: [],
      // 分页组件传回的分页后数据 
      barChartOption: {},
      lineChartOption:{}
    }

  },
  components: {

    bootPage: bootPage
  },
  beforeDestroy: function() {
    //销毁掉echart
    // this.myChart.dispose();
  },
  created: function() {

    //   图形相关    
    var vm = this;

    vm.barChartOption = {
      title: {
        text: '',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['数据库访问压力']
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {
            readOnly: false
          },
          magicType: {
            type: ['line', 'bar']
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} MB'
        }
      },
      series: [{
        name: '数据库访问压力',
        type: 'line',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        markPoint: {
          data: [{
            type: 'max',
            name: '最大值'
          },
          {
            type: 'min',
            name: '最小值'
          }]
        },
        markLine: {
          data: [{
            type: 'average',
            name: '平均值'
          }]
        }
      },

      ]

    };

      
vm.lineChartOption = {
  
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:[]
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
    ]
};     
   
      
  vm.initdata();
  },
  methods: {
    refresh() {
      this.$refs.page.refresh();
    },
      recompute (){
          
          var str="http://monitor:8099/api/event/regenerate/";
          var date = this.date.replace('/', '').replace('/', '');
          str=str+date;
          this.$http.get(str).then(function(response) {
     
          this.initdata();
    });
          
        
      },
    initdata(){
    var vm =this;
           //读取服务器
    this.lists.splice(0, 1);
    var str = 'http://monitor:8099/api/event/';
    var date = this.$route.params.date;
    str = str + date;

    console.log(str);
    this.$http.get(str).then(function(response) {
      var temp = this.lists;
      this.msg = response.data.info;
      //console.log(response.data.info);
      var json = response.data.info;
      var visit = json[0].visit;
      // console.log(json[0].avg_delay);      
      //console.log(eval(visit)[0].port);
      this.date = date;
      var subjson = eval(visit);
      for (var j = 0; j < subjson.length; j++) {
          var name='';
        if(subjson[j].name=='Default')            
          var name='';  
        else
           var name=subjson[j].name;    
        temp.push({
          ip: subjson[j].ip,
          port: subjson[j].port,
          send: (subjson[j].send/ 1024).toFixed(2),
          receive: (subjson[j].receive/ 1024).toFixed(2),
          avg_delay: (subjson[j].avg_delay / 1000).toFixed(2),
          connections: subjson[j].connections,
          status: subjson[j].status,
            name:name
        });

      }

      this.avg_delay = (json[0].avg_delay / 1000).toFixed(2);
      this.receive = (json[0].receive / 1024 / 1024).toFixed(2) ; 
      this.send = (json[0].send / 1024 / 1024).toFixed(2) ;
      this.black = json[0].black;
      this.count = json[0].count;

      
       this.ip_max_send_rate = json[0].ip_max_send_rate;
       this.ip_max_send = json[0].ip_max_send;
 
        
        
      this.refresh();

      for (var i = 0; i < 24; i++) {
        this.account[i] = 0;
      }

      for (var i = 0; i < 24; i++) {
        var visit1 = json[i + 1].visit;
        var subjson1 = eval(visit1);

        for (var j = 0; j < subjson1.length; j++) {
          this.account[i] = this.account[i] + subjson1[j].send + subjson1[j].receive;
        }

      }

      for (var i = 0; i < 24; i++) {
        this.account[i] = (this.account[i] / 1024 / 1024).toFixed(2);
      }

      vm.barChartOption.series[0]['data'] = [this.account[0], this.account[1], this.account[2], this.account[3], this.account[4], this.account[5], this.account[6], this.account[7], this.account[8], this.account[9], this.account[10], this.account[11], this.account[12], this.account[13], this.account[14], this.account[15], this.account[16], this.account[17], this.account[18], this.account[19], this.account[20], this.account[21], this.account[22], this.account[23]];

    });
      
       str='http://monitor:8099/api/eventByIp/';
   str += date; 
      this.$http.get(str).then(function(response) {
     
      var json = response.data.info;
    //  console.log(response.data.info);
    //  console.log(str);
    
      var myArray = new Array(json.length);  
      var content=[];
       
      for(var i=0;i<json.length;i++){
                   if(json[i].name=='Default')
               myArray[i]=json[i].ip;
          else
               myArray[i]=json[i].name;
       
           var num=json[i].hour_bytes;
          for(var j=0;j<24;j++){
              num[j]=(num[j] / 1024).toFixed(2);
          //    console.log("num[j]"+num[j]);
          }
        
          var arr={name: myArray[i],type:'line',stack: '总量',areaStyle: {normal: {}},data:num}
          content.push(arr);
      }
    
   
   var lineChartOption2 = {
  
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:[]
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00','24:00']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        
    ]
}; 
       lineChartOption2.legend.data=myArray;
       lineChartOption2.series=content;
      vm.lineChartOption=lineChartOption2;  
    });  
      }
  },
  events: {

    // 分页组件传回的表格数据
    'data' (data) {
      this.tableList = data;

    },
    // 刷新数据
    'refresh' () {
      this.refresh()
    }
  }

}
</script>

  <template> 
   <div class="ontime"> 
    <div class="row clearfix"> 
     <div class="col-md-12 column"> 
      <div class="page-header"> 
       <h1> <small><span style="color:#EEB422">a</span></small></h1> 
      </div> 
     </div> 
    </div>    
     <div class="row clearfix"> 
      <div class="col-md-12 column"> 
     
       <table class="table table-hover table-bordered"> 
        <thead> 
         <tr> 
          <th width="10%">编号</th> 
          <th width="20%">a</th> 
          <th width="16%">a</th> 
          <th width="14%">a</th>
          <th width="22%">a</th> 
          <th width="18%">a</th>          
          
         </tr> 
        </thead>                      
        <tbody> 
         <tr v-for="term in tableList"> 
          <td style=" color:red " v-show="term.status>1" v-text="($index)+1"></td> 
          <td v-show="term.status<=1" v-text="($index)+1"></td> 
          <td style=" color:red " v-show="term.status>1" v-text="term.ip"></td> 
          <td v-show="term.status<=1" v-text="term.ip"></td> 
             <td style=" color:red " v-show="term.status>1" v-text="term.alias"></td> 
          <td v-show="term.status<=1" v-text="term.alias"></td> 
          <td style=" color:red " v-show="term.status>1" v-text="term.port"></td> 
          <td v-show="term.status<=1" v-text="term.port"></td> 
          <td style=" color:red "  v-show="term.status>1" v-text="term.start"></td> 
          <td v-show="term.status<=1" v-text="term.start"></td> 
          <td style=" color:red "  v-show="term.status>1" v-text="term.send"></td>
          <td v-show="term.status<=1" v-text="term.send"></td>
         
         </tr> 
        </tbody> 
        <tfoot> 
         <tr> 
          <td colspan="6"> 
           <div class="pull-left"> 
            <button class="btn btn-default" @click="bigrefresh">刷新</button> 
           </div> 
           <div class="pull-right"> 
            <boot-page v-ref:page="" :async="false" :data="lists" :lens="lenArr" :page-len="pageLen" :param="param"></boot-page> 
           </div> </td> 
         </tr> 
        </tfoot> 
       </table> 
      </div> 
     </div>     
   
   </div> 
  </template> 
<script> 
import bootPage from '../../components/BootPage.vue';

var input = require('vue-strap').input;
module.exports = {
    data: function() {
        return {
            msg: '',
            warningmsg: '',
            ipnote: '',
            namenote: '',
            responsejson: '',
            item: '1',
            // 表格
            lenArr: [15, 40, 100],
            // 每页显示长度设置
            pageLen: 5,
            // 可显示的分页数
            // url: '/bootpage/', // 请求路径
            param: {
                active: '',
                // 当前页码
                length: 5 // 每页显示个数
            },
            // 传递参数
            lists: [{
                name: 1,
                rule: 'luozh1'
            }

            ],
            // 表格原始数据
            tableList: [] // 分页组件传回的分页后数据 
        }
    },
    components: {
        input: input,
        bootPage: bootPage
    },
    ready: function() {

        this.lists.splice(0, 1);
        this.$http.get('http://monitor:8099/api/current').then(function(response) {

            this.responsejson = response;
            this.msg = response.data.info;
            console.log(response.data.info);
            var temp = this.lists;
            var json = eval(this.msg);

            for (var j = 0; j < json.length; j++) {

                var d = new Date(json[j].start * 1000);
                var starttime = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + (d.getHours()) + ":" + (d.getMinutes()) + ":" + (d.getSeconds());
                
                var aliasstr = "";
                if(json[j].alias=="Default"){
                     aliasstr = '';
                   //  console.log('json[j].alias'+json[j].alias);
                }                   
                else{
                    aliasstr = json[j].alias
                  //  console.log('json[j].alias'+json[j].alias);
                }
                    
                
                temp.push({
                    ip: json[j].ip,
                    port: json[j].port,
                    start: starttime,
                    send: json[j].send,
                    status:json[j].status,
                    alias: aliasstr
                });

            }

            this.lists = temp;
            this.refresh();
        });

        var vm = this;
        setInterval(function() {
            vm.bigrefresh();
        },
        2000);

    },
    mask: function(value) {
        // change to lowercase, remove first non-letter and all other unsupported characters
        return value.toLowerCase().replace(/^[^a-z]+/, '').replace(/\W/g, '');
    },
    methods: {
        refresh() {

            this.$refs.page.refresh();
        },
        bigrefresh() {
            this.$http.get('http://monitor:8099/api/current').then(function(response) {

                this.lists.splice(0, this.lists.length);
                this.responsejson = response;
                this.msg = response.data.info;
                console.log(response.data.info);
                var temp = this.lists;
                var json = eval(this.msg);

                for (var j = 0; j < json.length; j++) {

                    var d = new Date(json[j].start * 1000);
                    var starttime = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + (d.getHours()) + ":" + (d.getMinutes()) + ":" + (d.getSeconds());
                    
                    var aliasstr = "";
                if(json[j].alias=="Default"){
                     aliasstr = '';
                  //   console.log('json[j].alias'+json[j].alias);
                }                   
                else{
                    aliasstr = json[j].alias
                  //  console.log('json[j].alias'+json[j].alias);
                }
                    
                    
                    temp.push({
                        ip: json[j].ip,
                        port: json[j].port,
                        start: starttime,
                        send: json[j].send,
                        status: json[j].status,
                        alias: aliasstr
                    });

                }

                this.lists = temp;
                this.refresh();
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

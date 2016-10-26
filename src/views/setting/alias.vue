<template> 
<div class="alias">
  <div class="row clearfix">
    <div class="col-md-12 column">
      <div class="page-header">
        <h1>
          <small>
            <span style="color:#43A102">a</span></small>
        </h1>
      </div>
    </div>
  </div>
  <div class="row clearfix">
    <div class="col-md-12 column">
      <div class="form-group">
        <table class="table table-hover table-bordered">
          <tbody>
            <tr>
              <th width="12%">a</th>
              <td width="25%">
                <input class="form-control" id="inputEmail3" type="text" v-model="ipnote" /></td>
              <th width="12%">a</th>
              <td width="25%">
                <input class="form-control" id="inputEmail3" type="text" v-model="namenote" /></td>
              <th width="26%">
                <button v-on:click="addnote" class="btn btn-default">a</button>
                <span style="color:red">{{warningmsg}}</span><span style="color:#43CD80">{{msg1}}</span></th>              
            </tr>
          </tbody>
        </table>
      </div>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th width="12%">a</th>
            <th width="37%">a</th>
            <th width="25%">a</th>
            <th width="26%">a</th></tr>
        </thead>
        <tbody>
          <tr v-for="term in tableList">
            <td v-text="($index)+1"></td>
            <td v-text="term.rule"></td>
            <td v-text="term.name"></td>
            <td>
              <a @click="removenote($index)">移除</a></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">
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
</div>
</template> 
<script> 
import bootPage from '../../components/BootPage.vue';

var input = require('vue-strap').input;
module.exports = {
  data: function() {
    return {
      msg: '',
      msg1: '',  
      warningmsg: '',
      ipnote: '',
      namenote: '',
      responsejson: '',
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
      tableList: [] // 分页组件传回的分页后数据 
    }
  },
  components: {
    input: input,
    bootPage: bootPage
  },
  ready: function() {

    this.lists.splice(0, 1);
    this.$http.get('http://monitor:8099/api/configs/alias').then(function(response) {
      this.responsejson = response;
      this.msg = response.data.info;
      console.log(response.data.info);
      var temp = this.lists;

      var json = eval(this.msg);

      for (var j = 0; j < json.length; j++) {
        temp.push({
          name: json[j].name,
          rule: json[j].rule,

        });

      }

      this.lists = temp;
      this.refresh();
    });
  },
  mask: function(value) {
    // change to lowercase, remove first non-letter and all other unsupported characters
    return value.toLowerCase().replace(/^[^a-z]+/, '').replace(/\W/g, '');
  },
  methods: {
    refresh() {
      this.$refs.page.refresh();
    },
    removenote(index) {
        
      this.$refs.page.refresh();

      var temp = this.tableList[index];
      var indextmp
      for (var i = 0; i < this.lists.length; i++) {

        if (this.lists[i].rule == temp.rule) {
          indextmp = i;
          break;
        }
      }

      this.ipnote = '';
      this.namenote = '';
      this.lists.splice(indextmp, 1);
      this.warningmsg = '';
     
     
      var msg1=' 已移除';
       this.refresh();

      var jsonstr = JSON.stringify(this.lists);     
      $.post("http://monitor:8099/api/configs/alias", {
        content: jsonstr
      },
      function(response) {             
        console.log(response);
      });  
      
    },
    addnote() {
      var a = this.ipnote;
      var b = this.namenote;
      var temp = this.lists;
      var flag = false;
      this.msg1='';
      this.ipnote = '';
      this.namenote = '';  
        
      if (b.length <= 0 | a.length <= 0) {
        this.warningmsg = '请填写完整';              
        return false;
      }
        
      for (var i = 0; i < this.lists.length; i++) {
        if (this.lists[i].rule == a) {
          flag = true;
          break;
        }
      }

      if (flag == true) {
        this.warningmsg = 'ip已存在';      
        return false;
      }

      temp.push({
        name: b,
        rule: a
      });
        
        
      this.lists = temp;
      this.warningmsg = '';
      this.refresh();
        
      var jsonstr = JSON.stringify(this.lists);
      this.msg1=' 完成';
      $.post("http://monitor:8099/api/configs/alias", {        
        content: jsonstr
      },
      function(response) {       
        
        console.log(response);
      });   
        
    },
    subaddnote() {
      this.warningmsg = '';
      var jsonstr = JSON.stringify(this.lists);
      this.msg1=' 完成';
      $.post("http://monitor:8099/api/configs/alias", {
        content: jsonstr       
      },
      function(response) {        
        console.log(response);
        
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
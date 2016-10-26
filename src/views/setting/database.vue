<template>
<div class="database">
  <div class="row clearfix">
    <div class="col-md-12 column">
      <div class="page-header">
        <h1>
          <small><span style="color:#43A102">a</span></small></h1>
          <alert :show="alertshow" show.sync="showRight" placement="top-right" duration="2000" type="success" width="400px" dismissable>
  <span class="icon-ok-circled alert-icon-float-left"></span>
  <strong>Well Done!</strong>
  <p>You successfully modified the information.</p>
</alert>
      </div>
    </div>
  </div>
  <div class="row clearfix">
    <div class="col-md-12 column">
      <h5><span style="color:#4682B4">a</span></h5>
      <div class="form-group">
        <table class="table table-hover table-bordered">
          <tbody>
            <tr>
              <th width="25%">a</th>
              <th width="25%">
                <input v-on:blur="firstsubmit" class="form-control" id="inputEmail3" type="text" v-model="address" /></th>
              <th width="25%">a</th>
              <th width="25%">
                <input v-on:blur="firstsubmit" class="form-control" id="inputPassword3" type="text" v-model="port" /></th>
            </tr>
            <tr>
              <th width="25%">a</th>
              <th width="25%">
                <input v-on:blur="firstsubmit" class="form-control" id="inputEmail3" type="text" v-model="hbasetablename" /></th>
              <th width="25%">a</th>
              <th width="25%">
                <input v-on:blur="firstsubmit" class="form-control" id="inputEmail3" type="text" v-model="hbaseaddress" /></th>
            </tr>
            <tr>
              <th width="25%">a</th>
              <th width="25%">
                <input v-on:blur="firstsubmit" class="form-control" id="inputEmail3" type="text" v-model="reporttablename" /></th>
              <th width="25%">a</th>
              <th width="25%">
                <input v-on:blur="firstsubmit" class="form-control" id="inputPassword3" type="text" v-model="updatetime" /></th>
            </tr>
               <tr>
              <th width="25%"></th>
              <th width="25%">
                </th><th width="25%">
                </th><th width="25%">
                </th>
              </tr>  
            <tr>
              <th width="25%">a</th>
              <th width="25%">
                <button v-on:click="thirdsubmit" v-show="this.warning==true" class="btn btn-default">关闭</button>
                <button v-on:click="thirdsubmit" v-show="this.warning==false" class="btn btn-default">开启</button>
                <span style="color:#43CD80">{{msg2}}</span></th>
              <th width="25%">a</th>
              <th width="25%">
                <button v-on:click="secondsubmit" v-show="this.alert==true" class="btn btn-default">关闭</button>
                <button v-on:click="secondsubmit" v-show="this.alert==false" class="btn btn-default">开启</button>
                <span style="color:#43CD80">{{msg}}</span></th></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>
<script>       
var input = require('vue-strap').input;
var alert = require('vue-strap').alert;
module.exports = {
  data: function() {
    return {
      msg: '',     
      msg2: '',
      address: '',
      port: '',
      networkinterface: '',
      alert: '',
      hbaseaddress: '',
      hbasetablename: '',
      reporttablename: '',
      updatetime: '',
      filterrule: '',
      warning:'false',
        alertshow:false
    }
  },
  components: {
    input: input,
      alert:alert
  },
  ready: function() {
    this.$http.get('http://monitor:8099/api/configs/basic').then(function(response) {

      console.log(response.data.info);

      var json = eval("[" + response.data.info + "]");

      this.address = json[0].address;
      this.port = json[0].port;
      this.networkinterface = json[0].network_interface;
      this.alert = json[0].alert;
      if(this.alert==true)
          this.msg = ' 已开启';
      else
          this.msg = ' 已关闭';
      this.hbaseaddress = json[0].hbase_address;
      this.hbasetablename = json[0].hbase_table_name;
      this.reporttablename = json[0].report_table_name;
      this.updatetime = json[0].update_time;
      this.filterrule = json[0].filter_rule;
     
    });
      this.$http.get('http://monitor:8099/api/pcap/status').then(function(response) {
     
      console.log("status:"+response.data.info);
      this.warning = response.data.info;
      if(this.warning==true)
          this.msg2 = ' 已开启';
      else
          this.msg2 = ' 已关闭';
      
    });
  },
  mask: function(value) {
    // change to lowercase, remove first non-letter and all other unsupported characters
    return value.toLowerCase().replace(/^[^a-z]+/, '').replace(/\W/g, '');
  },
  methods: {

    firstsubmit: function() {
        this.alertshow=false;
        
              
        var vm=this;
      
        var tmp = {
        address: this.address,
        port: this.port,
        network_interface: this.networkinterface,
        alert: this.alert,
        hbase_address: this.hbaseaddress,
        hbase_table_name: this.hbasetablename,
        report_table_name: this.reporttablename,
        update_time: this.updatetime,
        filter_rule: this.filterrule
       
      };
      var jsonstr = JSON.stringify(tmp);
      // console.log(jsonstr);
      $.post("http://monitor:8099/api/configs/basic", {
        content: jsonstr
      },
      function(response) {
        console.log(response);
       
      });
        
       this.$http.get('http://monitor:8099/api/configs/basic').then(function(response) {
    
        this.alertshow=true;
    });  
        
        
    },
    secondsubmit: function() {
        var vm=this;
   
      this.msg1 = '';
      var tmp = {
        address: this.address,
        port: this.port,
        network_interface: this.networkinterface,
        alert: this.alert,
        hbase_address: this.hbaseaddress,
        hbase_table_name: this.hbasetablename,
        report_table_name: this.reporttablename,
        update_time: this.updatetime,
        filter_rule: this.filterrule
      };
      var jsonstr = JSON.stringify(tmp);
      console.log(jsonstr);
      $.post("http://monitor:8099/api/configs/basic", {
        content: jsonstr
      },
      function(response) {
      if (vm.alert == true) {
        vm.msg = ' 已关闭';

        vm.alert = false;
      } else {
        vm.msg = ' 已开启';

        vm.alert = true;
      }
        console.log(response);
      });
    },
    thirdsubmit: function() {
      if (this.warning == true) {
        this.msg2 = ' 已关闭';

        this.warning = false;
      } else {
        this.msg2 = ' 已开启';

        this.warning = true;
      }
        
      if(this.warning == false){
       
        this.$http.get('http://monitor:8099/api/pcap/stop').then(function(response) {
        });
      }else{
        this.$http.get('http://monitor:8099/api/pcap/start').then(function(response) {
        });  
      }
      
    }
  }

}
</script>

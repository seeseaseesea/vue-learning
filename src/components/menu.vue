<template>
<div class="menu">
  <navbar placement="top" type="default">
    <!-- Brand as slot -->
    <a slot="brand" v-link="{ path: '/home' }" title="Home" class="navbar-brand">主页</a>

<alert :show="msg" show.sync="showTop" placement="top" duration="0" type="danger" width="400px" dismissable>
  <span class="icon-info-circled alert-icon-float-left"></span>
  <strong>Heads up!</strong>
  <p>This alert needs your attention.</p>
</alert>
    <!-- For right positioning use slot -->
    <li slot="right">
   </li>
      
  </navbar>
</div>
</template>
<script>
var navbar = require('vue-strap').navbar;
var dropdown = require('vue-strap').dropdown;
var alert = require('vue-strap').alert;

module.exports = {
  data: function() {
    return {
      msg: false
    }
  },
  components: {
    navbar: navbar,
    dropdown: dropdown,
      alert:alert
  }, 
  methods: {
    myfunction() {
       var vm = this;
       this.$http.get('http://monitor:8099/api/configs/basic').then(function(response) {
     
            var json1 = eval("[" + response.data.info + "]");            
            var msgstr1 = json1[0].alert;
          //  console.log("msgstr1:" + msgstr1);
            if(msgstr1==true){
                  vm.mycheck();                
            }
              
            else 
               this.msg=false;
        });
        
    },
    mycheck(){          
       this.msg=false;  
      this.$http.get('http://monitor:8099/api/current').then(function(response) {
    
      this.responsejson = response;
      this.msg = response.data.info;
   //   console.log(response.data.info);
      var temp = this.lists;     
      var json = eval(this.msg);
      var flag = false;
      for (var j = 0; j < json.length; j++) {
          
            
          if(json[j].status>1)            
             flag=true;

      }
      if(flag==true){
        
          this.msg=true;
         // console.log("黑名单");
      }
        
    });
                
    }
  },
  created: function() {    
      var vm = this;
       
       setInterval(function () {
            vm.myfunction();
        }, 1000);         

   }
}
</script>
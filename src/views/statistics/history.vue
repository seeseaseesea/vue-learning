<template> 
<div class="history">
  <div class="row clearfix">
    <div class="col-md-12 column">
      <div class="page-header">
        <h1>
          <small>
            <span style="color:#1bb2d8">a</span></small>
        </h1>
      </div>
    </div>
  </div>
  <div class="row clearfix">
    <div class="col-md-12 column">
         <h4>
        <small>日期(时间格式:yyyy/mm/dd)</small></h4>
      <table class="table table-hover table-bordered">
        <tbody>
          <tr>
           
            <td width="20%">
  <datepicker :value.sync="value" :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder">
</datepicker>
             </td>             
            <th style=" vertical-align: middle;"  width="80%">
              <a v-link="{ name: 'detailhistory' ,params:{ date:this.value.replace('/', '').replace('/', '')}}">查看</a>
             <span style="color:red">{{judge}}</span></th>          
          </tr>
          <tr v-for="term in itemList">
            <td width="20%">
                 &nbsp;&nbsp;<a v-link="{ name: 'detailhistory' ,params:{ date:term.name}}" v-text="term.value"></a>
             </td>
            <td></td>
                  
          </tr>  
        </tbody>
      </table>
    </div>
  </div>
  <br/>
</template> 
<script>       
var input = require('vue-strap').input;
var datepicker = require('vue-strap').datepicker;
module.exports = {
  data: function() {
    return {
      msg: '',
      msg1:'',
     
      warningmsg:'',
        placeholder:'',
        value:'',
        format:'yyyy/MM/dd',
        
        itemList:[]
       
    }
  },
  components: {
    input: input,
      datepicker:datepicker
  },
    created: function(){
         var today = new Date();         
 
         var dayminit1 = today.getTime() + 1000 * 60 * 60 * 24 * ( - 1);        
        
         var day1 = new Date(dayminit1); 
        this.placeholder=day1.getFullYear()+"/"+(day1.getMonth()+1)+"/"+day1.getDate();
//        this.placeholder=(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear();
        
        this.value=day1.getFullYear()+"/"+(day1.getMonth()+1)+"/"+day1.getDate();
 //       this.value=(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear();
    
        
        
        for(var i=0;i<10;i++){
           
            var dayminit2 = today.getTime() + 1000 * 60 * 60 * 24 * ( - i-2);
             var day2 = new Date(dayminit2); 
             var month =day2.getMonth()+1;
            if(month<10)
                month="0"+month;
            var day = day2.getDate();
            if(day<10)
                day="0"+day;
         var datestr=day2.getFullYear()+""+month+""+day;
         var datestr2=day2.getFullYear()+"/"+month+"/"+day;
       
            this.itemList.push({name:datestr,value:datestr2});
        }
    },
  computed: {
     judge: function () {
        
         var today = new Date();         
 
         var dayminit1 = today.getTime() + 1000 * 60 * 60 * 24 * ( - 1);        
        
         var day1 = new Date(dayminit1);
        if(this.value.length>0){
            var date2 = this.value.split("/");
         var datestr2 = this.value.replace('/', '').replace('/', '');
         
         if (date2.length < 3 | date2.length > 3) {
             return '日期格式错误,请重新填写';       
         }
         var day2 = new Date(date2[0],date2[1]-1,date2[2]);
         dayminit1 = dayminit1/1000;
         var dayminit2 = day2.getTime()/1000;
       
         if (dayminit2 < 0) {
            return '不正确日期,请重新填写';
         }
               
//         console.log("dayminit1:"+day1.getFullYear()+" "+(day1.getMonth()+1)+" "+day1.getDate()); 
//         
//         console.log("date2:"+date2[0]+" "+date2[1]+" "+date2[2]); 
//         
//         console.log("dayminit2:"+day2.getFullYear()+" "+(day2.getMonth()+1)+" "+day2.getDate());
          
         var day11= new Date(day1.getFullYear(),day1.getMonth(),day1.getDate());
         var day22= new Date(dayminit2*1000);
         var dayminit11 = day11.getTime();
         var dayminit22 = day22.getTime();
         
//         console.log("dayminit11:"+dayminit11);
//         console.log("dayminit22:"+dayminit22);
         if(dayminit2>dayminit1)         
             return " 日期范围不正确,请填写今天之前的日期";
         else 
             return
        }
         else
             return
    }
  },
  mask: function(value) {
    // change to lowercase, remove first non-letter and all other unsupported characters
    return value.toLowerCase().replace(/^[^a-z]+/, '').replace(/\W/g, '');
  }
}
</script> 

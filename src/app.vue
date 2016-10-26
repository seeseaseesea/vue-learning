<template>
<menu></menu>

  <div class="col-md-3 column">
    <div class="row clearfix">
    <div class="col-md-2 column"></div>
      <div class="col-md-10 column">
        <Sidebar></Sidebar>
      </div>
    </div>
  </div>
  <div class="col-md-8 column">
    <router-view></router-view>
  </div>
  <div class="col-md-1 column"></div>

</template>
<script>
import Menu from './components/menu.vue'
import Sidebar from './components/msidebar.vue'
module.exports={
  components:{Menu,Sidebar}
}
</script>
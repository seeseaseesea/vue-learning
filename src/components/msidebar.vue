<template>
<div class="msidebar">
  <br/><br/>
  <accordion :one-at-atime="checked" type="info">
    <panel is-open type="primary">
      <strong slot="header">
        <u>a</u>
      </strong>
      <a v-link="{ path: '/ontime' }">a</a></panel>
    <panel header="a">
      <a v-link="{ path: '/pressure' }">a</a>
      <br/>
      <br/>
     
      <a v-link="{ path: '/history' }">a</a></panel>
   
    <panel header="a">
      <a v-link="{ path: '/database' }">a</a>
      <br/>
      <br/>
      <a v-link="{ path: '/alias' }">a</a>
      </panel>
  </accordion>
</div>
</template>
<script>
var accordion = require('vue-strap').accordion;
var panel = require('vue-strap').panel;

module.exports = {
  components: {
    accordion: accordion,
    panel: panel
  }
}
</script>
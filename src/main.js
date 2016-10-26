var Vue = require('vue');
var VueRouter = require('vue-router');
var App = require('./app.vue');
Vue.use(VueRouter);
var router = new VueRouter();
var VueStrap = require('vue-strap');

Vue.directive('echarts', require('./directives/echarts'));
var vueResource = require('vue-resource');
Vue.use(vueResource);

require('./router')(router);
router.start(App, '#app');
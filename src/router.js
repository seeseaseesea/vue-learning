module.exports = function (router) {
    router.map({
        '/': {
            name: 'home',
            component: require('./views/ontime/ontime.vue')
        },
        '/home': {
            name: 'home',
            component: require('./views/ontime/ontime.vue')
        },
        '/ontime': {
            name: 'ontime',
            component: require('./views/ontime/ontime.vue')
        },
        '/detailhistory/:date/': {
            name: 'detailhistory',
            component: require('./views/statistics/detailhistory.vue')
        },
        '/history': {
            name: 'history',
            component: require('./views/statistics/history.vue')
        },
        '/pressure': {
            name: 'pressure',
            component: require('./views/statistics/pressure.vue')
        },
        '/database': {
            name: 'database',
            component: require('./views/setting/database.vue')
        },
        '/alias': {
            name: 'alias',
            component: require('./views/setting/alias.vue')
        }
    });
    router.beforeEach(function () {
        window.scrollTo(0, 0);
    });
}
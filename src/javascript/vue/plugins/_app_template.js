// Plugin: some_tamplate
const some_tamplate = {
    install(Vue, options) {
        Vue.mixin({
            data: function () {
                return {
                    "hello": "World"    
                }
            },
            methods: {
                doSomething: function () {}
            }
        });
    }
};
Vue.use(some_tamplate)
// Plugin: global_helpers
const global_helpers = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                getDateCH: function (date, full) {
                    var dateObj = new Date(date);
                    var o = {};
                    if (full === true) {
                        o = {
                            "weekday": "long",
                            "year": "numeric",
                            "month": "long",
                            "day": "numeric"
                        };
                    } else {
                        o = {
                            "year": "numeric",
                            "month": "numeric",
                            "day": "numeric"
                        };
                    };
                    return dateObj.toLocaleDateString('de-DE', o);
                }
            },
            computed: {
                missings() {
                    try {
                        if (this.$store.state.sr === null) {
                            return false;
                        } else {
                            var sr = this.$store.state.sr.data;
                            var data_errors = false;
                            sr.forEach(function (item) {
                                if (item.all_found === false) {
                                    data_errors = true;
                                };
                            }.bind(this));
                            return data_errors;
                        };
                    } catch (e) {
                        return false;
                    };
                }
            }
        });
    }
};
Vue.use(global_helpers)
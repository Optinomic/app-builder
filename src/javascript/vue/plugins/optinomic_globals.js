// Plugin: optinomic_globals
const optinomic_globals = {
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
                        var d = this.$store.state.data_apps.data_object[helpers.getAppID()];
                        if (d === null) {
                            return false;
                        } else {
                            var sr = d.data;
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
Vue.use(optinomic_globals)
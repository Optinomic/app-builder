// Plugin: plugin_tamplate
const plugin_tamplate = {
    install(Vue, options) {
        Vue.mixin({
            data: function () {
                return {
                    "name": "BDI-II",
                }
            },
            methods: {
                template_pdf_content: function (sr) {
                    var pdf = [];
                    try {
                        if (sr.data.length > 0) {

                            

                        } else {
                            pdf.push(this.pdf_no_data(this.name));
                        };

                    } catch (e) {
                        console.log('a_pdf_content', e)
                        pdf.push(this.pdf_error(this.name));
                    };

                    return pdf;
                }
            }
        });
    }
};
Vue.use(plugin_tamplate);
// Plugin: pdf_actinfo
const pdf_globals = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                pdf_app_title: function (title, subtitle, description) {
                    var titel = [];
                    titel.push(makepdf._horizontalLine(100, "#E0E0E0"));
                    titel.push(makepdf._heading(title, subtitle, 'h1'));
                    titel.push(makepdf._text(description));

                    return makepdf._keepTogether(titel, title + '_titel');
                }
            }
        });
    }
};
Vue.use(pdf_globals)
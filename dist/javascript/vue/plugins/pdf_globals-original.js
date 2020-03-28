// Plugin: pdf_globals
const pdf_globals = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                pdf_app_title: function (title, subtitle, description) {
                    var titel = [];
                    titel.push(makepdf._horizontalLine(100, "#E0E0E0"));
                    titel.push(makepdf._heading(title, subtitle, 'h1'));
                    if ((description !== null) && (description !== "")) {
                        titel.push(makepdf._text(description));
                    }
                    return makepdf._keepTogether(titel, title + '_titel');
                },
                pdf_no_data: function (title) {
                    // No Data
                    var pdf = [];
                    pdf.push(makepdf._noData(title + ': ', 'Keine Daten vorhanden.'));
                    return makepdf._keepTogether(pdf, title + '_no_data');
                },
                pdf_error: function (title) {
                    // No Data
                    var pdf = [];
                    pdf.push(makepdf._noData(title + ': ', 'Unerwarteter Fehler.'));
                    return makepdf._keepTogether(pdf, title + '_pdf_error');
                },
                pdf_app_info: function (m, big) {
                    // No Data
                    var pdf = [];
                    // pdf.push(makepdf._suedhang_logo_anschrift());

                    if (big === true) {
                        pdf.push(makepdf._title(m.name, m.short_description));
                        pdf.push(makepdf._text(m.description));
                        return makepdf._keepTogether(pdf, m.name + '_appinfo_big');
                    } else {
                        pdf.push(this.pdf_app_title(m.name, m.short_description, m.description));
                        return makepdf._keepTogether(pdf, m.name + '_appinfo');
                    };
                }
            }
        });
    }
};
Vue.use(pdf_globals)
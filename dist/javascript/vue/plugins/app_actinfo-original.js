// Plugin: plugin_actinfo
const plugin_actinfo = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                merge_data_ein_aus: function (_sr_actinfo_ein, _sr_actinfo_aus) {
                    var _sr_actinfo = [];
                    var show_audit = false;
                    var show_fagerstoem = false;

                    if (_sr_actinfo_ein.have_data === true) {
                        _sr_actinfo_ein.data.forEach(function (current) {
                            if (current.all_found === true) {
                                current.app_name = 'Eintritt';
                                current.actinfo_ein_data = true;
                                current.actinfo_aus_data = false;
                                current.FAGERSTROEM = current.calculation.actinfo_ein.FAGERSTROEM;
                                if ("smoker" in current.FAGERSTROEM) {
                                    if (current.FAGERSTROEM.smoker.smoker === true) {
                                        show_fagerstoem = true;
                                    };
                                };
                                if ((current.calculation.actinfo_ein.AUDIT.AUDIT_Score !== 0) && (current.calculation.actinfo_ein.AUDIT.AUDIT_Score !== null) && (current.calculation.actinfo_ein.AUDIT.AUDIT_Score !== undefined)) {
                                    show_audit = true;
                                };
                                current.info = current.app_name + ': ' + current.FAGERSTROEM.interpretation.result;
                                _sr_actinfo.push(current);
                            };
                        }.bind(this));
                    };

                    if (_sr_actinfo_aus.have_data === true) {
                        _sr_actinfo_aus.data.forEach(function (current) {
                            if (current.all_found === true) {
                                current.app_name = 'Austritt';
                                current.actinfo_ein_data = false;
                                current.actinfo_aus_data = true;
                                current.FAGERSTROEM = current.calculation.another_calculation.FAGERSTROEM;
                                if ("smoker" in current.FAGERSTROEM) {
                                    if (current.FAGERSTROEM.smoker.smoker === true) {
                                        show_fagerstoem = true;
                                    };
                                };
                                current.info = current.app_name + ': ' + current.FAGERSTROEM.interpretation.result;
                                _sr_actinfo.push(current);
                            };

                        }.bind(this));
                    };

                    // Build some Texts
                    var audit_text = "";
                    var fagerstroem_text = "";
                    var motivation_text = "";
                    _sr_actinfo.forEach(function (item, itemID) {
                        if (item.actinfo_ein_data) {

                            audit_text = "Bei Eintritt bestand «" + item.calculation.actinfo_ein.AUDIT.interpretation.result + "» (∑=" + item.calculation.actinfo_ein.AUDIT.AUDIT_Score + ")."


                            if ("smoker" in item.FAGERSTROEM) {
                                if ("summyary" in item.FAGERSTROEM.smoker) {
                                    if (fagerstroem_text !== "") {
                                        fagerstroem_text = fagerstroem_text + " "
                                    };
                                    fagerstroem_text = fagerstroem_text + item.FAGERSTROEM.smoker.summyary;
                                };
                            };
                        };
                        if (item.actinfo_aus_data) {
                            if ("smoker" in item.FAGERSTROEM) {
                                if ("summyary" in item.FAGERSTROEM.smoker) {
                                    if (fagerstroem_text !== "") {
                                        fagerstroem_text = fagerstroem_text + " "
                                    };
                                    fagerstroem_text = fagerstroem_text + item.FAGERSTROEM.smoker.summyary;
                                };
                                if (item.FAGERSTROEM.smoker.motivation_data) {
                                    if (fagerstroem_text !== "") {
                                        fagerstroem_text = fagerstroem_text + " "
                                    };
                                    fagerstroem_text = fagerstroem_text + item.FAGERSTROEM.smoker.motivation_full_text;
                                    motivation_text = motivation_text + item.FAGERSTROEM.smoker.motivation_full_text;
                                };
                            };
                        };
                    }.bind(this));

                    var actinfo_obj = {
                        "merged": true,
                        "actinfo_ein_data": _sr_actinfo_ein.have_data,
                        "actinfo_aus_data": _sr_actinfo_aus.have_data,
                        "actinfo_ein_aus_data": false,
                        "show_audit": show_audit,
                        "audit_text": audit_text,
                        "show_fagerstoem": show_fagerstoem,
                        "fagerstroem_text": fagerstroem_text,
                        "motivation_text": motivation_text,
                        "data": _sr_actinfo,
                        "app_id": "actinfo - Ein & Austritt"
                    };

                    if ((_sr_actinfo_ein.have_data === true) && (_sr_actinfo_aus.have_data === true)) {
                        actinfo_obj.actinfo_ein_aus_data = true;
                    };

                    return actinfo_obj;

                },
                pdf_build_actinfo: function (_sr_actinfo_ein, _sr_actinfo_aus) {
                    var _sr_actinfo_merged = this.merge_data_ein_aus(_sr_actinfo_ein, _sr_actinfo_aus);
                    console.error('pdf_build_actinfo :: ', _sr_actinfo_merged);

                    var _pdf_content = [];
                    _pdf_content.push(this.pdf_app_title(_sr_actinfo_ein.title, _sr_actinfo_ein.subtitle, _sr_actinfo_ein.module.short_description));


                    var problemsubstanzen = "";
                    var zusatzangaben = "";
                    _sr_actinfo_ein.data.forEach(function (current, ID) {
                        problemsubstanzen = current.calculation.actinfo_ein.pdfmake.problemsubstanzen_ol;
                        zusatzangaben = current.calculation.actinfo_ein.pdfmake.zusatzangaben_text;
                    });

                    var ps = [];
                    ps.push(problemsubstanzen);
                    ps.push(makepdf._spacer(6));
                    zusatzangaben.stack["0"].text = "Zusatzinformationen: " + zusatzangaben.stack["0"].text
                    ps.push(zusatzangaben);
                    _pdf_content.push(makepdf._keepTogether(ps, "problemsubstanzen"));


                    var audit = [];
                    audit.push(makepdf._heading("AUDIT (Alcohol Use Disorders Identification)", null, 'h3'));
                    audit.push(makepdf._text(_sr_actinfo_merged.audit_text));

                    _pdf_content.push(makepdf._keepTogether(audit, "audit"));


                    var fagerstroem = [];
                    fagerstroem.push(makepdf._heading("Nikotinabhängigkeit (Fagerström)", null, 'h3'));
                    fagerstroem.push(makepdf._text(_sr_actinfo_merged.fagerstroem_text));
                    _pdf_content.push(makepdf._keepTogether(fagerstroem, "fagerstroem"));

                    return _pdf_content;
                }
            }
        });
    }
};
Vue.use(plugin_actinfo)
// Plugin: plugin_actinfo
const plugin_actinfo = {
    install(Vue, options) {
        Vue.mixin({
            data: function () {
                return {
                    "actinfo_audit_chart": {
                        "options": {
                            "min": -1,
                            "max": 41,
                            "item_height": 50,
                            "item_text_left": 130,
                            "item_text_right": 130,
                            "color_grid": "#9E9E9E",
                            "color_clinic_sample": "#888888",
                            "color_skin": "grey_dark_to_light",
                            "show_baseline": false,
                            "show_ranges_overview": false,
                            "show_scale_text": true,
                            "show_score_vertical_line": true,
                            "show_score_profile_line": false,
                            "show_score_circles": true,
                            "show_settings_block": false,
                            "allow_toggle_settings_block": false,
                            "topnumber_hide_first_last": true,
                            "range_alpha": 0.09,
                            "vertical_grid_every_x": 5,
                            "response_title_path": "calculation.actinfo_ein.messzeitpunkt.mz_text",
                            "response_date_path": "date"
                        },
                        "scales": [{
                            "left_title": "",
                            "left_text": "Risikoarmer Alkoholkonsum",
                            "right_title": "",
                            "right_text": "Verdacht auf Alkoholabhängigkeit",
                            "score_path": "calculation.actinfo_ein.AUDIT.AUDIT_Score",
                            "clinic_sample_var": null
                        }],
                        "ranges": [{
                            "range_start": 0,
                            "range_stop": 7.5,
                            "text": "Risikoarmer Alkoholkonsum",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 7.5,
                            "range_stop": 15.5,
                            "text": "Verdacht auf eine alkoholbezogene Störung",
                            "color": "#FBB100"
                        }, {
                            "range_start": 15.5,
                            "range_stop": 40,
                            "text": "Hohe Wahrscheinlichkeit einer Alkoholabhängigkeit",
                            "color": "#C62828"
                        }]
                    },
                    "actinfo_fagerstroem_chart": {
                        "options": {
                            "min": -1,
                            "max": 11,
                            "item_height": 50,
                            "item_text_left": 130,
                            "item_text_right": 130,
                            "color_grid": "#9E9E9E",
                            "color_clinic_sample": "#888888",
                            "color_skin": "grey_dark_to_light",
                            "show_baseline": false,
                            "show_ranges_overview": false,
                            "show_scale_text": true,
                            "show_score_vertical_line": true,
                            "show_score_profile_line": false,
                            "show_score_circles": true,
                            "show_settings_block": false,
                            "allow_toggle_settings_block": false,
                            "topnumber_hide_first_last": true,
                            "range_alpha": 0.09,
                            "vertical_grid_every_x": 1,
                            "response_title_path": "app_name",
                            "response_date_path": "date"
                        },
                        "scales": [{
                            "left_title": "",
                            "left_text": "Geringe Abhängigkeit",
                            "right_title": "",
                            "right_text": "Starke Abhängigkeit",
                            "score_path": "FAGERSTROEM.FAGERSTROEM_Score",
                            "clinic_sample_var": null
                        }],
                        "ranges": [{
                            "range_start": 0,
                            "range_stop": 2.5,
                            "text": "Gering",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 2.5,
                            "range_stop": 4.5,
                            "text": "Mittelstark",
                            "color": "#FFA000"
                        }, {
                            "range_start": 4.5,
                            "range_stop": 6.5,
                            "text": "Stark",
                            "color": "#FB7200"
                        }, {
                            "range_start": 6.5,
                            "range_stop": 10,
                            "text": "Sehr stark",
                            "color": "#C62828"
                        }]
                    }
                }
            },
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
                        "actinfo_ein_aus_data": _sr_actinfo_ein.have_data && _sr_actinfo_aus.have_data,
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
                actinfo_pdf_content: function (_sr_actinfo_ein, _sr_actinfo_aus) {
                    var _sr_actinfo_merged = this.merge_data_ein_aus(_sr_actinfo_ein, _sr_actinfo_aus);
                    // console.error('pdf_build_actinfo :: ', _sr_actinfo_merged);

                    var _pdf_content = [];

                    var problemsubstanzen = "";
                    var zusatzangaben = "";
                    _sr_actinfo_ein.data.forEach(function (current, ID) {
                        problemsubstanzen = current.calculation.actinfo_ein.pdfmake.problemsubstanzen_ol;
                        zusatzangaben = current.calculation.actinfo_ein.zusatzangaben.kunsumalter_text + ' ' + current.calculation.actinfo_ein.zusatzangaben.entzuege_text;
                    });

                    var ps = [];
                    ps.push(problemsubstanzen);
                    ps.push(makepdf._spacer(6));
                    ps.push(makepdf._text("Zusatzangaben: " + zusatzangaben));
                    _pdf_content.push(makepdf._keepTogether(ps, "problemsubstanzen"));

                    if (_sr_actinfo_merged.show_audit) {
                        var audit = [];
                        audit.push(makepdf._heading("AUDIT (Alcohol Use Disorders Identification)", null, 'h3'));
                        audit.push(makepdf._text(_sr_actinfo_merged.audit_text));
                        _pdf_content.push(makepdf._keepTogether(audit, "audit_text"));

                        var pdf_chart = [];
                        pdf_chart.push(makepdf._horizontalLine(100, "#F5F5F5"));
                        pdf_chart.push(makepdf._pdf_chart_profile("de", this.get_pdf_chart_options(this.actinfo_audit_chart.options), {}, {}, [], this.actinfo_audit_chart.scales, _sr_actinfo_ein, this.actinfo_audit_chart.ranges));
                        pdf_chart.push(makepdf._horizontalLine(100, "#F5F5F5"));
                        _pdf_content.push(makepdf._keepTogether(pdf_chart, "audit_chart"));
                    };

                    if (_sr_actinfo_merged.show_fagerstoem) {
                        var fagerstroem = [];
                        fagerstroem.push(makepdf._heading("Nikotinabhängigkeit (Fagerström)", null, 'h3'));
                        fagerstroem.push(makepdf._text(_sr_actinfo_merged.fagerstroem_text));
                        _pdf_content.push(makepdf._keepTogether(fagerstroem, "fagerstroem_text"));

                        var pdf_chart = [];
                        pdf_chart.push(makepdf._horizontalLine(100, "#F5F5F5"));
                        pdf_chart.push(makepdf._pdf_chart_profile("de", this.get_pdf_chart_options(this.actinfo_fagerstroem_chart.options), {}, {}, [], this.actinfo_fagerstroem_chart.scales, _sr_actinfo_merged, this.actinfo_fagerstroem_chart.ranges));
                        pdf_chart.push(makepdf._horizontalLine(100, "#F5F5F5"));
                        _pdf_content.push(makepdf._keepTogether(pdf_chart, "fagerstroem_chart"));
                    };

                    return _pdf_content;
                }
            }
        });
    }
};
Vue.use(plugin_actinfo);
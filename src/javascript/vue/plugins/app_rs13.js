// Plugin: plugin_rs13
const plugin_rs13 = {
    install(Vue, options) {
        Vue.mixin({
            data: function () {
                return {
                    "base_config": {
                        "app_name": "Resilienzfragebogen (RS-13)",
                        "app_short_description": "Psychische Widerstandskraft",
                    },
                    "rs13_chart": {
                        "options": {
                            "min": 0,
                            "max": 100,
                            "item_height": 50,
                            "item_text_left": 83,
                            "item_text_right": 60,
                            "color_skin": "indigo_grey_pink",
                            "color_grid": "#9E9E9E",
                            "color_clinic_sample": "#673AB7",
                            "show_baseline": true,
                            "show_scale_text": true,
                            "show_score_vertical_line": true,
                            "show_score_profile_line": false,
                            "show_score_circles": true,
                            "show_settings_block": false,
                            "show_ranges_overview": true,
                            "allow_toggle_settings_block": false,
                            "range_alpha": 0.08,
                            "vertical_grid_every_x": 10,
                            "response_title_path": "calculation.resilienz_score.range.interpretation_de",
                            "response_date_path": "date"
                        },
                        "scales": [{
                            "left_text": "Niedrige Resilienz",
                            "right_text": "Hohe Resilienz",
                            "score_path": "calculation.resilienz_score.rs13_score",
                            "clinic_sample_var": null
                        }],
                        "ranges": [{
                                "range_start": 13,
                                "range_stop": 66,
                                "interpretation_de": "niedrige Widerstandskraft (Resilienz)",
                                "text": "Niedrig",
                                "color": "#F44336"
                            },
                            {
                                "range_start": 67,
                                "range_stop": 72,
                                "interpretation_de": "moderate Widerstandskraft (Resilienz)",
                                "text": "Moderat",
                                "color": "#FF9800"
                            },
                            {
                                "range_start": 73,
                                "range_stop": 91,
                                "interpretation_de": "hohe Widerstandskraft (Resilienz)",
                                "text": "Hoch",
                                "color": "#4CAF50"
                            }
                        ]
                    },
                }
            },
            methods: {
                rs13_getTitle: function (r) {
                    try {
                        var ret_string = "Erfassung vom ";

                        if ("rs13_messzeitpunkt" in r.response) {
                            if (parseInt(r.response.rs13_messzeitpunkt) === 1) {
                                ret_string = "Erfassung «Eintritt» vom ";
                            };
                            if (parseInt(r.response.rs13_messzeitpunkt) === 2) {
                                ret_string = "Erfassung «Austritt» vom ";
                            };
                        } else {
                            ret_string = "Erfassung vom ";
                        };

                        if ("rs13_date" in r.response) {
                            ret_string = ret_string + this.getDateCH(r.response.rs13_date, false);
                        } else {
                            ret_string = ret_string + this.getDateCH(r.date, false);
                        };

                    } catch (e) {
                        console.error('getTitle', e);
                    }
                    return ret_string;
                },
                rs13_getSubtitle: function (r) {
                    var ret_string = "::";
                    try {
                        if (r.calculation_found) {
                            const name = r.calculation.resilienz_score.range.interpretation_de;
                            ret_string = name.charAt(0).toUpperCase() + name.slice(1);
                        } else {
                            ret_string = "Calculation wird berechnet...";
                        };
                        return ret_string;
                    } catch (e) {
                        console.error('getSubtitle', e);
                    }
                    return ret_string;
                },
                rs13_pdf_content: function (sr) {
                    var pdf = [];
                    try {

                        if (sr.data.length > 0) {

                            // Chart | Grafik
                            var subtitle = [];
                            subtitle.push(makepdf._horizontalLine(100, "#F5F5F5"));
                            subtitle.push(makepdf._heading(this.base_config.app_short_description, null, 'h3'));
                            pdf.push(makepdf._keepTogether(subtitle, "rs13_chart_title"));

                            var pdf_chart = [];
                            pdf_chart.push(makepdf._pdf_chart_profile("de", this.rs13_chart.options, {}, {}, [], this.rs13_chart.scales, sr, this.rs13_chart.ranges));
                            pdf_chart.push(makepdf._spacer(10));
                            pdf.push(makepdf._keepTogether(pdf_chart, "rs13_chart"));

                            // Messungen
                            sr.data.forEach(function (sr) {
                                if (sr.calculation_found) {
                                    // Messung Titel
                                    var subtitle = [];
                                    subtitle.push(makepdf._horizontalLine(100, "#F5F5F5"));
                                    subtitle.push(makepdf._heading(this.rs13_getTitle(sr), '', 'h3'));
                                    pdf.push(makepdf._keepTogether(subtitle, "rs13_messung_title"));

                                    // Interpretation
                                    var interpretation = [];
                                    interpretation.push(makepdf._text(this.rs13_getSubtitle(sr) + ": " + sr.calculation.resilienz_score.interpretation));
                                    pdf.push(makepdf._keepTogether(interpretation, "rs13_messung_interpretation"));

                                } else {
                                    pdf.push(makepdf._noData("Resilienz: ", "Calculation noch nicht berechnet.", 6));
                                };
                            }.bind(this));

                        } else {
                            pdf.push(this.pdf_no_data(this.base_config.app_name));
                        };

                    } catch (e) {
                        console.log('rs13_pdf_content', e)
                        pdf.push(this.pdf_error(this.base_config.app_name));
                    };

                    return pdf;
                }
            }
        });
    }
};
Vue.use(plugin_rs13)
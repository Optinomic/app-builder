// Plugin: plugin_sci
const plugin_sci = {
    install(Vue, options) {
        Vue.mixin({
            data: function () {
                return {
                    "name": "SCI",
                    "sci_chart_stress": {
                        "options": {
                            "min": 0,
                            "max": 10,
                            "item_height": 58,
                            "item_text_left": 200,
                            "item_text_right": 200,
                            "color_grid": "#9E9E9E",
                            "color_clinic_sample": "#888888",
                            "color_skin": "grey_dark_to_light",
                            "show_baseline": false,
                            "show_ranges_overview": false,
                            "show_scale_text": true,
                            "show_score_vertical_line": false,
                            "show_score_profile_line": true,
                            "show_score_circles": true,
                            "show_settings_block": false,
                            "allow_toggle_settings_block": false,
                            "topnumber_hide_first_last": true,
                            "range_alpha": 0.09,
                            "vertical_grid_every_x": 1,
                            "response_title_path": "info.app_zeitpunkt",
                            "response_date_path": "date"
                        },
                        "scales": [{
                            "left_title": "Negative Ereignisse",
                            "left_text": "Keine oder wenig Belastung durch negative Ereignisse",
                            "right_title": "Negative Ereignisse",
                            "right_text": "Viele Stressoren durch negative Ereignisse",
                            "score_path": "calculation.scores.scores.0.stanine",
                            "clinic_sample_var": null
                        }, {
                            "left_title": "Stresssymptome",
                            "left_text": "Wenig körperliche und psychische Stressreaktionen",
                            "right_title": "Stresssymptome",
                            "right_text": "Viele körperliche und psychische Stressreaktionen",
                            "score_path": "calculation.scores.scores.1.stanine",
                            "clinic_sample_var": null
                        }],
                        "ranges": [{
                            "range_start": 0.5,
                            "range_stop": 1.5,
                            "text": "Stanine: 1 | 4%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 1.5,
                            "range_stop": 2.5,
                            "text": "Stanine: 2 | 7%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 2.5,
                            "range_stop": 3.5,
                            "text": "Stanine: 3 | 12%",
                            "color": "#FFA000"
                        }, {
                            "range_start": 3.5,
                            "range_stop": 4.5,
                            "text": "Stanine: 4 | 17%",
                            "color": "#FFA000"
                        }, {
                            "range_start": 4.5,
                            "range_stop": 5.5,
                            "text": "Stanine: 5 | 20%",
                            "color": "#FBB100"
                        }, {
                            "range_start": 5.5,
                            "range_stop": 6.5,
                            "text": "Stanine: 6 | 17%",
                            "color": "#FBB100"
                        }, {
                            "range_start": 6.5,
                            "range_stop": 7.5,
                            "text": "Stanine: 7 | 12%",
                            "color": "#FB7200"
                        }, {
                            "range_start": 7.5,
                            "range_stop": 8.5,
                            "text": "Stanine: 8 | 7%",
                            "color": "#FB7200"
                        }, {
                            "range_start": 8.5,
                            "range_stop": 9.5,
                            "text": "Stanine: 9 | 4%",
                            "color": "#C62828"
                        }]
                    },
                    "sci_chart_hilfreich": {
                        "options": {
                            "min": 0,
                            "max": 10,
                            "item_height": 58,
                            "item_text_left": 200,
                            "item_text_right": 200,
                            "color_grid": "#9E9E9E",
                            "color_clinic_sample": "#888888",
                            "color_skin": "grey_dark_to_light",
                            "show_baseline": false,
                            "show_scale_text": true,
                            "show_score_vertical_line": false,
                            "show_score_profile_line": true,
                            "show_score_circles": true,
                            "show_settings_block": false,
                            "show_ranges_overview": false,
                            "allow_toggle_settings_block": false,
                            "topnumber_hide_first_last": true,
                            "range_alpha": 0.09,
                            "vertical_grid_every_x": 1,
                            "response_title_path": "info.app_zeitpunkt",
                            "response_date_path": "date"
                        },
                        "scales": [{
                            "left_title": "Positives Denken",
                            "left_text": "Stressbewältigung durch positives Denken",
                            "right_title": "Positives Denken",
                            "right_text": "Selbstzweifel und Fokus auf Negatives",
                            "score_path": "calculation.scores.scores.2.stanine",
                            "clinic_sample_var": null
                        }, {
                            "left_title": "Aktive Stressbewältigung",
                            "left_text": "Aktive und vorbeugende Stressbewältigung",
                            "right_title": "Aktive Stressbewältigung",
                            "right_text": "Stressoren werden nicht beseitigt",
                            "score_path": "calculation.scores.scores.3.stanine",
                            "clinic_sample_var": null
                        }, {
                            "left_title": "Soziale Unterstützung",
                            "left_text": "Viel Unterstützung durch Freunde und Bekannte",
                            "right_title": "Soziale Unterstützung",
                            "right_text": "Kaum Unterstützung durch andere",
                            "score_path": "calculation.scores.scores.4.stanine",
                            "clinic_sample_var": null
                        }, {
                            "left_title": "Halt im Glauben",
                            "left_text": "Person findet Halt im Glauben",
                            "right_title": "Halt im Glauben",
                            "right_text": "Kaum religiöser / spiritueller Halt",
                            "score_path": "calculation.scores.scores.5.stanine",
                            "clinic_sample_var": null
                        }, {
                            "left_title": "Alkohol- und Zigarettenkonsum",
                            "left_text": "Kein erhöhter Akohol- oder Zigarettenkonsum",
                            "right_title": "Alkohol- und Zigarettenkonsum",
                            "right_text": "Ungünstige Bewältigung durch Alkohol und Zigaretten",
                            "score_path": "calculation.scores.scores.6.stanine",
                            "clinic_sample_var": null
                        }],
                        "ranges_alt": [{
                            "range_start": 0.5,
                            "range_stop": 1.5,
                            "text": "Stanine: 1 | 4%",
                            "color": "#C62828"
                        }, {
                            "range_start": 1.5,
                            "range_stop": 2.5,
                            "text": "Stanine: 2 | 7%",
                            "color": "#FB7200"
                        }, {
                            "range_start": 2.5,
                            "range_stop": 3.5,
                            "text": "Stanine: 3 | 12%",
                            "color": "#FFA000"
                        }, {
                            "range_start": 3.5,
                            "range_stop": 4.5,
                            "text": "Stanine: 4 | 17%",
                            "color": "#FBB100"
                        }, {
                            "range_start": 4.5,
                            "range_stop": 5.5,
                            "text": "Stanine: 5 | 20%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 5.5,
                            "range_stop": 6.5,
                            "text": "Stanine: 6 | 17%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 6.5,
                            "range_stop": 7.5,
                            "text": "Stanine: 7 | 12%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 7.5,
                            "range_stop": 8.5,
                            "text": "Stanine: 8 | 7%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 8.5,
                            "range_stop": 9.5,
                            "text": "Stanine: 9 | 4%",
                            "color": "#2E7D32"
                        }],
                        "ranges": [{
                            "range_start": 0.5,
                            "range_stop": 1.5,
                            "text": "Stanine: 1 | 4%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 1.5,
                            "range_stop": 2.5,
                            "text": "Stanine: 2 | 7%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 2.5,
                            "range_stop": 3.5,
                            "text": "Stanine: 3 | 12%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 3.5,
                            "range_stop": 4.5,
                            "text": "Stanine: 4 | 17%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 4.5,
                            "range_stop": 5.5,
                            "text": "Stanine: 5 | 20%",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 5.5,
                            "range_stop": 6.5,
                            "text": "Stanine: 6 | 17%",
                            "color": "#FBB100"
                        }, {
                            "range_start": 6.5,
                            "range_stop": 7.5,
                            "text": "Stanine: 7 | 12%",
                            "color": "#FFA000"
                        }, {
                            "range_start": 7.5,
                            "range_stop": 8.5,
                            "text": "Stanine: 8 | 7%",
                            "color": "#FB7200"
                        }, {
                            "range_start": 8.5,
                            "range_stop": 9.5,
                            "text": "Stanine: 9 | 4%",
                            "color": "#C62828"
                        }]
                    }
                }
            },
            methods: {
                sci_get_population: function (_sr) {

                    var _sr_sci = [];
                    var population = ""


                    _sr.data.forEach(function (current, ID) {

                        current.info = {};
                        current.info.app_zeitpunkt = 'Unbekannt';
                        if ("Erhebungszeitpunkt" in current.calculation.scores.response.data.response) {

                            if (current.calculation.scores.response.data.response.Erhebungszeitpunkt === "1") {
                                current.info.app_zeitpunkt = 'Eintritt';
                            } else {
                                if (current.calculation.scores.response.data.response.Erhebungszeitpunkt === "2") {
                                    current.info.app_zeitpunkt = 'Austritt';
                                } else {
                                    current.info.app_zeitpunkt = 'Verlauf';
                                };
                            };
                        };

                        current.info.score_0 = parseInt(current.calculation.scores.scores["0"].stanine);
                        current.info.score_1 = parseInt(current.calculation.scores.scores["1"].stanine);
                        current.info.score_2 = 10 - parseInt(current.calculation.scores.scores["2"].stanine);
                        current.info.score_3 = 10 - parseInt(current.calculation.scores.scores["3"].stanine);
                        current.info.score_4 = 10 - parseInt(current.calculation.scores.scores["4"].stanine);
                        current.info.score_5 = 10 - parseInt(current.calculation.scores.scores["5"].stanine);
                        current.info.score_6 = parseInt(current.calculation.scores.scores["6"].stanine);

                        population = current.calculation.scores.population.name;

                        _sr_sci.push(current);

                    });

                    var return_obj = {
                        "done": true,
                        "population": population,
                        "data": _sr_sci
                    }

                    if (_sr_sci.length > 0) {
                        return_obj.have_data = true;
                    } else {
                        return_obj.have_data = false;
                    };
                    return return_obj;

                },
                sci_pdf_content: function (sr) {
                    var pdf = [];
                    try {
                        if (sr.data.length > 0) {

                            var population_data = this.sci_get_population(sr);

                            var stanine_beschriftung = {
                                "id": "stanine_beschriftung",
                                "stack": [{
                                        "text": population_data.population,
                                        "style": "chart_p",
                                        "alignment": "center",
                                        "margin": [0, 12, 0, 0]
                                    },
                                    {
                                        "text": "Stanine",
                                        "style": "chart_p",
                                        "color": "#9E9E9E",
                                        "alignment": "center",
                                        "margin": [0, 0, 0, 0]
                                    },
                                ]
                            };

                            var chart_stress = [];
                            chart_stress.push(makepdf._heading("Stressereignisse und Syptome", "", 'h2'));
                            chart_stress.push(makepdf._horizontalLine(100, "#F5F5F5"));
                            chart_stress.push(stanine_beschriftung);
                            chart_stress.push(makepdf._pdf_chart_profile("de", this.get_pdf_chart_options(this.sci_chart_stress.options), {}, {}, [], this.sci_chart_stress.scales, sr, this.sci_chart_stress.ranges));
                            chart_stress.push(makepdf._horizontalLine(100, "#F5F5F5"));
                            pdf.push(makepdf._keepTogether(chart_stress, this.name + "_chart_stanine_stress"));

                            var chart_hilfreich = [];
                            chart_hilfreich.push(makepdf._heading("Copingstrategien", "", 'h2'));
                            chart_hilfreich.push(makepdf._text("Diese helfen die möglichen körperlichen und psychischen Stressreaktionen zu vermeiden oder zu reduzieren."));
                            chart_hilfreich.push(makepdf._horizontalLine(100, "#F5F5F5"));
                            chart_hilfreich.push(stanine_beschriftung);
                            chart_hilfreich.push(makepdf._pdf_chart_profile("de", this.get_pdf_chart_options(this.sci_chart_hilfreich.options), {}, {}, [], this.sci_chart_hilfreich.scales, sr, this.sci_chart_hilfreich.ranges));
                            chart_hilfreich.push(makepdf._horizontalLine(100, "#F5F5F5"));
                            pdf.push(makepdf._keepTogether(chart_hilfreich, this.name + "_chart_stanine_coping"));

                        } else {
                            pdf.push(this.pdf_no_data(this.name));
                        };

                    } catch (e) {
                        console.log('sci_pdf_content', e)
                        pdf.push(this.pdf_error(this.name));
                    };

                    return pdf;
                }
            }
        });
    }
};
Vue.use(plugin_sci);
// Plugin: plugin_asrs
const plugin_asrs = {
    install(Vue, options) {
        Vue.mixin({
            data: function () {
                return {
                    "name": "ASRS",
                    "asrs_chart": {
                        "options": {
                            "min": -1,
                            "max": 7,
                            "item_height": 50,
                            "item_text_left": 135,
                            "item_text_right": 135,
                            "color_grid": "#9E9E9E",
                            "color_clinic_sample": "#888888",
                            "color_skin": "grey_dark_to_light",
                            "show_baseline": false,
                            "show_ranges_overview": false,
                            "show_scale_text": true,
                            "show_score_vertical_line": true,
                            "show_score_profile_line": true,
                            "show_score_circles": true,
                            "show_settings_block": false,
                            "allow_toggle_settings_block": true,
                            "topnumber_hide_first_last": true,
                            "range_alpha": 0.09,
                            "vertical_grid_every_x": 1,
                            "response_title_path": "calculation.asrs_score.score.current_range.interpretation",
                            "response_date_path": "calculation.asrs_score.messzeitpunkt.mz_date"
                        },
                        "scales": [{
                            "left_title": "ADHS",
                            "left_text": "Keine Hinweise",
                            "right_title": "ADHS",
                            "right_text": "Hinweise vorhanden",
                            "score_path": "calculation.asrs_score.score.score",
                            "clinic_sample_var": null
                        }],
                        "ranges": [{
                                "range_start": 0,
                                "range_stop": 4,
                                "text": "Keine Hinweise auf ADHS vorhanden",
                                "color": "#4CAF50"
                            },
                            {
                                "range_start": 4,
                                "range_stop": 6,
                                "text": "Hinweise auf ADHS vorhanden",
                                "color": "#F44336"
                            }
                        ]
                    }
                }
            },
            methods: {
                asrs_pdf_content: function (sr) {
                    var pdf = [];
                    try {
                        if (sr.data.length > 0) {

                            var pdf_chart = [];
                            pdf_chart.push(makepdf._horizontalLine(100, "#F5F5F5"));
                            pdf_chart.push(makepdf._pdf_chart_profile("de", this.get_pdf_chart_options(this.asrs_chart.options), {}, {}, [], this.asrs_chart.scales, sr, this.asrs_chart.ranges));
                            pdf_chart.push(makepdf._horizontalLine(100, "#F5F5F5"));

                            pdf.push(makepdf._keepTogether(pdf_chart, "asrs_chart"));

                        } else {
                            pdf.push(this.pdf_no_data(this.name));
                        };

                    } catch (e) {
                        console.log('aase_pdf_content', e)
                        pdf.push(this.pdf_error(this.name));
                    };

                    return pdf;
                }
            }
        });
    }
};
Vue.use(plugin_asrs);
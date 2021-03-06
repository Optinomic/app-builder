// Plugin: plugin_bdi
const plugin_bdi = {
    install(Vue, options) {
        Vue.mixin({
            data: function () {
                return {
                    "name": "BDI-II",
                    "bdi_chart": {
                        "options": {
                            "min": -1.5,
                            "max": 64.5,
                            "item_height": 50,
                            "item_text_left": 130,
                            "item_text_right": 130,
                            "color_grid": "#9E9E9E",
                            "color_clinic_sample": "#888888",
                            "color_skin": "grey_dark_to_light",
                            "show_baseline": false,
                            "show_ranges_overview": false,
                            "show_scale_text": false,
                            "show_score_vertical_line": true,
                            "show_score_profile_line": false,
                            "show_score_circles": true,
                            "show_settings_block": false,
                            "allow_toggle_settings_block": false,
                            "topnumber_hide_first_last": true,
                            "range_alpha": 0.2,
                            "vertical_grid_every_x": 3,
                            "response_title_path": "calculation.bdi_score.score.current_range.interpretation_de",
                            "response_date_path": "date"
                        },
                        "scales": [{
                            "left_title": "Keine Depression",
                            "left_text": "",
                            "right_title": "Verdacht auf eine schwere Depression",
                            "right_text": "",
                            "score_path": "calculation.bdi_score.score.score",
                            "clinic_sample_var": null
                        }],
                        "ranges": [{
                            "range_start": 0,
                            "range_stop": 8.5,
                            "text": "Keine Depression",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 8.5,
                            "range_stop": 13.5,
                            "text": "V.a. eine minimale Depression",
                            "color": "#FBB100"
                        }, {
                            "range_start": 13.5,
                            "range_stop": 19.5,
                            "text": "V.a. eine leichte Depression",
                            "color": "#FFA000"
                        }, {
                            "range_start": 19.5,
                            "range_stop": 28.5,
                            "text": "V.a. eine mittelschwere Depression",
                            "color": "#FB7200"
                        }, {
                            "range_start": 28.5,
                            "range_stop": 63,
                            "text": "V.a. eine schwere Depression",
                            "color": "#C62828"
                        }]
                    }
                }
            },
            methods: {
                bdi_pdf_content: function (sr) {
                    var pdf = [];
                    try {
                        if (sr.data.length > 0) {

                            var pdf_chart = [];
                            pdf_chart.push(makepdf._horizontalLine(100, "#F5F5F5"));
                            pdf_chart.push(makepdf._pdf_chart_profile("de", this.get_pdf_chart_options(this.bdi_chart.options), {}, {}, [], this.bdi_chart.scales, sr, this.bdi_chart.ranges));
                            pdf_chart.push(makepdf._horizontalLine(100, "#F5F5F5"));

                            pdf.push(makepdf._keepTogether(pdf_chart, "bdi_chart"));

                        } else {
                            pdf.push(this.pdf_no_data(this.name));
                        };

                    } catch (e) {
                        console.log('bdi_pdf_content', e)
                        pdf.push(this.pdf_error(this.name));
                    };

                    return pdf;
                }
            }
        });
    }
};
Vue.use(plugin_bdi);
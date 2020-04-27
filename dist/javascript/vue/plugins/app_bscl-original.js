// Plugin: plugin_bscl_anq
const plugin_bscl_anq = {
    install(Vue, options) {
        Vue.mixin({
            data: function () {
                return {
                    "name": "BSCL",
                    "bscl_chart": {
                        "options": {
                            "min": -2,
                            "max": 14,
                            "item_height": 58,
                            "item_text_left": 100,
                            "item_text_right": 370,
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
                            "show_range_text": true,
                            "allow_toggle_settings_block": true,
                            "topnumber_hide_first_last": false,
                            "range_alpha": 0.09,
                            "vertical_grid_every_x": 2,
                            "response_title_path": "calculation.scores_calculation.info.mz.mz_typ",
                            "response_date_path": "calculation.scores_calculation.info.mz.mz_date",
                            "norm_sample": "Gesunde Normstichprobe (N=300)",
                            "dropout": "calculation.scores_calculation.info.mz.dropout",
                            "dropout_reason": "calculation.scores_calculation.info.mz.dropout_reason"
                        },
                        "scales": [{
                            "left_title": "Somatisierung",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Kopfschmerzen, Herzbeschwerden, Atemprobleme, Magenbeschwerden, Muskelschmerzen, Schwächegefühl, Schweregefühl, Unwohlsein usw.",
                            "m_norm": [0.23, 0.32],
                            "sd_norm": [0.31, 0.33],
                            "score_path": "calculation.scores_calculation.all_results.somatisierung_z_score",
                            "clinic_sample_var": "somatisierung_z_score",
                            "items": 7
                        }, {
                            "left_title": "Zwanghaftigkeit",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Gedanken, Impulse und Handlungen, die konstant vorhanden und nicht änderbar und ich-fremd oder ungewollt erlebt werden, Kognitive Leistungsstörungen.",
                            "m_norm": [0.50, 0.54],
                            "sd_norm": [0.46, 0.43],
                            "score_path": "calculation.scores_calculation.all_results.zwanghaftigkeit_z_score",
                            "clinic_sample_var": "zwanghaftigkeit_z_score",
                            "items": 6
                        }, {
                            "left_title": "Unsicherheit im Sozialkontakt",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Minderwertigkeitsgefühle, Selbstabwertungen, Selbstzweifel, Selbstunsicherheit und negative Erwartungen bzgl. dem eigenen zwischenmenschlichen Verhalten.",
                            "m_norm": [0.35, 0.49],
                            "sd_norm": [0.40, 0.45],
                            "score_path": "calculation.scores_calculation.all_results.unsicherheit_im_sozialkontakt_z_score",
                            "clinic_sample_var": "unsicherheit_im_sozialkontakt_z_score",
                            "items": 4
                        }, {
                            "left_title": "Depressivität",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Gedrückte Stimmung, Gesunkenes Interesse am Leben, Verringerte Motivation und Energie, Hoffnungslosigkeit, bis hin zu Suizidgedanken.",
                            "m_norm": [0.24, 0.33],
                            "sd_norm": [0.32, 0.40],
                            "score_path": "calculation.scores_calculation.all_results.depressivit__t_z_score",
                            "clinic_sample_var": "depressivit__t_z_score",
                            "items": 6
                        }, {
                            "left_title": "Ängstlichkeit",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Angst mit Nervosität, Spannungen und Zittern, Panikattacken und Schreckgefühlen, Gefühle von Besorgnis und Furcht.",
                            "m_norm": [0.29, 0.39],
                            "sd_norm": [0.31, 0.36],
                            "score_path": "calculation.scores_calculation.all_results.__ngstlichkeit_z_score",
                            "clinic_sample_var": "__ngstlichkeit_z_score",
                            "items": 6
                        }, {
                            "left_title": "Aggressivität / Feindseligkeit",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Reizbarkeit und Unausgeglichenheit bis hin zu starker Aggressivität. Ärger, Aggression, Irritierbarkeit, Zorn und Verstimmung.",
                            "m_norm": [0.29, 0.37],
                            "sd_norm": [0.35, 0.33],
                            "score_path": "calculation.scores_calculation.all_results.aggressivit__t___feindseligkeit_z_score",
                            "clinic_sample_var": "aggressivit__t___feindseligkeit_z_score",
                            "items": 5
                        }, {
                            "left_title": "Phobische Angst",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Andauernde und unangemessene Furcht als Reaktion auf eine bestimmte Person, einen Platz, ein Objekt oder eine charakteristische Situation, die zu Vermeidungs- oder Fluchtverhalten führt.",
                            "m_norm": [0.14, 0.16],
                            "sd_norm": [0.23, 0.25],
                            "score_path": "calculation.scores_calculation.all_results.phobische_angst_z_score",
                            "clinic_sample_var": "phobische_angst_z_score",
                            "items": 5
                        }, {
                            "left_title": "Paranoides Denken",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Misstrauen, Minderwertigkeitsgefühle, paranoides Denken: Gedankenprojektion, Feindseligkeit, Argwohn, Grandiosität, Einengung, Angst vor Autonomieverlust und wahnhafte Täuschung.",
                            "m_norm": [0.33, 0.34],
                            "sd_norm": [0.40, 0.38],
                            "score_path": "calculation.scores_calculation.all_results.paranoides_denken_z_score",
                            "clinic_sample_var": "paranoides_denken_z_score",
                            "items": 5
                        }, {
                            "left_title": "Psychotizismus",
                            "left_text": "",
                            "right_title": "",
                            "right_text": "Gefühl der Isolation und zwischenmenschlichen Entfremdung. Verzerrter, isolierter Lebensstil bis zu Halluzination und Gedankenzerfall.",
                            "m_norm": [0.19, 0.19],
                            "sd_norm": [0.28, 0.27],
                            "score_path": "calculation.scores_calculation.all_results.psychotizismus_z_score",
                            "clinic_sample_var": "psychotizismus_z_score",
                            "items": 5
                        }, {
                            "left_title": "GSI",
                            "left_text": "Global Severity Index",
                            "right_title": "GSI",
                            "right_text": "Durchschnittliche Belastung in allen Bereichen",
                            "m_norm": [0.28, 0.35],
                            "sd_norm": [0.23, 0.23],
                            "score_path": "calculation.scores_calculation.all_results.gsi_global_severity_index_z_score",
                            "clinic_sample_var": "gsi_global_severity_index_z_score",
                            "items": 53
                        }],
                        "ranges": [{
                            "range_start": -999,
                            "range_stop": 1,
                            "text": "Gesunde Ausprägung",
                            "color": "#2E7D32"
                        }, {
                            "range_start": 1,
                            "range_stop": 2,
                            "text": "Normale Ausprägung",
                            "color": "#FFFFFF"
                        }, {
                            "range_start": 2,
                            "range_stop": 999,
                            "text": "Starke Ausprägung",
                            "color": "#C62828"
                        }]
                    }
                }
            },
            methods: {
                bscl_get_zusatzitems: function (r) {

                    var d = {
                        "should_print_chart": false,
                        "zusatzitems": {
                            "defined": false,
                            "array": []
                        },
                        "dopouts": {
                            "defined": false,
                            "array": []
                        },
                        "zusatzitems_full": {
                            "defined": false,
                            "array": []
                        }
                    };

                    r.data.forEach(function (sr) {
                        if ("zusatzitem" in sr.calculation.scores_calculation) {
                            var zusatzitem = sr.calculation.scores_calculation.zusatzitem;
                            zusatzitem.items.forEach(function (item) {
                                var base_name = item.id + "__";
                                zusatzitem[base_name + "name"] = item.name;
                                zusatzitem[base_name + "result"] = item.result;
                                zusatzitem[base_name + "field"] = item.field;
                            }.bind(this));

                            if (zusatzitem.dropout === true) {
                                d.dopouts.array.push(zusatzitem);
                            } else {
                                d.zusatzitems.array.push(zusatzitem);
                            };
                            d.zusatzitems_full.array.push(zusatzitem);
                        };
                    }.bind(this));

                    if (d.zusatzitems.array.length > 0) {
                        d.zusatzitems.defined = true;
                        d.should_print_chart = true;
                    };

                    if (d.dopouts.array.length > 0) {
                        d.dopouts.defined = true;
                    };

                    if (d.zusatzitems_full.array.length > 0) {
                        d.zusatzitems_full.defined = true;
                    };

                    var return_obj = Object.assign({}, r);
                    return_obj.zusatz = d;

                    return return_obj;
                },
                bscl_get_cs_dive: function(s) {
                    var dive = [];
                    try {
                        if (s.data.length > 0) {
                            var latest_sr = s.data[s.data.length - 1];
                            
                            // Messzeitpunkt
                            if (latest_sr.calculation.scores_calculation.info.mz.mz_id !== 99) {
                                dive.push(latest_sr.calculation.scores_calculation.info.mz.mz_id);
                            };

                            // console.log('bscl_get_cs_dive SET', dive)
                        };

                    } catch (e) {
                        console.log('bscl_get_cs_dive', e)
                    };
                    return dive;                    
                },
                bscl_pdf_zusatzangaben: function (sr) {
                    var pdf = [];
                    try {

                        var allResults = sr.zusatz.zusatzitems_full.array;

                        // -----------------------------------------------
                        // Sort Results
                        // -----------------------------------------------

                        function sortByKey(array, key) {
                            return array.sort(function (a, b) {
                                var x = a[key];
                                var y = b[key];
                                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                            });
                        }


                        allResults = sortByKey(allResults, "mz_date");


                        // -----------------------------------------------
                        // Build pdfmake Table
                        // -----------------------------------------------

                        var table = {
                            "headerRows": 1,
                            "layout": "lightHorizontalLines",
                            "margin": [0, 6, 0, 12],
                            "table": {
                                "widths": [95, "*", "*", "*", "*"],
                                "body": []
                            }
                        };

                        var talbe_header = [
                            [{
                                    "text": "Messzeitpunkt",
                                    "style": "p",
                                    "margin": [0, 0, 0, 0]
                                },
                                {
                                    "text": "Datum",
                                    "style": "chart_p",
                                    "margin": [0, 0, 0, 6]
                                },
                            ],
                            {
                                "text": "Schlechter Appetit",
                                "alignment": "center",
                                "style": "p"
                            },
                            {
                                "text": "Einschlaf-schwierigkeiten",
                                "alignment": "center",
                                "style": "p"
                            },
                            {
                                "text": "Gedanken an Tod & Sterben",
                                "alignment": "center",
                                "style": "p"
                            },
                            {
                                "text": "Schuldgefühle",
                                "alignment": "center",
                                "style": "p"
                            }
                        ];

                        table.table.body.push(talbe_header);



                        allResults.forEach(function (result, resultID) {

                            if (result.dropout) {
                                // Dropout
                                var messung = [
                                    [{
                                            "text": result.mz_typ,
                                            "style": "p",
                                            "margin": [0, 6, 0, 0]
                                        },
                                        {
                                            "text": result.mz_datum,
                                            "style": "chart_p",
                                            "margin": [0, 0, 0, 6]
                                        },
                                    ],
                                    {
                                        "colSpan": 4,
                                        "margin": [0, 6, 0, 0],
                                        "text": [{
                                                "text": result.dropout_reason + "\n",
                                                "style": "p"
                                            },
                                            {
                                                "text": "Dropout (" + result.dropout_code + ")",
                                                "style": "chart_p",
                                                "color": "#F44336"
                                            }
                                        ]
                                    }
                                ];
                            } else {
                                // Daten vorhanden

                                var text_0 = "k.A.";
                                var text_1 = "k.A.";
                                var text_2 = "k.A.";
                                var text_3 = "k.A.";

                                result.items.forEach(function (item, itemID) {
                                    if (parseInt(item.id) === 0) {
                                        text_0 = item.result;
                                    };
                                    if (parseInt(item.id) === 1) {
                                        text_1 = item.result;
                                    };
                                    if (parseInt(item.id) === 2) {
                                        text_2 = item.result;
                                    };
                                    if (parseInt(item.id) === 3) {
                                        text_3 = item.result;
                                    };
                                }.bind(this));

                                var messung = [
                                    [{
                                            "text": result.mz_typ,
                                            "style": "p",
                                            "margin": [0, 6, 0, 0]
                                        },
                                        {
                                            "text": result.mz_datum,
                                            "style": "chart_p",
                                            "margin": [0, 0, 0, 6]
                                        },
                                    ],
                                    {
                                        "text": text_0,
                                        "style": "p",
                                        "alignment": "center",
                                        "margin": [0, 10, 0, 0]
                                    },
                                    {
                                        "text": text_1,
                                        "style": "p",
                                        "alignment": "center",
                                        "margin": [0, 10, 0, 0]
                                    },
                                    {
                                        "text": text_2,
                                        "style": "p",
                                        "alignment": "center",
                                        "margin": [0, 10, 0, 0]
                                    },
                                    {
                                        "text": text_3,
                                        "style": "p",
                                        "alignment": "center",
                                        "margin": [0, 10, 0, 0]
                                    }
                                ];
                            };


                            table.table.body.push(messung);


                        }.bind(this));

                        var return_stack = {
                            "id": "bscl_zusatzangaben",
                            "stack": []
                        };

                        return_stack.stack.push(makepdf._heading("Zusatzangaben", null, 'h2'));
                        return_stack.stack.push(table);

                        return return_stack;

                    } catch (e) {
                        console.log('bscl_pdf_zusatzangaben', e)
                    };

                    return pdf;
                },
                bscl_pdf_content: function (s) {
                    var pdf = [];
                    try {
                        if (s.data.length > 0) {

                            var sr = this.bscl_get_zusatzitems(s);
                            var cs_dive = this.bscl_get_cs_dive(s);

                            if (sr.zusatz.should_print_chart === true) {
                                var chart = [];
                                chart.push(makepdf._horizontalLine(100, "#F5F5F5", 1));
                                chart.push(makepdf._pdf_chart_profile("de", this.get_pdf_chart_options(this.bscl_chart.options), {}, included_bscl_cs, cs_dive, this.bscl_chart.scales, sr, this.bscl_chart.ranges));
                                chart.push(makepdf._horizontalLine(100, "#F5F5F5"));
                                pdf.push(makepdf._keepTogether(chart, "chart_" + this.name));
                            };

                            pdf.push(makepdf._keepTogether(this.bscl_pdf_zusatzangaben(sr), "zusatzangaben_" + this.name));

                        } else {
                            pdf.push(this.pdf_no_data(this.name));
                        };

                    } catch (e) {
                        console.log('bscl_pdf_content', e)
                        pdf.push(this.pdf_error(this.name));
                    };

                    return pdf;
                }
            }
        });
    }
};
Vue.use(plugin_bscl_anq);
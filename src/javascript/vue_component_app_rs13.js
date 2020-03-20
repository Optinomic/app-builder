// RS13-Application
Vue.component('app-rs13', {
    props: {},
    created() {},
    data: function () {
        return {
            "base_config": {
                "dist_root": "dist",
                "app_id": "ch.suedhang.apps.rs13.production",
                "app_name": "Resilienzfragebogen (RS-13)",
                "app_short_description": "Psychische Widerstandskraft",
                "app_type": "patient"
            },
            "pdf_content": [],
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
            }, {
                "range_start": 67,
                "range_stop": 72,
                "interpretation_de": "moderate Widerstandskraft (Resilienz)",
                "text": "Moderat",
                "color": "#FF9800"
            }, {
                "range_start": 73,
                "range_stop": 91,
                "interpretation_de": "hohe Widerstandskraft (Resilienz)",
                "text": "Hoch",
                "color": "#4CAF50"
            }],
            "data_table": {
                "rows": [{
                        name: 'Wenn ich Pläne habe, verfolge ich sie auch.',
                        variable: 'rs13_01',
                        path: 'response.rs13_01'
                    },
                    {
                        name: 'Normalerweise schaffe ich alles irgendwie.',
                        variable: 'rs13_02',
                        path: 'response.rs13_02'
                    },
                    {
                        name: 'Ich lasse mich nicht so schnell aus der Bahn werfen.',
                        variable: 'rs13_03',
                        path: 'response.rs13_03'
                    },
                    {
                        name: 'Ich mag mich.',
                        variable: 'rs13_04',
                        path: 'response.rs13_04'
                    },
                    {
                        name: 'Ich kann mehrere Dinge gleichzeitig bewältigen.',
                        variable: 'rs13_05',
                        path: 'response.rs13_05'
                    },
                    {
                        name: 'Ich bin entschlossen.',
                        variable: 'rs13_06',
                        path: 'response.rs13_06'
                    },
                    {
                        name: 'Ich nehme die Dinge wie sie kommen.',
                        variable: 'rs13_07',
                        path: 'response.rs13_07'
                    },
                    {
                        name: 'Ich behalte an vielen Dingen Interesse.',
                        variable: 'rs13_08',
                        path: 'response.rs13_08'
                    },
                    {
                        name: 'Normalerweise kann ich eine Situation aus mehreren Perspektiven betrachten.',
                        variable: 'rs13_09',
                        path: 'response.rs13_09'
                    },
                    {
                        name: 'Ich kann mich auch überwinden, Dinge zu tun, die ich eigentlich nicht machen will.',
                        variable: 'rs13_10',
                        path: 'response.rs13_10'
                    },
                    {
                        name: 'Wenn ich in einer schwierigen Situation bin, finde ich gewöhnlich einen Weg heraus.',
                        variable: 'rs13_11',
                        path: 'response.rs13_11'
                    },
                    {
                        name: 'In mir steckt genügend Energie, um alles zu machen, was ich machen muss.',
                        variable: 'rs13_12',
                        path: 'response.rs13_12'
                    },
                    {
                        name: 'Ich kann es akzeptieren, wenn mich nicht alle Leute mögen.',
                        variable: 'rs13_13',
                        path: 'response.rs13_13'
                    },
                    {
                        name: 'Resilienz Summenscore',
                        variable: 'rs13_score',
                        path: 'calculation.resilienz_score.rs13_score'
                    }
                ]
            }
        }
    },
    methods: {
        getTitle: function (r) {
            var ret_string = "Erfassung";
            console.log(r)
            try {
                if (r.calculation_found) {
                    const name = r.calculation.resilienz_score.range.interpretation_de;
                    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
                    ret_string = nameCapitalized;
                }
            } catch (e) {
                // Anweisungen für jeden Fehler
                logMyErrors(e); // Fehler-Objekt an die Error-Funktion geben
            }
            return ret_string;
        },
        getSubtitle: function (r) {
            var ret_string = "::";
            try {
                ret_string = formatDateCH(r.date);
                if (r.calculation_found) {
                    ret_string = ret_string + " | ∑ Resilienz-Summenscore: " + r.calculation.resilienz_score.rs13_score;
                }
            } catch (e) {
                // Anweisungen für jeden Fehler
                logMyErrors(e); // Fehler-Objekt an die Error-Funktion geben
            }
            return ret_string;
        }
    },
    computed: {
        patient_secure() {
            // return data
            try {
                return this.$store.state.patient.data.extras.secure;
            } catch (e) {
                return "";
            };
        },
        sr_data() {
            // return data
            try {
                return this.$store.state.sr.data;
            } catch (e) {
                return [];
            };
        },
        sr_count_text() {
            // return data
            try {
                var ret_text = "";
                if (this.$store.state.sr.data.length === 0) {
                    ret_text = "Keine Erfassung";
                };
                if (this.$store.state.sr.data.length === 1) {
                    ret_text = "Eine Erfassung";
                };
                if (this.$store.state.sr.data.length > 1) {
                    ret_text = "Erfassungen (" + this.$store.state.sr.data.length + ")";
                };
                return ret_text;
            } catch (e) {
                return "";
            };
        },
        sr_full() {
            // return data
            try {
                return this.$store.state.sr;
            } catch (e) {
                return [];
            };
        },
        pdf_ready() {
            // return data
            try {
                if (this.$store.state.sr.data.length) {

                    var pdf = [];

                    // pdf.push(makepdf._suedhang_logo_anschrift());

                    var title = makepdf._title(this.base_config.app_short_description, this.base_config.app_name);
                    pdf.push(title);

                    if (this.$store.state.sr.data.length > 0) {

                        pdf.push(makepdf._heading("Auswertung / Interpretation", null, "h2"));

                        this.$store.state.sr.data.forEach(function (d) {
                            if (d.calculation_found) {

                                var interpret = makepdf._text(d.calculation.resilienz_score.interpretation);
                                pdf.push(makepdf._keepTogether(interpret));

                                pdf.push(makepdf._horizontalLine(100, "#F5F5F5"));
                                var pdf_chart = makepdf._pdf_chart_profile("de", this.options, {}, {}, [], this.scales, this.$store.state.sr, this.ranges);
                                pdf.push(pdf_chart);
                                pdf.push(makepdf._horizontalLine(100, "#F5F5F5"));

                            } else {
                                pdf.push(makepdf._noData("Resilienz", "Calculation noch nicht berechnet.", 6));
                            };
                        }.bind(this));
                        // pdf.push(makepdf._stamp(this.patient_secure, 6));
                    } else {
                        pdf.push(makepdf._noData("Resilienz", "Keine Daten vorhanden", 6));
                    };

                    this.pdf_content = pdf;
                    return true;
                } else {
                    return false;
                };

            } catch (e) {
                console.error('ERROR: pdf_ready', e);
                return false;
            };
        }
    },
    template: `
    <div>
        <optinomic-content-block :title="getTitle(sr)" :subtitle="getSubtitle(sr)" id="id_erfassungen" v-for="sr in sr_data"
            :key="sr.event_id">
    
            <div v-if="sr.calculation_found">
                <p class="overline">Auswertung / Interpretation</p>
                <div class="text--primary body-1 mb-4" v-html="sr.calculation.resilienz_score.interpretation"></div>
                <optinomic-chart-profile style="border-top:1px solid #fafafa;border-bottom:1px solid #fafafa;" v-bind:options="JSON.stringify(options)" v-bind:scales="JSON.stringify(scales)"
                    v-bind:ranges="JSON.stringify(ranges)" v-bind:scores="JSON.stringify(sr_full)">
                </optinomic-chart-profile>
            </div>
            <div v-else>
                <div>Resilienz</div>
                <p class="display-1 text--primary" v-html="formatDateCH(sr.date)">
                </p>
                <p>Hinweis</p>
                <div class="text--primary">
                    Calculation noch nicht berechnet.
                </div>
            </div>
            
        </optinomic-content-block>

        <optinomic-content-block :subtitle="sr_count_text" title="Datentabelle" id="id_data_table">
            <optinomic-data-table :rows="data_table.rows"></optinomic-data-table>
        </optinomic-content-block>  
    
        <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf" v-if="pdf_ready">
            <optinomic-pdfmake :header-left="patient_secure" footer-left="Resilienz" header-right="Klinik Südhang"
                document-title="Resilienz" :content="pdf_content" hide-logo></optinomic-pdfmake>
        </optinomic-content-block>
    </div>
    `
});
// RS13-Application
Vue.component('app-rs13', {
    props: {},
    created() {},
    data: function () {
        return {
            pdf_content: [],
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
                "show_scale_text": false,
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
                "left_title": "Niedrige Resilienz",
                "left_text": "",
                "right_title": "Hohe Resilienz",
                "right_text": "",
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
            }]
        }
    },
    computed: {
        sr_data() {
            // return data
            try {
                return this.$store.state.sr.data;
            } catch (e) {
                return [];
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

                    pdf.push(makepdf._suedhang_logo_anschrift());

                    var title = makepdf._title("Psychische Wiederstandskraft", "Resilienzfragebogen (RS-13)");
                    pdf.push(title);

                    pdf.push(makepdf._heading("Interpretation", null, "h2"));

                    if (this.$store.state.sr.data.length > 0) {

                        this.$store.state.sr.data.forEach(function (d) {
                            if (d.calculation_found) {
                                var interpret = makepdf._text(d.calculation.resilienz_score.interpretation);
                                pdf.push(makepdf._keepTogether(interpret));
                            };
                        });

                    } else {
                        pdf.push(makepdf._noData("Resilienz", 6));
                    };


                    this.pdf_content = pdf;
                    return true;
                } else {
                    return false;
                };

            } catch (e) {
                return false;
            };
        }
    },
    template: `
        <div>
            <div style="margin-bottom:24px;">
                <h3 class="font-weight-light">Erfassungen (<span v-html="sr_data.length"></span>)</h3>
                <v-divider></v-divider>
            </div>
            <div style="margin-bottom:24px;">

                <v-card class="mx-auto" outlined v-for="sr in sr_data" :key="sr.event_id">
                    <v-card-text v-if="sr.calculation_found">
                        <div class="overline">
                            <span>∑</span> Resilienz-Summenscore: 
                            <span v-html="sr.calculation.resilienz_score.rs13_score"></span>
                        </div>
                        <p class="headline text--primary" v-html="formatDateCH(sr.date)"></p>

                        <p class="overline">Auswertung / Interpretation</p>
                        <div class="text--primary body-1 mb-4" v-html="sr.calculation.resilienz_score.interpretation"></div>
                        <optinomic-chart-profile v-bind:options="JSON.stringify(options)" v-bind:scales="JSON.stringify(scales)" v-bind:ranges="JSON.stringify(ranges)" v-bind:scores="JSON.stringify(sr_full)"></optinomic-chart-profile>
                        
                    </v-card-text>
                    <v-card-text v-else>
                        <div>Resilienz</div>
                        <p class="display-1 text--primary" v-html="formatDateCH(sr.date)">
                        </p>
                        <p>Hinweis</p>
                        <div class="text--primary">
                            Calculation noch nicht berechnet.
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div style="margin-bottom:24px;" v-if="pdf_ready">
                <h3 class="font-weight-light">Druckvorlage (PDF)</h3>
                <v-divider></v-divider>
                <optinomic-pdfmake header-left="Herr Muster" footer-left="Resilienz" header-right="Klinik Südhang" document-title="Resilienz" :content="pdf_content" hide-logo></optinomic-pdfmake>
            </div>
        </div>
    `
});

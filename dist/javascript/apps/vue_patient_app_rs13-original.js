// RS13-Application
Vue.component('app-rs13', {
    props: {
        identifier: {
            type: String,
            default: helpers.getAppID()
        }
    },
    created() {},
    data: function () {
        return {
            "pdf_content": [],
            "data_table": {
                "rows": [{
                        "name": "Messzeitpunkt",
                        "variable": "rs13_messzeitpunkt",
                        "path": "response.rs13_messzeitpunkt",
                        "interpretation": "mz"
                    },
                    {
                        "name": "Erfassungsdatum",
                        "variable": "rs13_date",
                        "path": "response.rs13_date",
                        "interpretation": "date"
                    },
                    {
                        "name": "Wenn ich Pläne habe, verfolge ich sie auch.",
                        "variable": "rs13_01",
                        "path": "response.rs13_01"
                    },
                    {
                        "name": "Normalerweise schaffe ich alles irgendwie.",
                        "variable": "rs13_02",
                        "path": "response.rs13_02"
                    },
                    {
                        "name": "Ich lasse mich nicht so schnell aus der Bahn werfen.",
                        "variable": "rs13_03",
                        "path": "response.rs13_03"
                    },
                    {
                        "name": "Ich mag mich.",
                        "variable": "rs13_04",
                        "path": "response.rs13_04"
                    },
                    {
                        "name": "Ich kann mehrere Dinge gleichzeitig bewältigen.",
                        "variable": "rs13_05",
                        "path": "response.rs13_05"
                    },
                    {
                        "name": "Ich bin entschlossen.",
                        "variable": "rs13_06",
                        "path": "response.rs13_06"
                    },
                    {
                        "name": "Ich nehme die Dinge wie sie kommen.",
                        "variable": "rs13_07",
                        "path": "response.rs13_07"
                    },
                    {
                        "name": "Ich behalte an vielen Dingen Interesse.",
                        "variable": "rs13_08",
                        "path": "response.rs13_08"
                    },
                    {
                        "name": "Normalerweise kann ich eine Situation aus mehreren Perspektiven betrachten.",
                        "variable": "rs13_09",
                        "path": "response.rs13_09"
                    },
                    {
                        "name": "Ich kann mich auch überwinden, Dinge zu tun, die ich eigentlich nicht machen will.",
                        "variable": "rs13_10",
                        "path": "response.rs13_10"
                    },
                    {
                        "name": "Wenn ich in einer schwierigen Situation bin, finde ich gewöhnlich einen Weg heraus.",
                        "variable": "rs13_11",
                        "path": "response.rs13_11"
                    },
                    {
                        "name": "In mir steckt genügend Energie, um alles zu machen, was ich machen muss.",
                        "variable": "rs13_12",
                        "path": "response.rs13_12"
                    },
                    {
                        "name": "Ich kann es akzeptieren, wenn mich nicht alle Leute mögen.",
                        "variable": "rs13_13",
                        "path": "response.rs13_13"
                    },
                    {
                        "name": "Resilienz Summenscore",
                        "variable": "rs13_score",
                        "path": "calculation.resilienz_score.rs13_score"
                    }
                ],
                "interpretations": {
                    "mz": [{
                            "value": 1,
                            "text": "Eintritt"
                        },
                        {
                            "value": 2,
                            "text": "Austritt"
                        },
                        {
                            "value": 3,
                            "text": "Anderer Messzeitpunkt"
                        }
                    ]
                }
            }
        }
    },
    methods: {},
    computed: {
        patient_secure() {
            try {
                return this.$store.state.patient.data.extras.secure;
            } catch (e) {
                return "";
            };
        },
        sr_count_text() {
            try {
                var ret_text = "";
                if (this.sr_data.length === 0) {
                    ret_text = "Keine Erfassung";
                };
                if (this.sr_data.length === 1) {
                    ret_text = "Eine Erfassung";
                };
                if (this.sr_data.length > 1) {
                    ret_text = "Erfassungen (" + this.sr_data.length + ")";
                };
                return ret_text;
            } catch (e) {
                return "";
            };
        },
        pdf_ready() {
            try {
                if ((this.sr_data.length) && (this.current_module)) {
                    // Build PDF
                    var pdf = [];
                    pdf.push(this.pdf_app_info(this.current_module, true));
                    pdf.push(this.rs13_pdf_content(this.sr));
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

            <div v-if="!missings">
                <optinomic-content-block v-if="sr" :title="base_config.app_short_description" subtitle="Übersicht | Grafik" id="rs13_chart">
                    <optinmic-profile-chart 
                        :options="rs13_chart.options"
                        :scales="rs13_chart.scales" 
                        :ranges="rs13_chart.ranges"
                        :scores="sr">
                    </optinmic-profile-chart>
                </optinomic-content-block>
            </div>

            <div v-for="sr in sr_data" :key="sr.event_id">

                <div v-if="sr.calculation_found">
                    <optinomic-content-block :title="rs13_getTitle(sr)" :subtitle="rs13_getSubtitle(sr)"
                        :id="'id_erfassung_' + sr.event_id">
                        <p class="overline">Auswertung / Interpretation</p>
                        <optinomic-clipboard-text :text="sr.calculation.resilienz_score.interpretation">
                        </optinomic-clipboard-text>
                    </optinomic-content-block>
                </div>

            </div>

            <optinomic-content-block :subtitle="sr_count_text" title="Datentabelle" id="id_data_table">
                <optinomic-data-table :rows="data_table.rows" :interpretations="data_table.interpretations" :sr="sr_data">
                </optinomic-data-table>
            </optinomic-content-block>

            <div v-if="!missings">
                <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf" v-if="pdf_ready">
                    <optinomic-pdfmake :header-left="patient_secure" footer-left="Resilienzfragebogen (RS-13)"
                        header-right="Klinik Südhang" document-title="Resilienz" :content="pdf_content" hide-logo>
                    </optinomic-pdfmake>
                </optinomic-content-block>
            </div>

        </div>
    `
});
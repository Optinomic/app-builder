// BSCL - Application
Vue.component('app-bscl', {
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
                    "variable": "mz_id",
                    "path": "calculation.scores_calculation.zusatzitem.mz_text"
                }, {
                    "name": "Datum",
                    "variable": "mz_datum",
                    "path": "calculation.scores_calculation.zusatzitem.mz_datum"
                }, {
                    "name": "Schlechter Appetit",
                    "variable": "zusatz_0",
                    "path": "calculation.scores_calculation.zusatzitem.items.0.result"
                }, {
                    "name": "Einschlafschwierigkeiten",
                    "variable": "zusatz_1",
                    "path": "calculation.scores_calculation.zusatzitem.items.1.result"
                }, {
                    "name": "Gedanken an Tod & Sterben",
                    "variable": "zusatz_2",
                    "path": "calculation.scores_calculation.zusatzitem.items.2.result"
                }, {
                    "name": "Schuldgefühle",
                    "variable": "zusatz_3",
                    "path": "calculation.scores_calculation.zusatzitem.items.3.result"
                }, {
                    "name": "Dropout | Code",
                    "variable": "dropout_code",
                    "path": "calculation.scores_calculation.zusatzitem.dropout_code"
                }, {
                    "name": "Dropout | Begründung",
                    "variable": "dropout_reason",
                    "path": "calculation.scores_calculation.zusatzitem.dropout_reason"
                }]
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
                    pdf.push(this.bscl_pdf_content(this.sr));
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
                <optinomic-content-block v-if="sr" title="BSCL" subtitle="Übersicht | Grafik" id="bscl_chart">
                    <optinmic-profile-chart 
                        :options="bscl_chart.options"
                        :scales="bscl_chart.scales" 
                        :ranges="bscl_chart.ranges"
                        :clinic_samples="included_cs"
                        :clinic_sample_dive="bscl_get_cs_dive(sr)"
                        :scores="sr">
                    </optinmic-profile-chart>
                </optinomic-content-block>
            </div>

            <optinomic-content-block :subtitle="sr_count_text" title="Zusatzangaben" id="id_data_table">
                <optinomic-data-table :rows="data_table.rows" :sr="sr_data">
                </optinomic-data-table>
            </optinomic-content-block>

            <div v-if="!missings">
                <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf" v-if="pdf_ready">
                    <optinomic-pdfmake :header-left="patient_secure" footer-left="Brief Symptom Checklist (BSCL)"
                        header-right="Klinik Südhang" document-title="BSCL" :content="pdf_content" hide-logo>
                    </optinomic-pdfmake>
                </optinomic-content-block>
            </div>

        </div>
    `
});
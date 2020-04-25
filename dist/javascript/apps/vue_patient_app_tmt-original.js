// TMT - Application
Vue.component('app-tmt', {
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
                        "variable": "Zeitpunkt",
                        "path": "calculation.tmt_score.Messzeitpunkt.Messzeitpunkt_Text_Quotient",
                        "interpretation": "mz"
                    },
                    {
                        "name": "Erfassungsdatum",
                        "variable": "Datum",
                        "path": "calculation.tmt_score.date",
                        "interpretation": "date"
                    },
                    {
                        "name": "TMT A | Zeit",
                        "variable": "TMT_A_Time",
                        "path": "calculation.tmt_score.TMTATime"
                    },
                    {
                        "name": "TMT A | Fehler",
                        "variable": "TMT_A_Error",
                        "path": "calculation.tmt_score.TMTAError"
                    },
                    {
                        "name": "TMT A | Z-Wert",
                        "variable": "TMT_B_Z",
                        "path": "calculation.tmt_score.percentile.z_scores.tmtA_z_neu_rounded"
                    },
                    {
                        "name": "TMT B | Zeit",
                        "variable": "TMT_B_Time",
                        "path": "calculation.tmt_score.TMTBTime"
                    },
                    {
                        "name": "TMT B | Fehler",
                        "variable": "TMT_B_Error",
                        "path": "calculation.tmt_score.TMTBError"
                    },
                    {
                        "name": "TMT B | Z-Wert",
                        "variable": "TMT_B_Z",
                        "path": "calculation.tmt_score.percentile.z_scores.tmtB_z_neu_rounded"
                    }
                ]
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
                    pdf.push(this.tmt_pdf_content(this.sr));
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
                <optinomic-content-block v-if="sr" title="Trail Making Test (TMT)" subtitle="Übersicht | Grafik" id="tmt_chart">
                    <optinmic-profile-chart 
                        :options="tmt_chart.options"
                        :scales="tmt_chart.scales" 
                        :ranges="tmt_chart.ranges"
                        :clinic_samples="included_cs"
                        :clinic_sample_dive="tmt_get_cs_dive(sr)"
                        :scores="sr">
                    </optinmic-profile-chart>
                </optinomic-content-block>
            </div>

            <optinomic-content-block :subtitle="sr_count_text" title="Datenblatt" id="tmt_data_table">
                <optinomic-data-table :rows="data_table.rows" :interpretations="data_table.interpretations" :sr="sr_data">
                </optinomic-data-table>
            </optinomic-content-block>

            <div v-if="!missings">
                <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf" v-if="pdf_ready">
                    <optinomic-pdfmake :header-left="patient_secure" footer-left="Trail Making Test (TMT)"
                        header-right="Klinik Südhang" document-title="TMT" :content="pdf_content" hide-logo>
                    </optinomic-pdfmake>
                </optinomic-content-block>
            </div>

        </div>
    `
});
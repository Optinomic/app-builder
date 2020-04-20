// ASRS | Application
Vue.component('app-asrs', {
    props: {
        identifier: {
            type: String,
            default: helpers.getAppID()
        }
    },
    created() {},
    data: function () {
        return {
            "pdf_content": []
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
        pdf_ready() {
            try {
                if ((this.sr_data.length) && (this.current_module)) {
                    // Build PDF
                    var pdf = [];
                    pdf.push(this.pdf_app_info(this.current_module, true));
                    pdf.push(this.asrs_pdf_content(this.sr));
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
                <optinomic-content-block v-if="sr" title="ASRS" subtitle="Übersicht | Grafik" id="aase_chart">
                    <optinmic-profile-chart 
                        :options="asrs_chart.options"
                        :scales="asrs_chart.scales" 
                        :ranges="asrs_chart.ranges"
                        :scores="sr">
                    </optinmic-profile-chart>
                </optinomic-content-block>
            </div>

            <div v-if="!missings">
                <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf" v-if="pdf_ready">
                    <optinomic-pdfmake :header-left="patient_secure" footer-left="ASRS | ADHS-Screening"
                        header-right="Klinik Südhang" document-title="ASRS" :content="pdf_content" hide-logo>
                    </optinomic-pdfmake>
                </optinomic-content-block>
            </div>

        </div>
    `
});
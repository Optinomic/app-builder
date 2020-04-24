// SCI - Application
Vue.component('app-sci', {
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
                    pdf.push(this.sci_pdf_content(this.sr));
                    this.pdf_content = pdf;
                    return true;
                } else {
                    return false;
                };
            } catch (e) {
                return false;
            };
        },
        sr_sci() {
            var ret_obj = null;
            try {
                if ((this.sr_data.length) && (this.current_module)) {
                    ret_obj = this.sci_get_population(this.sr);    
                };
            } catch (e) {
                console.error('sr_sci', e);
            };
            return ret_obj;
        }
    },
    template: `
        <div>

            <div v-if="!missings">
                <optinomic-content-block v-if="sr_sci" title="Stressereignisse und Symptome" subtitle="Stress Coping Inventar (SCI)" id="sci_chart_stress">
                    <p class="text-center body-2"><span style="color:#8b0042" v-text="sr_sci.population"></span><span class="ml-2">(Stanine)</span></p>
                    
                    <optinmic-profile-chart 
                        :options="sci_chart_stress.options"
                        :scales="sci_chart_stress.scales" 
                        :ranges="sci_chart_stress.ranges"
                        :scores="sr_sci">
                    </optinmic-profile-chart>
                </optinomic-content-block>
                <optinomic-content-block v-else title="Stressereignisse und Symptome" subtitle="Stress Coping Inventar (SCI)" id="sci_chart_stress">
                    <v-skeleton-loader
                        class="mx-auto"
                        type="article"
                    ></v-skeleton-loader>
                </optinomic-content-block>

                <optinomic-content-block v-if="sr_sci" title="Copingstrategien" subtitle="Stress Coping Inventar (SCI)" id="sci_chart_hilfreich">
                    <p>Diese helfen die möglichen körperlichen und psychischen Stressreaktionen zu vermeiden oder zu reduzieren.</p>
                    <p class="mt-6 text-center body-2"><span style="color:#8b0042" v-text="sr_sci.population"></span><span class="ml-2">(Stanine)</span></p>
                    
                    <optinmic-profile-chart 
                        :options="sci_chart_hilfreich.options"
                        :scales="sci_chart_hilfreich.scales" 
                        :ranges="sci_chart_hilfreich.ranges"
                        :scores="sr_sci">
                    </optinmic-profile-chart>
                </optinomic-content-block>
                <optinomic-content-block v-else title="Copingstrategien" subtitle="Stress Coping Inventar (SCI)" id="sci_chart_stress">
                    <v-skeleton-loader
                        class="mx-auto"
                        type="article"
                    ></v-skeleton-loader>
                </optinomic-content-block>
            </div>


            <div v-if="!missings">
                <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf" v-if="pdf_ready">
                    <optinomic-pdfmake :header-left="patient_secure" footer-left="Stress Coping Inventar (SCI)"
                        header-right="Klinik Südhang" document-title="SCI" :content="pdf_content" hide-logo>
                    </optinomic-pdfmake>
                </optinomic-content-block>
            </div>

        </div>
    `
});
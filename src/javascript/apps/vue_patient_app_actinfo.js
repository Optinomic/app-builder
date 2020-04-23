// app-actinfo | Application
Vue.component('app-actinfo', {
    props: {
        production: {
            type: Boolean,
            default: true
        }
    },
    data: function () {
        return {
            "apps": {
                "production": [{
                        "name": "actinfo_ein",
                        "title": "ActInfo",
                        "subtitle": "Information network on addiction care and therapy",
                        "identifier": "ch.suedhang.apps.actinfo_ein.production"
                    },
                    {
                        "name": "actinfo_aus",
                        "title": "ActInfo",
                        "subtitle": "Information network on addiction care and therapy",
                        "identifier": "ch.suedhang.apps.actinfo_aus.production"
                    }
                ]
            },
            "pdf_content": []
        }
    },
    created() {
        // Load Data
        try {
            if (this.production === true) {
                this.apps.production.forEach(function (app) {
                    var params = {
                        "name": app.name,
                        "title": app.title,
                        "subtitle": app.subtitle,
                        "identifier": app.identifier
                    };
                    this.$store.dispatch('getSurveyResponses', params);
                }.bind(this));
            };
        } catch (err) {
            console.error('created - actInfo', err);
        }
    },
    methods: {},
    computed: {
        data_ein() {
            // ActInfo Ein Data
            try {
                if (this.production === true) {
                    var data_ein = null;
                    this.apps.production.forEach(function (app) {
                        if (app.name === "actinfo_ein") {
                            data_ein = this.$store.state.data_apps.data_object[app.identifier];
                            console.log('(✔) actInfo: data_ein', data_ein);
                        };
                    }.bind(this));
                    return data_ein;
                };
            } catch (err) {
                console.error('(!) actInfo: data_ein', err);
                return null;
            }
        },
        data_ein_last() {
            // Get Last Data of Data Ein
            try {
                var data_ein_last = this.data_ein.data[this.data_ein.data.length-1];
                console.log('(✔) actInfo: data_ein_last', data_ein_last);
                return data_ein_last
            } catch (err) {
                console.error('(!) actInfo: data_ein', err);
                return null;
            }
        },
        problemsubstanzen() {
            // Get Last Data of Data Ein
            try {
                if (this.data_ein_last.calculation.actinfo_ein.problemsubstanzen.substanzen.length > 1) {
                    return 'Problemsubstanzen'
                } else {
                    return 'Problemsubstanz'
                };
            } catch (err) {
                return 'Problemsubstanz'
            }
        },
        hauptproblem_substanz() {
            // Get Last Data of Data Ein
            try {
                var h = this.data_ein_last.calculation.actinfo_ein.zusatzangaben.hauptproblem_substanz_text;
                if ((h !== null) && (h !== '')) {
                    return h;
                } else {
                    return 'Häufigkeit'
                };
            } catch (err) {
                return 'Häufigkeit'
            }
        },
        data_aus() {
            // ActInfo Aus Data
            try {
                if (this.production === true) {
                    var data_aus = null;
                    this.apps.production.forEach(function (app) {
                        if (app.name === "actinfo_aus") {
                            data_aus = this.$store.state.data_apps.data_object[app.identifier];
                            console.log('(✔) actInfo: data_aus', data_aus);
                        };
                    }.bind(this));
                    return data_aus;
                };
            } catch (err) {
                console.error('(!) actInfo: data_aus', err);
                return null;
            }
        },
        data_merged() {
            // Merge Data ActInfo Ein/Aus
            try {
                    var return_obj = null;
                    if ((this.data_ein !== undefined) && (this.data_aus !== undefined)) {
                        return_obj = this.merge_data_ein_aus(this.data_ein, this.data_aus);
                        console.log('(✔) actInfo: data_merged', return_obj);
                    };
                    return return_obj;
            } catch (err) {
                console.error('(!) actInfo: data_merged', err);
                return null;
            }
        },
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
                    pdf.push(this.actinfo_pdf_content(this.sr));
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

            <div v-if="data_merged">
                <optinomic-content-block v-if="data_merged.actinfo_ein_data" :title="problemsubstanzen" :subtitle="hauptproblem_substanz" id="actinfo_substanz">
                    <p v-text="data_ein_last.calculation.actinfo_ein.problemsubstanzen.description"></p>
                    <ol class="ml-4">
                        <li class="mb-3" v-for="s in data_ein_last.calculation.actinfo_ein.problemsubstanzen.substanzen" :key="s.substanz">
                            <b v-text="s.substanz + ': '"></b>
                            <span v-text="s.label"></span>
                        </li>
                    </ol>
                    <div v-if="data_ein_last.calculation.actinfo_ein.zusatzangaben">
                        <p class="title font-weight-light mt-8">Zusatzangaben</p>
                        <optinomic-clipboard-text :text="data_ein_last.calculation.actinfo_ein.zusatzangaben.kunsumalter_text + ' ' + data_ein_last.calculation.actinfo_ein.zusatzangaben.entzuege_text"></optinomic-clipboard-text>
                    </div>
                </optinomic-content-block>

                <optinomic-content-block v-if="data_merged.show_audit" title="Alkoholabhängigkeit" subtitle="Alcohol Use Disorders Identification (AUDIT)" id="actinfo_audit">
                    <optinomic-clipboard-text :text="data_merged.audit_text"></optinomic-clipboard-text>
                    <optinmic-profile-chart 
                        :options="actinfo_audit_chart.options"
                        :scales="actinfo_audit_chart.scales" 
                        :ranges="actinfo_audit_chart.ranges"
                        :scores="data_merged">
                    </optinmic-profile-chart>
                </optinomic-content-block>

                <optinomic-content-block v-if="data_merged.show_fagerstoem" title="Nikotinabhängigkeit" subtitle="Fagerström" id="actinfo_fagerstroem">
                    <optinomic-clipboard-text :text="data_merged.fagerstroem_text"></optinomic-clipboard-text>
                    <optinmic-profile-chart 
                        :options="actinfo_fagerstroem_chart.options"
                        :scales="actinfo_fagerstroem_chart.scales" 
                        :ranges="actinfo_fagerstroem_chart.ranges"
                        :scores="data_merged">
                    </optinmic-profile-chart>
                </optinomic-content-block>
            </div>
            <div v-else lass="mt-12">
                <v-sheet class="mt-12 mb-3">
                    <v-skeleton-loader class="mx-auto" type="article, sentence, article, table-tbody"></v-skeleton-loader>
                </v-sheet>
            </div>

            <div v-if="pdf_ready">
                <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf">
                    <optinomic-pdfmake :header-left="patient_secure" footer-left="act-info"
                        header-right="Klinik Südhang" document-title="actInfo" :content="pdf_content" hide-logo>
                    </optinomic-pdfmake>
                </optinomic-content-block>
            </div>

        </div>
    `
});
// app-fallkonferenz
Vue.component('app-fallkonferenz', {
    props: {
        identifier: {
            type: String,
            default: helpers.getAppID()
        },
        production: {
            type: Boolean,
            default: true
        }
    },
    created() {},
    data: function () {
        return {
            "pdf_apps": {
                "production": [{
                        "name": "actinfo",
                        "title": "ActInfo",
                        "subtitle": "Information network on addiction care and therapy",
                        "identifier": "ch.suedhang.apps.actinfo_ein.production"
                    },
                    {
                        "name": "tmt",
                        "title": "TMT",
                        "subtitle": "Trail Making Test",
                        "identifier": "ch.suedhang.apps.tmt.production"
                    },
                    {
                        "name": "bdi",
                        "title": "BDI-II",
                        "subtitle": "Beck Depressions-Inventar",
                        "identifier": "ch.suedhang.apps.bdi.production"
                    },
                    {
                        "name": "asrs",
                        "title": "ASRS",
                        "subtitle": "ADHS-Screening",
                        "identifier": "ch.suedhang.apps.asrs.production"
                    },
                    {
                        "name": "aase",
                        "title": "AASE-G",
                        "subtitle": "Alcohol Abstinence Self-Effcacy | Skala Versuchung",
                        "identifier": "ch.suedhang.apps.aase-g.production"
                    },
                    {
                        "name": "bscl",
                        "title": "BSCL",
                        "subtitle": "Brief Symptom Checklist",
                        "identifier": "ch.suedhang.apps.bscl_anq.production"
                    },
                    {
                        "name": "isk",
                        "title": "ISK-K",
                        "subtitle": "Inventar Sozialer Kompetenzen - Kurzform",
                        "identifier": "ch.suedhang.apps.isk.production"
                    },
                    {
                        "name": "whoqol",
                        "title": "WHOQOL",
                        "subtitle": "WHO Quality of Life - Kurzform",
                        "identifier": "ch.suedhang.apps.whoqol.production"
                    },
                    {
                        "name": "sci",
                        "title": "SCI",
                        "subtitle": "Stress-Coping-Inventar",
                        "identifier": "ch.suedhang.apps.sci.production"
                    },
                    {
                        "name": "rs13",
                        "title": "RS-13",
                        "subtitle": "Resilienzfragebogen",
                        "identifier": "ch.suedhang.apps.rs13.production"
                    }
                ]
            },
            "pdf_contents": {}
        }
    },
    methods: {
        get_app_sr(name) {
            try {
                if (this.production) {
                    var return_obj = null;
                    this.pdf_apps.production.forEach(function (app) {
                        if (app.name === name) {
                            return_obj = this.$store.state.data_apps.data_object[app.identifier];
                        };
                    }.bind(this));
                    return return_obj;
                };
            } catch (err) {
                console.error('get_app_sr', err);
                return null;
            }
        },
        get_current_patient_module(name) {
            try {
                if (this.production) {

                    var return_obj = null;
                    this.pdf_apps.production.forEach(function (app) {
                        if (app.name === name) {
                            this.patient_modules.forEach(function (mod) {
                                if (mod.identifier === app.identifier) {
                                    return_obj = Object.assign({}, mod.module);
                                };
                            }.bind(this));
                        };
                    }.bind(this));
                    return return_obj;
                };
            } catch (err) {
                console.error('get_current_patient_module', err);
                return null;
            }
        },
        get_app_pdf_content(identifier) {
            try {
                return this.pdf_contents[identifier];
            } catch (err) {
                console.error('get_app_pdf_content', err);
                return [];
            }
        }
    },
    computed: {
        pdf_apps_array() {
            try {
                if (this.production) {
                    return this.pdf_apps.production;
                } else {
                    return null;
                };
            } catch (err) {
                console.error('pdf_apps_array', err);
                return null;
            }
        },
        pdf_apps_ready() {
            try {
                // Build App PDF's

                var return_ready = false;

                if (this.production && this.patient_modules) {
                    
                    this.pdf_apps.production.forEach(function (app) {

                        var sr_data = this.get_app_sr(app.name);
                        var app_data = this.get_current_patient_module(app.name);
                        
                        if (sr_data && app_data) {

                            if (app.name === 'aase') {
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.aase_pdf_content(sr_data));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };

                            if (app.name === 'actinfo_ein') {
                                var sr_data_aus = this.get_app_sr('actinfo_aus');
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.actinfo_pdf_content(sr_data, sr_data_aus));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };


                            if (app.name === 'bdi') {
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.bdi_pdf_content(sr_data));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };

                            if (app.name === 'bscl') {
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.bscl_pdf_content(sr_data));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };

                            if (app.name === 'isk') {
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.iskk_pdf_content(sr_data));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };
 
                            if (app.name === 'rs13') {
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.rs13_pdf_content(sr_data));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };

                            if (app.name === 'sci') {
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.sci_pdf_content(sr_data));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };

                            if (app.name === 'tmt') {
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.tmt_pdf_content(sr_data));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };

                            if (app.name === 'whoqol') {
                                // Build PDF
                                var pdf = [];
                                pdf.push(this.pdf_app_info(app_data, true));
                                pdf.push(this.whoqol_pdf_content(sr_data));
                                // Store
                                this.pdf_contents[app.name] = pdf.slice();
                            };

                            return_ready = true;
                        };

                    }.bind(this));
                    return return_ready;
                };


            } catch (err) {
                console.error('pdf_apps_ready', err);
                return false;
            }
        }
    },
    created() {
        if (this.production) {
            this.pdf_apps.production.forEach(function (params) {
                this.$store.dispatch('getSurveyResponses', params);
            }.bind(this));
        };
    },
    template: `
    <div>
        <optinomic-content-block bold title="Fallkonferenz" subtitle="Übersicht - Applikationen" id="app_overview">
            <v-tabs vertical show-arrows center-active color="#8b0042">
                <v-tab class="caption" v-for="app in pdf_apps_array" :key="app.name">
                    <span v-text="app.title"></span>
                </v-tab>
    
                <v-tab-item v-for="app in pdf_apps_array" :key="app.name">
                    <v-card flat>
                        <v-card-text>
    
                            <h2 class="display-1 font-weight-medium" v-text="app.title"
                                style="color:black;margin-top:-8px;"></h2>
                            <p class="overline" style="margin-left:1px;color:#8b0042" v-text="app.subtitle"></p>
    
                            <app-data :identifier="app.identifier" v-if="app.name === 'actinfo'">
                                <app-actinfo production></app-actinfo>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'tmt'">
                                <app-tmt :identifier="app.identifier"></app-tmt>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'bdi'">
                                <app-bdi :identifier="app.identifier"></app-bdi>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'asrs'">
                                <app-asrs :identifier="app.identifier"></app-asrs>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'aase'">
                                <app-aase :identifier="app.identifier"></app-aase>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'bscl'">
                                <app-bscl :identifier="app.identifier"></app-bscl>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'isk'">
                                <app-isk :identifier="app.identifier"></app-isk>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'whoqol'">
                                <app-whoqol :identifier="app.identifier"></app-whoqol>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'sci'">
                                <app-sci :identifier="app.identifier"></app-sci>
                            </app-data>
    
                            <app-data :identifier="app.identifier"  v-if="app.name === 'rs13'">
                                <app-rs13 :identifier="app.identifier"></app-rs13>
                            </app-data>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </optinomic-content-block>
    
        <optinomic-content-block bold title="Fragebogenauswertung" subtitle="Fallkonferenz (Gesamt)"
            id="pdf_gesamtauswertung">
            <pdf-auswertung-gesamt></pdf-auswertung-gesamt>
        </optinomic-content-block>
    </div>
    `
});
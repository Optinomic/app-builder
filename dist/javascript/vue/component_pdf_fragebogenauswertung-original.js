// Optinomic | <pdf-auswertung-gesamt>
Vue.component('pdf-auswertung-gesamt', {
    props: {
        production: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        "name": "Fallkonferenz",
        "title": "Fragebogenauswertung",
        "subtitle": "Eine Übersicht der wichtigsten Ergebnisse und Auswertungen.",
        "pdf_status": "Initialisiere",
        "pdf_create_count": 0,
        "pdf_building": false,
        "pdf_finished": false,
        "pdf_content": [],
        "pdf_apps": {
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
                    "title": "",
                    "subtitle": "",
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
                    "title": "WHOQOL-BREF",
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
        }
    }),
    methods: {
        doPDF() {
            try {
                // --------------------------
                // Build PDF
                // --------------------------
                this.pdf_building = true;

                var pdf = [];
                var base = this.data_apps_array;

                console.warn('doPDF :: Building PDF', base);
                this.pdf_status = "Wird erstellt...";


                // ------------------------------------------
                // Globals
                // ------------------------------------------

                var app_title = function (data) {
                    var titel = [];
                    titel.push(makepdf._horizontalLine(100, "#E0E0E0"));
                    titel.push(makepdf._heading(data.params.title, data.params.subtitle, 'h1'));
                    titel.push(makepdf._text(data.module.short_description));

                    return makepdf._keepTogether(titel, data.params.name + '_titel');
                }.bind(this);


                // ------------------------------------------
                // Titelseite
                // ------------------------------------------

                var titelseite = function () {
                    var block = [];

                    block.push(makepdf._suedhang_logo_anschrift());
                    block.push(makepdf._title(this.title, this.subtitle));
                    block.push({
                        "text": "Wir berichten über den Aufenthalt von " + this.patient_data.extras.anrede + " vom " + this.stay_from_to + ".",
                        "style": "p"
                    });
                    block.push(makepdf._spacer(96));
                    block.push(makepdf._horizontalLine(62, "#F5F5F5"));
                    block.push(makepdf._stamp(this.patient_data.extras.full_name, 18));
                    block.push(makepdf._horizontalLine(62, "#F5F5F5"));

                    var title_block = {
                        "id": "document_title",
                        "alignment": "left",
                        "margin": [0, 18, 0, 0],
                        "columns": [{}, {
                            "width": "480",
                            "stack": block
                        }]
                    };

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return title_block;
                }.bind(this);


                // ------------------------------------------
                // actInfo
                // ------------------------------------------
                var actinfo = function () {
                    var pdf = [];
                    const current_app_name = 'actinfo';
                    try {
                        var data_ein = this.getAppBaseData('actinfo_ein');
                        data_ein.module = this.get_current_patient_module('actinfo_ein');
                        var data_aus = this.getAppBaseData('actinfo_aus');

                        var block = [];

                        // Titel
                        block.push(app_title(data_ein));

                        // Content from Plugin
                        block.push(this.actinfo_pdf_content(data_ein, data_aus));


                        this.pdf_create_count = this.pdf_create_count + 1;
                        return block;

                    } catch (e) {
                        pdf.push(makepdf._keepTogether(makepdf._indication('!', 'Error'), current_app_name + '_error'));
                    };

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return pdf;
                }.bind(this);
                pdf.push(actinfo());



                // ------------------------------------------
                // tmt
                // ------------------------------------------
                var tmt = function () {
                    const current_app_name = 'tmt';
                    var data = this.getAppBaseData(current_app_name);
                    data.module = this.get_current_patient_module(current_app_name);
                    console.error(current_app_name, data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), current_app_name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);


                // ------------------------------------------
                // bdi
                // ------------------------------------------
                var bdi = function () {
                    const current_app_name = 'bdi';
                    var data = this.getAppBaseData(current_app_name);
                    data.module = this.get_current_patient_module(current_app_name);
                    // console.error(current_app_name, data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content from Plugin
                    block.push(this.bdi_pdf_content(data));


                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);


                // ------------------------------------------
                // aase
                // ------------------------------------------
                var aase = function () {
                    const current_app_name = 'aase';
                    var data = this.getAppBaseData(current_app_name);
                    data.module = this.get_current_patient_module(current_app_name);
                    console.error(current_app_name, data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), current_app_name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);


                // ------------------------------------------
                // bscl
                // ------------------------------------------
                var bscl = function () {
                    const current_app_name = 'bscl';
                    var data = this.getAppBaseData(current_app_name);
                    data.module = this.get_current_patient_module(current_app_name);
                    // console.error(current_app_name, data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content from Plugin
                    block.push(this.bscl_pdf_content(data));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);


                // ------------------------------------------
                // whoqol
                // ------------------------------------------
                var whoqol = function () {
                    const current_app_name = 'whoqol';
                    var data = this.getAppBaseData(current_app_name);
                    data.module = this.get_current_patient_module(current_app_name);
                    // console.error(current_app_name, data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content from Plugin
                    block.push(this.whoqol_pdf_content(data));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);


                // ------------------------------------------
                // isk
                // ------------------------------------------
                var isk = function () {
                    const current_app_name = 'isk';
                    var data = this.getAppBaseData(current_app_name);
                    data.module = this.get_current_patient_module(current_app_name);
                    console.error(current_app_name, data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), current_app_name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);


                // ------------------------------------------
                // sci
                // ------------------------------------------
                var sci = function () {
                    const current_app_name = 'sci';
                    var data = this.getAppBaseData(current_app_name);
                    data.module = this.get_current_patient_module(current_app_name);
                    console.error(current_app_name, data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), current_app_name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);


                // ------------------------------------------
                // rs13
                // ------------------------------------------
                var rs13 = function () {
                    const current_app_name = 'rs13';
                    var data = this.getAppBaseData(current_app_name);
                    data.module = this.get_current_patient_module(current_app_name);

                    // Build PDF
                    var pdf = [];
                    pdf.push(app_title(data));

                    // Content from Plugin
                    pdf.push(this.rs13_pdf_content(data));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return pdf;
                }.bind(this);


                // ------------------------------------------
                // PDF /  Pages & Order
                // ------------------------------------------
                pdf.push(titelseite());
                pdf.push(makepdf._pageBreak());
                pdf.push(bdi());
                pdf.push(aase());
                pdf.push(bscl());
                pdf.push(whoqol());
                pdf.push(isk());
                pdf.push(sci());
                pdf.push(rs13());
                pdf.push(tmt());



                // Job Done
                this.pdf_status = "Erstellt!";
                this.pdf_content = pdf;
                this.pdf_finished = true;

            } catch (err) {
                this.pdf_status = "Fehler beim Erstellen.";
                console.error('doPDF', err);
            }
        },
        getAppBaseData(app_name) {
            try {
                var return_obj = null;
                this.data_apps_array.forEach(function (app) {
                    if (app.name === app_name) {
                        return_obj = this.get_app_data(app.identifier);
                    };
                }.bind(this));
                return return_obj;
            } catch (err) {
                console.error('getAppBaseData', err);
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
        }
    },
    computed: {
        data_apps_array() {
            try {
                if (this.production) {
                    return this.pdf_apps.production.slice();
                } else {
                    return [];
                };
            } catch (e) {
                console.error('data_apps_array', e);
                return null;
            };
        },
        readyforPDF() {
            try {
                var ret_val = true;

                this.data_apps_array.forEach(function (app) {
                    var data = this.get_app_data(app.identifier);

                    if (data !== undefined) {
                        if (data.loaded !== true) {
                            ret_val = false;
                        };
                    } else {
                        ret_val = false;
                    };
                }.bind(this));

                if (this.stay_current_data.found === false) {
                    ret_val = false;
                };
                return ret_val;
            } catch (e) {
                console.error('readyforPDF', e);
                return false;
            };
        },
        stay_current_data() {
            // return data
            try {
                return this.$store.state.stays.current.data;
            } catch (e) {
                return null;
            };
        },
        stay_from_to() {
            // return data
            try {
                return this.stay_current_data.extras.from_to;
            } catch (e) {
                return "";
            };
        }
    },
    watch: {
        readyforPDF: function (ready) {
            if (ready) {
                this.doPDF();
            };
        },
    },
    created() {
        // Load Data
        try {
            if (this.production) {

                this.pdf_status = "Daten werden geladen...";

                this.pdf_apps.production.forEach(function (app, appID) {
                    this.$store.dispatch('getSurveyResponses', app);
                }.bind(this));
            };
        } catch (err) {
            console.error('created', err);
        }
    },
    template: `
    <div>
        <div v-if="!pdf_finished" class="pt-2">

            <div v-if="pdf_building" class="d-flex flex-row justify-space-between align-center mr-4">
                <div class="mb-3 mr-2">
                    <v-icon color="#8b0042">mdi-file-pdf</v-icon>
                </div>
                <p class="mr-auto mt-2" v-text="pdf_status"></p>

                <div v-for="index in this.pdf_create_count" :key="index" style="margin-top:-12px;">
                    <v-badge class="ml-4" color="green" dot> </v-badge>
                </div>
                <div v-for="index in data_apps_array.length - this.pdf_create_count" :key="index" style="margin-top:-12px;">
                    <v-badge class="ml-4" color="blue" dot> </v-badge>
                </div>
            </div>
            <div v-else class="d-flex flex-row justify-space-between align-center mr-4">
                <div class="mb-3 mr-2">
                    <v-icon color="#8b0042">mdi-file-pdf</v-icon>
                </div>
                <p class="mr-auto mt-2" v-text="pdf_status"></p>

                <div v-for="app in data_apps_array" style="margin-top:-12px;">
                    <v-badge class="ml-4" v-if="(app.init === true) && (app.loaded !== true)  && (app.pdf_created !== true)" color="grey"
                        dot> </v-badge>
                    <v-badge class="ml-4" v-if="(app.init === true) && (app.loaded === true)  && (app.pdf_created !== true)" color="blue"
                        dot></v-badge>
                </div>
            </div>

        </div>
        <div v-else>
            <optinomic-pdfmake :header-left="patient_data.extras.secure" :footer-left="title" header-right="Klinik Südhang"
                :document-title="title" :content="pdf_content" hide-logo></optinomic-pdfmake>
        </div>
    </div>
    `
});
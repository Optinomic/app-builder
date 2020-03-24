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
        "needed_apps_data": {
            "production": [{
                    "name": "actinfo_ein",
                    "title": "act-info",
                    "subtitle": "Information network on addiction care and therapy",
                    "app_id": "ch.suedhang.apps.actinfo_ein.production"
                },
                {
                    "name": "actinfo_aus",
                    "title": "act-info",
                    "subtitle": "Information network on addiction care and therapy",
                    "app_id": "ch.suedhang.apps.actinfo_aus.production"
                },
                {
                    "name": "tmt",
                    "title": "TMT",
                    "subtitle": "Trail Making Test",
                    "app_id": "ch.suedhang.apps.tmt.production"
                },
                {
                    "name": "bdi",
                    "title": "BDI-II",
                    "subtitle": "Beck Depressions-Inventar",
                    "app_id": "ch.suedhang.apps.bdi.production"
                },
                {
                    "name": "asrs",
                    "title": "",
                    "subtitle": "",
                    "app_id": "ch.suedhang.apps.asrs.production"
                },
                {
                    "name": "aase",
                    "title": "AASE-G",
                    "subtitle": "Alcohol Abstinence Self-Effcacy | Skala Versuchung",
                    "app_id": "ch.suedhang.apps.aase-g.production"
                },
                {
                    "name": "bscl",
                    "title": "BSCL",
                    "subtitle": "Brief Symptom Checklist",
                    "app_id": "ch.suedhang.apps.bscl_anq.production"
                },
                {
                    "name": "isk",
                    "title": "ISK-K",
                    "subtitle": "Inventar Sozialer Kompetenzen - Kurzform",
                    "app_id": "ch.suedhang.apps.isk.production"
                },
                {
                    "name": "whoqol",
                    "title": "WHOQOL-BREF",
                    "subtitle": "WHO Quality of Life - Kurzform",
                    "app_id": "ch.suedhang.apps.whoqol.production"
                },
                {
                    "name": "sci",
                    "title": "SCI",
                    "subtitle": "Stress-Coping-Inventar",
                    "app_id": "ch.suedhang.apps.sci.production"
                },
                {
                    "name": "rs13",
                    "title": "RS-13",
                    "subtitle": "Resilienzfragebogen",
                    "app_id": "ch.suedhang.apps.rs13.production"
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
                var base = this.$store.state.data_apps.base.slice();

                console.warn('doPDF :: Building PDF', base);
                this.pdf_status = "Wird erstellt...";


                // ------------------------------------------
                // Globals
                // ------------------------------------------

                var app_title = function (data) {
                    var titel = [];
                    titel.push(makepdf._horizontalLine(100, "#E0E0E0"));
                    titel.push(makepdf._heading(data.title, data.subtitle, 'h1'));
                    titel.push(makepdf._text(data.module.short_description));

                    return makepdf._keepTogether(titel, data.name + '_titel');
                }.bind(this);


                // ------------------------------------------
                // Titelseite
                // ------------------------------------------

                var titelseite = function () {
                    var block = [];

                    block.push(makepdf._suedhang_logo_anschrift());
                    block.push(makepdf._title(this.title, this.subtitle));
                    block.push({
                        "text": "Wir berichten über den Aufenthalt von " + this.patient_anrede + " vom VON/BIS " + ".",
                        "style": "p"
                    });
                    block.push(makepdf._spacer(96));
                    block.push(makepdf._horizontalLine(62, "#F5F5F5"));
                    block.push(makepdf._stamp(this.patient_anrede, 18));
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

                pdf.push(titelseite());
                pdf.push(makepdf._pageBreak());

                // ------------------------------------------
                // actInfo
                // ------------------------------------------

                var actinfo = function () {
                    var data = this.getAppBaseData('actinfo_ein');
                    console.error('actinfo', data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), data.name + '_todo'));


                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);
                pdf.push(actinfo());


                // ------------------------------------------
                // tmt
                // ------------------------------------------

                var tmt = function () {
                    var data = this.getAppBaseData('tmt');
                    console.error('tmt', data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), data.name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);
                pdf.push(tmt());


                // ------------------------------------------
                // bdi
                // ------------------------------------------

                var bdi = function () {
                    var data = this.getAppBaseData('bdi');
                    console.error('bdi', data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), data.name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);
                pdf.push(bdi());


                // ------------------------------------------
                // aase
                // ------------------------------------------

                var aase = function () {
                    var data = this.getAppBaseData('aase');
                    console.error('aase', data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), data.name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);
                pdf.push(aase());


                // ------------------------------------------
                // whoqol
                // ------------------------------------------

                var whoqol = function () {
                    var data = this.getAppBaseData('whoqol');
                    console.error('whoqol', data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), data.name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);
                pdf.push(whoqol());


                // ------------------------------------------
                // isk
                // ------------------------------------------

                var isk = function () {
                    var data = this.getAppBaseData('isk');
                    console.error('isk', data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), data.name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);

                pdf.push(isk());


                // ------------------------------------------
                // sci
                // ------------------------------------------

                var sci = function () {
                    var data = this.getAppBaseData('sci');
                    console.error('sci', data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), data.name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);
                pdf.push(sci());


                // ------------------------------------------
                // rs13
                // ------------------------------------------

                var rs13 = function () {
                    var data = this.getAppBaseData('rs13');
                    console.error('rs13', data);

                    var block = [];

                    // Titel
                    block.push(app_title(data));

                    // Content
                    block.push(makepdf._keepTogether(makepdf._indication('!', 'ToDo'), data.name + '_todo'));

                    this.pdf_create_count = this.pdf_create_count + 1;
                    return block;
                }.bind(this);
                pdf.push(rs13());


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
                var da = this.$store.state.data_apps.base.slice();
                var return_obj = {};
                da.forEach(function (app) {
                    if (app.name === app_name) {
                        return_obj = Object.assign({}, app);

                        this.patient_modules.forEach(function (pm) {
                            if (pm.identifier === return_obj.app_id) {
                                return_obj.module = Object.assign({}, pm.module);
                            };
                        }.bind(this));

                    };
                }.bind(this));
                return return_obj;
            } catch (err) {
                console.error('buildAppTitle', err);
                return null;
            }
        }
    },
    computed: {
        patient_modules() {
            try {
                return this.$store.state.apps.data.patient_modules
            } catch (err) {
                return [];
            }
        },
        data_apps_array() {
            try {
                var da = this.$store.state.data_apps.base.slice();
                da.forEach(function (app, appID) {
                    if (!("pdf_created" in app)) {
                        app.pdf_created = false;
                    };
                }.bind(this));
                // console.error('computed', da);
                return da;
            } catch (e) {
                return [];
            };
        },
        readyforPDF() {
            try {
                var ret_val = true;
                var da = this.$store.state.data_apps.base.slice();
                da.forEach(function (app, appID) {
                    if (app.loaded !== true) {
                        ret_val = false;
                    };
                }.bind(this));
                // console.error('computed data_apps_array_loaded', da);
                return ret_val;
            } catch (e) {
                return false;
            };
        },
        patient_secure() {
            // return data
            try {
                return this.$store.state.patient.data.extras.secure;
            } catch (e) {
                return "";
            };
        },
        patient_anrede() {
            // return data
            try {
                return this.$store.state.patient.data.extras.anrede;
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

                var init = {
                    "base": this.needed_apps_data.production.slice(),
                    "count": 0,
                    "data_init_array": [],
                    "data_loaded_array": []
                };

                this.$store.commit({
                    type: 'saveData',
                    root: 'data_apps',
                    data: init
                });

                this.pdf_status = "Daten werden geladen...";

                this.needed_apps_data.production.forEach(function (app, appID) {
                    var params = {
                        "identifier": app.app_id,
                        "root": app.app_id
                    };
                    this.$store.dispatch('getSurveyResponses', params);
                }.bind(this));
            };
        } catch (err) {
            console.error('created', err);
        }
    },
    template: `
    <div>

        <div v-if="!pdf_finished">

            <div v-if="pdf_building" class="d-flex flex-row justify-space-between align-center mr-4">
                <p v-text="pdf_status"></p>

                <div v-for="index in this.pdf_create_count" :key="index" style="margin-top:-12px;">
                    <v-badge color="green" dot> </v-badge>
                </div>
                <div v-for="index in data_apps_array.length - this.pdf_create_count" :key="index" style="margin-top:-12px;">
                    <v-badge color="blue" dot> </v-badge>
                </div>

            </div>
            <div v-else class="d-flex flex-row justify-space-between align-center mr-4">
                <p v-text="pdf_status"></p>

                <div v-for="app in data_apps_array" style="margin-top:-12px;">
                    <v-badge v-if="(app.init === true) && (app.loaded !== true)  && (app.pdf_created !== true)" color="grey"
                        dot> </v-badge>
                    <v-badge v-if="(app.init === true) && (app.loaded === true)  && (app.pdf_created !== true)" color="blue"
                        dot></v-badge>
                </div>
            </div>

        </div>
        <div v-else>
            <optinomic-pdfmake :header-left="patient_secure" :footer-left="title" header-right="Klinik Südhang"
                :document-title="title" :content="pdf_content" hide-logo></optinomic-pdfmake>
        </div>
    </div>
    `
});
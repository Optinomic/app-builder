// app-pdf-druckvorlagen
Vue.component('app-pdf-druckvorlagen', {
    props: {
        identifier: {
            type: String,
            default: helpers.getAppID()
        }
    },
    created() {},
    data: function () {
        return {
            "pdf_einladung_pa": {
                "name": "Patienten-Assessment",
                "title": "Einladung",
                "version": "1.1",
                "description": "Drucken der Zugangsdaten sowie einer Kurzeinführung für das Optinomic Patienten-Assessment.",
                "source": {
                    "text_1": "Sie finden auf unserer Fragebogen-Plattform einige Fragebögen, in denen Sie Aussagen zu verschiedenen Themen und Zeiträumen einschätzen sollen. Am Anfang jedes Fragebogens finden Sie eine kurze Anleitung. Lesen Sie diese bitte sorgfältig durch.Achten Sie dabei auf die hervorgehobenen Angaben zu den Zeiträumen, auf die sich die Fragen und Aussagen beziehen. Diese können von Fragebogen zu Fragebogen unterschiedlich sein.",
                    "text_2": "Alle Fragebögen enthalten Aussagen. Ihre Aufgabe ist zu bewerten, inwieweit diese Aussagen auf Sie bzw. Ihre Situation zutreffen. Antworten Sie möglichst spontan – es gibt keine richtigen oder falschen Antworten. Wichtig ist, dass die jeweilige Antwort für Sie persönlich stimmt.",
                    "text_3": "Wir bitten Sie, die aufgeführten Fragebögen in der bestehenden Reihenfolge lückenlos zu bearbeiten. Zum starten JEDES EINZELNEN Fragebogens klicken Sie am rechten Rand des angegebenen Fragebogens auf «START». Wenn Sie einen Fragebogen fertig bearbeitet und abgeschickt haben, schliessen sie den entsprechenden Tab und gelangen somit wieder auf die Startseite.",
                    "text_4": "Falls Sie Fragen nicht verstehen oder etwas unklar ist, wenden Sie sich an die anwesende Betreuungsperson."
                },
                "loading_string": "",
                "content": null
            },
            "pdf_notizblatt": {
                "name": "Notizblatt",
                "title": "Gesprächsnotiz",
                "version": "1.0",
                "description": "Drucken eines leeren Verlaufsblattes.",
                "loading_string": "",
                "content": null
            }
        }
    },
    methods: {},
    computed: {
        login_pid() {
            try {
                return this.patient_data.cis_pid
            } catch (err) {
                console.error('login_pid', err);
                return "Error";
            }
        },
        login_pw() {
            try {
                var pw = "Fehler";
                pw = this.patient_data.birthdate;
                pw = pw.substring(0, 10);
                pw = pw.replace("-", "");
                pw = pw.replace("-", "");
                return pw
            } catch (err) {
                console.error('login_pw', err);
                return "Error";
            }
        },
        pdf_ready() {
            try {
                if (this.patient_data) {
                    // Build internal PDF's

                    var credentials = {
                        table: {
                            widths: [60, "*"],
                            body: [
                                [{
                                    text: "Login",
                                    color: "grey",
                                    margin: [0, 6, 0, 6]
                                }, {
                                    text: this.login_pid,
                                    fontSize: 16,
                                    margin: [0, 6, 0, 6]
                                }],
                                [{
                                    text: "Passwort",
                                    color: "grey",
                                    margin: [0, 6, 0, 6]
                                }, {
                                    text: this.login_pw,
                                    fontSize: 16,
                                    margin: [0, 6, 0, 6]
                                }]
                            ]
                        },
                        layout: "noBorders"
                    };

                    // ------------------------------------------
                    // Einladung Assessment
                    // ------------------------------------------
                    var _pdf_content = [];

                    _pdf_content.push(makepdf._suedhang_logo_anschrift());
                    _pdf_content.push(makepdf._title(this.pdf_einladung_pa.name, this.patient_data.extras.full_name));

                    _pdf_content.push(makepdf._text(this.pdf_einladung_pa.source.text_1));
                    _pdf_content.push(makepdf._text(this.pdf_einladung_pa.source.text_2));
                    _pdf_content.push(makepdf._text(this.pdf_einladung_pa.source.text_3));
                    _pdf_content.push(makepdf._text(this.pdf_einladung_pa.source.text_4));

                    _pdf_content.push(makepdf._horizontalLine(62, "#F5F5F5"));
                    _pdf_content.push(makepdf._heading("Persönliche Zugangsdaten", null, "h1"));
                    _pdf_content.push(credentials);
                    _pdf_content.push(makepdf._horizontalLine(62, "#F5F5F5"));

                    this.pdf_einladung_pa.content = _pdf_content.slice();



                    // ----------------------------------
                    // Notizen
                    // ----------------------------------
                    _pdf_content = [];
                    // _pdf_content.push(this._text(this._formatDateCH(iso_date)));

                    var vertical_line = {
                        "margin": [0, 0, 0, 0],
                        "canvas": [{
                            "type": "line",
                            "x1": 85,
                            "y1": 0,
                            "x2": 85,
                            "y2": 720,
                            "lineWidth": 0.5,
                            "lineColor": "#BDBDBD"
                        }]
                    };
                    _pdf_content.push(vertical_line);
                    this.pdf_notizblatt.content = _pdf_content.slice();

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

            <optinomic-content-block v-if="pdf_ready" title="Druckvorlagen" subtitle="PDF" id="pdf_druckvorlagen">
                <optinomic-pdfmake :header-left="patient_data.extras.full_name"
                    :footer-left="pdf_einladung_pa.title + ' :: ' + pdf_einladung_pa.name" header-right="Klinik Südhang"
                    :document-title="pdf_einladung_pa.title + ' - ' + pdf_einladung_pa.name" :content="pdf_einladung_pa.content"
                    hide-logo>
                </optinomic-pdfmake>
                <optinomic-pdfmake :header-left="patient_data.extras.full_name"
                    :footer-left="pdf_notizblatt.title + ' :: ' + pdf_notizblatt.name" header-right="Klinik Südhang"
                    :document-title="pdf_notizblatt.title" :content="pdf_notizblatt.content"
                    hide-logo>
                </optinomic-pdfmake>
            </optinomic-content-block>

        </div>
    `
});
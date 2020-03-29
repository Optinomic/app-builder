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

        pdf_ready() {
            try {
                if (this.patient_data) {
                    // Build internal PDF's
                    
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

            <optinomic-content-block title="Druckvorlagen" subtitle="PDF" id="pdf_druckvorlagen">
                <p v-text="pdf_ready"></p>
                <p>Druckvorlagen</p>
            </optinomic-content-block>
            
        </div>
    `
});
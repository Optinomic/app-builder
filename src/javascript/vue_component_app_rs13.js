// RS13-Application
Vue.component('app-rs13', {
    props: {},
    created() {},
    data: function () {
        return {
            pdf_content: []
        }
    },
    computed: {
        sr_data() {
            // return data
            try {
                return this.$store.state.sr.data;
            } catch (e) {
                return [];
            };
        },
        pdf_ready() {
            // return data
            try {
                if (this.$store.state.sr.data.length) {

                    var pdf = [];

                    pdf.push(makepdf._suedhang_logo_anschrift());

                    var title = makepdf._title("Psychische Wiederstandskraft", "Resilienzfragebogen (RS-13)");
                    pdf.push(title);

                    pdf.push(makepdf._heading("Interpretation", null, "h2"));

                    if (this.$store.state.sr.data.length > 0) {

                        this.$store.state.sr.data.forEach(function (d) {
                            if (d.calculation_found) {
                                var interpret = makepdf._text(d.calculation.resilienz_score.interpretation);
                                pdf.push(makepdf._keepTogether(interpret));
                            };
                        });

                    } else {
                        pdf.push(makepdf._noData("Resilienz", 6));
                    };


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
            <div style="margin-bottom:24px;">
                <h3 class="font-weight-light">Erfassungen (<span v-html="sr_data.length"></span>)</h3>
                <v-divider></v-divider>
            </div>
            <div style="margin-bottom:24px;">
            
                <v-card class="mx-auto" outlined v-for="sr in sr_data" :key="sr.event_id">
                    <v-card-text v-if="sr.calculation_found">
                        <div>
                            <span>∑</span> Resilienz-Summenscore: <span
                                v-html="sr.calculation.resilienz_score.rs13_score"></span>
                        </div>
                        <p class="display-1 text--primary" v-html="formatDateCH(sr.date)">
                        </p>
                        <p>Interpretation</p>
                        <div class="text--primary" v-html="sr.calculation.resilienz_score.interpretation"></div>
                    </v-card-text>
                    <v-card-text v-else>
                        <div>Resilienz</div>
                        <p class="display-1 text--primary" v-html="formatDateCH(sr.date)">
                        </p>
                        <p>Hinweis</p>
                        <div class="text--primary">
                            Calculation noch nicht berechnet.
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div style="margin-bottom:24px;" v-if="pdf_ready">
                <h3 class="font-weight-light">Druckvorlage (PDF)</h3>
                <v-divider></v-divider>
                <optinomic-pdfmake header-left="Herr Muster" footer-left="Resilienz" header-right="Klinik Südhang" document-title="Resilienz" :content="pdf_content" hide-logo></optinomic-pdfmake>
            </div>
        </div>
    `
});

// Optinomic App-Optinomic
Vue.component('app-optinomic', {
    props: {
        title: {
            type: String,
            default: "Optinomic"
        },
        subtitle: {
            type: String,
            default: "App"
        }
    },
    created(){
        this.$store.dispatch('getSurveyResponses');
        this.$store.dispatch('getUser');
        if (helpers.getPatientID() !== 0) {
            this.$store.dispatch('getPatient');
        };
        this.$store.dispatch('getClinic');
    },
    computed: {
        sr () {
            // get survey_response
            try {
                return this.$store.state.sr;
            } catch (e) {
                return {};
            };
        },
        loaded () {
            // get survey_response
            try {
                if ((this.$store.state.sr.have_data === true) || (this.$store.state.sr.have_data === false)) {
                    return true;    
                }
            } catch (e) {
                return false;
            };
        },
        missing_data () {
            // get survey_response
            if (this.$store.state.sr === null) {
                return false;
            } else {
                var sr = this.$store.state.sr.data;
                var data_errors = false;
                sr.forEach(function(item){
                    if (item.all_found === false) {
                        data_errors = true;    
                    };
                });
                return data_errors;
            };
        }
    },
    template: `
        <v-app>
            <v-content>
                <v-container>
                    <app-title :subtitle="subtitle" :title="title"></app-title>

                    <div v-if="loaded">
                        <div v-if="sr.have_data">
                            <div v-if="missing_data" class="mb-2">
                                <h2 class="font-weight-light">Hinweis</h2>
                                <v-divider></v-divider>
                            </div>
                            <div v-for="r in sr.data">
                                <div v-if="r.all_found === false">
                                    <v-alert dense outlined text type="error">
                                        <p style="margin:0;padding:0">Bei der Messung vom <span
                                                v-html="formatDateCH(r.date)"></span> sind nicht alle Daten vorhanden:</p>
                                        <p style="margin:0;padding:0" v-if="r.calculation_found === false">
                                            - Calculation nicht gefunden / noch nicht berechnet!
                                        </p>
                                        <p style="margin:0;padding:0" v-if="r.event_found === false">
                                            - Event <span v-html="r.event_id"></span> nicht gefunden.
                                        </p>
                                        <p style="margin:0;padding:0" v-if="r.patient_found === false">
                                            - Patient <span v-html="r.patient_id"></span> nicht gefunden.
                                        </p>
                                        <p style="margin:0;padding:0" v-if="r.stay_found === false">
                                            - Fall <span v-html="r.stay_id"></span> nicht gefunden.
                                        </p>
                                    </v-alert>
                                </div>
                            </div>
                            <slot></slot>
                        </div>
                        <div v-else>
                            <v-alert prominent text type="error">
                                Keine Daten vorhanden.
                            </v-alert>
                        </div>
                    </div>
                    <div v-else>
                        <v-sheet class="px-3 pt-3 pb-3">
                            <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                        </v-sheet>
                    </div>
                </v-container>
            </v-content>
        </v-app>
    `
});
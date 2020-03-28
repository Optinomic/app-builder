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
    created() {
        this.$store.dispatch('getSurveyResponses');
        if (helpers.getPatientID() !== 0) {
            this.$store.dispatch('getPatient');
            this.$store.dispatch('getPatientStays');
        };
        this.$store.dispatch('getUser');
        this.$store.dispatch('getClinic');
    },
    computed: {
        sr() {
            try {
                return this.$store.state.sr;
            } catch (e) {
                return {};
            };
        },
        isAdmin() {
            try {
                return this.$store.state.user.data.isAdmin;
            } catch (e) {
                return {};
            };
        },
        loaded() {
            try {
                if (this.$store.state.sr.loaded === true) {
                    return true;
                } else {
                    return false;   
                };
            } catch (e) {
                return false;
            };
        },
        user_text() {
            try {
                return this.$store.state.user.data.first_name + " " + this.$store.state.user.data.last_name + " (" + this.$store.state.user.data.initials + ")";
            } catch (e) {
                return '';
            };
        },
        clinic_data() {
            try {
                return this.$store.state.clinic.data;
            } catch (e) {
                return false;
            };
        },
        could_have_data() {
            try {
                var ret_bool = false;

                if (this.$store.state.current_app.module.surveys.length > 0) {
                    ret_bool = true;
                }
                return ret_bool;
            } catch (e) {
                return false;
            };
        },
        missing_data() {
            try {
                if (this.$store.state.sr === null) {
                    return false;
                } else {
                    var sr = this.$store.state.sr.data;
                    var data_errors = false;
                    sr.forEach(function (item) {
                        if (item.all_found === false) {
                            data_errors = true;
                        };
                    }.bind(this));
                    return data_errors;
                };
            } catch (e) {
                return false;
            };
        }
    },
    methods: {
        logState: function (pretty) {
            try {
                var log = Object.assign({}, this.$store.state);
                var dateObj = new Date();
                const options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                };
                var title = "STATE :: " + dateObj.toLocaleDateString('de-DE', options);

                if (pretty === true) {
                    var str = JSON.stringify(log, null, 2);
                    console.log(title, str);
                } else {
                    console.log(title, log);
                };

            } catch (e) {
                console.log('logState', e);
            }
        }
    },
    template: `
        <template>
            <v-app id="top" style="background-color:#f8f8f8!important;">
                <v-content class="mb-12">
                    <v-container class="mt-10 mb-12 pt-8 pb-12 pl-10 pr-8 elevation-1"
                        style="background-color:white!important;">

                        <v-row>
                            <v-col cols="12" sm="6">
                                <img v-if="clinic_data" :src="clinic_data.clinic_logo" :alt="clinic_data.clinic_slogan"
                                    height="46">
                                <v-skeleton-loader v-if="!clinic_data" height="46px" max-width="240px" type="image">
                                </v-skeleton-loader>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <optinomic-toc></optinomic-toc>
                            </v-col>
                        </v-row>

                        <app-title :title="title" :subtitle="subtitle" class="mt-4"></app-title>

                        <div v-if="loaded">
                            <div v-if="could_have_data">
                                <div v-if="sr.have_data">
                                    <optinomic-content-block title="Missings" subtitle="Datenhinweis" id="data_note"
                                        v-if="missing_data">
                                        <div v-for="r in sr.data">
                                            <div v-if="r.all_found === false">
                                                <v-alert dense outlined text type="error">
                                                    <p style="margin:0;padding:0">Bei der Messung vom <span
                                                            v-html="formatDateCH(r.date)"></span> sind nicht alle Daten
                                                        vorhanden:
                                                    </p>
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
                                    </optinomic-content-block>
                                    <slot></slot>
                                </div>
                                <div v-else>
                                    <optinomic-content-block subtitle="Hinweis" title="Keine Messdaten" id="in_no_data"
                                        show_in_toc="false">
                                        <v-alert prominent text type="error">
                                            Es sind keine Messdaten vorhanden.
                                        </v-alert>
                                    </optinomic-content-block>
                                </div>
                            </div>
                            <div v-else>
                                <slot></slot>
                            </div>
                        </div>
                        <div v-else lass="mx-3 mt-3">
                            <v-sheet class="px-3 pt-3 pb-3">
                                <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                            </v-sheet>
                        </div>
                        <!-- ADMIN - Tools -->
                        <div v-if="isAdmin">
                            <optinomic-content-block title="Administrator" subtitle="Only for" id="admin_tools"
                                show_in_toc="false">
                                <v-simple-table dense>
                                    <tbody>
                                        <tr>
                                            <td>State (Check Console)</td>
                                            <td>
                                                <v-btn text small @click="logState(true)">
                                                    beautify
                                                </v-btn>
                                                <v-btn text small color="#8b0042" @click="logState(false)">
                                                    log
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </optinomic-content-block>
                        </div>
                        <!-- FOOTER -->
                        <div class="mt-12 pt-12 ml-4 mr-6">
                            <v-row style="border-top: 1px solid #8b0042;">
                                <v-col cols="12" sm="6" class="px-0">
                                    <p class="subtitle-1 font-italic font-weight-thin text-left" style="color:#8b0042"
                                        v-text="clinic_data.clinic_slogan" v-if="clinic_data"></p>
                                </v-col>
                                <v-col cols="12" sm="6" class="px-0">
                                    <v-btn class="ml-1" style="float:right;" icon x-small color="#8b0042"
                                        @click="$vuetify.goTo('#top')">
                                        <v-icon dark>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <p class="caption font-weight-light text-right" v-text="user_text"></p>
                                </v-col>
                            </v-row>
                        </div>
                    </v-container>
                </v-content>
            </v-app>
        </template> 
    `
});
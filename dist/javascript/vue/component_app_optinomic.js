Vue.component("app-optinomic",{props:{title:{type:String,default:"Optinomic"},subtitle:{type:String,default:"App"}},created(){this.$store.dispatch("getSurveyResponses"),this.$store.dispatch("getUser"),0!==helpers.getPatientID()&&(this.$store.dispatch("getPatient"),this.$store.dispatch("getPatientStays")),this.$store.dispatch("getClinic")},computed:{sr(){try{return this.$store.state.sr}catch(e){return{}}},loaded(){try{if(!0===this.$store.state.sr.have_data||!1===this.$store.state.sr.have_data)return!0}catch(e){return!1}},user_text(){try{return this.$store.state.user.data.first_name+" "+this.$store.state.user.data.last_name+" ("+this.$store.state.user.data.initials+")"}catch(e){return""}},clinic_data(){try{return this.$store.state.clinic.data}catch(e){return!1}},could_have_data(){try{var ret_bool=!1;return this.$store.state.current_app.module.surveys.length>0&&(ret_bool=!0),ret_bool}catch(e){return!1}},missing_data(){if(null===this.$store.state.sr)return!1;var data_errors=!1;return this.$store.state.sr.data.forEach(function(item){!1===item.all_found&&(data_errors=!0)}),data_errors}},template:'\n        <template>\n            <v-app id="top" style="background-color:#f8f8f8!important;">\n                <v-content class="mb-12">\n                    <v-container class="mt-10 mb-12 pt-8 pb-12 pl-10 pr-8 elevation-1"\n                        style="background-color:white!important;">\n\n                        <v-row>\n                            <v-col cols="12" sm="6">\n                                <img v-if="clinic_data" :src="clinic_data.clinic_logo" :alt="clinic_data.clinic_slogan"\n                                    height="46">\n                                <v-skeleton-loader v-if="!clinic_data" height="46px" max-width="240px" type="image">\n                                </v-skeleton-loader>\n                            </v-col>\n                            <v-col cols="12" sm="6">\n                                <optinomic-toc></optinomic-toc>\n                            </v-col>\n                        </v-row>\n\n                        <app-title :title="title" :subtitle="subtitle" class="mt-4"></app-title>\n\n                        <div v-if="loaded">\n                            <div v-if="could_have_data">\n                                <div v-if="sr.have_data">\n                                    <optinomic-content-block title="Missings" subtitle="Datenhinweis" id="data_note"\n                                        v-if="missing_data">\n                                        <div v-for="r in sr.data">\n                                            <div v-if="r.all_found === false">\n                                                <v-alert dense outlined text type="error">\n                                                    <p style="margin:0;padding:0">Bei der Messung vom <span\n                                                            v-html="formatDateCH(r.date)"></span> sind nicht alle Daten\n                                                        vorhanden:\n                                                    </p>\n                                                    <p style="margin:0;padding:0" v-if="r.calculation_found === false">\n                                                        - Calculation nicht gefunden / noch nicht berechnet!\n                                                    </p>\n                                                    <p style="margin:0;padding:0" v-if="r.event_found === false">\n                                                        - Event <span v-html="r.event_id"></span> nicht gefunden.\n                                                    </p>\n                                                    <p style="margin:0;padding:0" v-if="r.patient_found === false">\n                                                        - Patient <span v-html="r.patient_id"></span> nicht gefunden.\n                                                    </p>\n                                                    <p style="margin:0;padding:0" v-if="r.stay_found === false">\n                                                        - Fall <span v-html="r.stay_id"></span> nicht gefunden.\n                                                    </p>\n                                                </v-alert>\n                                            </div>\n                                        </div>\n                                    </optinomic-content-block>\n                                    <slot></slot>\n                                </div>\n                                <div v-else>\n                                    <optinomic-content-block subtitle="Hinweis" title="Keine Messdaten" id="in_no_data"\n                                        show_in_toc="false">\n                                        <v-alert prominent text type="error">\n                                            Es sind keine Messdaten vorhanden.\n                                        </v-alert>\n                                    </optinomic-content-block>\n                                </div>\n                            </div>\n                            <div v-else>\n                                <slot></slot>    \n                            </div>\n                        </div>\n                        <div v-else lass="mx-3 mt-3">\n                            <v-sheet class="px-3 pt-3 pb-3">\n                                <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>\n                            </v-sheet>\n                        </div>\n                        \x3c!-- FOOTER --\x3e\n                        <div class="mt-12 pt-12 ml-4 mr-6">\n                            <v-row style="border-top: 1px solid #8b0042;">\n                                <v-col cols="12" sm="6" class="px-0">\n                                    <p class="subtitle-1 font-italic font-weight-thin text-left" style="color:#8b0042"\n                                        v-text="clinic_data.clinic_slogan" v-if="clinic_data"></p>\n                                </v-col>\n                                <v-col cols="12" sm="6" class="px-0">\n                                    <v-btn class="ml-1" style="float:right;" icon x-small color="#8b0042"\n                                        @click="$vuetify.goTo(\'#top\')">\n                                        <v-icon dark>mdi-arrow-up</v-icon>\n                                    </v-btn>\n                                    <p class="caption font-weight-light text-right" v-text="user_text"></p>\n                                </v-col>\n                            </v-row>\n                        </div>\n                    </v-container>\n                </v-content>\n            </v-app>\n        </template>\n    '});
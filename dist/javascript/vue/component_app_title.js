Vue.component("app-title",{props:{title:{type:String,default:"Optinomic"},subtitle:{type:String,default:"App"}},created(){this.$store.dispatch("getApps")},computed:{readme_html(){try{return this.$store.state.current_app.module.readme.html}catch(e){return null}},app_description(){try{return this.$store.state.current_app.module.description}catch(e){return null}},app_data(){try{return this.$store.state.current_app}catch(e){return null}},clinic_data(){try{return this.$store.state.clinic.data}catch(e){return!1}},patient_text(){try{return this.$store.state.patient.data.extras.full_name}catch(e){return null}}},template:'\n        <div>\n            <h1 v-text="title" class="display-1 font-weight-medium"></h1>\n            <p style="margin-left:1px;color:#8b0042">\n                <span v-text="subtitle"></span>\n                <span v-if="patient_text" class="mx-1" style="color:#616161">|</span>\n                <span v-if="patient_text" v-text="patient_text"></span>\n            </p>\n\n            <optinomic-content-block title="Dokumentation" subtitle="Readme" id="id_readme">\n                <v-expansion-panels flat light tile v-if="readme_html === null">\n                    <v-expansion-panel disabled>\n                        <v-expansion-panel-header style="padding:0">\n                            <v-skeleton-loader class="" min-width="200" max-width="550" type="heading"></v-skeleton-loader>\n                        </v-expansion-panel-header>\n                    </v-expansion-panel>\n                </v-expansion-panels>\n\n                <v-expansion-panels flat light tile v-if="readme_html !== null">\n                    <v-expansion-panel>\n                        <v-expansion-panel-header style="margin:0; padding:0;">\n                            <p class="text--primary body-1 mx-auto">\n                                <span v-text="app_description"></span>\n                                <span class="overline mx-2" style="color:#8b0042">[ </span>\n                                <span class="overline">Mehr</span>\n                                <span class="overline mx-2" style="color:#8b0042">]</span>\n                            </p>\n                        </v-expansion-panel-header>\n                        <v-expansion-panel-content class="mx-0 px-0" style="margin:0; padding:0;">\n                            \x3c!-- Readme --\x3e\n                            <div style="border-bottom: 1px solid #8b0042">&nbsp;</div>\n                            <p class="overline mt-1 pb-1" style="margin-left:1px;color:#8b0042">README.md</p>\n                            <div class="mt-2" v-html="readme_html"></div>\n                            \x3c!-- Info-Table --\x3e\n                            <div class="mt-6" style="border-bottom: 1px solid #8b0042">&nbsp;</div>\n                            <p class="overline mt-1 pb-1" style="margin-left:1px;color:#8b0042">Applikation - Info</p>\n                            <v-simple-table>\n                                <template v-slot:default>\n                                    <tbody>\n                                        <tr>\n                                            <td>Licensed</td>\n                                            <td>\n                                                <a :href="clinic_data.clinic_www" target="_blank" v-text="clinic_data.clinic_name + \', \' + clinic_data.clinic_address"></a>\n                                            </td>\n                                        </tr>\n                                        <tr>\n                                            <td>Administrator</td>\n                                            <td>\n                                                <a :href="\'mailto:\'+ clinic_data.admin_email" v-text="clinic_data.admin_name"></a>\n                                            </td>\n                                        </tr>\n                                        <tr>\n                                            <td>Updated @ <span v-text="formatDateCH(app_data.module_activation.data.last_update)"></span></td>\n                                            <td>\n                                                <a :href="\'https://github.com/Optinomic/\' + app_data.module.identifier" target="_blank" v-text="app_data.module.identifier"></a>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </template>\n                            </v-simple-table>\n                            <v-divider></v-divider>\n                        </v-expansion-panel-content>\n                    </v-expansion-panel>\n                </v-expansion-panels>\n            </optinomic-content-block>\n        </div>\n    '});
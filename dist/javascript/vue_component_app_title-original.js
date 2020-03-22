// Optinomic App-Title
Vue.component('app-title', {
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
        this.$store.dispatch('getApps');
    },
    computed: {
        readme_html() {
            try {
                return this.$store.state.current_app.module.readme.html;
            } catch (e) {
                return null;
            };
        },
        app_description() {
            try {
                return this.$store.state.current_app.module.description;
            } catch (e) {
                return null;
            };
        },
        app_data() {
            try {
                return this.$store.state.current_app;
            } catch (e) {
                return null;
            };
        },
        clinic_data() {
            // get survey_response
            try {
                return this.$store.state.clinic.data;
            } catch (e) {
                return false;
            };
        },
        patient_text() {
            try {
                return this.$store.state.patient.data.extras.full_name;
            } catch (e) {
                return null;
            };
        }
    },
    template: `
        <div>
            <h1 v-text="title" class="display-1 font-weight-medium"></h1>
            <p style="margin-left:1px;color:#8b0042">
                <span v-text="subtitle"></span>
                <span v-if="patient_text" class="mx-1" style="color:#616161">|</span>
                <span v-if="patient_text" v-text="patient_text"></span>
            </p>

            <optinomic-content-block title="Dokumentation" subtitle="Readme" id="id_readme">
                <v-expansion-panels flat light tile v-if="readme_html === null">
                    <v-expansion-panel disabled>
                        <v-expansion-panel-header style="padding:0">
                            <v-skeleton-loader class="" min-width="200" max-width="550" type="heading"></v-skeleton-loader>
                        </v-expansion-panel-header>
                    </v-expansion-panel>
                </v-expansion-panels>

                <v-expansion-panels flat light tile v-if="readme_html !== null">
                    <v-expansion-panel>
                        <v-expansion-panel-header style="margin:0; padding:0;">
                            <p class="text--primary body-1 mx-auto">
                                <span v-text="app_description"></span>
                                <span class="overline mx-2" style="color:#8b0042">[ </span>
                                <span class="overline">Mehr</span>
                                <span class="overline mx-2" style="color:#8b0042">]</span>
                            </p>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="mx-0 px-0" style="margin:0; padding:0;">
                            <!-- Readme -->
                            <div style="border-bottom: 1px solid #8b0042">&nbsp;</div>
                            <p class="overline mt-1 pb-1" style="margin-left:1px;color:#8b0042">README.md</p>
                            <div class="mt-2" v-html="readme_html"></div>
                            <!-- Info-Table -->
                            <div class="mt-6" style="border-bottom: 1px solid #8b0042">&nbsp;</div>
                            <p class="overline mt-1 pb-1" style="margin-left:1px;color:#8b0042">Applikation - Info</p>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Licensed</td>
                                            <td>
                                                <a :href="clinic_data.clinic_www" target="_blank" v-text="clinic_data.clinic_name + ', ' + clinic_data.clinic_address"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Administrator</td>
                                            <td>
                                                <a :href="'mailto:'+ clinic_data.admin_email" v-text="clinic_data.admin_name"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Updated @ <span v-text="formatDateCH(app_data.module_activation.data.last_update)"></span></td>
                                            <td>
                                                <a :href="'https://github.com/Optinomic/' + app_data.module.identifier" target="_blank" v-text="app_data.module.identifier"></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <v-divider></v-divider>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </optinomic-content-block>
        </div>
    `
});
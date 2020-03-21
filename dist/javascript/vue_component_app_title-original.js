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
    created(){
        this.$store.dispatch('getApps');
    },
    computed: {
        readme_html () {
            try {
                return this.$store.state.current_app.module.readme.html;
            } catch (e) {
                return null;
            };
        },
        app_description () {
            try {
                return this.$store.state.current_app.module.description;
            } catch (e) {
                return null;
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
            <p style="margin-left:2px;color:#8b0042"> 
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
                            <p  class="text--primary body-1 mx-auto">
                                <span v-text="app_description"></span>
                                <span class="overline mx-2">[ Mehr ]</span>
                            </p>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content style="margin:0; padding:0;">
                            <div class="mt-8" v-html="readme_html"></div>
                            <v-divider></v-divider>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </optinomic-content-block>
        </div>
    `
});
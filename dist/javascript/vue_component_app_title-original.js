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
            if (this.$store.state.current_app === null) {
                return null;
            } else {
                return this.$store.state.current_app.module.readme.html;
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
            <h1 v-html="title" class="display-1 font-weight-medium"></h1>
            <p style="margin-left:3px;color:#8b0042"> 
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
                            <v-btn small outlined rounded color="#a1a1a1" class="mr-auto col-md-2">Anzeigen</v-btn>   
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
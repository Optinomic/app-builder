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
        }
    },
    template: `
        <div style="margin-bottom:24px;">
            <h1 v-html="title" class="display-1 font-weight-thin"></h1>
            <p v-html="subtitle" style="margin-left:3px"></p>
            <v-divider></v-divider>
            <v-expansion-panels flat light tile v-if="readme_html === null">
                <v-expansion-panel disabled>
                    <v-expansion-panel-header style="padding:0">
                        <v-skeleton-loader class="" min-width="200" max-width="550" type="heading"></v-skeleton-loader>
                    </v-expansion-panel-header>
                </v-expansion-panel>
            </v-expansion-panels>
        
            <v-expansion-panels flat light tile v-if="readme_html !== null">
                <v-expansion-panel>
                    <v-expansion-panel-header style="padding:0">
                        <h3 class="font-weight-light">Dokumentation (Readme)</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div v-html="readme_html"></div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-divider></v-divider>
        </div>
    `
});
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
        <div>
            <h1 v-html="title" class="display-1 font-weight-thin"></h1>
            <p v-html="subtitle" style="margin-left:3px;color:#8b0042"></p>
            <v-divider light></v-divider>
            <v-expansion-panels flat light tile v-if="readme_html === null">
                <v-expansion-panel disabled>
                    <v-expansion-panel-header style="padding:0">
                        <v-skeleton-loader class="" min-width="200" max-width="550" type="heading"></v-skeleton-loader>
                    </v-expansion-panel-header>
                </v-expansion-panel>
            </v-expansion-panels>
        
            <v-expansion-panels flat light tile v-if="readme_html !== null">
                <v-expansion-panel>
                    <v-expansion-panel-header style="margin:0; padding:0; max-height: 72px;">
                        <optinomic-content-block title="Dokumentation" subtitle="Readme" id="id_readme"></optinomic-content-block>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content style="margin:0; padding:0;">
                        <div class="mt-8" v-html="readme_html"></div>
                        <v-divider></v-divider>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    `
});
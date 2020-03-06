// Optinomic App-Header
Vue.component('app-title', {
    props: {
        title: {
            type: String,
            default: "Optinomic"
        },
        subtitle: String
    },
    created(){
        this.$store.dispatch('getSurveyResponses');
        this.$store.dispatch('getApps');
    },
    computed: {
        readme_html () {
            if (this.$store.state.current_app === null) {
                return '<h1>Loading</h1>'
            } else {
                return this.$store.state.current_app.module.readme.html;
            };
        }
    },
    template: `
        <v-expansion-panels flat light>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <h1 v-html="title" class="display-2 font-weight-thin"></h1>
                    <p v-html="subtitle"></p>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-subheader>Readme</v-subheader>
                    <div v-html="readme_html"></div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    `
});
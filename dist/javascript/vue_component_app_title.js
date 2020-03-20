Vue.component("app-title",{props:{title:{type:String,default:"Optinomic"},subtitle:{type:String,default:"App"}},created(){this.$store.dispatch("getApps")},computed:{readme_html(){return null===this.$store.state.current_app?null:this.$store.state.current_app.module.readme.html}},template:'\n        <div>\n            <h1 v-html="title" class="display-1 font-weight-thin"></h1>\n            <p v-html="subtitle" style="margin-left:3px;color:#8b0042"></p>\n            <v-divider light></v-divider>\n            <v-expansion-panels flat light tile v-if="readme_html === null">\n                <v-expansion-panel disabled>\n                    <v-expansion-panel-header style="padding:0">\n                        <v-skeleton-loader class="" min-width="200" max-width="550" type="heading"></v-skeleton-loader>\n                    </v-expansion-panel-header>\n                </v-expansion-panel>\n            </v-expansion-panels>\n        \n            <v-expansion-panels flat light tile v-if="readme_html !== null">\n                <v-expansion-panel>\n                    <v-expansion-panel-header style="margin:0; padding:0; max-height: 72px;">\n                        <optinomic-content-block title="Dokumentation" subtitle="Readme" id="id_readme"></optinomic-content-block>\n                    </v-expansion-panel-header>\n                    <v-expansion-panel-content style="margin:0; padding:0;">\n                        <div class="mt-8" v-html="readme_html"></div>\n                        <v-divider></v-divider>\n                    </v-expansion-panel-content>\n                </v-expansion-panel>\n            </v-expansion-panels>\n        </div>\n    '});
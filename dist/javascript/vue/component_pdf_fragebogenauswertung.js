Vue.component("pdf-auswertung-gesamt",{props:{production:{type:Boolean,default:!0}},data:()=>({name:"Fallkonferenz",title:"Fragebogenauswertung",subtitle:"Eine Übersicht der wichtigsten Ergebnisse und Auswertungen.",needed_apps_data:{production:[{name:"actinfo_ein",app_id:"ch.suedhang.apps.actinfo_ein.production"},{name:"actinfo_aus",app_id:"ch.suedhang.apps.actinfo_aus.production"},{name:"tmt",app_id:"ch.suedhang.apps.tmt.production"},{name:"asrs",app_id:"ch.suedhang.apps.asrs.production"},{name:"aase",app_id:"ch.suedhang.apps.aase-g.production"},{name:"bscl",app_id:"ch.suedhang.apps.bscl_anq.production"},{name:"bdi",app_id:"ch.suedhang.apps.bdi.production"},{name:"isk",app_id:"ch.suedhang.apps.isk.production"},{name:"sci",app_id:"ch.suedhang.apps.sci.production"},{name:"whoqol",app_id:"ch.suedhang.apps.whoqol.production"},{name:"rs13",app_id:"ch.suedhang.apps.rs13.production"}]}}),computed:{data_apps_array(){try{var da=this.$store.state.data_apps.base.slice();return da.forEach(function(app,appID){"pdf_created"in app||(app.pdf_created=!1)}.bind(this)),da}catch(e){return[]}},readyforPDF(){try{var ret_val=!0;return this.$store.state.data_apps.base.slice().forEach(function(app,appID){!0!==app.loaded&&(ret_val=!1)}.bind(this)),ret_val}catch(e){return!1}}},watch:{readyforPDF:function(ready){ready&&this.doPDF()}},methods:{showState(){try{console.log("showState",Object.assign({},this.$store.state),this.data_apps_array)}catch(err){console.error("showState",err)}},doPDF(){try{console.log("doPDF now!",Object.assign({},this.$store.state))}catch(err){console.error("doPDF",err)}}},created(){try{if(this.production){var init={base:this.needed_apps_data.production.slice(),count:0,data_init_array:[],data_loaded_array:[]};this.$store.commit({type:"saveData",root:"data_apps",data:init}),this.needed_apps_data.production.forEach(function(app,appID){var params={identifier:app.app_id,root:app.app_id};this.$store.dispatch("getSurveyResponses",params)}.bind(this))}}catch(err){console.error("created",err)}},template:'\n        <div v-on:click="showState">\n            <p class="body-1 ml4">PDF-Gesamtauswertung: under construction</p>\n            \n            <div class="d-flex flex-row justify-space-between align-center">\n                <div class="body-2">\n                    Erstelle PDF\n                </div>\n                <div v-for="app in data_apps_array">\n                    <v-badge v-if="(app.init === true) && (app.loaded !== true)  && (app.pdf_created !== true)" color="grey" dot> </v-badge>\n                    <v-badge v-if="(app.init === true) && (app.loaded === true)  && (app.pdf_created !== true)" color="blue" dot></v-badge>\n                    <v-badge v-if="(app.init === true) && (app.loaded === true)  && (app.pdf_created === true)" color="green" dot></v-badge>\n                </div>\n            </div>\n\n        </div>\n    '});
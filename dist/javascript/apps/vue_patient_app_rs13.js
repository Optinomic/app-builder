Vue.component("app-rs13",{props:{},created(){},data:function(){return{base_config:{dist_root:"dist",app_id:"ch.suedhang.apps.rs13.production",app_name:"Resilienzfragebogen (RS-13)",app_short_description:"Psychische Widerstandskraft",app_type:"patient"},pdf_content:[],rs_13_chart:{options:{min:0,max:100,item_height:50,item_text_left:83,item_text_right:60,color_skin:"indigo_grey_pink",color_grid:"#9E9E9E",color_clinic_sample:"#673AB7",show_baseline:!0,show_scale_text:!0,show_score_vertical_line:!0,show_score_profile_line:!1,show_score_circles:!0,show_settings_block:!1,show_ranges_overview:!0,allow_toggle_settings_block:!1,range_alpha:.08,vertical_grid_every_x:10,response_title_path:"calculation.resilienz_score.range.interpretation_de",response_date_path:"date"},scales:[{left_text:"Niedrige Resilienz",right_text:"Hohe Resilienz",score_path:"calculation.resilienz_score.rs13_score",clinic_sample_var:null}],ranges:[{range_start:13,range_stop:66,interpretation_de:"niedrige Widerstandskraft (Resilienz)",text:"Niedrig",color:"#F44336"},{range_start:67,range_stop:72,interpretation_de:"moderate Widerstandskraft (Resilienz)",text:"Moderat",color:"#FF9800"},{range_start:73,range_stop:91,interpretation_de:"hohe Widerstandskraft (Resilienz)",text:"Hoch",color:"#4CAF50"}]},data_table:{rows:[{name:"Messzeitpunkt",variable:"rs13_mz",path:"response.rs13_mz",interpretation:"mz"},{name:"Erfassung",variable:"rs13_date",path:"response.rs13_date"},{name:"Wenn ich Pläne habe, verfolge ich sie auch.",variable:"rs13_01",path:"response.rs13_01"},{name:"Normalerweise schaffe ich alles irgendwie.",variable:"rs13_02",path:"response.rs13_02"},{name:"Ich lasse mich nicht so schnell aus der Bahn werfen.",variable:"rs13_03",path:"response.rs13_03"},{name:"Ich mag mich.",variable:"rs13_04",path:"response.rs13_04"},{name:"Ich kann mehrere Dinge gleichzeitig bewältigen.",variable:"rs13_05",path:"response.rs13_05"},{name:"Ich bin entschlossen.",variable:"rs13_06",path:"response.rs13_06"},{name:"Ich nehme die Dinge wie sie kommen.",variable:"rs13_07",path:"response.rs13_07"},{name:"Ich behalte an vielen Dingen Interesse.",variable:"rs13_08",path:"response.rs13_08"},{name:"Normalerweise kann ich eine Situation aus mehreren Perspektiven betrachten.",variable:"rs13_09",path:"response.rs13_09"},{name:"Ich kann mich auch überwinden, Dinge zu tun, die ich eigentlich nicht machen will.",variable:"rs13_10",path:"response.rs13_10"},{name:"Wenn ich in einer schwierigen Situation bin, finde ich gewöhnlich einen Weg heraus.",variable:"rs13_11",path:"response.rs13_11"},{name:"In mir steckt genügend Energie, um alles zu machen, was ich machen muss.",variable:"rs13_12",path:"response.rs13_12"},{name:"Ich kann es akzeptieren, wenn mich nicht alle Leute mögen.",variable:"rs13_13",path:"response.rs13_13"},{name:"Resilienz Summenscore",variable:"rs13_score",path:"calculation.resilienz_score.rs13_score"}],interpretations:{mz:[{value:1,text:"Eintritt"},{value:2,text:"Austritt"},{value:3,text:"Anderer Messzeitpunkt"}]}}}},methods:{getTitle:function(r){var ret_string="Erfassung";console.log(r);try{if(r.calculation_found){const name=r.calculation.resilienz_score.range.interpretation_de;ret_string=name.charAt(0).toUpperCase()+name.slice(1)}}catch(e){console.error("getTitle",e)}return ret_string},getSubtitle:function(r){var ret_string="::";try{ret_string=formatDateCH(r.date),r.calculation_found&&(ret_string=ret_string+" | ∑ Resilienz-Summenscore: "+r.calculation.resilienz_score.rs13_score)}catch(e){console.error("getSubtitle",e)}return ret_string}},computed:{isAdmin(){return this.$store.getters.isAdmin},patient_secure(){try{return this.$store.state.patient.data.extras.secure}catch(e){return""}},sr_data(){try{return this.$store.state.sr.data}catch(e){return[]}},sr_count_text(){try{var ret_text="";return 0===this.$store.state.sr.data.length&&(ret_text="Keine Erfassung"),1===this.$store.state.sr.data.length&&(ret_text="Eine Erfassung"),this.$store.state.sr.data.length>1&&(ret_text="Erfassungen ("+this.$store.state.sr.data.length+")"),ret_text}catch(e){return""}},sr_full(){try{return this.$store.state.sr}catch(e){return[]}},pdf_ready(){try{if(this.$store.state.sr.data.length){var pdf=[],title=makepdf._title(this.base_config.app_short_description,this.base_config.app_name);return pdf.push(title),this.$store.state.sr.data.length>0?(pdf.push(makepdf._heading("Auswertung / Interpretation",null,"h2")),this.$store.state.sr.data.forEach(function(d){if(d.calculation_found){var interpret=makepdf._text(d.calculation.resilienz_score.interpretation);pdf.push(makepdf._keepTogether(interpret)),pdf.push(makepdf._horizontalLine(100,"#F5F5F5"));var pdf_chart=makepdf._pdf_chart_profile("de",this.rs_13_chart.options,{},{},[],this.rs_13_chart.scales,this.$store.state.sr,this.rs_13_chart.ranges);pdf.push(pdf_chart),pdf.push(makepdf._horizontalLine(100,"#F5F5F5"))}else pdf.push(makepdf._noData("Resilienz","Calculation noch nicht berechnet.",6))}.bind(this))):pdf.push(makepdf._noData("Resilienz","Keine Daten vorhanden",6)),this.pdf_content=pdf,!0}return!1}catch(e){return!1}}},template:'\n        <div>\n            <div v-for="sr in sr_data" :key="sr.event_id">\n\n                <div v-if="sr.calculation_found">\n                    <optinomic-content-block :title="getTitle(sr)" :subtitle="getSubtitle(sr)" id="id_erfassungen">\n                        <p class="overline">Auswertung / Interpretation</p>\n                        <optinomic-clipboard-text :text="sr.calculation.resilienz_score.interpretation">\n                        </optinomic-clipboard-text>\n\n                        <optinomic-chart-profile style="border-top:1px solid #fafafa;border-bottom:1px solid #fafafa;"\n                            v-bind:options="JSON.stringify(rs_13_chart.options)" v-bind:scales="JSON.stringify(rs_13_chart.scales)"\n                            v-bind:ranges="JSON.stringify(rs_13_chart.ranges)" v-bind:scores="JSON.stringify(sr_full)">\n                        </optinomic-chart-profile>\n                    </optinomic-content-block>\n                </div>\n                <div v-else>\n                    <optinomic-content-block :title="\'Erfassung vom \' + formatDateCH(sr.date)" subtitle="Hinweis zur" id="id_no_calculation">\n                        <v-alert prominent outlined text type="error">\n                            Calculation noch nicht berechnet.\n                        </v-alert>\n                    </optinomic-content-block>\n                </div>\n\n            </div>\n\n            <optinomic-content-block :subtitle="sr_count_text" title="Datentabelle" id="id_data_table">\n                <optinomic-data-table :rows="data_table.rows" :interpretations="data_table.interpretations"></optinomic-data-table>\n            </optinomic-content-block>\n\n            <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf" v-if="pdf_ready">\n                <optinomic-pdfmake :header-left="patient_secure" footer-left="Resilienzfragebogen (RS-13)" header-right="Klinik Südhang"\n                    document-title="Resilienz" :content="pdf_content" hide-logo></optinomic-pdfmake>\n            </optinomic-content-block>\n\n        </div>\n    '});
Vue.component("optinomic-pdfmake",{props:{headerLeft:{type:String,default:""},headerRight:{type:String,default:""},footerLeft:{type:String,default:""},documentTitle:{type:String},content:{type:Array,default:null},pageSize:{type:String,default:"A4"},pageOrientation:{type:String,default:"portrait"},hideLogo:{type:Boolean,default:!1},hidePageNumbers:{type:Boolean,default:!1}},data:function(){return{loadingString:"..."}},mounted(){},computed:{doc_title(){try{var doc_name="",d=new Date,y=d.getFullYear(),m=d.getMonth()+1,t=d.getUTCDate();m<10&&(m="0"+m),t<10&&(t="0"+t),datum_str=y+"_"+m+"_"+t;var pat_string="";return pat_string="male"===this.$store.state.patient.data.gender?"Hr_":"Fr_",pat_string+=this.$store.state.patient.data.last_name.substring(0,2),pat_string+=this.$store.state.patient.data.first_name.substring(0,1),pat_string+="_",pat_string+=this.$store.state.patient.data.birthdate.substring(0,4),doc_name=doc_name+datum_str+" - "+this.documentTitle+" - "+pat_string,doc_name+=".pdf"}catch(e){return""}},pdf_ready(){try{return""!==this.doc_title&&this.content.length>0}catch(e){return!1}}},methods:{__open_pdf:function(){var dd=makepdf._create_document(this.documentTitle,this.headerLeft,this.headerRight,this.footerLeft,this.pageSize,this.pageOrientation,this.hideLogo,this.hidePageNumbers);dd.content=this.content.slice(),dd=makepdf._addFooter(dd,this.footerLeft,this.hidePageNumbers),console.log("PDF | open :: "+this.doc_title,dd),this.pdf_request_possible=!1,pdfMake.createPdf(dd).open()},__download_pdf:function(){var dd=makepdf._create_document(this.documentTitle,this.headerLeft,this.headerRight,this.footerLeft,this.pageSize,this.pageOrientation,this.hideLogo,this.hidePageNumbers);dd.content=this.content.slice(),dd=makepdf._addFooter(dd,this.footerLeft,this.hidePageNumbers),console.log("PDF | download :: "+this.doc_title,dd),this.pdf_request_possible=!1,pdfMake.createPdf(dd).download(this.doc_title)}},template:'\n        <div v-if="pdf_ready" class="d-flex flex-row justify-space-between align-center pt-2 mb-1">\n            <div class="mb-3 mr-2">\n                <v-icon color="#8b0042">mdi-file-pdf</v-icon>\n            </div>\n            <p v-text="doc_title" class="mr-auto mt-2"></p>\n            \n            <div style="margin-top:-8px">\n                <v-tooltip left>\n                    <template v-slot:activator="{ on }">\n                        <span v-on="on">\n                            <v-btn v-on:click="__download_pdf" icon color="grey">\n                                <v-icon>mdi-content-save</v-icon>\n                            </v-btn>\n                        </span>\n                    </template>\n                    <span>Herunterladen</span>\n                </v-tooltip>\n                <v-btn outlined small rounded color="#8b0042" v-on:click="__open_pdf">\n                    Öffnen\n                </v-btn>\n            </div>\n        </div>\n    '});
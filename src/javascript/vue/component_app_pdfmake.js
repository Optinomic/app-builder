// optinomic-pdfmake
Vue.component('optinomic-pdfmake', {
    props: {
        headerLeft: {
            type: String,
            default: ""
        },
        headerRight: {
            type: String,
            default: ""
        },
        footerLeft: {
            type: String,
            default: ""
        },
        documentTitle: {
            type: String
        },
        content: {
            type: Array,
            default: null
        },
        pageSize: {
            type: String,
            default: 'A4'
        },
        pageOrientation: {
            type: String,
            default: 'portrait'
        },
        hideLogo: {
            type: Boolean,
            default: false
        },
        hidePageNumbers: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            loadingString: "..."
        }
    },
    mounted() {},
    computed: {
        sr_data() {
            // return data
            try {
                return this.$store.state.sr.data;
            } catch (e) {
                return [];
            };
        },
        doc_title() {
            // return data
            try {
                var doc_name = "";
    
                var d = new Date();
                var y = d.getFullYear();
                var m = d.getMonth() + 1;
                var t = d.getUTCDate();
        
                if (m < 10) {
                    m = "0" + m;
                };
        
                if (t < 10) {
                    t = "0" + t;
                };
        
                datum_str = y + "_" + m + "_" + t;
        

                // Demo Muster (21.5.1973 | 46) => Hr_DeM_1973
                var pat_string = "";
                if (this.$store.state.patient.data.gender === "male") {
                    pat_string = "Hr_";
                } else {
                    pat_string = "Fr_";
                };
                pat_string = pat_string + this.$store.state.patient.data.last_name.substring(0, 2);
                pat_string = pat_string + this.$store.state.patient.data.first_name.substring(0, 1);
                pat_string = pat_string + "_";
                pat_string = pat_string + this.$store.state.patient.data.birthdate.substring(0, 4);

                doc_name = doc_name + datum_str + " - " + this.documentTitle + " - " + pat_string;
                doc_name = doc_name + ".pdf";

                return doc_name;
            } catch (e) {
                return "";
            };
        }
    },
    methods: {
        __open_pdf: function () {

            var dd = makepdf._create_document(this.documentTitle, this.headerLeft, this.headerRight, this.footerLeft, this.pageSize, this.pageOrientation, this.hideLogo, this.hidePageNumbers);

            dd.content = this.content;
            dd = makepdf._addFooter(dd, this.footerLeft, this.hidePageNumbers);

            console.log('PDF | open :: ' + this.doc_title, dd);
            this.pdf_request_possible = false;
            pdfMake.createPdf(dd).open();
        },
        __download_pdf: function () {

            var dd = makepdf._create_document(this.documentTitle, this.headerLeft, this.headerRight, this.footerLeft, this.pageSize, this.pageOrientation, this.hideLogo, this.hidePageNumbers);

            dd.content = this.content;
            dd = makepdf._addFooter(dd, this.footerLeft, this.hidePageNumbers);
            console.log('PDF | download :: ' + this.doc_title, dd);
            this.pdf_request_possible = false;
            pdfMake.createPdf(dd).download(this.doc_title);
        },
        create_document_name: function () {

    
            // console.log('doc_name', doc_name);
            return doc_name
        }
    },
    template: `
        <div class="d-flex flex-row justify-space-between align-center pt-2 mb-1">
            <div class="mb-3 mr-2">
                <v-icon color="#8b0042">mdi-file-pdf</v-icon>
            </div>
            <p v-text="doc_title" class="mr-auto mt-2"></p>
            
            <div style="margin-top:-8px">
                <v-tooltip left>
                    <template v-slot:activator="{ on }">
                        <span v-on="on">
                            <v-btn v-on:click="__download_pdf" icon color="grey">
                                <v-icon>mdi-content-save</v-icon>
                            </v-btn>
                        </span>
                    </template>
                    <span>Herunterladen</span>
                </v-tooltip>
                <v-btn outlined small rounded color="#8b0042" v-on:click="__open_pdf">
                    Öffnen
                </v-btn>
            </div>
        </div>
    `
});
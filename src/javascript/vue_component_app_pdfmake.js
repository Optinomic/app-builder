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
            loadingString: "...",
            doc_title: makepdf._create_document_name(this.documentTitle, this.headerLeft)
        }
    },
    mounted() {

    },
    computed: {
        sr_data() {
            // return data
            try {
                return this.$store.state.sr.data;
            } catch (e) {
                return [];
            };
        }
    },
    methods: {
        __open_pdf: function () {

            var dd = makepdf._create_document(this.documentTitle, this.headerLeft, this.headerRight, this.footerLeft, this.pageSize, this.pageOrientation, this.hideLogo, this.hidePageNumbers);
            
            dd.content = this.content;
            dd = makepdf._addFooter(dd, this.footerLeft, this.hidePageNumbers);

            console.log('PDF | open :: ' + this.doc_title, dd);
            pdfMake.createPdf(dd).open();
        },
        __download_pdf: function () {

            var dd = makepdf._create_document(this.documentTitle, this.headerLeft, this.headerRight, this.footerLeft, this.pageSize, this.pageOrientation, this.hideLogo, this.hidePageNumbers);
            
            dd.content = this.content;
            dd = makepdf._addFooter(dd, this.footerLeft, this.hidePageNumbers);
            consol
            e.log('PDF | download :: ' + this.doc_title, dd);
            pdfMake.createPdf(dd).download(doc_title);
        }
    },
    template: `
        <div style="margin-bottom:24px;">
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-row align="start" justify="space-between">
                            <img class="ml-1 mr-2" width="24px"
                                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDk0LjQ3OSwxMzguNTU3TDM2NC4wNCwzLjAxOEMzNjIuMTgzLDEuMDksMzU5LjYyMSwwLDM1Ni45NDUsMGgtMTk0LjQxYy0yMS43NTcsMC0zOS40NTgsMTcuNjk0LTM5LjQ1OCwzOS40NDJ2MTM3Ljc4OSAgICBINDQuMjljLTE2LjI3OCwwLTI5LjUyMSwxMy4yMzktMjkuNTIxLDI5LjUxM3YxNDcuNzQ0QzE0Ljc2OSwzNzAuNzYxLDI4LjAxMiwzODQsNDQuMjksMzg0aDc4Ljc4N3Y4OC42MjcgICAgYzAsMjEuNzEsMTcuNzAxLDM5LjM3MywzOS40NTgsMzkuMzczaDI5NS4yMzhjMjEuNzU3LDAsMzkuNDU4LTE3LjY1MywzOS40NTgtMzkuMzUxVjE0NS4zODUgICAgQzQ5Ny4yMzEsMTQyLjgzOSw0OTYuMjQ0LDE0MC4zOTIsNDk0LjQ3OSwxMzguNTU3eiBNMzU5LjM4NSwyNi41ODFsMTA3LjA3OSwxMTEuMjY1SDM1OS4zODVWMjYuNTgxeiBNNDQuMjksMzY0LjMwOCAgICBjLTUuNDIsMC05LjgyOC00LjQwNS05LjgyOC05LjgyVjIwNi43NDRjMC01LjQxNSw0LjQwOS05LjgyMSw5LjgyOC05LjgyMWgyNjUuODgyYzUuNDIsMCw5LjgyOCw0LjQwNiw5LjgyOCw5LjgyMXYxNDcuNzQ0ICAgIGMwLDUuNDE1LTQuNDA5LDkuODItOS44MjgsOS44Mkg0NC4yOXogTTQ3Ny41MzgsNDcyLjY0OWMwLDEwLjg0LTguODY3LDE5LjY1OS0xOS43NjYsMTkuNjU5SDE2Mi41MzUgICAgYy0xMC44OTksMC0xOS43NjYtOC44MjgtMTkuNzY2LTE5LjY4VjM4NGgxNjcuNDAzYzE2LjI3OCwwLDI5LjUyMS0xMy4yMzksMjkuNTIxLTI5LjUxMlYyMDYuNzQ0ICAgIGMwLTE2LjI3NC0xMy4yNDMtMjkuNTEzLTI5LjUyMS0yOS41MTNIMTQyLjc2OVYzOS40NDJjMC0xMC44OTEsOC44NjctMTkuNzUsMTkuNzY2LTE5Ljc1aDE3Ny4xNTd2MTI4ICAgIGMwLDUuNDM4LDQuNDA5LDkuODQ2LDkuODQ2LDkuODQ2aDEyOFY0NzIuNjQ5eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTEzMi40ODEsMjQ5Ljg5NGMtMy4yNjktNC4yNS03LjMyNy03LjAxLTEyLjE3My04LjI3OWMtMy4xNTQtMC44NDYtOS45MjMtMS4yNjktMjAuMzA4LTEuMjY5SDcyLjU5NnY4NC41NzdoMTcuMDc3ICAgIHYtMzEuOTA0aDExLjEzNWM3LjczMSwwLDEzLjYzNS0wLjQwNCwxNy43MTItMS4yMTJjMy0wLjY1NCw1Ljk1Mi0xLjk5LDguODU2LTQuMDFjMi45MDQtMi4wMTksNS4yOTgtNC43OTgsNy4xODMtOC4zMzYgICAgYzEuODg1LTMuNTM4LDIuODI3LTcuOTA0LDIuODI3LTEzLjA5NkMxMzcuMzg1LDI1OS42MzQsMTM1Ljc1LDI1NC4xNDQsMTMyLjQ4MSwyNDkuODk0eiBNMTE3Ljg1NiwyNzMuMTczICAgIGMtMS4yODgsMS44ODUtMy4wNjcsMy4yNjktNS4zMzcsNC4xNTRzLTYuNzY5LDEuMzI3LTEzLjUsMS4zMjdoLTkuMzQ2di0yNGg4LjI1YzYuMTU0LDAsMTAuMjUsMC4xOTIsMTIuMjg4LDAuNTc3ICAgIGMyLjc2OSwwLjUsNS4wNTgsMS43NSw2Ljg2NSwzLjc1YzEuODA4LDIsMi43MTIsNC41MzksMi43MTIsNy42MTVDMTE5Ljc4OSwyNjkuMDk2LDExOS4xNDQsMjcxLjI4OCwxMTcuODU2LDI3My4xNzN6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjE5LjQ4MSwyNjMuNDUyYy0xLjg0Ni01LjQwNC00LjUzOS05Ljk3MS04LjA3Ny0xMy43MDJzLTcuNzg5LTYuMzI3LTEyLjc1LTcuNzg5Yy0zLjY5Mi0xLjA3Ny05LjA1OC0xLjYxNS0xNi4wOTYtMS42MTUgICAgaC0zMS4yMTJ2ODQuNTc3aDMyLjEzNWM2LjMwOCwwLDExLjM0Ni0wLjU5NiwxNS4xMTUtMS43ODljNS4wMzktMS42MTUsOS4wMzktMy44NjUsMTItNi43NWMzLjkyMy0zLjgwOCw2Ljk0Mi04Ljc4OCw5LjA1OC0xNC45NDIgICAgYzEuNzMxLTUuMDM5LDIuNTk2LTExLjAzOSwyLjU5Ni0xOEMyMjIuMjUsMjc1LjUxOSwyMjEuMzI3LDI2OC44NTYsMjE5LjQ4MSwyNjMuNDUyeiBNMjAyLjg2NSwyOTguMTgzICAgIGMtMS4xNTQsMy43ODktMi42NDQsNi41MS00LjQ3MSw4LjE2M2MtMS44MjcsMS42NTQtNC4xMjUsMi44MjctNi44OTQsMy41MTljLTIuMTE1LDAuNTM5LTUuNTU4LDAuODA4LTEwLjMyNywwLjgwOGgtMTIuNzV2MCAgICB2LTU2LjAxOWg3LjY3M2M2Ljk2MSwwLDExLjYzNSwwLjI2OSwxNC4wMTksMC44MDhjMy4xOTIsMC42OTIsNS44MjcsMi4wMTksNy45MDQsMy45ODFjMi4wNzcsMS45NjIsMy42OTIsNC42OTIsNC44NDYsOC4xOTIgICAgYzEuMTU0LDMuNSwxLjczMSw4LjUxOSwxLjczMSwxNS4wNThDMjA0LjU5NiwyODkuMjMxLDIwNC4wMTksMjk0LjM5NCwyMDIuODY1LDI5OC4xODN6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cG9seWdvbiBwb2ludHM9IjI5NC44MjcsMjU0LjY1NCAyOTQuODI3LDI0MC4zNDYgMjM2Ljg0NiwyNDAuMzQ2IDIzNi44NDYsMzI0LjkyMyAyNTMuOTIzLDMyNC45MjMgMjUzLjkyMywyODguOTgxICAgICAyODkuMjMxLDI4OC45ODEgMjg5LjIzMSwyNzQuNjczIDI1My45MjMsMjc0LjY3MyAyNTMuOTIzLDI1NC42NTQgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                            <p v-html="doc_title" class="mr-auto"></p>

                            <v-btn outlined small class="mr-1" v-on:click="__download_pdf">
                                Herunterladen
                            </v-btn>
                            <v-btn outlined small color="indigo" class="mr-1" v-on:click="__open_pdf">
                                Öffnen
                            </v-btn>
                            
                        </v-row>
                    </v-col>

                </v-row>
            </v-container>
        </div>
    `
});

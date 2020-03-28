// Druckvorlagen (PDF) - Application
Vue.component('app-druckvorlagen', {
    props: {},
    created() {},
    data: function () {
        return {
            "pdf_content": [],
            
        }
    },
    methods: {
    },
    computed: {
        patient_secure() {
            try {
                return this.$store.state.patient.data.extras.secure;
            } catch (e) {
                return "";
            };
        },
        sr_data() {
            try {
                return this.$store.state.sr.data;
            } catch (e) {
                return [];
            };
        },
        current_module() {
            try {
                return this.$store.state.current_app.module;
            } catch (e) {
                return null;
            };
        },
        sr_count_text() {
            try {
                var ret_text = "";
                if (this.$store.state.sr.data.length === 0) {
                    ret_text = "Keine Erfassung";
                };
                if (this.$store.state.sr.data.length === 1) {
                    ret_text = "Eine Erfassung";
                };
                if (this.$store.state.sr.data.length > 1) {
                    ret_text = "Erfassungen (" + this.$store.state.sr.data.length + ")";
                };
                return ret_text;
            } catch (e) {
                return "";
            };
        },
        sr_full() {
            try {
                return this.$store.state.sr;
            } catch (e) {
                return [];
            };
        },
        pdf_ready() {
            try {
                if ((this.sr_data.length) && (this.current_module)) {
                    // Build PDF
                    var pdf = [];
                    pdf.push(this.pdf_app_info(this.current_module, true));
                    pdf.push(this.rs13_pdf_content(this.sr_data));
                    this.pdf_content = pdf;
                    return true;
                } else {
                    return false;
                };
            } catch (e) {
                return false;
            };
        }
    },
    template: `
        <div>

            <p>Druckvorlagen</p>

        </div>
    `
});
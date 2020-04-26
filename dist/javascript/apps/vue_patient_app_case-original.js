// CASE - Application
Vue.component('app-case', {
    props: {
        identifier: {
            type: String,
            default: helpers.getAppID()
        }
    },
    data: function () {
        return {
            "pdf_content": []
        }
    },
    methods: {
        get_text(sr) {
            // return data
            try {
                const score = sr.calculation.another_calculation.score
                var txt = this.$store.state.patient.data.extras.anrede + " ";
                var txt = txt + "weist im CASE vom " + formatDateCH(sr.date) + " einen Summenwert von " + score + " auf. "

                if (score >= 15) {
                    var txt = txt + "Eine stationäre Therapie ist somit indiziert."
                } else {
                    var txt = txt + "Eine stationäre Therapie ist ab 15 Punkten indiziert."
                };
                
                return txt;
            } catch (e) {
                return e;
            };
        },
    },
    computed: {
        patient_secure() {
            // return data
            try {
                return this.$store.state.patient.data.extras.secure;
            } catch (e) {
                return "";
            };
        },
        sr_count_text() {
            try {
                var ret_text = "";
                if (this.sr_data.length === 0) {
                    ret_text = "Keine Erfassung";
                };
                if (this.sr_data.length === 1) {
                    ret_text = "Eine Erfassung";
                };
                if (this.sr_data.length > 1) {
                    ret_text = "Erfassungen (" + this.sr_data.length + ")";
                };
                return ret_text;
            } catch (e) {
                return "";
            };
        }
    },
    template: `
        <div>
            <div v-for="sr in sr_data" :key="sr.event_id">
                <div v-if="sr.calculation_found">
                    <optinomic-content-block :subtitle="sr_count_text" title="CASE" 
                        :id="'id_erfassung_' + sr.event_id">
                        <p class="overline">Auswertung / Interpretation</p>
                        <optinomic-clipboard-text :text="get_text(sr)">
                        </optinomic-clipboard-text>
                    </optinomic-content-block>
                </div>
            </div>
        </div>
    `
});
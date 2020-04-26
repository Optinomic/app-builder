// HoNOS - Application
Vue.component('app-honos', {
    props: {
        identifier: {
            type: String,
            default: helpers.getAppID()
        }
    },
    data: function () {
        return {
            "base_config": {
                "dist_root": "dist",
                "app_id": "ch.suedhang.apps.honos.production",
                "app_name": "HoNOS",
                "app_short_description": "Health of the Nations Outcome Scale",
                "app_type": "patient"
            },
            "pdf_content": [],
            "data_table": {
                "rows": [{
                        "name": "Zeitpunkt",
                        "variable": "zeitpunkt_honos",
                        "path": "calculation.honos_calculation.type.name"
                    },
                    {
                        "name": "Verhaltensstörungen",
                        "variable": "honos_h01",
                        "path": "response.H1[402V01]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Selbstverletzung",
                        "variable": "honos_h02",
                        "path": "response.H1[402V02]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Sucht",
                        "variable": "honos_h03",
                        "path": "response.H1[402V03]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Kognitive Probleme",
                        "variable": "honos_h04",
                        "path": "response.H1[402V04]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Körperliche Probleme",
                        "variable": "honos_h05",
                        "path": "response.H1[402V05]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Wahn",
                        "variable": "honos_h06",
                        "path": "response.H1[402V06]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Gedrückte Stimmung",
                        "variable": "honos_h07",
                        "path": "response.H1[402V07]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Andere Probleme",
                        "variable": "honos_h08",
                        "path": "response.H1[402V08]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Art, Andere Probleme",
                        "variable": "honos_h08a",
                        "path": "response.q402V09",
                        "interpretation": "andereart"
                    },
                    {
                        "name": "Weitere Spezifikation",
                        "variable": "honos_h08b",
                        "path": "response.q402V10"
                    },
                    {
                        "name": "Beziehungen",
                        "variable": "honos_h09",
                        "path": "response.H2[402V11]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Alltägliche Aktivitäten",
                        "variable": "honos_h10",
                        "path": "response.H2[402V12]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Wohnbedingungen",
                        "variable": "honos_h11",
                        "path": "response.H2[402V13]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Beruf und Alltag",
                        "variable": "honos_h12",
                        "path": "response.H2[402V14]",
                        "interpretation": "problemeinschaetzung"
                    },
                    {
                        "name": "Dropout Code",
                        "variable": "dropoutcode_honos",
                        "path": "dropout.dropout_id"
                    },
                    {
                        "name": "Dropout",
                        "variable": "spezifikation_dropout",
                        "path": "dropout.dropout_raeson"
                    },
                    {
                        "name": "Totalsumme (Σ)",
                        "variable": "sum_total",
                        "path": "calculation.honos_calculation.sum_score.sum_total"
                    }
                ],
                "interpretations": {
                    "problemeinschaetzung": [{
                            "value": 0,
                            "text": "keine"
                        },
                        {
                            "value": 1,
                            "text": "gering"
                        },
                        {
                            "value": 2,
                            "text": "leicht"
                        },
                        {
                            "value": 3,
                            "text": "mässig"
                        },
                        {
                            "value": 4,
                            "text": "schwer"
                        },
                        {
                            "value": 9,
                            "text": "k.A."
                        }
                    ],
                    "andereart": [{
                            "value": "a",
                            "text": "Phobisch"
                        },
                        {
                            "value": "b",
                            "text": "Angst"
                        },
                        {
                            "value": "c",
                            "text": "Zwang"
                        },
                        {
                            "value": "e",
                            "text": "Dissoziativ"
                        },
                        {
                            "value": "f",
                            "text": "Somatoform"
                        },
                        {
                            "value": "g",
                            "text": "Essen"
                        },
                        {
                            "value": "h",
                            "text": "Schlaf"
                        },
                        {
                            "value": "i",
                            "text": "Sexualität"
                        },
                        {
                            "value": "j",
                            "text": "Andere"
                        }
                    ]
                }
            }
        }
    },
    methods: {},
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
            <optinomic-content-block :subtitle="sr_count_text" title="Datentabelle" id="id_data_table">
                <optinomic-data-table :rows="data_table.rows" :interpretations="data_table.interpretations" :sr="sr_data"></optinomic-data-table>
            </optinomic-content-block>
        </div>
    `
});
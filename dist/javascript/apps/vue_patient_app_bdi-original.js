// BDI-II Application
Vue.component('app-bdi', {
    props: {
        identifier: {
            type: String,
            default: helpers.getAppID()
        }
    },
    created() {},
    data: function () {
        return {
            "pdf_content": [],
            "data_table": {
              "rows": [
                {
                    "name": "Messzeitpunkt",
                    "variable": "BDI_MZ",
                    "path": "response.Erhebungszeitpunkt",
                    "interpretation": "mz"
                  },
                  {
                    "name": "Erfassungsdatum",
                    "variable": "Daum",
                    "path": "response.Datum",
                    "interpretation": "date"
                  },
                  {
                    "name": "1. Traurigkeit",
                    "variable": "BDI_01",
                    "path": "response.BDI1",
                    "interpretation": "traurigkeit"
                  },
                  {
                    "name": "2. Pessimismus",
                    "variable": "BDI_02",
                    "path": "response.BDI2",
                    "interpretation": "pessimismus"
                  },
                  {
                    "name": "3. Versagensgefühle",
                    "variable": "BDI_03",
                    "path": "response.BDI3",
                    "interpretation": "versagensgefühle"
                  },
                  {
                    "name": "4. Verlust von Freude",
                    "variable": "BDI_04",
                    "path": "response.BDI4",
                    "interpretation": "verlust_von_freude"
                  },
                  {
                    "name": "5. Schuldgefühle",
                    "variable": "BDI_05",
                    "path": "response.BDI5",
                    "interpretation": "schuld"
                  },
                  {
                    "name": "6. Bestrafungsgefühle",
                    "variable": "BDI_06",
                    "path": "response.BDI6",
                    "interpretation": "bestrafung"
                  },
                  {
                    "name": "7. Selbstablehnung",
                    "variable": "BDI_07",
                    "path": "response.BDI7",
                    "interpretation": "selbstablehnung"
                  },
                  {
                    "name": "8. Selbstvorwürfe",
                    "variable": "BDI_08",
                    "path": "response.BDI8",
                    "interpretation": "selbstvorwuerfe"
                  },
                  {
                    "name": "9. Selbstmordgedanken",
                    "variable": "BDI_09",
                    "path": "response.BDI9",
                    "interpretation": "suizidalitaet"
                  },
                  {
                    "name": "10. Weinen",
                    "variable": "BDI_10",
                    "path": "response.BDI10",
                    "interpretation": "weinen"
                  },
                  {
                    "name": "11. Unruhe",
                    "variable": "BDI_11",
                    "path": "response.BDI11",
                    "interpretation": "unruhe"
                  },
                  {
                    "name": "12. Interessenverlust",
                    "variable": "BDI_12",
                    "path": "response.BDI12",
                    "interpretation": "interessenverlust"
                  },
                  {
                    "name": "13. Entschlussunfähigkeit",
                    "variable": "BDI_13",
                    "path": "response.BDI13",
                    "interpretation": "entschluss"
                  },
                  {
                    "name": "14. Wertlosigkeit",
                    "variable": "BDI_14",
                    "path": "response.BDI14",
                    "interpretation": "wert"
                  },
                  {
                    "name": "15. Energieverlust",
                    "variable": "BDI_15",
                    "path": "response.BDI15",
                    "interpretation": "energieverlust"
                  },
                  {
                    "name": "16. Veränderungen der Schlafgewohnheiten",
                    "variable": "BDI_16",
                    "path": "response.BDI16",
                    "interpretation": "schlaf"
                  },
                  {
                    "name": "17. Reizbarkeit",
                    "variable": "BDI_17",
                    "path": "response.BDI17",
                    "interpretation": "reizbarkeit"
                  },
                  {
                    "name": "18. Veränderungen des Appetits",
                    "variable": "BDI_18",
                    "path": "response.BDI18",
                    "interpretation": "appetit"
                  },
                  {
                    "name": "19. Konzentrationsschwierigkeiten",
                    "variable": "BDI_19",
                    "path": "response.BDI19",
                    "interpretation": "konzentration"
                  },
                  {
                    "name": "20. Ermüdung und Erschöpfung",
                    "variable": "BDI_20",
                    "path": "response.BDI20",
                    "interpretation": "ermuedung"
                  },
                  {
                    "name": "21. Verlust an sexuellem Interesse",
                    "variable": "BDI_21",
                    "path": "response.BDI21",
                    "interpretation": "sexualität"
                  },
                  {
                    "name": "Summenscore",
                    "variable": "Score",
                    "path": "calculation.bdi_score.score.score"
                  },
                  {
                    "name": "Interpretation",
                    "variable": "BDI-II",
                    "path": "calculation.bdi_score.score.current_range.interpretation_de"
                  }
              ],
              "interpretations": {
                "mz": [
                  {
                    "value": "1",
                    "text": "Eintritt"
                  },
                  {
                    "value": "2",
                    "text": "Austritt"
                  },
                  {
                    "value": "3",
                    "text": "Anderer Messzeitpunkt"
                  }
                ],
                "traurigkeit": [
                  {
                    "value": "0",
                    "text": "Ich bin nicht traurig"
                  },
                  {
                    "value": "1",
                    "text": "Ich bin oft traurig"
                  },
                  {
                    "value": "2",
                    "text": "Ich bin ständig traurig"
                  },
                  {
                    "value": "3",
                    "text": "Ich bin so traurig oder unglücklich, dass ich es nicht aushalte"
                  }
                ],
                "pessimismus": [
                  {
                    "value": "0",
                    "text": "Ich sehe nicht mutlos in die Zukunft"
                  },
                  {
                    "value": "1",
                    "text": "Ich sehe mutloser in die Zukunft als sonst"
                  },
                  {
                    "value": "2",
                    "text": "Ich bin mutlos und erwarte nicht, dass meine Situation besser wird"
                  },
                  {
                    "value": "3",
                    "text": "Ich glaube, dass meine Zukunft hoffnungslos ist und nur noch schlechter wird"
                  }
                ],
                "versagensgefühle": [
                  {
                    "value": "0",
                    "text": "Ich fühle mich nicht als Versager"
                  },
                  {
                    "value": "1",
                    "text": "Ich habe häufiger Versagensgefühle"
                  },
                  {
                    "value": "2",
                    "text": "Wenn ich zurückblicke, sehe ich eine Menge Fehlschläge"
                  },
                  {
                    "value": "3",
                    "text": "Ich habe das Gefühl, als Mensch ein völliger Versager zu sein"
                  }
                ],
                "verlust_von_freude": [
                  {
                    "value": "0",
                    "text": "Ich kann Dinge genauso gut geniessen wie früher"
                  },
                  {
                    "value": "1",
                    "text": "Ich kann Dinge nicht mehr so geniessen wie früher"
                  },
                  {
                    "value": "2",
                    "text": "Dinge, die mir früher Freude gemacht haben, kann ich kaum mehr geniessen"
                  },
                  {
                    "value": "3",
                    "text": "Dinge, die mir früher Freude gemacht haben, kann ich überhaupt nicht mehr geniessen"
                  }
                ],
                "schuld": [
                  {
                    "value": "0",
                    "text": "Ich habe keine besonderen Schuldgefühle"
                  },
                  {
                    "value": "1",
                    "text": "Ich habe oft Schuldgefühle wegen Dingen, die ich getan habe oder hätte tun sollen"
                  },
                  {
                    "value": "2",
                    "text": "Ich habe die meiste Zeit Schuldgefühle"
                  },
                  {
                    "value": "3",
                    "text": "Ich habe ständig Schuldgefühle"
                  }
                ],
                "bestrafung": [
                  {
                    "value": "0",
                    "text": "Ich habe nicht das Gefühl, für etwas bestraft zu sein"
                  },
                  {
                    "value": "1",
                    "text": "Ich habe das Gefühl, vielleicht bestraft zu werden"
                  },
                  {
                    "value": "2",
                    "text": "Ich erwarte, bestraft zu werden"
                  },
                  {
                    "value": "3",
                    "text": "Ich habe das Gefühl, bestraft zu sein"
                  }
                ],
                "selbstablehnung": [
                  {
                    "value": "0",
                    "text": "Ich halte von mir genauso viel wie immer"
                  },
                  {
                    "value": "1",
                    "text": "Ich habe Vertrauen in mich verloren"
                  },
                  {
                    "value": "2",
                    "text": "Ich bin von mir enttäuscht"
                  },
                  {
                    "value": "3",
                    "text": "Ich lehne mich völlig ab"
                  }
                ],
                "selbstvorwuerfe": [
                  {
                    "value": "0",
                    "text": "Ich kritisiere oder tadle mich nicht mehr als sonst"
                  },
                  {
                    "value": "1",
                    "text": "Ich bin mir gegenüber kritischer als sonst"
                  },
                  {
                    "value": "2",
                    "text": "Ich kritisiere mich für all meine Mängel"
                  },
                  {
                    "value": "3",
                    "text": "Ich gebe mir die Schuld für alles Schlimme, was passiert"
                  }
                ],
                "suizidalitaet": [
                  {
                    "value": "0",
                    "text": "Ich denke nicht daran, mir etwas anzutun"
                  },
                  {
                    "value": "1",
                    "text": "Ich denke manchmal an Selbstmord, aber ich würde es nicht tun"
                  },
                  {
                    "value": "2",
                    "text": "Ich möchte mich am liebsten umbringen"
                  },
                  {
                    "value": "3",
                    "text": "Ich würde mich umbringen, wenn ich die Gelegenheit dazu hätte"
                  }
                ],
                "weinen": [
                  {
                    "value": "0",
                    "text": "Ich weine nicht öfter als früher"
                  },
                  {
                    "value": "1",
                    "text": "Ich weine jetzt mehr als früher"
                  },
                  {
                    "value": "2",
                    "text": "Ich weine beim geringsten Anlass"
                  },
                  {
                    "value": "3",
                    "text": "Ich möchte gern weinen, aber ich kann nicht"
                  }
                ],
                "unruhe": [
                  {
                    "value": "0",
                    "text": "Ich bin nicht unruhiger als sonst"
                  },
                  {
                    "value": "1",
                    "text": "Ich bin unruhiger als sonst"
                  },
                  {
                    "value": "2",
                    "text": "Ich bin so unruhig, dass es mir schwerfällt, stillzusitzen"
                  },
                  {
                    "value": "3",
                    "text": "Ich bin so unruhig, dass ich mich ständig bewege oder etwas tun muss"
                  }
                ],
                "interessenverlust": [
                  {
                    "value": "0",
                    "text": "Ich habe das Interesse an anderen Menschen oder Tätigkeiten nicht verloren"
                  },
                  {
                    "value": "1",
                    "text": "Ich habe weniger Interesse an anderen Menschen oder Dingen als sonst"
                  },
                  {
                    "value": "2",
                    "text": "Ich habe Interesse an anderen Menschen oder Dingen grössten Teils verloren"
                  },
                  {
                    "value": "3",
                    "text": "Es fällt mir schwer, mich überhaupt für etwas zu interessieren"
                  }
                ],
                "entschluss": [
                  {
                    "value": "0",
                    "text": "Ich bin so entschlussfreudig wie immer"
                  },
                  {
                    "value": "1",
                    "text": "Es fällt mir schwerer als sonst, Entscheidungen zu treffen"
                  },
                  {
                    "value": "2",
                    "text": "Es fällt mir sehr viel schwerer als sonst, Entscheidungen zu treffen"
                  },
                  {
                    "value": "3",
                    "text": "Ich habe Mühe, überhaupt Entscheidungen zu treffen"
                  }
                ],
                "wert": [
                  {
                    "value": "0",
                    "text": "Ich fühle mich nicht wertlos"
                  },
                  {
                    "value": "1",
                    "text": "Ich halte mich für weniger wertvoll und nützlich als sonst"
                  },
                  {
                    "value": "2",
                    "text": "Verglichen mit anderen Menschen fühle ich mich viel weniger wert"
                  },
                  {
                    "value": "3",
                    "text": "Ich fühle mich völlig wertlos"
                  }
                ],
                "energieverlust": [
                  {
                    "value": "0",
                    "text": "Ich habe so viel Energie wie immer"
                  },
                  {
                    "value": "1",
                    "text": "Ich habe weniger Energie als sonst"
                  },
                  {
                    "value": "2",
                    "text": "Ich habe so wenig Energie, dass ich kaum noch etwas schaffe"
                  },
                  {
                    "value": "3",
                    "text": "Ich habe keine Energie, um überhaupt noch etwas schaffen"
                  }
                ],
                "schlaf": [
                  {
                    "value": "0",
                    "text": "Meine Schlafgewohnheiten haben sich nicht geändert"
                  },
                  {
                    "value": "1a",
                    "text": "Ich schlafe etwas mehr als sonst"
                  },
                  {
                    "value": "1b",
                    "text": "Ich schlafe etwas weniger als sonst"
                  },
                  {
                    "value": "2a",
                    "text": "Ich schlafe viel mehr als sonst"
                  },
                  {
                    "value": "2b",
                    "text": "Ich schlafe viel weniger als sonst"
                  },
                  {
                    "value": "3a",
                    "text": "Ich schlafe fast den ganzen Tag"
                  },
                  {
                    "value": "3b",
                    "text": "Ich wache 1 - 2 Stunden früher auf als gewöhnlich und kann nicht mehr einschlafen"
                  }
                ],
                "reizbarkeit": [
                  {
                    "value": "0",
                    "text": "Ich bin nicht reizbarer als sonst"
                  },
                  {
                    "value": "1",
                    "text": "Ich bin reizbarer als sonst"
                  },
                  {
                    "value": "2",
                    "text": "Ich bin viel reizbarer als sonst"
                  },
                  {
                    "value": "3",
                    "text": "Ich fühle mich dauernd gereizt"
                  }
                ],
                "appetit": [
                  {
                    "value": "0",
                    "text": "Mein Appetit hat sich nicht verändert"
                  },
                  {
                    "value": "1a",
                    "text": "Mein Appetit ist etwas schlechter als sonst"
                  },
                  {
                    "value": "1b",
                    "text": "Mein Appetit ist etwas grösser als sonst"
                  },
                  {
                    "value": "2a",
                    "text": "Mein Appetit ist viel schlechter als sonst"
                  },
                  {
                    "value": "2b",
                    "text": "Mein Appetit ist viel grösser als sonst"
                  },
                  {
                    "value": "3a",
                    "text": "Ich habe überhaupt keinen Appetit"
                  },
                  {
                    "value": "3b",
                    "text": "Ich habe ständig Hunger"
                  }
                ],
                "konzentration": [
                  {
                    "value": "0",
                    "text": "Ich kann mich so gut konzentrieren wie immer"
                  },
                  {
                    "value": "1",
                    "text": "Ich kann mich nicht mehr so gut konzentrieren wie sonst"
                  },
                  {
                    "value": "2",
                    "text": "Es fällt mir schwer, mich längere Zeit auf irgend etwas zu konzentrieren"
                  },
                  {
                    "value": "3",
                    "text": "Ich kann mich überhaupt nicht mehr konzentrieren"
                  }
                ],
                "ermuedung": [
                  {
                    "value": "0",
                    "text": "Ich fühle mich nicht müder oder erschöpfter als sonst"
                  },
                  {
                    "value": "1",
                    "text": "Ich werde schneller müde oder erschöpft als sonst"
                  },
                  {
                    "value": "2",
                    "text": "Für viele Dinge, die ich üblicherweise tue, bin ich zu müde oder erschöpft"
                  },
                  {
                    "value": "3",
                    "text": "Ich bin so müde oder erschöpft, dass ich fast nichts mehr tun kann"
                  }
                ],
                "sexualität": [
                  {
                    "value": "0",
                    "text": "Mein Interesse an Sexualität hat sich in letzter Zeit nicht verändert"
                  },
                  {
                    "value": "1",
                    "text": "Ich interessiere mich weniger für Sexualität als früher"
                  },
                  {
                    "value": "2",
                    "text": "Ich interessiere mich jetzt viel weniger für Sexualität als früher"
                  },
                  {
                    "value": "3",
                    "text": "Ich habe das Interesse an Sexualität völlig verloren"
                  }
                ]
              }
            }
        }
    },
    methods: {},
    computed: {
        patient_secure() {
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
        },
        pdf_ready() {
            try {
                if ((this.sr_data.length) && (this.current_module)) {
                    // Build PDF
                    var pdf = [];
                    pdf.push(this.pdf_app_info(this.current_module, true));
                    pdf.push(this.bdi_pdf_content(this.sr));
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

            <div v-if="!missings">
                <optinomic-content-block v-if="sr" title="BDI-II" subtitle="Übersicht | Grafik" id="bdi_chart">
                    <optinmic-profile-chart 
                        :options="bdi_chart.options"
                        :scales="bdi_chart.scales" 
                        :ranges="bdi_chart.ranges"
                        :scores="sr">
                    </optinmic-profile-chart>
                </optinomic-content-block>
            </div>


            <optinomic-content-block :subtitle="sr_count_text" title="Datentabelle" id="id_data_table">
                <optinomic-data-table :rows="data_table.rows" :interpretations="data_table.interpretations" :sr="sr_data">
                </optinomic-data-table>
            </optinomic-content-block>

            <div v-if="!missings">
                <optinomic-content-block title="Druckvorlage" subtitle="PDF" id="id_pdf" v-if="pdf_ready">
                    <optinomic-pdfmake :header-left="patient_secure" footer-left="Beck Depressions-Inventar (BDI-II)"
                        header-right="Klinik Südhang" document-title="BDI" :content="pdf_content" hide-logo>
                    </optinomic-pdfmake>
                </optinomic-content-block>
            </div>

        </div>
    `
});
// optinomic-data-table
Vue.component('optinomic-data-table', {
    props: {
        rows: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            headers: [{
                    text: 'Variable',
                    value: 'variable'
                },
                {
                    text: 'Frage | Item',
                    align: 'start',
                    value: 'name',
                }
            ]
        }
    },
    methods: {
        flattenObject: function (ob) {
            var toReturn = {};
            try {
                for (var i in ob) {
                    if (!ob.hasOwnProperty(i)) continue;

                    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
                        var flatObject = this.flattenObject(ob[i]);
                        for (var x in flatObject) {
                            if (!flatObject.hasOwnProperty(x)) continue;
                            toReturn[i + '.' + x] = flatObject[x];
                        }
                    } else {
                        toReturn[i] = ob[i];
                    }
                }
            } catch (e) {
                // Anweisungen für jeden Fehler
                logMyErrors(e); // Fehler-Objekt an die Error-Funktion geben
            }
            return toReturn;
        }
    },
    computed: {
        rows_extended() {
            try {
                var new_rows = this.rows.slice();
                var sr = this.$store.state.sr.data;
                var sr_pushed = -99;

                if ((new_rows.length > 0) && (sr.length > 0)) {
                    sr.forEach(function (item, item_index) {
                        new_rows.forEach(function (row, row_index) {

                            var r_flat = this.flattenObject(item);
                            var computed_variablename = r_flat.event_id + '__measurment';
                            var new_header = {
                                text: formatDateCH(r_flat.date),
                                value: computed_variablename
                            };
                            if (sr_pushed !== item_index) {
                                this.headers.push(new_header);
                                sr_pushed = item_index;
                            };
                            row[computed_variablename] = r_flat[row.path];
                        }.bind(this));
                    }.bind(this));
                };
                return new_rows;
            } catch (e) {
                console.error('rows_extended', e);
                return this.rows;
            }
        }
    },
    template: `
        <div>
            <v-data-table
              :headers="headers"
              :items="rows_extended"
              :items-per-page="rows.length"
              hide-default-footer
              dense
              
            ></v-data-table>
            </optinomic-content-block>
        </div>
    `
});

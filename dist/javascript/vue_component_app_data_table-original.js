// optinomic-data-table
Vue.component('optinomic-data-table', {
    props: {
        rows: {
            type: Array,
            default: []
        },
        interpretations: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            headers: [{
                    text: 'Variable',
                    value: 'variable',
                    width: 20
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
                console.log('flattenObject', e);
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

                            // Interpretation
                            try {
                                if (row.interpretation !== null) {
                                    var current_interpretation = this.interpretations[row.interpretation].slice();

                                    var value = r_flat[row.path];
                                    current_interpretation.forEach(function (i) {
                                        if ((i.value + '') === (value + '')) {
                                            value = i.value + ', ' + i.text;    
                                        };
                                    }.bind(this));
                                    row[computed_variablename] = value;
                                };
                            } catch (e) {
                                row[computed_variablename] = r_flat[row.path];
                            };

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
            >
                <template v-slot:item.variable="{ item }">
                <kbd v-text="item.variable">v</kbd>

                </template>
            </v-data-table>
            </optinomic-content-block>
        </div>
    `
});
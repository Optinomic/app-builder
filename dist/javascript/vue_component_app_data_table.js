Vue.component("optinomic-data-table",{props:{rows:{type:Array,default:[]}},data:()=>({headers:[{text:"Variable",value:"variable"},{text:"Frage | Item",align:"start",value:"name"}]}),methods:{flattenObject:function(ob){var toReturn={};try{for(var i in ob)if(ob.hasOwnProperty(i))if("object"==typeof ob[i]&&null!==ob[i]){var flatObject=this.flattenObject(ob[i]);for(var x in flatObject)flatObject.hasOwnProperty(x)&&(toReturn[i+"."+x]=flatObject[x])}else toReturn[i]=ob[i]}catch(e){logMyErrors(e)}return toReturn}},computed:{rows_extended(){try{var new_rows=this.rows.slice(),sr=this.$store.state.sr.data,sr_pushed=-99;return new_rows.length>0&&sr.length>0&&sr.forEach(function(item,item_index){new_rows.forEach(function(row,row_index){var r_flat=this.flattenObject(item),computed_variablename=r_flat.event_id+"__measurment",new_header={text:formatDateCH(r_flat.date),value:computed_variablename};sr_pushed!==item_index&&(this.headers.push(new_header),sr_pushed=item_index),row[computed_variablename]=r_flat[row.path]}.bind(this))}.bind(this)),new_rows}catch(e){return console.error("rows_extended",e),this.rows}}},template:'\n        <div>\n            <v-data-table\n              :headers="headers"\n              :items="rows_extended"\n              :items-per-page="rows.length"\n              hide-default-footer\n              dense\n            ></v-data-table>\n            </optinomic-content-block>\n        </div>\n    '});
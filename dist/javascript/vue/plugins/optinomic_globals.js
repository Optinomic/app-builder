const optinomic_globals={install(Vue,options){Vue.mixin({methods:{getDateCH:function(date,full){var dateObj=new Date(date),o={};return o=!0===full?{weekday:"long",year:"numeric",month:"long",day:"numeric"}:{year:"numeric",month:"numeric",day:"numeric"},dateObj.toLocaleDateString("de-DE",o)}},computed:{sr(){try{return this.$store.state.data_apps.data_object[this.identifier]}catch(e){return null}},sr_data(){try{return this.sr.data}catch(e){return[]}},missings(){try{var d=this.$store.state.data_apps.data_object[this.identifier];if(null===d)return!1;var data_errors=!1;return d.data.forEach(function(item){!1===item.all_found&&(data_errors=!0)}.bind(this)),data_errors}catch(e){return!1}},current_module(){try{return this.$store.state.current_app.module}catch(e){return null}}}})}};Vue.use(optinomic_globals);
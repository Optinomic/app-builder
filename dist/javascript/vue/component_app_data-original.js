// Optinomic App-data
Vue.component('app-data', {
    props: {
        identifier: {
            type: String,
            default: helpers.getAppID()
        }
    },
    created() {},
    computed: {
        app_loading() {
            try {
                if (this.$store.state.data_apps.data_object[this.identifier]) {
                    return false;
                } else {
                    return true;    
                };
            } catch (e) {
                return true;
            };
        },
        app_have_data() {
            try {
                if (this.$store.state.data_apps.data_object[this.identifier].data.length > 0) {
                    return true;
                } else {
                    return false;    
                };
                return ;
            } catch (e) {
                return false;
            };
        },
    },
    methods: {},
    template: `
        <template>
            <div v-if="app_loading">
                <v-skeleton-loader
                    class="mx-auto"
                    type="card"
                ></v-skeleton-loader>
            </div>
            <div v-else>
                <div v-if="app_have_data">
                    <slot></slot>    
                </div>
                <div v-else>
                    <v-alert prominent text type="info">
                        Es sind keine Messdaten vorhanden.
                    </v-alert>
                </div>
            </div>
        </template>
    `
});
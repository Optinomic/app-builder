// Optinomic optinomic-toc
Vue.component('optinomic-toc', {
    props: {},
    computed: {
        toc_data() {
            // return data
            try {
                //console.log('TOC', this.$store.state.table_of_contents);
                return this.$store.state.table_of_contents;
            } catch (e) {
                return [];
            };
        }
    },
    template: `
        <div class="d-flex flex-row justify-start">
            <div class="mb-12 mt-2">
                <div class="ml-5 mb-2">
                    <p class="overline" style="color:#8b0042">Table of Contents</p>
                    <h2 class="headline font-weight-light text--secondary" style="margin-top:-22px">Inhaltsverzeichnis</h2>
                </div>
                <p class="d-flex flex-row align-top" v-for="item in toc_data" :key="item.id" style="margin:0">
                    <span class="body-1 font-weight-black" style="color:#8b0042">-</span>
                    <a style="color:#212121" class="ml-3" @click="$vuetify.goTo('#'+item.id)">
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <span v-on="on" class="body-1 font-weight-light" v-text="item.title"></span>
                            </template>
                            <span class="caption mx-1" v-text="item.subtitle"></span>
                        </v-tooltip>
                    </a>
                </p>
            </div>
        
        </div>
    `
});
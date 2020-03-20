// optinomic-content-block
Vue.component('optinomic-content-block', {
    props: {
        title: {
            type: String,
            default: "Optinomic"
        },
        subtitle: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: "id_undefined"
        },
        toc_pushed: {
            type: Boolean,
            default: false
        }
    },
    created(){
        if (this.toc_pushed === false) {
            var toc = this.$store.state.table_of_contents.slice(0);
            var toc_entry = {
                title: this.title,
                subtitle: this.subtitle,
                id: this.id
            };
            toc.push(toc_entry);
            this.toc_pushed = true;

            this.$store.commit({
                type: 'saveData',
                root: 'table_of_contents',
                data: toc
            });
            // console.log("table_ofcontents", toc);
        };
    },
    computed: {
    },
    template: `
        <div class="mt-12 mb-4" :id="id">
            <div class="d-flex flex-row justify-space-between align-end">
                <div>
                    <p class="overline" style="margin-left:1px;color:#8b0042" v-html="subtitle"></p>
                    <h2 class="headline font-weight-light text--secondary" v-html="title" style="margin-top:-16px"></h2>
                </div>
                <div>
                    <v-btn icon x-small color="grey" @click="$vuetify.goTo('#top')">
                        <v-icon dark>mdi-arrow-up</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="mt-6 mb-4">
                <slot></slot>
            </div>
        </div>
    `
});
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
        show_in_toc: {
            type: Boolean,
            default: true
        },
        bold: {
            type: Boolean,
            default: false
        }
    },
    created() {
        // Push to table_of_contents if needed.
        if (this.show_in_toc === true) {
            var toc = this.$store.state.table_of_contents.slice(0);
            var toc_entry = {
                title: this.title,
                subtitle: this.subtitle,
                id: this.id
            };
            var have_to_push = true;
            toc.forEach(function (item) {
                if (item.id === this.id) {
                    have_to_push = false;
                };
            }.bind(this));

            if (have_to_push) {
                toc.push(toc_entry);

                this.$store.commit({
                    type: 'saveData',
                    root: 'table_of_contents',
                    data: toc
                });
            };
        };
    },
    template: `
        <div class="mb-6 pt-8" :id="id">
            <v-divider class="mb-6 pt-8 mt-12" v-if="bold"></v-divider>
            <div class="d-flex flex-row justify-space-between align-end">
                <div v-if="bold">
                    <h2 class="display-1 font-weight-medium" v-html="title" style="margin-top:-16px"></h2>
                    <p class="overline" style="margin-left:1px;color:#8b0042" v-html="subtitle"></p>
                </div>
                <div v-else>
                    <p class="overline" style="margin-left:1px;color:#8b0042" v-html="subtitle"></p>
                    <h2 class="headline font-weight-light text--secondary" v-html="title" style="margin-top:-16px"></h2>
                </div>
                <div>
                    <v-btn icon x-small color="#8b0042" @click="$vuetify.goTo('#top')">
                        <v-icon dark>mdi-arrow-up</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-divider v-if="!bold"></v-divider>
            <div class="mt-6 mb-4">
                <slot></slot>
            </div>
        </div>
    `
});
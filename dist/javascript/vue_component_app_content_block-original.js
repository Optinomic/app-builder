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
        }
    },
    created(){
    },
    computed: {
    },
    template: `
        <div class="mt-10 mb-10" :id="id">
            <p class="overline" style="margin-left:1px" v-html="subtitle"></p>
            <h2 class="headline font-weight-light text--secondary" v-html="title" style="margin-top:-22px;color:#8b0042"></h2>
            <v-divider></v-divider>
            <div class="mt-4 mb-4">
                <slot></slot>
            </div>
        </div>
    `
});

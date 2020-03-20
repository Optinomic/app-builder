Vue.component("optinomic-content-block",{props:{title:{type:String,default:"Optinomic"},subtitle:{type:String,default:""},id:{type:String,default:"id_undefined"}},created(){},computed:{},template:'\n        <div class="mt-10 mb-10" :id="id">\n            <p class="overline" style="margin-left:1px;color:#8b0042" v-html="subtitle"></p>\n            <h2 class="headline font-weight-light text--secondary" v-html="title" style="margin-top:-22px"></h2>\n            <v-divider></v-divider>\n            <div class="mt-4 mb-4">\n                <slot></slot>\n            </div>\n        </div>\n    '});
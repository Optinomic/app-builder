// optinomic-clipboard-text
Vue.component('optinomic-clipboard-text', {
    props: {
        text: {
            type: String,
            default: ""
        }
    },
    data: () => ({
        snackbar: false,
        alert_text: '',
        alert_color: 'error',
        timeout: 2000,
    }),
    methods: {
        copyClipboard() {
            try {
                let textToCopy = document.querySelector('#clipboard-text')
                textToCopy.setAttribute('type', 'text')
                textToCopy.select()

                var successful = document.execCommand('copy');
                if (successful) {
                    this.alert_text = '✓ Erfolgreich in die Zwischenablage kopiert.';
                    this.alert_color = 'success';
                } else {
                    this.alert_text = 'Oops, der Text konnte nicht in die Zwischenablage kopiert werden.';
                };

                /* unselect the range */
                textToCopy.setAttribute('type', 'hidden')
                window.getSelection().removeAllRanges()
            } catch (err) {
                this.alert_text = "Oops, kopieren in die Zwischenablage ist nicht möglich.";
            }
            this.snackbar = true;
        },
    },
    computed: {},
    template: `
        <div>
            <v-tooltip left>
                <template v-slot:activator="{ on }">
                    <span v-on="on" style="float:right;">
                        <v-btn @click="copyClipboard" icon color="indigo">
                            <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                    </span>
                </template>
                <span>Kopiere in die Zwischenablage.</span>
            </v-tooltip>

            <p class="text--primary body-1" v-text="text">optinomic-clipboard-text</p>

            <input type="hidden" id="clipboard-text" :value="text">

            <v-snackbar v-model="snackbar" :timeout="timeout" :color="alert_color">
                <span v-text="alert_text"></span>
            </v-snackbar>
        </div>
    `
});
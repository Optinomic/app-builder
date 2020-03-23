// Optinomic | <pdf-auswertung-gesamt>
Vue.component('pdf-auswertung-gesamt', {
    props: {
        production: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        "name": "Fallkonferenz",
        "title": "Fragebogenauswertung",
        "subtitle": "Eine Übersicht der wichtigsten Ergebnisse und Auswertungen.",
        "data_apps" : {
            "production": [{
                "name": "actinfo_ein",
                "app_id": "ch.suedhang.apps.actinfo_ein.production"
            }, {
                "name": "actinfo_aus",
                "app_id": "ch.suedhang.apps.actinfo_aus.production"
            }, {
                "name": "tmt",
                "app_id": "ch.suedhang.apps.tmt.production"
            }, {
                "name": "asrs",
                "app_id": "ch.suedhang.apps.asrs.production"
            }, {
                "name": "aase",
                "app_id": "ch.suedhang.apps.aase-g.production"
            }, {
                "name": "bscl",
                "app_id": "ch.suedhang.apps.bscl_anq.production"
            }, {
                "name": "bdi",
                "app_id": "ch.suedhang.apps.bdi.production"
            }, {
                "name": "isk",
                "app_id": "ch.suedhang.apps.isk.production"
            }, {
                "name": "sci",
                "app_id": "ch.suedhang.apps.sci.production"
            }, {
                "name": "whoqol",
                "app_id": "ch.suedhang.apps.whoqol.production"
            }, {
                "name": "rs13",
                "app_id": "ch.suedhang.apps.rs13.production"
            }]
        }
    }),
    computed: {},
    methods: {
        doSomething() {
            try {

            } catch (err) {
                console.error('doSomething', err);
            }
        },
    },
    created() {
        this.$store.dispatch('getApps');
    },
    template: `
        <p>Clinic Info</p>
    `
});
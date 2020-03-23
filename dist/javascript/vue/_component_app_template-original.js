// Optinomic | <pdf-auswertung-gesamt>
Vue.component('pdf-auswertung-gesamt', {
    props: {
        rows: {
            type: Array,
            default: []
        }
    },
    data: () => ({
        "name": "Fallkonferenz",
        "title": "Fragebogenauswertung",
        "subtitle": "Eine Übersicht der wichtigsten Ergebnisse und Auswertungen."
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
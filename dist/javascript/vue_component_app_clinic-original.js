// Optinomic app-clinic
Vue.component('app-clinic', {
    props: {
    },
    created(){
        this.$store.dispatch('getApps');
    },
    computed: {
    },
    template: `
        <p>Clinic Info</p>
    `
});
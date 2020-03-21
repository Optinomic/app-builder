class optinomicTemplate extends Polymer.mixinBehaviors([
    opappBehavior
], ReduxBehavior(Polymer.Element)) {

    static get is() {
        return 'optinomic-template';
    }

    static get actions() {
        return AsyncActionsBehavior.actions;
    }

    // Properties
    static get properties() {
        return {

        };
    }

    // --------------- Functions ---------------

    _showStart() {
        this._showExtras(false);
        this.set('_app_state', 'start');
    }

    _showFilter() {
        this._showExtras(true);
        this.set('_app_state', 'filter');
    }

    _showSettings() {
        this._showExtras(true);
        this.set('_app_state', 'settings');
    }

    _showExtras(should) {

        var h = window.innerHeight;
        var top = 96;
        var top_px = top + 'px';
        var bottom = h - top;
        var bottom_px = bottom + 'px';
        console.log(h, top_px, bottom_px);

        if (should) {
            this.updateStyles({
                '--right-top-height': top_px,
                '--right-bottom-height': bottom_px
            });
        } else {
            this.updateStyles({
                '--right-top-height': '100%',
                '--right-bottom-height': '0%'
            });
        };

    }

    // --------------- Events ---------------

    _some_event(e) {
        console.warn('_some_event', e.detail);
    }


    // --------------- Lifecycle ---------------

    _init() {

        console.warn('_init :: Example');
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();

        Polymer.RenderStatus.afterNextRender(this, function () {
            this._init();
        });
    }
}

window.customElements.define(optinomicTemplate.is, optinomicTemplate);
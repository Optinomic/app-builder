Polymer({
    is: 'svg-container',

    attached: function () {
        for (var i = 0; i < this.attributes.length; i++) {
            this.$.svg.setAttribute(Polymer.CaseMap.dashToCamelCase(this.attributes[i].name), this
                .attributes[i].value);
        }
    }
});

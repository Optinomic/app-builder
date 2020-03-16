Polymer({

    is: 'optinomic-chart-profile',

    behaviors: [Polymer.IronResizableBehavior],

    listeners: {
        'iron-resize': '__onIronResize'
    },

    properties: {
        language: {
            type: String,
            value: 'de'
        },
        options: {
            type: Object,
            observer: 'onInit'
        },
        start: {
            type: Object,
            observer: 'onInit'
        },
        scales: {
            type: Object,
            observer: 'onInit'
        },
        scores: {
            type: Object,
            observer: 'onInit'
        },
        ranges: {
            type: Object,
            observer: 'onInit'
        },
        clinic_samples: {
            type: Object,
            observer: 'onInit'
        },
        clinic_sample_dive: {
            type: Array,
            notify: true,
            observer: 'onInit'
        },
        _clinic_sample_profiles: {
            type: Array,
            notify: true
        }
    },


    __translate: function (given_language) {
        var t = {
            "language": given_language
        };

        if (given_language === 'de') {
            t.to = "bis";
        } else {
            t.to = "to";
        };

        if (given_language === 'de') {
            t.measurements = "Messung";
        } else {
            t.measurements = "Measurement";
        };

        if (given_language === 'de') {
            t.clinic_sample = "Klinikstichprobe";
        } else {
            t.clinic_sample = "Clinical sample";
        };

        if (given_language === 'de') {
            t.norm_sample = "Normstichprobe";
        } else {
            t.norm_sample = "Norm sample";
        };

        if (given_language === 'de') {
            t.ranges = "Interpretation";
        } else {
            t.ranges = "Ranges";
        };

        this.t = t;

        // console.log('__translate (t):', this.t);
    },

    __init: function () {
        // start @ Properties
        this.start = this.start === undefined ? null : this.start;

        // Scales @ Properties
        this.scales = this.scales === undefined ? [] : this.scales;

        // Ranges @ Properties
        this.ranges = this.ranges === undefined ? [] : this.ranges;


        // Scores @ Properties
        this.scores = this.scores === undefined ? {} : this.scores;

        // clinic_samples @ Properties
        this.clinic_samples = this.clinic_samples === undefined ? {
            "empty": true
        } : this.clinic_samples;

        var init_dive_path = [];
        if ('dimensions' in this.clinic_samples) {
            this.clinic_samples.dimensions.forEach(function (dim, dimID) {
                init_dive_path.push(dim.array.length - 1);
            });
        };

        this.clinic_sample_dive = this.clinic_sample_dive === undefined ? init_dive_path : this
            .clinic_sample_dive;

        // Options @ Properties
        var d = this.options === undefined ? {} : this.options;
        d.color_grid = d.color_grid === undefined ? "#795548" : d.color_grid;
        d.topnumber_hide_first_last = d.topnumber_hide_first_last === undefined ? false : d
            .topnumber_hide_first_last;

        d.color_grid_baseline = d.color_grid_baseline === undefined ? hexToRGB(d.color_grid, 0.4) :
            d.color_grid_baseline;
        d.color_clinic_sample = d.color_clinic_sample === undefined ? "#673AB7" : d
            .color_clinic_sample;

        d.show_baseline = d.show_baseline === undefined ? false : d.show_baseline;
        d.show_score_vertical_line = d.show_score_vertical_line === undefined ? false : d
            .show_score_vertical_line;
        d.show_score_profile_line = d.show_score_profile_line === undefined ? true : d
            .show_score_profile_line;
        d.show_score_circles = d.show_score_circles === undefined ? true : d.show_score_circles;

        d.show_scale_text = d.show_scale_text === undefined ? false : d.show_scale_text;

        d.show_settings_block = d.show_settings_block === undefined ? false : d.show_settings_block;
        d.show_ranges_overview = d.show_ranges_overview === undefined ? true : d
            .show_ranges_overview;


        d.allow_toggle_settings_block = d.allow_toggle_settings_block === undefined ? true : d
            .allow_toggle_settings_block;

        d.item_height = d.item_height === undefined ? 50 : d.item_height;
        d.item_text_left = d.item_text_left === undefined ? 120 : d.item_text_left;
        d.item_text_left_show = true;
        if (d.item_text_left === 0) {
            d.item_text_left_show = false;
        };
        d.item_text_right = d.item_text_right === undefined ? 120 : d.item_text_right;
        d.item_text_right_show = true;
        if (d.item_text_right === 0) {
            d.item_text_right_show = false;
        };

        // Legende Minimum links
        if (d.item_text_left <= 62) {
            d.legend_left = 62;
        } else {
            d.legend_left = d.item_text_left;
        };


        d.response_title_path = d.response_title_path === undefined ? null : d.response_title_path;
        d.response_date_path = d.response_date_path === undefined ? null : d.response_date_path;
        d.min = d.min === undefined ? "auto" : d.min;
        d.max = d.max === undefined ? "auto" : d.max;
        d.range_alpha = d.range_alpha === undefined ? 0.1 : d.range_alpha;
        d.vertical_grid_every_x = d.vertical_grid_every_x === undefined ? 1 : d
            .vertical_grid_every_x;

        d.ranges_available = false;
        if (this.ranges.length > 0) {
            d.ranges_available = true;
        };

        if ("norm_sample" in d) {
            d.norm_sample_defined = true;
        } else {
            d.norm_sample_defined = false;
        };


        // Resize
        d.wide = true;
        d.wide_breakpoint = d.wide_breakpoint === undefined ? 520 : d.wide_breakpoint;

        // Grafic Size
        d.grafic_top_space = 20;
        d.grafic_width = d.grafic_width === undefined ? 480 : d.grafic_width;
        d.grafic_margin_left = d.item_text_left;
        d.grafic_margin_right = d.item_text_right;
        d.grafic_text_visibility = 'hidden';
        d.grafic_height = d.item_height * (this.scales.length) + d.grafic_top_space + 1;

        // Tabs
        d.tab_selected = 0;

        // Color Skin
        d.color_skin = d.color_skin === undefined ? 'default' : d.color_skin;

        // console.log('(✓) Options', d);

        // Set Data
        this.set('d', d);
    },

    __setScales: function (full) {
        full = full === undefined ? true : false;
        var d = this.get('d');
        var scales = this.get('scales');
        var scores = this.get('scores.data');

        __getScorePath = function (current_score, path) {
            var data_dive = JSON.parse(JSON.stringify(current_score));
            var dots_count = (path.split(".").length - 1);

            if (dots_count === 0) {
                return data_dive[path]
            };

            var dive = [];
            for (i = 0; i < dots_count; i++) {
                var n = path.indexOf(".");
                var item = path.substring(0, n);
                path = path.substring(n + 1, path.length);
                dive.push(item);
                if (i === dots_count - 1) {
                    dive.push(path);
                };
            };

            var return_value = null;

            //console.log('__getScorePath', data_dive, dive);

            for (i = 0; i < dive.length; i++) {
                data_dive = data_dive[dive[i]];
                if (i === dots_count) {
                    return_value = data_dive;

                    return return_value;
                };
            };
        };

        if ((scales !== undefined) && (scales !== null)) {
            scales.forEach(function (scale, scaleID) {
                scale.id = scaleID;
                scale.id_left_text = scaleID + "_left_text";
                scale.id_right_text = scaleID + "_right_text";;
                scale.topline = scaleID * d.item_height + d.grafic_top_space;
                scale.baseline = scale.topline + (d.item_height / 2);
                scale.bottomline = scale.topline + d.item_height;

                scale.first = false;
                if (scaleID === 0) {
                    scale.first = true;
                };

                scale.last = false;
                if (scaleID === scales.length - 1) {
                    scale.last = true;
                };

                scale.scores = [];

                if ((scores !== undefined) && (scores !== null)) {
                    scores.forEach(function (score, scoreID) {
                        var score_obj = {
                            "value": null,
                            "dropout_is": false,
                            "dropout_reason": ""
                        };

                        // Get Values
                        if (scale.score_path) {
                            score_obj.value = this.__getScorePath(score, scale
                                .score_path);
                        };

                        if (d.response_title_path) {
                            score_obj.title = this.__getScorePath(score, d
                                .response_title_path);
                        } else {
                            score_obj.title = 'Unbekannt'
                        };

                        if (d.response_date_path) {
                            score_obj.date = this.__getScorePath(score, d
                                .response_date_path);
                        } else {
                            score_obj.date = null
                        };

                        if ("dropout" in d) {
                            if (d.dropout) {
                                if (this.__getScorePath(score, d.dropout) ===
                                    true) {
                                    score_obj.dropout_is = true;
                                    score_obj.dropout_reason = this.__getScorePath(
                                        score, d.dropout_reason);
                                };
                            };
                        };

                        scale.scores.push(score_obj);
                    });
                };
            });
        };

        // Auto Min/Max
        var do_min = false;
        if ((d.min === 'auto') || (d.min === undefined)) {
            do_min = true;
        } else {
            item_min = parseInt(d.min);
            this.set('d.item_min', item_min);
        };

        var do_max = false;
        if ((d.max === 'auto') || (d.max === undefined)) {
            do_max = true;
        } else {
            item_max = parseInt(d.max);
            this.set('d.item_max', item_max);
        };

        if (do_max || do_min) {
            var min_max = __autoMinMax(do_min, do_max, d, this.scales);
            this.set('d.item_min', min_max.item_min);
            this.set('d.item_max', min_max.item_max);
        };

        // Set Data
        this.set('scales_set', true);

        // console.log('(✓) Scales', this.scales); Follow the white Rabbit
        if (full) {
            this.__setRanges();
            this.__setVerticalGrid();
            this.__setScoreProfiles();
        };
    },

    __setVerticalGrid: function () {

        var d = this.get('d');
        var every = d.vertical_grid_every_x;
        var every_counter = 0;

        vGrid = [];
        for (i = d.item_min; i < d.item_max + 1; i++) {
            every_counter = every_counter + 1;

            var grid_object = {
                "count": i - d.item_min,
                "value": i,
                "x": __getXPos(d.item_min, d.item_max, d.grafic_width, i),
                "y1": d.grafic_top_space,
                "y2": d.grafic_height - 1,
                "zero": false,
                "first": false,
                "last": false,
                "first_last": false
            };

            if (i === 0) {
                grid_object.zero = true;
            };

            if ((i - d.item_min) === 0) {
                grid_object.first = true;
            };

            if ((i - d.item_max) === 0) {
                grid_object.last = true;
            };

            if (grid_object.first || grid_object.last) {
                grid_object.first_last = true;
            };

            if ((every_counter === every) || (i === d.item_min) || (i === d.item_max) || (i ===
                    0)) {
                vGrid.push(grid_object);
                every_counter = 0;
            };
        };

        // Set Data
        this.set('verticalGrid', vGrid);
        // console.log('(✓) vGrid', this.verticalGrid, this.d);
    },

    __setRanges: function () {
        var ranges = JSON.parse(JSON.stringify(this.get('ranges')));
        var d = this.get('d');
        var t = this.get('t');

        if (ranges.length > 0) {

            ranges.forEach(function (range, rangeID) {
                range.id = rangeID;
                range.color_bg = hexToRGB(range.color, 0.1);
                range.rgb = hexToRGB(range.color, d.range_alpha);
                range.show = range.show === undefined ?
                    true :
                    range.show;


                range.from_to = "";
                range.start = range.range_start;
                range.stop = range.range_stop;

                if (range.range_start === -999) {
                    range.start = d.item_min;
                    range.from_to = "<=";
                } else {
                    range.from_to = ">" + range.start + " " + t.to + " ";
                };

                if (range.range_stop === 999) {
                    range.stop = d.item_max;
                    range.from_to = ">=" + range.start;
                } else {
                    range.from_to = range.from_to + range.stop;
                };

                if (rangeID === ranges.length - 1) {
                    range.last = true;
                } else {
                    range.last = false;
                };



                range.start_pos = __getXPos(d.item_min, d.item_max, d.grafic_width, range
                    .start);
                range.stop_pos = __getXPos(d.item_min, d.item_max, d.grafic_width, range
                    .stop);

                range.width = range.stop_pos - range.start_pos;
                range.x = __getXPos(d.item_min, d.item_max, d.grafic_width, range.start);
                range.y = d.grafic_top_space;

                range.height = d.grafic_height - d.grafic_top_space - 1;

                range.line_x_left = range.x + 1;
                range.line_x_right = range.x + range.width - 1;
                range.line_y1 = d.grafic_top_space;
                range.line_y2 = d.grafic_height - 1;
                range.line_color = hexToRGB(range.color, (d.range_alpha * 2));
            });

            // Set Data
            this.set('ranges', ranges);
            // console.log('(✓) Ranges', this.ranges);
        };
    },

    __setScoreProfiles: function () {

        var d = this.get('d');
        var ranges = this.get('ranges');
        var scales = this.get('scales');

        var my_min = d.item_min;
        var my_max = d.item_max;
        var my_100 = d.grafic_width;

        var scores_points = [];
        var scores_lines = [];
        scales.forEach(function (scale, scaleID) {
            scale.scores.forEach(function (score, scoreID) {

                score.value_x = __getXPos(my_min, my_max, my_100, score.value);
                score.value_y = scale.baseline;

                var my_color = getColor(scoreID, d.color_skin);

                var score_obj = {
                    "id": scoreID,
                    "title": score.title,
                    "date": formatDateCH(score.date),
                    "points": [],
                    "lines": [],
                    "points_str": "",
                    "color": my_color,
                    "color_line": hexToRGB(my_color, 0.8),
                    "color_rgb": hexToRGB(my_color, 0.1),
                    "dropout_is": score.dropout_is,
                    "dropout_reason": score.dropout_reason
                };

                if ("show" in score) {
                    score_obj.show = score.show;
                    console.error(score);
                } else {
                    score_obj.show = true;
                };

                if (score.dropout_is) {
                    score_obj.show = false;
                };


                var points_obj = {
                    "value": score.value,
                    "x": score.value_x,
                    "y": score.value_y,
                    "stroke": my_color,
                    "fill": "white"
                };

                var line_obj = {
                    "y1": scale.topline,
                    "y2": scale.bottomline,
                    "x": score.value_x
                };

                // Einfärben der Circles
                if (ranges.length > 0) {
                    ranges.forEach(function (range, rangeID) {

                        if (score.value_x >= range.start_pos && score
                            .value_x <= range.stop_pos) {
                            points_obj.fill = range.color;
                        }

                    });
                };

                scores_points[scoreID] = scores_points[scoreID] === undefined ?
                    score_obj : scores_points[scoreID];
                scores_points[scoreID].points.push(points_obj);
                scores_points[scoreID].points_str = scores_points[scoreID]
                    .points_str + score.value_x + ',' + score.value_y + ' ';

                scores_lines[scoreID] = scores_lines[scoreID] === undefined ?
                    score_obj : scores_lines[scoreID];
                scores_lines[scoreID].lines.push(line_obj);

            });
        });

        this.set('_score_profiles', scores_points);
        // console.log('(✓) score_profiles', this._score_profiles);
    },

    __csChanged: function (e) {

        var d = this.get('d');
        var scales = this.get('scales');

        if (e !== undefined) {
            if (e.detail !== undefined) {
                var clinic_sample_name = e.detail;
            } else {
                var clinic_sample_name = 'AUTO';
            };
        };

        var clinic_sample_data = this.get('clinic_sample_data');
        var clinic_sample_profiles = [];
        // var clinic_sample_profiles = clinic_sample_profiles === undefined ?[] : clinic_sample_profiles;
        var clone_clinic_sample_profiles = JSON.parse(JSON.stringify(clinic_sample_profiles));

        var my_min = d.item_min;
        var my_max = d.item_max;
        var my_100 = d.grafic_width;

        var abstand = d.item_height / 5;

        var scores_points_min = [];
        var scores_points_max = [];
        var scores_points_mean = [];

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ?
                    -1 :
                    ((x > y) ?
                        1 :
                        0));
            });
        };

        clone_clinic_sample_profiles.forEach(function (cs, csID) {
            cs.show = false;
        });

        scales.forEach(function (scale, scaleID) {
            var data = clinic_sample_data[scale.clinic_sample_var];
            scale.clinic_sample_min = data['mean_1sd_min'];
            scale.clinic_sample_max = data['mean_1sd_plus'];
            scale.clinic_sample_mean = data['mean'];

            if (clinic_sample_name.indexOf("(N=") === -1) {
                clinic_sample_name = e.detail + " (N=" + data['n'] + ")";
            };

            var points_obj_min = {};
            var points_obj_max = {};
            var points_obj_mean = {};

            if (scaleID === 0) {
                points_obj_min = {
                    "value": scale.clinic_sample_min,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_min),
                    "y": scale.topline,
                    "scaleID": scaleID
                };
                points_obj_max = {
                    "value": scale.clinic_sample_max,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_max),
                    "y": scale.topline,
                    "scaleID": 999.5 - scaleID
                };
                points_obj_mean = {
                    "value": scale.clinic_sample_mean,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_mean),
                    "y": scale.topline,
                    "scaleID": scaleID
                };
            } else {
                points_obj_min = {
                    "value": scale.clinic_sample_min,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_min),
                    "y": scale.topline + abstand,
                    "scaleID": scaleID
                };
                points_obj_max = {
                    "value": scale.clinic_sample_max,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_max),
                    "y": scale.topline + abstand,
                    "scaleID": 999.5 - scaleID
                };
                points_obj_mean = {
                    "value": scale.clinic_sample_mean,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_mean),
                    "y": scale.topline + abstand,
                    "scaleID": scaleID
                };
            };
            scores_points_min.push(points_obj_min);
            scores_points_max.push(points_obj_max);
            scores_points_mean.push(points_obj_mean);

            if (scaleID === scales.length - 1) {
                points_obj_min = {
                    "value": scale.clinic_sample_min,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_min),
                    "y": scale.bottomline,
                    "scaleID": scaleID
                };
                points_obj_max = {
                    "value": scale.clinic_sample_max,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_max),
                    "y": scale.bottomline,
                    "scaleID": 999 - scaleID
                };
                points_obj_mean = {
                    "value": scale.clinic_sample_mean,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_mean),
                    "y": scale.bottomline,
                    "scaleID": scaleID
                };
            } else {
                points_obj_min = {
                    "value": scale.clinic_sample_min,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_min),
                    "y": scale.bottomline - abstand,
                    "scaleID": scaleID
                };
                points_obj_max = {
                    "value": scale.clinic_sample_max,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_max),
                    "y": scale.bottomline - abstand,
                    "scaleID": 999 - scaleID
                };
                points_obj_mean = {
                    "value": scale.clinic_sample_mean,
                    "x": __getXPos(my_min, my_max, my_100, scale.clinic_sample_mean),
                    "y": scale.bottomline - abstand,
                    "scaleID": scaleID
                };
            };
            scores_points_min.push(points_obj_min);
            scores_points_max.push(points_obj_max);
            scores_points_mean.push(points_obj_mean);

        });
        this.set('scales', scales);

        var cs_profile = {
            "name": clinic_sample_name,
            "show": true,
            "color": d.color_clinic_sample,
            "color_bg": hexToRGB(d.color_clinic_sample, 0.1),
            "color_profile": hexToRGB(d.color_clinic_sample, 0.3),
            "color_line": hexToRGB(d.color_clinic_sample, 0.8),
            "color_line_mean": hexToRGB('#FFFFFF', 0.5)
        };
        cs_profile.points_str = "";
        cs_profile.points_str_min = "";
        cs_profile.points_str_max = "";
        cs_profile.points_str_mean = "";
        scores_points_min.forEach(function (p, pID) {
            cs_profile.points_str = cs_profile.points_str + p.x + "," + p.y + " ";
            cs_profile.points_str_min = cs_profile.points_str_min + p.x + "," + p.y + " ";
        });
        scores_points_max = sortByKey(scores_points_max, 'scaleID');
        scores_points_max.forEach(function (p, pID) {
            cs_profile.points_str = cs_profile.points_str + p.x + "," + p.y + " ";
            cs_profile.points_str_max = cs_profile.points_str_max + p.x + "," + p.y + " ";
        });
        scores_points_mean.forEach(function (p, pID) {
            cs_profile.points_str_mean = cs_profile.points_str_mean + p.x + "," + p.y + " ";
        });

        clone_clinic_sample_profiles.push(cs_profile);
        this.set('_clinic_sample_profiles', clone_clinic_sample_profiles);

        var cs = {
            "available": false,
            "name": ""
        };

        if (clone_clinic_sample_profiles.length > 0) {
            cs.name = clone_clinic_sample_profiles[0].name;
            cs.available = true;
        };
        this.set('cs', cs);
        // console.log('YEAAAAHHH: __csChanged to', clinic_sample_data, this._clinic_sample_profiles, cs);
    },

    __refreshChart: function () {

        var myNode = document.getElementById("svg_grafic");
        myNode.innerHTML = '';
        myNode.appendChild(this.myProfiles);

        this.$.all_repeat.render();
    },

    __resizeGrafic: function (follow) {

        follow = follow === undefined ?
            true :
            false;

        var d = this.get('d');
        d.wide = d.wide === undefined ? true : d.wide;

        var full_width = this.$.svg_grafic.offsetWidth;

        //console.error('full_width', full_width); this.set('d.grafic_width', 480);

        if (d.wide) {
            this.set('d.grafic_width', full_width - (this.d.grafic_margin_left + this.d
                .grafic_margin_right));
            this.set('d.grafic_text_visibility', 'visible');

            this.customStyle['--grafic-margin-left'] = this.d.grafic_margin_left + 'px';
            this.customStyle['--grafic-margin-right'] = this.d.grafic_margin_right + 'px';
        } else {
            this.set('d.grafic_width', full_width);
            this.set('d.grafic_text_visibility', 'hidden');

            this.customStyle['--grafic-margin-left'] = '0px';
            this.customStyle['--grafic-margin-right'] = '0px';
        };

        // Apply
        this.customStyle['--grafic-top-space'] = this.d.grafic_top_space + 'px';
        this.customStyle['--item-height'] = this.d.item_height + 'px';
        this.customStyle['--grafic-height'] = this.d.grafic_height + 'px';
        this.customStyle['--grafic-size'] = this.d.grafic_width + 'px';
        this.customStyle['--grafic-text-visibility'] = this.d.grafic_text_visibility;

        this.updateStyles();

        // Follow the white Rabbit
        if (follow) {
            this.__setScales();
        };
        this.__redrawChart();
    },

    __onIronResize: function () {
        var width = Math.floor(this.offsetWidth);
        //var height = Math.floor(this.parent.offsetHeight);

        if (this.d !== undefined) {

            if (width <= this.d.wide_breakpoint) {
                this.set('d.wide', false);
            } else {
                this.set('d.wide', true);
            };

            // console.warn('__onIronResize', width, this.d);
            this.__resizeGrafic();

        };
    },

    __tabChanged: function () {
        var d = this.get('d');

        d.animate_grid_0 = false;
        d.animate_grid_1 = false;
        d.animate_grid_2 = false;

        str_var = "animate_grid_" + d.tab_selected;
        d[str_var] = true;

        // console.log('__tabChanged', d.tab_selected, d.animate_grid_0, d.animate_grid_1, d.animate_grid_2); Set Data
        this.set('animate_grid_0', d.animate_grid_0);
        this.set('animate_grid_1', d.animate_grid_1);
        this.set('animate_grid_2', d.animate_grid_2);
    },

    __tabChanged: function () {
        var d = this.get('d');

        d.animate_grid_0 = false;
        d.animate_grid_1 = false;
        d.animate_grid_2 = false;

        str_var = "animate_grid_" + d.tab_selected;
        d[str_var] = true;

        // console.log('__tabChanged', d.tab_selected, d.animate_grid_0, d.animate_grid_1, d.animate_grid_2); Set Data
        this.set('animate_grid_0', d.animate_grid_0);
        this.set('animate_grid_1', d.animate_grid_1);
        this.set('animate_grid_2', d.animate_grid_2);
    },

    __redrawChart: function () {
        this.set('draw_chart', false);

        this.debounce('__redrawChart', function () {
            setTimeout(function () {

                // console.error('__redrawChart Now');

                this.__setScales(true);

                if (this._clinic_sample_profiles !== undefined) {
                    if (this._clinic_sample_profiles[0].name !== undefined) {
                        var fake_event = {
                            "detail": this._clinic_sample_profiles[0].name
                        };
                        this.__csChanged(fake_event);
                    };
                };

                this.set('draw_chart', true);

            }.bind(this), 50);
        }, 350);
    },

    __toggleSettingsBlock: function () {
        this.set('d.show_settings_block', !this.d.show_settings_block);
    },

    __toggleScore: function (oEvent) {
        _score_profiles = this.get('_score_profiles');
        var current_score = oEvent.model.get('score');
        current_score.show = !current_score.show;
        _score_profiles[current_score.id] = current_score;
        this.set('_score_profiles', _score_profiles);
        this.__redrawChart();
        console.warn('___toggleScore', current_score, _score_profiles);
    },

    onInit: function () {
        this.debounce('onInit', function () {
            this.__init();
        }, 250);
    },

    ready: function () {
        this.__translate(this.language);
    },

    attached: function () {
        this.set('draw_chart', false);
    },

    get_parent() {
        if (this.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            return this.parentNode.host;
        }
        return this.parentNode;
    }
});

getColor = function (id, color_skin) {
    color_skin = color_skin === undefined ? 'default' : color_skin;

    var colors = [];

    if (color_skin === 'default') {
        colors.push("#3F51B5");
        colors.push("#E91E63");
        colors.push("#00BCD4");
        colors.push("#8BC34A");
        colors.push("#FFC107");
        colors.push("#795548");

        colors.push("#673AB7");
        colors.push("#F44336");
        colors.push("#03A9F4");
        colors.push("#4CAF50");
        colors.push("#FFEB3B");
        colors.push("#FF5722");

        colors.push("#2196F3");
        colors.push("#9C27B0");
        colors.push("#009688");
        colors.push("#CDDC39");
        colors.push("#FF9800");
        colors.push("#607D8B");
    };

    if (color_skin === 'grey_dark_to_light') {
        // 800, 500, 300, 50
        colors.push("#424242");
        colors.push("#9E9E9E");
        colors.push("#E0E0E0");
        colors.push("#FAFAFA");
    };

    if (color_skin === 'indigo_dark_to_light') {
        colors.push("#283593");
        colors.push("#3F51B5");
        colors.push("#7986CB");
        colors.push("#E8EAF6");
    };

    if (color_skin === 'pink_dark_to_light') {
        colors.push("#AD1457");
        colors.push("#E91E63");
        colors.push("#7986CB");
        colors.push("#E8EAF6");
    };

    if (color_skin === 'indigo_grey_pink') {
        colors.push("#1A237E");
        colors.push("#212121");
        colors.push("#880E4F");
        colors.push("#3F51B5");
        colors.push("#9E9E9E");
        colors.push("#E91E63");
        colors.push("#C5CAE9");
        colors.push("#F5F5F5");
        colors.push("#F8BBD0");
    };

    if (color_skin === 'zebra') {
        colors.push("#212121");
        colors.push("#EEEEEE");
    };

    if (id > colors.length - 1) {
        var floor = Math.floor(id / colors.length);
        var corrected = id - (floor * colors.length);
        return colors[corrected];
    } else {
        return colors[id];
    };
};

hexToRGB = function (hex, alpha) {
    var h = "0123456789ABCDEF";
    var r = h.indexOf(hex[1]) * 16 + h.indexOf(hex[2]);
    var g = h.indexOf(hex[3]) * 16 + h.indexOf(hex[4]);
    var b = h.indexOf(hex[5]) * 16 + h.indexOf(hex[6]);
    if (alpha)
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    else
        return "rgb(" + r + ", " + g + ", " + b + ")";
};

__autoMinMax = function (do_min, do_max, d, all_scales) {
    // Init
    if (do_min) {
        d.item_min = 0;
    };
    if (do_max) {
        d.item_max = 0;
    };

    // Check in scales/scores
    all_scales.forEach(function (scale, scaleID) {
        scale.scores.forEach(function (score, scoreID) {
            if (do_min) {
                if (score.value < d.item_min) {
                    d.item_min = score.value;
                };
            };
            if (do_max) {
                if (score.value > d.item_max) {
                    d.item_max = score.value;
                };
            };
        });
    });

    //Round a number upward to its nearest integer:

    if (do_min) {
        if (d.item_min < 0) {
            d.item_min = Math.ceil(Math.abs(d.item_min)) + 1;
            d.item_min = d.item_min * -1;
        } else {
            d.item_min = Math.ceil(Math.abs(d.item_min)) + 1;
        };
        if (d.item_min > 0) {
            d.item_min = 0
        };
    } else {
        d.item_min = d.min;
    };
    if (do_max) {
        if (d.item_max < 0) {
            d.item_max = Math.ceil(Math.abs(d.item_max)) + 1;
            d.item_max = d.item_max * -1;
        } else {
            d.item_max = Math.ceil(Math.abs(d.item_max)) + 1;
        };
    } else {
        d.item_max = d.max;
    };

    return d;
};

__getXPos = function (min, max, svg_width_100, current_value) {
    var width_value = null
    if (current_value !== undefined) {
        current_value = current_value;

        var width_100 = Math.abs(min) + Math.abs(max);
        width_value = (svg_width_100 / width_100) * (current_value + Math.abs(min));
        width_value_max = (svg_width_100 / width_100) * (Math.abs(max) + Math.abs(min));

        if (width_value > width_value_max) {
            width_value = width_value_max;
            // console.warn('_getXPos', width_100, width_value, width_value_max);
        };

        if (width_value < 0) {
            width_value = 0;
            // console.warn('_getXPos', width_100, width_value, width_value_max);
        };
    };
    return width_value;
};

formatDateCH = function (date_string) {
    if ((date_string !== undefined) && (date_string !== null)) {

        // 1952-11-19T00:00:00.000000000000Z
        var year = parseInt(date_string.substring(0, 4));
        var month = parseInt(date_string.substring(5, 7));
        var day = parseInt(date_string.substring(8, 10));
        var date_string_return = day + "." + month + "." + year

        return date_string_return;
    } else {
        return null;
    }
};
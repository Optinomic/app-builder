Polymer({

    is: 'optinomic-pdf-chart-profile',

    properties: {
        language: {
            type: String,
            value: 'de'
        },
        options: {
            type: Object,
            observer: '__init'
        },
        start: {
            type: Object
        },
        clinic_samples: {
            type: Object,
            observer: '__init'
        },
        clinic_sample_dive: {
            type: Array,
            observer: '__init'
        },
        scales: {
            type: Object,
            observer: '__init'
        },
        scores: {
            type: Object,
            observer: '__init'
        },
        ranges: {
            type: Object,
            observer: '__init'
        },
        pdfContent: {
            type: Object,
            notify: true,
            reflectToAttribute: true
        }


    },

    __init: function () {

        this.debounce('_srChanged', function () {
            if (this._hasValue(this.options) && this._hasValue(this.scales) && this
                ._hasValue(this.scores) && this._hasValue(this.ranges)) {

                this._pdfmake_chart_zscore(this.scores, this.options);
            };
        }, 250);

    },

    _pdfmake_chart_zscore: function (scores, definition) {

        var _init = function (scores, definition) {
            var d = {};

            d.options = definition;
            d.options.offset_top = 10;

            if ("item_height" in d.options) {
                d.options.item_height = d.options.item_height;
            } else {
                d.options.item_height = 60;
            };

            if ("topnumber_hide_first_last" in d.options) {
                d.options.topnumber_hide_first_last = d.options.topnumber_hide_first_last;
            } else {
                d.options.topnumber_hide_first_last = false;
            };

            if ("show_ranges_overview" in d.options) {
                d.options.show_ranges_overview = d.options.show_ranges_overview;
            } else {
                d.options.show_ranges_overview = true;
            };

            if ("item_text_left" in d.options) {
                d.options.item_text_left = d.options.item_text_left;
            } else {
                d.options.item_text_left = 73;
            };

            if ("item_text_right" in d.options) {
                d.options.item_text_right = d.options.item_text_right;
            } else {
                d.options.item_text_right = 73;
            };

            if ("dropout_flag" in d.options) {
                d.options.dropout_flag = d.options.dropout_flag;
            } else {
                d.options.dropout_flag = null;
            };

            if ("dropout_reason" in d.options) {
                d.options.dropout_reason = d.options.dropout_reason;
            } else {
                d.options.dropout_reason = null;
            };

            // Convert Numbers - so PDF fits also
            var add_value = 12;
            d.options.item_text_left = d.options.item_text_left / 2 + add_value;
            d.options.item_text_right = d.options.item_text_right / 2 + add_value;

            // Legende Minimum links
            if (d.options.item_text_left <= 62) {
                d.options.legend_left = 62;
            } else {
                d.options.legend_left = d.options.item_text_left;
            };


            d.options.chart_width = 495 - d.options.item_text_left - d.options.item_text_right;


            var show_scale_text = false;
            if ("show_scale_text" in d.options) {
                show_scale_text = d.options.show_scale_text;
            };

            var color_grid = "#E0E0E0";
            if ("color_grid" in d.options) {
                color_grid = d.options.color_grid;
            };



            // SCALES

            d.scales = this.get('scales');

            if (d.scales.length > 0) {
                d.options.chart_height = d.scales.length * d.options.item_height;
            } else {
                d.options.chart_height = 0;
            };


            // RANGES

            d.ranges = this.get('ranges');


            // Klinikstichprobe

            if ((this.clinic_samples !== null) && (this.clinic_samples !== undefined)) {
                d.ks = this.clinic_samples;
            } else {
                d.ks = null;
            };



            var ks_dive = {
                "defined": false,
                "text": "",
                "data": null,
                "array": []
            };


            var clinic_sample_dive = this.get('clinic_sample_dive');
            if ((clinic_sample_dive !== null) && (clinic_sample_dive !== undefined)) {
                ks_dive.array = clinic_sample_dive;
                if (ks_dive.array.length > 0) {
                    ks_dive.defined = true;
                };
            };


            d.ks_dive = ks_dive;

            // Auto Min/Max

            d.options.do_min = false;
            if ((d.options.min === 'auto') || (d.options.min === undefined)) {
                d.options.do_min = true;
            } else {
                d.options.item_min = parseInt(d.options.min);
            };

            d.options.do_max = false;
            if ((d.options.max === 'auto') || (d.options.max === undefined)) {
                d.options.do_max = true;
            } else {
                d.options.item_max = parseInt(d.options.max);
            };



            // Scores / Data
            d.scores = scores.data;
            if (d.scores.length > 0) {
                d.have_data = true;

                d = _scales_scores(d.scores, d);

                // Min / Max
                d = _autoMinMax(d);

            } else {
                d.have_data = false;
            };


            console.log("<optinomic-pdf-chart-profile>", d);
            return d;
        }.bind(this);

        var _scales_text = function (d) {

            // INIT

            var _scales_text = {
                "id": "scales_text",
                "stack": [],
            };

            if (d.scales.length > 0) {

                d.scales.forEach(function (scale, scaleID) {

                    var left_text = [];
                    var right_text = [];


                    // Build :: Left
                    if (scale.left_title !== "") {
                        if ((scale.left_text !== "") && d.options.show_scale_text) {
                            var title = {
                                "text": scale.left_title + ": ",
                                "bold": true
                            };

                            var text = {
                                "text": scale.left_text,
                                "bold": false
                            };

                            left_text.push(title);
                            left_text.push(text);
                        } else {
                            var title = {
                                "text": scale.left_title,
                                "bold": true
                            };
                            left_text.push(title);
                        };
                    } else {
                        if (scale.left_text !== "") {

                            var text = {
                                "text": scale.left_text,
                                "bold": false
                            };

                            left_text.push(text);
                        }
                    };


                    // Build :: Right
                    if (scale.right_title !== "") {
                        if ((scale.right_text !== "") && d.options.show_scale_text) {
                            var title = {
                                "text": scale.right_title + ": ",
                                "bold": true
                            };

                            var text = {
                                "text": scale.right_text,
                                "bold": false
                            };

                            right_text.push(title);
                            right_text.push(text);
                        } else {
                            var title = {
                                "text": scale.right_title,
                                "bold": true
                            };
                            right_text.push(title);
                        };
                    } else {
                        if (scale.right_text !== "") {

                            var text = {
                                "text": scale.right_text,
                                "bold": false
                            };

                            right_text.push(text);
                        }
                    };



                    var column_scale = {
                        "columns": [{
                                "width": d.options.item_text_left,
                                "style": "chart_p",
                                "alignment": "right",
                                "text": left_text
                            },
                            {
                                "width": "*",
                                "text": ""
                            },
                            {
                                "width": d.options.item_text_right,
                                "style": "chart_p",
                                "alignment": "left",
                                "text": right_text
                            }
                        ],
                        "relativePosition": {
                            "x": 0,
                            "y": (scaleID * d.options.item_height) + d.options
                                .offset_top
                        },
                        "columnGap": 10
                    };

                    _scales_text.stack.push(column_scale);


                });
            };


            return _scales_text;
        };

        var _beschriftung_top = function (d) {

            var beschriftung_top = {
                "id": "numbers_top",
                "stack": []
            };


            var grind_count = 0;

            for (i = 0; i < d.options.min_max_range + 1; i++) {

                if ((i === 0) || (grind_count === d.options.vertical_grid_every_x)) {

                    var my_x = _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, d.options.item_min + i);

                    var inner = {
                        "color": "#616161",
                        "fontSize": 8,
                        "alignment": "left",
                        "text": d.options.item_min + i,
                        "relativePosition": {
                            "x": d.options.item_text_left + 8 + my_x,
                            "y": 0
                        }
                    };

                    if (d.options.topnumber_hide_first_last) {
                        if ((i !== 0) && (i !== d.options.min_max_range)) {
                            beschriftung_top.stack.push(inner);
                        };
                    } else {
                        beschriftung_top.stack.push(inner);
                    };


                    grind_count = 1;

                } else {
                    grind_count = grind_count + 1;
                };
            };

            // console.warn('vertical: ', d.options.item_min + i, my_x, vertical_line);


            return beschriftung_top;
        };

        var _grid = function (d) {

            // INIT

            var _grid = {
                "id": "grid",
                "stack": [],
            };

            var _grid_inner = {
                "relativePosition": {
                    "x": d.options.item_text_left + 10,
                    "y": 0
                },
                "canvas": [{
                    "type": "rect",
                    "x": 0,
                    "y": d.options.offset_top,
                    "w": d.options.chart_width,
                    "h": d.options.chart_height,
                    "lineColor": d.options.color_grid
                }]
            };


            // Horizontal Line
            if (d.scales.length > 0) {


                d.scales.forEach(function (scale, scaleID) {

                    var horizontal_line = {
                        "type": "line",
                        "x1": 0,
                        "y1": (scaleID * d.options.item_height) + d.options
                            .offset_top,
                        "x2": d.options.chart_width,
                        "y2": (scaleID * d.options.item_height) + d.options
                            .offset_top,
                        "lineWidth": 1,
                        "lineColor": d.options.color_grid
                    };

                    if (scaleID !== 0) {
                        _grid_inner.canvas.push(horizontal_line);

                    };

                });
            };

            // Vertical Line
            var grind_count = 0;

            for (i = 0; i < d.options.min_max_range; i++) {

                if (grind_count === d.options.vertical_grid_every_x) {

                    var my_x = _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, d.options.item_min + i);
                    var line_width = 1;
                    if ((d.options.item_min + i === 0) && (i !== 0)) {
                        line_width = 2;
                    };

                    var vertical_line = {
                        "type": "line",
                        "x1": my_x,
                        "y1": d.options.offset_top,
                        "x2": my_x,
                        "y2": d.options.chart_height + d.options.offset_top,
                        "lineWidth": line_width,
                        "lineColor": d.options.color_grid
                    };

                    _grid_inner.canvas.push(vertical_line);
                    grind_count = 1;

                } else {
                    grind_count = grind_count + 1;
                };
            };
            _grid.stack.push(_grid_inner);


            return _grid;
        };

        var _ranges = function (d) {

            var _return = {
                "id": "ranges",
                "stack": [],
            };

            var _inner = {
                "relativePosition": {
                    "x": d.options.item_text_left + 10,
                    "y": d.options.offset_top
                },
                "canvas": []
            };

            d.ranges.forEach(function (range, rangeID) {


                // {range_start: -999, range_stop: 1, text: "Gesunde Ausprägung", color: "#2E7D32"}

                var my_x = 0;
                if (range.range_start !== -999) {
                    my_x = _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, range.range_start);
                };

                var my_y = d.options.chart_width;
                if (range.range_stop !== 999) {
                    my_y = _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, range.range_stop);
                };


                var range = {
                    "type": "rect",
                    "x": my_x,
                    "y": 0,
                    "w": my_y - my_x,
                    "h": d.options.chart_height,
                    "color": _shadeColor(range.color, 1 - d.options.range_alpha)
                };

                _inner.canvas.push(range);
            });


            _return.stack.push(_inner);

            return _return;
        };

        var _scores = function (d) {

            var _return = {
                "id": "scores",
                "stack": [],
            };

            var _inner = {
                "relativePosition": {
                    "x": d.options.item_text_left + 10,
                    "y": d.options.offset_top
                },
                "canvas": []
            };


            var points_obj = {};
            var lines_count = 0;
            var dots = [];

            d.scales.forEach(function (scale, scaleID) {
                scale.scores.forEach(function (score, scoreID) {


                    if (score.dropout !== true) {

                        lines_count = scoreID + 1;
                        if (points_obj[scoreID] === undefined) {
                            points_obj[scoreID] = [];
                        };

                        my_x = _getXPos(d.options.item_min, d.options.item_max,
                            d.options.chart_width, score.value);

                        var my_y = (scaleID * d.options.item_height) + (d
                            .options.item_height / 2);

                        var point = {
                            "x": my_x,
                            "y": my_y,
                        };
                        points_obj[scoreID].push(point);


                        // Show Horizontal Line
                        if (d.options.show_score_vertical_line) {

                            var show_score_vertical_line = {
                                "type": "line",
                                "x1": my_x,
                                "y1": scaleID * d.options.item_height,
                                "x2": my_x,
                                "y2": scaleID * d.options.item_height + d
                                    .options.item_height,
                                "lineWidth": 4,
                                "lineColor": _getColor(scoreID, d.options
                                    .color_skin)
                            };
                            _inner.canvas.push(show_score_vertical_line);

                        };

                        // Circles
                        if (d.options.show_score_circles) {
                            var circle_color = "#FFFFFF";
                            d.ranges.forEach(function (range, rangeID) {
                                if ((score.value >= range
                                        .range_start) && (score.value <=
                                        range.range_stop)) {
                                    circle_color = range.color;
                                }
                            });
                            var circle = {
                                "type": "ellipse",
                                "x": my_x,
                                "y": my_y,
                                "color": circle_color,
                                "lineColor": _getColor(scoreID, d.options
                                    .color_skin),
                                "lineWidth": 2,
                                "fillOpacity": 0.9,
                                "r1": 4.25,
                                "r2": 4.25
                            };

                            dots.push(circle);
                        };
                    };


                });
            });

            // lines
            for (i = 0; i < lines_count; i++) {
                var score_line = {
                    "type": "polyline",
                    "lineWidth": 3,
                    "lineColor": _getColor(i, d.options.color_skin),
                    "points": points_obj[i]
                };

                _inner.canvas.push(score_line);
            };

            // dots
            if (d.options.show_score_circles) {
                dots.forEach(function (dot, dotID) {
                    _inner.canvas.push(dot);
                });
            };

            _return.stack.push(_inner);

            return _return;
        };

        var _ks_current_sample = function (d) {

            // Check latest survey_response and build "_d.bscl.clinic_sample_dive.array"
            var latest_sr = d.scores[d.scores.length - 1];

            var clinic_sample_dive = {
                "defined": false,
                "text": "",
                "data": null,
                "array": []
            };

            // ---- Gewünschte Klinikstichprobe schreiben ----
            if (d.ks_dive.defined) {
                clinic_sample_dive = d.ks_dive;
            };

            if ((!d.ks_dive.defined) && (this._hasValue(this.clinic_samples))) {
                // Klinikstichprobe jedoch kein Dive vorhanden

                // Default = last
                this.clinic_samples.dimensions.forEach(function (dim, dimID) {
                    clinic_sample_dive.array.push(dim.array.length - 1);
                });
                console.log("Defaultstichprobe erstellt!");
            };

            if ((d.ks_dive.defined) && (this._hasValue(this.clinic_samples))) {
                // Klinikstichprobe & Dive vorhanden

                // ---- Set ----


                //  Get Statistics Data from clinic_sample_dive
                var dive_data = d.ks.data;

                d.ks_dive.array.forEach(function (dive, diveID) {
                    dive_data = JSON.parse(JSON.stringify(dive_data[dive]));
                });


                try {
                    clinic_sample_dive.data = JSON.parse(JSON.stringify(dive_data.statistics));
                    // console.error('DATA', clinic_sample_dive);
                } catch (err) {
                    clinic_sample_dive.data = {};
                };
                // clinic_sample_dive.data = JSON.parse(JSON.stringify(dive_data.statistics));

                var n_value = 0;
                for (var property in clinic_sample_dive.data) {
                    if (clinic_sample_dive.data.hasOwnProperty(property)) {
                        n_value = clinic_sample_dive.data[property].n;
                    };
                };

                // Build KS:  Text
                clinic_sample_dive.text = "";
                d.ks.dimensions.forEach(function (dim, dimID) {
                    var pos = d.ks_dive.array[dimID];
                    var dim_text = dim.name + ": " + dim.array[pos].text;
                    if (dimID !== d.ks.dimensions.length - 1) {
                        dim_text = dim_text + ", "
                    };
                    clinic_sample_dive.text = clinic_sample_dive.text + dim_text;
                });

                if (n_value !== 0) {
                    clinic_sample_dive.text = clinic_sample_dive.text + " (N=" + n_value + ")";
                };


                clinic_sample_dive.defined = true;
            };

            // console.warn("clinic_sample_dive", clinic_sample_dive);
            return clinic_sample_dive;
        }.bind(this);

        var _ks = function (d) {

            var _return = {
                "id": "clinic_sample",
                "stack": [],
            };

            var _inner = {
                "relativePosition": {
                    "x": d.options.item_text_left + 10,
                    "y": d.options.offset_top
                },
                "canvas": []
            };


            d.ks_dive = _ks_current_sample(d);


            //  Draw
            var ks_points = [];
            var ks_line_points = [];
            var stufe = 7;
            d.scales.forEach(function (scale, scaleID) {
                var ks_var = d.ks_dive.data[scale.clinic_sample_var] || {};
                var mean_1sd_min = ks_var.mean_1sd_min || 0;
                var mean_1sd_plus = ks_var.mean_1sd_plus || 0;
                var mean = ks_var.mean || 0;

                var my_y_1 = (scaleID * d.options.item_height) + stufe;
                if (scaleID === 0) {
                    my_y_1 = 0;
                };

                var my_y_2 = (scaleID * d.options.item_height) + (d.options
                    .item_height - stufe);
                if (scaleID === (d.scales.length - 1)) {
                    my_y_2 = d.options.chart_height;
                };

                var point_1 = {
                    "x": _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, mean_1sd_min),
                    "y": my_y_1,
                };

                var point_2 = {
                    "x": _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, mean_1sd_min),
                    "y": my_y_2,
                };

                ks_points.push(point_1);
                ks_points.push(point_2);


                // MEAN Line

                var line_point_1 = {
                    "x": _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, mean),
                    "y": my_y_1,
                };
                var line_point_2 = {
                    "x": _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, mean),
                    "y": my_y_2,
                };
                ks_line_points.push(line_point_1);
                ks_line_points.push(line_point_2);
            });

            var clone_scales = JSON.parse(JSON.stringify(d.scales));
            clone_scales.reverse();
            clone_scales.forEach(function (scale, scaleID) {

                var scaleIDCorrected = clone_scales.length - 1 - scaleID;

                var ks_var = d.ks_dive.data[scale.clinic_sample_var] || {};
                var mean_1sd_min = ks_var.mean_1sd_min || 0;
                var mean_1sd_plus = ks_var.mean_1sd_plus || 0;
                var mean = ks_var.mean || 0;

                var my_y_1 = (scaleIDCorrected * d.options.item_height) + (d.options
                    .item_height - stufe);
                var my_y_2 = (scaleIDCorrected * d.options.item_height) + stufe;

                if (scaleIDCorrected === 0) {
                    my_y_2 = 0;
                };
                if (scaleIDCorrected === (d.scales.length - 1)) {
                    my_y_1 = d.options.chart_height;
                };

                var point_1 = {
                    "x": _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, mean_1sd_plus),
                    "y": my_y_1,
                };

                var point_2 = {
                    "x": _getXPos(d.options.item_min, d.options.item_max, d.options
                        .chart_width, mean_1sd_plus),
                    "y": my_y_2,
                };

                ks_points.push(point_1);
                ks_points.push(point_2);
            });

            var ks_area = {
                "type": "polyline",
                "fillOpacity": 0.5,
                "color": d.options.color_clinic_sample,
                "points": ks_points
            };
            _inner.canvas.push(ks_area);


            var ks_line = {
                "type": "polyline",
                "lineWidth": 2,
                "lineColor": _shadeColor(d.options.color_grid, 0.5),
                "points": ks_line_points
            };
            _inner.canvas.push(ks_line);

            _return.stack.push(_inner);
            return _return;
        };

        var _scales_scores = function (scores, init) {

            init.scales.forEach(function (scale, scaleID) {

                scale.scores = [];
                scale.id = scaleID;

                if ((scores !== undefined) && (scores !== null)) {
                    scores.forEach(function (score, scoreID) {
                        // Get Values

                        var score_obj = {
                            "value": null,
                            "title": "Unbekannt",
                            "date": null,
                            "dropout": false,
                            "dropout_reason": null
                        };

                        // Get Values
                        if (scale.score_path) {
                            score_obj.value = _getDataPath(score, scale
                                .score_path);
                        };

                        if (init.options.response_title_path) {
                            score_obj.title = _getDataPath(score, init.options
                                .response_title_path);
                        };

                        if (init.options.response_date_path) {
                            score_obj.date = _getDataPath(score, init.options
                                .response_date_path);
                            score_obj.date = _formatDateCH(score_obj.date);
                        };

                        if ("dropout_flag" in init.options) {
                            if ((init.options.dropout_flag !== "") && (init
                                    .options.dropout_flag !== null) && (init
                                    .options.dropout_flag !== undefined)) {
                                score_obj.dropout = _getDataPath(score, init
                                    .options.dropout_flag);
                            };
                        };

                        if ("dropout_reason" in init.options) {
                            if ((init.options.dropout_reason !== "") && (init
                                    .options.dropout_reason !== null) && (init
                                    .options.dropout_reason !== undefined)) {
                                score_obj.dropout_reason = _getDataPath(score,
                                    init.options.dropout_reason);
                            };
                        };

                        scale.scores.push(score_obj);


                    });
                };

            });

            return init;
        }.bind(this);

        var _legende_normstichprobe = function (init) {

            if ("norm_sample" in init.options) {
                if (this._hasValue(init.options.norm_sample)) {
                    var normstichprobe = {
                        "columns": [{
                            "width": init.options.legend_left,
                            "style": "chart_p",
                            "color": "#757575",
                            "alignment": "right",
                            "text": [{
                                "text": "Normstichprobe"
                            }]
                        }, {
                            "width": "*",
                            "style": "chart_p",
                            "alignment": "left",
                            "text": [{
                                "text": init.options.norm_sample
                            }]
                        }],
                        "columnGap": 10
                    };
                };
            } else {
                var normstichprobe = {};
            };

            return normstichprobe;
        }.bind(this);

        var _legende_klinikstichprobe = function (init) {

            var return_object = {};

            if (init.ks_dive !== undefined) {
                if (init.ks_dive.defined == true) {
                    var return_object = {
                        "columns": [{
                            "width": init.options.legend_left,
                            "style": "chart_p",
                            "color": "#757575",
                            "alignment": "right",
                            "text": [{
                                "text": "Klinikstichprobe"
                            }]
                        }, {
                            "width": "*",
                            "style": "chart_p",
                            "alignment": "left",
                            "text": [{
                                "text": init.ks_dive.text
                            }]
                        }],
                        "columnGap": 10
                    };
                };
            };


            return return_object;
        };

        var _legende_interpretation = function (init) {

            // Interpretation
            var interpretation = {
                "columns": [{
                    "width": init.options.legend_left,
                    "style": "chart_p",
                    "color": "#757575",
                    "alignment": "right",
                    "text": [{
                        "text": "Interpretation"
                    }]
                }],
                "columnGap": 10
            };

            var spacer = {
                "width": 10,
                "text": ""
            };
            // interpretation.columns.push(spacer);

            var beschriftung = {
                "width": "*",
                "style": "chart_p",
                "alignment": "left",
                "text": []
            };

            if (init.ranges !== undefined) {
                init.ranges.forEach(function (range, rangeID) {

                    var title = range.text;
                    var range_text = "";
                    if (range.range_start !== -999) {
                        range_text = range.range_start;
                        if (range.range_stop !== 999) {
                            range_text = ">" + range_text + " bis ";
                        }
                    } else {
                        range_text = "<="
                    };
                    if (range.range_stop !== 999) {
                        range_text = range_text + range.range_stop;
                    } else {
                        range_text = ">=" + range_text;
                    };


                    var title_obj = {
                        "text": title
                    };
                    var range_obj = {
                        "text": " (" + range_text + ")",
                        "color": "#757575"
                    };
                    beschriftung.text.push(title_obj);
                    beschriftung.text.push(range_obj);
                    if (rangeID !== init.ranges.length - 1) {
                        title_obj = {
                            "text": ", "
                        };
                        beschriftung.text.push(title_obj);
                    };
                });
                interpretation.columns.push(beschriftung);
            };


            return interpretation;
        };

        var _legende_messungen = function (init) {

            // Messungen
            var messung_title = "Keine Daten vorhanden.";
            if (init.scores.length === 1) {
                messung_title = "Messung";
            };
            if (init.scores.length > 1) {
                messung_title = "Messungen";
            };
            var messungen = {
                "columns": [{
                    "width": init.options.legend_left,
                    "style": "chart_p",
                    "color": "#757575",
                    "alignment": "right",
                    "text": [{
                        "text": messung_title
                    }]
                }],
                "columnGap": 10
            };


            // console.error("scores", scores);

            init.scores.forEach(function (score, scoreID) {


                if ("dropout_flag" in init.options) {
                    if ((init.options.dropout_flag !== "") && (init.options
                            .dropout_flag !== null) && (init.options.dropout_flag !==
                            undefined)) {
                        score.dropout_have = _getDataPath(score, init.options
                            .dropout_flag);
                    };
                };

                if ("dropout_reason" in init.options) {
                    if ((init.options.dropout_reason !== "") && (init.options
                            .dropout_reason !== null) && (init.options
                            .dropout_reason !== undefined)) {
                        score.dropout_reason = _getDataPath(score, init.options
                            .dropout_reason);
                    };
                };

                var zuordner = {
                    "width": 10,
                    "canvas": [{
                        "type": "line",
                        "x1": 0,
                        "y1": 8,
                        "x2": 15,
                        "y2": 8,
                        "lineWidth": 4,
                        "lineColor": _getColor(scoreID, init.options
                            .color_skin),
                    }]
                };


                var title = _getDataPath(score, init.options.response_title_path);
                var date = _getDataPath(score, init.options.response_date_path);
                date = _formatDateCH(date);

                var dropout_text = "";

                if (score.dropout_have) {
                    dropout_text = "Dropout: ";
                    if ("dropout_reason" in score) {
                        if (score.dropout_reason !== "") {
                            dropout_text = dropout_text + _getDataPath(score, init
                                .options.dropout_reason) + " ";
                        };
                    };
                    if ((dropout_text !== "") && (dropout_text !== null) && (
                            dropout_text !== 'null')) {
                        date = date + ", " + dropout_text;
                    };
                } else {
                    messungen.columns.push(zuordner);
                };


                var beschriftung = {
                    "width": "*",
                    "style": "chart_p",
                    "alignment": "left",
                    "text": [{
                        "text": title
                    }, {
                        "text": " (" + date + ")",
                        "color": "#757575"
                    }]
                };
                messungen.columns.push(beschriftung);
            });

            return messungen;
        };

        var _legende_start = function (init) {

            var start = this.get('start');

            // console.warn("_legende_start", start, init);

            var return_object = {};

            if (start !== undefined) {
                if (init.ks_dive.defined == true) {
                    var return_object = {
                        "columns": [{
                            "width": init.options.item_text_left,
                            "style": "chart_p",
                            "alignment": "right",
                            "color": start.left_color,
                            "text": start.left_title
                        }, {
                            "width": "*",
                            "style": "chart_p",
                            "alignment": "left",
                            "text": [{
                                "text": start.left_text
                            }]
                        }, {
                            "width": "*",
                            "style": "chart_p",
                            "alignment": "right",
                            "text": [{
                                "text": start.right_text
                            }]
                        }, {
                            "width": init.options.item_text_right,
                            "style": "chart_p",
                            "alignment": "left",
                            "color": start.right_color,
                            "text": start.right_title
                        }],
                        "columnGap": 10
                    };
                };
            };


            return return_object;
        }.bind(this);

        // -----------------------
        // Inner Helpers
        // -----------------------
        var _getDataPath = function (current_score, path) {
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

        var _autoMinMax = function (data) {

            var d = JSON.parse(JSON.stringify(data));


            if (d.options.do_max || d.options.do_min) {



                // Init
                if (d.options.do_min) {
                    d.options.item_min = 0;
                };
                if (d.options.do_max) {
                    d.options.item_max = 0;
                };


                // Check in scales/scores
                d.scales.forEach(function (scale, scaleID) {
                    scale.scores.forEach(function (score, scoreID) {
                        if (d.options.do_min) {
                            if (score.value < d.options.item_min) {
                                d.options.item_min = score.value;
                            };
                        };
                        if (d.options.do_max) {
                            if (score.value > d.options.item_max) {
                                d.options.item_max = score.value;
                            };
                        };
                    });
                });


                //Round a number upward to its nearest integer:

                if (d.options.do_min) {
                    if (d.options.item_min < 0) {
                        d.options.item_min = Math.ceil(Math.abs(d.options.item_min)) + 1;
                        d.options.item_min = d.options.item_min * -1;
                    } else {
                        d.options.item_min = Math.ceil(Math.abs(d.options.item_min)) + 1;
                    };
                    if (d.options.item_min > 0) {
                        d.options.item_min = 0
                    };
                } else {
                    d.options.item_min = d.options.min;
                };

                if (d.options.do_max) {
                    if (d.options.item_max < 0) {
                        d.options.item_max = Math.ceil(Math.abs(d.options.item_max)) + 1;
                        d.options.item_max = d.options.item_max * -1;
                    } else {
                        d.options.item_max = Math.ceil(Math.abs(d.options.item_max)) + 1;
                    };
                } else {
                    d.options.item_max = d.options.max;
                };
            };

            d.options.min_max_range = d.options.item_max - d.options.item_min;

            if (d.options.item_min < 0) {
                d.options.min_max_range = d.options.item_max + Math.abs(d.options.item_min);
            };

            return d;
        };

        var _getXPos = function (min, max, svg_width_100, current_value) {
            var width_value = null
            if (current_value !== undefined) {
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

        var _shadeColor = function (color, percent) {
            var f = parseInt(color.slice(1), 16),
                t = percent < 0 ? 0 : 255,
                p = percent < 0 ? percent * -1 : percent,
                R = f >> 16,
                G = f >> 8 & 0x00FF,
                B = f & 0x0000FF;
            return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t -
                G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
        };

        var _getColor = function (id, color_skin) {
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

        var _formatDateCH = function (date_string) {
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


        // Run
        var init = _init(scores, definition);


        // console.warn('START: pdfmake_chart_zscore (scores, definition)', scores, definition, init);



        // Build Chart

        var chart_stack = [];
        var chart_top = [];

        if (init.have_data === true) {



            chart_stack.push(_scales_text(init));
            chart_stack.push(_beschriftung_top(init));
            chart_stack.push(_ranges(init));

            if (init.ks !== null) {
                chart_stack.push(_ks(init));
            };
            chart_stack.push(_grid(init));
            chart_stack.push(_scores(init));


            // Add a Spacer so following content will not overwrite chart
            var spacer = {
                "canvas": [{
                    "type": "rect",
                    "x": -3,
                    "y": 0,
                    "w": 0,
                    "h": init.options.offset_top + init.options.chart_height + 6,
                    "lineColor": "#FFFFFF"
                }]
            };
            chart_stack.push(spacer);


            // Push Additional Bottom
            chart_stack.push(_legende_messungen(init));


            // Push Additional Top
            chart_top.push({
                "text": "",
                "margin": [0, 0, 0, 6]
            });
            chart_top.push(_legende_normstichprobe(init));
            chart_top.push(_legende_klinikstichprobe(init));
            if (init.options.show_ranges_overview) {
                chart_top.push(_legende_interpretation(init));
            };
            chart_top.push(_legende_start(init));
            chart_top.push({
                "text": "",
                "margin": [0, 0, 0, 6]
            });


            // Merge top & bottom
            chart_stack = chart_top.concat(chart_stack);

        };


        // Keep Chart together
        var chart = {
            "id": "chart_zscore",
            "layout": "noBorders",
            "table": {
                "dontBreakRows": true,
                "headerRows": 0,
                "body": [
                    [{
                        "stack": chart_stack
                    }]
                ]
            }
        };

        // DEBUG
        // console.log(JSON.stringify(chart, null, 2));
        // chart.init = init;

        this.set('pdfContent', chart);

        return chart;
    },

    _hasValue: function (value) {
        if ((value === null) || (value === "null") || (value === undefined) || (value === "")) {
            return false;
        } else {
            return true;
        };
    },


    ready: function () {},

    attached: function () {},


});

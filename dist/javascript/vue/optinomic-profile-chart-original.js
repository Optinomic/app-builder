// Optinomic App-Title
Vue.component('optinmic-profile-chart', {
    props: {
        options: {
            type: Object,
            default: null
        },
        scales: {
            type: Array,
            default: null
        },
        scores: {
            type: Object,
            default: null
        },
        ranges: {
            type: Array,
            default: null
        },
        clinic_samples: {
            type: Object,
            default: null
        },
        clinic_sample_dive: {
            type: Array,
            default: null
        }
    },
    data: function () {
        return {
            chart: null,
            chart_data: {
                data: null,
                dive: null
            },
            container_top_height: 18,
            cs_toggle: false
        };
    },
    watch: {
        chart_data: function () {
            // console.log('DATA Changed', newData, oldData);
            this.chart.data = this.chart_data.data;
            this.chart.invalidateRawData();
        }
    },
    methods: {
        toggleCS() {
            if (this.clinic_samples !== null) {
                this.cs_toggle = !this.cs_toggle;
            }
        },
        updateData() {
            // User did something
            this.chart_data = this.dataBuild();
        },
        dataBuild() {
            // Prepare Data
            var scores_orig = this.scores;
            var scales = this.scales;
            var options = this.options;
            var cs = this.clinic_samples;
            var cs_dive = this.getCSDive;

            try {
                var scores = JSON.parse(JSON.stringify(scores_orig));
                var data_object = {
                    data: [],
                    captures: [],
                    dive: cs_dive,
                    cs_sample_n: 0,
                    cs_sample_text: ""
                };

                var getCategoryText = function (title, text) {
                    var r = "";
                    if (title !== "") {
                        r = r + title;
                    }
                    if (title !== "" && text !== "") {
                        r = r + ": ";
                    }
                    if (text !== "") {
                        r = r + text;
                    }
                    return "[font-size:11px]" + r + "[/]";
                };

                var flatten = function (obj, name, stem) {
                    var out = {};
                    var newStem =
                        typeof stem !== "undefined" && stem !== "" ?
                        stem + "." + name :
                        name;

                    if (typeof obj !== "object") {
                        out[newStem] = obj;
                        return out;
                    }

                    for (var p in obj) {
                        var prop = flatten(obj[p], p, newStem);
                        out = merge([out, prop]);
                    }

                    return out;
                };

                var merge = function (objects) {
                    var out = {};

                    for (var i = 0; i < objects.length; i++) {
                        for (var p in objects[i]) {
                            out[p] = objects[i][p];
                        }
                    }

                    return out;
                };

                var getDataDive = function (_d, dive, cs_var) {
                    var return_obj = {};
                    var build_var = "";
                    dive.forEach(
                        function (_pos) {
                            build_var = build_var + _pos;
                            build_var = build_var + ".";
                        }.bind(this)
                    );
                    build_var = build_var + "statistics." + cs_var;
                    var data = flatten(_d);

                    return_obj.n = data[build_var + ".n"];
                    return_obj.max = data[build_var + ".max"];
                    return_obj.min = data[build_var + ".min"];
                    return_obj.mean = data[build_var + ".mean"];
                    return_obj.standard_deviation =
                        data[build_var + ".standard_deviation"];
                    return_obj.mean_1sd_min = data[build_var + ".mean_1sd_min"];
                    return_obj.mean_1sd_plus = data[build_var + ".mean_1sd_plus"];
                    return_obj.variance = data[build_var + ".variance"];
                    return_obj.z_score_min = data[build_var + ".z_score_min"];
                    return_obj.z_score_max = data[build_var + ".z_score_max"];

                    return return_obj;
                };

                scales.forEach(
                    function (s, sid) {
                        var scale = Object.assign({}, s);
                        // Category
                        scale.category_left = getCategoryText(s.left_title, s.left_text);
                        scale.category_right = getCategoryText(s.right_title, s.right_text);

                        // Messungen hinzufügen
                        scores.data.forEach(
                            function (_sr) {
                                var sr = flatten(_sr);
                                var capture_name = "capture_event_" + sr.event_id;
                                if (sid === 0) {
                                    var obj = {
                                        category: capture_name,
                                        name: sr[options.response_title_path],
                                        date: sr[options.response_date_path],
                                        dropout: false
                                    };

                                    // Dropout
                                    if (sr[options.dropout] === true) {
                                        obj.name =
                                            "[red font-size: 12px]" + sr[options.dropout_reason];
                                        obj.dropout = true;
                                    }
                                    data_object.captures.push(obj);
                                }
                                scale[capture_name] = sr[scale.score_path];
                            }.bind(this)
                        );

                        // Clinic Samples hinzufügen;
                        if (cs !== null) {
                            // If no Dive is given - always last.
                            if (cs_dive === null) {
                                cs_dive = [];
                                if ("dimensions" in cs) {
                                    cs.dimensions.forEach(
                                        function (dim) {
                                            cs_dive.push(dim.array.length - 1);
                                        }.bind(this)
                                    );
                                    data_object.dive = cs_dive;
                                }
                            }

                            // get current statisics object
                            scale.cs_data = getDataDive(
                                cs.data,
                                cs_dive,
                                scale.clinic_sample_var
                            );

                            scale.cs_mean = null;
                            scale.cs_start = null;
                            scale.cs_end = null;
                            data_object.cs_sample_n = "...";

                            if (scale.cs_data) {
                                scale.cs_mean = scale.cs_data.mean;
                                scale.cs_start = scale.cs_data.mean_1sd_min;
                                scale.cs_end = scale.cs_data.mean_1sd_plus;
                                data_object.cs_sample_n = scale.cs_data.n;
                            } else {
                                console.error(
                                    "--> CS",
                                    cs.data,
                                    cs_dive,
                                    scale.cs_full_data,
                                    s,
                                    sid
                                );
                            }
                        }

                        // publish
                        data_object.data.push(scale);
                    }.bind(this)
                );

                // Fill CS Text
                // Clinic Samples hinzufügen;
                if (cs !== null) {
                    cs.dimensions.forEach(
                        function (dim, dim_id) {
                            if (data_object.cs_sample_text !== "") {
                                data_object.cs_sample_text = data_object.cs_sample_text + " | ";
                            }
                            data_object.cs_sample_text =
                                data_object.cs_sample_text +
                                dim.array[data_object.dive[dim_id]].text;
                        }.bind(this)
                    );

                    if (data_object !== undefined) {
                        // console.error('HERE', data_object);
                        data_object.cs_sample_text =
                            data_object.cs_sample_text +
                            " (N=" +
                            data_object.cs_sample_n +
                            ")";
                    }
                }

                // console.warn('buildData :: ', data_object);
                // this.chart_data = data_object;
                return data_object;
            } catch (e) {
                console.error("Error: buildData", e);
            }
        },
        chartBuild() {
            // console.warn("BUILD CHART NOW!");

            // ---------------------------------
            // Functions
            // ---------------------------------

            var hasValue = function (value) {
                try {
                    if (
                        value === null ||
                        value === "null" ||
                        value === undefined ||
                        value === ""
                    ) {
                        return false;
                    } else {
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            };

            var drawRanges = function (ranges, options) {
                try {
                    // console.warn('drawRanges :: ', ranges, options);

                    ranges.forEach(
                        function (r) {
                            var range = valueAxis.axisRanges.create();
                            var range_start = r.range_start;
                            if (range_start === -999) {
                                range_start = options.min;
                            }
                            var range_stop = r.range_stop;
                            if (range_stop === 999) {
                                range_stop = options.max;
                            }

                            range.value = range_start;
                            range.endValue = range_stop;
                            range.axisFill.fill = am4core.color(r.color);
                            range.axisFill.fillOpacity = options.range_alpha || 0.3;
                            //range.grid.stroke = am4core.color(r.color);
                            //range.grid.strokeOpacity = 0.8;

                            var range_line_left = valueAxis.axisRanges.create();
                            range_line_left.value = r.range_start;
                            range_line_left.endValue = r.range_start + 0.01;
                            range_line_left.axisFill.fill = am4core.color(r.color);
                            range_line_left.axisFill.fillOpacity = 0.8;
                            range_line_left.axisFill.strokeOpacity = 0;

                            var range_line_right = valueAxis.axisRanges.create();
                            range_line_right.value = r.range_stop - 0.01;
                            range_line_right.endValue = r.range_stop;
                            range_line_right.axisFill.fill = am4core.color(r.color);
                            range_line_right.axisFill.fillOpacity = 0.8;

                            if (options.show_range_text === true) {
                                range.label.text = "[font-size:12px]" + r.text + "[/]";
                                range.label.fill = am4core.color("black");
                                range.label.fillOpacity = 0.5;

                                range.label.inside = true;
                                range.label.location = 0;
                                range.label.rotation = 90;
                                range.label.marginTop = 5;
                                range.label.adapter.add("horizontalCenter", function () {
                                    return "left";
                                });
                                range.label.adapter.add("verticalCenter", function () {
                                    return "bottom";
                                });
                            }
                        }.bind(this)
                    );
                } catch (e) {
                    console.error("Error: drawRanges", e);
                }
            };

            var drawAxis = function (options) {
                try {
                    // console.warn('drawAxis :: ', options);

                    //create LEFT category axis
                    var categoryAxis_left = chart.yAxes.push(
                        new am4charts.CategoryAxis()
                    );
                    var label_left = categoryAxis_left.renderer.labels.template;
                    label_left.wrap = true;
                    label_left.align = "left";
                    //label_left.truncate = true;
                    label_left.maxWidth = options.item_text_left;
                    categoryAxis_left.dataFields.category = "category_left";
                    categoryAxis_left.renderer.grid.template.location = 0;
                    categoryAxis_left.renderer.opposite = false;
                    categoryAxis_left.renderer.inversed = true;

                    //create LEFT category axis
                    var categoryAxis_right = chart.yAxes.push(
                        new am4charts.CategoryAxis()
                    );
                    var label_right = categoryAxis_right.renderer.labels.template;
                    label_right.wrap = true;
                    label_right.align = "left";
                    //label_right.truncate = true;
                    label_right.maxWidth = options.item_text_right;
                    categoryAxis_right.dataFields.category = "category_right";
                    categoryAxis_right.renderer.grid.template.location = 0;
                    categoryAxis_right.renderer.opposite = true;
                    categoryAxis_right.renderer.inversed = true;
                } catch (e) {
                    console.error("Error: drawAxis", e);
                }
            };

            var drawProfiles = function (data_object, options) {
                try {
                    // console.warn('drawProfiles :: ', data_object);
                    var stroke_width = 6;

                    var getDateCH = function (date, full) {
                        var dateObj = new Date(date);
                        var o = {};
                        if (full === true) {
                            o = {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            };
                        } else {
                            o = {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric"
                            };
                        }
                        return dateObj.toLocaleDateString("de-DE", o);
                    };

                    data_object.captures.forEach(
                        function (val) {
                            //create line
                            var lineSeries = chart.series.push(new am4charts.LineSeries());
                            lineSeries.dataFields.categoryY = "category_left";
                            lineSeries.dataFields.valueX = val.category;
                            lineSeries.name =
                                "[font-size: 14px]" +
                                getDateCH(val.date) +
                                "[/]\n[font-size: 12px]" +
                                val.name;
                            lineSeries.strokeWidth = stroke_width;
                            lineSeries.strokeOpacity = 1;
                            lineSeries.tooltipText = val.name + ": {valueX.value}";

                            //add bullets | show_score_circles
                            var show_score_circles = true;
                            if (
                                hasValue(options.show_score_circles) &&
                                options.show_score_circles === false
                            ) {
                                show_score_circles = false;
                            }
                            if (show_score_circles) {
                                var circleBullet = lineSeries.bullets.push(
                                    new am4charts.CircleBullet()
                                );
                                circleBullet.circle.fill = am4core.color("#fff");
                                circleBullet.circle.strokeWidth = stroke_width;
                            }

                            //add line-bullets | show_score_profile_line
                            var show_score_vertical_line = false;
                            if (
                                hasValue(options.show_score_profile_line) &&
                                options.show_score_vertical_line === true
                            ) {
                                show_score_vertical_line = true;
                            }
                            if (show_score_vertical_line) {
                                var lineBullet = lineSeries.bullets.push(
                                    new am4charts.Bullet()
                                );
                                var square = lineBullet.createChild(am4core.Rectangle);
                                square.width = stroke_width;
                                square.height = options.item_height;
                                square.horizontalCenter = "middle";
                                square.verticalCenter = "middle";
                                var circle = lineBullet.createChild(am4core.Circle);
                                circle.fill = "white";
                                circle.radius = stroke_width / 2;
                                circle.height = options.item_height;
                                circle.horizontalCenter = "middle";
                                circle.verticalCenter = "middle";
                            }
                        }.bind(this)
                    );
                } catch (e) {
                    console.error("Error: drawProfiles", e);
                }
            };

            var drawCS = function (cs, options) {
                // console.warn('drawCS :: ', cs);

                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.categoryY = "category_left";
                series.dataFields.valueX = "cs_end";
                series.dataFields.openValueX = "cs_start";
                series.name = "[font-size: 12px] Klinikstichprobe";
                series.tooltipText = "{openValueX.value} - {valueX.value}";

                if (hasValue(options.color_clinic_sample)) {
                    // series.columns.template.fill = options.color_clinic_sample;
                    var gradient = new am4core.LinearGradient();
                    gradient.addColor(am4core.color(options.color_clinic_sample));
                    gradient.addColor(am4core.color(options.color_clinic_sample));
                    gradient.addColor(am4core.color("black"));
                    gradient.addColor(am4core.color(options.color_clinic_sample));
                    gradient.addColor(am4core.color(options.color_clinic_sample));
                    series.columns.template.fill = gradient;
                    series.columns.template.fillOpacity = 0.35;

                    series.columns.template.stroke = options.color_clinic_sample;
                    series.columns.template.strokeWidth = 1;
                    series.columns.template.strokeOpacity = 0.65;
                }
            };

            var drawNormSampleText = function (
                options,
                container_top_height,
                chart_data
            ) {
                var fontSize = 12;

                var c_top_left = container_top.createChild(am4core.Container);
                c_top_left.width = options.item_text_left;
                c_top_left.height = container_top_height;
                c_top_left.marginRight = fontSize / 2;

                var c_top_right = container_top.createChild(am4core.Container);
                c_top_right.width = am4core.percent(100);
                c_top_right.height = container_top_height;
                c_top_right.marginLeft = fontSize / 2;

                var l1 = c_top_left.createChild(am4core.Label);
                l1.text = "Normstichprobe";
                l1.fontSize = fontSize;
                l1.horizontalCenter = "right";
                l1.verticalCenter = "center";
                l1.x = options.item_text_left;
                l1.y = 0;
                l1.fill = "black";
                l1.fillOpacity = 0.5;

                var r1 = c_top_right.createChild(am4core.Label);
                r1.text = options.norm_sample;
                r1.fontSize = fontSize;
                r1.x = 0;
                r1.y = 0;
                r1.fill = "black";
                r1.fillOpacity = 0.8;

                var l2 = c_top_left.createChild(am4core.Label);
                l2.text = "Klinikstichprobe";
                l2.fontSize = fontSize;
                l2.horizontalCenter = "right";
                l2.verticalCenter = "center";
                l2.x = options.item_text_left;
                l2.y = l1.fontSize + 6;
                l2.fill = "black";
                l2.fillOpacity = 0.5;

                var r2 = c_top_right.createChild(am4core.Label);
                r2.text = chart_data.cs_sample_text;
                r2.fontSize = fontSize;
                r2.x = 0;
                r2.y = l1.fontSize + 6;
                r2.fill = "black";
                r2.fillOpacity = 0.8;
            };

            // Containers
            var container = am4core.create(this.$refs.chartdiv, am4core.Container);
            container.width = am4core.percent(100);
            container.height = am4core.percent(100);
            container.layout = "vertical";

            if (this.clinic_samples !== null) {
                var container_top = container.createChild(am4core.Container);
                container_top.width = am4core.percent(100);
                container_top.height = this.container_top_height;
                container_top.layout = "horizontal";
            }

            var container_chart = container.createChild(am4core.Container);
            container_chart.width = am4core.percent(100);
            container_chart.height = am4core.percent(100);
            container_chart.toFront();

            // Create Chart & add Data
            let chart = container_chart.createChild(am4charts.XYChart);
            chart.dateFormatter.dateFormat = "dd.MM.yyyy";
            chart.exporting.menu = new am4core.ExportMenu();
            chart.exporting.title = "Optinomic - Chart";
            chart.exporting.filePrefix = "optinomic_chart";

            // Create value axis for captures
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.opposite = true;
            valueAxis.min = this.options.min;
            valueAxis.max = this.options.max;

            // Add Data to Chart
            this.chart_data = this.dataBuild();
            chart.data = this.chart_data.data;

            // Zeichne Achsen
            drawAxis(this.options);

            // Ranges
            drawRanges(this.ranges, this.options);

            // Profiles
            drawProfiles(this.chart_data, this.options);

            // Klinikstichprobe
            if (this.clinic_samples !== null) {
                drawCS(this.clinic_samples, this.options);

                drawNormSampleText(
                    this.options,
                    this.container_top_height,
                    this.chart_data
                );
            }

            // add chart cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "zoomX";

            // add legend
            chart.legend = new am4charts.Legend();

            // Set
            this.chart = chart;
        }
    },
    computed: {
        getCSDive() {
            if (this.chart_data.dive) {
                return this.chart_data.dive;
            } else {
                return this.clinic_sample_dive;
            }
        },
        getChartHeight() {
            var height =
                (this.scales.length + 2) * this.options.item_height +
                this.container_top_height;
            // height = height + this.options.item_height;
            return height;
        }
    },
    mounted() {
        this.chartBuild();
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    },
    template: `
        <template>
            <div ref="full_chart">
              <div v-bind:style="{ width: '100%', height: getChartHeight + 'px' }" ref="chartdiv"></div>
              <div class="cs_toggle" v-if="clinic_samples">
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <div v-on="on">
                      <v-btn
                        icon
                        v-on:click="toggleCS"
                        v-if="!cs_toggle"
                        class="ma-2"
                        color="grey"
                      >
                        <v-icon>mdi-cog-outline</v-icon>
                      </v-btn>

                      <v-btn
                        icon
                        v-on:click="toggleCS"
                        v-if="cs_toggle"
                        class="ma-2"
                        color="pink"
                      >
                        <v-icon>mdi-cog-outline</v-icon>
                      </v-btn>
                    </div>
                  </template>
                  <span>Klinikstichprobe anpassen</span>
                </v-tooltip>
              </div>
              <div class="cs_toggle" v-if="!clinic_samples"></div>
              <v-container fluid v-if="cs_toggle">
                <v-row align="center" v-if="chart_data.dive">
                  <v-col
                    class="d-flex"
                    cols="12"
                    :sm="12 / chart_data.dive.length"
                    v-for="(dim, index) in clinic_samples.dimensions"
                    :key="index"
                  >
                    <v-select
                      :label="dim.name"
                      :items="dim.array"
                      item-value="id"
                      v-model="chart_data.dive[index]"
                      v-on:change="updateData"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </div>
        </template>
      `
});
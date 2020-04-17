Vue.component("optinmic-profile-chart",{props:{options:{type:Object,default:null},scales:{type:Array,default:null},scores:{type:Object,default:null},ranges:{type:Array,default:null},clinic_samples:{type:Object,default:null},clinic_sample_dive:{type:Array,default:null}},data:function(){return{chart:null,chart_data:{data:null,dive:null},container_top_height:18,cs_toggle:!1}},watch:{chart_data:function(){this.chart.data=this.chart_data.data,this.chart.invalidateRawData()}},methods:{toggleCS(){null!==this.clinic_samples&&(this.cs_toggle=!this.cs_toggle)},updateData(){this.chart_data=this.dataBuild()},dataBuild(){var scores_orig=this.scores,scales=this.scales,options=this.options,cs=this.clinic_samples,cs_dive=this.getCSDive;try{var scores=JSON.parse(JSON.stringify(scores_orig)),data_object={data:[],captures:[],dive:cs_dive,cs_sample_n:0,cs_sample_text:""},getCategoryText=function(title,text){var r="";return""!==title&&(r+=title),""!==title&&""!==text&&(r+=": "),""!==text&&(r+=text),"[font-size:11px]"+r+"[/]"},flatten=function(obj,name,stem){var out={},newStem=void 0!==stem&&""!==stem?stem+"."+name:name;if("object"!=typeof obj)return out[newStem]=obj,out;for(var p in obj){var prop=flatten(obj[p],p,newStem);out=merge([out,prop])}return out},merge=function(objects){for(var out={},i=0;i<objects.length;i++)for(var p in objects[i])out[p]=objects[i][p];return out};return scales.forEach(function(s,sid){var scale=Object.assign({},s);scale.category_left=getCategoryText(s.left_title,s.left_text),scale.category_right=getCategoryText(s.right_title,s.right_text),scores.data.forEach(function(_sr){var sr=flatten(_sr),capture_name="capture_event_"+sr.event_id;if(0===sid){var obj={category:capture_name,name:sr[options.response_title_path],date:sr[options.response_date_path],dropout:!1};!0===sr[options.dropout]&&(obj.name="[red font-size: 12px]"+sr[options.dropout_reason],obj.dropout=!0),data_object.captures.push(obj)}scale[capture_name]=sr[scale.score_path]}.bind(this)),null!==cs&&(null===cs_dive&&(cs_dive=[],"dimensions"in cs&&(cs.dimensions.forEach(function(dim){cs_dive.push(dim.array.length-1)}.bind(this)),data_object.dive=cs_dive)),scale.cs_data=function(_d,dive,cs_var){var return_obj={},build_var="";dive.forEach(function(_pos){build_var+=_pos,build_var+="."}.bind(this)),build_var=build_var+"statistics."+cs_var;var data=flatten(_d);return return_obj.n=data[build_var+".n"],return_obj.max=data[build_var+".max"],return_obj.min=data[build_var+".min"],return_obj.mean=data[build_var+".mean"],return_obj.standard_deviation=data[build_var+".standard_deviation"],return_obj.mean_1sd_min=data[build_var+".mean_1sd_min"],return_obj.mean_1sd_plus=data[build_var+".mean_1sd_plus"],return_obj.variance=data[build_var+".variance"],return_obj.z_score_min=data[build_var+".z_score_min"],return_obj.z_score_max=data[build_var+".z_score_max"],return_obj}(cs.data,cs_dive,scale.clinic_sample_var),scale.cs_mean=null,scale.cs_start=null,scale.cs_end=null,data_object.cs_sample_n="...",scale.cs_data?(scale.cs_mean=scale.cs_data.mean,scale.cs_start=scale.cs_data.mean_1sd_min,scale.cs_end=scale.cs_data.mean_1sd_plus,data_object.cs_sample_n=scale.cs_data.n):console.error("--\x3e CS",cs.data,cs_dive,scale.cs_full_data,s,sid)),data_object.data.push(scale)}.bind(this)),null!==cs&&(cs.dimensions.forEach(function(dim,dim_id){""!==data_object.cs_sample_text&&(data_object.cs_sample_text=data_object.cs_sample_text+" | "),data_object.cs_sample_text=data_object.cs_sample_text+dim.array[data_object.dive[dim_id]].text}.bind(this)),void 0!==data_object&&(data_object.cs_sample_text=data_object.cs_sample_text+" (N="+data_object.cs_sample_n+")")),data_object}catch(e){console.error("Error: buildData",e)}},chartBuild(){var hasValue=function(value){try{return null!==value&&"null"!==value&&void 0!==value&&""!==value}catch(e){return!1}},container=am4core.create(this.$refs.chartdiv,am4core.Container);if(container.width=am4core.percent(100),container.height=am4core.percent(100),container.layout="vertical",null!==this.clinic_samples){var container_top=container.createChild(am4core.Container);container_top.width=am4core.percent(100),container_top.height=this.container_top_height,container_top.layout="horizontal"}var container_chart=container.createChild(am4core.Container);container_chart.width=am4core.percent(100),container_chart.height=am4core.percent(100),container_chart.toFront();let chart=container_chart.createChild(am4charts.XYChart);chart.dateFormatter.dateFormat="dd.MM.yyyy",chart.exporting.menu=new am4core.ExportMenu,chart.exporting.title="Optinomic - Chart",chart.exporting.filePrefix="optinomic_chart";var valueAxis=chart.xAxes.push(new am4charts.ValueAxis);valueAxis.renderer.opposite=!0,valueAxis.min=this.options.min,valueAxis.max=this.options.max,this.chart_data=this.dataBuild(),chart.data=this.chart_data.data,function(options){try{var categoryAxis_left=chart.yAxes.push(new am4charts.CategoryAxis),label_left=categoryAxis_left.renderer.labels.template;label_left.wrap=!0,label_left.align="left",label_left.maxWidth=options.item_text_left,categoryAxis_left.dataFields.category="category_left",categoryAxis_left.renderer.grid.template.location=0,categoryAxis_left.renderer.opposite=!1,categoryAxis_left.renderer.inversed=!0;var categoryAxis_right=chart.yAxes.push(new am4charts.CategoryAxis),label_right=categoryAxis_right.renderer.labels.template;label_right.wrap=!0,label_right.align="left",label_right.maxWidth=options.item_text_right,categoryAxis_right.dataFields.category="category_right",categoryAxis_right.renderer.grid.template.location=0,categoryAxis_right.renderer.opposite=!0,categoryAxis_right.renderer.inversed=!0}catch(e){console.error("Error: drawAxis",e)}}(this.options),function(ranges,options){try{ranges.forEach(function(r){var range=valueAxis.axisRanges.create(),range_start=r.range_start;-999===range_start&&(range_start=options.min);var range_stop=r.range_stop;999===range_stop&&(range_stop=options.max),range.value=range_start,range.endValue=range_stop,range.axisFill.fill=am4core.color(r.color),range.axisFill.fillOpacity=options.range_alpha||.3;var range_line_left=valueAxis.axisRanges.create();range_line_left.value=r.range_start,range_line_left.endValue=r.range_start+.01,range_line_left.axisFill.fill=am4core.color(r.color),range_line_left.axisFill.fillOpacity=.8,range_line_left.axisFill.strokeOpacity=0;var range_line_right=valueAxis.axisRanges.create();range_line_right.value=r.range_stop-.01,range_line_right.endValue=r.range_stop,range_line_right.axisFill.fill=am4core.color(r.color),range_line_right.axisFill.fillOpacity=.8,!0===options.show_range_text&&(range.label.text="[font-size:12px]"+r.text+"[/]",range.label.fill=am4core.color("black"),range.label.fillOpacity=.5,range.label.inside=!0,range.label.location=0,range.label.rotation=90,range.label.marginTop=5,range.label.adapter.add("horizontalCenter",function(){return"left"}),range.label.adapter.add("verticalCenter",function(){return"bottom"}))}.bind(this))}catch(e){console.error("Error: drawRanges",e)}}(this.ranges,this.options),function(data_object,options){try{data_object.captures.forEach(function(val){var date,full,dateObj,o,lineSeries=chart.series.push(new am4charts.LineSeries);lineSeries.dataFields.categoryY="category_left",lineSeries.dataFields.valueX=val.category,lineSeries.name="[font-size: 14px]"+(date=val.date,dateObj=new Date(date),o={},o=!0===full?{weekday:"long",year:"numeric",month:"long",day:"numeric"}:{year:"numeric",month:"numeric",day:"numeric"},dateObj.toLocaleDateString("de-DE",o))+"[/]\n[font-size: 12px]"+val.name,lineSeries.strokeWidth=6,lineSeries.strokeOpacity=1,lineSeries.tooltipText=val.name+": {valueX.value}";var show_score_circles=!0;if(hasValue(options.show_score_circles)&&!1===options.show_score_circles&&(show_score_circles=!1),show_score_circles){var circleBullet=lineSeries.bullets.push(new am4charts.CircleBullet);circleBullet.circle.fill=am4core.color("#fff"),circleBullet.circle.strokeWidth=6}var show_score_vertical_line=!1;if(hasValue(options.show_score_profile_line)&&!0===options.show_score_vertical_line&&(show_score_vertical_line=!0),show_score_vertical_line){var lineBullet=lineSeries.bullets.push(new am4charts.Bullet),square=lineBullet.createChild(am4core.Rectangle);square.width=6,square.height=options.item_height,square.horizontalCenter="middle",square.verticalCenter="middle";var circle=lineBullet.createChild(am4core.Circle);circle.fill="white",circle.radius=3,circle.height=options.item_height,circle.horizontalCenter="middle",circle.verticalCenter="middle"}}.bind(this))}catch(e){console.error("Error: drawProfiles",e)}}(this.chart_data,this.options),null!==this.clinic_samples&&(function(cs,options){var series=chart.series.push(new am4charts.ColumnSeries);if(series.dataFields.categoryY="category_left",series.dataFields.valueX="cs_end",series.dataFields.openValueX="cs_start",series.name="[font-size: 12px] Klinikstichprobe",series.tooltipText="{openValueX.value} - {valueX.value}",hasValue(options.color_clinic_sample)){var gradient=new am4core.LinearGradient;gradient.addColor(am4core.color(options.color_clinic_sample)),gradient.addColor(am4core.color(options.color_clinic_sample)),gradient.addColor(am4core.color("black")),gradient.addColor(am4core.color(options.color_clinic_sample)),gradient.addColor(am4core.color(options.color_clinic_sample)),series.columns.template.fill=gradient,series.columns.template.fillOpacity=.35,series.columns.template.stroke=options.color_clinic_sample,series.columns.template.strokeWidth=1,series.columns.template.strokeOpacity=.65}}(this.clinic_samples,this.options),function(options,container_top_height,chart_data){var c_top_left=container_top.createChild(am4core.Container);c_top_left.width=options.item_text_left,c_top_left.height=container_top_height,c_top_left.marginRight=6;var c_top_right=container_top.createChild(am4core.Container);c_top_right.width=am4core.percent(100),c_top_right.height=container_top_height,c_top_right.marginLeft=6;var l1=c_top_left.createChild(am4core.Label);l1.text="Normstichprobe",l1.fontSize=12,l1.horizontalCenter="right",l1.verticalCenter="center",l1.x=options.item_text_left,l1.y=0,l1.fill="black",l1.fillOpacity=.5;var r1=c_top_right.createChild(am4core.Label);r1.text=options.norm_sample,r1.fontSize=12,r1.x=0,r1.y=0,r1.fill="black",r1.fillOpacity=.8;var l2=c_top_left.createChild(am4core.Label);l2.text="Klinikstichprobe",l2.fontSize=12,l2.horizontalCenter="right",l2.verticalCenter="center",l2.x=options.item_text_left,l2.y=l1.fontSize+6,l2.fill="black",l2.fillOpacity=.5;var r2=c_top_right.createChild(am4core.Label);r2.text=chart_data.cs_sample_text,r2.fontSize=12,r2.x=0,r2.y=l1.fontSize+6,r2.fill="black",r2.fillOpacity=.8}(this.options,this.container_top_height,this.chart_data)),chart.cursor=new am4charts.XYCursor,chart.cursor.behavior="zoomX",chart.legend=new am4charts.Legend,this.chart=chart}},computed:{getCSDive(){return this.chart_data.dive?this.chart_data.dive:this.clinic_sample_dive},getChartHeight(){return(this.scales.length+2)*this.options.item_height+this.container_top_height}},mounted(){this.chartBuild()},beforeDestroy(){this.chart&&this.chart.dispose()},template:'\n        <template>\n            <div ref="full_chart">\n              <div v-bind:style="{ width: \'100%\', height: getChartHeight + \'px\' }" ref="chartdiv"></div>\n              <div class="cs_toggle" v-if="clinic_samples">\n                <v-tooltip right>\n                  <template v-slot:activator="{ on }">\n                    <div v-on="on">\n                      <v-btn\n                        icon\n                        v-on:click="toggleCS"\n                        v-if="!cs_toggle"\n                        class="ma-2"\n                        color="grey"\n                      >\n                        <v-icon>mdi-cog-outline</v-icon>\n                      </v-btn>\n\n                      <v-btn\n                        icon\n                        v-on:click="toggleCS"\n                        v-if="cs_toggle"\n                        class="ma-2"\n                        color="pink"\n                      >\n                        <v-icon>mdi-cog-outline</v-icon>\n                      </v-btn>\n                    </div>\n                  </template>\n                  <span>Klinikstichprobe anpassen</span>\n                </v-tooltip>\n              </div>\n              <div class="cs_toggle" v-if="!clinic_samples"></div>\n              <v-container fluid v-if="cs_toggle">\n                <v-row align="center" v-if="chart_data.dive">\n                  <v-col\n                    class="d-flex"\n                    cols="12"\n                    :sm="12 / chart_data.dive.length"\n                    v-for="(dim, index) in clinic_samples.dimensions"\n                    :key="index"\n                  >\n                    <v-select\n                      :label="dim.name"\n                      :items="dim.array"\n                      item-value="id"\n                      v-model="chart_data.dive[index]"\n                      v-on:change="updateData"\n                    ></v-select>\n                  </v-col>\n                </v-row>\n              </v-container>\n            </div>\n        </template>\n      '});
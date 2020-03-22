Polymer({is:"optinomic-chart-profile",behaviors:[Polymer.IronResizableBehavior],listeners:{"iron-resize":"__onIronResize"},properties:{language:{type:String,value:"de"},options:{type:Object,observer:"onInit"},start:{type:Object,observer:"onInit"},scales:{type:Object,observer:"onInit"},scores:{type:Object,observer:"onInit"},ranges:{type:Object,observer:"onInit"},clinic_samples:{type:Object,observer:"onInit"},clinic_sample_dive:{type:Array,notify:!0,observer:"onInit"},_clinic_sample_profiles:{type:Array,notify:!0}},__translate:function(given_language){var t={language:given_language};t.to="de"===given_language?"bis":"to",t.measurements="de"===given_language?"Messung":"Measurement",t.clinic_sample="de"===given_language?"Klinikstichprobe":"Clinical sample",t.norm_sample="de"===given_language?"Normstichprobe":"Norm sample",t.ranges="de"===given_language?"Interpretation":"Ranges",this.t=t},__init:function(){this.start=void 0===this.start?null:this.start,this.scales=void 0===this.scales?[]:this.scales,this.ranges=void 0===this.ranges?[]:this.ranges,this.scores=void 0===this.scores?{}:this.scores,this.clinic_samples=void 0===this.clinic_samples?{empty:!0}:this.clinic_samples;var init_dive_path=[];"dimensions"in this.clinic_samples&&this.clinic_samples.dimensions.forEach(function(dim,dimID){init_dive_path.push(dim.array.length-1)}),this.clinic_sample_dive=void 0===this.clinic_sample_dive?init_dive_path:this.clinic_sample_dive;var d=void 0===this.options?{}:this.options;d.color_grid=void 0===d.color_grid?"#795548":d.color_grid,d.topnumber_hide_first_last=void 0!==d.topnumber_hide_first_last&&d.topnumber_hide_first_last,d.color_grid_baseline=void 0===d.color_grid_baseline?hexToRGB(d.color_grid,.4):d.color_grid_baseline,d.color_clinic_sample=void 0===d.color_clinic_sample?"#673AB7":d.color_clinic_sample,d.show_baseline=void 0!==d.show_baseline&&d.show_baseline,d.show_score_vertical_line=void 0!==d.show_score_vertical_line&&d.show_score_vertical_line,d.show_score_profile_line=void 0===d.show_score_profile_line||d.show_score_profile_line,d.show_score_circles=void 0===d.show_score_circles||d.show_score_circles,d.show_scale_text=void 0!==d.show_scale_text&&d.show_scale_text,d.show_settings_block=void 0!==d.show_settings_block&&d.show_settings_block,d.show_ranges_overview=void 0===d.show_ranges_overview||d.show_ranges_overview,d.allow_toggle_settings_block=void 0===d.allow_toggle_settings_block||d.allow_toggle_settings_block,d.item_height=void 0===d.item_height?50:d.item_height,d.item_text_left=void 0===d.item_text_left?120:d.item_text_left,d.item_text_left_show=!0,0===d.item_text_left&&(d.item_text_left_show=!1),d.item_text_right=void 0===d.item_text_right?120:d.item_text_right,d.item_text_right_show=!0,0===d.item_text_right&&(d.item_text_right_show=!1),d.item_text_left<=62?d.legend_left=62:d.legend_left=d.item_text_left,d.response_title_path=void 0===d.response_title_path?null:d.response_title_path,d.response_date_path=void 0===d.response_date_path?null:d.response_date_path,d.min=void 0===d.min?"auto":d.min,d.max=void 0===d.max?"auto":d.max,d.range_alpha=void 0===d.range_alpha?.1:d.range_alpha,d.vertical_grid_every_x=void 0===d.vertical_grid_every_x?1:d.vertical_grid_every_x,d.ranges_available=!1,this.ranges.length>0&&(d.ranges_available=!0),d.norm_sample_defined="norm_sample"in d,d.wide=!0,d.wide_breakpoint=void 0===d.wide_breakpoint?520:d.wide_breakpoint,d.grafic_top_space=20,d.grafic_width=void 0===d.grafic_width?480:d.grafic_width,d.grafic_margin_left=d.item_text_left,d.grafic_margin_right=d.item_text_right,d.grafic_text_visibility="hidden",d.grafic_height=d.item_height*this.scales.length+d.grafic_top_space+1,d.tab_selected=0,d.color_skin=void 0===d.color_skin?"default":d.color_skin,this.set("d",d)},__setScales:function(full){full=void 0===full;var d=this.get("d"),scales=this.get("scales"),scores=this.get("scores.data");__getScorePath=function(current_score,path){var data_dive=JSON.parse(JSON.stringify(current_score)),dots_count=path.split(".").length-1;if(0===dots_count)return data_dive[path];var dive=[];for(i=0;i<dots_count;i++){var n=path.indexOf("."),item=path.substring(0,n);path=path.substring(n+1,path.length),dive.push(item),i===dots_count-1&&dive.push(path)}for(i=0;i<dive.length;i++)if(data_dive=data_dive[dive[i]],i===dots_count)return data_dive},void 0!==scales&&null!==scales&&scales.forEach(function(scale,scaleID){scale.id=scaleID,scale.id_left_text=scaleID+"_left_text",scale.id_right_text=scaleID+"_right_text",scale.topline=scaleID*d.item_height+d.grafic_top_space,scale.baseline=scale.topline+d.item_height/2,scale.bottomline=scale.topline+d.item_height,scale.first=!1,0===scaleID&&(scale.first=!0),scale.last=!1,scaleID===scales.length-1&&(scale.last=!0),scale.scores=[],void 0!==scores&&null!==scores&&scores.forEach(function(score,scoreID){var score_obj={value:null,dropout_is:!1,dropout_reason:""};scale.score_path&&(score_obj.value=this.__getScorePath(score,scale.score_path)),d.response_title_path?score_obj.title=this.__getScorePath(score,d.response_title_path):score_obj.title="Unbekannt",d.response_date_path?score_obj.date=this.__getScorePath(score,d.response_date_path):score_obj.date=null,"dropout"in d&&d.dropout&&!0===this.__getScorePath(score,d.dropout)&&(score_obj.dropout_is=!0,score_obj.dropout_reason=this.__getScorePath(score,d.dropout_reason)),scale.scores.push(score_obj)})});var do_min=!1;"auto"===d.min||void 0===d.min?do_min=!0:(item_min=parseInt(d.min),this.set("d.item_min",item_min));var do_max=!1;if("auto"===d.max||void 0===d.max?do_max=!0:(item_max=parseInt(d.max),this.set("d.item_max",item_max)),do_max||do_min){var min_max=__autoMinMax(do_min,do_max,d,this.scales);this.set("d.item_min",min_max.item_min),this.set("d.item_max",min_max.item_max)}this.set("scales_set",!0),full&&(this.__setRanges(),this.__setVerticalGrid(),this.__setScoreProfiles())},__setVerticalGrid:function(){var d=this.get("d"),every=d.vertical_grid_every_x,every_counter=0;for(vGrid=[],i=d.item_min;i<d.item_max+1;i++){every_counter+=1;var grid_object={count:i-d.item_min,value:i,x:__getXPos(d.item_min,d.item_max,d.grafic_width,i),y1:d.grafic_top_space,y2:d.grafic_height-1,zero:!1,first:!1,last:!1,first_last:!1};0===i&&(grid_object.zero=!0),i-d.item_min==0&&(grid_object.first=!0),i-d.item_max==0&&(grid_object.last=!0),(grid_object.first||grid_object.last)&&(grid_object.first_last=!0),every_counter!==every&&i!==d.item_min&&i!==d.item_max&&0!==i||(vGrid.push(grid_object),every_counter=0)}this.set("verticalGrid",vGrid)},__setRanges:function(){var ranges=JSON.parse(JSON.stringify(this.get("ranges"))),d=this.get("d"),t=this.get("t");ranges.length>0&&(ranges.forEach(function(range,rangeID){range.id=rangeID,range.color_bg=hexToRGB(range.color,.1),range.rgb=hexToRGB(range.color,d.range_alpha),range.show=void 0===range.show||range.show,range.from_to="",range.start=range.range_start,range.stop=range.range_stop,-999===range.range_start?(range.start=d.item_min,range.from_to="<="):range.from_to=">"+range.start+" "+t.to+" ",999===range.range_stop?(range.stop=d.item_max,range.from_to=">="+range.start):range.from_to=range.from_to+range.stop,rangeID===ranges.length-1?range.last=!0:range.last=!1,range.start_pos=__getXPos(d.item_min,d.item_max,d.grafic_width,range.start),range.stop_pos=__getXPos(d.item_min,d.item_max,d.grafic_width,range.stop),range.width=range.stop_pos-range.start_pos,range.x=__getXPos(d.item_min,d.item_max,d.grafic_width,range.start),range.y=d.grafic_top_space,range.height=d.grafic_height-d.grafic_top_space-1,range.line_x_left=range.x+1,range.line_x_right=range.x+range.width-1,range.line_y1=d.grafic_top_space,range.line_y2=d.grafic_height-1,range.line_color=hexToRGB(range.color,2*d.range_alpha)}),this.set("ranges",ranges))},__setScoreProfiles:function(){var d=this.get("d"),ranges=this.get("ranges"),scales=this.get("scales"),my_min=d.item_min,my_max=d.item_max,my_100=d.grafic_width,scores_points=[],scores_lines=[];scales.forEach(function(scale,scaleID){scale.scores.forEach(function(score,scoreID){score.value_x=__getXPos(my_min,my_max,my_100,score.value),score.value_y=scale.baseline;var my_color=getColor(scoreID,d.color_skin),score_obj={id:scoreID,title:score.title,date:formatDateCH(score.date),points:[],lines:[],points_str:"",color:my_color,color_line:hexToRGB(my_color,.8),color_rgb:hexToRGB(my_color,.1),dropout_is:score.dropout_is,dropout_reason:score.dropout_reason};"show"in score?(score_obj.show=score.show,console.error(score)):score_obj.show=!0,score.dropout_is&&(score_obj.show=!1);var points_obj={value:score.value,x:score.value_x,y:score.value_y,stroke:my_color,fill:"white"},line_obj={y1:scale.topline,y2:scale.bottomline,x:score.value_x};ranges.length>0&&ranges.forEach(function(range,rangeID){score.value_x>=range.start_pos&&score.value_x<=range.stop_pos&&(points_obj.fill=range.color)}),scores_points[scoreID]=void 0===scores_points[scoreID]?score_obj:scores_points[scoreID],scores_points[scoreID].points.push(points_obj),scores_points[scoreID].points_str=scores_points[scoreID].points_str+score.value_x+","+score.value_y+" ",scores_lines[scoreID]=void 0===scores_lines[scoreID]?score_obj:scores_lines[scoreID],scores_lines[scoreID].lines.push(line_obj)})}),this.set("_score_profiles",scores_points)},__csChanged:function(e){var d=this.get("d"),scales=this.get("scales");if(void 0!==e)if(void 0!==e.detail)var clinic_sample_name=e.detail;else clinic_sample_name="AUTO";var clinic_sample_data=this.get("clinic_sample_data"),clone_clinic_sample_profiles=JSON.parse(JSON.stringify([])),my_min=d.item_min,my_max=d.item_max,my_100=d.grafic_width,abstand=d.item_height/5,scores_points_min=[],scores_points_max=[],scores_points_mean=[];clone_clinic_sample_profiles.forEach(function(cs,csID){cs.show=!1}),scales.forEach(function(scale,scaleID){var data=clinic_sample_data[scale.clinic_sample_var];scale.clinic_sample_min=data.mean_1sd_min,scale.clinic_sample_max=data.mean_1sd_plus,scale.clinic_sample_mean=data.mean,-1===clinic_sample_name.indexOf("(N=")&&(clinic_sample_name=e.detail+" (N="+data.n+")");var points_obj_min={},points_obj_max={},points_obj_mean={};0===scaleID?(points_obj_min={value:scale.clinic_sample_min,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_min),y:scale.topline,scaleID:scaleID},points_obj_max={value:scale.clinic_sample_max,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_max),y:scale.topline,scaleID:999.5-scaleID},points_obj_mean={value:scale.clinic_sample_mean,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_mean),y:scale.topline,scaleID:scaleID}):(points_obj_min={value:scale.clinic_sample_min,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_min),y:scale.topline+abstand,scaleID:scaleID},points_obj_max={value:scale.clinic_sample_max,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_max),y:scale.topline+abstand,scaleID:999.5-scaleID},points_obj_mean={value:scale.clinic_sample_mean,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_mean),y:scale.topline+abstand,scaleID:scaleID}),scores_points_min.push(points_obj_min),scores_points_max.push(points_obj_max),scores_points_mean.push(points_obj_mean),scaleID===scales.length-1?(points_obj_min={value:scale.clinic_sample_min,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_min),y:scale.bottomline,scaleID:scaleID},points_obj_max={value:scale.clinic_sample_max,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_max),y:scale.bottomline,scaleID:999-scaleID},points_obj_mean={value:scale.clinic_sample_mean,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_mean),y:scale.bottomline,scaleID:scaleID}):(points_obj_min={value:scale.clinic_sample_min,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_min),y:scale.bottomline-abstand,scaleID:scaleID},points_obj_max={value:scale.clinic_sample_max,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_max),y:scale.bottomline-abstand,scaleID:999-scaleID},points_obj_mean={value:scale.clinic_sample_mean,x:__getXPos(my_min,my_max,my_100,scale.clinic_sample_mean),y:scale.bottomline-abstand,scaleID:scaleID}),scores_points_min.push(points_obj_min),scores_points_max.push(points_obj_max),scores_points_mean.push(points_obj_mean)}),this.set("scales",scales);var key,cs_profile={name:clinic_sample_name,show:!0,color:d.color_clinic_sample,color_bg:hexToRGB(d.color_clinic_sample,.1),color_profile:hexToRGB(d.color_clinic_sample,.3),color_line:hexToRGB(d.color_clinic_sample,.8),color_line_mean:hexToRGB("#FFFFFF",.5)};cs_profile.points_str="",cs_profile.points_str_min="",cs_profile.points_str_max="",cs_profile.points_str_mean="",scores_points_min.forEach(function(p,pID){cs_profile.points_str=cs_profile.points_str+p.x+","+p.y+" ",cs_profile.points_str_min=cs_profile.points_str_min+p.x+","+p.y+" "}),key="scaleID",(scores_points_max=scores_points_max.sort(function(a,b){var x=a[key],y=b[key];return x<y?-1:x>y?1:0})).forEach(function(p,pID){cs_profile.points_str=cs_profile.points_str+p.x+","+p.y+" ",cs_profile.points_str_max=cs_profile.points_str_max+p.x+","+p.y+" "}),scores_points_mean.forEach(function(p,pID){cs_profile.points_str_mean=cs_profile.points_str_mean+p.x+","+p.y+" "}),clone_clinic_sample_profiles.push(cs_profile),this.set("_clinic_sample_profiles",clone_clinic_sample_profiles);var cs={available:!1,name:""};clone_clinic_sample_profiles.length>0&&(cs.name=clone_clinic_sample_profiles[0].name,cs.available=!0),this.set("cs",cs)},__refreshChart:function(){var myNode=document.getElementById("svg_grafic");myNode.innerHTML="",myNode.appendChild(this.myProfiles),this.$.all_repeat.render()},__resizeGrafic:function(follow){follow=void 0===follow;var d=this.get("d");d.wide=void 0===d.wide||d.wide;var full_width=this.$.svg_grafic.offsetWidth;d.wide?(this.set("d.grafic_width",full_width-(this.d.grafic_margin_left+this.d.grafic_margin_right)),this.set("d.grafic_text_visibility","visible"),this.customStyle["--grafic-margin-left"]=this.d.grafic_margin_left+"px",this.customStyle["--grafic-margin-right"]=this.d.grafic_margin_right+"px"):(this.set("d.grafic_width",full_width),this.set("d.grafic_text_visibility","hidden"),this.customStyle["--grafic-margin-left"]="0px",this.customStyle["--grafic-margin-right"]="0px"),this.customStyle["--grafic-top-space"]=this.d.grafic_top_space+"px",this.customStyle["--item-height"]=this.d.item_height+"px",this.customStyle["--grafic-height"]=this.d.grafic_height+"px",this.customStyle["--grafic-size"]=this.d.grafic_width+"px",this.customStyle["--grafic-text-visibility"]=this.d.grafic_text_visibility,this.updateStyles(),follow&&this.__setScales(),this.__redrawChart()},__onIronResize:function(){var width=Math.floor(this.offsetWidth);void 0!==this.d&&(width<=this.d.wide_breakpoint?this.set("d.wide",!1):this.set("d.wide",!0),this.__resizeGrafic())},__tabChanged:function(){var d=this.get("d");d.animate_grid_0=!1,d.animate_grid_1=!1,d.animate_grid_2=!1,str_var="animate_grid_"+d.tab_selected,d[str_var]=!0,this.set("animate_grid_0",d.animate_grid_0),this.set("animate_grid_1",d.animate_grid_1),this.set("animate_grid_2",d.animate_grid_2)},__tabChanged:function(){var d=this.get("d");d.animate_grid_0=!1,d.animate_grid_1=!1,d.animate_grid_2=!1,str_var="animate_grid_"+d.tab_selected,d[str_var]=!0,this.set("animate_grid_0",d.animate_grid_0),this.set("animate_grid_1",d.animate_grid_1),this.set("animate_grid_2",d.animate_grid_2)},__redrawChart:function(){this.set("draw_chart",!1),this.debounce("__redrawChart",function(){setTimeout(function(){if(this.__setScales(!0),void 0!==this._clinic_sample_profiles&&void 0!==this._clinic_sample_profiles[0].name){var fake_event={detail:this._clinic_sample_profiles[0].name};this.__csChanged(fake_event)}this.set("draw_chart",!0)}.bind(this),50)},350)},__toggleSettingsBlock:function(){this.set("d.show_settings_block",!this.d.show_settings_block)},__toggleScore:function(oEvent){_score_profiles=this.get("_score_profiles");var current_score=oEvent.model.get("score");current_score.show=!current_score.show,_score_profiles[current_score.id]=current_score,this.set("_score_profiles",_score_profiles),this.__redrawChart(),console.warn("___toggleScore",current_score,_score_profiles)},onInit:function(){this.debounce("onInit",function(){this.__init()},250)},ready:function(){this.__translate(this.language)},attached:function(){this.set("draw_chart",!1)},get_parent(){return this.parentNode.nodeType===Node.DOCUMENT_FRAGMENT_NODE?this.parentNode.host:this.parentNode}}),getColor=function(id,color_skin){var colors=[];return"default"===(color_skin=void 0===color_skin?"default":color_skin)&&(colors.push("#3F51B5"),colors.push("#E91E63"),colors.push("#00BCD4"),colors.push("#8BC34A"),colors.push("#FFC107"),colors.push("#795548"),colors.push("#673AB7"),colors.push("#F44336"),colors.push("#03A9F4"),colors.push("#4CAF50"),colors.push("#FFEB3B"),colors.push("#FF5722"),colors.push("#2196F3"),colors.push("#9C27B0"),colors.push("#009688"),colors.push("#CDDC39"),colors.push("#FF9800"),colors.push("#607D8B")),"grey_dark_to_light"===color_skin&&(colors.push("#424242"),colors.push("#9E9E9E"),colors.push("#E0E0E0"),colors.push("#FAFAFA")),"indigo_dark_to_light"===color_skin&&(colors.push("#283593"),colors.push("#3F51B5"),colors.push("#7986CB"),colors.push("#E8EAF6")),"pink_dark_to_light"===color_skin&&(colors.push("#AD1457"),colors.push("#E91E63"),colors.push("#7986CB"),colors.push("#E8EAF6")),"indigo_grey_pink"===color_skin&&(colors.push("#1A237E"),colors.push("#212121"),colors.push("#880E4F"),colors.push("#3F51B5"),colors.push("#9E9E9E"),colors.push("#E91E63"),colors.push("#C5CAE9"),colors.push("#F5F5F5"),colors.push("#F8BBD0")),"zebra"===color_skin&&(colors.push("#212121"),colors.push("#EEEEEE")),id>colors.length-1?colors[id-Math.floor(id/colors.length)*colors.length]:colors[id]},hexToRGB=function(hex,alpha){var h="0123456789ABCDEF",r=16*h.indexOf(hex[1])+h.indexOf(hex[2]),g=16*h.indexOf(hex[3])+h.indexOf(hex[4]),b=16*h.indexOf(hex[5])+h.indexOf(hex[6]);return alpha?"rgba("+r+", "+g+", "+b+", "+alpha+")":"rgb("+r+", "+g+", "+b+")"},__autoMinMax=function(do_min,do_max,d,all_scales){return do_min&&(d.item_min=0),do_max&&(d.item_max=0),all_scales.forEach(function(scale,scaleID){scale.scores.forEach(function(score,scoreID){do_min&&score.value<d.item_min&&(d.item_min=score.value),do_max&&score.value>d.item_max&&(d.item_max=score.value)})}),do_min?(d.item_min<0?(d.item_min=Math.ceil(Math.abs(d.item_min))+1,d.item_min=-1*d.item_min):d.item_min=Math.ceil(Math.abs(d.item_min))+1,d.item_min>0&&(d.item_min=0)):d.item_min=d.min,do_max?d.item_max<0?(d.item_max=Math.ceil(Math.abs(d.item_max))+1,d.item_max=-1*d.item_max):d.item_max=Math.ceil(Math.abs(d.item_max))+1:d.item_max=d.max,d},__getXPos=function(min,max,svg_width_100,current_value){var width_value=null;if(void 0!==current_value){current_value=current_value;var width_100=Math.abs(min)+Math.abs(max);width_value=svg_width_100/width_100*(current_value+Math.abs(min)),width_value_max=svg_width_100/width_100*(Math.abs(max)+Math.abs(min)),width_value>width_value_max&&(width_value=width_value_max),width_value<0&&(width_value=0)}return width_value},formatDateCH=function(date_string){if(void 0!==date_string&&null!==date_string){var year=parseInt(date_string.substring(0,4)),month=parseInt(date_string.substring(5,7));return parseInt(date_string.substring(8,10))+"."+month+"."+year}return null};
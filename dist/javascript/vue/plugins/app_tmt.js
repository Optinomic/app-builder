const plugin_tmt={install(Vue,options){Vue.mixin({data:function(){return{name:"TMT",tmt_chart:{options:{min:-6,max:"auto",item_height:58,item_text_left:100,item_text_right:100,color_grid:"#9E9E9E",color_clinic_sample:"#888888",color_skin:"grey_dark_to_light",show_baseline:!1,show_ranges_overview:!1,show_scale_text:!0,show_score_vertical_line:!1,show_score_profile_line:!0,show_score_circles:!0,range_alpha:.09,show_settings_block:!1,allow_toggle_settings_block:!0,topnumber_hide_first_last:!1,vertical_grid_every_x:1,norm_sample:"Z-Normierung anhand von Gesunden",response_title_path:"calculation.tmt_score.Messzeitpunkt.Messzeitpunkt_Text",response_date_path:"date"},start:{left_title:"schnell",left_text:"Schneller im Vergleich zur Norm",left_color:"#4CAF50",right_title:"langsam",right_text:"Verlangsamung gegenüber Norm",right_color:"#F44336"},scales:[{left_title:"TMT A",left_text:"schnell",right_title:"TMT A",right_text:"langsam",score_path:"calculation.tmt_score.percentile.z_scores.tmtA_z_neu_rounded",clinic_sample_var:"TMTAZ",items:1},{id:1,left_title:"TMT B",left_text:"schnell",right_title:"TMT B",right_text:"langsam",score_path:"calculation.tmt_score.percentile.z_scores.tmtB_z_neu_rounded",clinic_sample_var:"TMTBZ",items:5}],ranges:[{range_start:-999,range_stop:1,text:"Normale Geschwindigkeit",color:"#2E7D32"},{range_start:2,range_stop:999,text:"Verlangsamung gegenüber Norm",color:"#C62828"}]}}},methods:{_show_BA:function(mz){return 1===(mz=mz||999)},tmt_get_cs_dive:function(s){var dive=[];try{if(s.data.length>0){var latest_sr=s.data[s.data.length-1];99!==latest_sr.calculation.tmt_score.percentile.age_perz.altersgruppe?dive.push(latest_sr.calculation.tmt_score.percentile.age_perz.altersgruppe):dive.push(11),!0===latest_sr.calculation.tmt_score.percentile.age_perz.education_high?dive.push(1):dive.push(0);var mz=latest_sr.calculation.tmt_score.mz-1;0===mz||1===mz||2===mz?dive.push(mz):dive.push(3)}}catch(e){console.log("tmt_get_cs_dive",e)}return dive},tmt_pdf_datenblatt:function(_sr){var table={headerRows:1,layout:"lightHorizontalLines",margin:[0,6,0,12],table:{widths:[170,"*","*","*","*","*"],body:[]}};table.table.body.push([[{text:"Messzeitpunkt",style:"p",margin:[0,0,0,0]},{text:"Datum",style:"chart_p",margin:[0,0,0,6]}],[{text:"Zeit",style:"p",margin:[0,0,0,0]},{text:"TMT A",style:"chart_p",margin:[0,0,0,6]}],[{text:"Fehler",style:"p",margin:[0,0,0,0]},{text:"TMT A",style:"chart_p",margin:[0,0,0,6]}],[{text:"Zeit",style:"p",margin:[0,0,0,0]},{text:"TMT B",style:"chart_p",margin:[0,0,0,6]}],[{text:"Fehler",style:"p",margin:[0,0,0,0]},{text:"TMT B",style:"chart_p",margin:[0,0,0,6]}],[{text:"Quotient",style:"p",margin:[0,0,0,0]},{text:"B/A",style:"chart_p",margin:[0,0,0,6]}]]),_sr.data.forEach(function(item,resultID){var messung=[[{text:item.calculation.tmt_score.Messzeitpunkt.Messzeitpunkt_Text,style:"p",margin:[0,6,0,0]},{text:this.getDateCH(item.date,!1),style:"chart_p",margin:[0,0,0,6]}],{text:item.calculation.tmt_score.TMTATime,style:"p",margin:[0,11,0,0]},{text:item.calculation.tmt_score.TMTAError,style:"p",margin:[0,11,0,0]},{text:item.calculation.tmt_score.TMTBTime,style:"p",margin:[0,11,0,0]},{text:item.calculation.tmt_score.TMTBError,style:"p",margin:[0,11,0,0]}];if(this._show_BA(item.calculation.tmt_score.Messzeitpunkt.Messzeitpunkt))var ba={text:item.calculation.tmt_score.quotient_rounded,style:"p",margin:[0,11,0,0]};else ba={text:"-",style:"p",margin:[0,11,0,0]};messung.push(ba),table.table.body.push(messung)}.bind(this));var return_stack={id:"tmt_datenblatt",stack:[]};return return_stack.stack.push(makepdf._heading("Datenblatt",null,"h2")),return_stack.stack.push(table),return_stack},tmt_pdf_content:function(sr){var pdf=[];try{if(sr.data.length>0){var cs_dive=this.tmt_get_cs_dive(sr),pdf_chart=[];pdf_chart.push(makepdf._horizontalLine(100,"#F5F5F5")),pdf_chart.push(makepdf._pdf_chart_profile("de",this.get_pdf_chart_options(this.tmt_chart.options),{},included_tmt_cs,cs_dive,this.tmt_chart.scales,sr,this.tmt_chart.ranges)),pdf_chart.push(makepdf._horizontalLine(100,"#F5F5F5")),pdf.push(makepdf._keepTogether(pdf_chart,"tmt_chart")),pdf.push(makepdf._keepTogether(this.tmt_pdf_datenblatt(sr),"tmt_datenblatt"))}else pdf.push(this.pdf_no_data(this.name))}catch(e){console.log("tmt_pdf_content",e),pdf.push(this.pdf_error(this.name))}return pdf}}})}};Vue.use(plugin_tmt);
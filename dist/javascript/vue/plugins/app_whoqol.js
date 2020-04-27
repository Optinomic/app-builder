const plugin_whoqol={install(Vue,options){Vue.mixin({data:function(){return{name:"WHOQOL-BREF",whoqol_chart:{options:{min:-2,max:5,item_height:75,item_text_left:120,item_text_right:120,color_grid:"#9E9E9E",color_clinic_sample:"#888888",color_skin:"grey_dark_to_light",show_baseline:!1,show_ranges_overview:!1,show_scale_text:!0,show_score_vertical_line:!1,show_score_profile_line:!0,show_score_circles:!0,show_settings_block:!1,allow_toggle_settings_block:!0,topnumber_hide_first_last:!1,range_alpha:.09,vertical_grid_every_x:1,norm_sample:"Z-Normierung anhand von Gesunden",response_title_path:"calculation.phys_psych_calculation.info.mz.mz_typ",response_date_path:"date"},scales:[{left_title:"Körperliche Lebensqualität",left_text:"Hoch",right_title:"Körperliche Lebensqualität",right_text:"Vermindert",score_path:"calculation.phys_psych_calculation.all_results.koerperliche_lebensqualitaet_z_score_inverted",clinic_sample_var:"koerperliche_lebensqualitaet_z_score_inverted"},{id:1,left_title:"Psychische Lebensqualität",left_text:"Hoch",right_title:"Psychische Lebensqualität",right_text:"Vermindert",score_path:"calculation.phys_psych_calculation.all_results.psychische_lebensqualitaet_z_score_inverted",clinic_sample_var:"psychische_lebensqualitaet_z_score_inverted"}],ranges:[{range_start:-999,range_stop:1,text:"Normale Lebensqualität",color:"#2E7D32"},{range_start:2,range_stop:999,text:"Verminderte Lebensqualität",color:"#C62828"}]}}},methods:{whoqol_get_cs_dive:function(s){var dive=[];try{if(s.data.length>0){var latest_sr=s.data[s.data.length-1];99!==latest_sr.calculation.phys_psych_calculation.info.mz.mz_id?dive.push(latest_sr.calculation.phys_psych_calculation.info.mz.mz_id-1):dive.push(3),99!==latest_sr.calculation.phys_psych_calculation.info.age_norm.altersgruppe?dive.push(latest_sr.calculation.phys_psych_calculation.info.age_norm.altersgruppe):dive.push(8),"female"===latest_sr.patient.gender?dive.push(0):dive.push(1)}}catch(e){console.log("whoqol_get_cs_dive",e)}return dive},whoqol_pdf_content:function(sr){var pdf=[];try{if(sr.data.length>0){var cs_dive=this.whoqol_get_cs_dive(sr),pdf_chart=[];pdf_chart.push(makepdf._horizontalLine(100,"#F5F5F5")),pdf_chart.push(makepdf._pdf_chart_profile("de",this.get_pdf_chart_options(this.whoqol_chart.options),{},included_whoqol_cs,cs_dive,this.whoqol_chart.scales,sr,this.whoqol_chart.ranges)),pdf_chart.push(makepdf._horizontalLine(100,"#F5F5F5")),pdf.push(makepdf._keepTogether(pdf_chart,"audit_chart"))}else pdf.push(this.pdf_no_data(this.name))}catch(e){console.log("whoqol_pdf_content",e),pdf.push(this.pdf_error(this.name))}return pdf}}})}};Vue.use(plugin_whoqol);
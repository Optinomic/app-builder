const plugin_actinfo={install(Vue,options){Vue.mixin({methods:{merge_data_ein_aus:function(_sr_actinfo_ein,_sr_actinfo_aus){var _sr_actinfo=[],show_audit=!1,show_fagerstoem=!1;!0===_sr_actinfo_ein.have_data&&_sr_actinfo_ein.data.forEach(function(current){!0===current.all_found&&(current.app_name="Eintritt",current.actinfo_ein_data=!0,current.actinfo_aus_data=!1,current.FAGERSTROEM=current.calculation.actinfo_ein.FAGERSTROEM,"smoker"in current.FAGERSTROEM&&!0===current.FAGERSTROEM.smoker.smoker&&(show_fagerstoem=!0),0!==current.calculation.actinfo_ein.AUDIT.AUDIT_Score&&null!==current.calculation.actinfo_ein.AUDIT.AUDIT_Score&&void 0!==current.calculation.actinfo_ein.AUDIT.AUDIT_Score&&(show_audit=!0),current.info=current.app_name+": "+current.FAGERSTROEM.interpretation.result,_sr_actinfo.push(current))}.bind(this)),!0===_sr_actinfo_aus.have_data&&_sr_actinfo_aus.data.forEach(function(current){!0===current.all_found&&(current.app_name="Austritt",current.actinfo_ein_data=!1,current.actinfo_aus_data=!0,current.FAGERSTROEM=current.calculation.another_calculation.FAGERSTROEM,"smoker"in current.FAGERSTROEM&&!0===current.FAGERSTROEM.smoker.smoker&&(show_fagerstoem=!0),current.info=current.app_name+": "+current.FAGERSTROEM.interpretation.result,_sr_actinfo.push(current))}.bind(this));var audit_text="",fagerstroem_text="",motivation_text="";_sr_actinfo.forEach(function(item,itemID){item.actinfo_ein_data&&(audit_text="Bei Eintritt bestand «"+item.calculation.actinfo_ein.AUDIT.interpretation.result+"» (∑="+item.calculation.actinfo_ein.AUDIT.AUDIT_Score+").","smoker"in item.FAGERSTROEM&&"summyary"in item.FAGERSTROEM.smoker&&(""!==fagerstroem_text&&(fagerstroem_text+=" "),fagerstroem_text+=item.FAGERSTROEM.smoker.summyary)),item.actinfo_aus_data&&"smoker"in item.FAGERSTROEM&&("summyary"in item.FAGERSTROEM.smoker&&(""!==fagerstroem_text&&(fagerstroem_text+=" "),fagerstroem_text+=item.FAGERSTROEM.smoker.summyary),item.FAGERSTROEM.smoker.motivation_data&&(""!==fagerstroem_text&&(fagerstroem_text+=" "),fagerstroem_text+=item.FAGERSTROEM.smoker.motivation_full_text,motivation_text+=item.FAGERSTROEM.smoker.motivation_full_text))}.bind(this));var actinfo_obj={merged:!0,actinfo_ein_data:_sr_actinfo_ein.have_data,actinfo_aus_data:_sr_actinfo_aus.have_data,actinfo_ein_aus_data:!1,show_audit:show_audit,audit_text:audit_text,show_fagerstoem:show_fagerstoem,fagerstroem_text:fagerstroem_text,motivation_text:motivation_text,data:_sr_actinfo,app_id:"actinfo - Ein & Austritt"};return!0===_sr_actinfo_ein.have_data&&!0===_sr_actinfo_aus.have_data&&(actinfo_obj.actinfo_ein_aus_data=!0),actinfo_obj},pdf_build_actinfo:function(_sr_actinfo_ein,_sr_actinfo_aus){var _sr_actinfo_merged=this.merge_data_ein_aus(_sr_actinfo_ein,_sr_actinfo_aus);console.error("pdf_build_actinfo :: ",_sr_actinfo_merged);var _pdf_content=[];_pdf_content.push(this.pdf_app_title(_sr_actinfo_ein.title,_sr_actinfo_ein.subtitle,_sr_actinfo_ein.module.short_description));var problemsubstanzen="",zusatzangaben="";_sr_actinfo_ein.data.forEach(function(current,ID){problemsubstanzen=current.calculation.actinfo_ein.pdfmake.problemsubstanzen_ol,zusatzangaben=current.calculation.actinfo_ein.pdfmake.zusatzangaben_text});var ps=[];ps.push(problemsubstanzen),ps.push(makepdf._spacer(6)),zusatzangaben.stack[0].text="Zusatzinformationen: "+zusatzangaben.stack[0].text,ps.push(zusatzangaben),_pdf_content.push(makepdf._keepTogether(ps,"problemsubstanzen"));var audit=[];audit.push(makepdf._heading("AUDIT (Alcohol Use Disorders Identification)",null,"h3")),audit.push(makepdf._text(_sr_actinfo_merged.audit_text)),_pdf_content.push(makepdf._keepTogether(audit,"audit"));var fagerstroem=[];return fagerstroem.push(makepdf._heading("Nikotinabhängigkeit (Fagerström)",null,"h3")),fagerstroem.push(makepdf._text(_sr_actinfo_merged.fagerstroem_text)),_pdf_content.push(makepdf._keepTogether(fagerstroem,"fagerstroem")),_pdf_content}}})}};Vue.use(plugin_actinfo);
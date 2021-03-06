// Init Vue
new Vue({
    el: '#optinomic_app',
    vuetify: new Vuetify(),
    store: new Vuex.Store({
        state: {
            apps: {},
            table_of_contents: [],
            current_app: null,
            user: null,
            patient: null,
            stays: null,
            clinic: null,
            data_apps: {
                count: 0,
                init_array: [],
                loaded_array: [],
                data_object: {}
            }
        },
        getters: {
            isAdmin: state => {
                try {
                    return state.user.data.isAdmin;
                } catch (err) {
                    return false;
                };
            }
        },
        mutations: {
            saveData(state, d) {
                try {
                    state[d.root] = d.data;
                    // console.warn('state :: ', new Date(), state);
                } catch (err) {
                    console.error('Error: saveData', err);
                };
            },
            saveAppData(state, pl) {
                var d = Object.assign({}, pl);
                var da = Object.assign({}, state.data_apps);
                try {
                    if (d.data.loaded !== true) {
                        da.init_array.push(d.root);
                    } else {
                        da.data_object[d.root] = Object.assign({}, d.data);
                        da.loaded_array.push(d.root);
                        da.count = da.count + 1;
                    };

                    // https://vuex.vuejs.org/guide/mutations.html#mutations-follow-vue-s-reactivity-rules
                    // Vue.set(da, state.data_apps);
                    // state.data_apps = { ...state.data_apps, da };
                    state.data_apps = Object.assign({}, da);

                    // console.warn('state :: ', new Date(), state);
                } catch (err) {
                    console.error('Error: saveAppData', err);
                };
            }
        },
        actions: {
            getSurveyResponses({
                commit
            }, params) {

                if (params === undefined) {
                    params = {};
                };

                var is_defined = function (val) {
                    if ((val === undefined) || (val === null)) {
                        return false;
                    } else {
                        return true;
                    }
                };

                var module_identifier = helpers.getAppID();
                var current_pid = parseInt(helpers.getPatientID());
                var current_stay_id = parseInt(helpers.getStayID());;
                var store_root = module_identifier;

                try {
                    if (is_defined(params.identifier)) {
                        module_identifier = params.identifier;
                        store_root = module_identifier;
                    }

                    if (is_defined(params.pid)) {
                        current_pid = params.pid;
                    }

                    if (is_defined(params.sid)) {
                        current_stay_id = params.sid;
                    }

                    if (is_defined(params.root)) {
                        store_root = params.root;
                    }
                } catch (err) {
                    // console.error('getSurveyResponses - Params', err);
                };


                var base_data = {
                    "date": new Date(),
                    "data": null,
                    "calculations_all": null,
                    "loaded": false,
                    "have_data": false,
                    "possible_data": true,
                    "request": null,
                    "pid": current_pid,
                    "fid": current_stay_id,
                    "app_id": module_identifier,
                    "params": params
                };

                console.log('(?) getSurveyResponses', module_identifier, current_pid, current_stay_id, store_root);


                var savetype = 'saveData';
                if (store_root !== 'sr') {
                    savetype = 'saveAppData';
                };

                commit({
                    type: savetype,
                    root: store_root,
                    data: base_data
                });

                var calculation_results_api_url = '/patients/' + current_pid + '/calculations/' + module_identifier;
                if (current_stay_id) {
                    var api_url = '/stays/' + current_stay_id + '/survey_responses/' + module_identifier + '/full';
                    data_request = 'stay';
                } else {
                    var api_url = '/patients/' + current_pid + '/survey_responses/' + module_identifier + '/full';
                    data_request = 'patient';
                };


                // Do async task
                helpers.callAPI('GET', api_url, {}, {}, function (req) {

                    // var app_id = helpers.getAppID();
                    var app_id = base_data.app_id;

                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);


                        helpers.callAPI('GET', calculation_results_api_url, {}, {}, function (inner_req) {

                            if (req.status == 200) {
                                var inner_resp = JSON.parse(inner_req.response);
                                var calculation_results = inner_resp.calculation_results;

                                // console.log('actionGetSurveyResponsesNew:: resp', resp, inner_resp);


                                // Reformat req
                                var return_array = [];
                                resp.survey_responses.forEach(function (current_response, srID) {
                                    var return_obj = {};

                                    return_obj.all_found = false;

                                    return_obj.app_id = null;
                                    return_obj.date = current_response.data.filled;

                                    return_obj.response_id = current_response.id;
                                    return_obj.response = current_response.data.response;

                                    return_obj.event = null;
                                    return_obj.event_found = false;
                                    return_obj.event_id = current_response.data.event_id;

                                    return_obj.patient = null;
                                    return_obj.patient_found = false;
                                    return_obj.patient_id = null;

                                    return_obj.stay = null;
                                    return_obj.stay_found = false;
                                    return_obj.stay_id = null;

                                    return_obj.patient_uses_module = null;
                                    return_obj.patient_uses_module_found = false;
                                    return_obj.patient_uses_module_id = null;

                                    return_obj.calculation = {};
                                    return_obj.calculation_found = false;
                                    return_obj.calculation_found_method = null;


                                    resp.events.forEach(function (current_event, eventID) {
                                        if (current_event.id === current_response.data.event_id) {
                                            return_obj.event_found = true;

                                            current_event.data.id = current_event.id;
                                            return_obj.event = current_event.data;
                                            return_obj.event.extras = createEventExtras(current_event.data);
                                            return_obj.patient_uses_module_id = current_event.data.patient_uses_module_id;
                                            return_obj.patient_id = current_event.data.patient_id;
                                            return_obj.app_id = current_event.data.module;
                                            app_id = return_obj.app_id;
                                        };
                                    });

                                    if (return_obj.event_found) {
                                        resp.patients.forEach(function (current_patient, patientID) {
                                            if (current_patient.id === return_obj.patient_id) {
                                                return_obj.patient_found = true;
                                                current_patient.data.id = current_patient.id;
                                                current_patient.data.pid = current_patient.id;
                                                var current_patient_data = createPatientExtras(current_patient.data);
                                                return_obj.patient = current_patient_data;
                                            };
                                        });

                                        resp.patient_uses_modules.forEach(function (current_pum, pumID) {
                                            if (current_pum.id === return_obj.patient_uses_module_id) {
                                                return_obj.patient_uses_module_found = true;
                                                current_pum.data.id = current_pum.id;
                                                return_obj.patient_uses_module = current_pum.data;
                                                return_obj.stay_id = current_pum.data.stay_id;
                                            };
                                        });
                                    };

                                    if (return_obj.stay_id) {
                                        resp.stays.forEach(function (current_stay, stayID) {
                                            if (current_stay.id === return_obj.stay_id) {
                                                return_obj.stay_found = true;

                                                current_stay.data.id = current_stay.id;
                                                current_stay.data.fid = current_stay.id;
                                                var current_stay_data = createStayExtras(current_stay.data);
                                                return_obj.stay = current_stay_data;
                                            };
                                        });
                                    };

                                    // console.error('-> resp.calculations', resp.calculations);
                                    calculation_results.forEach(function (current_calculation_top, calculationID) {
                                        var calculation_name = current_calculation_top.name;


                                        if (current_calculation_top.result.length > 0) {
                                            current_calculation_top.result.forEach(function (current_calculation, calculationID) {
                                                var variant_info = false;
                                                if ("info" in current_calculation) {
                                                    if ("response" in current_calculation.info) {
                                                        variant_info = true;
                                                    };
                                                };

                                                var variant_response = false;
                                                if ("response" in current_calculation) {
                                                    if ("data" in current_calculation.response) {
                                                        if ("response" in current_calculation.response.data) {
                                                            variant_response = true;
                                                        };
                                                    };
                                                };

                                                if (variant_info) {
                                                    var calc_resp = current_calculation.info.response;

                                                    if (JSON.stringify(calc_resp) === JSON.stringify(return_obj.response)) {
                                                        // console.log('(+) EQUAL: ', calc_resp);

                                                        return_obj.calculation_found = true;
                                                        return_obj.calculation_found_method = "variant_info";
                                                        return_obj.calculation[calculation_name] = current_calculation;
                                                    };
                                                };

                                                if (variant_response) {
                                                    var calc_resp = current_calculation.response.data.response;

                                                    if (JSON.stringify(calc_resp) === JSON.stringify(return_obj.response)) {
                                                        // console.log('(+) EQUAL: ', calc_resp);

                                                        return_obj.calculation_found = true;
                                                        return_obj.calculation_found_method = "variant_response";
                                                        return_obj.calculation[calculation_name] = current_calculation;

                                                    } else {

                                                        if ("TMTAError" in calc_resp) {
                                                            // TMT - Special
                                                            // console.error('DEBUG HERE ::', calc_resp, return_obj.response, current_calculation);

                                                            if ((parseInt(calc_resp.TMTAError) === parseInt(return_obj.response.TMTAError)) &&
                                                                (parseInt(calc_resp.TMTATime) === parseInt(return_obj.response.TMTATime)) &&
                                                                (parseInt(calc_resp.TMTBError) === parseInt(return_obj.response.TMTBError)) &&
                                                                (parseInt(calc_resp.TMTBTime) === parseInt(return_obj.response.TMTBTime)) &&
                                                                (parseInt(calc_resp.Ausbildungsjahre) === parseInt(return_obj.response.Ausbildungsjahre)) &&
                                                                (parseInt(calc_resp.Messzeitpunkt) === parseInt(return_obj.response.Messzeitpunkt))
                                                            ) {

                                                                return_obj.calculation_found = true;
                                                                return_obj.calculation_found_method = "variant_response_tmt";
                                                                return_obj.calculation[calculation_name] = current_calculation;
                                                            };

                                                        };

                                                    };
                                                };
                                            });
                                        };
                                    });


                                    if (return_obj.calculation_found && return_obj.event_found && return_obj.patient_found && return_obj.stay_found && return_obj.patient_uses_module_found) {
                                        return_obj.all_found = true;
                                    };

                                    return_array.push(return_obj);
                                });


                                if (return_array.length > 0) {
                                    var have_data = true;

                                    // Sort
                                    return_array.sort(function (a, b) {
                                        var nameA = a.date.toUpperCase(); // ignore upper and lowercase
                                        var nameB = b.date.toUpperCase(); // ignore upper and lowercase
                                        if (nameA < nameB) {
                                            return -1;
                                        }
                                        if (nameA > nameB) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                } else {
                                    var have_data = false;
                                };

                                var response = {
                                    "date": new Date(),
                                    "data": return_array,
                                    "calculations_all": calculation_results,
                                    "have_data": have_data,
                                    "loaded": true,
                                    "possible_data": true,
                                    "request": data_request,
                                    "pid": current_pid,
                                    "fid": current_stay_id,
                                    "app_id": app_id,
                                    "params": params
                                };
                                console.log('(✔) Data (' + api_url + '):', response);


                                commit({
                                    type: savetype,
                                    root: store_root,
                                    data: response
                                });


                            } else {
                                var response = {
                                    "error": true,
                                    "error_message": "Failed with status code: " + req.status,
                                    "status_code": req.status,
                                    "request": data_request,
                                    "app_id": app_id
                                };
                                console.error('(!) Error: ', response);
                            };
                        });

                    } else {
                        var response = {
                            "error": true,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status,
                            "request": data_request,
                            "app_id": app_id
                        };
                        console.error('(!) Error: ', response);
                    };

                });


            },
            getApps({
                commit
            }) {

                var api_url = 'module_activations';
                var parameters = {}

                // Do async task
                helpers.callAPI('GET', api_url, parameters, {}, function (req) {
                    if (req.status == 200) {

                        var resp = JSON.parse(req.response);
                        var hotloaded = [];

                        // Sortieren nach App-Name
                        if ("patient_modules" in resp) {
                            if (resp.patient_modules.length > 0) {
                                resp.patient_modules.sort(function (a, b) {
                                    var nameA = a.module.name.toUpperCase(); // ignore upper and lowercase
                                    var nameB = b.module.name.toUpperCase(); // ignore upper and lowercase
                                    if (nameA < nameB) {
                                        return -1;
                                    }
                                    if (nameA > nameB) {
                                        return 1;
                                    }
                                    return 0;
                                });

                                resp.patient_modules.forEach(function (m, mID) {
                                    m.first_template = {
                                        "found": "false",
                                        "name": null
                                    };

                                    // Safty - not breakting thins
                                    m.identifier = m.module.identifier;

                                    if (m.module.templates.length > 0) {
                                        m.first_template.name = m.module.templates["0"].name;
                                        m.first_template.found = true;
                                    };

                                    if (m.module_activation.data.overwritten) {
                                        hotloaded.push(m);
                                    };

                                    if (m.identifier === helpers.getAppID()) {
                                        commit({
                                            type: 'saveData',
                                            root: 'current_app',
                                            data: m
                                        });
                                    };

                                });

                            };
                        };
                        if ("user_modules" in resp) {

                            if (resp.user_modules.length > 0) {
                                resp.user_modules.sort(function (a, b) {
                                    var nameA = a.module.name.toUpperCase(); // ignore upper and lowercase
                                    var nameB = b.module.name.toUpperCase(); // ignore upper and lowercase
                                    if (nameA < nameB) {
                                        return -1;
                                    }
                                    if (nameA > nameB) {
                                        return 1;
                                    }
                                    return 0;
                                });

                                resp.user_modules.forEach(function (m, mID) {
                                    m.first_template = {
                                        "found": "false",
                                        "name": null
                                    };

                                    // Safty - not breakting thins
                                    m.identifier = m.module.identifier;

                                    if (m.module.templates.length > 0) {
                                        m.first_template.name = m.module.templates["0"].name;
                                        m.first_template.found = true;
                                    };

                                    if (m.module_activation.data.overwritten) {
                                        hotloaded.push(m);
                                    };

                                    if (m.identifier === helpers.getAppID()) {
                                        commit({
                                            type: 'saveData',
                                            root: 'current_app',
                                            data: m
                                        });
                                    };

                                });
                            };
                        };

                        var response = {
                            "data": {
                                "patient_modules": resp.patient_modules,
                                "user_modules": resp.user_modules,
                                "errors": resp.errors,
                                "hotloaded": hotloaded
                            }
                        };

                        response = addOptinomicExtras(response, api_url);


                        commit({
                            type: 'saveData',
                            root: 'apps',
                            data: response
                        });


                        console.log('(✔) Data (' + api_url + '):', response, parameters);
                    } else {
                        // Errorhandling
                        // While what action with what params error happend
                        var error_action = {
                            "name": "getApps",
                            "params": []
                        };

                        dispatch({
                            "type": "ERROR",
                            "error": handleError(req, error_action)
                        });
                    };

                });

            },
            getUser({
                commit
            }) {

                const api_url = '/users/' + helpers.getUserID();
                var parameters = {}

                // Do async task
                helpers.callAPI('GET', api_url, parameters, {}, function (req) {
                    if (req.status == 200) {

                        var resp = JSON.parse(req.response);
                        var data_return = resp.user.data;
                        data_return.id = resp.user.id;
                        data_return.uid = resp.user.id;
                        data_return.isAdmin = false;
                        if (resp.user.data.role === "Admin") {
                            data_return.isAdmin = true;
                        };

                        var response = {
                            "id": resp.user.id,
                            "date": new Date(),
                            "data": data_return
                        };
                        console.log('(✔) Data (' + api_url + '):', response);

                        commit({
                            type: 'saveData',
                            root: 'user',
                            data: response
                        });

                    } else {
                        var response = {
                            "error": true,
                            "api_url": api_url,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status,
                            "req": req
                        };
                        console.error('(!) Error: ', response);
                    };

                });

            },
            getPatient({
                commit
            }) {

                const api_url = '/patients/' + helpers.getPatientID();
                var parameters = {}

                // Do async task
                helpers.callAPI('GET', api_url, parameters, {}, function (req) {
                    if (req.status == 200) {

                        var resp = JSON.parse(req.response);
                        var data_return = resp.patient.data;
                        data_return.id = resp.patient.id;
                        data_return.pid = resp.patient.id;
                        data_return.extras = createPatientExtras(data_return);

                        var response = {
                            "date": new Date(),
                            "data": data_return
                        };
                        console.log('(✔) Data (' + api_url + '):', response);

                        commit({
                            type: 'saveData',
                            root: 'patient',
                            data: response
                        });

                    } else {
                        var response = {
                            "error": true,
                            "api_url": api_url,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status,
                            "req": req
                        };
                        console.error('(!) Error: ', response);
                    };

                });

            },
            getPatientStays({
                commit
            }) {

                const api_url = '/patients/' + helpers.getPatientID() + '/stays/';
                var parameters = {}

                // Do async task
                helpers.callAPI('GET', api_url, parameters, {}, function (req) {
                    if (req.status == 200) {

                        var resp = JSON.parse(req.response);
                        var stays = resp.stays;

                        var current_stay_id = parseInt(helpers.getStayID());

                        var stay_response = {
                            "all": stays,
                            "current": {
                                "id": current_stay_id,
                                "data": null,
                                "found": false
                            }
                        }

                        stays.forEach(function (stay, stayID) {
                            stay.data = createStayExtras(stay.data);
                            stay.data.id = stay.id;
                            stay.data.fid = stay.id;
                            if (current_stay_id === stay.id) {
                                stay_response.current.data = stay.data;
                                stay_response.current.found = true;
                            };
                        });

                        console.log('(✔) Data (' + api_url + '):', stay_response);

                        commit({
                            type: 'saveData',
                            root: 'stays',
                            data: stay_response
                        });

                    } else {
                        var response = {
                            "error": true,
                            "api_url": api_url,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status,
                            "req": req
                        };
                        console.error('(!) Error: ', response);
                    };

                });

            },
            getClinic({
                commit
            }) {

                const api_url = '/clinic';
                var parameters = {}

                // Do async task
                helpers.callAPI('GET', api_url, parameters, {}, function (req) {
                    if (req.status == 200) {

                        var resp = JSON.parse(req.response);

                        // All fields are coming as array: Make Object out of it:
                        var json_data = {};
                        resp.clinic.forEach(function (item, itemIndex) {
                            json_data[item[0]] = item[1];
                        });

                        var response = {
                            "date": new Date(),
                            "data": json_data
                        };
                        response.data.array = resp.clinic;
                        console.log('(✔) Data (' + api_url + '):', response);

                        commit({
                            type: 'saveData',
                            root: 'clinic',
                            data: response
                        });

                    } else {
                        var response = {
                            "error": true,
                            "api_url": api_url,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status,
                            "req": req
                        };
                        console.error('(!) Error: ', response);
                    };

                });

            }
        }
    }),
    methods: {}
});
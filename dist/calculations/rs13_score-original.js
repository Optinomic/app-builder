function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.roundToTwo = function (num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+2") + "e-2");
    };

    // CH Datumsformat
    calc.formatDateCH = function (date_string) {
        date_string = date_string || null
        if (date_string !== null) {

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

    // ------------------------------------------
    // F U N C T I O N S
    // ------------------------------------------

    calc.getInterpretation = function (d, resp, score, range) {

        var return_text = "";

        if (d.patient.data.gender === "male") {
            return_text = "Herr " + d.patient.data.last_name;
        } else {
            return_text = "Frau " + d.patient.data.last_name;
        };

        return_text = return_text + " erreichte beim Resilienzfragebogen (RS-13) vom";

        return_text = return_text + " " + calc.formatDateCH(resp.data.filled) + " ";
        return_text = return_text + "einen Summenscore von " + score + ", ";
        return_text = return_text + "was auf eine " + range.interpretation_de + " hindeutet.";

        return return_text;
    };
    

    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function (d) {

        var responses_array = d.survey_responses;
        var allResults = [];

        responses_array.forEach(function (response, myindex) {


            var myResults = {
                "rs13": {},
                "rs13_score": 0,
                "interpretation": "",
                "range": null,
                "ranges": null
            };
            var result = response.data.response;

            // Save Integer
            myResults.rs13.rs13_01 = parseInt(result.rs13_01);
            myResults.rs13.rs13_02 = parseInt(result.rs13_02);
            myResults.rs13.rs13_03 = parseInt(result.rs13_03);
            myResults.rs13.rs13_04 = parseInt(result.rs13_04);
            myResults.rs13.rs13_05 = parseInt(result.rs13_05);
            myResults.rs13.rs13_06 = parseInt(result.rs13_06);
            myResults.rs13.rs13_06 = parseInt(result.rs13_06);
            myResults.rs13.rs13_07 = parseInt(result.rs13_07);
            myResults.rs13.rs13_08 = parseInt(result.rs13_08);
            myResults.rs13.rs13_09 = parseInt(result.rs13_09);
            myResults.rs13.rs13_10 = parseInt(result.rs13_10);
            myResults.rs13.rs13_11 = parseInt(result.rs13_11);
            myResults.rs13.rs13_12 = parseInt(result.rs13_12);
            myResults.rs13.rs13_13 = parseInt(result.rs13_13);

            // SumScore
            myResults.rs13_score = myResults.rs13.rs13_01 +
                myResults.rs13.rs13_02 +
                myResults.rs13.rs13_03 +
                myResults.rs13.rs13_04 +
                myResults.rs13.rs13_05 +
                myResults.rs13.rs13_06 +
                myResults.rs13.rs13_07 +
                myResults.rs13.rs13_08 +
                myResults.rs13.rs13_09 +
                myResults.rs13.rs13_10 +
                myResults.rs13.rs13_11 +
                myResults.rs13.rs13_12 +
                myResults.rs13.rs13_13;



            var current_range = {};

            var ranges = [{
                "range_start": 13,
                "range_stop": 66,
                "interpretation_de": "niedrige Widerstandskraft (Resilienz)",
                "text": "Niedrig",
                "color": "#F44336"
            }, {
                "range_start": 67,
                "range_stop": 72,
                "interpretation_de": "moderate Widerstandskraft (Resilienz)",
                "text": "Moderat",
                "color": "#FF9800"
            }, {
                "range_start": 73,
                "range_stop": 91,
                "interpretation_de": "hohe Widerstandskraft (Resilienz)",
                "text": "Hoch",
                "color": "#4CAF50"
            }];

            current_range = ranges[0];

            if (myResults.rs13_score >= ranges[1].range_start) {
                current_range = ranges[1];
            };
            if (myResults.rs13_score >= ranges[2].range_start) {
                current_range = ranges[2];
            };

            myResults.range = current_range;
            myResults.ranges = ranges;


            myResults.interpretation = calc.getInterpretation(d, response, myResults.rs13_score, myResults.range);


            // Write Results for the Return
            // Do not modify stuff here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);

        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
    // return responses;
}
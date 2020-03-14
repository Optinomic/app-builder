var makepdf = (function () {

    // Create PDF's with http://pdfmake.org/


    // --------------------------------
    // Helpers
    // --------------------------------

    var _getImage = function (image) {

        image = image === undefined ? "optinomic_trademark" : image;

        var images = {
            "optinomic_trademark": "data:image/png;base64,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",
            "suedhang": "data:image/png;base64,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"
        };


        if (image in images) {
            return images[image];
        } else {
            return images.optinomic_trademark;
        };
    };

    var _formatDateCH = function (date_string) {
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


    // --------------------------------
    // PDF - Template-Functions
    // --------------------------------
    var _create_document = function (
        documentTitle,
        headerLeft,
        headerRight,
        footerLeft,
        pageSize,
        pageOrientation,
        hideLogo,
        hidePageNumbers) {

        documentTitle = documentTitle === undefined ? 'Optinomic' : documentTitle;
        headerLeft = headerLeft === undefined ? '' : headerLeft;
        headerRight = headerRight === undefined ? '' : headerRight;
        footerLeft = footerLeft === undefined ? '' : footerLeft;
        pageSize = pageSize === undefined ? 'A4' : pageSize;
        pageOrientation = pageOrientation === undefined ? 'portrait' : pageOrientation;
        hideLogo = hideLogo === undefined ? false : hideLogo;
        hidePageNumbers = hidePageNumbers === undefined ? false : hidePageNumbers;

        var create_dd = {
            "pageSize": pageSize,
            "pageOrientation": pageOrientation,
            "info": {
                "title": _create_document_name(documentTitle, headerLeft),
                "author": headerRight,
                "subject": documentTitle + " - " + headerLeft + " - " + headerRight,
                "keywords": headerLeft + ", " + headerRight + ", " + documentTitle + ", Optinomic"
            },
            "header": {
                "columns": [{
                        "text": headerLeft,
                        "alignment": "left",
                        "style": "header"
                    },
                    {
                        "text": headerRight,
                        "alignment": "right",
                        "style": "header"
                    }
                ]
            },
            "content": [],
            "styles": {
                "header": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#9E9E9E",
                    "margin": [40, 25, 40, 40]
                },
                "footer": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#9E9E9E",
                    "margin": [40, 0, 40, 40]
                },
                "title": {
                    "fontSize": 36,
                    "bold": false,
                    "color": "#616161",
                    "alignment": "left",
                    "margin": [0, 40, 0, 0]
                },
                "caption": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#9E9E9E",
                    "alignment": "left",
                    "margin": [0, 0, 0, 0]
                },
                "h1": {
                    "fontSize": 18,
                    "bold": false,
                    "color": "#424242",
                    "alignment": "left",
                    "margin": [0, 40, 0, 24]
                },
                "h2": {
                    "fontSize": 15,
                    "bold": false,
                    "color": "#212121",
                    "alignment": "left",
                    "margin": [0, 20, 0, 12]
                },
                "h3": {
                    "bold": true,
                    "color": "#212121",
                    "alignment": "left",
                    "margin": [0, 0, 0, 6]
                },
                "p": {
                    "color": "#212121",
                    "alignment": "left",
                    "fontSize": 12,
                    "margin": [0, 0, 0, 6]
                },
                "chart_p": {
                    "color": "#212121",
                    "alignment": "left",
                    "fontSize": 8.3,
                    "margin": [0, 3, 0, 3]
                }
            }
        };


        return create_dd;
    };

    var _create_document_name = function (title, left) {
        var doc_name = "";

        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var t = d.getUTCDate();

        var _date_time = t + "." + m + "." + y + ", " + d.getHours() + ":" + d.getMinutes();

        if (m < 10) {
            m = "0" + m;
        };

        if (t < 10) {
            t = "0" + t;
        };

        datum_str = y + "_" + m + "_" + t;

        doc_name = doc_name + datum_str + " - " + title + " - " + left;
        doc_name = doc_name + ".pdf";

        // console.log('doc_name', doc_name);
        return doc_name
    };


    var _addFooter = function(dd, footerLeft, hidePageNumbers) {

        if (hidePageNumbers) {

            dd.footer = { "text": footerLeft, "alignment": "left", "style": "footer" };

        } else {

            var footer = function(currentPage, pageCount) {
                var obj = {
                    "columns": [
                        { "text": "___footerLeft___", "alignment": "left", "style": "footer" },
                        { "text": "Seite " + currentPage.toString() + "/" + pageCount.toString(), "alignment": "right", "style": "footer" }
                    ]
                };
                return obj;
            };

            var footer_string = footer.toString();
            footer_string = footer_string.replace("___footerLeft___", footerLeft);
            eval('dd.footer=' + footer_string);

        };

        return dd;
    };


    var _keepTogether = function (given_stack_array, id) {

        id = id === undefined ? "keep_together" : id;


        var isArray = function (obj) {
            return (typeof obj !== 'undefined' &&
                obj && obj.constructor === Array);
        };

        var stack_array = [];

        if (isArray(given_stack_array)) {
            // Array
            stack_array = given_stack_array;
        } else {
            // Object
            stack_array.push(given_stack_array);
        };

        var return_obj = {
            "id": id,
            "layout": "noBorders",
            "table": {
                "dontBreakRows": true,
                "headerRows": 0,
                "body": [
                    [{
                        "stack": stack_array
                    }]
                ]
            }
        };

        return return_obj;
    };

    var _spacer = function (space) {

        space = space === undefined ? 10 : space;

        return {
            "id": "spacer_" + space,
            "text": "",
            "margin": [0, space, 0, space]
        };
    };

    var _title = function (title, subtitle) {

        title = title === undefined ? "" : title;
        subtitle = subtitle === undefined ? "" : subtitle;

        return {
            "id": "title",
            "stack": [
                // second column consists of paragraphs
                {
                    "text": " " + title,
                    "style": "title",
                    "alignment": "left"
                }, {
                    "text": " " + subtitle,
                    "style": "caption",
                    "color": "#616161",
                    "margin": [1, 0, 0, 0],
                    "alignment": "left"
                }
            ],
            "margin": [0, 24, 0, 36]
        };
    };

    var _heading = function (text_left, text_left_sub, style) {

        // Init
        text_left = text_left === undefined ? "Optinomic" : text_left;
        text_left_sub = text_left_sub === undefined ? null : text_left_sub;
        style = style === undefined ? "h2" : style;

        if ((style !== "h1") && (style !== "h2") && (style !== "h3")) {
            style = "h2";
        };

        var id = "heading_" + style;


        var left = {
            "id": id,
            "stack": [{
                "text": text_left,
                "style": style,
                "margin": [0, 12, 0, 0],
                "alignment": "left"
            }],
            "margin": [0, 0, 0, 12]
        };


        if (text_left_sub !== null) {
            var sub = {
                "text": text_left_sub,
                "style": "caption",
                "color": "#616161",
                "margin": [1, 0, 0, 0],
                "alignment": "left"
            };
            left.stack.push(sub);
        };


        var return_obj = left;

        return return_obj;
    };

    var _text = function (text) {

        text = text === undefined ? "Optinomic" : text;

        return {
            "id": "text",
            "text": " " + text,
            "style": "p"
        };
    };

    var _caption = function (text) {

        text = text === undefined ? "Optinomic" : text;

        return {
            "id": "caption",
            "text": text,
            "style": "caption"
        };
    };

    var _pageBreak = function (when) {
        when = when === undefined ? "after" : when;
        return {
            "id": "peagebreak_" + when,
            "fontSize": 0,
            "text": "",
            "pageOrientation": "portrait",
            "pageBreak": when
        };
    };

    var _horizontalLine = function (width, color, space) {
        width = width === undefined ? 100 : width;
        color = color === undefined ? "#E0E0E0" : color;
        space = space === undefined ? 6 : space;


        var length = 514 / 100 * width;

        var return_obj = {
            "id": "horizontal_line",
            "margin": [0, space, 0, 0],
            "canvas": [{
                "type": "line",
                "x1": 0,
                "y1": 0,
                "x2": length,
                "y2": 0,
                "lineWidth": 1,
                "lineColor": color
            }]
        };


        return return_obj;
    };

    var _noData = function (title, space) {
        title = title === undefined ? null : title;
        space = space === undefined ? 24 : space;

        var date = new Date();
        date = _formatDateCH(date.toISOString());

        var text = "Keine Daten vorhanden.";
        if (title !== null) {
            text = title + ": Keine Daten vorhanden.";
        };

        var no_data = {
            "id": "no_data",
            "table": {
                "widths": [24, "*"],
                "body": [
                    [{
                        "text": "!",
                        "color": "#F44336",
                        "fontSize": 36,
                        "margin": [0, 0, 0, 0]
                    }, {
                        "stack": [{
                                "text": date,
                                "fontSize": 9,
                                "color": "#BDBDBD",
                                "margin": [0, 6, 0, 0]
                            },
                            {
                                "text": text,
                                "color": "#424242",
                                "margin": [0, 6, 0, 0]
                            }
                        ],
                        "margin": [0, 0, 0, 6]
                    }],
                ]
            },
            "layout": "noBorders",
            "margin": [space, space, space, space]
        };

        var return_obj = {
            "stack": [],
        };

        return_obj.stack.push(_horizontalLine(100, "#F5F5F5"));
        return_obj.stack.push(no_data);
        return_obj.stack.push(_horizontalLine(100, "#F5F5F5"));

        return _keepTogether(return_obj, "no_data");
    };

    var _indication = function (sign, title, color) {

        sign = sign === undefined ? "!" : sign;
        title = title === undefined ? "Optinomic" : title;
        color = color === undefined ? "#F44336" : color;

        var space = 24;

        var date = new Date();
        date = _formatDateCH(date.toISOString());

        var indication = {
            "id": "indication_" + sign,
            "table": {
                "widths": [24, "*"],
                "body": [
                    [{
                        "text": sign,
                        "color": color,
                        "fontSize": 36,
                        "margin": [0, 0, 0, 0]
                    }, {
                        "stack": [{
                                "text": date,
                                "fontSize": 9,
                                "color": "#BDBDBD",
                                "margin": [0, 6, 0, 0]
                            },
                            {
                                "text": title,
                                "color": "#424242",
                                "margin": [0, 6, 0, 0]
                            }
                        ],
                        "margin": [0, 0, 0, 6]
                    }],
                ]
            },
            "layout": "noBorders",
            "margin": [space, space, space, space]
        };

        var return_obj = {
            "stack": [],
        };

        return_obj.stack.push(_horizontalLine(100, "#F5F5F5"));
        return_obj.stack.push(indication);
        return_obj.stack.push(_horizontalLine(100, "#F5F5F5"));

        return _keepTogether(return_obj, sign + "_indication");
    };

    var _suedhang_logo_anschrift = function (space) {
        space = space === undefined ? 90 : space;

        return {
            "id": "suedhang_logo_anschrift",
            "alignment": "left",
            "margin": [0, space, 0, 0],
            "columns": [{}, {
                "width": 220,
                "stack": [{
                    "width": 220,
                    "image": _getImage("suedhang")
                }, {
                    "margin": [0, 6, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " Kompetenzzentrum für Mensch und Sucht"
                }, {
                    "margin": [0, 3, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " Südhang 1"
                }, {
                    "margin": [0, 3, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " CH - 3038 Kirchlindach"
                }, {
                    "margin": [0, 12, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " +41 31 828 14 14  |  Telefon"
                }, {
                    "margin": [0, 3, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " +41 31 828 14 24  |  Fax"
                }]
            }]
        };
    };

    var _stamp = function (documentTitle, space) {
        documentTitle = documentTitle === undefined ? "Optinomic" : documentTitle;
        space = space === undefined ? 36 : space;

        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        var t = d.getUTCDate();

        var _date_time = t + "." + m + "." + y + ", " + d.getHours() + ":" + d.getMinutes();


        var Optionmic = {
            "margin": [0, space, 0, space],
            "alignment": "left",
            "columnGap": 12,
            "columns": [{
                "width": 48,
                "margin": [0, 6, 0, 0],
                "image": _getImage("optinomic_trademark")
            }, {
                "width": "*",
                "stack": [{
                    "fontSize": 12,
                    "bold": false,
                    "color": "#3F51B5",
                    "alignment": "left",
                    "margin": [0, 2, 0, 0],
                    "text": "«" + documentTitle + "»"
                }, {
                    "fontSize": 10,
                    "bold": false,
                    "color": "#616161",
                    "margin": [0, 4, 0, 0],
                    "alignment": "left",
                    "text": "Datenstand: " + _date_time
                }, {
                    "fontSize": 10,
                    "bold": false,
                    "color": "#3F51B5",
                    "alignment": "left",
                    "margin": [0, 6, 0, 0],
                    "text": "www.optinomic.com"
                }, {
                    "fontSize": 9,
                    "bold": false,
                    "color": "#616161",
                    "alignment": "left",
                    "text": "Erkenntnisgewinn für den Behandlungsalltag"
                }]
            }]
        };

        return Optionmic;
    };



    return {
        _create_document: _create_document,
        _create_document_name: _create_document_name,
        _addFooter: _addFooter,
        _keepTogether: _keepTogether,
        _spacer: _spacer,
        _title: _title,
        _heading: _heading,
        _text: _text,
        _caption: _caption,
        _pageBreak: _pageBreak,
        _horizontalLine: _horizontalLine,
        _noData: _noData,
        _indication: _indication,
        _suedhang_logo_anschrift: _suedhang_logo_anschrift,
        _stamp: _stamp
    };
})();
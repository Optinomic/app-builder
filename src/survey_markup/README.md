# NG-Survey

The structure of a `ng-survey` can be defined inside the following path/file: `/src/__config/survey.json`.

*Note:*  If you are using `gulp watch`:  As soon you modify `/src/__config/survey.json` - you have to manually restart `gulp watch`!

## Structure of survey.json

Inside the `survey.json` you can define as many surveys you like. Each survey needs the keys `survey` & `question_groups`.  Check the example below:

```JSON
{
    "survey_example": {
        "survey": {},
        "question_groups": []
    },
    "another_survey": {
        "survey": {},
        "question_groups": []
    },
    "yet_another_survey": {
        "survey": {},
        "question_groups": []
    }
}
```

### Key: survey

Inside the `survey` key you define the "configuration" of the given survey. Check the example below:

```JSON
{
    "version": "1.0",
    "welcome_title": "Another",
    "welcome_subtitle": "Another - Kurzbeschreibung",
    "welcome_text": [
        "Anweisung - Zeile 1",
        "Anweisung - Zeile 2"
    ],
    "show_welcome_page": true,
    "show_question_groups_numbers": false,
    "result_store_survey_markup": false,
    "result_store_timings": true,
    "empty_vars": null
}
```

### Key: question_groups

Inside the `question_groups` key you define the "questions_groups" with the corresponding "questions" of the given survey. Check the example below:

```JSON
"question_groups": [{
    "group_title": "Allgemeine Angaben",
    "group_subtitle": "Angaben zum Messzeitpunkt",
    "group_id": "allgemeine_angaben",
    "questions": []
}, {
    "group_title": "Weitere Angaben",
    "group_subtitle": "Dies und das.",
    "group_id": "weitere_angaben",
    "questions": []
}]
```

### Array: questions

Inside the `questions` array you define the "questions" of the given survey. Check the example below:

```JSON
{
    "type": "questionSelect",
    "var": "Messzeitpunkt",
    "title": "Messzeitpunkt",
    "help": "Bei welchem Messzeitpunkt wurde die Erhebung ausgeführt?",
    "label": "Assessment (Erhebung)",
    "val": {
        "required": true
    },
    "options": [{
        "value": "1",
        "label": "Eintritt"
    }, {
        "value": "2",
        "label": "Austritt"
    }, {
        "value": "3",
        "label": "Anderer Messzeitpunkt"
    }]
}
```

## Question - Types

`type` selects the question Type.
`var` is ther variable name - stored in result.
`title` Title-Text of your Question.
`help` Help-Text of your Question.
`val` Array of validation rules.

The complete list of the examples below contains always full options. Meaning all possible validations and so on.

### questionNumber

Number input.

```JSON
{
    "type": "questionNumber",
    "var": "Ausbildungsjahre",
    "title": "Ausbildungsjahre",
    "help": "Ausbildungsjahre meint Schuljahre und Jahre der ersten Berufsausbildung, z.B. 9 JaSchule + 3 Jahre Berufslehre gibt 12 Ausbildungsjahre, oder 12 Jahre Schule (z.B. Matur) Jahre Studium gibt 17 Ausbildungsjahre.",
    "label": "Bis 12 Jahre vs. mehr als 12 Jahre Ausbildung",
    "val": {
        "required": true,
        "min": 6,
        "max": 40
    }
}
```

### questionText

Text input. You can define a `regex` pattern inside the validation key `val`. This example needs the pattern of a email address:

```JSON
{
    "type": "questionText",
    "var": "email",
    "title": "Wie lautet Ihre Email Adresse?",
    "help": "",
    "label": "Email",
    "val": {
        "required": true,
        "pattern": "/^.+@.+\\..+$/"
    }
}
```

### questionDate

Datepicker! The result (`var`) will be stored in the [toISOString()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) Format.

```JSON
{
    "type": "questionDate",
    "var": "birthday",
    "title": "Wann sind Sie geboren?",
    "help": "Selektieren Sie ihren Geburtstag.",
    "label": "Geburtstag",
    "val": {
        "required": true
    }
}
```

### questionSelect

Select one entry from `options`.

```JSON
{
    "type": "questionSelect",
    "var": "Messzeitpunkt",
    "title": "Messzeitpunkt",
    "help": "Bei welchem Messzeitpunkt wurde die Erhebung ausgeführt?",
    "label": "Assessment (Erhebung)",
    "val": {
        "required": true
    },
    "options": [{
        "value": "1",
        "label": "Eintritt"
    }, {
        "value": "2",
        "label": "Austritt"
    }, {
        "value": "3",
        "label": "Anderer Messzeitpunkt"
    }]
}
```
### questionMultiSelect

Select one ore more entrys from `options`.

```JSON
{
    "type": "questionMultiSelect",
    "var": "messzeitpunkte",
    "var_prefix": "[",
    "var_suffix": "]",
    "title": "Messzeitpunkte",
    "help": "Bei welchen Messzeitpunkten wurde eine Erhebung ausgeführt?",
    "label": "Erhebungen",
    "true_value": 1,
    "false_value": 0,
    "val": {
        "required": true
    },
    "options": [{
        "value": "1",
        "var": "eintritt",
        "label": "Eintritt"
    }, {
        "value": "2",
        "var": "austritt",
        "label": "Austritt"
    }, {
        "value": "3",
        "var": "anderer",
        "label": "Anderer Messzeitpunkt"
    }]
}
```

### ToDo

- Multi Select

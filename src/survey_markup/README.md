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

## Key: survey 

Inside the `survey` key you define the "configuration" of the given survey. Check the example below: 

```JSON 
{
    "version": "1.0",
    "welcome_title": "Another",
    "welcome_subtitle": "Another - Kurzbeschreibung",
    "welcome_text": ":-)",
    "question_groups_numbers": false,
    "empty_vars": null
}
```
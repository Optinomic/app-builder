var gulp = require('gulp');
var render = require('gulp-nunjucks-render');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var jsonminify = require('gulp-jsonminify');


// -----------------------------------------------------------
//  CONFIG
// -----------------------------------------------------------
var base_config = require('./src/__config/base_config.json');;
var survey_config = require('./src/__config/surveys.json');;

var jsminify_config = {
    ext: {
        src: '-original.js',
        min: '.js'
    },
    noSource: false,
    mangle: false,
    compress: true
};

var clean_css_config = {
    compatibility: {
        colors: {
            opacity: true // controls `rgba()` / `hsla()` color support
        },
        properties: {
            backgroundClipMerging: true, // controls background-clip merging into shorthand
            backgroundOriginMerging: true, // controls background-origin merging into shorthand
            backgroundSizeMerging: true, // controls background-size merging into shorthand
            colors: true, // controls color optimizations
            ieBangHack: false, // controls keeping IE bang hack
            ieFilters: false, // controls keeping IE `filter` / `-ms-filter`
            iePrefixHack: false, // controls keeping IE prefix hack
            ieSuffixHack: false, // controls keeping IE suffix hack
            merging: true, // controls property merging based on understandability
            shorterLengthUnits: false, // controls shortening pixel units into `pc`, `pt`, or `in` units
            spaceAfterClosingBrace: true, // controls keeping space after closing brace - `url() no-repeat` into `url()no-repeat`
            urlQuotes: false, // controls keeping quoting inside `url()`
            zeroUnits: true // controls removal of units `0` value
        },
        selectors: {
            adjacentSpace: false, // controls extra space before `nav` element
            ie7Hack: true, // controls removal of IE7 selector hacks, e.g. `*+html...`
            mergeLimit: 8191, // controls maximum number of selectors in a single rule (since 4.1.0)
            multiplePseudoMerging: true // controls merging of rules with multiple pseudo classes / elements (since 4.1.0)
        },
        units: {
            ch: true, // controls treating `ch` as a supported unit
            in: true, // controls treating `in` as a supported unit
            pc: true, // controls treating `pc` as a supported unit
            pt: true, // controls treating `pt` as a supported unit
            rem: true, // controls treating `rem` as a supported unit
            vh: true, // controls treating `vh` as a supported unit
            vm: true, // controls treating `vm` as a supported unit
            vmax: true, // controls treating `vmax` as a supported unit
            vmin: true // controls treating `vmin` as a supported unit
        }
    }
}


// -----------------------------------------------------------
//  FUNCTIONS
// -----------------------------------------------------------

function minImages() {
    // console.log("minImages...");
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(base_config.dist_root + '/img'));
}


function buildTemplates() {
    // console.log("buildTemplates...");
    return gulp.src('src/templates/**/*.+(nj)')
        .pipe(render({
            path: ['src'],
            data: base_config
        }))
        .pipe(htmlmin({
            minifyJS: true,
            collapseWhitespace: true,
            minifyCSS: true,
            sortAttributes: true,
            sortClassName: true,
            removeComments: true
        }))
        .pipe(gulp.dest(base_config.dist_root + '/templates'))
}

function buildNGSurvey() {
    // console.log("buildTemplates...");
    return gulp.src('src/survey_markup/*.+(nj)')
        .pipe(render({
            path: ['src'],
            data: survey_config
        }))
        .pipe(htmlmin({
            minifyJS: true,
            collapseWhitespace: true,
            minifyCSS: true,
            sortAttributes: true,
            sortClassName: true,
            removeComments: true
        }))
        .pipe(gulp.dest(base_config.dist_root + '/survey_markup'))
}


function buildOPAPP() {
    // console.log("buildOPAPP...", base_config);
    return gulp.src('src/__build/opapp.nj')
        .pipe(render({
            path: ['src'],
            data: base_config
        }))
        .pipe(rename("base.opapp"))
        .pipe(gulp.dest(base_config.dist_root + ''))
}

function buildHOTLOAD() {
    return gulp.src('src/__build/hotload.nj')
        .pipe(render({
            path: [''],
            data: base_config
        }))
        .pipe(gulp.dest(base_config.dist_root + ''))
}

function copyReadme() {
    return gulp.src('src/README.md')
        .pipe(rename("readme.md"))
        .pipe(gulp.dest(base_config.dist_root + ''));
}

function copyIncludes() {
    return gulp.src('src/includes/**/*.*')
        .pipe(minify(jsminify_config))
        .pipe(gulp.dest(base_config.dist_root + '/includes'));
}

function copyJS() {
    return gulp.src('src/javascript/**/*.*')
        .pipe(minify(jsminify_config))
        .pipe(gulp.dest(base_config.dist_root + '/javascript'));
}

function copyCSS() {
    return gulp.src('src/css/**/*.*')
        .pipe(cleanCSS(clean_css_config))
        .pipe(gulp.dest(base_config.dist_root + '/css'));
}

function copyCalculations() {
    return gulp.src('src/calculations/**/*.*')
        .pipe(minify(jsminify_config))
        .pipe(gulp.dest(base_config.dist_root + '/calculations'));
}

function copySurveyJSON() {
    return gulp.src('src/__config/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest(base_config.dist_root + '/javascript'));
}


// -----------------------------------------------------------
//  TASKS
// -----------------------------------------------------------

gulp.task('build', function () {
    runSequence('clean-dist', 'build-templates', 'build-images', 'build-opapp', 'cleanup');
    // setTimeout(function () {
    //      runSequence('hotload');
    // }, 3000);
});

gulp.task('build-images', function () {
    // copyImages();
    minImages();
});

gulp.task('clean-dist', function () {
    return gulp.src(base_config.dist_root, {
            read: false
        })
        .pipe(clean());
});

gulp.task('build-templates', function () {
    buildTemplates();
    buildNGSurvey();
});

gulp.task('build-opapp', function () {
    buildOPAPP();
});

gulp.task('hotload', function () {
    buildHOTLOAD();
});

gulp.task('cleanup', function () {
    copyReadme();
    copyIncludes();
    copyJS();
    copyCalculations();
    copyCSS();
    copySurveyJSON();
});

gulp.task('watch', function () {
    gulp.watch('src/**/*', ['build'])
});
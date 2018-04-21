var gulp = require('gulp');
var render = require('gulp-nunjucks-render');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');


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


function minImages() {
    console.log("minImages...");
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'));
}


function buildTemplates() {
    console.log("buildTemplates...");
    return gulp.src('src/templates/**/*.+(nj)')
        .pipe(render({
            path: ['src']
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            removeComments: true
        }))
        .pipe(gulp.dest('public/templates'))
}

function buildOPAPP() {
    console.log("buildOPAPP...");
    return gulp.src('src/__build/opapp.nj')
        .pipe(render({
            path: ['src']
        }))
        .pipe(rename("base.opapp"))
        .pipe(gulp.dest('public'))
}

function copyReadme() {
    return gulp.src('src/README.md')
        .pipe(rename("readme.md"))
        .pipe(gulp.dest('public'));
}

function copyVersion() {
    return gulp.src('src/VERSION.*')
        .pipe(gulp.dest('public'));
}

function copyIncludes() {
    return gulp.src('src/includes/**/*.*')
        .pipe(minify(jsminify_config))
        .pipe(gulp.dest('public/includes'));
}

function copyJS() {
    return gulp.src('src/javascript/**/*.*')
        .pipe(minify(jsminify_config))
        .pipe(gulp.dest('public/javascript'));
}

function copyCSS() {
    return gulp.src('src/css/**/*.*')
        .pipe(cleanCSS(clean_css_config))
        .pipe(gulp.dest('public/css'));
}

function copyCalculations() {
    return gulp.src('src/calculations/**/*.*')
        .pipe(minify(jsminify_config))
        .pipe(gulp.dest('public/calculations'));
}

gulp.task('build', function () {
    runSequence(['build-templates', 'build-images'], 'build-opapp', 'cleanup');
});

gulp.task('build-images', function () {
    // copyImages();
    minImages();
});

gulp.task('build-templates', function () {
    buildTemplates();
});

gulp.task('build-opapp', function () {
    buildOPAPP();
});

gulp.task('cleanup', function () {
    copyReadme();
    copyVersion();
    copyIncludes();
    copyJS();
    copyCalculations();
    copyCSS();
});

gulp.task('watch', function () {
    gulp.watch('src/**/*', ['build'])
});
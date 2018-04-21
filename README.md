# app-builder
Builds Optinomic-Apps with gulp, nunjucks

## Directory Structure of <app-builder>

```shell
.
    .
    ├── node_modules            # Dependencies installed by Yarn
    ├── public                  # Compiled files (alternatively `dist`) - This will be the root of the app-repo.
    ├── src                     # Source files (alternatively `lib` or `app`)
    │   ├── __build             # Needed for building
    │   ├── __config            # Define Sections (check: Optinomic-App | Specification)
    │   ├── calculations        # Store .js calculations here. They will be minified.
    │   ├── css                 # Store .css files here. They will be minified.
    │   ├── img                 # Store imgage files here. They will be minified.
    │   ├── includes            # Store everything else here. Folder will be copied to root.
    │   ├── javascript          # Store .js files here. They will be minified.
    │   └── templates           # Store Template-Files here. They will be minified.
    │       ├── *.nj            # Template-Files, those are building the templates.
    │       └── *.html          # For simplicity, they can be referenced in .nj Files.
    ├── README.md               # README-File for the app in Markdown-Format.
    └── VERSION                 # The current version of the App.
```

Full Documentation: [Optinomic-App | Specification](https://doc.optinomic.org/V2/Developers/app_spezifikation.html#dependencies-optional-can-have-many) 

## Build

### Yarn
Yarn is our package manager of choice: 
> FAST, RELIABLE, AND SECURE DEPENDENCY MANAGEMENT.

- [Install and update](https://yarnpkg.com/en/docs/install)
- [Most common commands](https://yarnpkg.com/en/docs/usage)

### Gulp
`app-builder` uses also `gulp` which is a toolkit for automating painful or time-consuming tasks in your development workflow.

- [Automate and enhance your workflow](https://gulpjs.com/)

#### Available Gulp-Tasks

##### default

```shell
gulp default
```

Run's the following Tasks:

1. build-opapp
2. build-images

##### build-opapp

```shell
gulp build-opapp
```

*Description:* This tasks creates the needed `.opapp` File. Render Nunjucks templates and minify the resulting HTML/JS/CSS.

##### build-images

```shell
gulp build-Minify PNG, JPEG, GIF and SVG images
```

*Description:* Minify PNG, JPEG, GIF and SVG images.


##### watch

```shell
gulp watch
```
Run's `default` as soon as changes in `/src` directory are detected.

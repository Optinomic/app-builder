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
Yarn is our package manager of choice: FAST, RELIABLE, AND SECURE DEPENDENCY MANAGEMENT.

- [Install and update](https://yarnpkg.com/en/docs/install)
- [Most common commands](https://yarnpkg.com/en/docs/usage)

### Gulp
`app-builder` uses also `gulp` which is a toolkit for automating painful or time-consuming tasks in your development workflow.

- [Automate and enhance your workflow](https://gulpjs.com/)

#### Available Gulp-Tasks

The complete list of all tasks can be found: [Here](https://github.com/Optinomic/app-builder/blob/master/gulpfile.js#L129).

##### build

```shell
gulp build
```

##### watch

```shell
gulp watch
```
Run's `build` as soon as changes in `/src` directory are detected.


## Contact

![image](http://www.optinomic.com/_logo/optinomic_logo_trademark_indigo_25.png)

*Optinomic GmbH*   
*Haldenstrasse 7*     
*CH - 8942 Oberrieden*     
*+41(0)44 508 26 76*    
*[info@optinomic.com](mailto:info@optinomic.com)*   
*[www.optinomic.com](https://www.optinomic.com/)*   

# app-builder
Builds Optinomic-Apps with gulp, nunjucks

## Directory Structure of <app-builder>

```shell
.
    .
    ├── dist                    # Compiled files
    ├── node_modules            # Dependencies installed by Yarn
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

## Using

The following process can vary. This should be just a basic documentation.

1. [Download](https://github.com/Optinomic/app-builder/archive/master.zip)
2. Extract the folder in your `optinomic-app-repositorys` Folder
3. Rename the extracted folder to your needs. Example: `org.optinomic.template.test`
4. Open your Terminal and `cd` into the renamed directory.
5. Run `yarn install`

### Create app-repo

1. Create a new Rep @ https://github.com/Optinomic with your choosen name. Example: `org.optinomic.template.test`
2. Go to https://github.com/Optinomic/org.optinomic.template.test and choose `Clone or download`
3. Choose `Open in Desktop`
4. Make sure your local path points to `your_local_path/optinomic-app-repositorys/org.optinomic.template.test/org.optinomic.template.test`
5. Double check that you have selected only the `/org.optinomic.template.test` Folder. This should be the root of your [app-repo](https://github.com/Optinomic/org.optinomic.template.test).

### Start Building

1. Change `app_id` in `gulpfile.js`.
2. Check `Build` below.

## Build

Documentation for your build process.

### Yarn

Yarn must be installed - this is our package manager of choice: FAST, RELIABLE, AND SECURE DEPENDENCY MANAGEMENT.

- [Install and update](https://yarnpkg.com/en/docs/install)
- [Most common commands](https://yarnpkg.com/en/docs/usage)

### Gulp

`app-builder` uses also `gulp` which is a toolkit for automating painful or time-consuming tasks in your development workflow.

- [Automate and enhance your workflow](https://gulpjs.com/)

#### Available Gulp-Tasks

The complete list of all tasks can be found: [Here](https://github.com/Optinomic/app-builder/blob/master/gulpfile.js#L129).

The following list are the most common tasks:

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

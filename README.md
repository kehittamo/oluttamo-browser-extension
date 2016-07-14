# Oluttamo aka. find beer info from ratebeer
Work in progress!

You can already try this out: https://chrome.google.com/webstore/detail/oluttamo-find-beer-info/pphmlagnoljkcfghondlachhdionjjfi

## Generator
* https://github.com/HaNdTriX/generator-chrome-extension-kickstart

## Current problems
* ratebeer.com does not provide https. So if you are using this extension in a page that uses https -> ratebeer iframe isn't  loading.

## Firefox version
Before we will port this to Firefox, this bug need to be squeezed
* [Implement chrome.runtime.onInstalled](https://bugzilla.mozilla.org/show_bug.cgi?id=1252871)

After that web should be [webextensionyet](http://www.arewewebextensionsyet.com/)

## Installation

	$ npm install

## Usage

Run `$ gulp --watch` and load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All js-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## Tasks

### Build

	$ gulp


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |


### pack

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp pack --vendor=firefox

### Version

Increments version number of `manifest.json` and `package.json`,
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


## Globals

The build tool also defines a variable named `ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.js`

	if(ENV === 'development'){
		console.log('We are in development mode!');
	}

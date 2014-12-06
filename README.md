# tartJS Mobile Demo

This project aims to implement the best practices of hybrid mobile application development with Cordova (Phonegap) and tartJS.

[tartJS](https://github.com/tart/tartjs) is a performance-optimized framework that is based on the [Google Closure Library](https://github.com/google/closure-library). tartJS is under constant development for over three years.

At Startup Kitchen, we believe that mobile apps have to perform as good as possible. This is why we were never satisfied with hybrid app development frameworks and we've come up with an architecture that is best suited for the job, keeping the performance problems in mind. We've been developing hybrid mobile applications with this framework for over two years, and we felt that it's already time to open-source this architecture.

This repository gives an example project structure and hopefully will shed light on how to implement a scalable mobile application architecture with complex view hierarchies. The good thing about tartJS is software complexity doesn't even increase linearly as you grow your app.

Since this is both a boilerplate and a demo; we'll be dealing with Cordova. You'll need a few installation steps after cloning this repository.

## Prepare
The first step will be installing `cordova`, if you don't already have it.
```sh
sudo npm install -g cordova
```

Clone this repository recursively so all submodules (namely, tartJS and its submodules) are also cloned.
```sh
git clone --recursive git@github.com:tart/mobile-boilerplate.git
```

Install the local dependencies such as grunt tasks.
```sh
npm install
```

We're actually working on an experimental, yet easier installation. [Click here](#grunt-tart) to see those steps.

## Create Cordova project
And the next step is creating your application.
```sh
cordova create target com.tart.TVShows TVShows
```

Which will create an empty Cordova project at the `target` folder. Enter the `target` folder and let's add some useful plugins.

Add the device plugin to get platform information. This is not strictly required, but allows you to target specific platforms via corresponding CSS selectors so that your app looks best on different platforms. (Who knows, maybe you'd want to disable animations for Android!)

```sh
cordova plugin add org.apache.cordova.device
```

Add the status bar plugin to change status bar color on different views. This is a good control on iOS where the status bar is transparent; so you need to have control over the status bar text (and icon) colors.

```sh
cordova plugin add org.apache.cordova.statusbar
```

Add the splash screen plugin because Cordova prematurely hides the splashscreen, giving a blank white screen for a brief period before launching your app.

```sh
cordova plugin add org.apache.cordova.splashscreen
```
Now you're ready to build the standard Cordova application! But first, let's add the iOS platform.

```sh
cordova platform add ios
```

```sh
cordova build ios
```

We're now ready to emulate it via iOS Simulator.

```sh
cordova emulate ios
```

One final note about this section is the so-called overflow scroll; which sometimes is called as rubber band scroll. Edit `target/config.xml` and add `<preference name="DisallowOverscroll" value="true"/>` so that your app actually behaves like an app rather than a web site in the browser.

## Enter tartJS
### Basics
Now let's set it up so that this demo app is built with tartJS. This project uses grunt for building. Here's the syntax for build operations

```sh
grunt $LEVEL $PLATFORM $ENVIRONMENT
```

Where the variables `$LEVEL`, `$PLATFORM` and `$ENVIRONMENT` can be summarized as the following:

```sh
grunt (dev|production) (web|device) (local|test|prod)
```

#### Build level ($LEVEL)
The first group `(dev|production)` defines the build level. `dev` symlinks all development files to the `target/www` folder, so that you can easily update the source code while in development. This gives you the ability to develop within Chrome (or any other browser of your choice). We would recommend the `http-server` module to serve these static files. For example, install the `http-server` module first with:

```sh
npm install -g http-server
```

And then spin up a development environment with

```sh
http-server target/www
```

Now you can navigate your browser to `http://localhost:8080` and you'll see your application. Since the source files are symlinked, they will be automatically updated and all you need to do to get the updates is refresh (or even better, use a fancy file watcher and reloader).

#### Hardware Platform ($PLATFORM)
The second group `(web|device)` defines the hardware platform the application will run. Basically, this will add an `ENV` variable to the runtime so you can be more specific with your code. Since most cordova plugins are device specific; you probably will get errors during development if you build your files vis-a-vis. Choosing `web` as your platform during development lets you avoid those error during development and finally when you're ready to test on the device, you just use `device` for this group.

#### Application Environment ($ENVIRONMENT)
The third group `(local|test|prod)` defines the application environment. Most applications will have a kind of integration with another service, or a backend. For example, most applications need to talk to an API server to fetch information. Configuring and testing the application with local or test servers are extremely hard to manage so we give you three options (where you can add more) during build phase. This third group chooses the correct configuration file in the `config` folder so you can define different API paths or functions for each specific environment.

#### Examples
Here are a few examples.

* you're developing on your machine with a local API. Use `grunt dev web local`.
* you're developing on your machine with a remote, test API. Use `grunt dev web test`
* you're simulating on the device with a local API. Use `grunt production device local`
* you're simulating on the device with the production API. This also means that your app is ready for submission to the stores. Use `grunt production device prod`

### Back to building the app

Let's first see the end product! Run the following;

```sh
grunt production device prod
cordova build ios
```

This basically builds your application. Now you can run it through the simulator with `cordova emulate ios` or on your device with `cordova run ios`. We'll leave that part to you as an exercise ;)

## Cheers!

Here's the final result!

## grunt-tart

To automate minification and Cordova build actions (even running on device) you can use our brand new grunt task:

```sh
npm install grunt-tart
```

And after package installation you can run your app, let's say, on an android device like that:

```sh
grunt tart:android --run=device
```

## During Development

You would probably rather die than develop on iOS Simulator or the device itself. Fortunately, the good gods have provided us with Chrome. Spin up your dev server with `http-server target/www` and navigate to `http://localhost:8080`. Now, develop however you wish! Most probably, you would wish to use device emulation on Chrome to get better characteristics.

## Folder structure

Soon enough, in this section, we'll explain how you should structure your folders and files. Although the best practices are apparent in this repository.

## tartJS Conventions

This section will contain a link to the yet non-existent tartJS wiki page where we explore the coding conventions.

## tartJS Primer

This section will also contain a link to another non-existent tartJS wiki page where discuss the basic concepts behind tartJS.

## License
Copyright 2014 Startup Kitchen. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

// Copyright 2014 Startup Kitchen. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('app.Bootstrapper');
goog.require('app.Application');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events.EventHandler');



/**
 * @export
 *
 * Bootstrapper class includes things to do on startup.
 * @constructor
 */
app.Bootstrapper = function() {
    // clean all script tags for cleaner HTML.
    [].slice.call(document.body.getElementsByTagName('script')).forEach(function(el) {
        document.body.removeChild(el);
    });

    app.Application.getInstance();

    document.body.classList.add(cfg.ENV);
    if (cfg.ENV == 'device' && typeof device != 'undefined') {
        if (device.platform == 'iOS' && device.model[6] >= 4)
            document.body.classList.add('hq');

        document.body.classList.add(device.platform);

        setTimeout(function() {
            navigator.splashscreen && navigator.splashscreen.hide();
        }, 2000);
    }
};

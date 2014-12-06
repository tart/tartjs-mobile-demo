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

goog.provide('app.ui.about.View');
goog.require('tart.ui.View');



/**
 *
 * @constructor
 * @extends {tart.ui.View}
 */
app.ui.about.View = function() {
    goog.base(this);
};
goog.inherits(app.ui.about.View, tart.ui.View);


/**
 * @override
 */
app.ui.about.View.prototype.className = 'about-view';


/**
 * @override
 */
app.ui.about.View.prototype.templates_content = function() {
    return '<h1>' + __('Top TV Show Posters') + '</h1>' +
        '<p>' + __('A tartJS mobile app demo') + '</p>';
};


/**
 * @override
 */
app.ui.about.View.prototype.activate = function() {
    if (cfg.ENV == 'device')
        StatusBar.styleDefault();
};

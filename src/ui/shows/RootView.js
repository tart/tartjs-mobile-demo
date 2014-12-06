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

goog.provide('app.ui.shows.RootView');
goog.require('app.ui.shows.ListView');
goog.require('tart.ui.View');
goog.require('tart.ui.ViewManager');



/**
 *
 * @constructor
 * @extends {tart.ui.View}
 */
app.ui.shows.RootView = function() {
    goog.base(this);

    this.navBar = new tart.ui.NavBarComponent({title: __('Top Shows'), hasMenuButton: true, hasBackButton: true});
};
goog.inherits(app.ui.shows.RootView, tart.ui.View);


/**
 * @override
 */
app.ui.shows.RootView.prototype.activate = function() {
    if (cfg.ENV == 'device')
        StatusBar.styleLightContent();
};


/**
 * @override
 */
app.ui.shows.RootView.prototype.onAfterRender = function() {
    this.vm = new tart.ui.ViewManager(this.getElement());

    this.navBar.vm = this.vm;

    this.listView = new app.ui.shows.ListView();
    this.listView.vm = this.vm;

    this.vm.setCurrentView(this.listView);
};


/**
 * @override
 */
app.ui.shows.RootView.prototype.templates_content = function() {
    return this.navBar.getPlaceholder();
};

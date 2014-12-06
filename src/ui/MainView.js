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

goog.provide('app.ui.MainView');
goog.require('tart.ui.TabBarView');
goog.require('app.ui.about.View');
goog.require('app.ui.shows.RootView');



/**
 *
 * @constructor
 * @extends {tart.ui.TabBarView}
 */
app.ui.MainView = function() {
    goog.base(this);
    this.hasSidebar = true;

    this.render();
};
goog.inherits(app.ui.MainView, tart.ui.TabBarView);


/**
 * @override
 */
app.ui.MainView.prototype.onAfterRender = function() {
    goog.base(this, 'onAfterRender');

    app.showsView = new app.ui.shows.RootView();
    app.showsView.render(this.getElement());
    app.aboutView = new app.ui.about.View();

    this.views = [app.aboutView, app.showsView];

    this.vm.setCurrentView(app.aboutView);

    app.sidebar.addEventListener('switchView', this.switchView, false, this);
    app.showsView.navBar.menuButtonHandler = this.vm.toggleSidebar.bind(app.vm);
};


app.ui.MainView.prototype.switchView = function(e) {
    this.activateItemByName(e.view);
};


/**
 * @override
 */
app.ui.MainView.prototype.templates_items = function() {
    return '<tab-item class="active" data-view="about">' + __('About') + '</tab-item>' +
        '<tab-item data-view="shows">' + __('Shows') + '</tab-item>';
};

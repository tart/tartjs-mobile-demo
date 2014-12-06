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

goog.provide('app.ui.SidebarComponent');
goog.require('tart.ui.SidebarComponent');



/**
 * @constructor
 * @extends {tart.ui.SidebarComponent}
 */
app.ui.SidebarComponent = function() {
    goog.base(this);

    this.vm = app.vm;
};
goog.inherits(app.ui.SidebarComponent, tart.ui.SidebarComponent);


/**
 * @return {string} Returns the items for the sidebar.
 */
app.ui.SidebarComponent.prototype.template_items = function() {
    return '<sidebar-item class="sidebar-item-shows" data-view="shows">' +
            '<i class="icon-signup"></i>' + __('Shows') +
            '<sidebar-label>' +
                __('Great posters for the best shows') +
            '</sidebar-label>' +
        '</sidebar-item>' +
        '<sidebar-item class="sidebar-item-about" data-view="about">' +
            '<i class="icon-about"></i>' + __('About') +
        '</sidebar-item>';
};

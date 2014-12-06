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

goog.provide('app.ui.InfiniteScrollComponent');
goog.require('tart.ui.InfiniteScrollComponent');



/**
 * InfiniteScrollComponent is a small component which checks the scroll position of a given DOM element, and if it's in
 * an appropriate position, fires a LOAD event for the parent component to act upon. When the parent component is
 * done loading new items, it should reset this InfiniteScrollComponent with the reset() method.
 *
 * @constructor
 * @extends {tart.ui.InfiniteScrollComponent}
 *
 * @param {Element=} opt_el Optional element to track its scroll.
 */
app.ui.InfiniteScrollComponent = function(opt_el) {
    goog.base(this, opt_el);

    this.endOfListText = __('End of List');
};
goog.inherits(app.ui.InfiniteScrollComponent, tart.ui.InfiniteScrollComponent);

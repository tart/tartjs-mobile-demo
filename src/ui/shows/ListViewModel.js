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

goog.provide('app.ui.shows.ListViewModel');
goog.require('app.models.ShowsModel');
goog.require('tart.ui.ViewModel');



/**
 *
 * @constructor
 * @extends {tart.ui.ViewModel}
 */
app.ui.shows.ListViewModel = function() {
    goog.base(this);

    this.loadShows();
};
goog.inherits(app.ui.shows.ListViewModel, tart.ui.ViewModel);


app.ui.shows.ListViewModel.prototype.getShowById = function(id) {
    return goog.array.find(this.shows, function(show) {
        return show['_id'] == id;
    });
};


app.ui.shows.ListViewModel.prototype.loadShows = function() {
    app.models.ShowsModel.getInstance().fetch(function(shows) {
        shows = [].slice.call(shows);
        goog.array.shuffle(shows);
        this.shows = shows;
        this.dispatchEvent(app.ui.shows.ListViewModel.EventType.LOADED);
    }.bind(this));
};


app.ui.shows.ListViewModel.prototype.loadMore = function() {
    app.models.ShowsModel.getInstance().fetch(function(shows) {
        shows = [].slice.call(shows, 10);
        goog.array.shuffle(shows);

        this.dispatchEvent({
            type: app.ui.shows.ListViewModel.EventType.LOADED_MORE,
            diff: shows,
            endOfFeed: true
        });
    }.bind(this));
};


/**
 *
 * @enum {string}
 */
app.ui.shows.ListViewModel.EventType = {
    LOADED: 'loaded',
    LOADED_MORE: 'loadedMore'
};

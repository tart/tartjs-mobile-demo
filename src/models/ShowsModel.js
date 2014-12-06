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

goog.provide('app.models.ShowsModel');
goog.require('goog.events.EventTarget');



/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
app.models.ShowsModel = function() {
    goog.base(this);
};
goog.inherits(app.models.ShowsModel, goog.events.EventTarget);
goog.addSingletonGetter(app.models.ShowsModel);



app.models.ShowsModel.prototype.fetch = function(cb) {
    tart.xhr('static/data/shows.json', function(err, data) {
        this.shows = data.slice(0, 20);
        cb(this.shows);
    }, this);
};

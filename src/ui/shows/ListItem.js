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

goog.provide('app.ui.shows.ListItem');
goog.require('tart.ui.DlgComponent');



/**
 *
 * @param {Object} movie
 * @constructor
 *
 * @extends {tart.ui.DlgComponent}
 */
app.ui.shows.ListItem = function(movie) {
    goog.base(this);

    this.movie = movie;
};
goog.inherits(app.ui.shows.ListItem, tart.ui.DlgComponent);


app.ui.shows.ListItem.prototype.templates_base = function() {
    var imgFile = this.movie['images']['fanart'].split('/').slice(-1);

    return '<list-item id="' + this.id + '" data-movie-id="' + this.movie['_id'] + '"' +
        'style="background-image: url(static/img/cover/' + imgFile + ')">' +
        '<movie-title>' + this.movie['title'] + '</movie-title>' +
        '</list-item>';
};

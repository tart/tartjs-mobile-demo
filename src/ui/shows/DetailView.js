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

goog.provide('app.ui.shows.DetailView');
goog.require('tart.ui.NavBarComponent');
goog.require('tart.ui.View');



/**
 *
 * @constructor
 * @extends {tart.ui.View}
 */
app.ui.shows.DetailView = function(movie) {
    goog.base(this);

    this.movie = movie;
};
goog.inherits(app.ui.shows.DetailView, tart.ui.View);


app.ui.shows.DetailView.prototype.supportsBackGesture = true;


/**
 * @override
 */
app.ui.shows.DetailView.prototype.templates_base = function() {
    var imgFile = this.movie['images']['fanart'].split('/').slice(-1);

    return '<view class="detail-view" id="' + this.id + '"' +
            'style="-webkit-transform: translate3d(100%, 0, ' + this.index + 'px);' +
            'background-image: url(static/img/poster/' + imgFile + ')">' +
        '</view>';
};


app.ui.shows.DetailView.prototype.onListItemTap = function(e) {
    console.log(e.target.getAttribute('data-movie-id'));
};


app.ui.shows.DetailView.prototype.events = {
    'tap': {
        'list-item': app.ui.shows.DetailView.prototype.onListItemTap
    }
};

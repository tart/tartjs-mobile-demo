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

goog.provide('app.ui.shows.ListView');
goog.require('app.ui.InfiniteScrollComponent');
goog.require('app.ui.shows.DetailView');
goog.require('app.ui.shows.ListItem');
goog.require('app.ui.shows.ListViewModel');
goog.require('tart.ui.P2RComponent');
goog.require('tart.ui.NavBarComponent');
goog.require('tart.ui.View');



/**
 *
 * @constructor
 * @extends {tart.ui.View}
 */
app.ui.shows.ListView = function() {
    this.model = new app.ui.shows.ListViewModel();
    this.p2rComponent = new tart.ui.P2RComponent();
    this.infiniteScrollComponent = new app.ui.InfiniteScrollComponent();

    goog.base(this);
};
goog.inherits(app.ui.shows.ListView, tart.ui.View);


/**
 * @override
 */
app.ui.shows.ListView.prototype.templates_base = function() {
    return '<view class="list-view" id="' + this.id + '" style="-webkit-transform: translate3d(100%, 0, ' +
        this.index + 'px)">' +
            '<list-items></list-items>' +
        '</view>';
};


/**
 * @override
 */
app.ui.shows.ListView.prototype.bindModelEvents = function() {
    this.model.addEventListener(app.ui.shows.ListViewModel.EventType.LOADED, this.onLoaded, false, this);
    this.model.addEventListener(app.ui.shows.ListViewModel.EventType.LOADED_MORE, this.onLoadedMore, false, this);

    this.refreshListener = goog.events.listen(this.p2rComponent, this.p2rComponent.EventType.SHOULD_REFRESH,
        this.onShouldRefresh, false, this);

    this.infiniteScrollListener = goog.events.listen(this.infiniteScrollComponent, this.infiniteScrollComponent.EventType.SHOULD_LOAD,
        this.onInfiniteScroll, false, this);
};


/**
 * @override
 */
app.ui.shows.ListView.prototype.onAfterRender = function() {
    this.onLoaded();

    this.p2rComponent.render(this.getElement());
    this.infiniteScrollComponent.render(this.getElement());
};


app.ui.shows.ListView.prototype.onInfiniteScroll = function() {
    setTimeout(function() {
        this.model.loadMore();
    }.bind(this), 2000);
};


/**
 * Refresh the shows listing.
 */
app.ui.shows.ListView.prototype.onShouldRefresh = function() {
    setTimeout(function() {
        this.model.loadShows();
    }.bind(this), 2000);
};


app.ui.shows.ListView.prototype.onLoaded = function() {
    if (!this.rendered || !this.model.shows) return;

    this.p2rComponent.reset();

    this.movieComponents = this.model.shows.map(function(movie) {
        return new app.ui.shows.ListItem(movie);
    }, this);

    var markup = this.movieComponents.map(function(cmp) {
        return cmp.templates_base();
    }).join('');

    this.getChild('list-items')[0].innerHTML = markup;
    this.infiniteScrollComponent.showSpinner();
};


app.ui.shows.ListView.prototype.onLoadedMore = function(e) {
    var listEl_ = this.getChild('list-items')[0];

    if (e.diff) {
        var movieComponents = e.diff.map(function(movie) {
            return new app.ui.shows.ListItem(movie);
        }, this);

        var markup = movieComponents.map(function(cmp) {
            return cmp.templates_base();
        }).join('');

        listEl_.appendChild(goog.dom.htmlToDocumentFragment(markup));

        if (e.endOfFeed)
            this.infiniteScrollComponent.showEndOfList();
        else
            this.infiniteScrollComponent.showSpinner();
    }
};


/**
 * @override
 */
app.ui.shows.ListView.prototype.disposeInternal = function() {
    this.p2rComponent.dispose();
    this.infiniteScrollComponent.dispose();

    goog.events.unlistenByKey(this.refreshListener);
    goog.events.unlistenByKey(this.infiniteScrollListener);

    goog.base(this, 'disposeInternal');
};


app.ui.shows.ListView.prototype.onListItemTap = function(e) {
    var movie = this.model.getShowById(e.target.getAttribute('data-movie-id'));
    this.vm.pull(new app.ui.shows.DetailView(movie), true);
};


app.ui.shows.ListView.prototype.events = {
    'tap': {
        'list-item': app.ui.shows.ListView.prototype.onListItemTap
    }
};

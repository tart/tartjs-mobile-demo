var cordova = {};
var device = { platform: '', model: '' };

cordova.exec = function(a, b, c, d, e) {};
cordova.require = function(a) {};
cordova.require.setJsToNativeBridgeMode = function(a) {};
cordova.require.jsToNativeModes = {};
cordova.require.jsToNativeModes.IFRAME_NAV;
cordova.require.jsToNativeModes.XHR_NO_PAYLOAD;

var console = {};

/**
 *
 * @param {...*} a
 */
console.log = function(a) {};

var localStorage = {};
var JSON = {};

navigator.splashscreen = {};
navigator.splashscreen.hide = function() {};
navigator.app = {};
navigator.app.exitApp = function() {};
navigator.notification = {};
navigator.notification.alert = function(a, b, c) {};

var StatusBar = {};
StatusBar.overlaysWebView = function(a) {};
StatusBar.styleDefault = function() {};
StatusBar.styleLightContent = function() {};
StatusBar.styleBlackTranslucent = function() {};
StatusBar.styleBlackOpaque = function() {};
StatusBar.backgroundColorByName = function(a) {};
StatusBar.backgroundColorByHexString = function(a) {};
StatusBar.hide = function() {};
StatusBar.show = function() {};
StatusBar.isVisible = true;

window.cordova = {};

var facebookConnectPlugin = {
    browserInit: function(e) {},
    login: function(a, b, c) {},
    showDialog: function(a, b, c) {},
    api: function(a, b, c, d) {}
};

var FB = {
    init: function() {},
    getLoginStatus: function() {},
    login: function(cb) {},
    api: function(p, cb) {},
    logout: function() {},
    Event: {}
};
/**
 * @param {Object=} a
 * @param {Object=} opt_b
 */
FB.ui = function(a, opt_b) {};
FB.Event.subscribe = function(a, cb) {};

var CDV = {
    FB: {}
};

var cfg = {
    ENV: '',
    API_PATH: '',
    TIO_TEST_USER: '',
    TIO_API_PATH: '',
    VERSION: '',
    GCM_SENDER_ID: ''
};

var async = {
    each: function(array, iterator, callback) {}
};

window.plugins = {socialsharing: {}, toast: {}, pushNotification: {register: function(a,b,c){}}};
/**
 *
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {*} d
 * @param {*=} opt_e
 * @param {*=} opt_f
 */
window.plugins.socialsharing.share = function(a, b, c, d, opt_e, opt_f) {};
window.plugins.toast.showShortBottom = function(a) {};

/**
 *
 * @param {...*} var_args
 */
var __ = function(var_args) {};

var ga_storage = {};

/**
 * @param {*} a
 * @param {*} b
 * @param {*=} opt_c
 * @param {*=} opt_d
 */
ga_storage._trackEvent = function(a, b, opt_c, opt_d) {};
ga_storage._setAccount = function(a) {};
ga_storage._setDomain = function(a) {};
ga_storage._trackPageview = function(a) {};
ga_storage._setCustomVar = function(a, b, c, d) {};


/* Copyright 2015-2016 PayPal, Inc. */
"use strict";

var sdkVersion = exports.sdkVersion = require('../package').version;
var userAgent = exports.userAgent = 'PayPalSDK/PayPal-node-SDK ' + sdkVersion + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + '; OpenSSL ' + process.versions.openssl + ')';

var default_options = exports.default_options = {
    'mode': 'sandbox',
    'client_id': 'ATg3PSzrcaABZs5Pw0yY-1zVDhSwPGeyo9ISEDLxbkcNMVi1dKGm0L42rzAGEDdG4Ti7PVS4NalnZEGi',
    'client_secret': 'EDNl6mJFVIZom6uu3apowJmjoUKKRbdo5JRW_QsgEMyPFoNK4JOutT30NmbPVizwEPnbKH8q-Mb8UuXb',
    'schema': 'https',
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'openid_connect_schema': 'https',
    'openid_connect_host': 'api.sandbox.paypal.com',
    'openid_connect_port': '',
    'authorize_url': 'https://www.sandbox.paypal.com/signin/authorize',
    'logout_url': 'https://www.sandbox.paypal.com/webapps/auth/protocol/openidconnect/v1/endsession',
    'headers': {}
};

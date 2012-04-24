/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/bootstrap/*', to: 'bootstrap/*'},
    {from: '/modules.js', to: 'modules.js' },
    {"from": "/_db/*", "to": "../../*" },
    {"from": "/_db", "to": "../.." },
    {"from": "/bookmark_lite", "to" : "_list/bookmark_lite/all_tags"},
    {"from": "/bookmark", "to" : "_list/bookmark/all_tags"},
    {"from": "/save", "to" : "_update/bookmark"},
    {"from": "/click/*", "to" : "_update/click/*"},
    {"from": "/archive/*", "to" : "_update/archive/*"},
    {from: '/', to: 'index.html'}
];
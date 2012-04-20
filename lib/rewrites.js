/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/modules.js', to: 'modules.js' },
    {"from": "/_db/*", "to": "../../*" },
    {"from": "/_db", "to": "../.." },
    {"from": "/bookmark_lite", "to" : "_show/bookmark_lite"},
    {"from": "/bookmark", "to" : "_show/bookmark"},
    {"from": "/save", "to" : "_update/bookmark"},
    {from: '/', to: 'index.html'}
];
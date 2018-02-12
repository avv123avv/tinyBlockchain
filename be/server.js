require('babel-core/register');
require('bluebird');
//ignore css, less, sass, ttf, woff, woff2
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');
require('server.js');

Package.describe({
  name: 'ox2:box-viewer',
  summary: 'Box Viewer component',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

var S = 'server';
var C = 'client';
var CS = [C, S];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  // Core
  api.use([
    'templating'
    ]);
  // Viewerjs
  api.use('jquery', C);

  api.addFiles('lib/viewerjs/crocodoc.viewer.css', C);
  api.addFiles('lib/viewerjs/crocodoc.viewer.js', C);
  api.addFiles('lib/viewerjs/eventsource.js', C);
  api.addFiles('lib/viewerjs/realtime.js', C);
  api.addFiles('lib/viewerjs/fullscreen.js', C);
  api.addFiles('lib/viewerjs/fullscreen.css', C);

  api.export('Crocodoc', C);
  // 3rd party
  api.use([
    'lauricio:less-autoprefixer@2.5.0_3','mquandalle:jade@0.4.1'
    ]);
  api.addFiles('lib/oo-box-viewer.jade', C);
  api.addFiles('lib/oo-box-viewer.js', C);
  api.addFiles('lib/oo-box-viewer.less', C);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ox2:box-viewer');
  api.addFiles('tests/oo-box-viewer-tests.js');
});

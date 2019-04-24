const chokidar = require('chokidar');
const shelljs = require('shelljs');

const watcher = chokidar.watch('src', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => {
      shelljs.exec("npm run compile");
      console.log(`\n\n========\nFile ${path} has been changed\n========\n\n`);
  });
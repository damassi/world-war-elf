// Start sails and pass it command line arguments
require('sails').lift(require('optimist').argv);

// Start node-monkey for inspecting app in browser
require('node-monkey').start()
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

exports.plugins = {
  babel: {presets: ['latest', 'react']}
};


exports.hot = true

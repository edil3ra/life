module.exports = {
  files: {
	javascripts: {
	  joinTo: {
		'vendor.js': /^(?!app)/,
		'app.js': /^app/,
	  }	  
	},
	stylesheets: {
	  joinTo: {
		'vendor.css': /^(?!app)/,
		'app.css': /^app/,
	  },
	},
  },
  hot: true,
  npm: {
	styles: {
	  'font-awesome': ['css/font-awesome.css']
	}
  }
}

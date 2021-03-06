const path = require('path');
const express = require('express');

const app = express();
app.use('/static', express.static(path.join(__dirname, './static')));

if (process.env.NODE_ENV !== 'production') {
	const webpack = require('webpack');
	const config = require('./webpack.config.dev');
	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = (process.env.PORT || 3000);
app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});

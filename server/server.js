import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import models from './data/models';
import config from './config';

const app = express();

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV) {
  app.enable('trust proxy');
}

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.get('*', (req, res) => {
  res.send('hello world');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  res.status(err.status || 500);
  res.send(pe.render(err));
});

// TODO: change port config
models
  .sync(config.db.options)
  .then(() => {
    app.listen(config.app.port, () => {
      console.info(
        `The server is running at http://localhost:${config.app.port}/`,
      );
    });
  })
  .catch(err => {
    console.error(err);
  });

export default app;

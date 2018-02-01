import config from '../config';
import express from 'express';
import {createConnection} from 'mysql';

const app = express();

const mysql = createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.pass
});

mysql.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) =>
  res.send('Hello World!')
);

app.listen(config.app.port, () => {
  console.log('Node Environment: ' + process.env.NODE_ENV);
  console.log('Application listening on port: ' + config.app.port);
});

require('dotenv').config();
const http = require('http');
const app = require('./lib/app');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log('server running on', server.address().port);
});

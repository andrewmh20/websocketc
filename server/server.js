import express from 'express';
import path from 'path';
import ejs from 'ejs';

//TODO: What in package file should be a dev Dependency
//TODO: What exactly needs to be compiled/done differently in production from dev

const server = express();

// Use the EJS rendering engine for HTML located in /views
server.set('views', __dirname + '/../views')
server.engine('html', ejs.__express)
server.set('view engine', 'html')

// Host static files on URL path
server.use(express.static(path.join(__dirname, '../public')))


server.get('/', (_, res) => {
  res.render('index');
})



server.listen(process.env.PORT || 3000, () => {
  console.log('server listening on port ' + (process.env.PORT || 3000))
})

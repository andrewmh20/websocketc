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


server.use(express.urlencoded({ extended: true }));
server.use(express.json());


//Route Needed:
//login
//list
//terminal
//API routes
//select WS (redirect to terminal)

const userData = 
[{user: 'Andrew', wsData: [{name: 'Test', url: 'ws://localhost:8080'}, {name: 'Test', url: 'localhost'}]}];

//Then define models for database...

server.get('/', (_, res) => {
  res.render('index');
})

server.get('/App', (_, res) => {
  res.render('App');
})


//API endpoint to send user stuff, only if authenticated I.e. 0th user in this case
server.get('/api/getUserData', (_, res) => {
  res.send(userData[0]);
})

server.post('/api/addWSHost', (req, res) => {
//TODO: Databse call
  userData[0] = req.body;
  console.log(req.body);
  console.log(userData[0]);

  res.send(userData[0]);
  // res.status(200); //Correct? Needed?
})

server.post('/api/removeWSHost', (req,res) =>{
  // userData['req.user'].wsData.splice('')
  //TODO adjust this to remove for a specific user
  userData[0] = req.body;
  console.log(req.body);
  console.log(userData[0]);
  res.send(userData[0]);
})


server.get('*', (_,res) =>{
  res.render('404');
});


server.listen(process.env.PORT || 3000, () => {
  console.log('server listening on port ' + (process.env.PORT || 3000))
})

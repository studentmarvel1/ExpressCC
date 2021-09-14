const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');


const app = express();

// Init middleware

 // app.use(logger);

 // Handle middlewares

 app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
  

 //Body params middleware

 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));

 


// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// Homepage router

app.get('/', (req, res) => res.render('index', {
    title: 'MemberApp',
    members
}));

//Members API routes

app.use('/api/memebers', require('./routers/api/members'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
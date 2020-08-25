var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    bcrypt = require('bcrypt');
    mongoose = require('mongoose')
    mongoURL = 'mongodb://localhost:27017/todos-sql',
    session = require("express-session"),
    methodOverride  = require("method-override"),
    port = process.env.PORT || 8080,
    // SequelizeStore = require("connect-session-sequelize")(session.Store),
    // SequelizeConfig = require("./config/sequelize.js"),
    app = express();

require('dotenv').config();

var User = require("./models-mongo/user");

// SETUP DB 
// const sequelize = SequelizeConfig;
// var Sequelize = require("sequelize");
// var User  = sequelize.import('./models/').users


// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
// var mySequelizeSessionStore = new SequelizeStore({
//     db: sequelize
// });

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//on connected
mongoose.connection.on('connected', () => console.log('connected to database :)'));
//on error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('error is ' + err );
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set('view engine' , 'ejs');
// app.use(express.static(__dirname + '/public'));
app.use(cors());

app.post('/app/agent', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = User.create({
        email,
        password
    }).then(us => {
        const salt =  bcrypt.genSalt(10);
        us.password =  bcrypt.hash(us.password, salt);
        us.save();
        console.log(`${us.email} was saved to the database!`);
        res.send({
            "status" : "account created"
        })
    })
    .catch(err => {
        console.log(err);
    })
});

app.post('/app/agent/auth', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    // res.redirect({
    //     success : ,
    //     failure : 
    // });
});

app.get('/', (req, res) => {
    console.log("LOGIN");
    res.render('login')
});

app.get('/app/sites/list/:id' , (req,res)=> {
    console.log('TODOS');
})


app.listen(port, () => {
    console.log(`Server runs at ${port}`);
})
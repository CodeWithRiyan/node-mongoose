const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const errorController = require('./controllers/errors')
const mongoose = require('mongoose');
//const mongoConnect = require('./utils/database').mongoConnect
const User = require('./models/user')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5ce5210d1b515419e745cdad').then(user => {
        req.user = user
        next();
    }).catch(err => {
        console.log(err);
    });
});

app.use('/admin',adminRoutes)
app.use(userRoutes)
app.use(errorController.get404)


// mongoConnect(() => {
//     app.listen(3000);
// });
mongoose.connect('your mongodb setup').then(result => {
    //console.log(result);
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Riyan',
                email: 'Riyan.stmik28@gmail.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    console.log('CONNECTED');
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
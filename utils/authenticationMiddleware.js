const { expressjwt } = require('express-jwt');

//Decrpytion -> JWT Token -> req.auth._id
exports.requireSignIn = expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256'],
    userProperty: 'auth'
});

//Authentication -> whether the user is logged in or not?
exports.isAuth = (req, res, next) => {
    console.log('Req. Auth: ', req.auth);
    console.log('Re.Profile: ', req.profile);
    let user = req.profile && req.auth._id === req.params._id;

    if(!user){
        return res.status(401).send({message: 'Access Denied! Login required!'})
    }
    next();
}

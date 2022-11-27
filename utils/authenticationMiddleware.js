const { expressjwt } = require('express-jwt');

//Decrpytion -> JWT Token -> req.auth._id
exports.requireSignIn = expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256'],
    userProperty: 'auth'
});

//Authentication -> whether the user is logged in or not?
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth._id === (req.profile._id).toString();

    if(!user){
        return res.status(401).send({message: 'Access Denied! Login required!'})
    }
    next();
}

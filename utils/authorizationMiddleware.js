//Authorization -> who can access what?

exports.isAdmin = (req, res, next) => {
    if(req.profile.role !== 1){
        return res.status(401).send({message: 'Admin resource! Access denied.'});
    }
    
    next();
}
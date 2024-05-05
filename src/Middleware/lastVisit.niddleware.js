

export const setLastVisit = (req, res, next)=>{
    // to check the set cookies form user of last visit
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge:2*60*60*1000
    });
    next();
}
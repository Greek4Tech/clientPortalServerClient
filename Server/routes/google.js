const express = require('express')
const passport = require('passport')
const router = express.Router()

//@desc Auth with Google
//@Route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile']}))

//@desc Google auth callback
//@Route GET /auth/google/callback
router.get('/google/callback', 
passport.authenticate('google', {failureRedirect: '/', failureFlash: true}), (req,res) => {
    res.redirect('/Patients')
}
)

//@desc Logout User
//@route /auth/logout
//!Change: Passport 0.6 requires logout to be async
router.get('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})


module.exports = router
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    // Match email's user
    const user = await User.findOne({ email })
    if(!user) {
        return done(null, false, { message: 'User not found' })
    } else {
        // Match Password User
        const match = await user.matchPassword(password)
        if(match) {
            return done(null, user) // encontrou usuário e senha, está tudo ok, salva session no servidor
        } else {
            return done(null, { message: 'Incorrect password' })
        } 
    }
}))

// Guarda a session no servidor
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Quando está logado verifica se tem autorização
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (username, email, role) => {
    return jwt.sign(
        {username, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {username,email, password, role} = req.body
        if (!username ||!email || !password) {
            return next(ApiError.badRequest('Некорректный email, password или имя пользователя'))
        }
        const candidateemail = await User.findOne({where: {email}})
        if (candidateemail) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const candidatename = await User.findOne({where: {username}})
        if (candidatename) {
            return next(ApiError.badRequest('Пользователь с таким username уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, email, role, password: hashPassword})
        const token = generateJwt(user.username, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {username, password} = req.body
        const user = await User.findOne({where: {username}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.username, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.username, req.user.email, req.user.role)
        return res.json({token})
    }

    async update(req, res) {
        
    }
    async delete(req, res) {
      
    }
}

module.exports = new UserController()
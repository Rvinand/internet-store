const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');
const {validationResult} = require("express-validator");

const generateGwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '24h'}
    );
}


class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка при валидации", errors.array()))
            }

            const {email, password, role} = req.body;
            if (!email || !password) {
                return next(ApiError.badRequest('Неверная почта или пароль'));
            }
            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с такой почтной уже существует'));

            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, role, password: hashPassword});
            const basket = await Basket.create({userId: user.id});
            const token = generateGwt(user.id, user.email, user.role);
            return res.json({token});

        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal('Пользователь с такой почтой не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'));
        }

        const token = generateGwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateGwt(req.user.id, req.user.email, req.user.role);
        return res.json({token});
    }
}

module.exports = new UserController();
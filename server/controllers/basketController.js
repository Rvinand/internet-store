const ApiError = require('../error/ApiError');
const {BasketDevice} = require("../models/models");

class BasketController {
    async create(req, res, next) {
        try {
            const {userId, deviceId}  = req.body

            const basketDevice = await BasketDevice.create({basketId: userId, deviceId})

            return res.json(basketDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async delete(req, res) {
        let {userId} = req.body

        let basketDevice = await BasketDevice.findOne({
            where: {basketId: userId}
        })

        basketDevice.destroy()

        return res.json()
    }

    async getAll(req, res) {
        let {userId} = req.query

        let basketDevices = await BasketDevice.findAndCountAll({
             where: {basketId: userId}
        })

        return res.json(basketDevices)
    }
}

module.exports = new BasketController();
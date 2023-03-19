const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');


class DeviceController {
    async create(req, res, next) {
        try{
            let {name, price, brandId, categoryId, info} = req.body;

            const {images} = req.files;

            console.log(images)


            const fileNames = []

            images.map((img) => {
                let fileName = uuid.v4() + '.jpg';

                img.mv(path.resolve(__dirname, '..', 'static', fileName))

                fileNames.push(fileName)
            })

            const device = await Device.create({name, price, brandId, categoryId, images: fileNames});

            if(info){
                info = JSON.parse(info);
                info.forEach(item=>{
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id,
                    });
                });
            }
            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {brandsIds, categoryId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let devices;
        if(!brandsIds && !categoryId){
            devices = await Device.findAndCountAll({limit, offset});
        }
        if(brandsIds && !categoryId){
            devices = await Device.findAndCountAll({where: {brandId:  {[Op.contains]: brandsIds}}, limit, offset});
        }
        if(!brandsIds && categoryId){
            devices = await Device.findAndCountAll({where: {categoryId}, limit, offset});
        }
        if(brandsIds && categoryId){
            devices = await Device.findAndCountAll({where: {categoryId, brandsIds}, limit, offset});
        }
        return res.json(devices);

    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne({
            where: {id},
            include:[{model: DeviceInfo, as: 'info'}]
        });
        return res.json(device);
    }
}

module.exports = new DeviceController();
const {Category} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require("uuid");
const path = require("path");

class CategoryController {
    async create(req, res) {
        const {name} = req.body;
        const {icon} = req.files;

        let fileName = uuid.v4() + '.svg';
        icon.mv(path.resolve(__dirname, '..', 'static', fileName))

        const category = await Category.create({name, icon: fileName});
        return res.json(category);
    }

    async getAll(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }

}

module.exports = new CategoryController();
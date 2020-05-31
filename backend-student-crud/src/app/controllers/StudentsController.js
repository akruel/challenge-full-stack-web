const { Student } = require('../models');
const { Op, where, fn, col } = require('sequelize');

class StudentsController {
  static async findAll(req, res, next) {
    const students = await Student.findAndCountAll({
      where: where(fn('lower', col('name')), {
        [Op.like]: `%${req.query.searchByName}%`,
      }),
      offset: req.query.offset,
      limit: req.query.limit,
    });
    res.status(200).send(students);
  }

  static async create(req, res, next) {
    try {
      const student = await Student.create(req.body);
      res.status(201).send(student);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'An error occurred on the server.' });
    }
  }
}

module.exports = StudentsController;

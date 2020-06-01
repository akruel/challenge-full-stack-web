const { Student } = require('../models');
const { Op, where, fn, col } = require('sequelize');

class StudentsController {
  static async create(req, res, next) {
    try {
      const student = await Student.create(req.body);
      res.status(201).send(student);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'An error occurred on the server.' });
    }
  }

  static async read(req, res, next) {
    try {
      const students = await Student.findAndCountAll({
        where: where(fn('lower', col('name')), {
          [Op.like]: `%${req.query.searchByName}%`,
        }),
        offset: req.query.offset,
        limit: req.query.limit,
      });
      res.status(200).send(students);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'An error occurred on the server.' });
    }
  }

  static async update(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student)
        return res.status(404).json({ message: 'Student does not exit.' });

      let upStudent = await Student.update(req.body, {
        where: { id: req.params.id },
      });

      res.status(204).send(upStudent);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'An error occurred on the server.' });
    }
  }

  static async delete(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student)
        return res.status(404).json({ message: 'Student does not exit.' });

      const destroyed = await student.destroy();

      res.status(204).send(destroyed);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'An error occurred on the server.' });
    }
  }

  static async getOne(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student)
        return res.status(404).json({ message: 'Student does not exit.' });

      res.status(200).send(student);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'An error occurred on the server.' });
    }
  }
}

module.exports = StudentsController;

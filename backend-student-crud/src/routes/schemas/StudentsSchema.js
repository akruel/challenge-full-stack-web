const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const RouteValidator = require('./RouteValidator');

class StudentsSchema extends RouteValidator {
  static get create() {
    const schema = {
      body: Joi.object().keys({
        name: Joi.string().trim().empty(),
        email: Joi.string().email().required(),
        cpf: Joi.string().min(11).max(11),
      }),
    };

    return this.validate(schema);
  }

  static get update() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.objectId().required(),
      }),
      body: Joi.object().keys({
        name: Joi.string().trim(),
        email: Joi.string().email(),
        cpf: Joi.string().min(11).max(11),
      }),
    };
    return this.validate(schema);
  }

  // static get delete() {
  //   const schema = {
  //     params: Joi.object().keys({
  //       id: Joi.objectId().required(),
  //     }),
  //   };
  //   return this.validate(schema);
  // }
}

module.exports = StudentsSchema;

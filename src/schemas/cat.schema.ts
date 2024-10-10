import * as Joi from 'joi';

export const createCatSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().integer().positive().required(),
  breed: Joi.string().min(3).required(),
});

export const updateCatSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  age: Joi.number().integer().positive().optional(),
  breed: Joi.string().min(3).optional(),
});

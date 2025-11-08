import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Film from '../models/Film.model'

export const createActor = async (req : Request, resp: Response) => {

    // Validaciones
  await check('title')
  .notEmpty()
  .withMessage('El nombre del film no puede ir vacío')
  .isLength({ max: 128 })
  .withMessage('El título no puede tener más de 128 caracteres')
  .run(req);

await check('description')
  .optional()
  .isString()
  .withMessage('La descripción debe ser texto')
  .run(req);

await check('release_year')
  .optional()
  .isInt({ min: 1900, max: new Date().getFullYear() })
  .withMessage('El año de lanzamiento debe ser un número válido')
  .run(req);

await check('language_id')
  .notEmpty()
  .withMessage('El ID de idioma es obligatorio')
  .isInt({ min: 1 })
  .withMessage('El ID de idioma debe ser un número entero positivo')
  .run(req);

await check('original_language_id')
  .optional()
  .isInt({ min: 1 })
  .withMessage('El ID del idioma original debe ser un número entero positivo')
  .run(req);

await check('rental_duration')
  .notEmpty()
  .withMessage('La duración del alquiler es obligatoria')
  .isInt({ min: 1 })
  .withMessage('La duración del alquiler debe ser un número entero positivo')
  .run(req);

await check('rental_rate')
  .notEmpty()
  .withMessage('La tarifa de alquiler es obligatoria')
  .isFloat({ min: 0 })
  .withMessage('La tarifa de alquiler debe ser un número positivo')
  .run(req);

await check('length')
  .optional()
  .isInt({ min: 1 })
  .withMessage('La duración debe ser un número entero positivo')
  .run(req);

await check('replacement_cost')
  .notEmpty()
  .withMessage('El costo de reemplazo es obligatorio')
  .isFloat({ min: 0 })
  .withMessage('El costo de reemplazo debe ser un número positivo')
  .run(req);

await check('rating')
  .optional()
  .isIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
  .withMessage('El rating debe ser uno de: G, PG, PG-13, R, NC-17')
  .run(req);

await check('special_features')
  .optional()
  .isString()
  .withMessage('Las características especiales deben ser texto')
  .run(req);

await check('last_update')
  .optional()
  .isISO8601()
  .withMessage('La fecha de actualización debe tener un formato válido (ISO 8601)')
  .run(req);


    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return resp.status(400).json({errors: errors.array()})
    }

    const film = await Film.create(req.body)
    resp.json({data: film})
}
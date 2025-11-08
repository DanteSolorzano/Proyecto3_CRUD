import { Request, Response } from 'express'
import { check } from 'express-validator'
import Film from '../models/Film.model'

export const getFilms = async (req: Request, res: Response) => {
   try {
    const film = await Film.findAll()
    res.json({data: film})    
   } catch (error) {
    console.log(error)
   }
}

export const getFilmById = async (req: Request, res: Response) => {

    await check('film_id').isInt({min: 0}).withMessage('ID no valido').run(req);

    try {
            const { id } = req.params
            const film = await Film.findByPk(id)

            if(!film){
                return res.status(404).json({
                    error: 'Pelicula no encontrada'
                })
            }
            res.json({data: film})


        } catch (error) {
     console.log(error)
    }
 }

export const createFilm = async (req : Request, res: Response) => {

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
  .run(req);

await check('original_language_id')
  .optional()
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

    try {
        const film = await Film.create(req.body)
        res.json({data: film})
    } catch (error) {
        console.log(error)
    }   

}

export const updateFilm = async (req: Request, res: Response) => {

    //se valida su exitencia
    const { id } = req.params
    const film = await Film.findByPk(id)

    if(!film){
        return res.status(404).json({
            error: 'Pelicula no encontrada'
        })
    }

    //se actualiza la pelicula
    await film.update(req.body)
    await film.save()

    res.json({data: film})
}

export const deleteFilm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);

    if (!film) {
      return res.status(404).json({
        error: 'Película no encontrada',
      });
    }

    await film.destroy();

    return res.json({
      message: 'Película eliminada correctamente',
    });
  
  } catch (error: any) {
    console.log('Error al eliminar película:');
    console.log('Mensaje:', error.message); // Mensaje general
    console.log('Código SQL:', error.parent?.code); // Código MySQL (por ej. ER_ROW_IS_REFERENCED_2)
    console.log('Mensaje SQL:', error.parent?.sqlMessage); // Mensaje SQL legible
    console.log('Consulta SQL:', error.parent?.sql); // La consulta que Sequelize intentó ejecutar

    return res.status(500).json({
      error: 'Error al eliminar película',
      detalle: error.parent?.sqlMessage || error.message, // Muestra el mensaje SQL real
    });
  }
};

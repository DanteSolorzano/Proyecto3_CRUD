import { Router } from 'express'
import { createFilm, deleteFilm, getFilmById, getFilms, updateFilm } from './handlers/films'
import { handleInputErrors } from './middleware'

const router = Router()
//routing
router.get('/get', getFilms)
router.get('/get/:id',handleInputErrors, getFilmById)

router.post('/', handleInputErrors, createFilm)

router.put('/edit/:id', handleInputErrors, updateFilm)

router.delete('/delete/:id', handleInputErrors, deleteFilm)

export default router

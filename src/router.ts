import { Router } from 'express'

const router = Router()
//routing
router.get('/', (req, resp) => {
    resp.json('Desde GET')   
})

router.post('/', (req, resp) => {
    resp.json('Desde POST')   
})

router.put('/', (req, resp) => {
    resp.json('Desde PUT')   
})

router.patch('/', (req, resp) => {
    resp.json('Desde PATCH')   
})

router.delete('/', (req, resp) => {
    resp.json('Desde DELETE')   
})

export default router

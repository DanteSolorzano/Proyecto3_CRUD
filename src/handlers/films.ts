import { Request, Response } from 'express'

export const createActor = (req : Request, resp: Response) => {

        resp.json('Desde POST')
}
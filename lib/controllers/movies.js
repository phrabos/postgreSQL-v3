const Router = require('express')
const MovieService = require('../services/MovieService')

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const title = req.body.title
      const year = req.body.year
      const img = req.body.img
  
      const data = await MovieService.addMovie(title, year, img)
  
      res.send(data)
    } catch (err) {
      next(err)
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await MovieService.getAllMovies()

      res.send(data)
    } catch (err) {
      next(err)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const data = await MovieService.deleteById(id)
      res.send(data)
      
    } catch (err) {
      next(err)
    }
  })
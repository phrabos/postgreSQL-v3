const Router = require('express')
const MovieService = require('../services/MovieService')
const request = require('superagent');

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
  .get('/search', async (req, res, next) => {
    try {
      const data = await request.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&include_adult=false&include_video=false&page=1&query=${req.query.query}`)

      res.send(data.body)
      
    } catch (err) {
      next(err)
    }
  })
  .get('/:id', async (req, res, next) =>{
    try {
      const id = req.params.id
      const data = await MovieService.getMovieById(id)

      res.send(data)
    } catch (err) {
      next(err)
    }
  })
  .put('/:id', async (req, res, next)=>{
    try{
    const id = req.params.id
    const title = req.body.title
    const year = req.body.year
    const image = req.body.img
    const data = await MovieService.updateMovie(id, title, year, image)

    res.send(data)
    } catch (err){
      next(err)
    }
  })

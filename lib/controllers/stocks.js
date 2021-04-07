const {Router} = require('express');
const Stock = require('../models/Stock');


module.exports = Router()
  .post('/', async (req, res, next)=>{
    try {
      const ticker = req.body.ticker
      const company = req.body.company
      const isETF = req.body.isETF
      const data = await Stock.addStock(ticker, company, isETF)
  
      res.send(data)

    } catch (err) {
      next(err)
    }
  })
  .put('/:id', async (req, res, next)=>{
    try {
      const id = req.params.id
      const ticker = req.body.ticker
      const company = req.body.company
      const isETF = req.body.isETF
      const data = await Stock.update(id, ticker, company, isETF)
      res.send(data)
    } catch (err) {
      next(err)
    }
  })

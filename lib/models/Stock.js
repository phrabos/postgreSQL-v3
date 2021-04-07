const pool = require('../utils/pool');


module.exports = class Stock {
  id;
  ticker;
  company;
  isETF;

  constructor(row){
    this.id = row.id;
    this.ticker = row.ticker;
    this.company = row.company;
    this.isETF = row.is_etf;
  }

  static async addStock(ticker, company, isETF){
    const rows = await pool.query(`
    INSERT INTO stocks (ticker, company, is_etf)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [ticker, company, isETF])
    return new Stock(rows.rows[0])
  }

}
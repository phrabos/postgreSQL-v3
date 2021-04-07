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

  static async update(id, ticker, company, isETF){
    const rows = await pool.query(`
    UPDATE stocks
    SET ticker=$2, company=$3, is_etf=$4
    WHERE id=$1
    RETURNING *
    `, [id, ticker, company, isETF])
    return new Stock(rows.rows[0]);
  }

  static async getOne(id){
    const rows = await pool.query(`
    SELECT * FROM stocks
    WHERE id=$1
    `, [id])
    return new Stock(rows.rows[0]);
  }

  static async getAll(){
    const rows = await pool.query(`
    SELECT * FROM stocks
    `)
    return rows.rows.map(row=> new Stock(row))
  }

  static async delete(id){
    const rows = await pool.query(`
    DELETE from stocks
    WHERE id=$1
    RETURNING *
    `, [id])
    return new Stock(rows.rows[0]);
  }
}
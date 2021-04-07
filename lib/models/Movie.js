const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  year;
  img;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.year = data.year;
    this.img = data.img_url;
  }

  static async insert(title, year, img) {
    const data = await pool.query(
      'INSERT INTO movies (title, year, img_url) VALUES ($1, $2, $3) RETURNING *',
      [title, year, img]
    );
    return new Movie(data.rows[0])
  }

  static async getAll() {
    const data = await pool.query(
      'SELECT * FROM movies'
    )

    return data.rows.map(row=> new Movie(row))

  }

  static async delete(id) {
    const data = await pool.query(
      'DELETE FROM movies WHERE id = $1 RETURNING *',[id]
    )
    return new Movie(data.rows[0])
  }

  static async getOne(id){
    const data = await pool.query(`
    SELECT * FROM movies
    WHERE id=$1
    `, [id])
    return new Movie(data.rows[0]);
  }

  static async update(id, title, year, image){
    const data = await pool.query(`
    UPDATE movies
    SET title=$2, year=$3, img_url=$4
    WHERE id=$1
    RETURNING * 
    `, [id, title, year, image])
    return new Movie(data.rows[0])
  }
};

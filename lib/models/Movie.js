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
};

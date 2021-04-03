const Movie = require('../models/Movie')


module.exports = class MovieService {
  static async addMovie(title, year, img) {
    const serviceData = await Movie.insert(title, year, img)

    return serviceData
  }
}
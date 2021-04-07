const Movie = require('../models/Movie')


module.exports = class MovieService {
  static async addMovie(title, year, img) {
    const serviceData = await Movie.insert(title, year, img)

    return serviceData
  }

  static async getAllMovies() {
    const serviceData = await Movie.getAll()

    return serviceData
  }
  
  static async deleteById(id) {
    const serviceData = await Movie.delete(id)

    return serviceData
  }

  static async getMovieById(id){
    const serviceData = await Movie.getOne(id);

    return serviceData;
  }

  static async updateMovie(id, title, year, image){
    const serviceData = await Movie.update(id, title, year, image);

    return serviceData;
  }
}
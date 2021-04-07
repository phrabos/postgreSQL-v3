const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const MovieService = require('../lib/services/MovieService');
const Stock = require('../lib/models/Stock')

describe('movie routes', () => {
  beforeEach(() => {
    return setup(pool);

  });

  it('adds a movie to db', async () => {
    const data = await request(app)
      .post('/api/v1/movies')
      .send({ title: 'Ready Player One', year: '2018', img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcReCVBdW7CJXDYANByX-l2oPeH3k7wCui_hQm32VNSfSyZAc1DT' })
    
    const res = data.body

    expect(res).toEqual(
      {
        id: expect.any(String),
        title: 'Ready Player One',
        year: '2018',
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcReCVBdW7CJXDYANByX-l2oPeH3k7wCui_hQm32VNSfSyZAc1DT'
      }
    )
  })
  it('gets all movies from database', async () => {
    await MovieService.addMovie('Jurassic Park', '1993', 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg')
    await MovieService.addMovie('The Lost World', '1997', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg')
    const data = await request(app)
      .get('/api/v1/movies')
    
    const res = data.body

    expect(res).toEqual([
      {
        id: expect.any(String),
        title: 'Jurassic Park',
        year: '1993',
        img: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg'
      },
      {
        id: expect.any(String),
        title: 'The Lost World',
        year: '1997',
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg'
      },
    ])
  })
  it('removes a movie from the database', async () => {
    await MovieService.addMovie('Jurassic Park', '1993', 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg')
    await MovieService.addMovie('The Lost World', '1997', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg')
    const data = await request(app)
      .delete('/api/v1/movies/2')
    
    expect(data.body).toEqual(
      {
      id: expect.any(String),
      title: 'The Lost World',
      year: '1997',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg'
      },
    )
  })
  it('gets a movie by id', async () =>{
    await MovieService.addMovie('Jurassic Park', '1993', 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg')
    await MovieService.addMovie('The Lost World', '1997', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg')
    
    const data = await request(app)
    .get('/api/v1/movies/2')

      expect(data.body).toEqual({
        id: expect.any(String),
        title: 'The Lost World',
        year: '1997',
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg'
      },)

  })
  it('updates a movie', async ()=>{
    await MovieService.addMovie('Jurassic Park', '1993', 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg')
    await MovieService.addMovie('The Lost World', '1997', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg')
    const data = await request(app)
    .put('/api/v1/movies/2')
    .send({
      title: 'Jurassic Park: The Lost World',
      year: '1997',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg'
    },)
  expect(data.body).toEqual({
      id: expect.any(String),
      title: 'Jurassic Park: The Lost World',
      year: '1997',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/220px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg'
    },)

  })
});

describe('stock market routes', () => {
  beforeEach(() => {
    return setup(pool);

  });

  it('creates a stock in the database', async ()=>{
    await Stock.addStock('TSLA', 'Tesla', false);
    await Stock.addStock('VTI', 'Vanguard Total Stock Market', true);
    const data = await request(app)
    .post('/api/v1/stocks')
    .send({
      ticker: 'ARKK',
      company: 'ARKK Investments',
      isETF: true,
    })
    expect(data.body).toEqual({
      id: expect.any(String),
      ticker: 'ARKK',
      company: 'ARKK Investments',
      isETF: true,
    })
  })
  it('updates a stock in the database', async ()=>{
    await Stock.addStock('TSLA', 'Tesla', false);
    await Stock.addStock('VTI', 'Vanguard Total Stock Market', true);
    const data = await request(app)
    .put('/api/v1/stocks/2')
    .send({
      ticker: 'VTI-1',
      company: 'Vanguard Total Stock Market',
      isETF: true,
    })
    expect(data.body).toEqual({
      id: expect.any(String),
      ticker: 'VTI-1',
      company: 'Vanguard Total Stock Market',
      isETF: true,
    })
  })
  it('gets a stock by id', async()=>{
    await Stock.addStock('TSLA', 'Tesla', false);
    await Stock.addStock('VTI', 'Vanguard Total Stock Market', true);
    const data = await request(app)
    .get('/api/v1/stocks/2')

    expect(data.body).toEqual({
      id: expect.any(String),
      ticker: 'VTI',
      company: 'Vanguard Total Stock Market',
      isETF: true,
    })
  })
  it('gets all stocks', async ()=>{
    await Stock.addStock('TSLA', 'Tesla', false);
    await Stock.addStock('VTI', 'Vanguard Total Stock Market', true);
    const data = await request(app)
    .get('/api/v1/stocks')

    expect(data.body).toEqual([
      {
        id: expect.any(String),
        ticker: 'TSLA',
        company: 'Tesla',
        isETF: false,
      },
      {
        id: expect.any(String),
        ticker: 'VTI',
        company: 'Vanguard Total Stock Market',
        isETF: true,
    }
  ])
  })
  it('deletes a stock', async ()=>{
    await Stock.addStock('TSLA', 'Tesla', false);
    await Stock.addStock('VTI', 'Vanguard Total Stock Market', true);
    const data = await request(app)
    .delete('/api/v1/stocks/1')

    expect(data.body).toEqual(      {
      id: expect.any(String),
      ticker: 'TSLA',
      company: 'Tesla',
      isETF: false,
    })
  })
})

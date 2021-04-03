const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('vs3-postgreSQL routes', () => {
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
});



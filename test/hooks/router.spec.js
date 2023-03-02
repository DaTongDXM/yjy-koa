const { expect } = require('chai');
const request = require('supertest');
describe('router测试', () => {
  it("/idnex", async () => {
    const { status } = await request('http://127.0.0.1:8888').get('/index')
    expect(status).to.equals(200)
  })
})
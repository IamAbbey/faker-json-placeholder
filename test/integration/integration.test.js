const { describe, test, expect, afterAll } = require('@jest/globals');
const request = require('supertest');
const { app, server, DEFAULT_LIMIT } = require('../../app.js');

describe('integration testing', () => {
  afterAll((done) => {
    server.close(done);
  });

  describe('testing welcome endpoint', () => {
    test('should return welcome object', async () => {
      const response = await request(app).get('/api/welcome');
      expect(response.statusCode).toBe(200);
    });
  });
  describe('testing 500 endpoint', () => {
    test('should return error msg', async () => {
      const response = await request(app).get('/api/test/500');
      expect(response.statusCode).toBe(500);
    });
  });
  describe('testing requesting for limits beyond max limit', () => {
    test('should return error msg', async () => {
      const response = await request(app).get('/api/welcome').query({ limit: 102 });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        msg: expect.any(String)
      });
    });
  });
  describe('testing unknown endpoint', () => {
    test('should return 404 page not found', async () => {
      const response = await request(app).get('/api/unknown');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Route does not exist');
    });
  });
  describe('testing single faker object endpoint with schema', () => {
    test('valid schema: should return status code 200 and a single object', async () => {
      const response = await request(app).get('/api/faker/1').query({ schema: 'todo' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe('1');
    });
    test('invalid schema: should return status code 200 and a empty object', async () => {
      const response = await request(app).get('/api/faker/1').query({ schema: 'invalid' });
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        msg: expect.any(String)
      });
    });
    describe('testing single faker object endpoint with keys', () => {
      test('valid key: should return status code 200 and a single object with requested keys', async () => {
        const response = await request(app).get('/api/faker/1').query({ keys: 'name,age,date__recent' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toEqual({
          name: expect.any(String),
          age: expect.any(Number),
          dateRecent: expect.any(String)
        });
      });
      test('invalid key: should return status code 400 and an error message', async () => {
        const response = await request(app).get('/api/faker/1').query({ keys: 'name,age,date__tomorrow' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toEqual({
          msg: expect.any(String)
        });
      });
    });
  });

  describe('testing multiple faker object endpoint with schema', () => {
    test('valid schema: should return status code 200 and a list of object', async () => {
      const response = await request(app).get('/api/faker').query({ schema: 'todo' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(DEFAULT_LIMIT);
      expect(response.body[0].id).toBe(1);
    });
    test('valid schema with limit: should return status code 200 and a list of 6 object', async () => {
      const response = await request(app).get('/api/faker').query({ schema: 'todo', limit: 6 });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(6);
      expect(response.body[0].id).toBe(1);
    });
    test('invalid schema: should return status code 200 and a empty object', async () => {
      const response = await request(app).get('/api/faker').query({ schema: 'invalid' });
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        msg: expect.any(String)
      });
    });
    describe('testing single faker object endpoint with keys', () => {
      test('valid key: should return status code 200 and a list of object with requested keys', async () => {
        const response = await request(app).get('/api/faker/').query({ keys: 'name,age,date__recent' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveLength(DEFAULT_LIMIT);
        expect(response.body[0]).toEqual({
          name: expect.any(String),
          age: expect.any(Number),
          dateRecent: expect.any(String)
        });
      });
      test('invalid key: should return status code 400 and an error message', async () => {
        const response = await request(app).get('/api/faker/').query({ keys: 'name,age,date__tomorrow' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toEqual({
          msg: expect.any(String)
        });
      });
    });
  });
});

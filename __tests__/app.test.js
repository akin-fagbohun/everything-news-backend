const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const express = require('express');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('sends GET to endpoint -> responds with array', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
  test('sends GET to endpoint -> responds with object with two properties', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        const body = res.body;
        body.forEach(topic => {
          expect(topic).toBeInstanceOf(Object);
          expect(Object.keys(topic).length).toBe(2);
        });
      });
  });
  test('sends GET to endpoint -> checks object properties and values', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        const body = res.body;
        body.forEach(topic => {
          expect(topic).toHaveProperty('description');
          expect(topic).toHaveProperty('slug');
          expect(typeof Object.values(topic)[0]).toBe('string');
          expect(typeof Object.values(topic)[1]).toBe('string');
        });
      });
  });
});
describe('ERROR GET /api/topicd', () => {
  test('sends GET to incorrect endpoint -> returns 404', () => {
    return request(app)
      .get('/api/topicd')
      .expect(404)
  });
});

describe('GET /api/articles/:article_id', () => {
  test('sends GET to ID endpoint -> returns an object', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((res) => {
        const output = res.body;
        expect(output).toBeInstanceOf(Object);
        expect(Object.keys(output).length).toBe(7);
    });   
  });

  test('sends GET to ID endpoint -> checks each object key', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((res) => {
        const output = res.body;
        expect(output).toHaveProperty('author');
        expect(output).toHaveProperty('title');
        expect(output).toHaveProperty('article_id');
        expect(output).toHaveProperty('body');
        expect(output).toHaveProperty('topic');
        expect(output).toHaveProperty('created_at');
        expect(output).toHaveProperty('votes');
      });   
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test('sends PATCH to ID endpoint -> checks each object key', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes : 1 })
      .expect(201)
      .then((res) => {
        const output = res.body;
        expect(output).toBeInstanceOf(Object);
        expect(Object.keys(output).length).toBe(7);
      });
  });
  test('sends PATCH to ID endpoint -> checks each object key', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes : 1 })
      .expect(201)
      .then((res) => {
        const output = res.body;
        expect(output).toHaveProperty('author');
        expect(output).toHaveProperty('title');
        expect(output).toHaveProperty('article_id');
        expect(output).toHaveProperty('body');
        expect(output).toHaveProperty('topic');
        expect(output).toHaveProperty('created_at');
        expect(output).toHaveProperty('votes');
      });
  });
  test('sends PATCH to ID endpoint -> tests article_id value on row object', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes : 1 })
      .expect(201)
      .then((res) => {
        const output = res.body.article_id;
        expect(output).toBe(1);
      });   
  });
  test('sends PATCH to ID endpoint -> tests positive upvote', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes : 1 })
      .expect(201)
      .then((res) => {
        const output = res.body.votes;
        expect(output).toBe(101);
      });   
  });
  test('sends PATCH to ID endpoint -> tests negative downvote', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes : -99 })
      .expect(201)
      .then((res) => {
        const output = res.body.votes;
        expect(output).toBe(1);
      });   
  });


});

describe('GET /api/users', () => {
  test('sends GET to endpoint -> responds with array', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
  test('sends GET to endpoint -> responds with object with two properties', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        const body = res.body;
        body.forEach(user => {
          expect(user).toBeInstanceOf(Object);
          expect(Object.keys(user).length).toBe(3);
        });
      });
  });

  test('sends GET to endpoint -> checks object properties and values', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        const body = res.body;
        body.forEach(topic => {
          expect(topic).toHaveProperty('username');
          expect(topic).toHaveProperty('name');
          expect(topic).toHaveProperty('avatar_url');
          expect(typeof Object.values(topic)[0]).toBe('string');
          expect(typeof Object.values(topic)[1]).toBe('string');
          expect(typeof Object.values(topic)[2]).toBe('string');
        });
      });
  });
})


const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const express = require('express');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('sends GET to topics endpoint -> checks for Array and elements', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        const { body } = res;
        // checks object type
        expect(body).toBeInstanceOf(Array);
        // checks each element on array 
        body.forEach(topic => {
          // checks element type and confirms keys and value types
          expect(topic).toBeInstanceOf(Object);
          expect(Object.keys(topic).length).toBe(2);
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
  test('sends GET to article ID endpoint -> checks for object and keys', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((res) => {
        const { body } = res;
        // checks object type and number of keys
        expect(body).toBeInstanceOf(Object);
        expect(Object.keys(body).length).toBe(8);
        // checks object for object keys
        expect(body).toHaveProperty('author');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('article_id');
        expect(body).toHaveProperty('body');
        expect(body).toHaveProperty('topic');
        expect(body).toHaveProperty('created_at');
        expect(body).toHaveProperty('votes');
        expect(body).toHaveProperty('comment_count');
      });   
  });

  test('sends GET to article ID endpoint -> checks object response at ID', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((res) => {
        // checks article ID object. 
          // Note .toMatchObject allows for omission of 'created_at' key
        const output = {
          comment_count: '11',
          article_id: 1,
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          votes: 100
        };
        expect(res.body).toMatchObject(output);
      });   
  });

  test('GET ERR -> sends request to non-existent article ID', () => {
    return request(app)
      .get('/api/articles/997')
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ msg: 'Not Found' });
      });   
  });

  test('GET ERR -> sends request with invalid article ID', () => {
    return request(app)
      .get('/api/articles/notValidID')
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ msg: 'Bad request.' });
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
        const { body } = res;
        // checks response type and number of keys on object
        expect(body).toBeInstanceOf(Object);
        expect(Object.keys(body).length).toBe(7);
        // checks object contains required keys
        expect(body).toHaveProperty('author');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('article_id');
        expect(body).toHaveProperty('body');
        expect(body).toHaveProperty('topic');
        expect(body).toHaveProperty('created_at');
        expect(body).toHaveProperty('votes');
        // checks article ID is correct
        expect(body.article_id).toBe(1);
        // checks upvote by +1 applies
        expect(body.votes).toBe(101);
      });
  });

  test('sends PATCH to ID endpoint -> tests negative downvote', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes : -99 })
      .expect(201)
      .then((res) => {
        const { body } = res;
        // checks downvote by -99 applies
        expect(body.votes).toBe(1);
      });   
  });

  test('GET ERR -> sends PATCH to ID endpoint -> tests missing body', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ msg: 'Bad Request' });
      });   
  });

  test('GET ERR -> sends PATCH to ID endpoint -> tests incorrect value type.', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes : '-99' })
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ msg: 'Bad Request' });
      });   
  });


});

describe('GET /api/users', () => {
  test('sends GET to users endpoint -> responds with array', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((res) => {
        const { body } = res;
        // checks response value type
        expect(body).toBeInstanceOf(Array);
        // checks each element of array response    
        body.forEach(user => {
          // checks each element's objects and keys
          expect(user).toBeInstanceOf(Object);user
          expect(Object.keys(user).length).toBe(3);
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('avatar_url');
          expect(typeof Object.values(user)[0]).toBe('string');
          expect(typeof Object.values(user)[1]).toBe('string');
          expect(typeof Object.values(user)[2]).toBe('string');
        });
      });
  });
})

describe('GET /api/articles', () => {
  test('sends GET to articles endpoint -> responds with array -> checks elements', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).toBeInstanceOf(Array);
        body.forEach(article => {
          expect(article).toBeInstanceOf(Object);
          expect(Object.keys(article).length).toBe(7);
          expect(article).toHaveProperty('article_id');
          expect(article).toHaveProperty('author');
          expect(article).toHaveProperty('body');
          expect(article).toHaveProperty('created_at');
          expect(article).toHaveProperty('title');
          expect(article).toHaveProperty('topic');
          expect(article).toHaveProperty('votes');
        });
      });
  });
});

describe('GET /api/articles/:article_id/comments', () => {
  test('sends GET to articleID/comments endpoint -> checks response', () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then((res) => {
      const output = res.body;
      expect(output).toBeInstanceOf(Array);
      expect(Object.keys(output).length).toBe(11);
      output.forEach(comment => {
        expect(comment).toHaveProperty('comment_id');
        expect(comment).toHaveProperty('votes');
        expect(comment).toHaveProperty('created_at');
        expect(comment).toHaveProperty('body');
        expect(comment).toHaveProperty('author');
      });
    });  
  });   
  
  test('GET ERR -> sends request to non-existent articleID/comments endpoint -> checks response', () => {
    return request(app)
      .get('/api/articles/997/comments')
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ msg: 'Not Found' });
      });   
  });

});


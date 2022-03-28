const app = require('../index');
const request = require('supertest');
const db = require('../db/connection');
const express = require('express');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test('sends GET to endpoint -> responds with object with two properties', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body[0]).toMatchObject({
          description: 'The man, the Mitch, the legend',
          slug: 'mitch'
        });
      });
  });
  test('sends GET to endpoint -> responds with array with two properties', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        const arr = [
          {
            description: 'The man, the Mitch, the legend',
            slug: 'mitch'
          },
          {
            description: 'Not dogs',
            slug: 'cats'
          },
          {
            description: 'what books are made of',
            slug: 'paper'
          }
        ];
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toMatchObject(arr);
      });
  });
});



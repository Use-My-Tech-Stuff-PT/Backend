const request = require('supertest');
const express = require('express');
const server = require('../server.js');
const db = require('../data/dbconfig.js');

require('dotenv').config();

describe('item enpoints', () => {
    const OLD_ENV = process.env;
    beforeEach(async () => {
        await db('users').truncate();
        jest.resetModules();
        process.env = {...OLD_ENV};
        delete process.env.NODE_ENV;
    });

    describe('registeration', () => {
        it('should give back the created user name', () => {
            return request(server)
              .post('/api/users/register')
              .send({
                  username: 'JC Test',
                  password: 'test',
                  role: 'Owner'
              })
              .then((res) => {
                  expect(res.status).toBe(201);
              });
        });
    })

    describe('login', () => {
        let data = {
            username: 'JC Test',
            password: 'test',
            role: 'Owner'
        };
        it('should give back the user name', () => {
            return request(server).post('/api/users/register').send({
                username: 'JC test',
                password: 'test',
                role: 'Owner'
            });
            return request(server)
              .post('/api/users/login')
              .set('Accept', 'application/json')
              .send(data)
              .then((res) => {
                  expect(res.body.message).toBe(`Welcome JC Test`)
              });            
        });
        it('should return token on login', () => {
            let token;
            return request(server).post('/api/users/register').send({
                username: 'JC test',
                password: 'test'
            });
            return request(server)
              .post('/api/users/login')
              .send({
                  username: 'JC test',
                  password: 'test'
              })
              .then((res) => expect(res.body).arrayContaining(token));
        });
    });
})
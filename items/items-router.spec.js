const request = require('supertest');
const express = require('express');

const server = require('../server.js');
const db = require('../data/dbconfig.js');

require('dotenv').config();

const Items = require('./items-model.js');

describe('items endpoints', () => {
    const OLD_ENV = process.env;
    beforeEach(async () => {
        await db('users').truncate();
        jest.resetModules();
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;
    });
    describe('items', () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).get('/api/items')
        });

        it('should return status 200', () => {
            expect(res.status).toBe(200);
        })
    });
})
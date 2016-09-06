'use strict';
process.env.NODE_ENV = 'test';
//=============================================================================
/**
 * module dependencies
 */
//=============================================================================
const
    should = require('chai').should(),
    server = require('../server');
let request = require('supertest');
//=============================================================================
/**
 * setup superagent
 */
//=============================================================================
request = request(server);
//=============================================================================
/**
 * test base base app works
 */
//=============================================================================
describe('Confirm base app is up and responds to test route', () => {
    describe('GET /test', () => {
        it('should return 200 status and json string with value ok', done => {
            request.
                get('/test').
                expect(200).
                end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    res.body.should.equal('ok');
                    res.header['content-type'].should.include('application/json');
                    return done();
                });
        });
    });
});
//=============================================================================

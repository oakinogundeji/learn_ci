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
 * configuration
 */
//=============================================================================
request = request(server);
const
    msg = 'This is a test',
    recipient = 'teliosng@gmail.com';
//=============================================================================
/**
 * test base base app works
 */
//=============================================================================
describe('Confirm base app is up and responds to test route', function () {
    describe('GET /test', function () {
        it('should return 200 status and json string with value ok', function (done) {
            request.
                get('/test').
                expect(200).
                end(function (err, res) {
                    if(err) {
                        return done(err);
                    }
                    else {
                        res.body.should.equal('ok');
                        res.header['content-type'].should.include('application/json');
                        return done();
                    }
                });
        });
    });
    describe('POST /send', function () {
        this.timeout(10000);
        it('should return 200 status and json string with value success', function (done) {
            request.
                post('/send').
                send({
                    msg: msg,
                    recipient: recipient
                }).
                expect(200).
                end(function (err, res) {
                    if(err) {
                        console.error(err);
                        return done(err);
                    }
                    else {
                        res.body.should.equal('success');
                        res.header['content-type'].should.include('application/json');
                        return done();
                    }
                });

        });
    });
    describe('GET /read', function () {
        this.timeout(10000);
        it('should return 200 status and json string with value containing Message count', function (done) {
            request.
                get('/read').
                expect(200).
                end(function (err, res) {
                    if(err) {
                        console.error(err);
                        return done(err);
                    }
                    else {
                        res.body.should.include('Message count');
                        res.header['content-type'].should.include('application/json');
                        return done();
                    }
                });
        });
    });
});
//=============================================================================

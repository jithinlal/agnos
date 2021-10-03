import faker from 'faker';
import Express from 'express';
import request from 'supertest';
import 'jest-extended';
import App from '~/app';
import { TOKEN } from '~/.jest/Constants';

import AdminRoute from '~/routes/admin.route';

let server: Express.Application;
let url = '/admin';
let app: App;

beforeAll(async () => {
	app = new App([new AdminRoute()]);
	server = app.getServer();
});

afterAll((done) => {
	app.disconnect();
	done();
});

let foodTypeName = faker.lorem.word();
let foodTypeId: string = '';
describe('POST /food-type', () => {
	it('should create a food item type', (done) => {
		request(server)
			.post(`${url}/food-type`)
			.set({
				Authorization: `Bearer ${TOKEN}`,
			})
			.send({
				name: foodTypeName,
			})
			.expect(201)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.data).toContainAnyKeys(['_id', 'name']);
				foodTypeId = res.body.data._id;
				done();
			});
	});
});

describe('DELETE /food-type/:id', () => {
	it('should delete a food item type', (done) => {
		request(server)
			.delete(`${url}/food-type/${foodTypeId}`)
			.set({
				Authorization: `Bearer ${TOKEN}`,
			})
			.expect(200)
			.end(function (err) {
				if (err) return done(err);
				done();
			});
	});
});

let tax = faker.datatype.number();
let taxId: string = '';
describe('POST /tax', () => {
	it('should create a tax type', (done) => {
		request(server)
			.post(`${url}/tax`)
			.set({
				Authorization: `Bearer ${TOKEN}`,
			})
			.send({
				name: foodTypeName,
				tax,
			})
			.expect(201)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.data).toContainAnyKeys(['name', 'tax']);
				taxId = res.body.data._id;
				done();
			});
	});
});

describe('GET /tax', () => {
	it('should return an array of taxes', (done) => {
		request(server)
			.get(`${url}/tax`)
			.set({
				Authorization: `Bearer ${TOKEN}`,
			})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				if (res.body.data.length === 0) {
					expect(res.body.data).toBeArray();
				} else {
					expect(res.body.data[0]).toBeObject();
					expect(res.body.data[0]).toContainAnyKeys(['tax']);
				}
				done();
			});
	});
});

describe('DELETE /tax/:id', () => {
	it('should delete a tax type', (done) => {
		request(server)
			.delete(`${url}/tax/${taxId}`)
			.set({
				Authorization: `Bearer ${TOKEN}`,
			})
			.expect(200)
			.end(function (err) {
				if (err) return done(err);
				done();
			});
	});
});

let itemName = faker.lorem.word();
let itemPrice = faker.datatype.number();
let itemId: string = '';
describe('POST /item', () => {
	it('should create a item', (done) => {
		request(server)
			.post(`${url}/item`)
			.set({
				Authorization: `Bearer ${TOKEN}`,
			})
			.send({
				name: itemName,
				price: itemPrice,
				foodType: foodTypeId, // foodTypeId is kept as the deleted one in this test, but any previous food type id will do the trick
				tax: taxId, // same as above
			})
			.expect(201)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.data).toContainAnyKeys(['name', 'price']);
				itemId = res.body.data._id;
				done();
			});
	});
});

describe('DELETE /item/:id', () => {
	it('should delete a item', (done) => {
		request(server)
			.delete(`${url}/tax/${itemId}`)
			.set({
				Authorization: `Bearer ${TOKEN}`,
			})
			.expect(200)
			.end(function (err) {
				if (err) return done(err);
				done();
			});
	});
});

import Express from 'express';
import request from 'supertest';
import 'jest-extended';
import App from '~/app';
import ItemRoute from '~/routes/item.route';

let server: Express.Application;
let url = '/item';

let app: App;
beforeAll(async () => {
	app = new App([new ItemRoute()]);
	server = app.getServer();
});

afterAll((done) => {
	app.disconnect();
	done();
});

describe('GET /item', () => {
	it('should return an array of items', (done) => {
		request(server)
			.get(`${url}`)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				if (res.body.data.docs.length === 0) {
					expect(res.body.data.docs).toBeArray();
				} else {
					expect(res.body.data.docs[0]).toBeObject();
					expect(res.body.data.docs[0]).toContainAnyKeys(['price']);
				}
				done();
			});
	});
});

/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

import '@testing-library/jest-dom';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { apiMock } from './data/apiMock';
import { setupStore } from './store/store';
import apiResult from './store/createApiResult';

expect.extend(matchers);

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const handlers = [
  http.get('/pages/:page', () => HttpResponse.json(apiMock)),
];
// const server = setupServer(
//     rest.get("https://api.pwnedpasswords.com/range/:range", (req, res, ctx) => {
//       return res(ctx.status(200), ctx.text(""));
//     }),
//   );
export const server = setupServer(...handlers);

const store = setupStore({});

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiResult.util.resetApiState());
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

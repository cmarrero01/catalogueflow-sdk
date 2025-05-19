import test from 'node:test';
import assert from 'node:assert/strict';

test('createApiClient throws when keys missing', async () => {
  const { createApiClient } = await import(`../dist/api/client.js?nocache=${Math.random()}`);
  assert.throws(() => createApiClient('url', '', ''), /required/);
});

test('createApiClient calls axios.create with correct headers', async (t) => {
  const axiosMock = { create: (cfg) => ({ cfg }) };
  await t.mock.module('axios', { defaultExport: axiosMock, cache: false });
  const { createApiClient } = await import(`../dist/api/client.js?nocache=${Math.random()}`);
  const client = createApiClient('base', 'app', 'secret');
  assert.deepStrictEqual(client.cfg.baseURL, 'base');
  assert.equal(client.cfg.headers['x-app-key'], 'app');
  assert.equal(client.cfg.headers['x-secret-key'], 'secret');
});

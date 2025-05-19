import test from 'node:test';
import assert from 'node:assert/strict';

// Use module mocks for axios and child modules

test('CatalogueFlow initializes modules', async (t) => {
  const axiosMock = { create: () => ({}) };
  await t.mock.module('axios', { defaultExport: axiosMock, cache: false });

  const { CatalogueFlow } = await import(`../dist/index.js?nocache=${Math.random()}`);
  const client = new CatalogueFlow({ appKey:'a', secretKey:'b' });
  assert(client.seo, 'seo module');
  assert(client.content, 'content module');
});

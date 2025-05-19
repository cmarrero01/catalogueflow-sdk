import test from 'node:test';
import assert from 'node:assert/strict';
import { ContentModule } from '../dist/modules/content.js';

function createClient() {
  const calls = [];
  return {
    calls,
    client: {
      post: async (endpoint, data) => {
        calls.push({ endpoint, data });
        return { data: 'ok' };
      }
    }
  };
}

test('richDescriptionFullProduct requires format', async () => {
  const { client } = createClient();
  const mod = new ContentModule(client);
  await assert.rejects(() => mod.richDescriptionFullProduct({}), /format/);
});

test('richDescriptionFullProduct sends request', async () => {
  const { client, calls } = createClient();
  const mod = new ContentModule(client);
  const payload = { format: 'x' };
  const res = await mod.richDescriptionFullProduct(payload);
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/content/description', data: payload });
});

test('plainDescriptionFullProduct sends request', async () => {
  const { client, calls } = createClient();
  const mod = new ContentModule(client);
  const payload = { foo: 1 };
  const res = await mod.plainDescriptionFullProduct(payload);
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/content/plain-description', data: payload });
});

test('generateImage sends request', async () => {
  const { client, calls } = createClient();
  const mod = new ContentModule(client);
  const payload = { foo: 2 };
  const res = await mod.generateImage(payload);
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/content/image', data: payload });
});

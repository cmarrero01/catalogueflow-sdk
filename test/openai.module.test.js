import test from 'node:test';
import assert from 'node:assert/strict';
import { OpenAiModule } from '../dist/modules/openai.js';

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

test('chatCompletition requires format', async () => {
  const { client } = createClient();
  const mod = new OpenAiModule(client);
  await assert.rejects(() => mod.chatCompletition({}), /format/);
});

test('chatCompletition sends request', async () => {
  const { client, calls } = createClient();
  const mod = new OpenAiModule(client);
  const payload = { format: 'f' };
  const res = await mod.chatCompletition(payload);
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/content/description', data: payload });
});

test('plainDescriptionFullProduct sends request', async () => {
  const { client, calls } = createClient();
  const mod = new OpenAiModule(client);
  const payload = { foo: 1 };
  const res = await mod.plainDescriptionFullProduct(payload);
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/content/plain-description', data: payload });
});

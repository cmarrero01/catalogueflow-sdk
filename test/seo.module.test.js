import test from 'node:test';
import assert from 'node:assert/strict';
import { SeoModule } from '../dist/modules/seo.js';

function createClient(streamData) {
  const calls = [];
  return {
    calls,
    client: {
      post: async (endpoint, data, opts) => {
        calls.push({ endpoint, data, opts });
        if (opts && opts.responseType === 'stream') {
          return { data: (async function*(){ for (const c of streamData) yield c; })() };
        }
        return { data: 'ok' };
      }
    }
  };
}

test('metaTitle sends request', async () => {
  const { client, calls } = createClient();
  const mod = new SeoModule(client);
  const product = { n:1 };
  const res = await mod.metaTitle(product);
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/seo/meta-title', data: { product, stream:false }, opts: undefined });
});

test('metaDescription sends request', async () => {
  const { client, calls } = createClient();
  const mod = new SeoModule(client);
  const product = { n:1 };
  await mod.metaDescription(product);
  assert.deepStrictEqual(calls[0], { endpoint: '/seo/meta-description', data: { product, stream:false }, opts: undefined });
});

test('richDescription requires format', async () => {
  const { client } = createClient();
  const mod = new SeoModule(client);
  await assert.rejects(() => mod.richDescription({}, ''), /format/);
});

test('richDescription sends request', async () => {
  const { client, calls } = createClient();
  const mod = new SeoModule(client);
  const product = { n:2 };
  const res = await mod.richDescription(product, 'f');
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/seo/rich-description', data: { product, format:'f', stream:false }, opts: undefined });
});

test('imageDescription validates imageUrl', async () => {
  const { client } = createClient();
  const mod = new SeoModule(client);
  await assert.rejects(() => mod.imageDescription({}), /imageUrl/);
});

test('imageDescription normal request', async () => {
  const { client, calls } = createClient();
  const mod = new SeoModule(client);
  const product = { imageUrl: 'u' };
  const res = await mod.imageDescription(product);
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/seo/image-description', data: { product, stream:false }, opts: undefined });
});

test('imageDescription streaming request', async () => {
  const { client, calls } = createClient(['a','b']);
  const mod = new SeoModule(client);
  const product = { imageUrl: 'u' };
  const res = await mod.imageDescription(product, true);
  assert.equal(res, 'ab');
  assert.deepStrictEqual(calls[0], { endpoint: '/seo/image-description', data: { product, stream:true }, opts: { responseType: 'stream' } });
});

test('translateContent validates inputs', async () => {
  const { client } = createClient();
  const mod = new SeoModule(client);
  await assert.rejects(() => mod.translateContent(null, 'es'), /product/);
  await assert.rejects(() => mod.translateContent({}, 5), /language/);
});

test('translateContent sends request', async () => {
  const { client, calls } = createClient();
  const mod = new SeoModule(client);
  const product = { n:3 };
  const res = await mod.translateContent(product, 'es');
  assert.equal(res, 'ok');
  assert.deepStrictEqual(calls[0], { endpoint: '/seo/translate', data: { product, language:'es', stream:false }, opts: undefined });
});

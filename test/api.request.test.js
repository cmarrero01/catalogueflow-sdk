import test from 'node:test';
import assert from 'node:assert/strict';

// import the functions from dist
import { _request, _streamRequest } from '../dist/api/request.js';

// helper function to create async iterable
function createAsyncIterable(chunks) {
  return {
    async *[Symbol.asyncIterator]() {
      for (const c of chunks) yield c;
    }
  };
}

test('request returns response data', async () => {
  const client = { post: async () => ({ data: { ok: true } }) };
  const result = await _request(client, '/x', { a: 1 });
  assert.deepStrictEqual(result, { ok: true });
});

test('request throws wrapped error', async () => {
  const error = { response: { data: 'bad' } };
  const client = { post: async () => { throw error; } };
  await assert.rejects(_request(client, '/x', {}), /bad/);
});

test('streamRequest concatenates chunks', async () => {
  const stream = createAsyncIterable(['a', 'b']);
  const client = { post: async () => ({ data: stream }) };
  const result = await _streamRequest(client, '/y', {});
  assert.equal(result, 'ab');
});

test('streamRequest throws wrapped error', async () => {
  const error = { response: { data: 'nope' } };
  const client = { post: async () => { throw error; } };
  await assert.rejects(_streamRequest(client, '/y', {}), /nope/);
});

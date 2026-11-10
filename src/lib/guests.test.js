import test from 'node:test';
import assert from 'node:assert/strict';
import { lookupGuest } from './guests.js';
const guests = [
  { name: '王小明', tableNumber: 3, partySize: 2 },
  { name: 'Amy', tableNumber: 5, partySize: 1 },
  { name: '同名', tableNumber: 1, partySize: 1 },
  { name: '同名', tableNumber: 2, partySize: 2 },
];
test('finds the complete name, ignoring whitespace and full-width differences', () => {
  assert.deepEqual(lookupGuest(guests, ' 王 小明 ').guest, guests[0]);
  assert.deepEqual(lookupGuest(guests, 'Ａｍｙ').guest, guests[1]);
});
test('does not disclose a result for missing, partial, invalid or duplicate names', () => {
  for (const name of ['', '　 ', null, 'x'.repeat(81), '王小', '不存在', '同名']) {
    const result = lookupGuest(guests, name);
    assert.equal(result.guest, undefined);
    assert.ok(result.message);
  }
});

test('accepts input containing the stored name, but not the reverse', () => {
  const list = [{ name: '小明', tableNumber: 3, partySize: 2 }];
  assert.deepEqual(lookupGuest(list, '王小明').guest, list[0]);
  assert.deepEqual(lookupGuest(list, ' 王 小 明 ').guest, list[0]);
  assert.deepEqual(lookupGuest(list, '小明').guest, list[0]);
  assert.equal(lookupGuest(list, '小').guest, undefined);
});
test('rejects ambiguous substring matches and ignores blank stored names', () => {
  const list = [{ name: '小明' }, { name: '王小明' }];
  assert.equal(lookupGuest(list, '王小明一家').guest, undefined);
  assert.ok(lookupGuest(list, '王小明一家').message);
  assert.equal(lookupGuest([{ name: '　 ' }], '王小明').guest, undefined);
});

test('prefers an exact name when another guest name is contained in it', () => {
  const list = [{ name: '弟弟', tableNumber: '主桌', partySize: 1 }, { name: '弟弟女友', tableNumber: '主桌', partySize: 1 }];
  assert.deepEqual(lookupGuest(list, '弟弟女友').guest, list[1]);
});

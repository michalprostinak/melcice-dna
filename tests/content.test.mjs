import test from 'node:test';
import assert from 'node:assert/strict';
import { eventTime } from '../src/lib/util.js';
import { validateContent } from '../src/data/validate.js';
import { EVENTS, MEMBERS } from '../src/data/site.js';

const iso = (d, t) => new Date(eventTime(d, t)).toISOString();

test('letný čas (CEST, UTC+2)', () => {
  assert.equal(iso('2026-10-02', '13:20'), '2026-10-02T11:20:00.000Z');
  assert.equal(iso('2026-07-15', '08:00'), '2026-07-15T06:00:00.000Z');
});

test('zimný čas (CET, UTC+1)', () => {
  assert.equal(iso('2026-12-01', '13:20'), '2026-12-01T12:20:00.000Z');
  assert.equal(iso('2027-01-20', '00:00'), '2027-01-19T23:00:00.000Z');
});

test('prechody na letný/zimný čas', () => {
  assert.equal(iso('2026-03-29', '01:30'), '2026-03-29T00:30:00.000Z'); // pred zmenou
  assert.equal(iso('2026-03-29', '12:00'), '2026-03-29T10:00:00.000Z'); // po zmene
  assert.equal(iso('2026-10-25', '12:00'), '2026-10-25T11:00:00.000Z'); // po návrate na CET
});

test('obsah v site.js je platný', () => {
  assert.deepEqual(validateContent({ EVENTS, MEMBERS }), []);
});

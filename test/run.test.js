import getRandomNumber,{combinations } from '../service/calc.js'

test('getRandomNumber returns an array of 3 distinct integers between 1 and 10 in ascending order', () => {
  const combo = getRandomNumber()
  expect(Array.isArray(combo)).toBe(true)
  expect(combo).toHaveLength(3)

  combo.forEach(n => {
    expect(Number.isInteger(n)).toBe(true)
    expect(n).toBeGreaterThanOrEqual(1)
    expect(n).toBeLessThanOrEqual(10)
  })

  expect(combo[0] < combo[1]).toBe(true)
  expect(combo[1] < combo[2]).toBe(true)

  const unique = new Set(combo)
  expect(unique.size).toBe(3)
})

test('combinations contains 120 unique combinations', () => {
  expect(Array.isArray(combinations)).toBe(true)
  expect(combinations).toHaveLength(120)

  const seen = new Set(combinations.map(c => JSON.stringify(c)))
  expect(seen.size).toBe(120)
})

test('multiple calls to getRandomNumber produce more than one unique combination (sanity)', () => {
  const seen = new Set()
  for (let i = 0; i < 100; i++) {
    seen.add(JSON.stringify(getRandomNumber()))
  }
  expect(seen.size).toBeGreaterThan(1)
})
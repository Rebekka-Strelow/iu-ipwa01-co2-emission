const path = require('path');
jest.mock('../../data/data.json', () => ({
  data: [
    { land: 'Germany', unternehmen: 'Company A' },
    { land: 'Germany', unternehmen: 'Company B' },
    { land: 'France', unternehmen: 'Company A' }
  ]
}), { virtual: true });

const repository = require('./../repository/repository.js');

describe('Repository Unittests', () => {
  beforeEach(() => {
    repository.resetData();
    repository.resetFilters();
  });

  test('getJSONData should return an array of data', () => {
    const data = repository.getJSONData();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(3);
    expect(data[0].land).toBe('Germany');
  });

  test('getCountryFilters should return unique country names', () => {
    const filters = repository.getCountryFilters();
    expect(filters).toContain('Germany');
    expect(filters).toContain('France');
    expect(filters.length).toBe(2);
  });
});

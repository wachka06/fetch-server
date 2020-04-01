const { locationToCoordinates } = require('../index');

describe('geocoding', () => {
  describe('locationToCoordinates', () => {
    it('should get coordinates from location object', () => {
      const coordinates = locationToCoordinates({
        streetNumber: '925',
        street: 'Cherry Street',
        city: 'Seattle',
        state: 'WA',
        zipcode: '98104',
      });
      expect(coordinates).toBeDefined();
    });
    it('should still work even with missing fields', () => {
      const location = {
        streetNumber: '925',
        street: 'Cherry Street',
        city: 'Seattle',
        state: 'WA',
        zipcode: '98104',
      };
      Object.keys(location).forEach((key) => {
        const testCase = { ...location };
        delete testCase[key];
        const coordinates = locationToCoordinates(testCase);
        expect(coordinates).toBeDefined();
      });
    });
  });
});

const { convertDate } = require('../convertDate');

describe('convertDate', () => {
  it('should convert date to Indonesian formatted string', () => {
    // Arrange
    const date = '2023-06-03T09:30:00.000Z';

    // Act
    const result = convertDate(date);

    // Assert
    expect(result).toBe('Sabtu, 3 Juni 2023');
  });
});
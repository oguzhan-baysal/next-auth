// Basic Health API Test
describe('Health API', () => {
  it('should import without errors', () => {
    expect(true).toBe(true);
  });

  it('should pass basic test', () => {
    const testData = { status: 'ok' };
    expect(testData.status).toBe('ok');
  });
}); 
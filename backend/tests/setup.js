// Jest setup file for backend tests
process.env.NODE_ENV = 'test';
process.env.PORT = 3001;

// Mock the database connection for tests
jest.mock('../src/infrastructure/database/mysqlConnection', () => {
  const mockPool = {
    execute: jest.fn().mockResolvedValue([[], []]),
    getConnection: jest.fn().mockResolvedValue({
      release: jest.fn(),
      query: jest.fn().mockResolvedValue([[], []])
    })
  };
  
  return {
    connect: jest.fn().mockResolvedValue(mockPool),
    getPool: jest.fn().mockReturnValue(mockPool),
    close: jest.fn().mockResolvedValue()
  };
});

// Increase timeout for tests
jest.setTimeout(30000);

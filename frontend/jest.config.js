module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)',  // 👈 Bắt buộc để Jest transform axios
    ],
    moduleFileExtensions: ['js', 'jsx'],
  };
  
module.exports = {
  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

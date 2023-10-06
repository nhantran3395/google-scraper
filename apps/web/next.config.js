module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/uploads",
        permanent: true,
      },
    ];
  },
};

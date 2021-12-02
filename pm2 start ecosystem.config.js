module.exports = {
  apps: [
    {
      name: "myapp",
      script: "./myapp.js",
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 80,
        NODE_ENV: "production",
      },
    },
  ],
};

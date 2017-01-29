module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: "Trials Statistic Dashboard",
    script: "./dist/server.js",
    watch: ['public', 'dist'],
    env: {
      NODE_ENV: "production"
    },
    env_production: {
      NODE_ENV: "production"
    },
    instances: "max",
    exec_mode: "cluster"
  }]
}
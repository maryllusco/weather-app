const fs = require('fs');
const path = require('path');
const appJson = require('./app.json');

function loadEnv() {
  const envPath = path.resolve(__dirname, '.env');
  const env = {};

  if (!fs.existsSync(envPath)) {
    return env;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([^#][^=]+?)\s*=\s*(.*)$/);
    if (match) {
      env[match[1]] = match[2];
    }
  }

  return env;
}

const env = loadEnv();

module.exports = () => ({
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      ...appJson.expo.extra,
EXPO_PUBLIC_OPENWEATHER_API_KEY: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY ?? env.EXPO_PUBLIC_OPENWEATHER_API_KEY ?? '',    },
  },
});

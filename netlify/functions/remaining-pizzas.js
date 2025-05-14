const fs   = require('fs');
const path = require('path');
const MAX  = 20;

exports.handler = async () => {
  const file  = path.join(__dirname, 'remaining.json');
  let data     = JSON.parse(fs.readFileSync(file));
  const today  = new Date().toISOString().slice(0,10);

  if (data.lastReset !== today) {
    data.remaining = MAX;
    data.lastReset = today;
    fs.writeFileSync(file, JSON.stringify(data));
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ remaining: data.remaining })
  };
};

const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, 'remaining.json');

exports.handler = async (event) => {
  const { quantity } = JSON.parse(event.body);
  let data           = JSON.parse(fs.readFileSync(file));

  if (quantity > data.remaining) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Not enough pizzas remaining.' }) };
  }

  data.remaining -= quantity;
  fs.writeFileSync(file, JSON.stringify(data));

  return { statusCode: 200, body: JSON.stringify({ success: true, remaining: data.remaining }) };
};

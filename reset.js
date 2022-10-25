const fs = require('fs');
if (fs.existsSync('./dist/index.html')) {
  fs.unlinkSync('./dist/index.html');
  console.log('/dist/ folder reset!');
}
const fs = require('fs');

function deleteImgFile(filename) {
  const filePath = `./public/images/${filename}`;
  fs.access(filePath, (err) => {
    if (!err) {
      fs.unlink(filePath, (error) => {
        console.log(error);
      });
    } else {
      console.log(err);
    }
  });
}

module.exports = { deleteImgFile };

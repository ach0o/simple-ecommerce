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

function createMenuFile(menuList) {
  let content = '';
  for (let i = 0; i < menuList.length; i += 1) {
    const menu = menuList[i];
    content += `li\n  a(href='/categories/${menu.uri}') ${menu.name}\n`;
  }
  fs.writeFile('./app/views/includes/menu.pug', content, (err) => {
    if (err) throw err;
    console.log('menu.pug updated!');
  });
}

module.exports = { deleteImgFile, createMenuFile };

const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const fileUtil = require('../../app/utils/fileUtil');


describe('fileUtil methods', () => {
  it('createMenuFile(): should create a menu.pug file', (done) => {
    const writeStub = sinon.stub(fs, 'writeFile');
    const menus = [
      { uri: 'tshirts', name: 'T-Shirts' },
      { uri: 'shoes', name: 'Shoes' },
      { uri: 'jackets', name: 'Jackets' },
    ];
    fileUtil.createMenuFile(menus);
    const { args } = writeStub.getCall(0);
    expect(args.length).to.be.equal(3); // Three arguments: path, content, callback
    expect(args[0]).to.be.equal('./app/views/includes/menu.pug'); // path is fixed
    // content should looks like below
    expect(args[1]).to.be.equal(
      "li\n  a(href='/categories/tshirts') T-Shirts\n"
      + "li\n  a(href='/categories/shoes') Shoes\n"
      + "li\n  a(href='/categories/jackets') Jackets\n",
    );

    done();
  });
});

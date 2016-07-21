const expect = require('chai').expect;
const fs = require('fs');
const transform = require(__dirname + '/../lib/transformers');
const BitmapTest = require(__dirname + '/../lib/bitmap');

describe('transform.inversion function', function() {
  it('should chage a pixel RGB values be inverted', (error, data) => {
    var pixelValues = [];
    fs.readFile(__dirname + '/testRGB.bmp', (error, data) => {
      if (error) return console.dir(error);
      var bitTest = new BitmapTest(data);
      transform.determinePalette(bitTest);
      transform.inversion(bitTest, data);
      for (var i = 1001; i <= 1010; i++) {
        pixelValues.push(data.readUIntLE(i, 1));
      }
      expect(pixelValues).to.eql([85, 1, 17, 0, 0, 1, 17, 1, 85, 104]);
      done();
    });
  });
});

describe('transform.chooseColor function', function() {
  it('should change a pixels RGB value to reflect chosen color (choose color has highest value)', (function(done) {
    var pixelValues = [];
    var color = 'green';
    fs.readFile(__dirname + '/test.bmp', (error, data) => {
      if (error) return console.dir(error);
      var bitTest = new BitmapTest(data);
      transform.determinePalette(bitTest);
      transform.chooseColor(bitTest, data, color);
      for (var i = 11952; i <= 11960; i++) {
        pixelValues.push(data.readUIntLE(i, 1));
      }
      expect(pixelValues).to.eql([0, 0, 0, 189, 239, 239, 123, 239, 239]);
      done();
    });
  }));
});

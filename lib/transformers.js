const fs = require('fs');
const BitmapObject = require(__dirname + '/bitmap');

const transformer = module.exports = exports = {

  determinePalette: function(bitmap) {
    if(bitmap.numColors > 0) {
      bitmap.startTransform = 54;
      bitmap.endTransform = bitmap.pixelArrayOffset;
      bitmap.colorBytes = 4;
    } else {
      bitmap.startTransform = bitmap.pixelArrayOffset;
      bitmap.endTransform = bitmap.fileSize - 1;
      bitmap.colorBytes = bitmap.bitsPerPixel / 8;
    }
  },

  inversion: function(bitmap, data) {
    var value;
    for (var i = bitmap.startTransform; i <= bitmap.endTransform; i++) {
      value = 255 - (data.readUIntLE(i, 1));
      data.writeUIntLE(value, i, 1);
    }
  },

  grayscale: function(bitmap, data) {
    var color = [];
    var gray = 0;
    for (var i = bitmap.startTransform; i <= bitmap.endTransform; i += bitmap.colorBytes) {
      for (var j = 0; j < 3; j++) {
        color[j] = data.readUIntLE(i+j, 1);
      }
      gray = Math.floor((color.reduce( (prev, curr) => prev + curr)) / bitmap.colorBytes);
      for (var k = 0; k < 3; k++) {
        data.writeUIntLE(gray, i+k, 1);
      }
    }
  },

  chooseColor: function(bitmap, data, colorChoice) {
    var color = [];
    var large = 0;
    var small = 0;
    for (var i = bitmap.startTransform; i <= bitmap.endTransform; i += bitmap.colorBytes) {
      for (var j = 0; j < bitmap.colorBytes; j++) {
        color[j] = data.readUIntLE(i+j, 1);
      }
      large = Math.max.apply(null, color);
      small = Math.min.apply(null, color);
      switch(colorChoice) {
      case 'blue':
        data.writeUIntLE(large, i, 1);
        data.writeUIntLE(small, i+1, 1);
        data.writeUIntLE(small, i+2, 1);
        break;
      case 'green':
        data.writeUIntLE(small, i, 1);
        data.writeUIntLE(large, i+1, 1);
        data.writeUIntLE(large, i+2, 1);
        break;
      case 'red':
        data.writeUIntLE(small, i, 1);
        data.writeUIntLE(large, i+1, 1);
        data.writeUIntLE(large, i+2, 1);
        break;
      }
    }
  },

  transformImage: function(data, chosenTransform, color) {
    var bitmap = new BitmapObject(data);
    transformer.determinePalette(bitmap);
    switch (chosenTransform) {
    case 'inversion':
      transformer.inversion(bitmap, data);
      break;
    case 'grayscale':
      transformer.grayscale(bitmap, data);
      break;
    case 'chooseColor':
      transformer.chooseColor(bitmap, data, color);
      break;
    }

    fs.writeFile(__dirname + '/../images/newImage' + Date.now() + '.bmp', data, 0, bitmap.fileSize, (error, written, buffer) => {
      process.stdout.write('written to newImage.bmp' + '\n');
    });
  }
};

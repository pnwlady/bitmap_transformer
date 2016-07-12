# bitmap_transformer
This application reads a BMP file and transforms colors based on use choice.

The user can specify which file to transform, as well as the transformation method and color.

## Command Line Uitilty
The transformer can be run from the command line with the following format:
```
node index.js [file] [transformation choice][color]
```
The image will be transformed and written to the `newImage.bmp` file in the `/images` directory.

## Image File
If no file argument is passed, the default is a non-palette bitmap image.

All of the transformation methods work with paletted and non-paletted images with 8-bit indexed colors, as well as 24-bit (RGB) and 32-bit (RGBA) non-paletted color depths. The alpha value in the 32-bit color will not be changed.

## Image file options
Choose from the following, as the first argument.  
`palette`
`nonPalette`
`pikachu`

```
node index.js [file option]
```
User can add a bmp file to the `/images` directory and select that file name.

## Transformation
If no transformation argument is passed, the transformation will default to greyscale, and if the chooseColor process is not given a color choice, it will default to red.

## Transformation options
Choose from the following transformations as the second argument.

`greyscale`: averages the RBG value for each pixel and replaces each color with the average.

`inversion`: flips each of the RGB values on the spectrum spectrum so RGB becomes (255 - R; 255 - G; 255 - B)

`chooseColor`: changes the hue of the image to the chosen color by determining the largest of the RGB values and setting the chosen color to that value. The remaining colors are set to the lowest value.

## Color options
Pass one of these options as the third argument in the `node index.js` command.
  * `red`
  * `green`
  * `blue`

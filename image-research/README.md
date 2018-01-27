# Image Optimizations for Various Browsers, Screen Resolutions, & Viewport widths
Doing images "right" today is hard.  Don't let anyone tell you otherwise.  As the saying goes, there are a million ways to skin a cat and there are a million more ways to screw it up.  Here are some important bullet points that you should read _first_ and _last_.  That is, read them now, then re-read them at the end of your research:

- if all you care about is switching out different resolutions of the same image for each viewport width (i.e. each device width), then all you need is a simple `<img>` element with a `srcset` attribute

- _resolution switching_ refers to changing out smaller resolutions of the same image for different devices, and _art direction_ refers to changing different images for different devices

- the `<picture>` element allows you to switch out different images. Use it if you want to implement _art direction_ or if you want to use the latest browser technology (i.e. use `webp` images)

- whereas the `srcset` attribute tells browsers _which_ image to choose, the `sizes` attribute tells the browser _how_ that image should look upon rendering. Do not put incorrect values for the `srcset` or `sizes` attributes or the browser will download the wrong image.

- any image < 10kb shoudl be converted to a data URI

- use SVGs whenever possible


## Files included herein
- [image-resolution-and-resizing.md](https://github.com/benjaminhoffman/front-end-optimizations/blob/master/image-resolution-and-resizing.md)
  - I collect all my findings regarding the `<img>` and `<picture>` HTML elements.
- [examples.html](examples.html)
  - Use this file to play with the various image files within this repo
- `vendor/picturefill.js`
  - popular pollyfill library for the `<picture>` element


## Optimize Your Website
If you are a front end developer, here is a checklist of how you can optimize your website

### SVGs, PNGs, and files < 10 kb
- Any images <10 KB should be converted to data:URI and embedded into HTML/CSS
- Serve PNGs for logos, icons, etc.
- Serve vector images (SVGs) for images that consist of geometric shapes
  - Why? Because they infinitely scale without increasing in file size.  That is, they are zoom and resolution independent.
- SVG should be minified and GZIP’d
- Source: [Google Performance Recommendations](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)

### All remaining images (JPG, GIF, etc)
Optimization can be broken into two parts: **process** and **code**.

#### Optimal process must include:
- **Resizing**: Create multiple, smaller versions of the original image
- **Compression**: Compresses each image into optimal format (compression)
  - Note: most CDNs will do this automatically and Google recommends this (Cloudinary, imgix, Thumbor) 
- **Clean up**: remove unnecessary metadata from image
- **Storage**: we don’t want the images stored in github.  We need a solution that will allow us to store the images on S3 or similar storage
- **Process** once: only process the original image once; reprocess any new image but no need to reprocess the entire asset directory
- **Build** time: we don’t want to bloat our build time (keep under 200s)

#### Optimal code must include:
- **Lazy load**: Only request image when it’s within viewport (Lazy load)
- **Blur up effect**: Creates a placeholder image (blur-up effect)
- **HTML**: should work with img `srcSet` attribute
- **HTML width/height**: Hold image position so page doesn’t jump
- **CSS**: should work with CSS (via media queries or image-set property


## Resolution Switching (RS) vs. Art Direction (AD)
RS uses `srcset` on the `<img>` element to switch out smaller resolutions of the same image for smaller devices, and larger resolutions for larger devices. AD uses `<picture>` and `<source>` elements to switch out completely different images for one another, depending on the device, browser, or viewport width.  Example usages of AD include using `webp` files and zooming in (cropping) on images on smaller devices.

### Use Cases
See `examples.html` in this repo for additional notes.

- **Use a `.webp` image if the browser supports it and `.jpg` or other if not**
  - art direction

- **On mobile or tablet, render a smaller version of the same image so the device doesn't have to download huge assets**
  - resolution switching

- **On Retina (or Super Retina, etc) device, render a larger version of the same image so the image is very crisp and clear**
  - resolution switching

- **Crop an image (i.e. zoom in) when using a smaller device so context of the image isn't lost or users don't have to zoom in**
  - art direction

- **Render a smaller `.webp` image on small device, and large `.webp` image on a large device, and have `.jpg` (or other) as a backup**
  - art direction **and** resolution switching


## Read Me
- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
- https://dev.opera.com/articles/responsive-images/
- https://www.html5rocks.com/en/tutorials/responsive/picture-element
- https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/
- https://developers.google.com/web/updates/2015/09/automating-resource-selection-with-client-hints
- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/
- https://developers.google.com/web/fundamentals/design-and-ux/responsive/images

## Solutions / Modules / Utils
https://github.com/lovell/sharp
https://www.npmjs.com/package/jimp
https://www.imagemagick.org/script/index.php
https://www.npmjs.com/package/image-resizer
https://www.gatsbyjs.org/packages/gatsby-image/
https://github.com/herrstucki/responsive-loader
https://github.com/aFarkas/lazysizes


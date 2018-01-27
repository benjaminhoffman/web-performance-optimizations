# Web Images in 2018
Through weeks of research has born this repo.  Image optimization within your HTML can be broken into two categories: **resolution switching** and **art direction**.  

All links provided below, but I found these to be particularly helpful:
- [MDN Responsive Image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [CloudFour 8-part Series](https://cloudfour.com/thinks/responsive-images-101-definitions/)
- [Responsive Images in Practice by Eric Portis](https://alistapart.com/article/responsive-images-in-practice)
- [Srcset and Sizes by Eric Portis](http://ericportis.com/posts/2014/srcset-sizes/)

## Resolution Concept Overview
- The concept of `2x` or `3x` screen resolution is nothing more than double or triple the width/height of the image squished into the same width/height as you would expect on the `1x` resolution screen. Said another way, the browser squeezes a larger image into a smaller space.  That is why we say it's double or triple the DPI.

- The corollary here is, if your use case matches one of the following situations (which should cover the majority of uses for image optimizations), then [all you need is the `srcset` attribute](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/) on your `img` element because the browser is smart enough to determine which image to download:
  1. you want to force the browser to download smaller images for mobile device, or
  2. you want to change the image file for better resolution screens (2x, 3x)

- Math: first the browser does this division: image_width / browser_width. Then, it will choose the image with the lowest value that's still higher than the screen resolution ([see table below](#Appendix) or [this blog post](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/#article-header-id-0)).

- Note that once the browser downloads a larger version of an image, it _should_ use that one (until you hard refresh), regardless of screen size or resolution (Chrome does this, but inconsistent in other browsers).  Thus, if you open a webpage twice and make one of the windows larger, the smaller window will also use the assets of the larger.

- So, when do we use the `<picture>` element?  Only use this for "[_art direction_](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images)" (i.e. when you want to specify different images depending on device characteristics).

- do **not** mix resolution descriptors (`1x`, `2x`, etc) with width descriptors (`w`, `vw`, etc) within `srcset` at the same time.  They do not mix.

## Element / Attribute Definitions and Explanations
### `<picture>` element (art direction)
- `<picture>` is a way to provide different versions of an image based on different device characteristics, like device size, resolution, orientation, etc ([source](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#art_direction_in_responsive_images_with_picture))
- For example, it's a way to tell the client, "on this device, I want you to serve this image, and on that client, I want you to serve that image".  Why do we do this?  Three popular use cases come to mind:
  - on a tiny mobile device, you may want a cropped version image of the original image so the user doesn't have to zoom in to see the details of the image
  - or maybe you'd like to serve a different file format, say `.webp`, if the browser supports it and have a fallback, like `.jpg`, if it does not.
  - finally, sometimes you want to serve a different image altogether (or no image at all) on smaller devices, as with companies that run A/B tests and realize some images convert better on mobile devices.
- use the `<picture>` element to wrap a couple `<source>` elements and one `<img>` element
  - **order matters**: browser reads from top down so put your largest images first
  - **backwards compatible**:  if `<picture>` is not supported or if browser doesn't find a match within the `<source>` tags, it will use the `<img>` as fallback

- source: https://www.youtube.com/watch?v=QINlm3vjnaY

### `source` attribute
- use this tag to indicate to the browser which image should be used in each situation
- the `media` attribute is used by the browser to match its viewport width
- the `srcset` attribute is to let the browser know which image should be served once it finds a match in `media` query
- alternatively, you can use the `type` attribute to indicate to the browser that you want to match a certain image type, like `.webp`


### `media` & `type` attribute
- think of the `media` attribute like css media query
  - it is used by the browser to know what image should be rendered
  - when it finds a match, it then looks at the `srcset` attribute to know which image to request
  - can be an attribute of either the `img` or `source` elements
- the `type` attribute indicates to the browser what the image MIME type is
  - if the browser supports that MIME type, then it considers it a successful match and will render the image listed in the `srcset`
  - only works on the `source` element, not the `img` element

### Example of `<picture>`, `source`, `media`
```html
// browser parses the `picture` element in order: it uses the image that matches the first `source` attribute
<picture>
  // since our first `source` has an `type` attribute, the browser will render that image if it supports that image type, otherwise it will move on to the next `source` tag
  <source type="image/webp" srcset="image_optimized.webp">

  // if the above `source` element isn't used, the browser then checks if viewport is over 800px and if yes, use this first image
  <source media="(min-width: 800px)" srcset="image_large.jpg">
  
  // then check if this browser width matches
  <source media="(min-width: 450px)" srcset="image_medium.jpg">

  // if none of the above is matched or if `picture/source` is not supported by the browser, use this img tag as fallback
  <img src="image_small.jpg" alt="...">
</picture>
```

### `srcset` attribute
  - comma-separated list of images that is parsed by the browser prior to making any requests, and only the most appropriate image is downloaded and displayed ([source](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#enhance_imgs_with_srcset_for_high_dpi_devices))
  - the `srcset` attribute can be placed on either the `source` element or the `img` element

  -- TODO redo this entire section
  - if placed on the `source` element, you most likely will use the `media` attribute for your media query and use `srcset` to determine which image resolution to serve
    - **resolution descriptor**: if instead you simply want multiple display resolutions, indicate the image PPI using `1x`, `2x`, etc
      - PPI is _pixels per inch_ and a retina browser will render the `2x` image, normal browsers will render the `1x` version, and "super retina" browsers will render a `3x` version
  - if placed on the `img` element, you most likely will use the `srcset` to determine which image to serve and the `sizes` attribute to determine the area in which that image will fill
    - **width descriptor**: if you want to serve a larger image for larger screens, indicate the image width using `w`
      - `w` refers to the images inherent width: this value is not pixels, it's the image's true width, it should be the real size that shows when you inspect the image file on your computer
  - if you forget to include these descriptors out (either width or resolution) or get them wrong, this can lead to unexpected results since the browser will have to download all the images to know each image's width.

#### Example of `srcset`

TODO above i discuss `w` but dont discuss `1x` thing, even though it is in fact possible.  must explain both

TO PLACE THIS SOMEWHERE
    - `1x` screen: we render 320w image when viewport is 500px or smaller, and 640w image when viewport is larger
    - `2x` screen: we render 640w image when viewport is 500px or smaller, and 1280w image when viewport is larger


Building on the example from above, here is how you may use the `srcset` attribute. The browser parses the `picture` element in order: it uses the image that matches the first `source` attribute

```html
// example of _resolution descriptors_
<picture>
  // if viewport is over 800px, use the normally-sized image for normal screens (1x) and use a better quality image for retina displays (2x)
  <source media="(min-width: 800px)" srcset="image_large_1x.jpg 1x image_large_2x.jpg 2x">
  
  // other source tags go here, similar to the patterns you've seen above
  <source ...>

  // fallback
  <img src="image_small.jpg" alt="...">
</picture>

// here is the same example as above, except it uses _width descriptors_ instead
<picture>
  // if viewport is over 800px, use the normally-sized image for normal screens (1x) and use a better quality image for retina displays (2x)
  <source media="(min-width: 800px)" srcset="image_large.jpg 1x image_large_2x.jpg 2x">
  
  // other source tags go here, similar to the patterns you've seen above
  <source ...>

  // fallback
  <img src="image_small.jpg" alt="...">
</picture>

```

### `sizes` attribute
- defines a set of media conditions and the width of the slot for the image to fill when that condition is true
  - the slot width can accept `px`, `em`, or percentage (`vw`) (where `vw` percentage is of the viewport, not just the container)
- doesn't have any effect on which image is actually chosen by the browser to render; this attribute only affects the area the image will fit once it renders
- examples
  - `sizes="(max-width: 500px) 250px, 500px"` = if the viewport is 500px or smaller, render the into an area that's 250px wide, else render it into an area that's 500px wide
  - `sizes="(min-width: 680px) 250px, 50vw"` = if the viewport is 680px or more, render the image into an area that's 250px wide, else render it at 50% of the viewport width
- note, css _always_ wins.  That is, if you have _both_ css _and_ a `sizes` attribute, the css will override any settings listed within sizes.


## CSS Usage
- you can use CSS media queries to conditionally load images or to provide art direction depending on the viewport width ([see here for examples](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#use_media_queries_for_conditional_image_loading_or_art_direction))

- as noted above, css will override any settings listed in your image's `sizes` attribute.  (see examples.html file)


- use the `image-set()` function in CSS to provide multiple image files for different device characteristics, allowing the browser to make the right choice. ([source](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#use_image-set_to_provide_high_res_images)) 

For example:
```css
.example {
  height: 400px;
  background-image: image-set(
    url(small@1x.png) 1x,
    url(small@2x.png) 2x
  )

  @media (min-width: 500px) {
    background-image: image-set(
      url(large@1x.png) 1x,
      url(large@2x.png) 2x
    )
  }
}
```
- note: in addition to loading the correct image, the browser also scales it accordingly. That is, it assumes the `2x` image is twice as large as the `1x` image, and so it scales the `2x` image down by a factor of 2 so that it appears to be the same size on the page.


## Rendered Sizing
- the CSS always wins over what width actually gets rendered, regardless of what the `srcset` and `sizes` says
- whereas the `srcset` and `sizes` determines which image gets rendered, the CSS determines how it gets rendered


## Links
Below is a list of resources I used to create this document.

### Sources for this file
- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
- https://css-tricks.com/video-screencasts/133-figuring-responsive-images/
- https://developers.google.com/web/fundamentals/design-and-ux/responsive/images
- http://scottjehl.github.io/picturefill/
- http://responsiveimages.org/#implementation
- responsive images in CSS: https://css-tricks.com/responsive-images-css/

### Webpack & other helpers:
- https://github.com/herrstucki/responsive-loader
- https://github.com/Klathmon/imagemin-webpack-plugin
- https://github.com/tcoopman/image-webpack-loader

### Appendix

- the following html & table displays how the browser calculates which image to use ([source](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#relative_sized_images))
```html
<img
  src="lighthouse-380.jpg"
  srcset="lighthouse-400.jpg 400w,
          lighthouse-600.jpg 600w,
          lighthouse-800.jpg 800w,
          lighthouse-1800.jpg 1800w"
/>
```
<table>
  <thead>
    <tr>
      <th data-th="Browser width">Browser width</th>
      <th data-th="Device pixel ratio">Device pixel ratio</th>
      <th data-th="Image used">Image used</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">380px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>380.png</code></td>
    </tr>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>400.png</code></td>
    </tr>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
    </tr>
    <tr>
      <td data-th="Browser width">320px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>400.png</code></td>
    </tr>
    <tr>
      <td data-th="Browser width">320px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>600.png</code></td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>1200.png</code></td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1800.png</code></td>
    </tr>
  </tbody>
</table></div>

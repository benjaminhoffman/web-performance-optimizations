
## Performance Optimization
Below is a list of optimizations you can implement to improve the performance of your website.  This list is not exhaustive and needs (continual) updating.

- `<link rel="preload">` -- add the `preload` value to your `link` elements to tell the browser to start fetching this resource earlier in the lifecycle of a page load.  This will ensure that the resource is less likely to block the page's first render. Sources: [Blog post](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/), [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content), [Examples](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

  - `as` property -- (example: `<link="preload" href="something.js" as="script"`); using `as` allows the browser to prioritize the resource loading more accurately (i.e. when used with fonts, it will [change it to High priority](https://css-tricks.com/the-critical-request/#article-header-id-0))

  - `<link rel="prefetch">` -- differs from `preload` in that it tells the browser to fetch a resource that will _probably_ be needed for next navigation. This means the resource will be fetched with extremely low priority because the main use case of `prefetch` is to speed up the _next_ page's navigation.

  - `<link rel="subresource">` -- intended to work like `prefetch` in Chrome but doesn't support priority loading so all resources downloaded at fairly low priority

- HTTP2 (H2 Server Push) -- the idea that we can avoid requesting a resource and instead push a resource from the server, since the server knows the browser will need them.  When the client finally needs the resource, it's already there waiting. When used with service workers, this will cut out one full round trip to your server! Sources: [Chrome Dev Summit 2016](https://youtu.be/RWLzUnESylc?t=13m6s)

  - **Caveat: not cache aware** -- the server doesn't have an idea about the state of your client, it will push the asset regardless of your browser's cache.

  - **Caveat: lacks resource prioritization** -- the browser knows which resources are critical, and which can be deferred.  H2SP does not have this optimization built in.

  - **Caveats Solved** -- use service workers! With SW, the browser doesn't hit the server, the assets are served from the SW. This avoids opening a connection to your server.  Because you did not open a connection, the server cannot push you resources you don't need.

- **Progressive Web App (PWA)** -- using Google Chrome Lighthouse, you should try to achieve a score of 100.  [Read more](https://stevenfitzpatrick.io/blog/getting-100-on-the-lighthouse-audit)

- Tree shaking
- Minification
- [Ahead-of-time compilation](https://angular.io/guide/aot-compiler) (Angular)
- Code splitting
- Asset Caching
- Bundle JS
- lazy loading
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) (add to [CLI](https://github.com/GoogleChrome/lighthouse) & dev workflow)
- Script tags
  - _defer_ & _async_
  - add to bottom of body

- Server side rendering (SSR)
- Accelerated Mobile Pages (AMP)
- Put critical CSS in _head_ and others in _body_

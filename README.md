# DOM Lifecycle Events
I created this repo as a place to make sense of all the metrics, measurements, and industry standards around webpage performance and page speed optimizations.  Nothing here is new or rocket science.  Consider it an encyclopedia of sorts; it's my way keeping track of the latest advancements in this area.  This has not been peer reviewed, read at your own risk.  

**Please help me improve this doc... pull requests & issues are encouraged!**


## Table of Contents
- Important Notes
- History Lesson
- Today
- Important Metrics You Should Be Tracking
  - First Contentful Paint (FCP)
  - First Meaningful Paint (FMP)
  - Time to Interactive (TTI)
  - First Interactive (FI)
  - Consistently Interactive (CI)
- Font Display Timeline
- Navigation Timing API
- Recipes
- Browser Lifecycle
- Performance Optimization
- index.js Explained
- Links


## Important Notes
If there are only a few takeaways you get from this document, please make it this:
- Users come first!  Page load is a function of how a user _perceives_ the performance of your page, and not a function of how it really performs.  

- You can only improve what you measure.  If you are reading this and are not yet measuring your performance stats, start there!


## History Lesson
Back in the day (Web 1.0 days) the `window.onload()` event was a great measurement for how long it took a webpage to load.  The reason lies in the fact that webpages were mostly static so the time it took for the page to fully render was very much aligned with the website visitor's perceived loading time.  It also helped that this event had excellent cross-browser support, thereby making it the official proxy for time-to-interactive (TTI) / first interactive (FI).  Said another way, `.onload()` is based on a page's resources downloading and in the old days of simple text and small images, the page's readiness was closely tied to its resources downloading.


## Today
In the world of dynamic content loading, single page apps, plentiful network requests, etc, `.onload()` is no longer an accurate measurement of a user's perception that the page has rendered and ready to be interacted with.  As a specific example, read [this article](http://www.stevesouders.com/blog/2013/05/13/moving-beyond-window-onload/) of how Amazon's above-the-fold content loads much faster than the `.onload()` timestamp.  Thus, we need something better to measure true TTI.

**NOTE:** Google has now broken TTI into two separate, but related metrics: First Interactive (FI) and Consistently Interactive (CI).  I provide more details on this below.


## Important Metrics You Should Be Tracking
Below is a list of definitions I pulled from Chrome, Lighthouse, and other random sources.

### **First Contentful Paint (FCP):** when the _any_ pixel of a page has rendered
[First Contentful Pain](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/edit#heading=h.wrx1f1auez1r) is the time when some contentful thing is painted for the first time. It's similar to FMP (below) but differs in that FCP catchings meaningless paints, like headers and nav bars.  In sum, if you want to know when the first pixel is painted, use this metric. But if you care about when the first meaningful object is painted, use FMP.


### **First Meaningful Paint (FMP):** when the _primary_ content of a page is visible
[First Meaningful Paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint) is essentially the paint after which the biggest above-the-fold layout change has happened, and web fonts have loaded. In other words, it's the time when a page's [primary content appears on the screen](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/edit#).  Chrome uses a "layout-based" approach to calculate this metric.  That means, the FMP metric is a function of when the "biggest layout change" (discounting content that is below the fold) + _meaningful_ web fonts have loaded.

See FCP above for comparison metric and see web font discussion below for context about font loading.


### **Time to Interactive (TTI):** when a webpage can be interacted with
TTI represents the time it takes for the page to become interactive _from the perspective of the user_ and not necessarily when the page is officially done loading.  That's an important distinction... remember we care about _perceived_ loading time, not actual loading time.


### **First Interactive (FI):** when a webpage is _minimally_ interactive
Previously known as _Time-to-Interactive_, [First Interactive (FI)](https://developers.google.com/web/tools/lighthouse/audits/first-interactive) measures when all necessary scripts have loaded and the CPU is idle enough to handle _most_ user input, as defined by:
- most (not necessarily all) UI elements on the screen are interactive
- the page responds, on average, to _most_ user input in a reasonable amount of time

Note: this measurement is listed as beta, it is still under discussion.  [link](https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c/edit#heading=h.k3n425u3ax8x)


### **Consistently Interactive (CI):** when a webpage is completely and delightfully interactive
CI is a more comprehensive measurement than FI in that it covers not only everything shown on the page, but that the page yields control back to the main thread at least once every 50ms, giving the browser enough breathing room to do smooth input processing.  In sum, it's the point at which most network resources have finished loading and the CPU is idle for a prolonged period.

Note: this measurement is listed as beta, it is still under discussion.  [link](https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c/edit#heading=h.k3n425u3ax8x)


## Font Display Timeline (TODO put me somewhere!)
When using webfonts via `@font-face`, the user agent needs to know what to do while the font is actively loading.  Thus, [most browsers have adopted the following timeline](https://tabatkins.github.io/specs/css-font-display/#render-with-a-fallback-font-face):

1. **Font Block Period** -- if the font face is not loaded, any element attempting to use it must instead render an invisible fallback font face.  If the font load successfully during this period, it is used as expected.

2. **Font Swap Period** -- occurs immediately after the block period; if the font face has not loaded yet, any element attempting to use it will render with a fallback font. If the font loads successfully during this period, the correct font will be swapped out.

3. **Font Failure Period** -- occurs immediately after the swap period; if the correct font face is not yet loaded, the page will simply render with the fallback font and not attempt to load the correct font.


## Navigation Timing API
All browsers (IE 9+) now provide a performance timing API ([source](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API)), which can be accessed via `window.peformance.timing`.  According to MDN, the *Navigation Timing API* provides data that can be used to measure the performance of a website. Unlike other JavaScript-based mechanisms that have been used for the same purpose, this API can provide end-to-end latency data that can be more useful and accurate.  Using these timestamps you can easily calculate your website's time-to-interactive (TTI)!  The [list of events](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming), in order of occurrence, are:
  - **navigationStart** -- right after the prompt for unload terminates on the previous document in the same browsing context.  Note, if no previous document exists, this value is the same as `fetchStart`.
  - **unloadEventStart** -- if no previous document, or if the previous doc / redirects is not of the same origin, the value returned is 0.
  - **unloadEventEnd** -- if no previous document, or if the previous doc / redirects is not of the same origin, the value returned is 0.
  - **redirectStart** -- the timestamp of the first HTTP redirect start; if there is no redirect, or if one of the redirects is not of the same origin, the value returned is 0.
  - **redirectEnd** -- timestamps of when the last HTTP redirect is completed (when the last byte of the HTTP response has been received); if there is no redirect, or if one of the redirect is not of the same origin, the value returned is 0.
  - **fetchStart** -- when the browser is ready to fetch the document using an HTTP request; the moment is _before_ the check to any application cache.
  - **domainLookupStart** -- when the domain lookup starts; if a persistent connection is used, or info is stored in cache / local resource, the value should be the same as `.fetchStart`.
  - **domainLookupEnd** -- when the domain lookup is finished; if a persistent connection is used, or info is stored in cache / local resource, the value should be the same as `.fetchStart`.
  - **connectStart** -- when the request to open a connection is sent to the network.
  - **connectEnd** -- when the request to open a connection is sent to the network.
  - **secureConnectionStart** -- when the secure connection handshake starts; 0 is no such connection is requested.
  - **requestStart** -- when the browser sent the request to obtain the actual document, from the server or from a cache.
  - **responseStart** -- when the browser received the first byte of the response.
  - **responseEnd** -- when the browser received the last byte of the response, or when the connection is closed, from the server.
  - **domLoading** -- when the parser started its work; specifically, when `document.readyState` changes to `loading`.
  - **domInteractive** -- when the parser finished its work on the document; specifically, when `document.readyState` changes to `interactive`.
  - **domContentLoadedEventStart** -- right before the parser sent the `DOMContentLoaded` event; specifically, right after all the scripts that need to be executed right after the parsing has been executed.
  - **domContentLoadedEventEnd** -- right after all the scripts that need to be executed have been executed.
  - **domComplete** -- when the parser finished its work on the main document; specifically, when `document.readyState` changes to `complete`.
  - **loadEventStart** -- when the `load` event was sent for the current document.
  - **loadEventEnd** -- when the `load` event handler terminates; specifically, when the load event is completed.

TODO: explanation of [`performance.getEntries()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries)

## Recipes
**`performance.timing`** -- if you see the `.something` syntax below, it's because I removed the preface of `performance.timing` for purposes of examples.  Thus, in Chrome console, this `.domInteractive - .requestStart` should be this `performance.timing.domInteractive - performance.timing.requestStart`.


- `performance.getEntries()[0].domInteractive`
  - potentially a good measure of time to interactive (TTI)
  - in MS, around the time it takes from the moment the browser sends the request to the moment the DOM becomes interactive
  - _should_ be close to metric `.domInteractive - .requestStart`


- `performance.getEntriesByType('paint')[0].startTime`
  - time to first paint... which is the earliest possible point at which something appears after a user requests a page ([link](https://css-tricks.com/paint-timing-api/))
  - try typing this and examine the objects: `performance.getEntriesByType('paint')`
  - [learn more](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)


- `performance.timing.responseStart - performance.timing.requestStart`
  - time to first byte


- `performance.timing.responseEnd - performance.timing.requestStart`
  - time to last byte


- `.loadEventEnd - .navigationStart`
  - calculate total time required to load a page


- `.responseEnd - .requestStart`
  - calculate request response times


## Browser Lifecycle
- browser parses the document returned from the server
- parser sees a script tag
- without a _defer_ or _async_ tag, browser will pause as it goes off and makes the request, waits for the response, then pass the response to the v8 parser
- parser says, _'take this string of code and turn it into something the v8 runtime can actually use'_
- v8 runtime parses, compiles, and executes the string of code returned from the script tag
- usually the longest time of this process is the execution stage
- if your bundle is large, you may see an extended delay in the parsing stage of the script
- once your code is done parsing, compiling, and executed, its done!
- your page can continue parsing


## Performance Optimization
Below is a list of optimizations you can implement to improve the performance of your website.  This list is not exhaustive and needs (continual) updating.

- `<link rel="preload">` -- add the `preload` value to your `link` elements to tell the browser to start fetching this resource earlier in the lifecycle of a page load.  This will ensure that the resource is less likely to block the page's first render. Sources: [Blog post](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/), [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content), [Examples](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

  - `as` property -- (example: `<link="preload" href="something.js" as="script"`); using `as` allows the browser to prioritize the resource loading more accurately

  - `<link rel="prefetch">` -- differs from `preload` in that it tells the browser to fetch a resource that will _probably_ be needed for next navigation. This means the resource will be fetched with extremely low priority because the main use case of `prefetch` is to speed up the _next_ page's navigation.

  - `<link rel="subresource">` -- intended to work like `prefetch` in Chrome but doesn't support priority loading so all resources downloaded at fairly low priority

- HTTP2 (H2 Server Push) -- the idea that we can avoid requesting a resource and instead push a resource from the server, since the server knows the browser will need them.  When the client finally needs the resource, it's already there waiting. When used with service workers, this will cut out one full round trip to your server! Sources: [Chrome Dev Summit 2016](https://youtu.be/RWLzUnESylc?t=13m6s)

  - **Caveat: not cache aware** -- the server doesn't have an idea about the state of your client, it will push the asset regardless of your browser's cache.

  - **Caveat: lacks resource prioritization** -- the browser knows which resources are critical, and which can be deferred.  H2SP does not have this optimization built in.

  - **Caveats Solved** -- use service workers! With SW, the browser doesn't hit the server, the assets are served from the SW. This avoids opening a connection to your server.  Because you did not open a connection, the server cannot push you resources you don't need.

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

## index.js Explained
You'll notice there's an index.js file in this repo.  It needs updating but the gist of it is that I created it in order to visually see when certain events fire.

- make sure to throttle your network in the chrome dev tools network tab.  that way you can see how the jquery script attributes and placement affect user experience.

- comment / uncomment the jquery scripts to see effects

## Links

#### Page Speed Tools
- [Webpage Speed Test](https://www.webpagetest.org/)
-

#### Webpack
- [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) -- represent your bundle content as a convenient interactive zoomable treemap
-

#### Browserify
- [Disc](https://github.com/hughsk/disc) -- visualize the module tree & track down the bloat

#### Other
- https://testdrive-archive.azurewebsites.net/HTML5/DOMContentLoaded/Default.html
- https://www.npmjs.com/package/source-map-explorer
- https://pinterest.github.io/bonsai/
- http://instartlogic.github.io/p/mobileperf/#slide1
- (add links from bookmarks)

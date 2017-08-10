# DOM Lifecycle events
I am obsessed with page load speed, website performance, and just about anything that is tangentially related to improving the user experience of my website(s).

I created this repo as a place to make sense of all the metrics, measurements, and industry standards around web page speed and performance.  I'm sure there are other resources online that will tell you the same as is listed here but I wanted to create an all-in-one place for myself, for future reference.

### History Lesson
Back in the day (Web 1.0 days) the `window.onload()` event was a great measurement for how long it took for a page to fully render because it is a standard event implemented across all browsers and it reflected the actual user perception since web pages were very static. This was the official proxy for time-to-interactive (tti).  Said another way, `.onload()` is based on a page's resources downloading and in the old days of simple text and small images, the page's readiness was closely tied to its resources downloading.

### Today
In the world of dynamic content loading, single page apps, plentiful network requests, etc, `.onload()` is no longer an accurate measurement of a user's perception that the page has rendered and ready to be interacted with.  As a specific example, read [this article](http://www.stevesouders.com/blog/2013/05/13/moving-beyond-window-onload/) of how Amazon's above-the-fold content loads much faster than the `.onload()` timestamp.  We need something better to truly measure the time-to-interactive (TTI).

### How to Measure Time-to-Interactive (TTI)
TTI is a very important metric to measure because it represents the time it takes for the page to become interactive _from the perspective of the user_ and not necessarily when the page is officially done loading.  That's an important distiction -- we care about _perceived_ loading time vs. actual loading time.  So exactly can we measure TTI?


### TODO TTI discussion
- need a section about how companies are measuring TTI and how strategies differ among clientside JS frameworks

### TODO additional notes
- possibly discuss corner cases like lazy loading, above/below the fold content, etc

### Navigation Timing API
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


#### Recipes
- `new Date().getTime() - .navigationStart`
 - measure perceived loading time


- `.loadEventEnd - .navigationStart`
 - calculate total time required to load a page


- `.responseEnd - .requestStart`
 - calculate request response times


- recipe TODO: Time to First Byte
- recipe TODO: Time to Last Byte
- recipe TODO: Time to Render
- recipe TODO: Time to Interactive
- recipe TODO: Time to First Paint

### Lifecycle of a JavaScript Script

- browser parses the document returned from the server
- parser sees a script tag
- without a _defer_ or _async_ tag, browser will pause as it goes off and makes the request, waits for the response, then pass the response to the v8 parser
- parser says, _'take this string of code and turn it into something the v8 runtime can actually use'_
- v8 runtime parses, compiles, and executes the string of code returned from the script tag
- usually the longest time of this process is the execution stage
- if your bundle is large, you may see an extended delay in the parsing stage of the script
- once your code is done parsing, compiling, and executed, its done!
- your page can continue parsing



### index.js

- TODO remove comments from index.js and place here

- to see the logs fire under slow internet, make sure to throttle your network in the chrome dev tools network tab.  that way you can see how the jquery script attributes and placement affect user experience.

- comment / uncomment the jquery scripts to see effects

### Links
- https://testdrive-archive.azurewebsites.net/HTML5/DOMContentLoaded/Default.html
- https://www.npmjs.com/package/source-map-explorer
- https://www.npmjs.com/package/webpack-bundle-analyzer
- https://www.webpagetest.org/
- add links from bookmarks

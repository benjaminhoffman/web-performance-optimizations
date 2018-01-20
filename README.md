# DOM Lifecycle Events
I created this repo as a place to make sense of all the metrics, measurements, and industry standards around webpage performance and page speed optimizations.  Nothing here is new or rocket science.  Consider it an encyclopedia of sorts; it's my way keeping track of the latest advancements in this area.  This has not been peer reviewed, read at your own risk.  

**Please help me improve this doc... pull requests & issues are encouraged!**


## Table of Contents
- Important Notes
- History Lesson
- Today
- index.js Explained
- Links
- TO DO

This repo is split up into a number of markdown files:
- [Font Display Timeline](./Fonts.md)
- [Navigation Timing API (old)](./Navigation_Timing_API.md)
- [Performance Timing API (new)](./Navigation_Timing_API.md)
- [Important Metrics You Should Be Tracking](./Important_Metrics.md)
- [RAIL](./RAIL.md)
- [Browser Lifecycle](Browser_Lifecycle.md)
- [Performance Optimization](./Performance_Optimizations.md)


## Important Notes
If there are only a few takeaways you get from this document, please make it this:
- Users come first!  Page load is a function of how a user _perceives_ the performance of your page, and not a function of how it really performs.  

- You can only improve what you measure.  If you are reading this and are not yet measuring your performance stats, start there!


## History Lesson
Back in the day (Web 1.0 days) the `window.onload()` event was a great measurement for how long it took a webpage to load. `onload()` fires once all assets (html / images / css) have finished loading, and in the days of small, static websites, the time it took for the page to fully download and render, was very much aligned with the website visitor's perceived loading time.  It also helped that this event had excellent cross-browser support, thereby making it the official proxy for time-to-interactive (TTI) / first interactive (FI).  Said another way, `.onload()` is based on a page's resources downloading and in the old days of simple text and small images, the page's readiness was closely tied to its resources downloading.

Finally, I'll leave you with this great quote from [Google I/O 2017](https://developers.google.com/web/updates/2017/06/user-centric-performance-metrics) explaining why we can't use just one metric to determine page load time: "...load is not a single moment in time—it's an experience that no one metric can fully capture. There are multiple moments during the load experience that can affect whether a user perceives it as "fast", and if you just focus on one you might miss bad experiences that happen during the rest of the time."


## Today
In the world of dynamic content loading, single page apps, plentiful network requests, etc, `.onload()` is no longer an accurate measurement of a user's perception that the page has rendered and ready to be interacted with.  As a specific example, read [this article](http://www.stevesouders.com/blog/2013/05/13/moving-beyond-window-onload/) of how Amazon's above-the-fold content loads much faster than the `.onload()` timestamp.  Thus, we need something better to measure true TTI.

## index.js Explained
You'll notice there's an `index.js` and `index.html` file in this repo.  If you'd like to see some of the browser timing events described in this repo, use those files.  Make sure to throttle your network (in the dev tools network tab) so you can see how the jquery script affects user experience.

## Links

#### Page Speed Tools
- [Webpage Speed Test](https://www.webpagetest.org/)

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

## To Do
- read me: https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-i-introduction-50679aef2b12
- and me: https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-2-page-load-performance-33b932d97cf2
- https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579
- fix table of contents and headings for each section

# Important Metrics You Should Be Tracking

## Table of Contents
- First Contentful Paint (FCP)
- First Meaningful Paint (FMP)
- First Interactive (FI)
- Time to Interactive (TTI)
- Consistently Interactive (CI)


## Important Metrics You Should Be Tracking
Below is a list of definitions I pulled from Chrome, Lighthouse, and other random sources.

**Paint Timing API**: these "paint" metrics listed below mark the points when the browser first renders pixels to the screen. ([cite](https://developers.google.com/web/updates/2017/06/user-centric-performance-metrics#first_paint_and_first_contentful_paint))

![performance metrics load time visual](./assets/perf_metrics_load_timeline.png)

### **First Paint (FP):** when _any_ pixel of a page have rendered
FP marks the point when the browser renders _anything_ that is visually different from what was on the screen prior to navigation (i.e. even one little pixel change).

### **First Contentful Paint (FCP):** when _some_ pixels of a page have rendered
FCP is similar to FMP (below) but differs in that FCP captures meaningless paints, like headers and nav bars.  From Google: _"FCP is the point when the brwoser renders the first bit of content from the DOM, which may be text, an image, SVG, or even a `<canvas>` element"_ ([source](https://developers.google.com/web/updates/2017/06/user-centric-performance-metrics)).  In sum, if you want to know when the first pixel is painted, use this metric. But if you care about when the first meaningful object is painted, use FMP.


### **First Meaningful Paint (FMP):** when the _primary_ content of a page is visible
[First Meaningful Paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint) is essentially the paint after which the biggest above-the-fold layout change has happened, and web fonts have loaded. In other words, it's the time when a page's [primary content appears on the screen](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/edit#).  Chrome uses a "layout-based" approach to calculate this metric (i.e. it aims to answer the question, "is this useful?").  That means, the FMP metric is a function of when the "biggest layout change" (discounting content that is below the fold) + _meaningful_ web fonts have loaded.

You may notice that this is a very hard metric to track because one cannot simply use the same content for every website.  Webmasters and frontend engineers have to find their own "meaningful" content to measure on a per-page basis ([add'l reading](https://developers.google.com/web/updates/2017/06/user-centric-performance-metrics)).

See FCP above for comparison metric and see web font discussion below for context about font loading.


### **First Interactive (FI):** when a webpage is _minimally_ interactive
Previously known as _Time-to-Interactive_, [First Interactive (FI)](https://developers.google.com/web/tools/lighthouse/audits/first-interactive) measures when all necessary scripts have loaded and the CPU is idle enough to handle _most_ user input, as defined by:
- most (not necessarily all) UI elements on the screen are interactive
- the page responds, on average, to _most_ user input in a reasonable amount of time

Note: this measurement is listed as beta, it is still under discussion.  [link](https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c/edit#heading=h.k3n425u3ax8x)


### **Time to Interactive (TTI):** when a webpage can be interacted with
TTI represents the time it takes for the page to become interactive _from the perspective of the user_ and not necessarily when the page is officially done loading.  That's an important distinction... remember we care about _perceived_ loading time, not actual loading time.  TTI identifies the point at which the page's initial JS is loaded and the main thread is idle (free of long tasks). It's the point at which your application is both visually rendered and capable of reliably responding to user input.


### **Consistently Interactive (CI):** when a webpage is completely and delightfully interactive
CI is a more comprehensive measurement than FI in that it covers not only everything shown on the page, but that the page yields control back to the main thread at least once every 50ms, giving the browser enough breathing room to do smooth input processing.  In sum, it's the point at which most network resources have finished loading and the CPU is idle for a prolonged period.

Note: this measurement is listed as beta, it is still under discussion.  [link](https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c/edit#heading=h.k3n425u3ax8x)

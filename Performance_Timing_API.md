# Performance Timing API

## Intro
Use these APIs to benchmark and track your webpage speed performance overtime.  This API replaces the older [Navigation Timing API](./Navigation_Timing_API.md).  The latter still works and isn't deprecated but these new APIs make it much easier.  But note, browser support is still limited so check the API docs before implementing!

## APIs
- [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
- [PerformanceEntry](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry)
- [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)

## Recipes
- [Paint API](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming): According to the `PerformancePaintTiming` docs, you can do this:
```javascript
  if (window.performance) {
    let performance = window.performance;
    let performanceEntries = performance.getEntriesByType('paint');
    performanceEntries.forEach( (performanceEntry, i, entries) => {
      console.log("The time to " + performanceEntry.name + " was " + performanceEntry.startTime + " milliseconds.");
    });
  } else {
    console.log('Performance timing isn\'t supported.');
  }
  // The time to first-paint was __ milliseconds.
  // The time to first-contentful-paint was __ milliseconds.
```

## Send Data to Google Analytics
see here for examples: https://developers.google.com/web/updates/2017/06/user-centric-performance-metrics#measuring_these_metrics_on_real_users_devices

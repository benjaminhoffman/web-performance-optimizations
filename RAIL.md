
## RAIL
[source](https://developers.google.com/web/fundamentals/performance/rail)

### Response
### Animation
### Idle
### Load
### Long Tasks
Avoid long tasks that block the browser's main thread, preventing other tasks in the queue from executing. The "long tasks API" identifies any task longer than 50ms as potentially problematic.  RAIL guidelines dictate the browser must respond to user input within 100ms.

![performance metrics long tasks visual](./assets/perf-metrics-long-tasks.png)

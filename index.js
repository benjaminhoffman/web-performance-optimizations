  // fires when page initially begins to load
if (document.readyState === 'loading') console.log('readyState: loading')


// fires when readyState is `interactive`
// i.e. when the user can begin clicking and those actions get put on the event queue
// NOTE: essentially same as DOMContentLoaded
document.addEventListener('readystatechange', (state) => {
  if (document.readyState === 'interactive') {
    console.log('readyState:', document.readyState) // logs "interactive"
  }
})


// fires when the HTML has been completely downloaded and parsed
// without waiting for other assets to finish loading
// i.e. before images, scripts, etc have completed
// UI is responsive at this point
// AKA: jQuery.ready()
// NOTE: essentially same as readyState of interactive
// Optimize: to improve the timing of this metric, make your
//  js files async and optimize loading of stylesheets
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
})


// fires when readyState is `complete`
// used to detect a fully-loaded page
// i.e. when all resources have loaded
// same as window.onload
document.addEventListener('readystatechange', (state) => {
  if (document.readyState === 'complete') {
    console.log('readyState:', document.readyState) // logs "complete"
  }
})


// fires when all assets/resources have loaded
// good way to detect a "fully-loaded" page
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
window.addEventListener('load', () => {
  console.log('load')
})


// same as readyState of `complete`
// old school event that's implemented by all browsers
// AKA body.onload()
window.onload = () => console.log('window.onload')


/*  NOTES on slow internet or scripts:

- if you have a slow blocking sync script in the <head>, the delay is seen immediately before the readyState `loading` step

- if you have a slow blocking sync script at the bottom of the <body>, the delay is seen immediately _after_ the readyState `loading` step

- if you have a slow `async` script, the delay is seen immediately after the DOMContentLoaded event

- if you have a slow `defer` script, the delay is seen immediately after the readyState `interactive` event

*/


// fires before user leaves the page (ie. immediately before the
// window, document, and its resources are about to be unloaded.)
// great for things like 'you have unsaved changes'
// https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
window.addEventListener("beforeunload", function (event) {
  console.log('before unload')
});


// fires when document or resource is being unloaded:
// - all resources still exist
// - nothing is visible anymore to the user
// - UI interactions are ineffective
// - an error won't stop the unloading workflow
// https://developer.mozilla.org/en-US/docs/Web/Events/unload
window.addEventListener('unload', function(event) {
  console.log('on unload');
});

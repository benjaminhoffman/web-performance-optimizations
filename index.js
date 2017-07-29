// fires when page initially begins to load
if (document.readyState === 'loading') console.log('readyState: loading')


// fires when readyState is `interactive`
// i.e. when the user can begin clicking and those actions get put on the event queue
// NOTE: essentially same as DOMContentLoaded
document.addEventListener('readystatechange', (state) => {
  if (document.readyState === 'interactive') console.log('readyState:', document.readyState)
})


// fires when all the content has loaded but not yet executed/rendered
// i.e. before images, scripts, etc have completed
// UI is responsive at this point
// AKA: jQuery.ready()
// NOTE: essentially same as readyState of interactive
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
})


// fires when readyState is `complete`
// i.e. when all resources have loaded
// same as window.onload
document.addEventListener('readystatechange', (state) => {
  if (document.readyState === 'complete') console.log('readyState:', document.readyState)
})


// fires when all assets/resources have loaded
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


/* BELOW NOT PART OF PAGE LOAD*/

// fires before user leaves the page
// great for things like 'you have unsaved changes'
window.onbeforeunload = () => console.log('before unload')


// fires when user is finally leaving
// used for things that do not involve delay or user action
window.onunload = () => console.log('unload')

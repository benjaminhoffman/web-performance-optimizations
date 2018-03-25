Synonyms
- base CSS
- crititcal CSS
- above-the-fold CSS

Google is now recommending that we inline all critical CSS (i.e. the CSS for components / UI that is above the fold) and defering all non-critcal CSS.

source: https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent

The above the fold content is the first thing our website visitors experience so by inlining our CSS we don't have to make an additional request and can render the UI super fast.  For the content that is below the visitor's viewport (i.e. the content that requires scrolling down to see), we can defer the downloading and parsing of the CSS because we assume the visitor is processing the above-the-fold content for a moment before scrolling.

CSS is render blocking.  Our browser processor will stop to read, parse, and execute any CSS that's inlined in the `<head>,</head>` of our webpage.  Normally, on your desktop with super fast internet speed, you don't really feel the difference between all or some of your CSS inlined.  But once we move to a 3G connection on mobile, the effects can be drastic, especially if you have a lot of CSS on your page.  Additionally, we don't want to inline _all_ our CSS because it increases the size of our HTML file; we'd rather have a defered download of non-critical CSS that a slower initial HTML load time.

Determining what consistutes above-the-fold content is difficult -- it is dependent upon where the "fold" is, which depends on the screen size.

There are tools to help learn what the ATF content is:
- [node modules & a list of other resources](https://github.com/addyosmani/critical-path-css-tools)
- [Autoptimize, WP plugin](https://wordpress.org/plugins/autoptimize/)

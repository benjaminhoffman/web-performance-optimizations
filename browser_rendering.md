
The following content and image is shamelessly stolen from [We migrated to Next.js to serve our home page 7.5× faster](https://www.manifold.co/blog/we-migrated-to-next-js-to-serve-our-home-page-7-5-faster-559443219c84).

<img src="./assets/browser_rendering.jpeg">

The stages
1. Once a user hits a URL, the network request is a flat cost in resolving the DNS and requesting that path from the server. It’s pretty quick, usually happening in < 100 milliseconds, but it’s mentioned because it does take some time.

2. From there, the server returns the HTML for the page, but the page will stay blank while every and tag inside is downloaded (unless it’s marked async). There’s more going on in this step than the diagram shows, but for our purposes we’ll lump these processes together.

3. With the HTML and critical assets loaded, the browser starts to paint what it can, while downloading the rest (images, etc.) in the background. Ever wonder why images sometimes “pop” in or sometimes take a while to load? This is why! This lets you look at pages sooner.

4. JavaScript can only parse & execute after it’s downloaded. Depending on how much JS there is (which can be a lot for a normal React app if it’s bundled into one file), this could take several seconds or more (note: JS doesn’t have to wait until everything else downloads to begin executing, despite the diagram layout).

5. In the case of a React app, it has to now modify the DOM, which will trigger another browser paint after it’s all done, and another cycle of asset downloads. The time this will take will depend on the complexity of the page.

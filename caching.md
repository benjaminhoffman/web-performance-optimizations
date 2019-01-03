# What is caching?
Caching is the act of storing a _snapshot_ or _copy_ of a page or file for faster access the next time that page or file is requested. The file gets served from the _caching layer_, rather than sending the request all the way back to the server. A page served from cache can be returned in a fraction of the time it would take to serve the same uncached page or file. Caching also helps ease the strain on the server when you are getting large amounts of data.

Here is what the _cached_ workflow looks like:
!['cached workflow'](./assets/cache/cached_workflow.png)

Here is what the _uncached_ workflow looks like:
!['uncached workflow'](./assets/cache/uncached_workflow.png)

# Caching layers
Caching happens at many layers. 

## Browser-level caching

## Server-level caching

## Object caching
The object caching layer caches the results of repeated queries to the database. The server first looks for the query in the Object Cache layer and if it doesn't exist yet, the query is run on the db, and the result is stored in the Object Cache layer for next time.

For example, with Wordpress, let's say you have a plugin for redirects on your website. These redirects would be stored in your database. Your website would then require that list of redirects to load every time a page is loaded, by running a query to the database. But with an Object Cache layer, the server can easily access the same query much faster from the cache than from the db itself.

TODO: readme: https://wpengine.com/support/wp-engines-object-caching/

# Cache-control headers
**What are headers?**  Headers are contextual information your web browser sends (with the page/file request) and receives (with the page/file response) while it interacts with a server.

When a page or file is requested, the server and browser listen to the "Cache-Control" headers for instructions on **who** can access the cached copy and for **how long** the copy can be accessed.  

The Cache-Control headers are:
- **age**: 

- **cache-control**: tells the cache system (ie, browser or server) how long to cache the page in seconds. When _max-age_ is set to 600, this means the page can be cached for 10 minutes.  Possible values include:
    - `no-store`: 
    - `no-cache`: 
    - `max-age`: 
    - `s-maxage`: 
    - `immutable`: 

- **x-cache**: Will tell you whether the page was served from cache or not. A **HIT** indicates the request was served from the caching layer. A **MISS** indicates it did not hit cache.

- **x-pass-why**: This header will tell you the reason why the request did not hit the cache if you see _x-cache: MISS_.

- **x-cache-group**:

- **x-cacheable**:

- **ETag**: 

- **Last-Modified**: 

- **If-Modified-Since**:

- **If-None-Match**: 

# Performance recommendations
**Reduce external resources**: If you're calling an image, stylesheet, font, or other resource from a site that's not within your control, that resource if subject to the caching settings (if any) from the server that the external resource resides on. Thus, whenever possible, call these resources from your own site, so they can be served using your own caching layer.

TODO:
- https://wpengine.com/page-performance/
- https://wpengine.com/support/best-practices-using-wp-engine-page-performance/
- https://wpengine.com/support/cookies-and-php-sessions/
- https://wpengine.com/support/database-optimization-best-practices/
- https://wpengine.com/support/tips-optimize-site/
- https://wpengine.com/support/troubleshooting-high-time-first-byte-ttfb/
- https://wpengine.com/support/wp-engines-object-caching/


# Sources
- https://wpengine.com/support/cache-control-headers-wp-engine/
- https://wordpress.org/plugins/wpe-advanced-cache-options/
- https://wpengine.com/support/tips-improving-page-cacheability/
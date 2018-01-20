
## Font Display Timeline
## TODO finish me

When using webfonts via `@font-face`, the user agent needs to know what to do while the font is actively loading.  Thus, [most browsers have adopted the following timeline](https://tabatkins.github.io/specs/css-font-display/#render-with-a-fallback-font-face):

1. **Font Block Period** -- if the font face is not loaded, any element attempting to use it must instead render an invisible fallback font face.  If the font load successfully during this period, it is used as expected.

2. **Font Swap Period** -- occurs immediately after the block period; if the font face has not loaded yet, any element attempting to use it will render with a fallback font. If the font loads successfully during this period, the correct font will be swapped out.

3. **Font Failure Period** -- occurs immediately after the swap period; if the correct font face is not yet loaded, the page will simply render with the fallback font and not attempt to load the correct font.

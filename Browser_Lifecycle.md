## Browser Lifecycle
- browser parses the document returned from the server
- parser sees a script tag
- without a _defer_ or _async_ tag, browser will pause as it goes off and makes the request, waits for the response, then pass the response to the v8 parser
- parser says, _'take this string of code and turn it into something the v8 runtime can actually use'_
- v8 runtime parses, compiles, and executes the string of code returned from the script tag
- usually the longest time of this process is the execution stage
- if your bundle is large, you may see an extended delay in the parsing stage of the script
- once your code is done parsing, compiling, and executed, its done!
- your page can continue parsing

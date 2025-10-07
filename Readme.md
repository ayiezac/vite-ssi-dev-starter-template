**This is not yet ready for production, this is only for experimental purposes**

I implement starter bundler template for dev workspace using Vite that I integrated in Manila Women on a Dev Server.

Features:
- Vite as a bundler and a development server
- It proxies remote requests from Manila Women
- Has a custom Vite Plugin named "ViteRecursiveSSI", that transforms SSI tags into HTML only on development mode and reads PHP Files when running `php -S localhost:5173`

Limitations:
- It proxied the /women and /mp and  but can't handle styles properly due to the <!--#include virtual="/imagemap/profile-menu.shtml"--> SSI directive is in the middle of the HTML file
- Only local static files are supported
- Not all internal files from loveme can be proxied, it needs collaboration from backend team

To get started, follow these steps:
1. Clone the repository
2. Install dependencies using `npm install`
3. Start the development server using `npm run dev`
4. Run `php -S localhost:5173` make sure you have already installed PHP

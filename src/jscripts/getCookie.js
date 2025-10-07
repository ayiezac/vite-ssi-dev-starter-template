/**
 * Returns "here" if the given cookie exists, or null if it doesn't.
 * @param {string} key - The name of the cookie to look for.
 * @returns {string|null} "here" if the cookie exists, or null if it doesn't.
 */
function GetCookie(key) {
  for (
    let i = `${key}=`, t = document.cookie.split(";"), o = 0;
    o < t.length;
    o++
  ) {
    if (t[o].trim().indexOf(i) === 0)
      return "here";
  }
  return null;
}
function testFirstCookie() {
  if (GetCookie("FirstTimeVisitCookie") == null
    || ("serviceWorker" in navigator
      && navigator.serviceWorker.getRegistrations().then((e) => {
        e.forEach((e) => {
          e.unregister();
        });
      }))) {
    console.warn("new visitor");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  testFirstCookie();
});

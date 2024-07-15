chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "getRedirectUri") {
    const redirect_uri = chrome.identity.getRedirectURL("oauth2");
    sendResponse({ redirect_uri });
  }
});

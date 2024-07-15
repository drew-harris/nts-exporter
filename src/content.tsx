import ReactDOM from "react-dom";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import "./index.css";
import App from "./App";

window.onload = async () => {
  // Setup the spotify sdk
  // const redirect_uri = await getRedirectUri();
  const redirect_uri = "https://www.nts.live/redirect";
  const sdk = SpotifyApi.withUserAuthorization(
    "fd8e4fd87a464ee28f2e5fdf5700880d",
    redirect_uri,
    [
      "user-modify-playback-state",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-library-modify",
      "user-library-read",
    ],
  );

  const response = await sdk.currentUser.albums.savedAlbums(20);
  console.table(response.items.at(0));

  const el = document.querySelector("body");
  if (el) {
    el.insertAdjacentHTML("afterend", '<div id="crx-app"></div>');
    ReactDOM.render(<App />, document.getElementById("crx-app") as HTMLElement);
  }
};

import ReactDOM from "react-dom";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import "./index.css";
import App from "./App";

window.onload = async () => {
  // Setup the spotify sdk
  const sdk = SpotifyApi.withUserAuthorization(
    "fd8e4fd87a464ee28f2e5fdf5700880d",
    "https://www.nts.live/redirect",
    [
      "user-modify-playback-state",
      "playlist-modify-private",
      "playlist-modify-public",
      "user-library-modify",
      "user-library-read",
    ],
  );

  // const response = await sdk.currentUser.albums.savedAlbums(20);
  // console.log(response.items.at(0)?.album.name);

  const el = document.querySelector(".bio__footer");
  console.log("element", el);
  if (el) {
    el.insertAdjacentHTML("afterend", '<div id="crx-app"></div>');
    ReactDOM.render(
      <App spotify={sdk} />,
      document.getElementById("crx-app") as HTMLElement,
    );
  }
};

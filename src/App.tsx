import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface AppProps {
  spotify: SpotifyApi;
}

function App(props: AppProps) {
  const [showing, setShowing] = useState(false);

  const addSongs = async () => {
    console.log("adding songs");
    const trackElements = document.getElementsByClassName("track__detail");
    const songIds = [];
    for (let i = 0; i < trackElements.length; i++) {
      const trackElement = trackElements[i];
      const artist =
        trackElement.getElementsByClassName("track__artist")[0].textContent;
      const title =
        trackElement.getElementsByClassName("track__title")[0].textContent;

      const searchQuery = `${artist} ${title}`;
      console.log(searchQuery);

      // @ts-expect-error broken ass spotify sdk (hire me and ill fix it)
      const result = await props.spotify.search(searchQuery, ["track"]);
      console.log(result);
      const song = result?.tracks?.items[0]?.uri as null | string;
      if (song) {
        songIds.push(song);
      }

      console.log(song);
    }
    props.spotify.playlists.addItemsToPlaylist(
      "1Li48zuxa3UpwcNelqTwKC",
      songIds,
    );
  };

  return (
    <>
      <button
        onClick={() => setShowing(true)}
        className="font-bold p-4 bg-black text-white"
      >
        Add shows
      </button>
      <PopupScreen showing={showing}>
        <div className="text-black">Tests</div>
        <button onClick={addSongs} className="text-black">
          Add songs
        </button>
      </PopupScreen>
    </>
  );
}

const PopupScreen = ({
  children,
  showing,
}: {
  children: ReactNode;
  showing: boolean;
}) => {
  if (showing) {
    return (
      <>
        {createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-lg">{children}</div>
          </div>,
          document.body,
        )}
      </>
    );
  } else {
    return null;
  }
};

export default App;

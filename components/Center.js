import { useSession, signOut } from "next-auth/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
]

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])
  
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));

    } else {
      console.log("No access token")
    }
  }, [spotifyApi, playlistId]);
  
  return (
    <div className="flex-grow scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div onClick={signOut} className="flex items-center space-x-3 bg-black opacity-100 hover:opacity-60 hover:text-gray-600 cursor-pointer rounded-full p-1 pr-2">
          <img className="rounded-full w-10 h-10" src={session?.user.image} alt={session?.user.name} />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <img
          src={playlist?.images?.[0]?.url} 
          className="w-44 h-44 shadow-2xl"
          />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>
      <Songs />
    </div>
  )
}

export default Center

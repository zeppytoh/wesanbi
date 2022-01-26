import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from 'react';
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";
import { RewindIcon, ReplyIcon, FastForwardIcon, VolumeUpIcon } from "@heroicons/react/outline";
import { SwitchHorizontalIcon, PlayIcon, PauseIcon } from "@heroicons/react/solid";
import { Volume1, Volume2 } from 'react-feather';

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        setCurrentIdTrack(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //fetch the song info
      console.log('Just before fetchCurrentSong');
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
      console.log(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => { });
    }, 300),
    []
  )
  
  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-800 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-t-2 border-slate-800">
      {/* left */}
      <div className="flex items-center space-x-4">
        <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-evenly cursor-pointer">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
            <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <Volume1 className="button" onClick={()=> volume > 0 && setVolume(volume - 10)} />
        <input className="w-4 md:w-28" type="range" value={volume} onChange={e => setVolume(Number(e.target.value))} min={0} max={100} />
        <Volume2 className="button" onClick={()=> volume < 100 && setVolume(volume + 10)} />
      </div>
    </div>
  )
}

export default Player;

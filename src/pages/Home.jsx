import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TrackContainer from '../components/TrackContainer';
import ResultTrack from '../components/ResultTrack';
import Track from '../components/Track';
import { useNavigate } from 'react-router-dom';
import spinner from "../assets/spinner-solid.svg";
import albumPlaceholder from "../assets/album_placeholder.png";
import editIcon from "../assets/edit-icon.svg"; // Make sure to import your edit icon
import MyPlaylistStyles from "../styles/MyPlaylist.module.css";

const Home = ({ search, setSearch, onSubmit, tracks, setTracks, submitPlaylist, playListName, setPlayListName, selectedTracks, setSelectedTracks, isLoading, albumCover, setAlbumCover}) => {
    
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    function handleImageUpload() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAlbumCover(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    function handleAddTrack(track) {
        if (selectedTracks.find(currTrack => currTrack.id === track.id)) {
            return;
        }
        setSelectedTracks(prev => [track, ...prev]);
        console.log(track);
    }

    function handleRemoveTrack(id) {
        setSelectedTracks(prev => prev.filter(track => track.id !== id));
    }

    useEffect(() => {
        if (!window.localStorage.getItem("token")) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, [navigate]);

    const buttonStyles = {
        backgroundColor: "#f230ac",
        color: "#fff",
        border: "none",
        padding: "15px 20px",
        borderRadius: "10px",
        fontWeight: "bold",
        marginTop: 10,
        cursor: "pointer"
    }

    const playListInputStyles = {
        padding: 10,
        border: "1px solid grey",
        marginBottom: "20px",
        width: "100%",
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center"
    }

    return (
        <div className='App'>
            <main>
                <SearchBar onSubmit={onSubmit} search={search} setSearch={setSearch} />
                <p>Add your favorite music to your Spotify playlist below.</p>
                <div style={{ display: "flex", alignItems: "start", gap: 30, marginTop: 30 }}>
                    {/* Results Container */}
                    <TrackContainer width={600} title={"Results"}>
                        {(tracks.length === 0 && isLoading) && (<img src={spinner} className='loader' />)}
                        {(!isLoading && tracks.length === 0) && (<p className='suggestion-text'>Tracks will appear here if you search.</p>)}

                        {tracks.map((track, id) => (
                            <ResultTrack
                                selected={selectedTracks.some(selectedTrack => selectedTrack.id === track.id)}
                                imgSrc={track.album.images[0].url}
                                key={id}
                                onClickHandler={handleAddTrack}
                                track={track}
                                trackTitle={track.name}
                                artistName={track.artists[0].name}
                                albumName={track.album.name}
                            />
                        ))}
                    </TrackContainer>

                    {/* Playlist Container */}
                    <TrackContainer width={350} title={"My playlist"}>
                        {selectedTracks.length > 0 && (
                            <div className={MyPlaylistStyles.playlistInfoContainer}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                                <div className={MyPlaylistStyles.albumCoverContainer} onClick={handleImageUpload}>
                                    <img
                                        className={MyPlaylistStyles.albumCover}
                                        src={albumCover}
                                        alt="Album Cover"
                                    />
                                    <div className={MyPlaylistStyles.overlay}>
                                        <img src={editIcon} alt="Edit" className={MyPlaylistStyles.editIcon} />
                                    </div>
                                </div>
                                {albumCover !== albumPlaceholder && (<p className={MyPlaylistStyles.discardImage} onClick={()=>{setAlbumCover(albumPlaceholder)}}>Discard Image</p>)}
                                <label htmlFor="playListName">Name your playlist:</label>
                                <input
                                    placeholder='Best Playlist'
                                    id='playListName'
                                    value={playListName}
                                    onChange={(e) => { setPlayListName(e.target.value); }}
                                    style={playListInputStyles}
                                    type="text"
                                />
                            </div>
                        )}

                        {selectedTracks.map((track, id) => (
                            <Track
                                selected={true}
                                key={id}
                                imgSrc={track.album.images[0].url}
                                onClickHandler={handleRemoveTrack}
                                id={track.id}
                                trackTitle={track.name}
                                artistName={track.artists[0].name}
                                albumName={track.album.name}
                            />
                        ))}

                        {selectedTracks.length > 0 && (
                            <button onClick={submitPlaylist} style={buttonStyles}>
                                Save to Spotify
                            </button>
                        )}

                        {selectedTracks.length === 0 && (
                            <p className='suggestion-text'>Add songs to your tracklist!</p>
                        )}
                    </TrackContainer>
                </div>
            </main>
        </div>
    );
}

export default Home;

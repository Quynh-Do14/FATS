'use client'
import React, { useEffect, useRef, useState } from 'react';

// Type declarations for YouTube IFrame API
declare global {
    interface Window {
        YT: {
            Player: new (
                elementId: string,
                options: {
                    height: string;
                    width: string;
                    videoId: string;
                    events: {
                        onReady: (event: { target: YT.Player }) => void;
                        onStateChange: (event: { data: number }) => void;
                    };
                }
            ) => YT.Player;
            PlayerState: {
                ENDED: number;
                PLAYING: number;
                PAUSED: number;
                BUFFERING: number;
                CUED: number;
            };
        };
        onYouTubeIframeAPIReady: () => void;
    }

    interface YT {
        Player: YT.Player;
    }

    namespace YT {
        interface Player {
            playVideo: () => void;
            pauseVideo: () => void;
            seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
            getCurrentTime: () => number;
            getPlayerState: () => number;
            getDuration: () => number;
        }
    }
}

const YouTubePlayer = () => {
    const playerRef = useRef<YT.Player | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [playerState, setPlayerState] = useState<string>('UNSTARTED');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const videoId = 'zg5SUXqHQnA'; // Extracted from your YouTube URL

    // Load YouTube API script
    useEffect(() => {
        if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            // Script already exists
            initializePlayer();
            return;
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        // Try to insert after first script tag, fallback to head
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag?.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            document.head.appendChild(tag);
        }

        window.onYouTubeIframeAPIReady = initializePlayer;

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Initialize YouTube player
    const initializePlayer = () => {
        if (!window.YT) {
            console.error('YouTube API not loaded');
            return;
        }

        playerRef.current = new window.YT.Player('youtube-player', {
            height: '390',
            width: '640',
            videoId: videoId,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    };

    // When player is ready
    const onPlayerReady = (event: { target: YT.Player }) => {
        setDuration(event.target.getDuration());

        // Update current time every second
        intervalRef.current = setInterval(() => {
            const time = event.target.getCurrentTime();
            setCurrentTime(time);
        }, 1000);
    };

    // Handle player state changes
    const onPlayerStateChange = (event: { data: number }) => {
        const states = {
            0: 'ENDED',
            1: 'PLAYING',
            2: 'PAUSED',
            3: 'BUFFERING',
            5: 'CUED'
        };
        setPlayerState(states[event.data as keyof typeof states] || 'UNKNOWN');
    };

    // Format time from seconds to MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="youtube-container" style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div id="youtube-player"></div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <strong>Current:</strong> {formatTime(currentTime)}
                </div>
                <div>
                    <strong>Duration:</strong> {formatTime(duration)}
                </div>
                <div>
                    <strong>Status:</strong> {playerState}
                </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => playerRef.current?.playVideo()}
                    disabled={playerState === 'PLAYING'}
                >
                    Play
                </button>
                <button
                    onClick={() => playerRef.current?.pauseVideo()}
                    disabled={playerState !== 'PLAYING'}
                >
                    Pause
                </button>
                <button onClick={() => playerRef.current?.seekTo(currentTime + 10, true)}>
                    +10s
                </button>
                <button onClick={() => playerRef.current?.seekTo(currentTime - 5, true)}>
                    -5s
                </button>
                <button onClick={() => playerRef.current?.seekTo(0, true)}>
                    Restart
                </button>
            </div>
        </div>
    );
};

export default YouTubePlayer;
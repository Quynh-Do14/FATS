'use client'
import React, { useEffect, useRef, useState } from 'react';
import '@/assets/styles/page/watch.css';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import { ROUTE_PATH } from '@/core/common/appRouter';

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

const SlugWatch = () => {
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
            height: '100%',
            width: '100%',
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
    const [showRewardButton, setShowRewardButton] = useState(true);

    return (
        <div className="slug-watch-container">
            <div className="padding-common">
                <BreadcrumbCommon
                    breadcrumb={"Xem video"}
                    redirect={ROUTE_PATH.WATCH}
                    title={""}
                />
                <div className="w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">YouTube Rewards</span>
                        </h1>
                        <p className="text-white/80 text-xl">Xem video đầy đủ 15 giây để nhận phần thưởng hấp dẫn!</p>
                    </div>

                    {/* Main Content */}
                    <div className="glass-card rounded-3xl p-8 mb-6">
                        {/* Status Indicator */}
                        <div className="flex items-center justify-center mb-6">
                            <div className="status-indicator status-watching px-6 py-3 rounded-full text-white font-semibold text-lg">
                                <span>Xem video nhận thưởng</span>
                            </div>
                        </div>

                        {/* Video Container */}
                        <div className="video-container">
                            <div id="youtube-player"></div>
                        </div>

                        {/* Progress Section */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-1 mb-4">
                                <span className="text-white/70 font-medium">Tiến trình xem:</span>
                                <span id="timeDisplay" className="countdown-text text-2xl text-white">{formatTime(currentTime)}</span>
                            </div>

                            <div id="progressText" className="text-white/80 text-lg mb-6">
                                Vui lòng xem video trong <span id="remainingTime" className="font-bold text-yellow-400">15 giây</span> để nhận thưởng
                            </div>
                        </div>

                        {/* Reward Button */}
                        <div className="text-center">
                            <button
                                id="rewardButton"
                                className={`reward-button px-12 py-4 rounded-full text-white font-bold text-xl pulse-ring ${showRewardButton ? '' : 'hidden'}`}
                            // onClick={claimReward}
                            >
                                🎁 Nhận Thưởng Ngay!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlugWatch;
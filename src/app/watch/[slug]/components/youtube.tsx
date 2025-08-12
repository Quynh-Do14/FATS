'use client'
import { ROUTE_PATH } from '@/core/common/appRouter';
import DialogConfirmCommon from '@/infrastructure/common/components/modal/dialogConfirm';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import attendanceService from '@/infrastructure/repositories/attendance/attendance.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

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

type Props = {
    slug: string;
    detail: any;
    videoId: string | null;
}
const YoutubeVideo = (props: Props) => {
    const { slug, detail, videoId } = props;
    const playerRef = useRef<YT.Player | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [timeCounter, setTimeCounter] = useState<number>(0);
    const [showRewardButton, setShowRewardButton] = useState<boolean>(false);
    const [isWatched, setIsWatched] = useState<boolean>(false);
    const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [playerState, setPlayerState] = useState<string>('UNSTARTED');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter()

    const onCheckInVideoAsync = async () => {
        if (showRewardButton && !isWatched) {
            try {
                await attendanceService.CheckInVideo(
                    slug,
                    () => {
                        setIsWatched(true);
                        setShowRewardButton(false);
                        setIsModalSuccess(true)
                    },
                    setLoading
                ).then(() => { })
            }
            catch (error) {
                console.error(error)
            }
        }
    }
    const closeModalSuccess = () => {
        setIsModalSuccess(false);
    }
    const onBack = () => {
        router.push(ROUTE_PATH.WATCH);
    }
    // Load YouTube API script
    useEffect(() => {
        if (videoId) {
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
        }
        return
    }, [videoId]);

    // Initialize YouTube player
    const initializePlayer = () => {
        if (!window.YT) {
            console.error('YouTube API not loaded');
            return;
        }
        if (videoId) {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        }
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
        const newState = states[event.data as keyof typeof states] || 'UNKNOWN';
        setPlayerState(newState);
        console.log("Player state changed to:", newState);
    };

    useEffect(() => {
        // Clear interval cũ trước khi tạo mới
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Chỉ đếm thời gian khi PLAYING
        if (playerState === 'PLAYING') {
            intervalRef.current = setInterval(() => {
                setTimeCounter(prev => prev + 1);
            }, 1000);
        }

        // Cleanup khi component unmount hoặc state thay đổi
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [playerState]);

    useEffect(() => {
        if (timeCounter >= 35) {
            setShowRewardButton(true);
        }
        else {
            setShowRewardButton(false);
        }
    }, [timeCounter]);


    // Format time from seconds to MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    return (
        <div className="w-full flex flex-col gap-4">
            <BreadcrumbCommon
                breadcrumb={"Xem Video"}
                redirect={ROUTE_PATH.WATCH}
                title={detail.title}
            />
            {/* Header */}
            <div className="text-center">
                <h1 className="text-5xl font-semibold text-white">
                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent font-bold">
                        {detail.title}
                    </span>
                </h1>
            </div>

            {/* Main Content */}
            <div className="glass-card rounded-3xl p-6">
                {/* Status Indicator */}

                {/* Video Container */}
                <div className="video-container">
                    <div id="youtube-player"></div>
                </div>

                {/* Progress Section */}
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-1 mb-4">
                        <span className="text-white/70 font-medium">Thời gian xem:</span>
                        <span id="timeDisplay" className="countdown-text text-2xl text-white">{formatTime(timeCounter)}</span>
                    </div>

                    <div id="progressText" className="text-white/80 text-lg mb-6">
                        Vui lòng xem video trong <span id="remainingTime" className="font-semibold text-yellow-400">35 giây</span> để nhận thưởng
                    </div>
                </div>

                {/* Reward Button */}
                <div className="text-center">
                    <button
                        id="rewardButton"
                        className={`reward-button px-12 py-4 rounded-full text-white font-semibold text-xl pulse-ring ${!showRewardButton || isWatched ? 'hidden' : ''}`}
                        onClick={onCheckInVideoAsync}
                    >
                        Nhận Thưởng Ngay!
                    </button>
                </div>
            </div>
            <DialogConfirmCommon
                message={"Bạn đã lấy xu thành công"}
                titleCancel={"Xem tiếp"}
                titleOk={"Quay lại"}
                visible={isModalSuccess}
                handleCancel={closeModalSuccess}
                handleOk={onBack}
                title={"Lấy xu thành công"}
            />
        </div>
    )
};

export default YoutubeVideo
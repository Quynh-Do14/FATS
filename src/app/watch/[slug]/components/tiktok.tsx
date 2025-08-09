'use client'
import { ROUTE_PATH } from '@/core/common/appRouter';
import DialogConfirmCommon from '@/infrastructure/common/components/modal/dialogConfirm';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import attendanceService from '@/infrastructure/repositories/attendance/attendance.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    slug: string;
    detail: any;
    videoId: string | null;
}

const TikTokVideo = (props: Props) => {
    const { slug, detail, videoId } = props;
    const [timeCounter, setTimeCounter] = useState<number>(0);
    const [showRewardButton, setShowRewardButton] = useState<boolean>(false);
    const [isWatched, setIsWatched] = useState<boolean>(false);
    const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

    // Bắt đầu đếm thời gian xem
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeCounter(prev => prev + 1);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (timeCounter >= 15) {
            setShowRewardButton(true);
        } else {
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
                {/* Video Container */}
                <div className="tiktok-container relative aspect-[9/16] max-w-md mx-auto">
                    <iframe
                        ref={iframeRef}
                        src={`https://www.tiktok.com/embed/v2/${videoId}`}
                        className="w-full h-full rounded-lg"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Progress Section */}
                <div className="text-center mb-4 mt-6">
                    <div className="flex items-center justify-center gap-1 mb-4">
                        <span className="text-white/70 font-medium">Thời gian xem:</span>
                        <span id="timeDisplay" className="countdown-text text-2xl text-white">{formatTime(timeCounter)}</span>
                    </div>

                    <div id="progressText" className="text-white/80 text-lg mb-6">
                        Vui lòng xem video trong <span id="remainingTime" className="font-semibold text-yellow-400">15 giây</span> để nhận thưởng
                    </div>
                </div>

                {/* Reward Button */}
                <div className="text-center">
                    <button
                        id="rewardButton"
                        className={`reward-button px-12 py-4 rounded-full text-white font-semibold text-xl pulse-ring ${!showRewardButton || isWatched ? 'hidden' : ''}`}
                        onClick={onCheckInVideoAsync}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Nhận Thưởng Ngay!'}
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

export default TikTokVideo;
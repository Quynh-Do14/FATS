"use client"
import React from "react"
import introduction from "@/assets/images/banner4.gif"
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign'
import TitleComponent from '@/infrastructure/common/components/controls/TitleComponent'
import { useEffect, useState } from "react";
import { isTokenStoraged } from "@/infrastructure/utils/storage";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { useRouter } from "next/navigation";
import { configFileURL, configImageURL, getEmbedUrl } from "@/infrastructure/helper/helper"
const IntroductionComponent = () => {
    const [token, setToken] = useState<boolean>(false);
    const [isLoadingToken, setIsLoadingToken] = useState<boolean>(false);

    const router = useRouter();
    const url = "https://www.youtube.com/watch?v=zg5SUXqHQnA";
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const tokenS = await isTokenStoraged();
                setToken(tokenS);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingToken(true);
            }
        };

        fetchToken();
    }, []);
    const onNavigate = () => {
        if (isLoadingToken) {
            if (token) {
                router.push(ROUTE_PATH.GOAL_SPENDING_PAGE);
            }
            else {
                router.push(ROUTE_PATH.LOGIN);
            }
        }
    }

    return (
        <div className="introduction">
            <TitleComponent
                title={'AI & Tự Động Hóa'}
                color={'black'}
            />
            <div className="title top">
                <div>
                    <h1>FATS AI - Gia tăng giá trị tài chính</h1>
                </div>
                <p className="sub top">Đồng Hành Cùng Bạn Trên Hành Trình Tài Chính Bền Vững</p>
            </div>
            <div className='flex gap-2 justify-center'>
                <ButtonDesign
                    width={180}
                    classColor={'green'}
                    title={'Bắt đầu ngay'}
                    onClick={onNavigate}
                />
                {/* <ButtonDesign
                    width={180}
                    classColor={'transparent'}
                    title={'Liên hệ tư vấn'}
                    onClick={() => { }}
                /> */}
            </div>
            {/* <img src={introduction.src} alt="" className="img top" /> */}
            {/* <video width="100%" height="auto" autoPlay muted loop playsInline controls>
                <source src={configFileURL("heroVideo.mp4")} type="video/mp4" />
            </video> */}

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                    src={getEmbedUrl(url)}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="YouTube video"
                />
            </div>
        </div >
    )
}

export default IntroductionComponent
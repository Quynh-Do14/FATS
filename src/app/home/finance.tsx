"use client"
import React, { useEffect, useRef, useState } from 'react'
import thumb1 from "@/assets/images/thumbnail/thumb1.png"
import thumb2 from "@/assets/images/thumbnail/thumb2.png"
import thumb3 from "@/assets/images/thumbnail/thumb3.png"
import { Col, Row } from 'antd'
import TitleComponent from '@/infrastructure/common/components/controls/TitleComponent'
import { configFileURL, configImageURL } from '@/infrastructure/helper/helper'

const finance = [
    {
        title: "AI tự động phân loại các thu nhập, chi phí",
        sub: "FATS AI sẽ tự động phân loại, giúp bạn quản lý tài chính cá nhân nhanh chóng và chính xác hơn",
        img: thumb1
    },
    {
        title: "AI tự động cảnh báo dòng tiền âm",
        sub: "FATS AI Theo dõi dòng tiền liên tục và nhận cảnh báo ngay khi chi tiêu vượt mức an toàn",
        img: thumb2
    },
    {
        title: "AI kiểm soát mục tiêu tiết kiệm theo nhóm",
        sub: "FATS AI hỗ trợ bạn lập kế hoạch tiết kiệm theo nhóm, theo dõi tiến độ và tự động phân bổ mục tiêu cho từng thành viên",
        img: thumb3
    },
]

// Component animation scroll
const AnimateOnScroll = ({ children }: any) => {
    const ref = useRef<any>(null);
    const [show, setShow] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true)
                    observer.unobserve(ref.current)
                }
            },
            { threshold: 0.2 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className={`finance-animate ${show ? 'show' : ''}`}>
            {children}
        </div>
    )
}

const FinanceComponent = () => {
    return (
        <div className="finance">
            <TitleComponent
                title={'FATS AI – Tài chính cá nhân'}
                color={'black'}
            />
            <Row gutter={[20, 20]} className='finance-content'>
                {finance.map((item, index) => (
                    <Col span={24} key={index}>
                        <AnimateOnScroll>
                            <Row gutter={[0, 20]} align="middle" justify="space-between">
                                {index % 2 === 0 ? (
                                    <>
                                        <Col xs={24} md={11}>
                                            <h3 className='title'>{item.title}</h3>
                                            <h4 className='sub'>{item.sub}</h4>
                                        </Col>
                                        <Col xs={24} md={11}>
                                            <img src={item.img.src} alt="" className='finance-img' />
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <Col xs={24} md={11}>
                                            <img src={item.img.src} alt="" className='finance-img' />
                                        </Col>
                                        <Col xs={24} md={11}>
                                            <h3 className='title'>{item.title}</h3>
                                            <h4 className='sub'>{item.sub}</h4>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </AnimateOnScroll>
                    </Col>
                ))}
                <Col span={24}>
                    <AnimateOnScroll>
                        <Row gutter={[0, 20]} align="middle" justify="space-between">
                            <Col xs={24} md={11}>
                                <video width="100%" height="auto" autoPlay muted loop playsInline controls>
                                    <source src={configFileURL("manual.mp4")} type="video/mp4" />
                                </video>
                            </Col>
                            <Col xs={24} md={11}>
                                <h3 className="title">Chào mừng đến với FATS</h3>
                                <h4 className="sub">Cùng khám phá cách quản lý tài chính thông minh</h4>
                            </Col>
                        </Row>
                    </AnimateOnScroll>
                </Col>
            </Row>
        </div>
    )
}

export default FinanceComponent

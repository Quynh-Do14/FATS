"use client"
import TypingIndicator from '@/infrastructure/common/components/controls/Typing'
import { convertDateOnlyShow } from '@/infrastructure/helper/helper'
import React, { useEffect, useRef, useState } from 'react'
import gptIcon from "@/assets/images/AI/ai1.png"
import "@/assets/styles/page/advisor.css"
import advisorService from '@/infrastructure/repositories/advisor/advisor.service'
import LayoutClientNoFooter from '@/infrastructure/common/Layouts/Client-Layout-NoFooter'
import Constants from '@/core/common/constants'
import { Tooltip } from 'antd'
import Link from 'next/link'
import { ROUTE_PATH } from '@/core/common/appRouter'
import ReactMarkdown from "react-markdown";
import DialogNotificationCommon from '@/infrastructure/common/components/modal/dialogNotification'
import { useRouter } from 'next/navigation'
import DialogNotificationCommon2 from '@/infrastructure/common/components/modal/dialogNotification2'

interface ScheduleItem {
    time: string;
    activity: string;
    cost?: string;
    location?: string;
    reason?: string;
}
interface PlanData {
    title: string;
    budget: string;
    date: string;
    group_size: string;
    location: string;
    notes: string;
    schedule: ScheduleItem[];
    summary: string;
    weather: string;
}

interface Message {
    type: "user" | "question" | "plan" | "otherMessage";
    userMessage?: string | null;
    otherMessage?: {
        otherMessage: string;
    };
    planData?: {
        plan: PlanData | null;
    }
    questionData?: {
        question: string;
        custom_input?: {
            enabled: boolean;
            placeholder: string;
            validation: string;
        };
        options?: Array<{
            text: string;
            value: string;
        }>;
    };
}

const AdvisorPage = () => {
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
    const [dataChatBox, setDataChatBox] = useState<Array<Message>>([]);
    const [loading, setLoading] = useState(false);
    const [messagesLoading, setMessagesLoading] = useState<string>("");
    const [messages, setMessages] = useState<string>("");
    const [loadingBot, setLoadingBot] = useState(false);
    const [genaralQuestion, setGenaralQuestion] = useState<string[]>([]);
    const [isModalError, setIsModalError] = useState<boolean>(false);
    const router = useRouter()
    const onGetChatBoxAsync = async () => {
        try {
            await advisorService.GetAdvisorEntertainment(
                {},
                setLoading
            ).then((res) => {
                setDataChatBox(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        onGetChatBoxAsync().then(_ => { });
    }, []);

    const handleSendMessage = async (option: string) => {
        const question = option ? option : messages
        setTimeout(() => {
            scrollToBottom(); // Cuộn xuống sau khi tin nhắn được cập nhật
        }, 100);
        setMessages("");
        try {
            await advisorService.AddAdvisorEntertainment(
                {
                    question: question
                },
                async () => {
                    setMessagesLoading("");
                    onGetChatBoxAsync().then(_ => { });
                },
                () => {
                    setIsModalError(true)
                },
                setLoadingBot,
            ).then(() => {
            });
        }
        catch (error) {
            console.error(error);
        }
    };

    const onCloseModalError = () => {
        setIsModalError(false);
        router.push(ROUTE_PATH.WATCH)
    };
    const onSelectOption = (option: any) => {
        if (option.value) {
            handleSendMessage(option.text);
            setMessagesLoading(option.text);
        }
    };

    const onSelectGeneralQuestion = (option: string) => {
        handleSendMessage(option);
        setMessagesLoading(option);
    };

    const scrollToBottom = () => {
        chatBoxRef.current?.scrollTo({
            top: chatBoxRef.current.scrollHeight,
            behavior: "smooth"
        });
    };

    const onChangeText = (e: any) => {
        setMessages(e.target.value)
        setMessagesLoading(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom(); // Cuộn xuống sau khi tin nhắn được cập nhật
        }, 100);
        const chatBox = chatBoxRef.current;
        if (!chatBox) return;

        const handleScroll = () => {
            const isNearBottom = chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 50;
            setIsAtBottom(isNearBottom);
        };

        chatBox.addEventListener("scroll", handleScroll);

        return () => {
            chatBox.removeEventListener("scroll", handleScroll);
        };
    }, [loading]);

    useEffect(() => {
        function getRandomQuestions(questions: string[], count = 3) {
            const shuffled = [...questions].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        const data = Constants.GeneralQuestion.Entertainment;
        const randomQuestions = getRandomQuestions(data);
        setGenaralQuestion(randomQuestions);
    }, []);

    return (
        <LayoutClientNoFooter>
            <div className="advisor-container">
                <div className="padding-common">
                    <div className="header">
                        <img src={gptIcon.src} alt="" />
                        <div className="status-container">
                            <div className="title">Vibie Tư Vấn Giải Trí</div>
                            <div className="status-line">
                                <span className="dot" />
                                <span className="status-text">Online</span>
                            </div>
                        </div>
                        <Tooltip title="Sử dụng AI tư vấn đầu tư Finora">
                            <Link href={ROUTE_PATH.ADVISOR_INVEST}>
                                <i className="fa fa-refresh text-[#999] text-[20px] cursor-pointer rotate" aria-hidden="true"></i>
                            </Link>
                        </Tooltip>
                        <div className="type-chat">
                            <Link href={ROUTE_PATH.ADVISOR_INVEST}>
                                <p>Sử dụng AI tư vấn đầu tư Finora</p>
                            </Link>
                        </div>
                    </div>
                    <div className="chat-box" ref={chatBoxRef}>
                        {dataChatBox.map((message, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                {
                                    message.type === "user"
                                        ?
                                        <div className={`flex flex-col items-end`}>
                                            <div className="human-chat">
                                                {message.userMessage}
                                            </div>
                                        </div>
                                        :
                                        message.type === "question"
                                            ?
                                            <div key={index} className={`flex flex-col items-start justify-start gap-2`}>
                                                <div className="ai-chat">
                                                    {message.questionData?.question}
                                                </div>
                                                <div className='option'>
                                                    <ul>
                                                        {
                                                            message.questionData?.options?.map((option, index) => (
                                                                <li
                                                                    key={index}
                                                                    onClick={() => onSelectOption(option)}
                                                                >
                                                                    {option.text}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>

                                                </div>
                                            </div>
                                            :
                                            message.type === "plan"
                                                ?
                                                <div className="plan-container">
                                                    <div className="plan-header">
                                                        <h2 className="plan-title">{message.planData?.plan?.title}</h2>
                                                        <div className="plan-meta">
                                                            <span className="plan-date">{convertDateOnlyShow(message.planData?.plan?.date)}</span>
                                                            <span>|</span>
                                                            <span className="plan-budget">{message.planData?.plan?.budget}</span>
                                                            <span>|</span>
                                                            <span className="plan-weather">{message.planData?.plan?.weather}</span>
                                                        </div>
                                                    </div>

                                                    <div className="plan-summary">
                                                        <p>{message.planData?.plan?.summary}</p>
                                                    </div>

                                                    {message.planData?.plan?.schedule && (
                                                        <div className="plan-schedule">
                                                            <h3 className="schedule-title">Lịch trình</h3>
                                                            <div className="schedule-items">
                                                                {message.planData?.plan?.schedule?.map((item, index) => (
                                                                    <div key={index} className="schedule-item">
                                                                        <div className="schedule-time-container">
                                                                            <div className="schedule-time">{item.time}</div>
                                                                        </div>
                                                                        <div className="schedule-content">
                                                                            <h4>{item.activity}</h4>
                                                                            {item.location && (
                                                                                <p className="schedule-detail">
                                                                                    <span className="icon-container location-icon">
                                                                                        <i className="fa-solid fa-location-dot"></i>
                                                                                    </span>
                                                                                    {item.location}
                                                                                </p>
                                                                            )}
                                                                            {item.cost && (
                                                                                <p className="schedule-detail">
                                                                                    <span className="icon-container cost-icon">
                                                                                        <i className="fa-solid fa-coins"></i>
                                                                                    </span>
                                                                                    {item.cost}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                :
                                                message.type === "otherMessage"
                                                    ?
                                                    <div className="ai-chat">
                                                        <ReactMarkdown>{message.otherMessage?.otherMessage}</ReactMarkdown>
                                                    </div>
                                                    :
                                                    null
                                }
                            </div>
                        ))}
                        {
                            loadingBot
                                ?
                                <div
                                    className="flex flex-col gap-2"
                                >

                                    <div
                                        className={`flex justify-end`}
                                    >
                                        <div
                                            className="human-chat"
                                        >
                                            {messagesLoading}
                                        </div>

                                    </div>
                                    <div

                                        className={`flex justify-start`}
                                    >
                                        <div
                                            className="ai-chat"
                                        >
                                            <TypingIndicator />
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                    {!isAtBottom && (
                        <button className="scroll-button" onClick={scrollToBottom}>
                            <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        </button>
                    )}

                    <div className='general-question'>
                        <ul>
                            {
                                genaralQuestion.map((item, index) => {
                                    return (
                                        <li key={index}
                                            onClick={() => onSelectGeneralQuestion(item)}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="input-chat">
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn của bạn..."
                            value={messages}
                            onChange={onChangeText}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage("")}
                        />
                        <button onClick={() => handleSendMessage("")}>
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
            <DialogNotificationCommon2
                visible={isModalError}
                title={'Bạn đã hết xu'}
                message={'Bạn cần có ít nhất 5 xu để sử dụng tính năng này'}
                titleCancel={'Lấy thêm xu'}
                handleCancel={() => setIsModalError(false)}
                onOk={onCloseModalError}
            />
        </LayoutClientNoFooter >
    )
}

export default AdvisorPage
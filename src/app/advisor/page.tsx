"use client"
import TypingIndicator from '@/infrastructure/common/components/controls/Typing'
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout'
import { configImageURL, convertDateShow } from '@/infrastructure/helper/helper'
import { Tooltip } from 'antd'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import gptIcon from "@/assets/images/gpt-icon.png"
import "@/assets/styles/page/advisor.css"

const AdvisorPage = () => {
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
    const [dataChatBox, setDataChatBox] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState<string>("");
    const [messages, setMessages] = useState<string>("");

    const scrollToBottom = () => {
        chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
    };

    const onChangeText = (e: any) => {
        setMessages(e.target.value)
        setMessagesLoading(e.target.value)
    }

    const sendMessage = () => {
        setTimeout(() => {
            scrollToBottom(); // Cuộn xuống sau khi tin nhắn được cập nhật
        }, 100);
    };

    return (
        <LayoutClient>
            <div className="advisor-container">
                <div className="padding-common">
                    <div className="chat-box-container" >
                        <div className="header">
                            <img src={gptIcon.src} alt="" />
                            <div className="status-container">
                                <div className="title">ChatBot Tư Vấn</div>
                                <div className="status-line">
                                    <span className="dot" />
                                    <span className="status-text">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="chat-box" ref={chatBoxRef}>
                            {dataChatBox.map((message, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <div className={`flex flex-col items-end`}>
                                        <div className="human-name">
                                            {message.name}
                                        </div>
                                        <Tooltip title={convertDateShow(message.createdAt)} color="#003333">
                                            {
                                                message.chatType === "TEXT"
                                                    ?
                                                    <div className="human-chat">
                                                        {message.userMessage}
                                                    </div>
                                                    :
                                                    <div className="human-chat-img">
                                                        <Image src={configImageURL(message.userMessage)} alt="" />
                                                    </div>
                                            }
                                        </Tooltip>
                                    </div>
                                    <div key={index} className={`flex justify-start`}>
                                        <Tooltip title={convertDateShow(message.createdAt)} color="#666666">
                                            <div className="ai-chat">
                                                {message.botMessage}
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                            {
                                loading
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
                        <div className="input-chat">
                            <input
                                type="text"
                                placeholder="Nhập tin nhắn của bạn..."
                                value={messages}
                                onChange={onChangeText}
                                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button onClick={sendMessage}>
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutClient>
    )
}

export default AdvisorPage
import ChatBoxCommon from ".";
import "@/assets/styles/page/chat.css"
type Props = {
    titleChat: string
    isOpenChatBox: boolean
    setIsOpenChatBox: Function
    dataChatBox: Array<any>
    handleSendMessage: () => void
    messagesLoading: string
    setMessagesLoading: Function
    messages: string
    setMessages: Function
    loading: boolean
    idGoal: string
    idTeam?: string
    setLoading: (loading: boolean) => void
}

const ChatButton = (props: Props) => {
    const {
        titleChat,
        isOpenChatBox,
        setIsOpenChatBox,
        dataChatBox,
        handleSendMessage,
        messagesLoading,
        setMessagesLoading,
        messages,
        setMessages,
        loading,
        idGoal,
        idTeam = "",
        setLoading
    } = props;

    const handleCartClick = () => {
        setIsOpenChatBox(!isOpenChatBox)
    };
    return (
        <div className="chat-container">
            <div className="btn-chat" onClick={handleCartClick}>
                <div>
                    <i className="fa fa-commenting" aria-hidden="true"></i>
                </div>
            </div>
            <div className="chat-tooltip">Trợ lý tài chính Moola</div>
            <ChatBoxCommon
                titleChat={titleChat}
                isOpen={isOpenChatBox}
                closeDrawer={() => setIsOpenChatBox(false)}
                loading={loading}
                dataChatBox={dataChatBox}
                handleSendMessage={handleSendMessage}
                messagesLoading={messagesLoading}
                setMessagesLoading={setMessagesLoading}
                messages={messages}
                setMessages={setMessages}
                idGoal={String(idGoal)}
                idTeam={String(idTeam)}
                setLoading={setLoading}
            />
            {/* <FullPageLoading isLoading={loading} /> */}
        </div>
    );
};

export default ChatButton;

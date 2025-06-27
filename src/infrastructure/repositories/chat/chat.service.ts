import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class ChatService {

    async GetChatPersonal(id: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Chat.Personal.Get}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    async AddChatPersonal(id: string, data: object, onBack: Function, setLoading: (loading: boolean) => void, onError: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.Chat.Personal.Add}`,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Gửi tin nhắn không thành công", error.response.data.message)
            if (error.status == 509) {
                onError()
            }
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async GetBillPersonal(id: string, data: any, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .postForm(`${Endpoint.Chat.Personal.GetBill}`,
                    data
                )
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };


    async GetChatTeam(idGoal: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Chat.Team.Get}/${idGoal}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    async AddChatTeam(idGoal: string, data: object, onBack: Function, setLoading: (loading: boolean) => void, onError: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.Chat.Team.Add}/${idGoal}`,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Gửi tin nhắn không thành công", error.response.data.message)
            console.error(error)
            if (error.status == 509) {
                onError()
            }
        } finally {
            setLoading(false);
        }
    }
}
const chatService = new ChatService();
export default chatService;

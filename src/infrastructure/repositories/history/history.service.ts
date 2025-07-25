import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class HistoryService {
    async HistorySpend(teamId: string, params: any, setLoading: (loading: boolean) => void) {
        const url = teamId ? `${Endpoint.History.Team.Spend}/${teamId}` : Endpoint.History.Personal.Spend
        setLoading(true)
        try {
            return await RequestService
                .get(url,
                    params
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
    async HistoryIncome(teamId: string, params: any, setLoading: (loading: boolean) => void) {
        const url = teamId ? `${Endpoint.History.Team.Income}/${teamId}` : Endpoint.History.Personal.Income
        setLoading(true)
        try {
            return await RequestService
                .get(url,
                    params
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
    async DeleteSpend(id: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.History.Personal.DeleteSpend}/${id}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    SuccessMessage("Xóa lịch sử thành công", "")
                    return response;
                });
        } catch (error: any) {
            FailMessage("Xóa lịch sử không thành công", error.response.data.message)

            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async DeleteIncome(id: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.History.Personal.DeleteIncome}/${id}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    SuccessMessage("Xóa lịch sử thành công", "")
                    return response;
                });
        } catch (error: any) {
            FailMessage("Xóa lịch sử không thành công", error.response.data.message)

            console.error(error)
        } finally {
            setLoading(false);
        }
    };
}

const historyService = new HistoryService();
export default historyService;
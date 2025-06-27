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
}

const historyService = new HistoryService();
export default historyService;
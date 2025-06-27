import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

interface AxiosError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

class SpendService {
    async GetSpend(idGoal: string, params: object, setLoading: (loading: boolean) => void) {
        setLoading(true)
        const url = idGoal ? `${Endpoint.Spending.Team.Get}/${idGoal}` : Endpoint.Spending.Personal.Get
        try {
            return await RequestService
                .get(url, {
                    ...params
                })
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
    async CreateSpend(idGoal: string, data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        const url = idGoal ? `${Endpoint.Spending.Team.Create}/${idGoal}` : Endpoint.Spending.Personal.Create
        try {
            return await RequestService
                .post(url,
                    { ...data }
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Thêm mới thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Thêm mới không thành công", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
}

const spendService = new SpendService();
export default spendService;
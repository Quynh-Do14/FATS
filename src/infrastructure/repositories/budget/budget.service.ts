import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class BudgetService {
    async GetBudget(setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Budget.Get)
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
    async CreateBudget(data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Budget.Create,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Cập nhật thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Cập nhật không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async UpdateBudget(data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .put(Endpoint.Budget.Update,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Cập nhật thành công", response.message)
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Cập nhật không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

const budgetService = new BudgetService();
export default budgetService;

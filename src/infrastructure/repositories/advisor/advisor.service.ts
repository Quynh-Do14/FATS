import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "@/infrastructure/common/components/toast/notificationToast";
import { RequestService } from "@/infrastructure/utils/response";
class AdvisorService {
    async GetAdvisorInvest(params: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Advisor.Invest.Get, {
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
    async AddAdvisorInvest(data: object, onBack: Function, onError: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Advisor.Invest.Add,
                    data
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
        } catch (error: any) {
            // FailMessage("Thêm mới không thành công", error.response.data.message)
            if (error.response.data.status == 1001) {
                onError()
            }
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async GetAdvisorEntertainment(params: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Advisor.Entertainment.Get, {
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
    async AddAdvisorEntertainment(data: object, onBack: Function, onError: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Advisor.Entertainment.Add,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        // SuccessMessage("Thêm mới thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            // FailMessage("Chat không", error.response.data.message)
            if (error.response.data.status == 1001) {
                onError()
            }
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

const advisorService = new AdvisorService();

export default advisorService;
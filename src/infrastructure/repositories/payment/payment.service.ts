import { Endpoint } from "@/core/common/apiLink";
import { FailMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class PaymentService {
    async Payment(params: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Subscription.Payment}${params}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async Subscription(idPackage: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.Subscription.Create}/${idPackage}`
                )
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Đăng kí gói không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async Package(setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Subscription.Package
                )
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

const paymentService = new PaymentService();
export default paymentService;

import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class IconService {
    async GetIcon(setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Icon.Get}`)
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

    async AddIcon(data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.Icon.Create}`,
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
        } catch (error: any) {
            FailMessage("Thêm mới không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async DeleteIcon(id: number, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Icon.Delete}/${id}`
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Xóa thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Xóa không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

const iconService = new IconService();
export default iconService;

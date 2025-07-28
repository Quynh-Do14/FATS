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

class TeamLogService {
    async GetTeamLog(id: string, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.get(`${Endpoint.TeamLog.Get}/${id}`);
            return response;
        } catch (error: unknown) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async UpdateTeamLog(
        id: string,
        confirm: boolean,
        onBack: () => void,
        setLoading: (loading: boolean) => void
    ) {
        setLoading(true);
        try {
            const response = await RequestService.put(`${Endpoint.TeamLog.Update}/${id}?confirm=${confirm}`,);
            if (response) {
                onBack();
                SuccessMessage("Cập nhật thành công", "");
            }
            return response;
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Cập nhật không thành công", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

}

const teamLogService = new TeamLogService();
export default teamLogService;

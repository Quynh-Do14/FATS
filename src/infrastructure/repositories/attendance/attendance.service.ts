import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "@/infrastructure/common/components/toast/notificationToast";
import { RequestService } from "@/infrastructure/utils/response";
class AttendanceService {
    async GetAttendanceLog(params: object, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Attendance.Get, {
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
    async CheckIn(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(Endpoint.Attendance.CheckIn,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Điểm danh hôm nay thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Điểm danh hôm nay không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async CheckInVideo(id: string, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Attendance.CheckInVideo}/${id}`)
                .then(response => {
                    if (response) {
                        onBack()
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Lấy xu không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

const attendanceService = new AttendanceService();

export default attendanceService;
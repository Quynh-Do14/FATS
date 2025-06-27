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

class TeamService {
    async GetTeam(params: Record<string, unknown>, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.get(Endpoint.Team.Get, { ...params });
            return response;
        } catch (error: unknown) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async GetTeamById(id: string, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.get(`${Endpoint.Team.GetById}/${id}`);
            return response;
        } catch (error: unknown) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async GetTeamMember(id: number, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.get(`${Endpoint.Team.Member}/${id}`);
            return response;
        } catch (error: unknown) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async AddMember(
        teamId: number,
        data: Record<string, unknown>,
        onBack: () => void,
        setLoading: (loading: boolean) => void
    ) {
        setLoading(true);
        try {
            const response = await RequestService.put(`${Endpoint.Team.AddMember}/${teamId}`, data);
            if (response) {
                onBack();
                SuccessMessage("Thêm thành viên thành công", "");
            }
            return response;
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Thêm thành viên không thành công", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async CreateTeam(
        data: Record<string, unknown>,
        onBack: () => void,
        setLoading: (loading: boolean) => void
    ) {
        setLoading(true);
        try {
            const response = await RequestService.postForm(Endpoint.Team.Create, data);
            if (response) {
                onBack();
                SuccessMessage("Thêm mới thành công", "");
            }
            return response;
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Thêm mới không thành công", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async UpdateTeam(
        id: string,
        data: Record<string, unknown>,
        onBack: () => void,
        setLoading: (loading: boolean) => void
    ) {
        setLoading(true);
        try {
            const response = await RequestService.putForm(`${Endpoint.Team.Update}/${id}`, data);
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

    async JoinTeam(
        id: string,
        teamId: string,
        onBack: () => void,
        setLoading: (loading: boolean) => void
    ) {
        setLoading(true);
        try {
            const response = await RequestService.post(`${Endpoint.Team.Join}/${id}?teamId=${teamId}`);
            if (response) {
                onBack();
                SuccessMessage("Xác nhận đã vào nhóm", "");
            }
            return response;
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Bạn chưa thể vào nhóm", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async LeaveTeam(id: string, onBack: () => void, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.delete(`${Endpoint.Team.Leave}/${id}`);
            if (response) {
                onBack();
                SuccessMessage("Bạn đã rời nhóm", "");
            }
            return response;
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Bạn không thể rời nhóm", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async DeleteTeam(id: string, onBack: () => void, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.delete(`${Endpoint.Team.Delete}/${id}`);
            if (response) {
                onBack();
                SuccessMessage("Nhóm đã bị xóa", "");
            }
            return response;
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Xóa nhóm không thành công", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async LockTeam(id: string, onBack: () => void, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.put(`${Endpoint.Team.Lock}/${id}`);
            if (response) {
                onBack();
                SuccessMessage("Nhóm đã bị khóa", "");
            }
            return response;
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Khóa nhóm không thành công", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async UnLockTeam(id: string, onBack: () => void, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.put(`${Endpoint.Team.UnLock}/${id}`);
            if (response) {
                onBack();
                SuccessMessage("Nhóm đã được mở", "");
            }
            return response;
        } catch (error: unknown) {
            const err = error as AxiosError;
            FailMessage("Mở nhóm không thành công", err.response?.data?.message ?? "");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
}

const teamService = new TeamService();
export default teamService;

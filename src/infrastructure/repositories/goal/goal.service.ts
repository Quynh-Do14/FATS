import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class GoalService {
    async GoalTeam(id: number, params: any, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Goal.Team.Get}/${id}`)
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
    async GoalTeamById(id: number, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Goal.Team.GetById}/${id}`)
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
    async AddGoalTeam(id: number, data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.Goal.Team.Add}/${id}`,
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
            FailMessage("Thêm mới không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async DeleteTeamPersonal(id: string, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Goal.Team.Delete}/${id}`)
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Xóa mục tiêu thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Xóa mục tiêu không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async GoalPersonal(params: object, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Goal.Personal.Get, {
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
    async GoalPersonalById(id: number, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Goal.Personal.GetById}/${id}`)
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
    async AddGoalPersonal(data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Goal.Personal.Add,
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
            FailMessage("Thêm mới không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async AllocationGoalPersonal(data: any[], onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .putArray(Endpoint.Goal.Personal.Allocation,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Phân bổ thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Phân bổ không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async AchievedGoalPersonal(id: string, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Goal.Personal.Achieved}/${id}`)
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Đã hoàn thành mục tiêu", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Mục tiêu không thể hoàn thành", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async DeleteGoalPersonal(id: string, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Goal.Personal.Delete}/${id}`)
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Xóa mục tiêu thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error: any) {
            FailMessage("Xóa mục tiêu không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

}

const goalService = new GoalService();
export default goalService;
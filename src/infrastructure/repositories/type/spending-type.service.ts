import { Endpoint } from "@/core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class SpendingTypeService {
    //Team
    async GetTeam(idTeam: String, params: object, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.SpendingType.Team.Get}/${idTeam}`, {
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

    async GetTeamById(idTeam: String, id: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.SpendingType.Team.GetById}/${idTeam}/${id}`)
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
    async CreateTeam(idTeam: number, data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.SpendingType.Team.Add}/${idTeam}`,
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
    async UpdateTeam(idTeam: number, id: number, data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.SpendingType.Team.Update}/${idTeam}/${id}`,
                    { ...data }
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
    async DeleteTeam(idTeam: number, id: number, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.SpendingType.Team.Delete}/${idTeam}/${id}`
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
    //Team

    //User
    async GetUser(params: object, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.SpendingType.User.Get, {
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

    async GetUserById(id: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.SpendingType.User.GetById}/${id}`)
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

    async CreateUser(data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.SpendingType.User.Add,
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
    async UpdateUser(id: number, data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.SpendingType.User.Update}/${id}`,
                    { ...data }
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
    async DeleteUser(id: number, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.SpendingType.User.Delete}/${id}`
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
    //user
}

const spendingTypeService = new SpendingTypeService();
export default spendingTypeService;

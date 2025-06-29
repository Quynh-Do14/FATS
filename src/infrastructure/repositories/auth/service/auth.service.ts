import Cookies from "js-cookie";
import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { RequestService } from "../../../utils/response";
import { clearSesionStorage, clearToken, saveToken } from "../../../utils/storage";
import { ROUTE_PATH } from "@/core/common/appRouter";

const TOKEN_COOKIE_OPTIONS = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: 7, // 7 ngày
};
class AuthService {
    async login(data: any, setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            const response = await RequestService.post(Endpoint.Auth.Login,
                data);
            if (response?.accessToken && response?.refreshToken) {
                Cookies.set('accessToken', response.accessToken, {
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    expires: 7, // 7 ngày
                });
                Cookies.set('refreshToken', response.refreshToken, {
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    expires: 7, // 7 ngày
                });

                SuccessMessage('Đăng nhập thành công', '');
            }

            return response;
        } catch (error: any) {
            console.error(error);
            FailMessage('Đăng nhập không thành công', error?.response?.data?.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }

    async logout(setLoading: (loading: boolean) => void) {
        setLoading(true);
        try {
            clearToken();
            clearSesionStorage();
            SuccessMessage("Đăng xuất thành công", "");
            setTimeout(() => {
                window.location.href = ROUTE_PATH.HOME_PAGE;
            }, 500);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async profile(setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Auth.Profile).then(response => {
                    return response;
                });
        }
        catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async updateProfile(data: any, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .putForm(Endpoint.Auth.ProfileUpdate, {
                    ...data
                })
                .then(response => {
                    if (response) {
                        onBack();
                        SuccessMessage("Cập nhật thành công", "")
                    }
                    setLoading(false);
                    return response;
                });
        } catch (error: any) {
            console.error(error)
            FailMessage("Cập nhật không thành công", error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    async register(data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService.post(Endpoint.Auth.Register, {
                ...data
            }).then(response => {
                setLoading(false);
                onBack();
                // SuccessMessage("Đăng kí thành công", "Vui lòng kiểm tra Email để xác thực tài khoản", 10000)
                return response;
            });
        } catch (error: any) {
            FailMessage("Đăng nhập không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async changePassword(data: object, onBack: Function, setLoading: (loading: boolean) => void) {
        try {
            return await RequestService.put(Endpoint.Auth.ChangePassword,
                { ...data },
            ).then(response => {
                setLoading(false)
                SuccessMessage("Thay đổi mật khẩu thành công", "")
                onBack()
                return response;
            });
        } catch (error: any) {
            FailMessage("Thay đổi mật khẩu không thành công", error.response.data.message)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async verifyEmail(code: string) {
        try {
            return await RequestService.get(`${Endpoint.Auth.Verify}?code=${code}`).then(
                (response) => {
                    if (response) {
                        // SuccessMessage("Xác thực Email thành công", "")
                        return response;
                    }
                });
        }
        catch (error) {
            // FailMessage("Xác thực không thành công", "")
            console.error(error)
        }
    }

    async forgotPassword(data: object, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService.post(Endpoint.Auth.ForgotPassword,
                data,
            ).then((response) => {
                if (response) {
                    setLoading(false)
                    SuccessMessage("Gửi Email thành công", "Yêu cầu thiết lập lại mật khẩu của bạn gửi thành công. Kiểm tra Email để thiết lập lại mật khẩu")
                    return response;
                }
            });
        } catch (error) {
            FailMessage("Gửi Email không thành công", "Kiểm tra lại thông tin Email")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async resetPassword(code: string, data: object, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService.put(`${Endpoint.Auth.ResetPassword}?code=${code}`,
                data,
            ).then(response => {
                setLoading(false)
                SuccessMessage("Thay đổi mật khẩu thành công", "")
                return response;
            });
        } catch (error) {
            FailMessage("Thay đổi mật khẩu không thành công", "Kiểm tra lại thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async changeBotChat(id: number, onBack: Function, setLoading: (loading: boolean) => void) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Auth.SelectBot}/${id}`)
                .then(response => {
                    if (response) {
                        onBack();
                        SuccessMessage("Cập nhật thành công", "")
                    }
                    setLoading(false);
                    return response;
                });
        } catch (error: any) {
            console.error(error)
            FailMessage("Cập nhật không thành công", error.response.data.message)
        } finally {
            setLoading(false);
        }
    }


}
const authService = new AuthService();
export default authService;

'use client'
import React, { useEffect, useState } from "react";
import { FullPageLoading } from "@/infrastructure/common/components/controls/loading";
import authService from "@/infrastructure/repositories/auth/service/auth.service";
import BubbleCommon from "@/infrastructure/common/components/controls/Bubble";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { useRouter } from "next/navigation";;

const VerifyEmailPage = () => {
    const [code, setCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const router = useRouter();

    const goToHomePage = () => {
        router.push(ROUTE_PATH.HOME_PAGE);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const codeURL = params.get("code");
        setCode(codeURL || "");
    }, []);

    const onSubmitAsync = async () => {
        if (code) {
            setLoading(true);
            try {
                await authService.verifyEmail(code).then(() => {
                    setSuccess(true);
                });
            } catch (error) {
                console.error(error);
                setSuccess(false);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (code) {
            onSubmitAsync();
        }
    }, [code]);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#006633] via-[#ffffff] to-[#96f196] px-4">
            <BubbleCommon />

            <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full animate-fade-in">
                {success === null ? (
                    <>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="text-[#389d21] text-5xl">⏳</div>
                            <h2 className="text-2xl font-bold text-[#389d21]">
                                Đang Xác Thực Tài Khoản
                            </h2>
                            <p className="text-gray-600">
                                Hệ thống đang xác thực Email của bạn...
                            </p>
                        </div>
                    </>
                ) : success === true ? (
                    <>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="text-green-500 text-5xl">✅</div>
                            <h2 className="text-2xl font-bold text-green-600">
                                Xác Thực Thành Công
                            </h2>
                            <p className="text-gray-700">
                                Chào mừng bạn! Bạn đã xác thực thành công và có thể sử dụng ứng dụng.
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="text-red-500 text-5xl">❌</div>
                            <h2 className="text-2xl font-bold text-red-500">
                                Xác Thực Không Thành Công
                            </h2>
                            <p className="text-gray-700">
                                Vui lòng thử lại hoặc liên hệ: <span className="font-semibold">ai@idaivn</span>
                            </p>
                        </div>
                    </>
                )}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={goToHomePage}
                        className="py-2 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:opacity-90 shadow-md transition duration-300"
                    >
                        Quay lại Trang Chủ
                    </button>
                </div>
            </div>

            <FullPageLoading isLoading={loading} />
        </div>

    );
};

export default VerifyEmailPage;
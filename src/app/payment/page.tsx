'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import "@/assets/styles/page/payment.css";
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout';
import { ROUTE_PATH } from '@/core/common/appRouter';
import paymentService from '@/infrastructure/repositories/payment/payment.service';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';

import succes from '@/assets/images/success.png';
import failure from '@/assets/images/failure.png';
import loadingGif from '@/assets/images/loading.gif';

function getQueryParam(param: string): string | null {
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const PaymentResultPage = () => {
    const hasCalledPayment = useRef(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [respone, setRespone] = useState<any>({});

    const [transactionNo, setTransactionNo] = useState<string | null>(null);
    const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
    const [responseCode, setResponseCode] = useState<string | null>(null);
    const [orderInfo, setOrderInfo] = useState<string>('');

    const decodeFromBase64 = (base64: string): string => {
        try {
            const binary = atob(base64);
            const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
            const decoder = new TextDecoder();
            return decoder.decode(bytes);
        } catch (e) {
            return '';
        }
    };

    const onPaymentAsync = async () => {
        try {
            const fullSearch = window.location.search;
            const res = await paymentService.Payment(fullSearch, setLoading);
            setRespone(res);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(true);
        }
    };

    useEffect(() => {
        const vnp_TransactionNo = getQueryParam('vnp_TransactionNo');
        const vnp_TransactionStatus = getQueryParam('vnp_TransactionStatus');
        const vnp_ResponseCode = getQueryParam('vnp_ResponseCode');
        const vnp_OrderInfo = getQueryParam('vnp_OrderInfo');

        setTransactionNo(vnp_TransactionNo);
        setTransactionStatus(vnp_TransactionStatus);
        setResponseCode(vnp_ResponseCode);
        setOrderInfo(decodeFromBase64(String(vnp_OrderInfo)));

        if (!hasCalledPayment.current) {
            hasCalledPayment.current = true;
            onPaymentAsync();
        }
    }, []);

    const condition = () => {
        if (respone?.rspCode === '00') {
            if (Number(responseCode) === 0) {
                return renderSuccess('Giao dịch của bạn đã được xử lý thành công.');
            } else {
                return renderFailure('Giao dịch của bạn không thể tiếp tục');
            }
        }

        switch (respone?.rspCode) {
            case '01':
                return renderFailure('Không tìm thấy thông tin giao dịch. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ.');
            case '02':
                return renderFailure('Giao dịch này đã được xử lý trước đó. Không cần thanh toán lại');
            case '04':
                return renderFailure('Số tiền giao dịch không hợp lệ');
            case '97':
                return renderFailure('Chữ ký xác thực không hợp lệ');
            default:
                return renderFailure('Giao dịch của bạn không thể tiếp tục');
        }
    };

    const renderSuccess = (message: string) => (
        <div className="payment-status-container success">
            <div className="payment-status">
                <h1>Giao dịch thành công</h1>
                <h2>{orderInfo}</h2>
                <Image src={succes} alt="success" width={160} />
                <h2>{message}</h2>
                <a href={ROUTE_PATH.HOME_PAGE} className="action-btn success-btn">Trang chủ</a>
            </div>
        </div>
    );

    const renderFailure = (message: string) => (
        <div className="payment-status-container failure">
            <div className="payment-status">
                <h1>Giao dịch thất bại</h1>
                <h2>{orderInfo}</h2>
                <Image src={failure} alt="failure" width={160} />
                <h2>{message}</h2>
                <a href={ROUTE_PATH.HOME_PAGE} className="action-btn failure-btn">Trang chủ</a>
            </div>
        </div>
    );

    return (
        <LayoutClient>
            <div className="padding-common">
                {isLoading ? (
                    condition()
                ) : (
                    <div className="payment-status-container loading">
                        <div className="payment-status">
                            <h1>Giao dịch của bạn đang xử lí</h1>
                            <h2>{orderInfo}</h2>
                            <Image src={loadingGif} alt="loading" width={160} />
                        </div>
                    </div>
                )}
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
};

export default PaymentResultPage;

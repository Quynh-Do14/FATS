'use client';
import React, { Suspense, useEffect, useState } from 'react';
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout';
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import historyService from '@/infrastructure/repositories/history/history.service';
import { Col, Row } from 'antd';
import InputDateFilterCommon from '@/infrastructure/common/components/input/input-date-filter';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import '@/assets/styles/page/personalFinance.css';
import { configImageURL, convertDateOnlyShow, formatCurrencyVND } from '@/infrastructure/helper/helper';
import { useSearchParams } from 'next/navigation';
import banner2 from '@/assets/images/banner/banner2.png';
import categoryOther from '@/assets/images/category/another.png';
import Loading from './loading';


const HistoryTransitionPage = () => {
    const [listHistory, setListHistory] = useState<Array<any>>([]);
    const [selectedTab, setSelectedTab] = useState<"income" | "spend">("spend")
    const [loading, setLoading] = useState<boolean>(false);
    const [endDate, setEndDate] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");

    const searchParams = useSearchParams();
    const goadId = searchParams.get('goadId') || "";

    const onGetHistoryAsync = async ({ tab = selectedTab, startDate = "", endDate = "" }) => {
        if (tab == "income") {
            try {
                await historyService.HistoryIncome(
                    String(goadId),
                    {
                        startDate: startDate,
                        endDate: endDate,
                    },
                    setLoading
                ).then((res) => {
                    setListHistory(res.content);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            try {
                await historyService.HistorySpend(
                    String(goadId),
                    {
                        startDate: startDate,
                        endDate: endDate,
                    },
                    setLoading
                ).then((res) => {
                    setListHistory(res.content);
                })
            }
            catch (error) {
                console.error(error);
            }
        }

    };


    const onSearch = async (tab = selectedTab, startDate = "", endDate = "") => {
        await onGetHistoryAsync({ tab: tab, startDate: startDate, endDate: endDate });
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangTab = async (tab: "income" | "spend") => {
        console.log("tab", tab);
        setSelectedTab(tab)
        await onSearch(tab, startDate, endDate).then(_ => { });
    }
    const fetchData = async () => {
        await onSearch(selectedTab, startDate, endDate).then(_ => { });
    }

    return (
        <Suspense fallback={<Loading />}>
            <LayoutClient>
                <div className="personal-finance-container">
                    <BannerCommon
                        title={"Lịch sử giao dịch"}
                        sub={"Tài chính"}
                        backgroundUrl={banner2.src}
                    />
                    <div className="padding-common">
                        <Row gutter={[20, 20]} >
                            <Col sm={24} md={10} lg={8}>
                                <div className='box-common'>
                                    <p className='title-box'>Lọc dữ liệu</p>
                                    <div className="flex justify-center gap-4 ">
                                        <ButtonDesign
                                            classColor={selectedTab === "spend" ? "green" : "transparent"}
                                            onClick={() => onChangTab("spend")}
                                            title={"Chi phí"}
                                            width={160}
                                        />
                                        <ButtonDesign
                                            classColor={selectedTab === "income" ? "green" : "transparent"}
                                            onClick={() => onChangTab("income")}
                                            title={"Thu nhập"}
                                            width={160}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4 w-full">
                                        <InputDateFilterCommon
                                            label={"Thời gian bắt đầu"}
                                            value={startDate}
                                            onChange={setStartDate}
                                        />
                                        <InputDateFilterCommon
                                            label={"Thời gian kết thúc"}
                                            value={endDate}
                                            onChange={setEndDate}
                                        />
                                        <ButtonDesign
                                            title="Lọc"
                                            classColor="green"
                                            onClick={fetchData}
                                            width={120}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col sm={24} md={14} lg={16}>
                                <div className='box-common'>
                                    <p className='title-box'>Thông tin giao dịch</p>
                                    {
                                        listHistory.length
                                            ?
                                            <table>
                                                <thead className="bg-[#cce5ff]">
                                                    <tr className="text-[16px]">
                                                        <th className="px-1 py-1"></th>
                                                        <th className="px-6 py-4 text-left">Danh mục</th>
                                                        <th className="px-6 py-4 text-left">Chi tiêu</th>
                                                        <th className="px-6 py-4 text-left">Ngày giao dịch</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        listHistory.map((item, index) => {
                                                            return (
                                                                <tr
                                                                    className={`${index % 2 === 0 ? "bg-[#ccf2dd]" : "bg-[#cce5ff]"
                                                                        } hover:bg-[#b3d8ff]`}
                                                                >
                                                                    <td className="px-1 py-1 flex justify-center">
                                                                        <div className='cate'>
                                                                            <img src={selectedTab === "spend"
                                                                                ?
                                                                                configImageURL(item?.spendingType?.imageCode) || categoryOther.src
                                                                                :
                                                                                configImageURL(item?.incomeType?.imageCode) || categoryOther.src
                                                                            }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4">{
                                                                        selectedTab === "spend"
                                                                            ?
                                                                            item?.spendingType?.name
                                                                            :
                                                                            item?.incomeType?.name}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrencyVND(item.amount)}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">{convertDateOnlyShow(item.occurrenceDate)}</td>

                                                                </tr>
                                                            )
                                                        })}
                                                </tbody>
                                            </table>
                                            :
                                            <div className="text-center font-semibold text-md text-[#242424]">Chưa có dữ liệu chi tiêu !!!</div>
                                    }

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <FullPageLoading isLoading={loading} />
            </LayoutClient>
        </Suspense>
    )
}

export default HistoryTransitionPage
'use client';
import { useEffect, useState } from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import goalService from "@/infrastructure/repositories/goal/goal.service";
import { FullPageLoading } from "@/infrastructure/common/components/controls/loading";
import { configImageURL, convertDateOnly, convertDateOnlyShow, formatCurrencyVND } from "@/infrastructure/helper/helper";
import '@/assets/styles/page/personalFinance.css'
import Constants from "@/core/common/constants";
import { Col, Dropdown, Menu, Row } from "antd";
import BannerCommon from "@/infrastructure/common/components/banner/BannerCommon";
import incomeTypeService from "@/infrastructure/repositories/type/income-type.service";
import spendingTypeService from "@/infrastructure/repositories/type/spending-type.service";
import { WarningMessage } from "@/infrastructure/common/components/toast/notificationToast";
import teamService from "@/infrastructure/repositories/team/team.service";
import SelectFilterCommon from "@/infrastructure/common/components/input/select-filter";
import { ButtonDesign } from "@/infrastructure/common/components/button/buttonDesign";
import AlertBudget from "@/infrastructure/common/components/budget/alert-budget";
import { PaginationNoSizeCommon } from "@/infrastructure/common/components/pagination/PaginationNoSize";
import DialogConfirmCommon from "@/infrastructure/common/components/modal/dialogConfirm";
import lock from "@/assets/images/lock.gif"
import banner3 from "@/assets/images/banner/banner3.png"
import BudgetInfo from "@/infrastructure/common/components/budget/budget-info.";
import TeamInfo from "@/app/finance-common/common/infoTeam";
import ModalCreateCategory from "@/app/finance-common/modal/modalCreateCategory";
import ModalAddMember from "@/app/finance-common/modal/modalAddMember";
import ModalCreateGoal from "@/app/finance-common/modal/modalCreate";
import DrawerSelectCategory from "@/app/finance-common/common/drawerSelectCategory";
import { useSearchParams, useParams, useRouter } from 'next/navigation';

const GoalSpendingTeamPage = () => {
    const [detailTeam, setDetailTeam] = useState<any>({});

    const [listGoal, setListGoal] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    const [newlistGoal, setNewListGoal] = useState<Array<any>>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    const [isOpenModalCreateCategory, setIsOpenModalCreateCategory] = useState<boolean>(false);
    const [isOpenModalAddMember, setIsOpenModalAddMember] = useState<boolean>(false);
    const [isOpenDrawerCategory, setIsOpenDrawerCategory] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [selectedGoalId, setSelectedGoalId] = useState<string>("");

    const [listSpendingType, setListSpendingType] = useState<Array<any>>([]);
    const [listIncomeType, setListIncomeType] = useState<Array<any>>([]);

    const [listMember, setListMember] = useState<Array<any>>([]);

    const [listType, setListType] = useState<Array<any>>([]);
    const [selectedTab, setSelectedTab] = useState<"spend" | "income">("income");
    const [selectedId, setSelectedId] = useState<any>({});
    const [selectedMenu, setSelectedMenu] = useState<1 | 2>(1);

    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = params.slug; // 

    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_dataRequest, _setDataRequest] = useState<any>({});
    const dataRequest = _dataRequest;

    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setDataRequest({ ...dataRequest })
    }
    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const [validateCategory, setValidateCategory] = useState<any>({});
    const [submittedTimeCategory, setSubmittedTimeCategory] = useState<any>();
    const [_dataRequestCategory, _setDataRequestCategory] = useState<any>({});
    const dataRequestCategory = _dataRequestCategory;

    const setDataRequestCategory = (data: any) => {
        Object.assign(dataRequestCategory, { ...data });
        _setDataRequestCategory({ ...dataRequestCategory })
    }
    const isValidDataCategory = () => {
        let allRequestOK = true;

        setValidateCategory({ ...validateCategory });

        Object.values(validateCategory).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onGetInfoTeamAsync = async () => {
        try {
            await teamService.GetTeamById(
                String(id),
                setLoading
            ).then((res) => {
                if (res) {
                    setDetailTeam(res)
                }
            })
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const pageSize = 4
    const onGetListGoalAsync = async () => {
        const param = {
            page: page - 1,
            size: pageSize,
        }
        try {
            await goalService.GoalTeam(
                Number(id),
                param,
                setLoading
            ).then((res) => {
                setListGoal(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const onChangePage = (value: any) => {
        setPage(value);
    };

    const onOpenModalCreate = () => {
        setIsOpenModalCreate(!isOpenModalCreate);
    };

    const onCloseModalCreate = () => {
        setIsOpenModalCreate(false);
    };

    const onCreateGoalAsync = async () => {
        await setSubmittedTime(new Date());
        if (isValidData()) {
            try {
                await goalService.AddGoalTeam(
                    Number(id),
                    {
                        name: dataRequest.name,
                        goalAmount: dataRequest.goalAmount,
                        startDate: convertDateOnly(dataRequest.startDate),
                        endDate: convertDateOnly(dataRequest.endDate)
                    },
                    () => {
                        onGetListGoalAsync().then(_ => { });
                        onCloseModalCreate();
                    },
                    setLoading
                ).then(() => { });
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    // Danh mục
    const onGetSpendingTypeAsync = async () => {

        try {
            await spendingTypeService.GetTeam(
                String(id),
                {},
                () => { }
            ).then((res) => {
                setListSpendingType(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const onGetIncomeTypeAsync = async () => {
        try {
            await incomeTypeService.GetTeam(
                String(id),
                {},
                () => { }
            ).then((res) => {
                setListIncomeType(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    };
    /////
    const onOpenModalCreateCategory = (id: any) => {
        setSelectedId(id);
        setIsOpenModalCreateCategory(!isOpenModalCreateCategory);
    };

    const onCloseModalCreateCategory = () => {
        setIsOpenModalCreateCategory(false);
    };

    const onCloseDrawerCategory = () => {
        setIsOpenDrawerCategory(false);
    }
    /////

    useEffect(() => {
        if (selectedId) {
            setDataRequestCategory({
                name: selectedId.name
            })
        };
    }, [selectedId]);

    const onCreateCategoryAsync = async () => {

        if (selectedTab == 'spend') {
            await setSubmittedTimeCategory(new Date());
            if (isValidDataCategory()) {
                try {
                    await spendingTypeService.CreateTeam(
                        Number(id),
                        {
                            name: dataRequestCategory.name,
                            iconId: dataRequestCategory.iconId
                        },
                        () => {
                            onGetSpendingTypeAsync().then(_ => { });
                            onCloseModalCreateCategory();
                            setDataRequestCategory({
                                name: "",
                                iconId: "",
                                imageCode: ""
                            })
                        },
                        setLoading
                    ).then(() => { });
                }
                catch (error) {
                    console.error(error);
                }
            } else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
            };
        }
        else if (selectedTab == "income") {
            await setSubmittedTimeCategory(new Date());
            if (isValidDataCategory()) {
                try {
                    await incomeTypeService.CreateTeam(
                        Number(id),
                        {
                            name: dataRequestCategory.name,
                            iconId: dataRequestCategory.iconId
                        },
                        () => {
                            onGetIncomeTypeAsync().then(_ => { });
                            onCloseModalCreateCategory();
                            setDataRequestCategory({
                                name: "",
                                iconId: "",
                                imageCode: ""
                            })
                        },
                        setLoading
                    ).then(() => { });
                }
                catch (error) {
                    console.error(error);
                }

            } else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
            };
        }
    };


    const onUpdateCategoryAsync = async () => {
        if (selectedTab == 'spend') {
            await setSubmittedTimeCategory(new Date());
            if (isValidDataCategory()) {
                try {
                    await spendingTypeService.UpdateTeam(
                        Number(id),
                        Number(selectedId.id),
                        {
                            name: dataRequestCategory.name,
                            iconId: dataRequestCategory.iconId
                        },
                        () => {
                            onGetSpendingTypeAsync().then(_ => { });
                            onCloseModalCreateCategory();
                        },
                        setLoading
                    ).then(() => { });
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
            };
        }
        else if (selectedTab == "income") {
            await setSubmittedTimeCategory(new Date());
            if (isValidDataCategory()) {
                try {
                    await incomeTypeService.UpdateTeam(
                        Number(id),
                        Number(selectedId.id),
                        {
                            name: dataRequestCategory.name,
                            iconId: dataRequestCategory.iconId
                        },
                        () => {
                            onGetIncomeTypeAsync().then(_ => { });
                            onCloseModalCreateCategory();
                        },
                        setLoading
                    ).then(() => { });
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
            };
        }
    };

    const onDeleteCategoryAsync = async () => {
        if (selectedTab == 'spend') {
            try {
                await spendingTypeService.DeleteTeam(
                    Number(id),
                    Number(selectedId.id),
                    () => {
                        onGetSpendingTypeAsync().then(_ => { });
                        onCloseModalCreateCategory();
                    },
                    setLoading
                ).then(() => { })
            }
            catch (error) {
                console.error(error)
            }
        }
        else if (selectedTab == "income") {
            try {
                await incomeTypeService.DeleteTeam(
                    Number(id),
                    Number(selectedId.id),
                    () => {
                        onGetIncomeTypeAsync().then(_ => { });
                        onCloseModalCreateCategory();
                    },
                    setLoading
                ).then(() => { });
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    // Danh mục

    //Member
    const onGetListMemberAsync = async () => {
        try {
            await teamService.GetTeamMember(
                Number(id),
                setLoading
            ).then((res) => {
                setListMember(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const onOpenModalAddMember = () => {
        setIsOpenModalAddMember(!isOpenModalAddMember);
    };

    const onCloseModalAddMember = () => {
        setIsOpenModalAddMember(false);
    };

    //Member

    useEffect(() => {
        if (selectedTab === "spend") {
            setListType(listSpendingType);
        }
        else {
            setListType(listIncomeType);
        }
    }, [selectedTab, listSpendingType, listIncomeType]);

    const assignRandomColors = (data: any[], colors: any[]) => {
        return data.map((item, index) => ({
            ...item,
            color: colors[index % colors.length]
        }));
    };

    useEffect(() => {
        const newData = assignRandomColors(listGoal, Constants.RandomColor.List);
        setNewListGoal(newData);
    }, [listGoal]);

    useEffect(() => {
        onGetInfoTeamAsync().then(_ => { });
        onGetListMemberAsync().then(_ => { });
        onGetIncomeTypeAsync().then(_ => { });
        onGetSpendingTypeAsync().then(_ => { });
    }, []);

    useEffect(() => {
        onGetListGoalAsync().then(_ => { });
    }, [page]);

    //Xóa goal
    const onOpenModalDelete = (id: string) => {
        setIsOpenModalDelete(!isOpenModalDelete);
        setSelectedGoalId(id);
    }

    const onCloseModalDelete = () => {
        setIsOpenModalDelete(false);
    }

    const onDeleteGoalAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await goalService.DeleteTeamPersonal(
                selectedGoalId,
                () => {
                    onCloseModalDelete();
                    onGetListGoalAsync().then(_ => { });
                },
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
        };
    };
    //Xóa goal

    const listAction = (item: any) => {
        return (
            <Menu className='action-admin'>
                < Menu.Item className='info-admin'>
                    <a href={`/team/team-finance/${item.id}?idTeam=${id}`}>
                        <div className='info-admin-title px-1 py-2 flex items-center'>
                            <i className="fa fa-users" aria-hidden="true"></i>
                            Xem mục tiêu
                        </div>
                    </a>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={() => onOpenModalDelete(item.id)}>
                    <div className='info-admin-title px-1 py-2 flex items-center' >
                        <i className='fa fa-trash' aria-hidden='true'></i>
                        Xóa mục tiêu
                    </div>
                </Menu.Item>
            </Menu >
        )
    };

    return (
        <LayoutClient>
            <div className="personal-finance-container">
                <BannerCommon
                    title={detailTeam.name}
                    sub={"Tài chính"}
                    backgroundUrl={detailTeam.imageCode ? configImageURL(detailTeam.imageCode) : banner3}
                />
                {
                    !isLoading
                    &&
                    (
                        Object.keys(detailTeam).length === 0
                            ?
                            <div className="padding-common">
                                <div className="lock-team">
                                    <div className="loading-card">
                                        <div className="spinner" >
                                            <img src={lock.src} alt="" />
                                        </div>
                                        <p className="loading-text">Nhóm đã bị khóa<br />Vui lòng mở khóa để tiếp tục sử dụng</p>
                                    </div>
                                </div>
                            </div>
                            :

                            <div className="padding-common">
                                <Row gutter={[20, 20]}>
                                    <Col xs={24} sm={24} md={10} lg={8} xxl={6}>
                                        <TeamInfo
                                            linkJoinUrl={detailTeam.linkJoinUrl}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={14} lg={8} xxl={8}>
                                        <BudgetInfo />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={8} xxl={10}>
                                        <AlertBudget />
                                    </Col>
                                    <Col xs={24} sm={24} md={10} lg={8} xxl={6}>
                                        <div className="category">
                                            <SelectFilterCommon
                                                label={""}
                                                listDataOfItem={Constants.MenuTabFinance.List}
                                                onChange={(e: any) => setSelectedMenu(e.target.value)}
                                            />
                                            <div className="content">
                                                <div className={`${selectedMenu == 1 ? "show" : "un-show"} box`}>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex justify-center gap-4">
                                                            <ButtonDesign
                                                                classColor={selectedTab === "spend" ? "green" : "transparent"}
                                                                onClick={() => setSelectedTab("spend")}
                                                                title={"Chi phí"}
                                                            />
                                                            <ButtonDesign
                                                                classColor={selectedTab === "income" ? "green" : "transparent"}
                                                                onClick={() => setSelectedTab("income")}
                                                                title={"Thu nhập"}
                                                            />
                                                        </div>
                                                        <div className="item-list">

                                                            {
                                                                listType.map((item, index) => {
                                                                    return (
                                                                        <div className="category-item" key={index} onClick={() => onOpenModalCreateCategory(item)}>
                                                                            <div className="category-name">
                                                                                <img src={configImageURL(item.imageCode)} alt="" width={40} />
                                                                                <p>{item.name} </p>
                                                                            </div>
                                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <ButtonDesign
                                                        classColor={'green'}
                                                        onClick={() => onOpenModalCreateCategory(null)}
                                                        title={'Thêm danh mục'}
                                                    />
                                                </div>
                                                <div className={`${selectedMenu == 2 ? "show" : "un-show"} box`}>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="item-list">

                                                            {
                                                                listMember.map((item, index) => {
                                                                    return (
                                                                        <div className="category-item" key={index}>
                                                                            <div className="category-name">
                                                                                {
                                                                                    item?.avatarCode
                                                                                        ?
                                                                                        <div className="img">
                                                                                            <img src={configImageURL(item?.avatarCode)} alt="" />
                                                                                        </div>
                                                                                        :
                                                                                        <div className="icon">
                                                                                            <i className="fa fa-users" aria-hidden="true"></i>
                                                                                        </div>
                                                                                }
                                                                                <p>{item.name} </p>
                                                                            </div>
                                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <ButtonDesign
                                                        classColor={'green'}
                                                        onClick={onOpenModalAddMember}
                                                        title={'Thêm thành viên'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={14} lg={16} xxl={18}>
                                        <div className="target">
                                            <Row gutter={[20, 20]} >
                                                <Col span={24}>
                                                    <div className="flex justify-between w-full gap-2 flex-wrap">
                                                        <h2 className="text-xl font-semibold text-left text-gray-800">Danh sách mục tiêu</h2>
                                                        {
                                                            newlistGoal.length
                                                                ?
                                                                <PaginationNoSizeCommon
                                                                    total={total}
                                                                    currentPage={page}
                                                                    onChangePage={onChangePage}
                                                                    pageSize={pageSize}
                                                                />
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </Col>
                                                {newlistGoal.map((goal, index) => {
                                                    const percentage = Math.min((goal.currentAmount / goal.goalAmount) * 100, 100);
                                                    return (
                                                        <Col xs={24} sm={12} md={24} lg={12}>
                                                            <Dropdown overlay={() => listAction(goal)} trigger={['click']}>
                                                                <div
                                                                    key={index}
                                                                    className="box"
                                                                    style={{
                                                                        background: `${goal.color.background}`
                                                                    }}
                                                                >
                                                                    {/* Thông tin mục tiêu */}
                                                                    <div className="flex flex-col gap-2">
                                                                        <div className="flex gap-2 items-start justify-between">
                                                                            <p className="text-[20px] font-semibold text-truncate-2">{goal.name}</p>
                                                                            {
                                                                                goal.achieved
                                                                                    ?
                                                                                    <div className='is-done'>Hoàn thành</div>
                                                                                    :
                                                                                    <div className='is-not-done'>Chưa đạt</div>
                                                                            }
                                                                        </div>
                                                                        <p className="text-[14px]">Mục tiêu: {formatCurrencyVND(goal.currentAmount)} / {formatCurrencyVND(goal.goalAmount)}</p>
                                                                        <p className="text-[14px]">Thời gian: {convertDateOnlyShow(goal.startDate)} - {convertDateOnlyShow(goal.endDate)}</p>
                                                                    </div>
                                                                    {/* Thanh tiến trình */}
                                                                    <div className="w-full">
                                                                        <div className="relative w-full h-2 bg-[#ffffff] rounded-full overflow-hidden">
                                                                            <div
                                                                                style={{
                                                                                    background: `${goal.color.line}`,
                                                                                    width: `${percentage}%`
                                                                                }}
                                                                                className="absolute top-0 left-0 h-full"
                                                                            ></div>
                                                                        </div>
                                                                        <p className="text-right text-sm text-[#242424] mt-1">
                                                                            {percentage.toFixed(0)}%
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Dropdown>
                                                        </Col>
                                                    );
                                                })}
                                            </Row>
                                            <ButtonDesign
                                                classColor={'green'}
                                                onClick={onOpenModalCreate}
                                                title={'Thêm mục tiêu'}
                                            />
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                    )
                }
            </div>

            <ModalCreateCategory
                selectedId={selectedId}
                selectedTab={selectedTab}
                handleOk={selectedId ? onUpdateCategoryAsync : onCreateCategoryAsync}
                handleCancel={onCloseModalCreateCategory}
                visible={isOpenModalCreateCategory}
                data={dataRequestCategory}
                setData={setDataRequestCategory}
                validate={validateCategory}
                setValidate={setValidateCategory}
                submittedTime={submittedTimeCategory}
                onDeleteCategoryAsync={onDeleteCategoryAsync}
                setIsOpenDrawerCategory={setIsOpenDrawerCategory}
            />
            <ModalAddMember
                selectedId={selectedId}
                handleCancel={onCloseModalAddMember}
                visible={isOpenModalAddMember}
                onDeleteCategoryAsync={() => { }}
                onGetListMemberAsync={onGetListMemberAsync}
                setLoading={setLoading}
                idTeam={Number(id)}
            />
            <ModalCreateGoal
                handleOk={onCreateGoalAsync}
                handleCancel={onCloseModalCreate}
                visible={isOpenModalCreate}
                data={dataRequest}
                setData={setDataRequest}
                validate={validate}
                setValidate={setValidate}
                submittedTime={submittedTime}
            />
            <DrawerSelectCategory
                visible={isOpenDrawerCategory}
                data={dataRequestCategory}
                setData={setDataRequestCategory}
                handleCancel={onCloseDrawerCategory}
            />
            <DialogConfirmCommon
                title={"Xóa mục tiêu"}
                message={"Bạn muốn xóa mục tiêu?"}
                titleCancel={"Hủy"}
                titleOk={"Đồng ý"}
                handleOk={onDeleteGoalAsync}
                handleCancel={onCloseModalDelete}
                visible={isOpenModalDelete}
            />
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default GoalSpendingTeamPage;

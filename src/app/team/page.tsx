'use client'
import { useEffect, useState } from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import { FullPageLoading } from "@/infrastructure/common/components/controls/loading";
import teamService from "@/infrastructure/repositories/team/team.service";
import { configImageURL } from "@/infrastructure/helper/helper";
import { Col, Dropdown, Menu, Row } from "antd";
import ModalCreateTeam from "./modalCreate";
import { WarningMessage } from "@/infrastructure/common/components/toast/notificationToast";
import BannerCommon from "@/infrastructure/common/components/banner/BannerCommon";
import "@/assets/styles/page/team.css";
import { ButtonDesign } from "@/infrastructure/common/components/button/buttonDesign";
import DialogConfirmCommon from "@/infrastructure/common/components/modal/dialogConfirm";
import { useRecoilValue } from "recoil";
import { ProfileState } from "@/core/atoms/profile/profileState";
import banner2 from "@/assets/images/banner/banner2.png";
import { SelectSearchCommon } from "@/infrastructure/common/components/input/select-search-common";
import SelectFilterCommon from "@/infrastructure/common/components/input/select-filter";
import Constants from "@/core/common/constants";
import Image from "next/image";
const TeamPage = () => {
    const [listTeam, setListTeam] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);
    const [isOpenModalCreate, setIsOpenCreate] = useState<boolean>(false);

    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_dataRequest, _setDataRequest] = useState<any>({});
    const dataRequest = _dataRequest;

    const [selectdId, setSelectdId] = useState<string>("");
    const [selectedTeam, setSelectedTeam] = useState<any>({});
    const [isOpenModalLock, setIsOpenModalLock] = useState<boolean>(false);
    const [isOpenModalUnLock, setIsOpenModalUnLock] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpenModalLeave, setIsOpenModalLeave] = useState<boolean>(false);
    const [teamType, setTeamType] = useState<string>("true");

    const profileState = useRecoilValue(ProfileState).data
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

    const onGetListTeamAsync = async () => {
        const param = {
            // page: 0,
            // size: 4,
            teamType: teamType
        }
        try {
            await teamService.GetTeam(
                param,
                setLoading
            ).then((res) => {
                setListTeam(res.content)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListTeamAsync().then(_ => { });
    }, [teamType]);

    const onOpenModalCreate = (item: any) => {
        setIsOpenCreate(!isOpenModalCreate)
        setSelectedTeam(item)
    }

    useEffect(() => {
        if (selectedTeam) {
            setDataRequest({
                id: selectedTeam.id,
                name: selectedTeam.name,
                image: selectedTeam.imageCode ? configImageURL(selectedTeam.imageCode) : null
            });
        }
    }, [selectedTeam]);

    const onCreateTeamAsync = async () => {

        await setSubmittedTime(Date.now());
        if (isValidData()) {
            if (dataRequest.id) {
                await teamService.UpdateTeam(
                    String(dataRequest.id),
                    {
                        image: dataRequest.image,
                        name: dataRequest.name,
                        familyTeam: dataRequest.familyTeam,
                    },
                    () => {
                        setIsOpenCreate(false);
                        onGetListTeamAsync().then(_ => { });
                    },
                    setLoading
                )
            }
            else {
                await teamService.CreateTeam({
                    image: dataRequest.image,
                    name: dataRequest.name,
                    familyTeam: dataRequest.familyTeam,
                },
                    () => {
                        setIsOpenCreate(false);
                        onGetListTeamAsync().then(_ => { });
                    },
                    setLoading
                )
            }

        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    //Mở Khóa nhóm
    const onOpenModalUnLock = (id: string) => {
        setIsOpenModalUnLock(!isOpenModalUnLock);
        setSelectdId(id)
    }

    const onCloseModalUnLock = () => {
        setIsOpenModalUnLock(false);
    }

    const onUnLockTeamAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await teamService.UnLockTeam(
                selectdId,
                () => {
                    onCloseModalUnLock();
                    onGetListTeamAsync().then(_ => { });
                },
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    //Mở Khóa nhóm

    //Khóa nhóm
    const onOpenModalLock = (id: string) => {
        setIsOpenModalLock(!isOpenModalLock);
        setSelectdId(id)
    }

    const onCloseModalLock = () => {
        setIsOpenModalLock(false);
    }

    const onLockTeamAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await teamService.LockTeam(
                selectdId,
                () => {
                    onCloseModalLock();
                    onGetListTeamAsync().then(_ => { });
                },
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    //Khóa nhóm

    //Xóa nhóm
    const onOpenModalDelete = (id: string) => {
        setIsOpenModalDelete(!isOpenModalDelete);
        setSelectdId(id)
    }

    const onCloseModalDelete = () => {
        setIsOpenModalDelete(false);
    }

    const onDeleteTeamAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await teamService.DeleteTeam(
                selectdId,
                () => {
                    onCloseModalDelete();
                    onGetListTeamAsync().then(_ => { });
                },
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    //Xóa nhóm

    //Rời nhóm
    const onOpenModalLeave = (id: string) => {
        setIsOpenModalLeave(!isOpenModalLeave);
        setSelectdId(id)
    }

    const onCloseModalLeave = () => {
        setIsOpenModalLeave(false);
    }

    const onLeaveTeamAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await teamService.LeaveTeam(
                selectdId,
                () => {
                    onCloseModalLeave();
                    onGetListTeamAsync().then(_ => { });
                },
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    //Rời nhóm

    const onSelectTypeTeam = (event: any) => {
        setTeamType(event.target.value)
    }
    const listAction = (item: any) => {
        return (
            <Menu className='action-admin'>
                {
                    item?.active
                    &&
                    < Menu.Item className='info-admin'>
                        <a href={`/team/${item.id}`}>
                            <div className='info-admin-title px-1 py-2 flex items-center'>
                                <i className="fa fa-users" aria-hidden="true"></i>
                                Xem nhóm
                            </div>
                        </a>
                    </Menu.Item>
                }
                {
                    String(profileState.username) === String(item.teamLeader?.username)
                    &&

                    <Menu.Item className='info-admin' onClick={() => onOpenModalCreate(item)}>
                        <div className='info-admin-title px-1 py-2 flex items-center'>
                            <i className="fa fa-pencil-square" aria-hidden="true"></i>
                            Thay đổi thông tin nhóm
                        </div>
                    </Menu.Item>
                }
                {
                    String(profileState.username) === String(item.teamLeader?.username)
                    &&
                    (
                        item?.active
                            ?
                            <Menu.Item className='info-admin' onClick={() => onOpenModalLock(item.id)}>
                                <div className='info-admin-title px-1 py-2 flex items-center'>
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                    Khóa nhóm
                                </div>
                            </Menu.Item>
                            :
                            <Menu.Item className='info-admin' onClick={() => onOpenModalUnLock(item.id)}>
                                <div className='info-admin-title px-1 py-2 flex items-center' >
                                    <i className='fa fa-unlock-alt' aria-hidden='true'></i>
                                    Mở khóa
                                </div>
                            </Menu.Item>
                    )
                }
                {
                    String(profileState.username) !== String(item.teamLeader?.username)
                    &&
                    (
                        <Menu.Item className='info-admin' onClick={() => onOpenModalLeave(item.id)}>
                            <div className='info-admin-title px-1 py-2 flex items-center' >
                                <i className='fa fa-arrow-left' aria-hidden='true'></i>
                                Rời nhóm
                            </div>
                        </Menu.Item>
                    )
                }
                {
                    String(profileState.username) === String(item.teamLeader?.username)
                    &&
                    (
                        <Menu.Item className='info-admin' onClick={() => onOpenModalDelete(item.id)}>
                            <div className='info-admin-title px-1 py-2 flex items-center' >
                                <i className='fa fa-trash' aria-hidden='true'></i>
                                Xóa nhóm
                            </div>
                        </Menu.Item>
                    )
                }
            </Menu>
        )
    };

    return (
        <LayoutClient>
            <BannerCommon
                title={"Quỹ nhóm"}
                sub={"Tài chính"}
                backgroundUrl={banner2.src}
            />
            <div className="team-container padding-common">
                <div className="content">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                                <i className="fa fa-coins text-lg"></i>
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900">Danh sách các quỹ nhóm</h2>
                                <p className="text-sm text-gray-500">Quản lý & phân loại theo nhóm</p>
                            </div>
                        </div>

                        <div className="flex-1 w-full md:w-auto">
                            <SelectFilterCommon
                                label="Loại nhóm"
                                listDataOfItem={Constants.FamilyTeam.List}
                                onChange={onSelectTypeTeam}
                            />
                        </div>
                    </div>



                    {/* Danh sách mục tiêu */}
                    <Row gutter={[20, 20]}>
                        {listTeam.map((item, index) => {
                            return (
                                <Col
                                    key={index}
                                    xs={24} sm={12} lg={8}
                                >
                                    <Dropdown overlay={() => listAction(item)} trigger={['click']}>
                                        <div className="box">
                                            <div style={{ position: "relative", width: "100%", height: "25vh", overflow: "hidden" }}>
                                                <div className="image-wrapper">
                                                    <Image
                                                        src={configImageURL(item.imageCode)}
                                                        alt={item.name}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="img-bg"
                                                    />
                                                    {
                                                        !item?.active &&
                                                        <div className="overlay"></div>
                                                    }
                                                </div>
                                                {
                                                    !item?.active
                                                    &&
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            backgroundColor: "#00000099",
                                                            zIndex: 1,
                                                        }}
                                                    ></div>
                                                }
                                            </div>

                                            <div className="text">
                                                <p className="text-truncate">{item.name} {!item.active && <i className="fa fa-lock" aria-hidden="true"></i>}</p>
                                                <p>Trưởng nhóm: {item.teamLeader.name}</p>
                                            </div>
                                        </div>
                                    </Dropdown>
                                </Col>
                            );
                        })}
                    </Row>
                    <ButtonDesign
                        classColor={"green"}
                        onClick={() => onOpenModalCreate({})}
                        title={"Thêm nhóm mới"}
                    />
                    {/* Nút thêm mục tiêu mới */}
                    <ModalCreateTeam
                        handleOk={onCreateTeamAsync}
                        handleCancel={() => setIsOpenCreate(false)}
                        visible={isOpenModalCreate}
                        data={dataRequest}
                        setData={setDataRequest}
                        validate={validate}
                        setValidate={setValidate}
                        submittedTime={submittedTime}
                    />
                    <DialogConfirmCommon
                        title={"Khóa nhóm"}
                        message={"Bạn muốn khóa nhóm?"}
                        titleCancel={"Hủy"}
                        titleOk={"Đồng ý"}
                        handleOk={onLockTeamAsync}
                        handleCancel={onCloseModalLock}
                        visible={isOpenModalLock}
                    />
                    <DialogConfirmCommon
                        title={"Mở khóa nhóm"}
                        message={"Bạn muốn mở khóa nhóm?"}
                        titleCancel={"Hủy"}
                        titleOk={"Đồng ý"}
                        handleOk={onUnLockTeamAsync}
                        handleCancel={onCloseModalUnLock}
                        visible={isOpenModalUnLock}
                    />
                    <DialogConfirmCommon
                        title={"Xóa nhóm"}
                        message={"Bạn muốn xóa nhóm?"}
                        titleCancel={"Hủy"}
                        titleOk={"Đồng ý"}
                        handleOk={onDeleteTeamAsync}
                        handleCancel={onCloseModalDelete}
                        visible={isOpenModalDelete}
                    />
                    <DialogConfirmCommon
                        title={"Rời nhóm"}
                        message={"Bạn muốn rời nhóm?"}
                        titleCancel={"Hủy"}
                        titleOk={"Đồng ý"}
                        handleOk={onLeaveTeamAsync}
                        handleCancel={onCloseModalLeave}
                        visible={isOpenModalLeave}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    );
};

export default TeamPage;

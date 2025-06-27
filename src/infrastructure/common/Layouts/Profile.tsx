import { Col, Modal, Row } from 'antd';
import InputTextCommon from '../components/input/input-text';
import { useEffect, useState } from 'react';
import authService from '../../repositories/auth/service/auth.service';
import { WarningMessage } from '../components/toast/notificationToast';
import { useRecoilState } from 'recoil';
import { ProfileState } from '@/core/atoms/profile/profileState';
import { configImageURL } from '../../helper/helper';
import { isTokenStoraged } from '../../utils/storage';
import UploadAvatar from '../components/input/upload-avatar';
import { ButtonDesign } from '../components/button/buttonDesign';
import { useRouter } from 'next/navigation';

type Props = {
  // handleOk: Function,
  handleCancel: () => void,
  visible: boolean,
  loading?: boolean,
  setLoading: (loading: boolean) => void
}
const ProfileModal = (props: Props) => {
  const { handleCancel, visible, loading, setLoading } = props;
  const [validate, setValidate] = useState<any>({});
  const [submittedTime, setSubmittedTime] = useState<any>();
  const [detailProfile, setDetailProfile] = useState<any>({});

  const router = useRouter();
  const token = isTokenStoraged();

  const [, setDetailState] = useRecoilState(ProfileState);

  const [_data, _setData] = useState<any>({});
  const dataProfile = _data;

  const setDataProfile = (data: any) => {
    Object.assign(dataProfile, { ...data });
    _setData({ ...dataProfile });
  };

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

  const onGetProfileAsync = async () => {
    const tokenS = isTokenStoraged();
    if (!tokenS) return;
    try {
      await authService.profile(
        setLoading
      ).then((response) => {
        setDetailProfile(response)
        setDetailState({
          user: response
        })
      })
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    // onGetProfileAsync().then(() => { })
  }, [])

  useEffect(() => {
    if (detailProfile) {
      setDataProfile({
        avatar: configImageURL(detailProfile.avatarCode),
        email: detailProfile.email,
        username: detailProfile.username,
        name: detailProfile.name,
        phoneNumber: detailProfile.phoneNumber,
      });
    }
  }, [detailProfile]);

  const onUpdateProfile = async () => {
    await setSubmittedTime(Date.now());
    if (isValidData()) {
      await authService.updateProfile(
        {
          avatar: dataProfile.avatar,
          email: dataProfile.email,
          username: dataProfile.username,
          name: dataProfile.name,
          phoneNumber: dataProfile.phoneNumber,
        },
        () => {
          onGetProfileAsync();
          handleCancel();
        },
        setLoading
      )
    }
    else {
      WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
    };
  };

  return (
    <Modal
      key={"f-0"}
      centered
      visible={visible}
      closable={true}
      footer={false}
      onCancel={() => handleCancel()}
      className='custom-modal'
      closeIcon={<i className="fa fa-times text-[20px]" aria-hidden="true"></i>}
    >
      <div className='flex flex-col gap-4 p-3'>
        <p className="text-center font-bold text-[28px] text-[#787878]">Thông tin cá nhân</p>

        <div className='flex items-center gap-4'>
          <UploadAvatar
            label={"Ảnh đại diện"}
            attribute={"avatar"}
            setData={setDataProfile}
            dataAttribute={dataProfile.avatar}
            listType={"picture-circle"}
            shape={"circle"}
          />
          <div className="flex flex-col gap-1 items-start">
            <div className='text-[16px] text-[#8893a7] font-semibold text-truncate'>
              {dataProfile.name}
            </div>
            <div className='text-[14px] text-[#6b7280] font-normal underline text-truncate'>
              {dataProfile.email}
            </div>
          </div>
        </div>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <InputTextCommon
              label={"Tên đăng nhập"}
              attribute={"username"}
              isRequired={false}
              dataAttribute={dataProfile.username}
              setData={setDataProfile}
              disabled={true}
              validate={validate}
              setValidate={setValidate}
              submittedTime={submittedTime}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <InputTextCommon
              label={"Email"}
              attribute={"email"}
              isRequired={false}
              dataAttribute={dataProfile.email}
              setData={setDataProfile}
              disabled={true}
              validate={validate}
              setValidate={setValidate}
              submittedTime={submittedTime}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <InputTextCommon
              label={"Tên người dùng"}
              attribute={"name"}
              isRequired={true}
              dataAttribute={dataProfile.name}
              setData={setDataProfile}
              disabled={false}
              validate={validate}
              setValidate={setValidate}
              submittedTime={submittedTime}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <InputTextCommon
              label={"Số điện thoại"}
              attribute={"phoneNumber"}
              isRequired={true}
              dataAttribute={dataProfile.phoneNumber}
              setData={setDataProfile}
              disabled={false}
              validate={validate}
              setValidate={setValidate}
              submittedTime={submittedTime}
            />
          </Col>
        </Row>
        <div className='flex gap-2 justify-center'>
          <ButtonDesign
            onClick={handleCancel}
            classColor="transparent"
            width={120}
            title={'Quay lại'}
          />
          <ButtonDesign
            onClick={onUpdateProfile}
            classColor="green"
            width={120}
            title={'Cập nhật'}
          />
        </div>
      </div>
    </Modal >
  )
}

export default ProfileModal
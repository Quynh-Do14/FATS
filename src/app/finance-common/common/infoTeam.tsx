import { QRCode, Tooltip } from 'antd';
import { SuccessMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import "@/assets/styles/page/chat.css"
type Props = {
    linkJoinUrl: string
}
const TeamInfo = (props: Props) => {
    const { linkJoinUrl } = props;

    const onCopy = () => {
        navigator.clipboard.writeText(linkJoinUrl);
        SuccessMessage("Sao chép đường dẫn thành công", "");
    }
    return (
        <div className='team-info'>
            <QRCode value={linkJoinUrl} color='#FFF' className='qr' />
            <Tooltip title={"Sao chép đường dần"}>
                <p onClick={onCopy}>{linkJoinUrl}<i className="fa fa-clone" aria-hidden="true"></i></p>
            </Tooltip>
        </div>
    )
}

export default TeamInfo
import '../../../../assets/styles/components/banner.css'
import TitleComponent from '../controls/TitleComponent';
type Props = {
    title: string
    sub: string
    color?: "white" | "black"
    backgroundUrl: any
}
const BannerCommon = (props: Props) => {
    const { title, sub, color = "white", backgroundUrl } = props;
    return (
        <div className="banner-common">
            <div className="layout text-center bg-cover bg-center py-20"
                style={{
                    backgroundImage: `url(${backgroundUrl})`
                }}
            >
                <div className='overlay'></div>
                <TitleComponent title={sub} color={color} />
                <h1>{title}</h1>
            </div>
        </div >
    )
}

export default BannerCommon
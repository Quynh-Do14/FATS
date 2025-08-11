import '@/assets/styles/page/watch.css';
import BubbleCommon from '@/infrastructure/common/components/controls/Bubble';
import YoutubeVideo from './components/youtube';
import { Metadata } from 'next';
import { extractTikTokVideoId, splitTakeId } from '@/infrastructure/helper/helper';
import { Endpoint } from '@/core/common/apiLink';
import TikTokVideo from './components/tiktok';

type Props = {
    params: { slug: string };
};
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const detail = await fetch(`${baseURL}${Endpoint.Video.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) => res.json());

    return {
        title: detail.title,
        description: detail?.title,
        openGraph: {
            title: detail.title,
            description: detail?.title,
        },
    };
}

const SlugWatch = async ({ params }: Props) => {

    const detail = await fetch(`${baseURL}${Endpoint.Video.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) =>
        res.json()
    );
    let videoId: string | null = ""

    if (detail.videoType == "YOUTUBE") {
        videoId = detail.urlVideo.split('v=')[1];
    }
    else if (detail.videoType == "TIKTOK") {
        videoId = extractTikTokVideoId(detail.urlVideo);
    }

    return (
        <div className="slug-watch-container">
            <div className="padding-common">
                <BubbleCommon />
                {
                    detail.videoType == "YOUTUBE"
                        ?
                        <YoutubeVideo
                            slug={splitTakeId(params.slug)}
                            detail={detail}
                            videoId={videoId}
                        /> :
                        detail.videoType == "TIKTOK"
                            ?
                            <TikTokVideo
                                slug={splitTakeId(params.slug)}
                                detail={detail}
                                videoId={videoId}
                            />
                            :
                            null
                }
            </div>
        </div>
    );
};

export default SlugWatch;
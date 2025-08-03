import { extractYouTubeId } from "@/infrastructure/helper/helper";
import { useEffect, useState } from "react";
type ThumbnailQuality = 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault';

type Props = {
    url: string;
    quality?: ThumbnailQuality;
}

const YouTubeThumbnail = (props: Props) => {
    const {
        url,
        quality = 'hqdefault'
    } = props;
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const videoId = extractYouTubeId(url);
            if (!videoId) {
                throw new Error('Invalid YouTube URL');
            }

            // Construct thumbnail URL
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
            setThumbnailUrl(thumbUrl);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to extract thumbnail');
            setThumbnailUrl(null);
        }
    }, [url, quality]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!thumbnailUrl) {
        return <div className="loading"></div>;
    }

    return (
        <div className="youtube-thumbnail">
            <img
                src={thumbnailUrl}
                alt="YouTube video thumbnail"
                onError={() => setError('Failed to load thumbnail image')}
            />
            {/* <div className="quality-info">Quality: {quality}</div> */}
        </div>
    );
};

export default YouTubeThumbnail;
import React, { useEffect, useState } from 'react'
type Props = {
    timeout: number,
    title: string,
    description: string,
    index: number
}
const TagFlipComponent = (props: Props) => {
    const { timeout, title, description, index } = props;

    const [flip, setFlip] = useState<boolean>(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setFlip(true);
        }, timeout);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (flip) {
            const time = setTimeout(() => {
                setFlip(false);
            }, 3000);
            return () => clearTimeout(time);
        }
        return () => { };
    }, [flip]);
    return (
        <div className={`tag  ${flip && "flip"}`} key={index}>
            <div className='flex flex-col items-start'>
                <h3 className="text-[18px] text-left font-semibold text-[#FFF]">{title}</h3>
                <p className="text-[#FFF] text-left text-[14px]">{description}</p>
            </div>
        </div>
    )
}

export default TagFlipComponent
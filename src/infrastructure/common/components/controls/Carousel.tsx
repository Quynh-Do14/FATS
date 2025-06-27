import { Carousel } from 'antd'
import { useEffect, useState } from 'react';
import { configImageURL } from '../../../helper/helper';

const CarouselCommon = () => {
    const [dataBanner, setDataBanner] = useState<Array<any>>([]);

    return (
        <div className='h-full'>
            <Carousel>
                {
                    dataBanner.map((it, index) => {
                        return (
                            <img key={index} src={configImageURL(it.image?.fileCode)} className='w-full rounded-[4px]' />
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default CarouselCommon
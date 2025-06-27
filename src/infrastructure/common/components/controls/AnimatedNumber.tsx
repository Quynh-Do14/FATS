import { useState, useEffect } from "react";
import '../../../../assets/styles/components/animation.css'
type Props = {
    value: number
}
const AnimatedNumber = (props: Props) => {
    const { value } = props;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = Math.ceil(value / 100);
        const interval = setInterval(() => {
            start += step;
            if (start >= value) {
                setDisplayValue(value);
                clearInterval(interval);
            } else {
                setDisplayValue(start);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [value]);

    return <span className="animated-number">{displayValue.toLocaleString()}</span>;
};

export default AnimatedNumber;
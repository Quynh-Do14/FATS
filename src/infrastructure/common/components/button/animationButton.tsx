import React from "react";
import "../../../../assets/styles/components/button.css"

type Props = {
    classColor: "blue" | "white" | "black" | "orange" | "green" | "red" | "cancel",
    label: string;
    onClick: () => void;
}

const AnimatedButton = (props: Props) => {
    const { classColor, label, onClick } = props;
    return (
        <button className={`borderLightButton ${classColor}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default AnimatedButton;

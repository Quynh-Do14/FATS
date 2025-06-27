import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "green" | "red" | "white" | "transparent",
    onClick: () => void,
    icon?: any,
    title: string,
    width?: number
    disabled?: boolean
}
export const ButtonDesign = (props: Props) => {
    const {
        classColor,
        onClick,
        icon,
        title,
        width = false,
        disabled = false
    } = props;
    return (
        <button
            className={`btn-design ${classColor}`}
            style={{
                width: width ? width : "100%"
            }}
            disabled={disabled}
            onClick={onClick}>
            {
                icon && <span>{icon} </span>
            }
            <span>
                {title}
            </span>
        </button >
    )
}

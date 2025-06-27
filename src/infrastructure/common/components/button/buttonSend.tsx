import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "green" | "red" | "white" | "transparent",
    onClick: () => void,
    icon?: any,
    title: string,
    width?: number
    disabled?: boolean
}
export const ButtonSend = (props: Props) => {
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
            className={`btn-send ${classColor}`}
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

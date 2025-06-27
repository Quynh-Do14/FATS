import Link from "next/link"
import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "green" | "red" | "white" | "transparent",
    href: string,
    icon?: any,
    title: string,
    width?: number
    disabled?: boolean
}
export const ButtonHref = (props: Props) => {
    const {
        classColor,
        href,
        icon,
        title,
        width = false,
        disabled = false
    } = props;
    return (
        <Link
            href={href}
            className={`btn-send ${classColor}`}
            style={{
                width: width ? width : "100%"
            }}
        >
            {
                icon && <span>{icon} </span>
            }
            <span>
                {title}
            </span>
        </Link >
    )
}

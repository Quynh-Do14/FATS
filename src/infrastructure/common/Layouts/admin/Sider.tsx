import styles from "@/assets/styles/admin/layout.module.css";
import Link from "next/link";
import logo from "@/assets/images/logo-white.png"
import Image from "next/image";
import Constants from "@/core/common/constants";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    const pathname = usePathname();

    const conditionActive = (link: string) => {
        // if (pathname !== ROUTE_PATH.HOME_PAGE) {
        //     if (pathname.includes(link)) {
        //         return "active"
        //     }
        //     else {
        //         return ""
        //     }
        // }
        // else if (pathname === ROUTE_PATH.HOME_PAGE) {
        if (pathname === link) {
            return styles.active
        }
        return ""
        // }
        // else {
        //     return ""
        // }
    }
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <h2 className={styles.logo}>
                <Image src={logo} alt="autofushion" width={120} height={40} />
            </h2>
            <nav>
                <ul className={styles.menu}>
                    {
                        Constants.Menu.List.map((item, index) => {
                            return (
                                <li key={index} className={`${conditionActive(item.link)}`}>
                                    <Link href={item.link}><span>
                                        <i className={item.icon}></i></span>
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </aside>
    );
}


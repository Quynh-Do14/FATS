import styles from "@/assets/styles/admin/layout.module.css";
import Link from "next/link";
import logo from "@/assets/images/logo.png"
import Image from "next/image";
import Constants from "@/core/common/constants";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <div className={styles.logo}>
                <Image src={logo} alt="autofushion" width={160} height={48} />
            </div>
            <nav>
                <ul className={styles.menu}>
                    {Constants.Menu.List.map((item, index) => (
                        <li key={index}>
                            <Link href={item.link} className={styles.menuItem}>
                                <span className={styles.icon}>
                                    <i className={item.icon} aria-hidden="true"></i>
                                </span>
                                <span className={styles.label}>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}


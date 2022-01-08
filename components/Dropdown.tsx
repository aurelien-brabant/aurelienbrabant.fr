import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/dropdown.module.scss'

type DropdownLink = {
    route: string
    label: string
}

type DropdownProps = {
    links: DropdownLink[]
    type?: 'hover' | 'normal'
    contentClassName?: string
    titleClassName?: string
    linkClassName?: string
    onLinkClick?: any
}

const Dropdown: React.FC<DropdownProps> = ({
    onLinkClick,
    type,
    links,
    titleClassName,
    contentClassName,
    linkClassName,
    children,
}) => {
    const [activated, setActivated] = useState(false)

    return (
        <div
            className={`
                ${styles.dropdown} ${type ? styles[type] : ''} ${
                activated ? styles.activated : ''
            }`}
            onClick={() => setActivated(!activated)}
            
                    >
            <div onMouseEnter={() => {
                if (type === 'hover') setActivated(true)
            }}
            className={`${titleClassName ? titleClassName : ''}`}>
                {' '}
                {children}{' '}
            </div>
            <ul
onMouseLeave={() => {
                if (type === 'hover') setActivated(false)
            }}

                className={`${
                    contentClassName ? contentClassName : ''
                }`}
            >
                {links.map((link) => (
                    <li
                        key={link.label}
                        onClick={() => {
                            if (onLinkClick) {
                                onLinkClick(setActivated)
                            }
                        }}
                        className={`${linkClassName ? linkClassName : ''}`}
                    >
                        <Link href={link.route}>
                            <a>{link.label}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

Dropdown.defaultProps = {
    type: 'normal',
}

export default Dropdown

import Link from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { buildClassName } from '../lib/buildClassName'
import styles from '../styles/call-to-action.module.scss'

type CTAVariant = 'filled' | 'outline'
type CTAColorVariant = 'primary' | 'secondary'
type CTAHoverVariant = 'shadow' | 'jump'

interface CallToActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    doesTrack?: boolean
    eventLabel?: string /* Not displayed as a child, only for event reporting */
    className?: string
    variant?: CTAVariant
    colorVariant?: CTAColorVariant
    hoverVariant?: CTAHoverVariant
}

const CallToAction: React.FC<CallToActionProps> = ({
    href,
    doesTrack,
    eventLabel,
    className,
    children,
    variant,
    colorVariant,
    hoverVariant,
    ...rest
}) => {
    const trackEvent = () => {
        if (!gtag || !doesTrack) return
        gtag('event', 'click', {
            event_category: 'button',
            event_label: eventLabel,
        })
    }

    return (
        <Link href={href}>
            <a
                className={buildClassName([
                    styles.cta,
                    styles[colorVariant as CTAColorVariant],
                    styles[variant as CTAVariant],
                    styles[hoverVariant as CTAHoverVariant],
                    className,
                ])}
                onClick={trackEvent}
                {...rest}
            >
                {children}
            </a>
        </Link>
    )
}

CallToAction.defaultProps = {
    doesTrack: true,
    variant: 'filled',
    colorVariant: 'primary',
    hoverVariant: 'shadow',
    eventLabel: 'default',
}

export default CallToAction

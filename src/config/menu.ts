import { Icons } from "@/components/icons"

interface NavItem {
    title: string
    to?: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
}

interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export const mainMenu: NavItemWithChildren[] = [
    {
        title: 'Pokémons',
        to: '/',
    },
    {
        title: 'Currículo',
        to: '/curriculo',
    }
]

export const sideMenu: NavItemWithChildren[] = [

    {
        title: 'Pokémons',
        to: '/',
    },
    {
        title: 'Currículo',
        to: '/curriculo',
    }
]

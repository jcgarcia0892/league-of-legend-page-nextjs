'use client';
import { useEffect, useState } from 'react';

import './navbar.scss';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname  } from 'next/navigation';

interface NavbarLink {
    path: string;
    description: string;
}

const navbarLinks: NavbarLink[] = [
    { path: '/home', description: 'INICIO' },
    { path: '/champions', description: 'CAMPEONES' },
    { path: '/rules', description: 'EXPLORAR' },
];


export const Navbar = () => {
    const [ screenWidth, setScreenWidth ] = useState<number>(0);
    // const [ screenWidth, setScreenWidth ] = useState<number>(globalThis.document?.body.clientWidth);
    const [ isOpenMenu, setIsOpenMenu ] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    const reziseEvent = (event: Event) => {
        setScreenWidth((event.target as Window)?.document.body.clientWidth)
    }

    const goTo = (path: string) => {
        router.push(path);
        setIsOpenMenu(false)
    }
    
    useEffect(() => {
        setScreenWidth(window.document?.body.clientWidth);
        window.addEventListener('resize', reziseEvent);

        return () => {
            window.removeEventListener('resize', reziseEvent);
        }

    }, [])

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link href='/home'>
                    <div className='container-img'>
                        <Image
                            priority={true}
                            src={`/images/mini-logo.svg`}
                            alt='mini_logo'
                            fill={true}
                        />
                    </div>
                </Link>
                {
                    screenWidth > 700
                    ?
                    <div className="navbar__container__text">
                        {
                            navbarLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`${pathname === link.path ? 'active-link' : ''}`}
                                >
                                    {link.description}
                                </Link>
                            ))
                        }
                    </div>
                    :
                    <div className="navbar__container__icon">
                        <i className="material-icons" onClick={() => setIsOpenMenu(!isOpenMenu)}>menu</i>
                    </div>
                }
                <ul className={`navbar__container__links ${isOpenMenu ? 'translateX' : ''}`}>
                    {
                        navbarLinks.map((link) => (
                            <li
                                key={link.path}
                                onClick={() => goTo(link.path)}
                            >
                                <p className={`${pathname === link.path ? 'active-link': ''}`}>{link.description}</p>
                            </li>
                        ))
                    }
                </ul>

            </div>
        </nav>
    )
}

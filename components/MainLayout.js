import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router';


export default function MainLayout({children, title=' | Next.js Blog'}) {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{title} | Next.js Blog</title>
                <meta charSet="UTF-8"/>
                <meta name="keywords" content="next, react, nextjs"/>
                <meta name="description" content="Next.JS Tutorial"/>
            </Head>
            <header className="header">
                <div className="container">
                     <Link href="/">
                        <a className="header__logo">
                            <Image
                                src="/star_wars_logo_PNG10.png"
                                alt="Logo"
                                width={100}
                                height={50}
                            />
                        </a>
                    </Link>
                    <nav>
                        <ul className="menu">
                            <li className="menu__item">
                                <Link href="/"><a className={router.pathname == "/" ? "active nav-link" : "nav-link"}>Main</a></Link>
                            </li>
                            <li className="menu__item">
                                <Link href="/blog"><a className={router.pathname == "/blog" || router.pathname == "/post/[slug]" ? "active nav-link" : "nav-link"}>Blog</a></Link>
                            </li>
                            <li className="menu__item">
                                <Link href="/contacts"><a className={router.pathname == "/contacts" ? "active nav-link" : "nav-link"}>Contacts</a></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}
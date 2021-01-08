import MainLayout from "../components/MainLayout";

import Link from 'next/link'
import Image from "next/image";

let client = require('contentful').createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN
});



export async function getStaticProps() {
    let data = await client.getEntries({
        content_type: 'blogPost'
    });

    return {
        props: {
            posts: data.items
        }
    }
}

export default function Blog({posts}) {
    console.log(posts);
    return (
        <MainLayout>
            <h1>Blog</h1>
            <ul className="blog-list">
                {
                    posts.map(post => (
                        <li key={post.sys.id} className="blog-list__item">
                            <Link href={'/post/' + post.fields.slug}>
                                <a className="blog-list__link">
                                    <Image
                                        src={'https:' + post.fields.heroImage.fields.file.url}
                                        alt={post.fields.title}
                                        width={post.fields.heroImage.fields.file.details.image.width}
                                        height={post.fields.heroImage.fields.file.details.image.height}
                                    />
                                    <h3 className="blog-list__title">{post.fields.title}</h3>
                                </a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </MainLayout>
    )
}
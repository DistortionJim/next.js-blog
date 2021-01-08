import MainLayout from "../../components/MainLayout";

import {BLOCKS} from "@contentful/rich-text-types"

import Image from "next/image";

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

let client = require('contentful').createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN
});



export async function getStaticPaths() {
    let data = await client.getEntries({
        content_type: 'blogPost'
    });
    return  {
        paths: data.items.map(item => ({
            params: {
                slug: item.fields.slug
            },
        })),
        fallback: true
    }
}

export async function getStaticProps({params}) {
    let data = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': params.slug
    });
    return  {
        props: {
            post: data.items[0]
        },
        revalidate: 3
    }
}

export default function Post ({post}) {
    if (!post) return <div>404</div>
    return (
        <MainLayout>
            <div className="hero">
                <Image
                    src={'https:' + post.fields.heroImage.fields.file.url}
                    alt={post.fields.title}
                    width={post.fields.heroImage.fields.file.details.image.width}
                    height={post.fields.heroImage.fields.file.details.image.height}
                />
                <h1>{post.fields.title}</h1>
            </div>
            <div className="content">
                {documentToReactComponents(post.fields.content, {
                    renderNode: {
                        [BLOCKS.EMBEDDED_ASSET]: node =>
                            <Image
                                src={'https:' + node.data.target.fields.file.url}
                                width={node.data.target.fields.file.details.image.width}
                                height={node.data.target.fields.file.details.image.height}
                            />
                    }
                })}
            </div>
            <hr/>
            <address>
                {post.fields.author.fields.name}, {post.fields.author.fields.title}, {post.fields.publishDate}
            </address>
            <hr/>

        </MainLayout>
    )
}
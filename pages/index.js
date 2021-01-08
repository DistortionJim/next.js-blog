import MainLayout from "../components/MainLayout";

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {BLOCKS} from "@contentful/rich-text-types";
import Image from "next/image";

let client = require('contentful').createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN
});

export async function getStaticProps() {
    let data = await client.getEntries({
        content_type: 'main'
    });

    return {
        props: {
            main: data.items[0]
        },
        revalidate: 3
    }
}

export default function Home({main}) {
    console.log('main', main);
    return (
        <MainLayout title="Main">
            <h1>STAR WARS</h1>
            <div className="content">
                {documentToReactComponents(main.fields.texts, {
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
        </MainLayout>
  )
}

import MainLayout from "../components/MainLayout";
import Image from "next/image";
import Link from "next/link";

let client = require('contentful').createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN
});

export async function getStaticProps() {
    let data = await client.getEntries({
        content_type: 'person'
    });

    return {
        props: {
            person: data.items
        },
        revalidate: 3
    }
}

export default function Contacts({person}) {
    return (
        <MainLayout title="Contacts">
            <ul className="breadcrumbs">
                <li><Link href="/">Main</Link></li>
                <li>Contacts</li>
            </ul>
            <h1>Contacts</h1>
            <h2>{person[0].fields.name}</h2>
            <div className="avatar">
                <Image
                    src={'https:' + person[0].fields.image.fields.file.url}
                    alt={person[0].fields.title}
                    width={person[0].fields.image.fields.file.details.image.width}
                    height={person[0].fields.image.fields.file.details.image.height}
                />
            </div>
            <ul className="info">
                <li><b>Company</b>: {person[0].fields.company}</li>
                <li><b>Position</b>: {person[0].fields.title}</li>
                <li><b>Email</b>: {person[0].fields.email}</li>
            </ul>
            <p>{person[0].fields.shortBio}</p>
        </MainLayout>
    )
}
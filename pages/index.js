import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head';

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>React Meeetups</title>
                <meta 
                    name='description'
                    content='Browse a huge list of highly active React meetups!' 
                ></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

// runs every request
// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     }
// }

export async function getStaticProps() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyowl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const client = await MongoClient.connect(uri)
    
    const db = client.db(process.env.DB_NAME)

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()

    client.close()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}

export default HomePage
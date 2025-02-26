import { MongoClient, ObjectId } from 'mongodb'
import MeetUpDetail from '../../components/meetups/MeetupDetail'

const MeetUpDetails = (props) => {
    console.log(props)
    return (
        <>
            <MeetUpDetail
                image={props.meetup.image}
                title={props.meetup.title}
                address={props.meetup.address}
                description={props.meetup.description}
            />
        </>
    )
}

export async function getStaticPaths() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyowl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const client = await MongoClient.connect(uri)
    
    const db = client.db(process.env.DB_NAME)

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({}, { _id: 1}).toArray()

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))   
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyowl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const client = await MongoClient.connect(uri)
    
    const db = client.db(process.env.DB_NAME)

    const meetupsCollection = db.collection('meetups')

    const meetupId = context.params.meetupId
    
    const selectedMettup =  await meetupsCollection.findOne({ _id: new ObjectId(meetupId)})

    return {
        props: {
            meetup : {
                title: selectedMettup.title,
                address: selectedMettup.address,
                image: selectedMettup.image,
                description: selectedMettup.description,
                id: selectedMettup._id.toString(),
            }
        }
    }
}

export default MeetUpDetails
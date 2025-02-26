import MeetUpDetail from '../../components/meetups/MeetupDetail'

const MeetUpDetails = (props) => {
    return (
        <>
            <MeetUpDetail
                image={props.image}
                title={props.title}
                address={props.address}
                description={props.description}
            />
        </>
    )
}

export async function detStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId
    
    return {
        props: {
            meetup :{
                id: meetupId,
                image : "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                title : "First meetup",
                address :"Kampala, Uganda",
                description : "Meetup description"
            }
        }
    }
}

export default MeetUpDetails
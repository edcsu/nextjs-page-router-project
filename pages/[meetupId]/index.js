import MeetUpDetail from '../../components/meetups/MeetupDetail'

const MeetUpDetails = (props) => {
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
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: '67dc5555-bb68-4d5b-84df-d93169c9aaeb'
                }
            },
            {
                params: {
                    meetupId: 'a36b4e87-0571-4ea1-a947-7d770c90184c'
                }
            }
        ]
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId
    
    return {
        props: {
            meetup : {
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
import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
    {
        id: '67dc5555-bb68-4d5b-84df-d93169c9aaeb',
        title: 'Next JS in Kampala',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        address: 'Kampala, Uganda',
        description: 'Our first meetup!!!!'
    },
    {
        id: 'a36b4e87-0571-4ea1-a947-7d770c90184c',
        title: 'React JS in Mbarara',
        image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        address: 'Mbarara, Uganda',
        description: 'Reacting to the best JS devs'
    },
]

const HomePage = (props) => {
    return (
        <>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

export async function getStaticProps() {
    
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        revalidate: 1
    }
}

export default HomePage
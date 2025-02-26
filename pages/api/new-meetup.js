// /api/new-meetup

import { MongoClient } from "mongodb"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body

        const { title, image, address, description } = data
        
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyowl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

        const client = await MongoClient.connect(uri)
        
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne(data)

        console.log(result)

        client.close()

        res.status(201).json({ message: 'Meetup added', ...result})
    }
}

export default handler
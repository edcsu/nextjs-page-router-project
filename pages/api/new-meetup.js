// /api/new-meetup

import { MongoClient } from "mongodb"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body

        const { title, image, address, description } = data

        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyowl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

        const client = await MongoClient.connect(uri)
        
        const db = client.db(process.env.DB_NAME)

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne(data)

        client.close()

        res.status(201).json({ message: 'Meetup added', ...result})
    }
}

async function run(client) {
    try {
      // Connect the client to the server(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db(process.env.DB_NAME).command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err){
        console.log(err)
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

export default handler
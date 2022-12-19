const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k05o9k1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('oakRoom').collection('services')
        const orderCollection = client.db('oakRoom').collection('orders')
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });


        app.get('/review', async (req, res) => {
            console.log(req.query)
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })

        app.post('/review', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.send(result);
        })

        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result=await orderCollection.deleteOne(query)
        })
    }
    finally {
        
    }
}
run().catch(err=>console.error(err))

app.get('/', (req, res) => {
    res.send('Food meania projects is runnig')
})
app.listen(port, () => {
    console.log(`food menia server is runnig on ${port}`)
});
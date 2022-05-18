const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
var cors = require("cors");

app.use(cors());
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://farhan:JfipvNhSctsD3I7s@cluster0.te49d.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        console.log('db connect')
        const todoCollection = client.db("taskStore").collection("tasks");

        app.get("/tasks", async (req, res) => {
            const q = req.query;
            console.log(q)
            const cursor = todoCollection.find(q);
            const result = await cursor.toArray()

            res.send(result);
        })

        app.post("/task", async (req, res) => {
            const data = req.body;
            console.log(data)
            const result = await todoCollection.insertOne(data);
            res.send(result);
        });

        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await todoCollection.deleteOne(filter)
            res.send(result)
        })


    }
    finally {

    }

}
run().catch(console.dir)



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Todo app is listening at ${port}`))

//farhan
//JfipvNhSctsD3I7s


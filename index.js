const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.port || 5000;


// middlewire
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vdildbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // const database = client.db("usersDB");
        // const usersCollection = database.collection("users");
        const usersCollection = client.db("allCraftDB").collection("craft");
        
        
        



        // category

        const categoryCollection = client.db("categoryBD").collection("category");

        app.get('/category',async( req, res)=> {
            const cursor = categoryCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/category/:subcategory', async (req, res) => {
            // const cursor = usersCollection.find()
            const result = await usersCollection.find({ subcategoryName: req.params.subcategory }).toArray();
            res.send(result);
        })

      
        // category






        app.get('/addCrafts', async (req, res) => {
            const cursor = usersCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })




        app.get('/myCraft/:email', async (req, res) => {
            // const cursor = usersCollection.find()
            const result = await usersCollection.find({ email: req.params.email }).toArray();
            res.send(result);
        })



       // single product update /details
       app.get('/singleProduct/:id', async (req, res) => {
        // const cursor = usersCollection.find()
        const result = await usersCollection.findOne({ _id: new ObjectId(req.params.id), })
        res.send(result);
    })

    // details
    app.get('/details/:id', async (req, res) => {
        // const cursor = usersCollection.find()
        const result = await usersCollection.findOne({ _id: new ObjectId(req.params.id), })
        res.send(result);
    })



   


    app.put('/updateProduct/:id', async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        console.log(id, user);
        const filter = { _id: new ObjectId(id) }
        const options = { upsert: true }
        const updateUser = {
            $set: {

                // const updateCraft = { displayName, email, item_name, subcategoryName, description, price, rating, processingTime, customization, stockStatus, image }

                item_name: user.item_name,
                subcategoryName: user.subcategoryName,
                description: user.description,
                price: user.price,
                rating: user.rating,
                processingTime: user.processingTime,
                customization: user.customization,
                stockStatus: user.stockStatus,
                image: user.image

            }
        }

        const result = await usersCollection.updateOne(filter, updateUser, options);
        res.send(result);

    })

    app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;

        console.log('delete form database ', id);

        const query = { _id: new ObjectId(id) }
        const result = await usersCollection.deleteOne(query);
        res.send(result);

    })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send('Art and craft Curd Is Running')
})

app.listen(port, () => {
    console.log(`Art and craft Curd Is RUNNING on port,${port}`)
})
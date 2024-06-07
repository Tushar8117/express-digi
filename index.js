import express from 'express';

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// Add a tea
app.post('/teas', (req,res) => {
    const {name , price } = req.body
    const newtea = {id: nextId++,name,price};
    teaData.push(newtea);
    console.log("POST");
    res.status(201).send(newtea);
});

// Get All teas
app.get('/teas', (req,res) => {
    console.log("GET tea");

    res.status(200).send(teaData);
})


//Get a tea with id
app.get('/teas/:id', (req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("Tea is not found")
    }

    res.status(200).send(tea);
})

//Update a tea 
app.put('/teas/:id', (req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));

    if(!tea){

       return res.status(404).send("Tea not found");
    }

    const {name,price} = req.body
    tea.name = name;
    tea.price = price;
    console.log("Update the tea");

    res.status(200).send(tea);
});


//Delete tea
app.delete('/teas/:id', (req,res) => {
    console.log("deleted");
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("Tea is not found");
    }
    teaData.slice(index, 1)
    return res.status(200).send("Deleted");
})

app.listen(port, () => {
    console.log(`Server is running at : ${ port}...`);
})
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Food meania projects is runnig')
})
app.listen(port, () => {
    console.log(`food menia server is runnig on ${port}`)
});
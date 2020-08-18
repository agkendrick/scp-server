const express = require('express');
const cors = require('cors');
const getAverages = require('./index').getAverages;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const [mean, median, mode] = await getAverages();
        
        res.json({mean, median, mode});
    }
    catch(e)
    {
        res.status(400).send('Error retrieving averages: ' + e.message);
    }

});

app.get('/search/:searchType/:searchInput', async (req, res) => {
    try {
        let { params: { searchType, searchInput }} = req;
    
        const [mean, median, mode] = await getAverages(searchInput, searchType)
    
        res.json({mean, median, mode});
    } 
    catch(e)
    {
        res.status(400).send('Error retrieving averages: ' + e.message);
    }

});

app.listen(PORT, () => console.log(`listening on port ${ PORT }`));
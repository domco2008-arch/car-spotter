const express = require('express');
const app = express();

// Render si sám priradí port, ak ho nepozná, použije sa 3000
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Dočasné úložisko áut
let cars = [];

// Zistenie zoznamu áut
app.get('/api/cars', (req, res) => {
    res.json(cars);
});

// Pridanie nového auta
app.post('/api/cars', (req, res) => {
    const carName = req.body.name;
    if (carName) {
        cars.push({ id: Date.now(), name: carName });
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Chýba názov auta' });
    }
});

app.listen(PORT, () => {
    console.log(`Server beží na porte ${PORT}`);
});
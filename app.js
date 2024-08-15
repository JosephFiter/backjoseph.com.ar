const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3000;

const supabaseUrl = "https://eflbswavtctlxszlnzks.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmbGJzd2F2dGN0bHhzemxuemtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2ODQ1MTcsImV4cCI6MjAzOTI2MDUxN30.vqBOuy7zozGPbilbNexOdACWnoVnx8R6irlLuBo7vK4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Datos de ejemplo
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// Obtener todos los elementos
app.get('/items', (req, res) => {
  res.json(items);
});

// Crear un nuevo elemento
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Obtener todos los juegos desde la base de datos de Supabase
app.get('/juegos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Juegos')
      .select('*');

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();

const supabaseUrl = "https://eflbswavtctlxszlnzks.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmbGJzd2F2dGN0bHhzemxuemtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2ODQ1MTcsImV4cCI6MjAzOTI2MDUxN30.vqBOuy7zozGPbilbNexOdACWnoVnx8R6irlLuBo7vK4";
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const models = require('./models'); 

// Importar as rotas
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');  
const paymentRoutes = require('./routes/paymentRoutes');  
const supplierRoutes = require('./routes/supplierRoutes'); 

const app = express();

// Configurar o CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/users', userRoutes);  
app.use('/payment', paymentRoutes);  
app.use('/fornecedores', supplierRoutes); 

//teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});


app.use((err, req, res, next) => {
  console.error('Erro Global:', err);
  res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
});


const PORT = process.env.PORT || 5001;


sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync({ alter: true }); 
  })
  .then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');  
const paymentRoutes = require('./routes/paymentRoutes');  

// Importe todos os modelos
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const app = express();

app.use(express.json());

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/users', userRoutes);  
app.use('/payment', paymentRoutes);  

const PORT = process.env.PORT || 3000;


sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

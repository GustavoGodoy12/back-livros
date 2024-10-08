const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.processarPagamentoCartao = async (req, res) => {
  try {
    const { userId, valorTotal, numeroCartao, cvv, dataValidade } = req.body;
    
  
    
    const transaction = await Transaction.create({
      userId,
      valorTotal,
      metodoPagamento: 'cartão de crédito',
      status: 'concluído'
    });
    
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.processarPagamentoPix = async (req, res) => {
  try {
    const { userId, valorTotal } = req.body;
    

    
    const transaction = await Transaction.create({
      userId,
      valorTotal,
      metodoPagamento: 'PIX',
      status: 'pendente'
    });
    
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.consultarTransacao = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.transactionId, {
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

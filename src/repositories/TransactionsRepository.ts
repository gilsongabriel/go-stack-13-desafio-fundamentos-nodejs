import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome',
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0
    };
  }

  public all(): Transaction[] {
    return this.transactions;    
  }

  public getBalance(): Balance {
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0
    };

    this.transactions.map(transaction => {
      if (transaction.type === 'income') this.balance.income += transaction.value;
      if (transaction.type === 'outcome') this.balance.outcome += transaction.value;
      this.balance.total = this.balance.income - this.balance.outcome;
    });

    return this.balance;
  }

  public create({title, type, value}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, type, value});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

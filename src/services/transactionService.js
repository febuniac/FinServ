const db = require('../models/db');
class TransactionService {
  static async list(filters) { return db('transactions').where(filters).orderBy('created_at', 'desc'); }
  static async getById(id) { return db('transactions').where({ id }).first(); }
  static async transfer(data) {
    return db.transaction(async (trx) => {
      await trx('accounts').where({ id: data.from_account }).decrement('balance', data.amount);
      await trx('accounts').where({ id: data.to_account }).increment('balance', data.amount);
      return trx('transactions').insert(data).returning('*');
    });
  }
}
module.exports = TransactionService;

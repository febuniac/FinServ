const db = require('../models/db');
class AccountService {
  static async list(userId) { return db('accounts').where({ user_id: userId }); }
  static async getById(id) { return db('accounts').where({ id }).first(); }
  static async create(data, userId) { return db('accounts').insert({ ...data, user_id: userId }).returning('*'); }
  static async update(id, data) { return db('accounts').where({ id }).update(data).returning('*'); }
  static async delete(id) { return db('accounts').where({ id }).del(); }
}
module.exports = AccountService;

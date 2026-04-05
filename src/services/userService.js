const db = require('../models/db');
const jwt = require('jsonwebtoken');

class UserService {
  static async register(data) {
    const [user] = await db('users').insert(data).returning('*');
    return user;
  }
  static async login({ email, password }) {
    const user = await db('users').where({ email }).first();
    if (!user) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
  }
  static async getProfile(userId) {
    return db('users').where({ id: userId }).first();
  }
}
module.exports = UserService;

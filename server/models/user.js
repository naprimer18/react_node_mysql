import pkg from 'mongoose'
const { Schema, model } = pkg;

const schema = new Schema({
  login: { type: 'string' },
  password: { type: 'string' }
});

export default model('User', schema);
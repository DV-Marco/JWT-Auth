const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

userSchema.statics.encryptPass = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.validatePass = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema);


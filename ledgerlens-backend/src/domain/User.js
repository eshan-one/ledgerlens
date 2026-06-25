class User {
  constructor({ id, name, email, passwordHash }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  verifyPassword(plainTextPassword) {
    throw new Error("Not implemented yet");
  }
}

module.exports = User;

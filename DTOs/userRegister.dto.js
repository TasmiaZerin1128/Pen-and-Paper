class UserRegisterDTO{
    constructor(user) {
        this.fullName = user.fullName,
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }
  }

  module.exports = UserRegisterDTO;
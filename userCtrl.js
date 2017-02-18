let app = require('./server.js') ;
const users = require('./users.js');

var userCtrl = {
  readAll: function() {
    return users.find();
  },
  findUserById: function(userId) {
    var userById = users.findOne('id', userId);
    if (userById) {
      return userById;
    } else {
      return null;
    }
  },
  getAdmins: function() {
    var admins = users.find('type', 'admin');
    if (admins) {
      return admins;
    } else {
      return null;
    }
  },
  getNonAdmins: function() {
    var nonAdmins = users.find('type', 'user');
    if (nonAdmins) {
      return nonAdmins;
    } else {
      return null;
    }
  },
  getUsersByFavorite: function(fav) {
    var allUsers = users.find();
    var favUsers = allUsers.filter(function(user) {
      if (user.favorites.toString().indexOf(fav) >= 0) {
        return user;
      }
    });
    if (favUsers) {
      return favUsers;
    } else {
      return null;
    }
  },
  getUsersByAgeLimit: function(age) {
    var allUsers = users.find();
    var underAge = allUsers.filter(function(user) {
      if (user.age < age) {
        return user;
      }
    });
    if (underAge) {
      return underAge;
    } else {
      return null;
    }
  },
  findUserByQuery: function(term, val) {
    if (term === 'last_name' || term === 'Email') {
      var queryResult = users.find(term, val);
      if (queryResult) {
        return queryResult;
      } else {
        return null;
      }
    } else {
      var queryResult = users.find(term, val);
      if (queryResult) {
        return queryResult;
      } else {
        return null;
      }
    }
  },
  createUser: function(newUser) {
    var addedUser = users.add(newUser);
    if (addedUser) {
      return addedUser;
    } else {
      return null;
    }
  },
  updateUser: function(userId, obj) {
    users.update('id', userId, obj);
    var updatedUser = users.findOne('id', userId);
    if (updatedUser) {
      return updatedUser;
    } else {
      return null;
    }
  },
  removeUser: function(userId) {
    var removedUser = users.findOne('id', userId);
    users.remove('id', userId);
    if (removedUser) {
      return removedUser;
    } else {
      return null;
    }
  }
}

module.exports = userCtrl;

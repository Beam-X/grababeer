angular.module('starter.services', [])

.factory('Session', function($rootScope, $localStorage, Users){
  return {
    login: (user) => {
      $localStorage.set('currentUserId', user.id)
    },

    currentUser: () => {
      return Users.get($localStorage.get('currentUserId'))
    }
  }
})

.factory('$localStorage', function($window){
  return {
    set: (key, value) => {
      $window.localStorage[key] = JSON.stringify(value);
    },

    get: (key) => {
      let val;
      if (val = $window.localStorage[key])
        return JSON.parse(val)
      else
        return undefined
    }
  }
})

.factory('Users', function($q){
  const users = [
    {
      id: 1,
      name: 'Adam',
      picture: 'img/adam.jpg',
      age: 24,
    },
    {
      id: 2,
      name: 'Gia',
      picture: 'img/gia.jpg',
      age: 25,
    },
    {
      id: 3,
      name: 'Ben',
      picture: 'img/ben.png',
      age: 35,
    },
    {
      id: 4,
      name: 'Tomek',
      picture: 'img/tomek.jpg',
      age: 40,
    }
  ]
  return {
    list: () => $q.when(users),
    get: (id) => users.filter((u) => u.id === id)[0]
  }
});

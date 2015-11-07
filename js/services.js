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

.factory('PossibleMatches', function(Users){
  let matches = undefined;
  let idx = undefined;

  return {
    init: (user) => {
      matches = Users.list().filter((u) => u.id !== user.id)
      idx = 0
    },

    next: () => {
      return matches[idx++]
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
      music: [
        { name: "Jazz", checked: false },
        { name: "R&B", checked: true },
        { name: "Rock", checked: false },
      ],
      sports: [
        { name: "Soccer", checked: true},
        { name: "Basketball", checked: true},
        { name: "Rugby", checked: true},
      ],
      others: 'Travelling, Jamming',
      info: "24 years old. Speak English. Loves soccer, R&B and travelling.",
    },
    {
      id: 2,
      name: 'Gia',
      picture: 'img/gia.jpg',
      age: 24,
      music: [
        { name: "Jazz", checked: false },
        { name: "R&B", checked: true },
        { name: "Rock", checked: false },
      ],
      sports: [
        { name: "Soccer", checked: true},
        { name: "Basketball", checked: true},
        { name: "Rugby", checked: false},
      ],
      others: 'Travelling, Arts',
      age: 25,
      info: "25 years old. Speak English. Loves soccer, R&B and travelling.",
    },
    {
      id: 3,
      name: 'Ben',
      picture: 'img/ben.png',
      age: 35,
      music: [
        { name: "Jazz", checked: false },
        { name: "R&B", checked: true },
        { name: "Rock", checked: true },
      ],
      sports: [
        { name: "Soccer", checked: true},
        { name: "Basketball", checked: false},
        { name: "Rugby", checked: true},
      ],
      others: 'Arts',
      info: "35 years old. Speak English. Loves soccer, R&B and travelling.",
    },
    {
      id: 4,
      name: 'Tomek',
      picture: 'img/tomek.jpg',
      age: 40,
      music: [
        { name: "Jazz", checked: true },
        { name: "R&B", checked: true },
        { name: "Rock", checked: false },
      ],
      sports: [
        { name: "Soccer", checked: false},
        { name: "Basketball", checked: false},
        { name: "Rugby", checked: true},
      ],
      others: 'Travelling',
      info: "40 years old. Speak English. Loves soccer, R&B and travelling.",
    }
  ]
  return {
    list: () => users,
    get: (id) => users.filter((u) => u.id === id)[0]
  }
});

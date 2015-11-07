angular.module('starter.services', [])

.factory('Session', function($rootScope){
  return {
    login: (user) => $rootScope.currentUser = user
  }
})

.factory('Users', function($q){
  const users = [
    {
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
      others: 'Travelling, Arts'
    },
    {
      name: 'Tomek',
      picture: 'img/tomek.jpg',
      age: 36,
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
      others: 'Travelling'
    }
  ]
  return {
    list: () => $q.when(users)
  }
});

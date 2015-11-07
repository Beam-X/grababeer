angular.module('starter.services', [])

.factory('Users', function($q){
  const users = [
    {
      name: 'Gia',
      picture: 'img/gia.jpg'
    },
    {
      name: 'Tomek',
      picture: 'img/tomek.jpg'
    }
  ]
  return {
    list: () => $q.when(users)
  }
});

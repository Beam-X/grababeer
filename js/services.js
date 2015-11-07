angular.module('starter.services', [])

.factory('Session', function(){
  return {
    currentUser: null
  }
})

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

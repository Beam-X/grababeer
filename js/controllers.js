angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ProfileCtrl', function($log, $scope, user){
  $log.debug('>>ProfileCtrl')
  $log.debug('user', user)
  $scope.user = user;
})

.controller('AccountsCtrl', function($log, $scope, $state, users, Session) {
  $log.debug('>>AccountsCtrl')
  $scope.users = users
  $scope.select = (user) => {
    Session.login(user);
    $state.go('profile')
    $log.debug(user)
  }
});

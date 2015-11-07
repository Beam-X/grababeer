angular.module('starter.controllers', [])

.controller('TabsCtrl', function($log, $rootScope, currentUser){
  $log.debug('>>TabsCtrl');
  $rootScope.currentUser = currentUser;
})

.controller('ProfileCtrl', function($log, $scope, $state){
  $log.debug('>>ProfileCtrl', $scope)
  $log.debug('user', $scope.currentUser)

  $scope.save = (user) => {
    $state.go('tab.home')
  }
})

.controller('HomeCtrl', function($log, $scope){
  $log.debug('>>HomeCtrl', $scope.currentUser)
})

.controller('AccountsCtrl', function($log, $scope, $state, users, Session) {
  $log.debug('>>AccountsCtrl')
  $scope.users = users
  $scope.select = (user) => {
    Session.login(user);
    $state.go('tab.profile')
    $log.debug(user)
  }
});

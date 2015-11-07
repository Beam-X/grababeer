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

.controller('HomeCtrl', function($log, $scope, $state, PossibleMatches){
  $log.debug('>>HomeCtrl', $scope.currentUser)

  $scope.letsGrabABeer = (user) => {
    PossibleMatches.init(user)
    let next = PossibleMatches.next()
    $log.debug('next', next)
    $state.go('^.match', {user: next.id})
  }
})

.controller('MatchCtrl', function($log, $scope, $state, user, nextUser, Notifications){
  $log.debug('>>MatchCtrl', user)
  $log.debug('nextUser', nextUser)

  $scope.user = user;

  function next(){
    if (nextUser)
      $state.go('^.match', {user: nextUser.id})
    else
      $state.go('^.home')
  }

  $scope.ignore = (user) => {
    $log.debug('ignore', user);
    next()
  }

  $scope.match = (user) => {
    $log.debug('match', user);
    Notifications.requestMatch($scope.currentUser, user)
    next()
  }
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

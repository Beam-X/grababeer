// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'firebase',
])

.constant("FIREBASE_URL", "https://grababeer.firebaseio.com/")

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($log, $rootScope, Notifications){
  $rootScope.$on('grababeer:login', function(e, user){
    $log.debug('grababeer:login', user.name)

    Notifications.listen(user);

    $rootScope.$on('grababeer:match-request', function(e, from){
      $log.debug('grababeer:match-request', from.name)
    })
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('accounts', {
    url: '/accounts',
    templateUrl: 'templates/accounts.html',
    controller: 'AccountsCtrl',
    resolve: {
      users: (Users) => Users.list()
    },
    data: {
      skipAuth: true
    }
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl',
    resolve: {
      currentUser: (Session)=> Session.currentUser()
    }
  })

  .state('tab.profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl',
  })
  
  .state('tab.first', {
    url: '/first',
    templateUrl: 'templates/first.html',
  })

  .state('tab.home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl',
  })

  .state('tab.match', {
    url: '/match/:user',
    templateUrl: 'templates/match.html',
    controller: 'MatchCtrl',
    resolve: {
      user: ($log, $stateParams, Users) => {
        return Users.get(parseInt($stateParams.user))
      },

      nextUser: (PossibleMatches) => PossibleMatches.next()
    }
  })

  .state('tab.waiting_success', {
    url: '/waiting_success',
    templateUrl: 'templates/waiting_success.html',
  })

  .state('notification', {
    url: '/notification/:user',
    templateUrl: 'templates/notification.html',
    controller: 'NotificationCtrl',
    resolve: {
      user: ($log, $stateParams, Users) => {
        return Users.get(parseInt($stateParams.user))
      }
    }
  })

  .state('tab.success', {
    url: '/success/:buddy',
    templateUrl: 'templates/success.html',
    resolve: {
      buddy: ($log, $stateParams, Users) => {
        return Users.get(parseInt($stateParams.buddy))
      }
    },
    controller: 'SuccessCtrl',
  })

  .state('tab.promo', {
    url: '/promo',
    templateUrl: 'templates/promo.html'
  })

  .state('tab.checkout', {
    url: '/checkout',
    templateUrl: 'templates/checkout.html'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/first');
})

.run(function($log, $rootScope, $state, Session){
  $log.debug('RUN')
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    $log.debug('$stateChangeError');
    $log.debug('  toState', toState.name);
    $log.debug('  toParams', toParams);
    $log.debug('  error', error)
  })

  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams) => {
    $log.debug('$stateChangeSuccess');
    $log.debug('  toState', toState.name);
    $log.debug('  toParams', toParams);
  })

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    $log.debug('$stateChangeStart');
    $log.debug('  toState', toState.name);
    $log.debug('  toParams', toParams);

    $log.debug('  currentUser', Session.currentUser())
    if (toState.data && toState.data.skipAuth){
      //continue
    }
    else {
      if (!Session.currentUser()){
        $log.debug('forbidden');
        event.preventDefault();
        $state.go('accounts');
      }
    }
  });
})

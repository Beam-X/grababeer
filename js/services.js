angular.module('starter.services', [])

.factory('Session', function($log, $rootScope, $localStorage, Users){
  let currentUser = undefined;

  let api = {
    login: (user) => {
      currentUser = user;
      $localStorage.set('currentUserId', user.id)
      $rootScope.$broadcast('grababeer:login', user)
    },

    currentUser: () => {
      return currentUser;
    }
  }

  let user = Users.get($localStorage.get('currentUserId'))
  if (user)
    api.login(user);

  return api;
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

.factory('MatchesRef', function($log, FIREBASE_URL){
  return new Firebase(`${FIREBASE_URL}/matches`);
})

.factory('Matches', function($log, $firebaseArray, MatchesRef){
  return $firebaseArray(MatchesRef)
})

.factory('Notifications', function($rootScope, $log, MatchesRef){
  function idAndName(obj){
    return {
      id: obj.id,
      name: obj.name
    }
  }

  function buildMatch(me, buddy, status){
    return {
      me: idAndName(me),
      buddy: idAndName(buddy),
      createdAt: new Date().getTime(),
      status,
    }
  }

  return {
    listen: (me) => {
      let startAt = (new Date().getTime()) - 10 * 1000;
      MatchesRef
        .orderByChild('createdAt')
        .startAt(startAt)
        .on('child_added', function(snap){
          let notification = snap.val();
          $log.debug('child_added', notification);
          if (notification.buddy.id == me.id && notification.status == 'pending')
            $rootScope.$broadcast('grababeer:match-request', notification.me);
          else if (notification.me.id == me.id && notification.status == 'success')
            $rootScope.$broadcast('grababeer:match-success', notification.buddy);
        })
    },

    requestMatch: (me, buddy) => {
      MatchesRef.push(buildMatch(me, buddy, 'pending'))
    },

    acceptMatch: (buddy, me) => {
      MatchesRef.push(buildMatch(me, buddy, 'success'))
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

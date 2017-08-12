// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform,$rootScope) {
        $ionicPlatform.ready(function () {
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
        $rootScope.login=0;
        $rootScope.samename=0;
        $rootScope.likeseed=0;
        $rootScope.voidname=0;
        $rootScope.wrongcode=0;
        $rootScope.dianzan=0;
        $rootScope.token="";
        if(localStorage.getItem("login")=="1"){
            $rootScope.login=1;
            $rootScope.token=localStorage.getItem("token");
        }
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('false').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('false').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                views: {
                    'main': {
                        abstract: true,
                        templateUrl: 'templates/tabs.html'
                    }
                }

            })

            // Each tab has its own nav history stack:

            .state('tab.tucao', {
                url: '/tucao',
                views: {
                    'tab-tucao': {
                        templateUrl: 'templates/tab-tucao.html',
                        controller: 'TucaoCtrl'
                    }
                }
            })
            .state('tucao-detail', {
                url: '/tucaoDetail/:id',
                views: {
                    'main': {
                        templateUrl: 'templates/tucao-details.html',
                        controller: 'TucaoDetailCtrl'
                    }
                }
            })
            .state('tab.ask', {
                url: '/ask',
                views: {
                    'tab-ask': {
                        templateUrl: 'templates/tab-ask.html',
                        controller: 'AskCtrl'
                    }
                }
            })
            .state('ask-detail', {
                url: '/askDetail/:id',
                views: {
                    'main': {
                        templateUrl: 'templates/ask-details.html',
                        controller: 'AskDetailCtrl'
                    }
                }
            })
            .state('tab.notify', {
                url: '/notify',
                views: {
                    'tab-notify': {
                        templateUrl: 'templates/tab-notify.html',
                        controller: 'NotifyCtrl'
                    }
                }
            })
            .state('notify-detail', {
                url: '/notifyDetail/:id',
                views: {
                    'main': {
                        templateUrl: 'templates/notify-details.html',
                        controller: 'NotifyDetailCtrl'
                    }
                }
            })
             .state('login', {
                url: '/login',
                views: {
                    'main': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('loginfabiao', {
                url: '/loginfabiao',
                views: {
                    'main': {
                        templateUrl: 'templates/loginfabiao.html',
                        controller: 'LoginfabiaoCtrl'
                    }
                }
            })
             .state('enroll', {
                url: '/enroll',
                views: {
                    'main': {
                        templateUrl: 'templates/enroll.html',
                        controller: 'EnrollCtrl'
                    }
                }
            })
            .state('publish-tucao', {
                url: '/publish-tucao',
                views: {
                    'main': {
                        templateUrl: 'templates/publish-tucao.html',
                        controller: 'PublishTucaoCtrl'
                    }
                }
            })

            .state('publish-zixun', {
                url: '/publish-zixun',
                views: {
                    'main': {
                        templateUrl: 'templates/publish-zixun.html',
                        controller: 'PublishZixunCtrl'
                    }
                }
            })

            .state('person', {
                url: '/person',
                views: {
                    'main': {
                        templateUrl: 'templates/person.html',
                        controller: 'PersonCtrl'
                    }
                }
            });;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/tucao');

    });

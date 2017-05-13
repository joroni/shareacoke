angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })


    .state('tab.cart', {
        url: '/cart',
        views: {
            'tab-cart': {
                templateUrl: 'templates/cart.html',
                controller: 'cartCtrl'
            }
        }
    })





    .state('tab.checkout', {
        url: '/checkout',
        views: {
            'tab-cart': {
                templateUrl: 'templates/checkout.html',
                controller: 'checkOutCtrl'
            }
        }

    })


    .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })









    .state('tab.signup', {
        url: '/signup',
        views: {
            'tab-login': {
                templateUrl: 'templates/signup.html',
                controller: 'signupCtrl'
            }
        }

    })

    .state('tab.login', {
        url: '/login',
        views: {
            'tab-login': {
                templateUrl: 'templates/tab-login.html',
                controller: 'loginCtrl',
                resolve: {
                    "check": function($location) {
                        if (sessionStorage.getItem('loggedin_id')) { $location.path('/profile'); } else { $location.path('/login'); }
                    }
                }
            }



        }
    })


    .state('tab.profile', {
        url: '/profile',
        views: {
            'tab-login': {
                templateUrl: 'templates/tab-profile.html',
                controller: 'profileCtrl'
            }
        }

    })


    .state('tab.favorites', {
        url: '/favorites',
        views: {
            'tab-login': {
                templateUrl: 'templates/favorites.html',
                controller: 'profileCtrl'
            }
        }

    })


    .state('tab.editprofile', {
        url: '/editprofile',
        views: {
            'tab-login': {
                templateUrl: 'templates/editprofile.html',
                controller: 'editProfileCtrl'
            }
        }

    })


    .state('tab.filterby', {
        url: '/filterby',
        views: {
            'tab-dash': {
                templateUrl: 'templates/filterby.html',
                controller: 'filterByCtrl'
            }
        }

    })








    .state('tab.sortby', {
        url: '/sortby',
        views: {
            'tab-dash': {
                templateUrl: 'templates/sortby.html',
                controller: 'sortByCtrl'
            }
        }

    })


    .state('tab.myorders', {
        url: '/myorders',
        views: {
            'tab-login': {
                templateUrl: 'templates/myorders.html',
                controller: 'myOrdersCtrl'
            }
        }


    })



    .state('tab.payment', {
        url: '/payment',
        views: {
            'tab-cart': {
                templateUrl: 'templates/payment.html',
                controller: 'paymentCtrl'
            }
        }


    })



    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    })


    .state('tab.productpage', {
        url: '/productpage',
        views: {
            'tab-dash': {
                templateUrl: 'templates/productpage.html',
                controller: 'productPageCtrl'
            }
        }

    });





    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

});
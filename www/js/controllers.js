angular.module('app.controllers', ['app.profiles'])




.controller('DashCtrls', function($scope) {})

.controller('BrandCtrls', function($scope) {})

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


.controller('DashCtrl', function($scope, $http, sharedCartService, sharedFilterService) {


    $scope.server_url = base_url;

    //put cart after menu
    var cart = sharedCartService.cart;



    $scope.slide_items = [{
            "p_id": "1",
            "p_name": "Beats Headphone",
            "p_description": "White Bass 4 in 1 Channels",
            "p_image_id": "slide_1",
            "p_ean": "183"
        },

        {
            "p_id": "2",
            "p_name": "Apple Mac Book Air",
            "p_description": "15-inch, i7 Intel Core, 16 GB RAM",
            "p_image_id": "slide_2",
            "p_ean": "171"
        },

        {
            "p_id": "3",
            "p_name": "Big Spicy Paneer Wrap",
            "p_description": "brand Description",
            "p_image_id": "slide_3",
            "p_ean": "167"
        }
    ];



    $scope.noMoreItemsAvailable = false; // lazy load list


    $scope.server_url = base_url;

    //loads the menu----onload event
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore(); //Added Infine Scroll
    });

    // Loadmore() called inorder to load the list 
    $scope.loadMore = function() {

        str = sharedFilterService.getUrl();
        $http.get(str).success(function(response) {
            $scope.menu_items = response.records;
            $scope.hasmore = response.has_more; //"has_more": 0	or number of items left
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });

        //more data can be loaded or not
        if ($scope.hasmore == 0) {
            $scope.noMoreItemsAvailable = true;
        }
    };


    //show brand page
    $scope.showProductInfo = function(id, desc, img, name, price) {
        localStorage.setItem('product_info_id', id);
        localStorage.setItem('product_info_desc', desc);
        localStorage.setItem('product_info_img', img);
        localStorage.setItem('product_info_name', name);
        localStorage.setItem('product_info_price', price);
        window.location.href = "#/tab/productpage";
    };

    //add to cart function
    $scope.addToCart = function(id, image, name, price) {
        cart.add(id, image, name, price, 1);
    };
})




.controller('cartCtrl', function($scope, sharedCartService, $ionicPopup, $state) {
    $scope.server_url = base_url;
    //onload event-- to set the values
    $scope.$on('$stateChangeSuccess', function() {
        $scope.cart = sharedCartService.cart;
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = sharedCartService.total_amount;
    });

    //remove function
    $scope.removeFromCart = function(c_id) {
        $scope.cart.drop(c_id);
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = sharedCartService.total_amount;

    };

    $scope.inc = function(c_id) {
        $scope.cart.increment(c_id);
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = sharedCartService.total_amount;
    };

    $scope.dec = function(c_id) {
        $scope.cart.decrement(c_id);
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = sharedCartService.total_amount;
    };

    $scope.checkout = function() {
        if ($scope.total_amount > 0) {
            $state.go('tab.checkout');
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'No item in your Cart',
                template: 'Please add Some Items!'
            });
        }
    };

})

.controller('checkOutCtrl', function($scope) {
    $scope.loggedin = function() {
        if (localStorage.getItem('loggedin_id') == null) { return 1; } else {
            $scope.loggedin_name = localStorage.getItem('loggedin_name');
            $scope.loggedin_id = localStorage.getItem('loggedin_id');
            $scope.loggedin_phone = localStorage.getItem('loggedin_phone');
            $scope.loggedin_address = localStorage.getItem('loggedin_address');
            $scope.loggedin_pincode = localStorage.getItem('loggedin_pincode');
            return 0;
        }
    };



})

.controller('indexCtrl', function($scope, sharedCartService) {
    //$scope.total = 10; 
})



.config(function($stateProvider, FB_APP_ID) {

    openFB.init({ appId: FB_APP_ID });


})

.controller('loginCtrl', function($scope, $http, $ionicPopup, $state, $ionicHistory, $ionicModal, $timeout) {
    $scope.user = {};




    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later FB ****************
    $ionicModal.fromTemplateUrl('templates/tab-login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
            $scope.modal.hide();
        },

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Login', $scope.loginData);
        //alert("Only the Facebook login is implemented in this sample app.");
        var alertPopup = $ionicPopup.alert({
            title: 'No item in your Cart',
            template: 'Only the Facebook login is implemented in this sample app.'
        });
        $scope.closeLogin();
    };

    $scope.fbLogin2 = function() {
        window.open('http://104.238.96.209:8080/testfb.html', '_blank', 'location=no');
    }


    /* FB  START **************** */
    $scope.fbLogin = function() {
        openFB.login(
            function(response) {
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded');
                    localStorage.setItem('authenticated', 1);
                    $scope.closeLogin();
                    $state.go('tab.fbprofile');
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });


                    window.location.href = "#/tab/fbprofile";
                }
                /*else {
                                   var alertPopup = $ionicPopup.alert({
                                       title: 'Ooooops!',
                                       template: 'Facebook login failed'
                                   });
                                   // alert('Facebook login failed');
                                   localStorage.setItem('authenticated', 0);



                               }*/


            }).error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
            // });
            localStorage.setItem('authenticated', 0);

        }, { scope: 'email,publish_actions' });


    }

    /* FB  END **************** */





    $scope.login = function() {
        str = base_url + '/' + "user-details.php?e=" + $scope.user.email + "&p=" + $scope.user.password;


        $http.get(str)
            .success(function(response) {
                $scope.user_details = response.records;
                localStorage.setItem('loggedin_name', $scope.user_details.u_name);
                localStorage.setItem('loggedin_id', $scope.user_details.u_id);
                localStorage.setItem('loggedin_phone', $scope.user_details.u_phone);
                localStorage.setItem('loggedin_address', $scope.user_details.u_address);
                localStorage.setItem('loggedin_pincode', $scope.user_details.u_pincode);
                /** custom */
                localStorage.setItem('loggedin_name', $scope.user_details.u_name);
                localStorage.setItem('loggedin_id', $scope.user_details.u_id);
                localStorage.setItem('loggedin_phone', $scope.user_details.u_phone);
                localStorage.setItem('loggedin_address', $scope.user_details.u_address);
                localStorage.setItem('loggedin_pincode', $scope.user_details.u_pincode);

                /** custom */

                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                lastView = $ionicHistory.backView();
                console.log('Last View', lastView);
                //BUG to be fixed soon
                if (lastView.stateId == "checkOut") { $state.go('tab.checkOut', {}, { location: "replace", reload: true }); } else {
                    $state.go('tab.profile', {}, { location: "replace", reload: true });
                }





            }).error(function() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            });
    };

})

.controller('signupCtrl', function($scope, $http, $ionicPopup, $state, $ionicHistory) {

    $scope.signup = function(data) {

        var link = base_url + '/' + 'signup.php';
        $http.post(link, { n: data.name, un: data.username, ps: data.password, ph: data.phone, add: data.address, pin: data.pincode })
            .then(function(res) {
                $scope.response = res.data.result;



                if ($scope.response.created == "1") {
                    $scope.title = "Account Created!";
                    $scope.template = "Your account has been successfully created!";

                    //no back option
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    $state.go('tab.login', {}, { location: "replace", reload: true });

                } else if ($scope.response.exists == "1") {
                    $scope.title = "Email Already exists";
                    $scope.template = "Please click forgot password if necessary";

                } else {
                    $scope.title = "Failed";
                    $scope.template = "Contact Our Technical Team";
                }

                var alertPopup = $ionicPopup.alert({
                    title: $scope.title,
                    template: $scope.template
                });


            });

    }
})

.controller('filterByCtrl', function($scope, sharedFilterService) {

    $scope.Categories = [
        { id: 1, name: 'Bags' },
        { id: 2, name: 'Coolers and Fridges' },
        { id: 3, name: 'Digital Gadgets' },
        { id: 4, name: 'Jackets and Hoodies' },
        { id: 5, name: 'Shirts' }
    ];

    $scope.getCategory = function(cat_list) {
        categoryAdded = cat_list;
        var c_string = ""; // will hold the category as string

        for (var i = 0; i < categoryAdded.length; i++) { c_string += (categoryAdded[i].id + "||"); }

        c_string = c_string.substr(0, c_string.length - 2);
        sharedFilterService.category = c_string;
        window.location.href = "#/tab/dash";
    };


})

.controller('sortByCtrl', function($scope, sharedFilterService) {
    $scope.sort = function(sort_by) {
        sharedFilterService.sort = sort_by;
        console.log('sort', sort_by);
        window.location.href = "#/tab/dash";
    };
})

.controller('paymentCtrl', function($scope) {
    $scope.payProcess = function() {
        alert('Payment Connection Needed');
    };

})





/********************* FB START *******************/
.controller('profileFBCtrl', function($scope, $rootScope, $ionicPopup, $ionicHistory, $state) {


    openFB.api({

        path: '/me',
        params: { fields: 'id,name,email' },
        success: function(user) {
            $scope.$apply(function() {
                // initial state is visible


                $scope.user = user;
                console.log(user.id)
                console.log(user.name)
                console.log(user.email)


                localStorage.setItem('authenticated', 1);

                localStorage.setItem('loggedin_name', $scope.user.name);
                localStorage.setItem('loggedin_id', $scope.user.email);
                //    localStorage.setItem('loggedin_user_about_me', $scope.user.user_about_me);
                localStorage.setItem('loggedin_address', $scope.user.u_address);
                localStorage.setItem('loggedin_pincode', $scope.user.u_pincode);

                var userFBaddress = $scope.user.u_address;
                var userFBpincode = $scope.user.u_pincode;
                if ($scope.user.u_address == 'undefined') {
                    $scope.user.u_address = '...';
                }
                if ($scope.user.u_pincode == 'undefined') {
                    $scope.user.u_pincode = '...';

                }


            });


            $scope.loggedin_name = localStorage.getItem('loggedin_name');
            $scope.loggedin_id = localStorage.getItem('loggedin_id');
            $scope.loggedin_phone = localStorage.getItem('loggedin_phone');
            $scope.loggedin_address = localStorage.getItem('loggedin_address');
            $scope.loggedin_pincode = localStorage.getItem('loggedin_pincode');

        },
        error: function(error) {


            //alert('No connection to Facebook. Did you log in?');
            var alertPopup = $ionicPopup.alert({
                title: 'No connection to Facebook',
                template: ' Did you log in?'
            });
            localStorage.setItem('authenticated', 0);


        }


    });






    $scope.fbLogout = function() {

        openFB.logout(function(response) {
            // user is now logged out
            localStorage.setItem('authenticated', 0);

            delete sessionStorage.loggedin_name;
            delete sessionStorage.loggedin_id;
            delete sessionStorage.loggedin_phone;
            delete sessionStorage.loggedin_address;
            delete sessionStorage.loggedin_pincode;

            /*** added **/
            delete localStorage.loggedin_name;
            delete localStorage.loggedin_id;
            delete localStorage.loggedin_phone;
            delete localStorage.loggedin_address;
            delete localStorage.loggedin_pincode;

            var alertPopup = $ionicPopup.alert({
                title: 'Alert!',
                template: 'You are now logged out.'
            });
            // alert('You are now logged out.');
            $state.go('tab.login', {}, { location: "replace", reload: true });
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
        })
    }

})

/********************* FB END *******************/






/********************* EMAIL START *******************/
.controller('profileCtrl', function($scope, $rootScope, $ionicPopup, $ionicHistory, $state) {



    $scope.loggedin_name = localStorage.getItem('loggedin_name');
    $scope.loggedin_id = localStorage.getItem('loggedin_id');
    $scope.loggedin_phone = localStorage.getItem('loggedin_phone');
    $scope.loggedin_address = localStorage.getItem('loggedin_address');
    $scope.loggedin_pincode = localStorage.getItem('loggedin_pincode');


    $scope.logout = function() {
        delete sessionStorage.loggedin_name;
        delete sessionStorage.loggedin_id;
        delete sessionStorage.loggedin_phone;
        delete sessionStorage.loggedin_address;
        delete sessionStorage.loggedin_pincode;

        /*** added */
        delete localStorage.loggedin_name;
        delete localStorage.loggedin_id;
        delete localStorage.loggedin_phone;
        delete localStorage.loggedin_address;
        delete localStorage.loggedin_pincode;

        /*** added */

        console.log('Logoutctrl', localStorage.getItem('loggedin_id'));

        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $state.go('tab.login', {}, { location: "replace", reload: true });
    };




})

/********************* EMAIL END *******************/


.controller('myOrdersCtrl', function($scope) {

})

.controller('editProfileCtrl', function($scope) {

})

.controller('favoratesCtrl', function($scope) {

})

.controller('productPageCtrl', function($scope) {

    //onload event
    angular.element(document).ready(function() {
        $scope.id = localStorage.getItem('product_info_id');
        $scope.desc = localStorage.getItem('product_info_desc');
        $scope.img = base_url + "/img/rewards/" + localStorage.getItem('product_info_img') + ".jpg";
        $scope.name = localStorage.getItem('product_info_name');
        $scope.price = localStorage.getItem('product_info_price');
    });


})






/***************** branding ******************/


.controller('BrandCtrl', function($scope, $http, sharedCartService2, sharedFilterService2) {


    $scope.server_url = base_url;

    //put cart after menu
    var cart2 = sharedCartService2.cart2;



    $scope.slide_items = [{
            "p_id": "4",
            "p_name": "Cappy Pulpy",
            "p_category": "4",
            "p_flavor": "Orange",

            "p_image_id": "slide_4",
            "p_ean": "5449000147042"
        },

        {
            "p_id": "5",
            "p_name": "Big Spicy Chicken Wrap",
            "p_flavor": "Product Flavor",
            "p_category": "0",
            "p_image_id": "slide_5",
            "p_ean": "171"
        },

        {
            "p_id": "6",
            "p_name": "Big Spicy Paneer Wrap",
            "p_flavor": "Product Flavor",
            "p_category": "0",
            "p_image_id": "slide_6",
            "p_ean": "167"
        }
    ];



    $scope.noMoreItemsAvailable = false; // lazy load list


    $scope.server_url = base_url;

    //loads the menu----onload event
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore(); //Added Infine Scroll
    });

    // Loadmore() called inorder to load the list 
    $scope.loadMore = function() {

        str = sharedFilterService2.getUrl();
        $http.get(str).success(function(response) {
            $scope.menu_items = response.records;
            $scope.hasmore = response.has_more; //"has_more": 0	or number of items left
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });

        //more data can be loaded or not
        if ($scope.hasmore == 0) {
            $scope.noMoreItemsAvailable = true;
        }
    };

    //show brand page
    $scope.showBrandInfo = function(id, flavor, img, name, cate, ean) {
        localStorage.setItem('brand_info_id', id);
        localStorage.setItem('brand_info_name', name);
        localStorage.setItem('brand_info_cate', cate);
        localStorage.setItem('brand_info_flavor', flavor);
        localStorage.setItem('brand_info_img', img);
        localStorage.setItem('brand_info_ean', ean);
        window.location.href = "#/tab/brandpage";
    };

    //add to cart function
    $scope.addToCart = function(id, name, img, cate, flavor, ean) {
        cart.add(id, name, img, cate, flavor, ean, 1);
    };
})


.controller('brandPageCtrl', function($scope) {

    //onload event
    angular.element(document).ready(function() {
        $scope.id = localStorage.getItem('brand_info_id');
        $scope.name = localStorage.getItem('brand_info_name');
        $scope.cate = localStorage.getItem('brand_info_cate');
        $scope.flavor = localStorage.getItem('brand_info_flavor');
        $scope.img = base_url + "/img/brands/" + localStorage.getItem('brand_info_img') + ".png";
        $scope.ean = localStorage.getItem('brand_info_ean');
    });


})



.controller('filterByBrandCtrl', function($scope, sharedFilterService2) {

    $scope.Categories = [
        { id: 6, name: 'Coca-Cola' },
        { id: 1, name: 'Bonaqua' },
        { id: 14, name: 'Sprite' }
    ];

    $scope.getCategory = function(cat_list) {
        categoryAdded = cat_list;
        var c_string = ""; // will hold the category as string

        for (var i = 0; i < categoryAdded.length; i++) { c_string += (categoryAdded[i].id + "||"); }

        c_string = c_string.substr(0, c_string.length - 2);
        sharedFilterService2.category = c_string;
        window.location.href = "#/tab/brands";
    };


})

.controller('sortByBrandCtrl', function($scope, sharedFilterService2) {
    $scope.sort = function(sort_bybrand) {
        sharedFilterService2.sort = sort_bybrand;
        console.log('sort', sort_bybrand);
        window.location.href = "#/tab/brands";
    };
})

.controller('paymentCtrl', function($scope, $ionicPopup) {
    $scope.payProcess = function() {
        alert('Payment Connection Needed');
    };

});



/** branding */
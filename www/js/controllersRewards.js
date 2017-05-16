angular.module('app.controllers', [])



.controller('DashCtrl', function($scope, $http, sharedCartService, sharedFilterService) {


    $scope.server_url = base_url;

    //put cart after menu
    var cart = sharedCartService.cart;



    $scope.slide_items = [{
            "p_id": "1",
            "p_name": "New Chicken Maharaja",
            "p_description": "brand Description",
            "p_image_id": "slide_1",
            "p_price": "183"
        },

        {
            "p_id": "2",
            "p_name": "Big Spicy Chicken Wrap",
            "p_description": "brand Description",
            "p_image_id": "slide_2",
            "p_price": "171"
        },

        {
            "p_id": "3",
            "p_name": "Big Spicy Paneer Wrap",
            "p_description": "brand Description",
            "p_image_id": "slide_3",
            "p_price": "167"
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
        sessionStorage.setItem('product_info_id', id);
        sessionStorage.setItem('product_info_desc', desc);
        sessionStorage.setItem('product_info_img', img);
        sessionStorage.setItem('product_info_name', name);
        sessionStorage.setItem('product_info_price', price);
        window.location.href = "#/tab/rewardpage";
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
        if (sessionStorage.getItem('loggedin_id') == null) { return 1; } else {
            $scope.loggedin_name = sessionStorage.getItem('loggedin_name');
            $scope.loggedin_id = sessionStorage.getItem('loggedin_id');
            $scope.loggedin_phone = sessionStorage.getItem('loggedin_phone');
            $scope.loggedin_address = sessionStorage.getItem('loggedin_address');
            $scope.loggedin_pincode = sessionStorage.getItem('loggedin_pincode');
            return 0;
        }
    };



})

.controller('indexCtrl', function($scope, sharedCartService) {
    //$scope.total = 10; 
})

.controller('loginCtrl', function($scope, $http, $ionicPopup, $state, $ionicHistory) {
    $scope.user = {};

    $scope.login = function() {
        str = base_url + '/' + "user-details.php?e=" + $scope.user.email + "&p=" + $scope.user.password;


        $http.get(str)
            .success(function(response) {
                $scope.user_details = response.records;
                sessionStorage.setItem('loggedin_name', $scope.user_details.u_name);
                sessionStorage.setItem('loggedin_id', $scope.user_details.u_id);
                sessionStorage.setItem('loggedin_phone', $scope.user_details.u_phone);
                sessionStorage.setItem('loggedin_address', $scope.user_details.u_address);
                sessionStorage.setItem('loggedin_pincode', $scope.user_details.u_pincode);
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

        str = base_url + '/' + 'signup.php';
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
                    $state.go('tab.signup', {}, { location: "replace", reload: true });

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

.controller('productPageCtrl', function($scope) {

    //onload event
    angular.element(document).ready(function() {
        $scope.id = sessionStorage.getItem('product_info_id');
        $scope.desc = sessionStorage.getItem('product_info_desc');
        $scope.img = base_url + "/img/rewards/" + sessionStorage.getItem('product_info_img') + ".jpg";
        $scope.name = sessionStorage.getItem('product_info_name');
        $scope.price = sessionStorage.getItem('product_info_price');
    });


});
/***************** branding ******************/

angular.module('app.controllers', [])


.controller('BrandCtrl', function($scope, $http, sharedCartService2, sharedFilterService2) {


    $scope.server_url = base_url;

    //put cart after menu
    var cart2 = sharedCartService2.cart2;



    $scope.slide_items = [{
            "p_id": "4",
            "p_name": "New Chicken Maharaja",
            "p_flavor": "Product Flavor",
            "p_image_id": "slide_4",
            "p_price": "183"
        },

        {
            "p_id": "5",
            "p_name": "Big Spicy Chicken Wrap",
            "p_flavor": "Product Flavor",
            "p_image_id": "slide_5",
            "p_price": "171"
        },

        {
            "p_id": "6",
            "p_name": "Big Spicy Paneer Wrap",
            "p_flavor": "Product Flavor",
            "p_image_id": "slide_6",
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
    $scope.showBrandInfo = function(id, name, img, cate, flavor, ean) {
        /*

                $outp. = '{"p_id":"'.$rs["p_id"].
                '",';
                $outp. = '"p_name":"'.$rs["Brand_Name"].
                '",';
                $outp. = '"p_cat":"'.$rs["Flavour"].
                '",';
                $outp. = '"p_flavor":"'.$rs["Flavour"].
                '",';
                $outp. = '"p_image_id":"'.$rs["Brand_Name"].
                ' '.$rs["Flavour"].
                '",';
                $outp. = '"p_ean":"'.$rs["EAN"].
                '"}';

        */
        sessionStorage.setItem('brand_info_id', id);
        sessionStorage.setItem('brand_info_name', name);
        sessionStorage.setItem('brand_info_img', img);
        sessionStorage.setItem('brand_info_cate', cate);
        sessionStorage.setItem('brand_info_flavor', flavor);
        sessionStorage.setItem('brand_info_ean', ean);
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
        $scope.id = sessionStorage.getItem('brand_info_id');
        $scope.name = sessionStorage.getItem('brand_info_name');
        $scope.cate = sessionStorage.getItem('brand_info_cate');
        $scope.flavor = sessionStorage.getItem('brand_info_flavor');
        $scope.img = base_url + "/img/brands/" + sessionStorage.getItem('brand_info_img') + ".png";
        $scope.ean = sessionStorage.getItem('brand_info_ean');
    });


})



.controller('filterByBrandCtrl', function($scope, sharedFilterService2) {

    $scope.Categories = [
        { id: 1, name: 'Cola' },
        { id: 2, name: 'Vanilla' },
        { id: 3, name: 'Cherry' }
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
    $scope.sort = function(sort_by) {
        sharedFilterService2.sort = sort_by;
        console.log('sort', sort_by);
        window.location.href = "#/tab/brands";
    };
})

.controller('paymentCtrl', function($scope) {
    $scope.payProcess = function() {
        alert('Payment Connection Needed');
    };

});



/** branding */
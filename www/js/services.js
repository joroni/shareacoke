angular.module('app.services', [])

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: base_url + '/' + 'img/users/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: base_url + '/' + 'img/users/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: base_url + '/' + 'img/users/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: base_url + '/' + 'img/users/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: base_url + '/' + 'img/users/mike.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})








.factory('sharedCartService', ['$ionicPopup', function($ionicPopup) {

    var cartObj = {};
    cartObj.cart = [];
    cartObj.total_amount = 0;
    cartObj.total_qty = 0;







    cartObj.cart.add = function(id, image, name, price, qty) {
        if (cartObj.cart.find(id) != -1) {
            var alertPopup = $ionicPopup.alert({
                title: 'Product Already Added',
                template: 'Increase the qty from the cart'
            });
            //cartObj.cart[cartObj.cart.find(id)].cart_item_qty+=1;
            //cartObj.total_qty+= 1;	
            //cartObj.total_amount+= parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price);
        } else {
            cartObj.cart.push({ "cart_item_id": id, "cart_item_image": image, "cart_item_name": name, "cart_item_price": price, "cart_item_qty": qty });
            cartObj.total_qty += 1;
            cartObj.total_amount += parseInt(price);
        }
    };

    cartObj.cart.find = function(id) {
        var result = -1;
        for (var i = 0, len = cartObj.cart.length; i < len; i++) {
            if (cartObj.cart[i].cart_item_id === id) {
                result = i;
                break;
            }
        }
        return result;
    };

    cartObj.cart.drop = function(id) {
        var temp = cartObj.cart[cartObj.cart.find(id)];
        cartObj.total_qty -= parseInt(temp.cart_item_qty);
        cartObj.total_amount -= (parseInt(temp.cart_item_qty) * parseInt(temp.cart_item_price));
        cartObj.cart.splice(cartObj.cart.find(id), 1);

    };

    cartObj.cart.increment = function(id) {
        cartObj.cart[cartObj.cart.find(id)].cart_item_qty += 1;
        cartObj.total_qty += 1;
        cartObj.total_amount += (parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price));
    };

    cartObj.cart.decrement = function(id) {

        cartObj.total_qty -= 1;
        cartObj.total_amount -= parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price);


        if (cartObj.cart[cartObj.cart.find(id)].cart_item_qty == 1) { // if the cart item was only 1 in qty
            cartObj.cart.splice(cartObj.cart.find(id), 1); //edited
        } else {
            cartObj.cart[cartObj.cart.find(id)].cart_item_qty -= 1;
        }

    };

    return cartObj;
}])

.factory('sharedFilterService', [function() {

    var obj = {};
    obj.str = base_url + '/' + "rewards.php?till=";
    obj.sort = "";
    obj.search = "";
    obj.category = "";
    obj.till = 0;



    obj.getUrl = function() {

        obj.till = obj.till + 5;

        obj.str = base_url + '/' + "rewards.php?till=" + obj.till; // pass the value to url

        if (obj.sort != "" && obj.category != "") {
            obj.str = obj.str + "&category=" + obj.category + "&sort=" + obj.sort;
        } else if (obj.category != "") {
            obj.str = obj.str + "&category=" + obj.category;
        } else if (obj.sort != "") {
            obj.str = obj.str + "&sort=" + obj.sort;
        }
        console.log("URL", obj.str);
        return obj.str;
    };
    return obj;
}])


/** brands *******************/



.factory('sharedFilterService2', [function() {

    var obj = {};
    obj.str = base_url + '/' + "brands.php?till=";
    obj.sort = "";
    obj.search = "";
    obj.category = "";
    obj.till = 0;



    obj.getUrl = function() {

        obj.till = obj.till + 5;

        obj.str = base_url + '/' + "brands.php?till=" + obj.till; // pass the value to url

        if (obj.sort != "" && obj.category != "") {
            obj.str = obj.str + "&category=" + obj.category + "&sort=" + obj.sort;
        } else if (obj.category != "") {
            obj.str = obj.str + "&category=" + obj.category;
        } else if (obj.sort != "") {
            obj.str = obj.str + "&sort=" + obj.sort;
        }
        console.log("URL", obj.str);
        return obj.str;
    };
    return obj;
}])







.factory('sharedCartService2', ['$ionicPopup', function($ionicPopup) {

    var cartObj = {};
    cartObj.cart = [];
    cartObj.total_amount = 0;
    cartObj.total_qty = 0;

    cartObj.cart.add = function(id, image, name, price, qty) {
        if (cartObj.cart.find(id) != -1) {
            var alertPopup = $ionicPopup.alert({
                title: 'Product Already Added',
                template: 'Increase the qty from the cart'
            });
            //cartObj.cart[cartObj.cart.find(id)].cart_item_qty+=1;
            //cartObj.total_qty+= 1;	
            //cartObj.total_amount+= parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price);
        } else {
            cartObj.cart.push({ "cart_item_id": id, "cart_item_image": image, "cart_item_name": name, "cart_item_price": price, "cart_item_qty": qty });
            cartObj.total_qty += 1;
            cartObj.total_amount += parseInt(price);
        }
    };

    cartObj.cart.find = function(id) {
        var result = -1;
        for (var i = 0, len = cartObj.cart.length; i < len; i++) {
            if (cartObj.cart[i].cart_item_id === id) {
                result = i;
                break;
            }
        }
        return result;
    };

    cartObj.cart.drop = function(id) {
        var temp = cartObj.cart[cartObj.cart.find(id)];
        cartObj.total_qty -= parseInt(temp.cart_item_qty);
        cartObj.total_amount -= (parseInt(temp.cart_item_qty) * parseInt(temp.cart_item_price));
        cartObj.cart.splice(cartObj.cart.find(id), 1);

    };

    cartObj.cart.increment = function(id) {
        cartObj.cart[cartObj.cart.find(id)].cart_item_qty += 1;
        cartObj.total_qty += 1;
        cartObj.total_amount += (parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price));
    };

    cartObj.cart.decrement = function(id) {

        cartObj.total_qty -= 1;
        cartObj.total_amount -= parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price);


        if (cartObj.cart[cartObj.cart.find(id)].cart_item_qty == 1) { // if the cart item was only 1 in qty
            cartObj.cart.splice(cartObj.cart.find(id), 1); //edited
        } else {
            cartObj.cart[cartObj.cart.find(id)].cart_item_qty -= 1;
        }

    };

    return cartObj;
}])

/** brands */
.service('BlankService', [function() {

}]);
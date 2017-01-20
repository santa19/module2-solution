(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingList', ShoppingListProvider)
.config(Config);

Config.$inject = ['ShoppingListProvider'];
function Config(ShoppingListProvider) {
  ShoppingListProvider.defaults.itemsToBuy = [{ name: "cookies", quantity: 10 },{ name: "oranges", quantity: 15 },{ name: "apples", quantity: 6 },{ name: "cheetos", quantity: 1 },{ name: "chips", quantity: 12 }];
}


ToBuyController.$inject = ['ShoppingList'];
function ToBuyController(ShoppingList) {
  var toBuy = this;
  toBuy.items = ShoppingList.getItems();

  toBuy.buyItem = function (itemIndex) {
    ShoppingList.removeItemToBuy(itemIndex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingList'];
function AlreadyBoughtController(ShoppingList) {
  var bought = this;
  bought.items = ShoppingList.getItemsBougth();
}


function ShoppingListCheckOffService(items) {
  var service = this;
  var itemsToBuy = items;
  // List of items to buy
  if ((items === undefined) ||
        (items !== undefined) && (items.size < 1)) {
          itemsToBuy = [{ name: "oranges", quantity: 15 }];
  }

  // List of bought items
  var itemsBought = [];

  service.addItemBought = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsBought.push(item);
  };

  service.removeItemToBuy = function (itemIdex) {
    var item = itemsToBuy[itemIdex];
    itemsToBuy.splice(itemIdex, 1);
    this.addItemBought(item.name, item.quantity);
  };

  service.getItems = function () {
    return itemsToBuy;
  };

  service.getItemsBougth = function () {
    return itemsBought;
  };
}

function ShoppingListProvider() {
  var provider = this;

  provider.defaults = {
    itemsToBuy: [{ name: "cookies", quantity: 10 }]
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListCheckOffService(provider.defaults.itemsToBuy);

    return shoppingList;
  };
}

})();

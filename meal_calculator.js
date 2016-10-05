// Object constructor for diners
var Diner = function(name,dishes){
	this.name = name;
	this.dishes = dishes;
}
// Method to calculate total bill of dishes consumed
Diner.prototype.isTotalOfDishes = function(dishes){
	var dinerTotal = 0;
  	for( var key in dishes) {
    	if( dishes.hasOwnProperty(key)) {
      		dinerTotal += parseFloat(dishes[key]);
    	}
  	}
  	return dinerTotal;
}
// Method to calculate the tax for the total
Diner.prototype.isTaxForDiner = function(total){
	return (total * 0.08) 
}
// Method to calculate the tip 
Diner.prototype.isTipForDiner = function(total){
	return (total * 0.20) 
}

// Object constructor for the bill
var Bill = function(diners){
	this.diners = diners;
}
//Method to calculate the total bill
Bill.prototype.isTotalBill = function(diners){
	var billTotalArray = diners.map(function(item){
		return (item.isTotalOfDishes(item.dishes)) + (item.isTaxForDiner(item.isTotalOfDishes(item.dishes)))
	})
	var billTotal = billTotalArray.reduce((a, b) => a + b, 0);
	return billTotal
}
// Method to calculate the total tips
Bill.prototype.isTotalTips = function(diners){
	var totalTipArray = diners.map(function(item){
		return (item.isTipForDiner(item.isTotalOfDishes(item.dishes)))
	})
	var tipTotal = totalTipArray.reduce((a, b) => a + b, 0);
	return tipTotal
}
// Method to breakdown the bill among diners
Bill.prototype.isBillBreakdown = function(diners){
	var billBreakdown = diners.forEach(function(item){
		item["dinerTotal"] = (item.isTotalOfDishes(item.dishes)) + (item.isTaxForDiner(item.isTotalOfDishes(item.dishes)))
		item["dinerTip"] = item.isTipForDiner(item.isTotalOfDishes(item.dishes))
	})
	return diners
}

// Diner objects
var diner1 = Object.create(Diner.prototype)
diner1.name = "Maria"
diner1.dishes = {soup:7,pasta:15}
var diner2 = Object.create(Diner.prototype)
diner2.name = "Marti"
diner2.dishes = {soup:7, meatDish:30}
var diner3 = Object.create(Diner.prototype)
diner3.name = "Ana"
diner3.dishes = {salad:15, cake:7}

// Bill object
var billForDiners = Object.create(Bill.prototype)
billForDiners.diners = [diner1,diner2,diner3]
// Variables containing the total bill, the total tip and the diners'bill breakdown
var totalBill = billForDiners.isTotalBill(billForDiners.diners)
var totalTip = billForDiners.isTotalTips(billForDiners.diners)
var dinersBillBreakdown = billForDiners.isBillBreakdown(billForDiners.diners)


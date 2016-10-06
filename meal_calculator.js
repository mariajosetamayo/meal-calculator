// Statement so code can run with node in terminal
"use strict"; 
// Object constructor for a Person
class Person {
	constructor(name) {
		this.name = name;
	}
};
// This class inherits from the object Person and creates a new constructor Diner
class Diner extends Person {
	// Constructor for diners
	constructor(name, dishes) {
		super(name);
		this.dishes = dishes;
	}
	// Method to calculate total bill of dishes consumed
	totalPriceOfDishes(dishes) {
		let dinerTotal = 0;
  		for( let key in dishes) {
    		if( dishes.hasOwnProperty(key)) {
      			dinerTotal += parseFloat(dishes[key]);
    		}
  		}
  		return dinerTotal;
	}
	// Method to calculate the tax for the total
	taxForDiner(total) {
		return (total * 0.08); 
	}
	// Method to calculate the tip
	tipForDiner(total) {
		return (total * 0.20); 
	}
};

class Bill {
	// Constructor for bill
	constructor(diners) {
		this.diners = diners;
	}
	// Method to calculate the total bill
	totalBill(diners) {
		let billTotalArray = diners.map((item) => {
			return (item.totalPriceOfDishes(item.dishes)) + (item.taxForDiner(item.totalPriceOfDishes(item.dishes)));
		});
		let billTotal = billTotalArray.reduce((a, b) => a + b, 0);
		return billTotal;
	}
	// Method to calculate the total tips
	totalTips(diners) {
		const totalTipArray = diners.map((item) => {
			return (item.tipForDiner(item.totalPriceOfDishes(item.dishes)));
		});
		return totalTipArray.reduce((a, b) => a + b, 0);
	}
	// Method to breakdown the bill among diners
	billBreakdown(diners) {
		let billBreakdown = diners.forEach((item) => {
			item["dinerTotal"] = (item.totalPriceOfDishes(item.dishes)) + (item.taxForDiner(item.totalPriceOfDishes(item.dishes)));
			item["dinerTip"] = item.tipForDiner(item.totalPriceOfDishes(item.dishes));
		});
		return diners;
	}
};

// Diner objects
const diner1 = new Diner("Maria", {soup:7,pasta:15});
const diner2 = new Diner("Marti", {soup:7, meatDish:30});
const diner3 = new Diner("Ana", {salad:15, cake:7});
// Bill object
const billForDiners = new Bill([diner1,diner2,diner3]);
// Variables containing the total bill, the total tip and the diners'bill breakdown
const totalBill = billForDiners.totalBill(billForDiners.diners);
const totalTip = billForDiners.totalTips(billForDiners.diners);
const dinersBillBreakdown = billForDiners.billBreakdown(billForDiners.diners);
// Console logs to run code in node
console.log("total bill: " + totalBill);
console.log("total tip: " + totalTip);
console.log(dinersBillBreakdown);



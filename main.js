(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _sortablejs = _interopRequireDefault(require("sortablejs"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var workerTimers = _interopRequireWildcard(require("worker-timers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var firebase = require('firebase/app');
// require('firebase/auth');
// require('firebase/firestore');
// import { loadStripe } from '@stripe/stripe-js';
// import * as Sentry from '@sentry/browser';
// Sentry.init({ dsn: 'https://5c66199035aa46c4b531f12a08f67a81@o430892.ingest.sentry.io/5380474' });
// var stripe = null;
var elements = null;
var runningUnfollowPeople = false;
var runningFollowPeople = false;
var runningFollowers = false;
var runningParty = false;
var captchaUnfollowPeople = false;
var captchaFollowPeople = false;
var captchaFollowers = false;
var captchaParty = false;
var captchaOrganize = false;
var captchaRetry = 1;
var runningOrganize = false;
var runningEdit = false;
var runningOffer = false;
var currentFollowers = -1;
var currentOrganize = -1;
var currentParty = -1;
var currentEdit = -1;
var currentOffer = -1;
var speedOption = 1250;
var continuousOption = true;
var alarmOption = true;
var availableOption = true;
var filterOption = false;
var filterInput = "";
var scrollOption = false;
var shareLimitOption = true;
var captchaOption = true;
var solved = false;
var email = null;
var uid = null;
var limit = 0;
var this_user = null;
var scrolling = true;
var sync_timeout;
var shareLimitReached = false;
var minShares = 0;
var totalShares = 0;
var totalFollows = 0;
var totalUnfollows = 0;
var shareLimitNumber = 7000;
var audioPlayed = false;
var is_closet = false;
var closet_url = "";
var daily_self_shares = 0;
var hourly_share_counter = 0;
var hourly_follow_counter = 0;
var hourly_unfollow_counter = 0;
var self_share_hour = 0;
var user_closet_id = false;
var FOLLOWERS = 1;
var PARTY = 2;
var ORGANIZE = 3;
var bgSharing = true;
var country_url = window.location.hostname;
var hide_app = false;
var current_market = "";
var speedMin = 10;
var speedMax = 20;
var orderOption = 0;
var selectOption = false;
var afterScroll = "nothing";
var continuousMin = 0;
var continuousMax = 0;
var continuousLimit = 0;
var continuousLimitOn = false;
var continuousLimitCounter = 0;
var poshmark_id = "";
var sortable = null;
var originalTitle = document.title; //Is this production or testing?

var production = true;
var app_version = "1.13.10"; // URLS

if (production) {
  var css_path = "psa-test-styles.css";
  var monthlyURL = "https://us-central1-sharing-assistant.cloudfunctions.net/paymentMonthly?currency=USD&amount=2999&description=%2429.99%2Fmonth%20Unlimited&uid=";
  var updateCardURL = "https://us-central1-sharing-assistant.cloudfunctions.net/updateCard?cus=";
  var updateCardElementsURL = "https://us-central1-sharing-assistant.cloudfunctions.net/updateCardElements";
  var endSubURL = "https://us-central1-sharing-assistant.cloudfunctions.net/endSubscription?sub=";
  var continueSubURL = "https://us-central1-sharing-assistant.cloudfunctions.net/continueSubscription?sub=";
  var upgradeSubURL = "https://us-central1-sharing-assistant.cloudfunctions.net/upgrade?cus=";
  var upgradeCustomerURL = "https://us-central1-sharing-assistant.cloudfunctions.net/upgradeCustomer";
  var switchPlanURL = "https://us-central1-sharing-assistant.cloudfunctions.net/switchPlan";
  var endURL = "https://us-central1-sharing-assistant.cloudfunctions.net/end";
  var continueURL = "https://us-central1-sharing-assistant.cloudfunctions.net/continue";
  var newCustomerURL = "https://us-central1-sharing-assistant.cloudfunctions.net/newCustomer";
  var monthly_plan = "psa-monthly";
  var yearly_plan = "plan_GfUY2nuhODYI9u";
} else {
  var monthlyURL = "http://localhost:5001/sharing-assistant/us-central1/paymentMonthly?currency=USD&amount=2999&description=%2429.99%2Fmonth%20Unlimited&uid=";
  var updateCardURL = "http://localhost:5001/sharing-assistant/us-central1/updateCard?cus=";
  var updateCardElementsURL = "http://localhost:5001/sharing-assistant/us-central1/updateCardElements";
  var endSubURL = "http://localhost:5001/sharing-assistant/us-central1/endSubscription?sub=";
  var continueSubURL = "http://localhost:5001/sharing-assistant/us-central1/continueSubscription?sub=";
  var upgradeCustomerURL = "http://localhost:5001/sharing-assistant/us-central1/upgradeCustomer";
  var switchPlanURL = "http://localhost:5001/sharing-assistant/us-central1/switchPlan";
  var endURL = "http://localhost:5001/sharing-assistant/us-central1/end";
  var continueURL = "http://localhost:5001/sharing-assistant/us-central1/continue";
  var newCustomerURL = "http://localhost:5001/sharing-assistant/us-central1/newCustomer";
  var monthly_plan = "plan_GYkbQOsa4NGqmq";
  var yearly_plan = "closet-assistant-annual";
  var css_path = "psa-styles.css";
} // (async () => {
// 	if (production) {
// 		stripe = await loadStripe('pk_live_a19siQeeE4sN6PbpBl76xNeh');
// 		elements = stripe.elements();
// 	} else {
// 		stripe = await loadStripe('pk_test_dMVrTxU3JspmKvCH1cGVTvBh');
// 		elements = stripe.elements();
// 	}
// })();


var audio = new Audio();
var captcha_success = new Audio();
var captcha_waiting = new Audio();
var captcha_failed = new Audio(); // var stripeURL = "https://stripe.com";
// var logoURL = "https://closet.tools/assets/images/closet-tools-logo.png";
// var checkoutURL = "https://checkout.stripe.com/checkout.js";

var logoSVGURL = "https://closet.tools/assets/logos/logo-nav-pink.svg";
var assistantURL = "https://closet.tools/assistant";
var docsURL = "https://closet.tools/docs";
var updatePageURL = "https://closet.tools/update"; //

var i = 0; //create and init the app

initApp();

function openTab(tabId, tabName) {
  console.log("openTab()");
  console.log(tabId);
  console.log(tabName); // Declare all variables

  var i, tabcontent, tablinks; // Get all elements with class="tabcontent" and hide them

  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  } // Get all elements with class="tablinks" and remove the class "active"


  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  } // Show the current tab, and add an "active" class to the button that opened the tab


  document.getElementById(tabName).style.display = "block";
  document.getElementById(tabId).className += " active";
} // function toggleSignIn() {
// 	console.log("Sign In/Out button clicked.");
// 	if (firebase.auth().currentUser) {
// 		// [START signout]
// 		if (document.getElementById("sharingTab") != null) {
// 			document.getElementById("sharingTab").disabled = true;
// 		}
// 		if (document.getElementById("actionsTab") != null) {
// 			document.getElementById("actionsTab").disabled = true;
// 		}
// 		if (document.getElementById("settingsTab") != null) {
// 			document.getElementById("settingsTab").disabled = true;
// 		}
// 		if (document.getElementById("subscriptionForm") != null) {
// 			document.getElementById("subscriptionForm").style.display = "none";
// 		}
// 		this_user = null;
// 		firebase.auth().signOut();
// 		// [END signout]
// 	} else {
// 		var email = document.getElementById("email").value;
// 		var password = document.getElementById("password").value;
// 		if (email.length < 4) {
// 			alert("Please enter an email address.");
// 			return;
// 		}
// 		if (password.length < 4) {
// 			alert("Please enter a password.");
// 			return;
// 		}
// 		// Sign in with email and pass.
// 		// [START authwithemail]
// 		firebase
// 			.auth()
// 			.signInWithEmailAndPassword(email, password)
// 			.catch(function (error) {
// 				// Handle Errors here.
// 				var errorCode = error.code;
// 				var errorMessage = error.message;
// 				// [START_EXCLUDE]
// 				if (errorCode === "auth/wrong-password") {
// 					alert("Wrong password.");
// 				} else {
// 					alert(
// 						"This email address was not found as a Closet Tools user.\n\nIf you've never signed up before, put in an email/password you'd like to use and click 'Sign Up'.\n\nIf you're already a user, check the email you put in the field."
// 					);
// 				}
// 				//console.log(error);
// 				// [END_EXCLUDE]
// 			});
// 		// [END authwithemail]
// 	}
// }

/**
 * Handles the sign up button press.
 */
// function handleSignUp() {
// 	var email = document.getElementById("email").value;
// 	var password = document.getElementById("password").value;
// 	if (email.length < 4) {
// 		alert("Please enter an email address.");
// 		return;
// 	}
// 	if (password.length < 4) {
// 		alert("Please enter a password.");
// 		return;
// 	}
// 	// Sign in with email and pass.
// 	// [START createwithemail]
// 	firebase
// 		.auth()
// 		.createUserWithEmailAndPassword(email, password)
// 		.catch(function (error) {
// 			// Handle Errors here.
// 			var errorCode = error.code;
// 			var errorMessage = error.message;
// 			// [START_EXCLUDE]
// 			if (errorCode == "auth/weak-password") {
// 				alert("The password is too weak.");
// 			} else {
// 				alert(errorMessage);
// 			}
// 			//console.log(error);
// 			// [END_EXCLUDE]
// 		});
// 	// [END createwithemail]
// }

/**
 * Sends an email verification to the user.
 */
// function sendEmailVerification() {
//   // [START sendemailverification]
//   firebase.auth().currentUser.sendEmailVerification().then(function() {
//     // Email Verification sent!
//     // [START_EXCLUDE]
//     alert('Email Verification Sent!');
//     // [END_EXCLUDE]
//   });
//   // [END sendemailverification]
// }
// function sendPasswordReset() {
// 	var email = document.getElementById("email").value;
// 	// [START sendpasswordemail]
// 	firebase
// 		.auth()
// 		.sendPasswordResetEmail(email)
// 		.then(function () {
// 			// Password Reset Email Sent!
// 			// [START_EXCLUDE]
// 			alert("Password Reset Email Sent!");
// 			// [END_EXCLUDE]
// 		})
// 		.catch(function (error) {
// 			// Handle Errors here.
// 			var errorCode = error.code;
// 			var errorMessage = error.message;
// 			// [START_EXCLUDE]
// 			if (errorCode == "auth/invalid-email") {
// 				alert(errorMessage);
// 			} else if (errorCode == "auth/user-not-found") {
// 				alert(
// 					`This email address was not found as a Closet Tools user.\n\nIf you've never signed up before, put in an email/password you'd like to use and click 'Sign Up'.\n\nIf you're already a user, check the email you put in the field.`
// 				);
// 			}
// 			//console.log(error);
// 			// [END_EXCLUDE]
// 		});
// 	// [END sendpasswordemail];
// }


function initApp() {
  // console.log("initApp()");
  //create the interface
  document.onreadystatechange = function () {
    console.log(document.readyState);
  };

  createInterface(); //console.log("Initialization started.");
  // firebase stuff
  // var config = {
  // 	apiKey: "AIzaSyBReE8ljSDZBRM0sQC7mac5Jiw4ljjpFsE",
  // 	authDomain: "sharing-assistant.firebaseapp.com",
  // 	databaseURL: "https://sharing-assistant.firebaseio.com",
  // 	projectId: "sharing-assistant",
  // 	storageBucket: "sharing-assistant.appspot.com",
  // 	messagingSenderId: "793741961972"
  // };
  // if (!firebase.apps.length) {
  // 	firebase.initializeApp(config);
  // 	//console.log("App initialized");
  // } else {
  // 	//console.log("App already initialized");
  // }
  // Listening for auth state changes.
  // [START authstatelistener]
  // firebase.auth().onAuthStateChanged(function (user) {
  // 	if (user) {
  // 		console.log(user)
  // 		// User is signed in.
  // 		email = user.email;
  // 		uid = user.uid;
  // 		document.getElementById("loginForm").style.display = "none";
  // 		document.getElementById("forgot").style.display = "none";
  //

  closet_url = window.location.pathname.split("/").pop();

  if (closet_url == user_closet_id) {
    is_closet = true;
  } else {
    is_closet = false;
  } //
  // 		var userRef = firebase
  // 			.firestore()
  // 			.collection("users")
  // 			.doc(uid);
  // 		var userData = userRef.get().then(doc => {
  // 			if (doc.exists) {


  this_user = JSON.parse(localStorage.getItem('userData'));

  if (!this_user) {
    this_user = {
      "settings": {
        "captcha_id": "",
        "share_limit": true,
        "share_limit_num": 7000,
        "scroll": false,
        "available_only": true,
        "filter_only": false,
        "filter_input": "",
        "speed": 1250,
        "alarm": false,
        "captcha": false,
        "continuous": false,
        "speedMin": 0,
        "speedMax": 0,
        "order": 1,
        "continuousMin": 0,
        "continuousMax": 0,
        "continuousLimit": 0,
        "continuousLimitOn": false,
        "select": true,
        "afterScroll": "nothing",
        "bgSharing": false
      }
    };
  } // console.log("getItem");


  console.log(this_user);
  setupPaying(); // shareLimitOption = this_user.settings.share_limit;
  // scrollOption = this_user.settings.scroll;
  // availableOption = this_user.settings.available_only;
  // speedOption = this_user.settings.speed;
  // alarmOption = this_user.settings.alarm;
  // captchaOption = this_user.settings.captcha;
  // continuousOption = this_user.settings.continuous;
  // speedMin = this_user.settings.speedMin;
  // speedMax = this_user.settings.speedMax;
  // orderOption = this_user.settings.order;
  // continuousMin = this_user.settings.continuousMin;
  // continuousMax = this_user.settings.continuousMax;
  // continuousLimit = this_user.settings.continuousLimit;
  // continuousLimitOn = this_user.settings.continuousLimitOn;
  // selectOption = this_user.settings.select;
  // afterScroll = this_user.settings.afterScroll;
  // bgSharing = this_user.settings.bgSharing;
  // 				this_user = doc.data();
  // 				if (this_user.stripe.paid) {
  // 					//Paying customer or free trial
  // 					setupPaying(this_user);
  // 				} else {
  // 					//Not paying customer
  // 					if (this_user.stripe.customer != "") {
  // 						setupUpgrade(this_user);
  // 					} else {
  // 						setupFreeTrial(this_user);
  // 					}
  // 				}
  // 				if (!this_user.settings.auto_open) {
  // 					hideApp();
  // 				}
  // 			} else {
  // 				//User hasn't started a free trial yet
  // 				setupFreeTrial(this_user);
  // 			}
  // 		});
  // 	} else {
  // 		// User is signed out.
  // 		setupSignedOut();
  // 	}
  // });
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
} // function switchPlan(user) {
// 	var plan = document.querySelector('input[name="planSelect"]:checked').value;
// 	document.getElementById('change-plan-submit').disabled = true;
// 	document.getElementById('change-plan-submit').textContent = "Switching...";
// 	// console.log(user.stripe.customer);
// 	fetch(switchPlanURL, {
// 		method: 'post',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			sub: user.stripe.subscription,
// 			uid: uid,
// 			email: email,
// 			plan: plan,
// 		})
// 	})
// 		.then(function (response) {
// 			if (response.status == "200") {
// 				return response;
// 			} else {
// 				throw new Error('Something went wrong.');
// 			}
// 		})
// 		.then((response) => {
// 			document.getElementById('change-plan-submit').textContent = "Success ✅";
// 			workerTimers.setTimeout(function () {
// 				location.reload()
// 			}, 1000)
// 		})
// 		.catch((error) => {
// 			document.getElementById('change-plan-submit').textContent = "Something went wrong 🚫";
// 			workerTimers.setTimeout(function () {
// 				document.getElementById('change-plan-submit').disabled = false;
// 				document.getElementById('change-plan-submit').textContent = "Submit Change Plan 📆";
// 			}, 2000)
// 		});
// }


function setupPaying() {
  //create share tab
  // initSharingTab();
  //set up actions tab
  // initActionsTab();
  //set up settings tab
  // initSettingsTab();
  //init options
  initOptions();
  sharingTab.disabled = false;
  actionsTab.disabled = false;
  settingsTab.disabled = false; // var d = new Date(user.stripe.end_date * 1000);
  // var d_formatted = formatDate(d);

  var status = "Active";
  var billing = "";
  var plan = "Forever"; // if (user.stripe.paid) {
  // 	if (user.stripe.canceled) {

  status = "Pending Cancelation";
  billing = "Access ends:"; // 	} else {
  // 		status = "Active";
  // 		billing = "Billing date:";
  // 	}
  // }
  //
  // if (user.stripe.plan == monthly_plan) {

  plan = "Monthly"; // } else {
  // 	plan = "Yearly";
  // }
  // if (!user_closet_id) {
  // 	//logged out warning
  // 	var loggedOut = document.createElement("div");
  // 	loggedOut.classList.add("psa-form-card-pink");
  // 	loggedOut.textContent = "⚠️ You're not logged into Poshmark";
  // 	document.getElementById("login-tab").prepend(loggedOut);
  // } else {
  // 	document.getElementById("login-info").innerText = "Welcome, " + user_closet_id + "! 👋";
  // }
  // if ((user.stripe.plan == monthly_plan || user.stripe.plan == yearly_plan) && user.stripe.last4) {
  // 	var billingInfo = document.createElement("p");
  // 	billingInfo.className = "psa-form";
  // 	billingInfo.id = "billing-info";
  // 	billingInfo.innerText = "Subscription: " + status + "\nPlan: " + plan + "\n" + billing + " " + "d_formatted" + "\nYour card: " + "user.stripe.last4" + " Exp. " + "user.stripe.exp_month" + "/" + "user.stripe.exp_year";
  // 	document.getElementById("login-info").parentNode.insertBefore(billingInfo, document.getElementById("login-info").nextSibling);

  var appInfo = document.createElement("p");
  appInfo.className = "psa-form";
  appInfo.id = "app-info";
  appInfo.innerText = "🔁 Sharing & Following\n⚡ Special Functions\n⚙️ Settings"; // billingInfo.parentNode.insertBefore(appInfo, billingInfo.nextSibling);
  // } else {
  // 	var appInfo = document.createElement("p");
  // 	appInfo.className = "psa-form";
  // 	appInfo.id = "app-info";
  // 	appInfo.innerText = "🔁 Sharing & Following\n⚡ Special Functions\n⚙️ Settings | ℹ️ About";
  // 	document.getElementById("login-info").parentNode.insertBefore(appInfo, document.getElementById("login-info").nextSibling);
  // }
  //End Subscription

  var endSub = document.createElement("button");
  endSub.id = "end-sub"; // if (user.stripe.canceled) {
  // 	endSub.innerText = "Continue Subscription ⚠️";
  // 	endSub.onclick = function () {
  // 		continueSubscription(user);
  // 	}
  // } else {
  // 	endSub.innerText = "End Subscription 🚫";
  // 	endSub.onclick = function () {
  // 		endSubscription(user);
  // 	}
  // }
  // endSub.className += "psa-button";
  // if (document.getElementById("end-sub") != null) {
  // 	document.getElementById("end-sub").style.display = "block";
  // } else {
  // 	document.getElementById("forgot-end-sub").appendChild(endSub);
  // }
  // var cardInput = updateCard();
  //
  // var startUpdateButton = document.createElement("button");
  // startUpdateButton.classList.add("psa-button");
  // startUpdateButton.textContent = "Change Card 💳";
  // startUpdateButton.id = "start-update-card";
  // startUpdateButton.onclick = function () {
  // 	if (!document.getElementById("change-card")) {
  // 		startUpdateButton.textContent = "Cancel ✘";
  //
  // 		var changeCardSection = document.createElement("div");
  // 		changeCardSection.classList.add("psa-form");
  // 		changeCardSection.id = "change-card";
  //
  // 		startUpdateButton.parentNode.insertBefore(changeCardSection, startUpdateButton.nextSibling);
  // 		changeCardSection.appendChild(cardInput);
  // 		var card = elementsWatch();
  //
  // 		document.getElementById("update-card-button").onclick = function () {
  // 			//update the card fetch
  // 			document.getElementById('update-card-button').disabled = true;
  // 			document.getElementById('update-card-button').textContent = "Updating...";
  // 			stripe.createPaymentMethod({
  // 				type: 'card',
  // 				card: card,
  // 				billing_details: {
  // 					email: email,
  // 				},
  // 			})
  // 				.then(result => {
  // 					// Handle result.error or result.paymentMethod
  // 					if (!result.error) {
  // 						return fetch(updateCardElementsURL, {
  // 							method: 'post',
  // 							headers: {
  // 								'Content-Type': 'application/json'
  // 							},
  // 							body: JSON.stringify({
  // 								email: email,
  // 								uid: uid,
  // 								cus: user.stripe.customer,
  // 								payment_method: result.paymentMethod
  // 							})
  // 						})
  // 					} else {
  // 						// console.log("There was an error creating the card");
  // 					}
  // 				})
  // 				.then(function (response) {
  // 					if (response.status == "200") {
  // 						return response;
  // 					} else {
  // 						throw new Error('Something went wrong.');
  // 					}
  // 				})
  // 				.then((response) => {
  // 					document.getElementById('update-card-button').textContent = "Success ✅";
  // 					workerTimers.setTimeout(function () {
  // 						location.reload()
  // 					}, 1000)
  // 				})
  // 				.catch((error) => {
  // 					document.getElementById('update-card-button').textContent = "Something went wrong 🚫";
  // 					workerTimers.setTimeout(function () {
  // 						document.getElementById('update-card-button').disabled = false;
  // 						document.getElementById('update-card-button').textContent = "Submit Change Card 💳";
  // 					}, 2000)
  // 				});
  // 		}
  //
  // 	} else {
  // 		if (document.getElementById("change-card").style.display == "none") {
  // 			startUpdateButton.textContent = "Cancel ✘";
  // 			document.getElementById("change-card").style.display = "block";
  // 		} else {
  // 			startUpdateButton.textContent = "Change Card 💳";
  // 			document.getElementById("change-card").style.display = "none";
  // 		}
  // 	}
  // }
  //Add change plan button
  // if (user.stripe.plan == monthly_plan || user.stripe.plan == yearly_plan) {
  // 	var changePlan = document.createElement("button");
  // 	changePlan.id = "change-plan";
  // 	changePlan.innerText = "Change Plan 📆";
  // 	changePlan.className += "psa-button";
  // 	changePlan.onclick = function () {
  // 		if (!document.getElementById("monthly-plan-card")) {
  // 			changePlan.textContent = "Cancel ✘";
  // 			var plans = makePlanSelect();
  // 			changePlan.parentNode.insertBefore(plans, changePlan.nextSibling);
  //
  // 			if (user.stripe.plan == monthly_plan) {
  // 				document.getElementById('yearly-plan').checked = true;
  // 				document.getElementById('monthly-plan').disabled = true;
  // 				document.getElementById('monthly-label').style = "text-decoration: line-through;";
  // 			} else {
  // 				document.getElementById('monthly-plan').checked = true;
  // 				document.getElementById('yearly-plan').disabled = true;
  // 				document.getElementById('yearly-label').style = "text-decoration: line-through;";
  // 			}
  //
  // 			//create change plan button
  // 			var changePlanSubmit = document.createElement("button");
  // 			changePlanSubmit.id = "change-plan-submit";
  // 			changePlanSubmit.type = "button";
  // 			changePlanSubmit.innerText = "Submit Change Plan 📆";
  // 			changePlanSubmit.className += "psa-button-pink";
  // 			changePlanSubmit.onclick = function () {
  // 				if (confirm("Are you sure you want to switch your plan?\n\nIf going from monthly to yearly, you will be billed immediately on your current card.\n\nIf going from yearly to monthly, your credits from your yearly payment will still count, and you will not be billed until your billing date.\n\nClick 'OK' to switch your plan.\nClick 'Cancel' to not change anything.")) {
  // 					switchPlan(user);
  // 				}
  // 			}
  // 			document.getElementById("plans").appendChild(changePlanSubmit);
  // 			document.getElementById("plans").classList.add("psa-form");
  //
  // 		} else {
  // 			if (document.getElementById("plans").style.display == "none") {
  // 				changePlan.textContent = "Cancel ✘";
  // 				document.getElementById("plans").style.display = "block";
  // 			} else {
  // 				changePlan.textContent = "Change Plan 📆";
  // 				document.getElementById("plans").style.display = "none";
  // 			}
  // 		}
  // 	}
  // 	document.getElementById("forgot-end-sub").appendChild(changePlan);
  // 	document.getElementById("forgot-end-sub").appendChild(startUpdateButton);
  // }
  // var editAccount = document.createElement("a");
  // editAccount.id = "edit-account";
  // editAccount.innerText = "Your Account ↗️";
  // editAccount.className += "psa-button";
  // editAccount.href = "https://closet.tools/account";
  // editAccount.target = "_blank";
  // document.getElementById("forgot-end-sub").appendChild(editAccount);
  //Sign Out
  // var endSub = document.createElement("button");
  // endSub.id = "sign-out";
  // endSub.innerText = "Sign Out 🔐";
  // endSub.className += "psa-button";
  // endSub.addEventListener("click", toggleSignIn, false);
  // if (document.getElementById("sign-out") != null) {
  // 	document.getElementById("sign-out").style.display = "block";
  // } else {
  // 	document.getElementById("forgot-end-sub").appendChild(endSub);
  // }
  //update analytics
  // getPastDayTotals();

  updateAnalyticsUI(); // show the app

  document.getElementById("appBody").style.display = "block";
} // function makePlanSelect() {
// 	var planText = document.createElement("p");
// 	planText.className = "psa-p";
// 	planText.textContent = "Pick a plan";
//
//
// 	//Make monthly card
// 	var monthlyCard = document.createElement("div");
// 	var monthlyLabel = document.createElement("label");
// 	var monthlyContent = document.createElement("div");
// 	var monthlySelect = document.createElement("div");
// 	var monthlyTitle = document.createElement("h5");
// 	var monthlyDescription = document.createElement("p");
// 	var monthlyRadio = document.createElement("input");
//
// 	monthlyCard.classList.add("psa-form-card");
// 	monthlyCard.id = "monthly-plan-card";
//
// 	monthlyLabel.setAttribute("for", "monthly-plan");
// 	monthlyLabel.style = "cursor: pointer;";
// 	monthlyLabel.classList.add("plan-card");
// 	monthlyLabel.id = "monthly-label";
//
// 	monthlyContent.classList.add("plan-text");
//
// 	monthlySelect.classList.add("plan-content");
//
// 	monthlyTitle.classList.add("plan-title");
// 	monthlyTitle.textContent = "$29.99/month";
//
// 	monthlyDescription.classList.add("plan-description");
// 	monthlyDescription.textContent = "Monthly Plan";
//
// 	monthlyRadio.classList.add("plan-radio");
// 	monthlyRadio.name = "planSelect";
// 	monthlyRadio.id = "monthly-plan";
// 	monthlyRadio.value = monthly_plan;
// 	monthlyRadio.type = "radio";
// 	monthlyRadio.checked = true;
//
// 	monthlyCard.appendChild(monthlyLabel);
// 	monthlyLabel.appendChild(monthlyContent);
// 	monthlyContent.appendChild(monthlyTitle);
// 	monthlyContent.appendChild(monthlyDescription);
// 	monthlySelect.appendChild(monthlyRadio);
// 	monthlyLabel.appendChild(monthlySelect);
//
// 	//Make yearly card
// 	var yearlyCard = document.createElement("div");
// 	var yearlyLabel = document.createElement("label");
// 	var yearlyContent = document.createElement("div");
// 	var yearlySelect = document.createElement("div");
// 	var yearlyTitle = document.createElement("h5");
// 	var yearlyDescription = document.createElement("p");
// 	var yearlyRadio = document.createElement("input");
//
// 	yearlyCard.classList.add("psa-form-card");
// 	yearlyCard.id = "yearly-plan-card";
//
// 	yearlyLabel.setAttribute("for", "yearly-plan");
// 	yearlyLabel.style = "cursor: pointer;";
// 	yearlyLabel.classList.add("plan-card");
// 	yearlyLabel.id = "yearly-label";
//
// 	yearlyContent.classList.add("plan-text");
//
// 	yearlySelect.classList.add("plan-content");
//
// 	yearlyTitle.classList.add("plan-title");
// 	yearlyTitle.textContent = "$249.99/year";
//
// 	yearlyDescription.classList.add("plan-description");
// 	yearlyDescription.textContent = "A full year at $20.83/month";
//
// 	yearlyRadio.classList.add("plan-radio");
// 	yearlyRadio.name = "planSelect";
// 	yearlyRadio.id = "yearly-plan";
// 	yearlyRadio.value = yearly_plan;
// 	yearlyRadio.type = "radio";
//
// 	yearlyCard.appendChild(yearlyLabel);
// 	yearlyLabel.appendChild(yearlyContent);
// 	yearlyContent.appendChild(yearlyTitle);
// 	yearlyContent.appendChild(yearlyDescription);
// 	yearlySelect.appendChild(yearlyRadio);
// 	yearlyLabel.appendChild(yearlySelect);
//
// 	//make plans div
// 	var plans = document.createElement("div");
// 	plans.id = "plans";
//
// 	plans.appendChild(planText);
// 	plans.appendChild(monthlyCard);
// 	plans.appendChild(yearlyCard);
//
// 	return plans;
// }
// function freeTrialCard() {
// 	var subscriptionForm = document.createElement("form");
// 	var cardElementLabel = document.createElement("p");
// 	var cardElement = document.createElement("div");
// 	var cardErrors = document.createElement("div");
// 	var checkoutButton = document.createElement("button");
// 	var secureText = document.createElement("p");
// 	var secureLink = document.createElement("a");
//
// 	subscriptionForm.id = "subscription-form";
//
// 	cardElementLabel.setAttribute("for", "card-element");
// 	cardElementLabel.textContent = "Enter your credit or debit card";
// 	cardElementLabel.classList.add("psa-p");
//
// 	cardElement.id = "card-element";
// 	cardElement.classList.add("MyCardElement");
// 	cardElement.classList.add("psa-form-card");
//
//
// 	cardErrors.id = "card-errors";
// 	cardErrors.setAttribute("role", "alert");
//
// 	checkoutButton.type = "submit";
// 	checkoutButton.className = "psa-button-pink";
// 	checkoutButton.innerText = "Start 7-Day Trial";
// 	checkoutButton.id = "free-trial-button";
// 	checkoutButton.type = "button";
// 	checkoutButton.disabled = true;
//
// 	secureText.className = "psa-p";
// 	secureText.textContent = "Secure checkout by ";
//
// 	secureLink.href = stripeURL;
// 	secureLink.target = "_blank";
// 	secureLink.textContent = "Stripe";
//
// 	secureText.appendChild(secureLink);
// 	subscriptionForm.appendChild(cardElementLabel);
// 	subscriptionForm.appendChild(cardElement);
// 	subscriptionForm.appendChild(cardErrors);
// 	subscriptionForm.appendChild(checkoutButton);
// 	subscriptionForm.appendChild(secureText);
//
// 	return subscriptionForm;
// }
// function updateCard() {
// 	var subscriptionForm = document.createElement("form");
// 	var cardElementLabel = document.createElement("p");
// 	var cardElement = document.createElement("div");
// 	var cardErrors = document.createElement("div");
// 	var checkoutButton = document.createElement("button");
// 	var secureText = document.createElement("p");
// 	var secureLink = document.createElement("a");
//
// 	subscriptionForm.id = "subscription-form";
//
// 	cardElementLabel.setAttribute("for", "card-element");
// 	cardElementLabel.textContent = "Enter your new credit or debit card";
// 	cardElementLabel.classList.add("psa-p");
//
// 	cardElement.id = "card-element";
// 	cardElement.classList.add("MyCardElement");
// 	cardElement.classList.add("psa-form-card");
//
// 	cardErrors.id = "card-errors";
// 	cardErrors.setAttribute("role", "alert");
//
// 	checkoutButton.type = "submit";
// 	checkoutButton.className = "psa-button-pink";
// 	checkoutButton.innerText = "Submit Change Card 💳";
// 	checkoutButton.id = "update-card-button";
// 	checkoutButton.type = "button";
// 	checkoutButton.disabled = true;
//
// 	secureText.className = "psa-p";
// 	secureText.textContent = "Secure checkout by ";
//
// 	secureLink.href = stripeURL;
// 	secureLink.target = "_blank";
// 	secureLink.textContent = "Stripe";
//
// 	secureText.appendChild(secureLink);
// 	subscriptionForm.appendChild(cardElementLabel);
// 	subscriptionForm.appendChild(cardElement);
// 	subscriptionForm.appendChild(cardErrors);
// 	subscriptionForm.appendChild(checkoutButton);
// 	subscriptionForm.appendChild(secureText);
//
// 	return subscriptionForm;
// }
// function elementsWatch() {
// 	// Set up Stripe.js and Elements to use in checkout form
// 	var card = elements.create('card', {
// 		iconStyle: 'solid',
// 		style: {
// 			base: {
// 				iconColor: '#c4f0ff',
// 				color: '#fff',
// 				fontWeight: 500,
// 				fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
// 				fontSize: '14px',
// 				fontSmoothing: 'antialiased',
//
// 				':-webkit-autofill': {
// 					color: '#fce883',
// 				},
// 				'::placeholder': {
// 					color: '#87BBFD',
// 				},
// 			},
// 			invalid: {
// 				iconColor: '#FFC7EE',
// 				color: '#FFC7EE',
// 			},
// 		}
// 	});
//
// 	card.mount("#card-element");
//
// 	card.addEventListener('change', function (event) {
// 		var displayError = document.getElementById('card-errors');
// 		if (event.error) {
// 			displayError.textContent = event.error.message;
// 		} else {
// 			displayError.textContent = '';
// 		}
// 	});
//
// 	card.on('change', function (event) {
// 		if (event.complete) {
// 			// enable payment button
// 			if (document.getElementById("free-trial-button")) {
// 				document.getElementById("free-trial-button").disabled = false;
// 			}
// 			if (document.getElementById("update-card-button")) {
// 				document.getElementById("update-card-button").disabled = false;
// 			}
// 		} else if (event.error) {
// 			// show validation to customer
// 			if (document.getElementById("free-trial-button")) {
// 				document.getElementById("free-trial-button").disabled = true;
// 			}
// 			if (document.getElementById("update-card-button")) {
// 				document.getElementById("update-card-button").disabled = true;
// 			}
// 		}
// 	});
//
// 	return card;
// }
// function setupFreeTrial(user) {
// 	var date = new Date();
// 	date.setDate(date.getDate() + 7);
// 	var dateMsg =
// 		date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
// 	if (user_closet_id) {
// 		document.getElementById("login-info").innerText =
// 			"Welcome, " + user_closet_id + "! 👋\nTo get access, start a no-risk, cancel anytime, 7-day free trial."
// 	} else {
// 		document.getElementById("login-info").innerText =
// 			"Welcome! 👋\nTo get access, start a no-risk, cancel anytime, 7-day free trial."
// 	}
//
// 	var planSelect = makePlanSelect();
// 	var cardInput = freeTrialCard();
//
// 	if (document.getElementById("subscriptionForm") != null) {
// 		document.getElementById("subscriptionForm").style.display = "block";
// 	} else {
// 		document.getElementById("forgot-end-sub").appendChild(planSelect);
// 		document.getElementById("forgot-end-sub").appendChild(cardInput);
// 		var card = elementsWatch();
// 	}
//
// 	document.getElementById('free-trial-button').addEventListener('click', function (event) {
// 		var plan = document.querySelector('input[name="planSelect"]:checked').value;
// 		document.getElementById('free-trial-button').disabled = true;
// 		document.getElementById('free-trial-button').textContent = "Starting free trial...";
// 		stripe.createPaymentMethod({
// 			type: 'card',
// 			card: card,
// 			billing_details: {
// 				email: email,
// 			},
// 		})
// 			.then(result => {
// 				// Handle result.error or result.paymentMethod
// 				if (!result.error) {
// 					return fetch(newCustomerURL, {
// 						method: 'post',
// 						headers: {
// 							'Content-Type': 'application/json'
// 						},
// 						body: JSON.stringify({
// 							uid: uid,
// 							email: email,
// 							plan: plan,
// 							payment_method: result.paymentMethod
// 						})
// 					})
// 				} else {
// 					// console.log("There was an error creating the card");
// 				}
// 			})
// 			.then(function (response) {
// 				if (response.status == "200") {
// 					return response;
// 				} else {
// 					throw new Error('Something went wrong.');
// 				}
// 			})
// 			.then((response) => {
// 				document.getElementById('free-trial-button').textContent = "Success ✅";
// 				workerTimers.setTimeout(function () {
// 					location.reload()
// 				}, 1000)
// 			})
// 			.catch((error) => {
// 				document.getElementById('free-trial-button').textContent = "Something went wrong 🚫";
// 				workerTimers.setTimeout(function () {
// 					document.getElementById('free-trial-button').disabled = false;
// 					document.getElementById('free-trial-button').textContent = "Start 7-day Trial";
// 				}, 2000)
// 			});
// 	});
//
// 	//Sign Out
// 	var endSub = document.createElement("button");
// 	endSub.id = "sign-out";
// 	endSub.innerText = "Sign Out 🔐";
// 	endSub.className += "psa-button";
// 	endSub.addEventListener("click", toggleSignIn, false);
// 	if (document.getElementById("sign-out") != null) {
// 		document.getElementById("sign-out").style.display = "block";
// 	} else {
// 		document.getElementById("forgot-end-sub").appendChild(endSub);
// 	}
//
// 	//display the app
// 	document.getElementById("appBody").style.display = "block";
// }
// function setupUpgrade(user) {
// 	if (user_closet_id) {
// 		document.getElementById("login-info").innerText =
// 			"Welcome, " + user_closet_id + "! 👋\nTo get access, upgrade your subscription.";
// 	} else {
// 		document.getElementById("login-info").innerText =
// 			"Welcome 👋\nTo get access, upgrade your subscription.";
// 	}
//
// 	var planSelect = makePlanSelect();
// 	var cardInput = updateCard();
//
// 	var cardDetails = document.createElement("p");
// 	cardDetails.classList.add("psa-p");
// 	cardDetails.textContent = "Current card: " + user.stripe.last4 + " Exp. " + user.stripe.exp_month + "/" + user.stripe.exp_year;
//
// 	var checkoutButton = document.createElement("button");
// 	checkoutButton.id = "upgrade_button";
// 	checkoutButton.type = "button";
// 	checkoutButton.className = "psa-button-pink";
// 	checkoutButton.innerText = "Upgrade Account";
// 	checkoutButton.onclick = function () {
// 		if (confirm("Are you sure you want to upgrade your subscription?\n\nYou will be billed immediately on your current card.\n\nClick 'OK' to upgrade your subscription.\nClick 'Cancel' to not change anything.")) {
// 			var plan = document.querySelector('input[name="planSelect"]:checked').value;
// 			document.getElementById('upgrade_button').disabled = true;
// 			document.getElementById('upgrade_button').textContent = "Upgrading...";
// 			// console.log(user.stripe.customer);
// 			fetch(upgradeCustomerURL, {
// 				method: 'post',
// 				headers: {
// 					'Content-Type': 'application/json'
// 				},
// 				body: JSON.stringify({
// 					cus: user.stripe.customer,
// 					uid: uid,
// 					email: email,
// 					plan: plan,
// 				})
// 			})
// 				.then(function (response) {
// 					if (response.status == "200") {
// 						return response;
// 					} else {
// 						throw new Error('Something went wrong.');
// 					}
// 				})
// 				.then((response) => {
// 					document.getElementById('upgrade_button').textContent = "Success ✅";
// 					workerTimers.setTimeout(function () {
// 						location.reload()
// 					}, 1000)
// 				})
// 				.catch((error) => {
// 					document.getElementById('upgrade_button').textContent = "Something went wrong 🚫";
// 					workerTimers.setTimeout(function () {
// 						document.getElementById('upgrade_button').disabled = false;
// 						document.getElementById('upgrade_button').textContent = "Upgrade Account";
// 					}, 2000)
// 				});
// 		}
// 	};
//
// 	var startUpdateButton = document.createElement("button");
// 	startUpdateButton.classList.add("psa-button");
// 	startUpdateButton.textContent = "Change Card 💳";
// 	startUpdateButton.id = "start-update-card";
// 	startUpdateButton.onclick = function () {
// 		if (!document.getElementById("subscription-form")) {
// 			startUpdateButton.textContent = "Cancel ✘";
//
// 			var changeCardSection = document.createElement("div");
// 			changeCardSection.classList.add("psa-form");
// 			changeCardSection.id = "change-card";
//
// 			startUpdateButton.parentNode.insertBefore(changeCardSection, startUpdateButton.nextSibling);
// 			changeCardSection.appendChild(cardInput);
// 			var card = elementsWatch();
//
// 			document.getElementById("update-card-button").onclick = function () {
// 				//update the card fetch
// 				document.getElementById('update-card-button').disabled = true;
// 				document.getElementById('update-card-button').textContent = "Updating...";
// 				stripe.createPaymentMethod({
// 					type: 'card',
// 					card: card,
// 					billing_details: {
// 						email: email,
// 					},
// 				})
// 					.then(result => {
// 						// Handle result.error or result.paymentMethod
// 						if (!result.error) {
// 							return fetch(updateCardElementsURL, {
// 								method: 'post',
// 								headers: {
// 									'Content-Type': 'application/json'
// 								},
// 								body: JSON.stringify({
// 									email: email,
// 									uid: uid,
// 									cus: user.stripe.customer,
// 									payment_method: result.paymentMethod
// 								})
// 							})
// 						} else {
// 							// console.log("There was an error creating the card");
// 						}
// 					})
// 					.then(function (response) {
// 						if (response.status == "200") {
// 							return response;
// 						} else {
// 							throw new Error('Something went wrong.');
// 						}
// 					})
// 					.then((response) => {
// 						document.getElementById('update-card-button').textContent = "Success ✅";
// 						workerTimers.setTimeout(function () {
// 							location.reload()
// 						}, 1000)
// 					})
// 					.catch((error) => {
// 						document.getElementById('update-card-button').textContent = "Something went wrong 🚫";
// 						workerTimers.setTimeout(function () {
// 							document.getElementById('update-card-button').disabled = false;
// 							document.getElementById('update-card-button').textContent = "Submit Change Card 💳";
// 						}, 2000)
// 					});
// 			}
//
// 		} else {
// 			if (document.getElementById("subscription-form").style.display == "none") {
// 				startUpdateButton.textContent = "Cancel Card Change 🚫";
// 				document.getElementById("subscription-form").style.display = "block";
// 			} else {
// 				startUpdateButton.textContent = "Change Card 💳";
// 				document.getElementById("subscription-form").style.display = "none";
// 			}
// 		}
// 	}
//
// 	var updateText = document.createElement("p");
// 	updateText.className = "psa-p";
// 	updateText.textContent = "Change your card if needed";
//
// 	document.getElementById("forgot-end-sub").appendChild(planSelect);
// 	document.getElementById("forgot-end-sub").appendChild(checkoutButton);
// 	// document.getElementById("forgot-end-sub").appendChild(updateText);
// 	document.getElementById("forgot-end-sub").appendChild(cardDetails);
// 	document.getElementById("forgot-end-sub").appendChild(startUpdateButton);
//
// 	//Sign Out
// 	var endSub = document.createElement("button");
// 	endSub.id = "sign-out";
// 	endSub.innerText = "Sign Out 🔐";
// 	endSub.className += "psa-button";
// 	endSub.addEventListener("click", toggleSignIn, false);
// 	if (document.getElementById("sign-out") != null) {
// 		document.getElementById("sign-out").style.display = "block";
// 	} else {
// 		document.getElementById("forgot-end-sub").appendChild(endSub);
// 	}
//
// 	//display the app
// 	document.getElementById("appBody").style.display = "block";
// }
// function setupSignedOut() {
// 	console.log("setupSignedOut()")
// 	setupPaying(user)
// 	// initAuthTab();
// 	// sharingTab.disabled = false;
// 	// actionsTab.disabled = false;
// 	// settingsTab.disabled = false;
// 	//
// 	// if (document.getElementById("sharing")) {
// 	// 	//if the login tab exists, clear it out.
// 	// 	document.getElementById("sharing").parentNode.removeChild(document.getElementById("sharing"));
// 	// } if (document.getElementById("settings")) {
// 	// 	//if the login tab exists, clear it out.
// 	// 	document.getElementById("settings").parentNode.removeChild(document.getElementById("settings"));
// 	// } if (document.getElementById("actions")) {
// 	// 	//if the login tab exists, clear it out.
// 	// 	document.getElementById("actions").parentNode.removeChild(document.getElementById("actions"));
// 	// }
// 	//
// 	// if (document.getElementById("sign-out") != null) {
// 	// 	document.getElementById("sign-out").style.display = "none";
// 	// }
// 	// //console.log("User signed out.");
// 	// document.getElementById("login-info").innerText =
// 	// 	"Put in your Email/Password.\nClick 'Sign Up' to create a new account.";
// 	// // document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
// 	// document.getElementById("sign-in").style.display = "inline";
// 	// document.getElementById("sign-up").style.display = "inline";
// 	// document.getElementById("email").style.display = "block";
// 	// document.getElementById("password").style.display = "block";
// 	// document.getElementById("forgot").style.display = "block";
// 	// document.getElementById("loginForm").style.display = "block";
// 	// var el = document.getElementById("updateButton");
// 	// if (el != null) {
// 	// 	document.getElementById("updateButton").style.display = "none";
// 	// }
// 	// document.getElementById("sign-in").textContent = "Sign In";
// 	// if (document.getElementById("end-sub") != null) {
// 	// 	document.getElementById("end-sub").style.display = "none";
// 	// }
// 	// if (document.getElementById("checkout") != null) {
// 	// 	document.getElementById("checkout").style.display = "none";
// 	// }
// 	// if (document.getElementById("upgrade_button") != null) {
// 	// 	document.getElementById("upgrade_button").style.display = "none";
// 	// }
// 	// document.getElementById("appBody").style.display = "block";
// }


function filterItems() {
  console.log("filterItems()");

  if (filterOption) {
    console.log("filtering");

    if (!isEmptyOrSpaces(filterInput)) {
      // console.log(filterInput)
      // let mainNode = document.querySelector('.m--t--1');
      let tiles = document.querySelectorAll('.tile'); // console.log(tiles)

      tiles.forEach(tile => {
        let itemTitle = tile.querySelector('.tile__title').textContent; // console.log(itemTitle);

        if (itemTitle.toUpperCase().includes(filterInput.toUpperCase())) {// console.log("YES");
        } else {
          // console.log("NO");
          // tileNode.parentElement.removeChild(tileNode);
          tile.style.visibility = "hidden";
        }
      });
    }
  }
}

function unfilterItems() {
  console.log("unfilterItems()");

  if (!filterOption) {
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.style.visibility = "visible";
    });
  }
}

function isEmptyOrSpaces(str) {
  return str === null || /^ *$/.test(str);
}

function initOptions() {
  // console.log(initOptions)
  // console.log(this_user)
  if (this_user.settings.speed == 5000) {
    speedOption = this_user.settings.speed;
    document.getElementById("super_slow").checked = true;
  } else if (this_user.settings.speed == 2000) {
    speedOption = this_user.settings.speed;
    document.getElementById("slow").checked = true;
  } else if (this_user.settings.speed == 1250) {
    speedOption = this_user.settings.speed;
    document.getElementById("medium").checked = true;
  } else if (this_user.settings.speed == 500) {
    speedOption = this_user.settings.speed;
    document.getElementById("fast").checked = true;
  } else if (this_user.settings.speed == 0) {
    speedOption = this_user.settings.speed;
    document.getElementById("custom_speed").checked = true;
  } else {
    document.getElementById("medium").checked = true;
    speedOption = 1250;
  }

  if (this_user.settings.order == 0) {
    orderOption = this_user.settings.order;
    document.getElementById("bottomUp").checked = true;
  } else if (this_user.settings.order == 1) {
    orderOption = this_user.settings.order;
    document.getElementById("topDown").checked = true;
  } else if (this_user.settings.order == 2) {
    orderOption = this_user.settings.order;
    document.getElementById("randomOrder").checked = true;
  } else {
    document.getElementById("topDown").checked = true;
    orderOption = 1;
  }

  if (this_user.settings.select) {
    if (document.querySelectorAll(".tile").length == 0 || location.protocol + '//' + location.host + location.pathname == "https://" + country_url + "/feed") {
      document.getElementById("select-buttons").style.display = "none";
      document.getElementById("selectItems").checked = false;
      document.getElementById('selectItemsLabel').style = "text-decoration: line-through;";
      document.getElementById("selectItems").disabled = true;
      selectOption = false;
    } else {
      document.getElementById("select-buttons").style.display = "block";
      document.getElementById("selectMessage").style.display = "block";
      document.getElementById("followers-button").textContent = "Share All To Followers";
      document.getElementById("party-button").textContent = "Share All To Party";
      selectOption = true;
      document.getElementById("selectItems").checked = true;
    }
  } else {
    if (document.querySelectorAll(".tile").length == 0 || location.protocol + '//' + location.host + location.pathname == "https://" + country_url + "/feed") {
      document.getElementById("select-buttons").style.display = "none";
      document.getElementById("selectItems").checked = false;
      document.getElementById('selectItemsLabel').style = "text-decoration: line-through;";
      document.getElementById("selectItems").disabled = true;
      selectOption = false;
    }

    document.getElementById("select-buttons").style.display = "none";
    selectOption = false;
  }

  console.log("filter_only");
  window.addEventListener("scroll", function () {
    filterItems();
  });
  console.log(this_user.settings.filter_only);

  if (this_user.settings.filter_only) {
    document.getElementById("filterItemsInput").style.display = "block";
    document.getElementById("filterItems").checked = true;
    filterOption = this_user.settings.filter_only;
    filterInput = this_user.settings.filter_input;
    document.getElementById("filterItemsInput").value = filterInput;
    filterItems();
  } else {
    document.getElementById("filterItemsInput").style.display = "none";
    document.getElementById("filterItems").checked = false;
    filterOption = this_user.settings.filter_only;
    filterInput = this_user.settings.filter_input;
    document.getElementById("filterItemsInput").value = filterInput;
  }

  if (this_user.settings.bgSharing) {
    bgSharing = true;
    document.getElementById("bgSharing").checked = true;
  } else {
    bgSharing = false;
    document.getElementById("bgSharing").checked = false;
  } // console.log("bgSharing="+bgSharing)
  //For now, if it's not in their closet they can't use the option.


  if (!is_closet) {
    document.getElementById("bgSharing").checked = false;
    document.getElementById('bgSharingLabel').style = "text-decoration: line-through;";
    document.getElementById("bgSharing").disabled = true;
    selectOption = false;
  }

  if (this_user.settings.scroll) {
    scrollOption = true;
    document.getElementById("scrollCloset").checked = true;
  } else {
    document.getElementById("scrollCloset").checked = false;
    scrollOption = false;
  }

  if (this_user.settings.continuous) {
    document.getElementById("continuous").checked = true;
    continuousOption = true;
  } else {
    document.getElementById("continuous").checked = false;
    continuousOption = false;
  }

  if (this_user.settings.captcha) {
    document.getElementById("captcha").checked = true;
    captchaOption = true;
  } else {
    document.getElementById("captcha").checked = false;
    captchaOption = false;
  }

  if (this_user.settings.share_limit) {
    document.getElementById("shareLimit").checked = true;
    shareLimitOption = true;
  } else {
    document.getElementById("shareLimit").checked = false;
    shareLimitOption = false;
  }

  if (this_user.settings.share_limit_num) {
    document.getElementById("shareLimitNum").value = this_user.settings.share_limit_num;
    shareLimitNumber = this_user.settings.share_limit_num;
  } else {
    document.getElementById("shareLimitNum").value = 0;
    shareLimitNumber = 1000000;
  }

  if (this_user.settings.alarm) {
    document.getElementById("alarm").checked = true;
    alarmOption = true;
  } else {
    document.getElementById("alarm").checked = false;
    alarmOption = false;
  } //custom speed


  if (this_user.settings.speedMin) {
    document.getElementById("customSpeedMin").value = this_user.settings.speedMin;
    speedMin = this_user.settings.speedMin;
  } else {
    document.getElementById("customSpeedMin").value = 0;
    speedMin = 0;
  }

  if (this_user.settings.speedMax) {
    document.getElementById("customSpeedMax").value = this_user.settings.speedMax;
    speedMax = this_user.settings.speedMax;
  } else {
    document.getElementById("customSpeedMax").value = 0;
    speedMax = 0;
  } //custom continuous


  if (this_user.settings.continuousMin) {
    document.getElementById("continuousMin").value = this_user.settings.continuousMin;
    continuousMin = this_user.settings.continuousMin;
  } else {
    document.getElementById("continuousMin").value = 0;
    continuousMin = 0;
  }

  if (this_user.settings.continuousMax) {
    document.getElementById("continuousMax").value = this_user.settings.continuousMax;
    continuousMax = this_user.settings.continuousMax;
  } else {
    document.getElementById("continuousMax").value = 0;
    continuousMax = 0;
  }

  if (this_user.settings.continuousLimitOn) {
    document.getElementById("continuousLimitCheck").checked = true;
    continuousLimitOn = true;
  } else {
    document.getElementById("continuousLimitCheck").checked = false;
    continuousLimitOn = false;
  }

  if (this_user.settings.continuousLimit) {
    document.getElementById("continuousLimit").value = this_user.settings.continuousLimit;
    continuousLimit = this_user.settings.continuousLimit;
  } else {
    document.getElementById("continuousLimit").value = 0;
    continuousLimit = 0;
  }

  if (this_user.settings.afterScroll) {
    document.getElementById("scroll-type").value = this_user.settings.afterScroll;
    afterScroll = this_user.settings.afterScroll;
  } else {
    document.getElementById("scroll-type").value = "nothing";
    afterScroll = "nothing";
  } //2captcha


  if (this_user.settings.captcha_id) {
    document.getElementById("captcha_id").value = this_user.settings.captcha_id;
  }

  var url_params = window.location.search;
  var url = window.location.href; // console.log("available_only=" + this_user.settings.available_only)

  if (this_user.settings.available_only) {
    document.getElementById("available").checked = true;
    availableOption = this_user.settings.available_only;

    if (document.getElementById("availability-available")) {
      if (!document.getElementById("availability-available").checked) {
        document.getElementById("availability-available").click();
      }

      if (is_closet && scrollOption) {
        var scrollThisCloset = workerTimers.setTimeout(function () {
          scrolling = true;
          scrollToLoad();
        }, 3000);
      }
    }

    if (document.getElementsByName("availability").length > 0) {
      if (!document.getElementsByName("availability")[1].checked) {
        document.getElementsByName("availability")[1].click();
      }

      if (is_closet && scrollOption) {
        var scrollThisCloset = workerTimers.setTimeout(function () {
          scrolling = true;
          scrollToLoad();
        }, 3000);
      }
    }

    if (document.getElementById("m-open-filter") && !document.getElementById("availability-available")) {
      document.getElementById("m-open-filter").click();
      workerTimers.setTimeout(function () {
        document.querySelector("[data-key=availability]").click();
        workerTimers.setTimeout(function () {
          document.getElementById("availability-available").click();
          workerTimers.setTimeout(function () {
            document.getElementsByClassName("btn btn-small blue")[0].click();

            if (is_closet && scrollOption) {
              var scrollThisCloset = workerTimers.setTimeout(function () {
                scrolling = true;
                scrollToLoad();
              }, 3000);
            }
          }, 500);
        }, 500);
      }, 500);
    }

    if (document.querySelector("[data-test=filter-show]")) {
      document.querySelector("[data-test=filter-show]").click();
      workerTimers.setTimeout(function () {
        document.querySelectorAll("p.filter-drawer--subtext")[2].click();
        workerTimers.setTimeout(function () {
          document.querySelector("[value=available]").click();
          workerTimers.setTimeout(function () {
            document.getElementsByClassName("filter-drawer--done-btn btn btn--primary btn--small")[0].click();

            if (is_closet && scrollOption) {
              var scrollThisCloset = workerTimers.setTimeout(function () {
                scrolling = true;
                scrollToLoad();
              }, 3000);
            }
          }, 500);
        }, 500);
      }, 500);
    }

    if (document.getElementsByClassName("btn btn--tertiary btn--small tr--uppercase").length > 0) {
      document.getElementsByClassName("btn btn--tertiary btn--small tr--uppercase")[0].click();
      workerTimers.setTimeout(function () {
        document.getElementsByClassName("navigation--vertical__link")[7].querySelector("div").click();
        workerTimers.setTimeout(function () {
          document.getElementsByClassName("form_list")[1].querySelector(".form__label--check").click();
          workerTimers.setTimeout(function () {
            document.getElementsByClassName("filter-drawer--done-btn")[0].click();

            if (is_closet && scrollOption) {
              var scrollThisCloset = workerTimers.setTimeout(function () {
                scrolling = true;
                scrollToLoad();
              }, 3000);
            }
          }, 500);
        }, 500);
      }, 500);
    }
  } else {
    document.getElementById("available").checked = false;
    availableOption = false;

    if (is_closet && scrollOption) {
      var scrollThisCloset = workerTimers.setTimeout(function () {
        scrolling = true;
        scrollToLoad();
      }, 3000);
    }
  }
}

function updateOptions() {
  // console.log("updateOptions()");
  //get speed
  if (document.getElementById("super_slow").checked) {
    speedOption = 5000; //console.log("Speed: " + speedOption);
  } else if (document.getElementById("slow").checked) {
    speedOption = 2000; //console.log("Speed: " + speedOption);
  } else if (document.getElementById("medium").checked) {
    speedOption = 1250; //console.log("Speed: " + speedOption);
  } else if (document.getElementById("custom_speed").checked) {
    speedOption = 0; //console.log("Speed: " + speedOption);
  } else {
    speedOption = 500; //console.log("Speed: " + speedOption);
  } //get order


  if (document.getElementById("bottomUp").checked) {
    orderOption = 0; //console.log("Speed: " + speedOption);
  } else if (document.getElementById("topDown").checked) {
    orderOption = 1; //console.log("Speed: " + speedOption);
  } else if (document.getElementById("randomOrder").checked) {
    orderOption = 2; //console.log("Speed: " + speedOption);
  } else {
    //something not configured
    orderOption = 0;
  }

  if (document.getElementById("selectItems").checked) {
    if (document.getElementById("select-buttons").style.display != "block") {
      selectOption = true;
      document.getElementById("select-buttons").style.display = "block";
      document.getElementById("selectMessage").style.display = "block";
      document.getElementById("followers-button").textContent = "Share All To Followers";
      document.getElementById("party-button").textContent = "Share All To Party";
    }
  } else {
    if (document.getElementById("select-buttons").style.display != "none") {
      selectOption = false;
      document.getElementById("select-buttons").style.display = "none";
      document.getElementById("selectMessage").style.display = "none"; // change the buttons back

      document.getElementById("followers-button").textContent = "Share To Followers";
      document.getElementById("party-button").textContent = "Share To Party"; //return items to normal

      if (document.querySelectorAll(".select-item").length > 0) {
        document.getElementById("select-items-button").textContent = "Select Items";

        var clean = _dompurify.default.sanitize(originalItems);

        document.getElementById("tiles-con").innerHTML = clean;
        selectedItems = [];
      }
    }
  } //BG sharing option


  if (document.getElementById("bgSharing").checked) {
    bgSharing = true;
  } else {
    bgSharing = false;
  }

  if (document.getElementById("continuous").checked) {
    continuousOption = true; //console.log("Continuous: " + continuousOption);
  } else {
    continuousOption = false; //console.log("Continuous: " + continuousOption);
  }

  if (document.getElementById("alarm").checked) {
    alarmOption = true; //console.log("Alarm: " + alarmOption);
  } else {
    alarmOption = false; //console.log("Alarm: " + alarmOption);
  }

  if (document.getElementById("captcha").checked) {
    captchaOption = true; //console.log("captcha: " + captchaOption);
  } else {
    captchaOption = false; //console.log("captcha: " + captchaOption);
  }

  if (document.getElementById("shareLimit").checked) {
    shareLimitOption = true; //console.log("shareLimit: " + shareLimitOption);
  } else {
    shareLimitOption = false; //console.log("shareLimit: " + shareLimitOption);
  }

  var url_params = window.location.search;
  var url = window.location.href;

  if (document.getElementById("available").checked && availableOption == false) {
    availableOption = true;

    if (document.getElementById("availability-available")) {
      if (!document.getElementById("availability-available").checked) {
        document.getElementById("availability-available").click();
      }
    }

    if (document.getElementsByName("availability").length > 0) {
      if (!document.getElementsByName("availability")[1].checked) {
        document.getElementsByName("availability")[1].click();
      }
    }

    if (document.getElementById("m-open-filter") && !document.getElementById("availability-available")) {
      document.getElementById("m-open-filter").click();
      workerTimers.setTimeout(function () {
        document.querySelector("[data-key=availability]").click();
        workerTimers.setTimeout(function () {
          document.getElementById("availability-available").click();
          workerTimers.setTimeout(function () {
            document.getElementsByClassName("btn btn-small blue")[0].click();
          }, 500);
        }, 500);
      }, 500);
    }

    if (document.querySelector("[data-test=filter-show]")) {
      document.querySelector("[data-test=filter-show]").click();
      workerTimers.setTimeout(function () {
        document.querySelectorAll("p.filter-drawer--subtext")[2].click();
        workerTimers.setTimeout(function () {
          document.querySelector("[value=available]").click();
          workerTimers.setTimeout(function () {
            document.getElementsByClassName("filter-drawer--done-btn btn btn--primary btn--small")[0].click();
          }, 500);
        }, 500);
      }, 500);
    }
  }

  if (!document.getElementById("available").checked && availableOption == true) {
    availableOption = false;

    if (document.getElementById("availability-all")) {
      if (!document.getElementById("availability-all").checked) {
        document.getElementById("availability-all").click();
      }
    }

    if (document.getElementsByName("availability").length > 0) {
      if (!document.getElementsByName("availability")[0].checked) {
        document.getElementsByName("availability")[0].click();
      }
    }

    if (document.getElementById("m-open-filter") && !document.getElementById("availability-available")) {
      document.getElementById("m-open-filter").click();
      workerTimers.setTimeout(function () {
        document.querySelector("[data-key=availability]").click();
        workerTimers.setTimeout(function () {
          document.getElementById("availability-all").click();
          workerTimers.setTimeout(function () {
            document.getElementsByClassName("btn btn-small blue")[0].click();
          }, 500);
        }, 500);
      }, 500);
    }

    if (document.querySelector("[data-test=filter-show]")) {
      document.querySelector("[data-test=filter-show]").click();
      workerTimers.setTimeout(function () {
        document.querySelectorAll("p.filter-drawer--subtext")[2].click();
        workerTimers.setTimeout(function () {
          document.querySelector("[value=all]").click();
          workerTimers.setTimeout(function () {
            document.getElementsByClassName("filter-drawer--done-btn btn btn--primary btn--small")[0].click();
          }, 500);
        }, 500);
      }, 500);
    }
  }

  if (!document.getElementById("filterItems").checked && filterOption == true) {
    filterOption = false;
    document.getElementById("filterItemsInput").style.display = "none";
    unfilterItems();
  }

  if (document.getElementById("filterItems").checked && filterOption == false) {
    filterOption = true;
    document.getElementById("filterItemsInput").style.display = "block";
    filterItems();
  }

  if (document.getElementById("scrollCloset").checked) {
    scrollOption = true;
  } else {
    scrollOption = false;
  }

  if (document.getElementById("customSpeedMin").value != "") {
    speedMin = Number(document.getElementById("customSpeedMin").value);
  }

  if (document.getElementById("customSpeedMax").value != "") {
    speedMax = Number(document.getElementById("customSpeedMax").value);
  }

  if (document.getElementById("continuousMin").value != "") {
    continuousMin = Number(document.getElementById("continuousMin").value);
  }

  if (document.getElementById("continuousMax").value != "") {
    continuousMax = Number(document.getElementById("continuousMax").value);
  }

  if (document.getElementById("continuousLimitCheck").checked) {
    continuousLimitOn = true;
  } else {
    continuousLimitOn = false;
  }

  if (document.getElementById("continuousLimit").value != "") {
    continuousLimit = Number(document.getElementById("continuousLimit").value);
  }

  if (document.getElementById("scroll-type").value != "") {
    afterScroll = document.getElementById("scroll-type").value;
  } //captcha id
  //console.log(document.getElementById("captcha_id").value);
  //share limit number
  //console.log(document.getElementById("shareLimitNum").value);


  shareLimitNumber = document.getElementById("shareLimitNum").value; //sync up the options
  // var userRef = firebase
  // 	.firestore()
  // 	.collection("users")
  // 	.doc(uid);
  // clearTimeout(sync_timeout)
  // sync_timeout = workerTimers.setTimeout(function () {
  // 	//console.log("synced options");
  // 	var userData = userRef.update({
  // 		"settings.captcha_id": document.getElementById("captcha_id").value,
  // 		"settings.share_limit": shareLimitOption,
  // 		"settings.share_limit_num": Number(document.getElementById("shareLimitNum").value),
  // 		"settings.scroll": scrollOption,
  // 		"settings.available_only": availableOption,
  // 		"settings.speed": speedOption,
  // 		"settings.alarm": alarmOption,
  // 		"settings.captcha": captchaOption,
  // 		"settings.continuous": continuousOption,
  // 		"settings.speedMin": speedMin,
  // 		"settings.speedMax": speedMax,
  // 		"settings.order": orderOption,
  // 		"settings.continuousMin": continuousMin,
  // 		"settings.continuousMax": continuousMax,
  // 		"settings.continuousLimit": continuousLimit,
  // 		"settings.continuousLimitOn": continuousLimitOn,
  // 		"settings.select": selectOption,
  // 		"settings.afterScroll": afterScroll,
  // 		"settings.bgSharing": bgSharing
  // 	});
  // }, 500)

  var userData = {
    "settings": {
      "captcha_id": document.getElementById("captcha_id").value,
      "share_limit": shareLimitOption,
      "share_limit_num": Number(document.getElementById("shareLimitNum").value),
      "scroll": scrollOption,
      "available_only": availableOption,
      "filter_only": filterOption,
      "filter_input": filterInput,
      "speed": speedOption,
      "alarm": alarmOption,
      "captcha": captchaOption,
      "continuous": continuousOption,
      "speedMin": speedMin,
      "speedMax": speedMax,
      "order": orderOption,
      "continuousMin": continuousMin,
      "continuousMax": continuousMax,
      "continuousLimit": continuousLimit,
      "continuousLimitOn": continuousLimitOn,
      "select": selectOption,
      "afterScroll": afterScroll,
      "bgSharing": bgSharing
    }
  }; // console.log("localStorage.setItem()");

  console.log(userData);
  localStorage.setItem('userData', JSON.stringify(userData)); //update the analytics

  updateAnalyticsUI();
}

var selectedItems = [];
var originalItems;
var selectMode = false;

function selectItemsCallback() {
  selectMode = !selectMode; //if not in select mode

  if (!selectMode) {
    document.getElementById("select-items-button").textContent = "Select Items";
    document.getElementById("followers-button").textContent = "Share All To Followers";
    document.getElementById("party-button").textContent = "Share All To Party";

    if (document.getElementById("tiles-con")) {
      var clean = _dompurify.default.sanitize(originalItems);

      document.getElementById("tiles-con").innerHTML = clean;
    }

    if (document.querySelector("div[data-test='tiles_container']")) {
      var clean = _dompurify.default.sanitize(originalItems);

      document.querySelector("div[data-test='tiles_container']").innerHTML = clean;
    }

    if (document.getElementsByClassName("main__column")[0]) {
      var clean = _dompurify.default.sanitize(originalItems);

      document.getElementsByClassName("main__column")[0].querySelector(".m--t--1").innerHTML = clean;
    }

    selectedItems = [];
    document.getElementById("selectMessage").style.display = "block";
    document.getElementById("selectAll").style.display = "none";
    document.getElementById("selectAllItems").checked = false;
    document.getElementById("selectAllItemsLabel").innerText = "Select All Items";
  } else {
    // select mode
    document.getElementById("selectMessage").style.display = "none";
    document.getElementById("selectAll").style.display = "block";
    document.getElementById("select-items-button").textContent = "Clear Selection";
    document.getElementById("followers-button").textContent = "Share All To Followers";
    document.getElementById("party-button").textContent = "Share All To Party";

    if (document.getElementById("tiles-con")) {
      originalItems = document.getElementById("tiles-con").innerHTML;
    }

    if (document.querySelector("div[data-test='tiles_container']")) {
      originalItems = document.querySelector("div[data-test='tiles_container']").innerHTML;
    }

    if (document.getElementsByClassName("main__column")[0]) {
      originalItems = document.getElementsByClassName("main__column")[0].querySelector(".m--t--1").innerHTML;
    }

    var items = null;

    if (document.getElementsByClassName("covershot-con").length > 0) {
      items = document.getElementsByClassName("covershot-con");
    }

    if (document.getElementsByClassName("tile__covershot").length > 0) {
      items = document.getElementsByClassName("tile__covershot");
    }

    for (const item of items) {
      var selectItemWrapper = document.createElement("div");
      selectItemWrapper.classList.add("select-item");

      if (document.getElementsByClassName("covershot-con").length > 0) {
        selectItemWrapper.id = item.getAttribute("data-pa-attr-listing_id");
      }

      if (document.getElementsByClassName("tile__covershot").length > 0) {
        selectItemWrapper.id = item.getAttribute("data-et-prop-listing_id");
      }

      selectItemWrapper.style.opacity = 0.5;
      var selectItemNumber = document.createElement("div");
      selectItemNumber.style.position = "absolute";
      selectItemNumber.style.top = "50%";
      selectItemNumber.style.left = "50%";
      selectItemNumber.style.transform = "translate(-50%, -50%)";
      selectItemNumber.style.fontSize = "30px";
      selectItemNumber.style.color = "white";
      selectItemNumber.style.textShadow = "2px 2px #696969";
      selectItemNumber.style.textAlign = "center";
      selectItemNumber.style["width"] = "100%";
      selectItemNumber.style.lineHeight = "35px";
      selectItemNumber.classList.add("item-number");
      selectItemNumber.innerText = "Click To Add";
      item.parentNode.insertBefore(selectItemWrapper, item);
      selectItemWrapper.appendChild(item);
      item.appendChild(selectItemNumber);
      item.style['pointer-events'] = "none";
      item.style.cursor = "default";

      selectItemWrapper.onclick = function () {
        if (this.classList.contains("selected")) {
          this.classList.remove("selected");
          this.getElementsByTagName("a")[0].style.border = "0px";
          this.style.opacity = 0.5;
          var position = selectedItems.indexOf(this.id);
          selectedItems.splice(position, 1);
          this.querySelector(".item-number").style.fontSize = "30px";
          this.querySelector(".item-number").innerText = "Click To Add";

          for (const el of document.getElementsByClassName("select-item")) {
            if (selectedItems.indexOf(el.id) >= 0) {
              // console.log("Remove " + el.id)
              el.querySelector(".item-number").innerText = selectedItems.indexOf(el.id) + 1;
            }
          }
        } else {
          this.classList.add("selected");
          this.getElementsByTagName("a")[0].style.border = "5px solid #3d17a5";
          this.style.opacity = 1.0;
          selectedItems.push(this.id);
          var position = selectedItems.indexOf(this.id);
          this.querySelector(".item-number").style.fontSize = "60px";
          this.querySelector(".item-number").innerText = position + 1;
        } //change sharing buttons


        if (selectedItems.length > 0) {
          document.getElementById("selectMessage").style.display = "none";
          document.getElementById("followers-button").textContent = "Share Selected To Followers";
          document.getElementById("party-button").textContent = "Share Selected To Party";
        } else {
          //disable the "share to followers" and "share to party" buttons and text
          // document.getElementById("selectMessage").style.display = "block";
          document.getElementById("followers-button").textContent = "Share All To Followers";
          document.getElementById("party-button").textContent = "Share All To Party";
        }
      };
    }
  }
}

function selectAllCallback(tf) {
  var highlightedItems = document.querySelectorAll(".select-item.selected");
  var unhilightedItems = document.querySelectorAll(".select-item:not(.selected)");
  var allItems = document.querySelectorAll(".select-item");

  if (tf) {
    unhilightedItems.forEach(item => {
      item.classList.add("selected");
      item.getElementsByTagName("a")[0].style.border = "5px solid #3d17a5";
      item.style.opacity = 1.0;
      selectedItems.push(item.id);
      var position = selectedItems.indexOf(item.id);
      item.querySelector(".item-number").style.fontSize = "60px";
      item.querySelector(".item-number").innerText = position + 1;
    });
  } else {
    highlightedItems.forEach(item => {
      item.classList.remove("selected");
      item.getElementsByTagName("a")[0].style.border = "0px";
      item.style.opacity = 0.5;
      var position = selectedItems.indexOf(item.id);
      selectedItems.splice(position, 1);
      item.querySelector(".item-number").style.fontSize = "30px";
      item.querySelector(".item-number").innerText = "Click To Add";
    });
  }

  if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
  if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
}

function followersCallback() {
  captchaRetry = 1;
  linkClicked = false; // console.log("runningFollowers="+runningFollowers)
  // console.log("runningParty="+runningParty)

  if (!runningParty) {
    if (runningFollowers) {
      runningFollowers = false;
      document.getElementById("followers-button").innerText = "Pausing sharing..."; // updateAnalytics();
    } else {
      document.getElementById("followers-button").innerText = "Starting sharing...";
      runningFollowers = true;
      shareItems(currentFollowers, FOLLOWERS);
    }
  }
}

function partyCallback() {
  captchaRetry = 1;
  linkClicked = false;

  if (!runningFollowers) {
    if (runningParty) {
      runningParty = false;
      document.getElementById("party-button").innerText = "Pausing sharing..."; // updateAnalytics();
    } else {
      document.getElementById("party-button").innerText = "Starting sharing...";
      runningParty = true;
      shareItems(currentParty, PARTY);
    }
  }
}

function followCallback() {
  if (!runningUnfollowPeople) {
    if (runningFollowPeople) {
      document.getElementById("follow-people-button").innerText = "Pausing following...";
      runningFollowPeople = false; // updateAnalytics();
    } else {
      document.getElementById("follow-people-button").innerText = "Starting following...";
      runningFollowPeople = true;
      followPeople();
    }
  }
}

function unfollowCallback() {
  if (!runningFollowPeople) {
    if (runningUnfollowPeople) {
      document.getElementById("unfollow-people-button").innerText = "Pausing unfollowing...";
      runningUnfollowPeople = false; // updateAnalytics();
    } else {
      document.getElementById("unfollow-people-button").innerText = "Starting unfollowing...";
      runningUnfollowPeople = true;
      unfollowPeople();
    }
  }
}

function resumeAction() {
  captchaRetry = 1;

  if (captchaFollowers) {
    captchaFollowers = false;
    runningFollowers = false;

    if (bgSharing && is_closet) {
      runningFollowers = true;
      bgShareInit(user_closet_id, availableOption, null, currentFollowers); //TODO make null for user whatever page they are on
    } else {
      followersCallback();
    }
  }

  if (captchaParty) {
    captchaParty = false;
    runningParty = false;
    partyCallback();
  }

  if (captchaFollowPeople) {
    captchaFollowPeople = false;
    runningFollowPeople = false;
    followCallback();
  }

  if (captchaUnfollowPeople) {
    captchaUnfollowPeople = false;
    runningUnfollowPeople = false;
    unfollowCallback();
  }

  if (captchaOrganize) {
    captchaOrganize = false;
    runningOrganize = false;
    organizeContinue();
  }
}

function captchaFailed() {
  // console.log("Captcha Failed")
  if (captchaRetry < 3) {
    captchaRetry++;
    captchaState(captchaRetry);
    solveCaptcha();
  } else {
    workerTimers.setTimeout(function () {
      captchaRetry = 1; //Play failed sound...

      if (alarmOption) {
        captcha_failed.volume = 1.0;
        captcha_failed.src = "https://closet.tools/assets/sounds/captcha-failed.mp3";
        captcha_failed.play();
      }

      if (captchaFollowers) {
        document.getElementById("followers-button").innerText = "Solve Captcha Manualy (Click To Continue)";
      }

      if (captchaParty) {
        document.getElementById("party-button").innerText = "Solve Captcha Manualy (Click To Continue)";
      }

      if (captchaFollowPeople) {
        document.getElementById("follow-people-button").innerText = "Solve Captcha Manualy (Click To Continue)";
      }

      if (captchaUnfollowPeople) {
        document.getElementById("unfollow-people-button").innerText = "Solve Captcha Manualy (Click To Continue)";
      }

      if (captchaOrganize) {
        document.getElementById("organizer-button").innerText = "Solve Captcha Manualy (Click To Continue)";
      }

      document.title = "⚠️ Captcha Failed";
    }, 1000);
  }
}

function captchaState(attempts) {
  // updateAnalytics();
  var t = "";

  if (attempts) {
    t = "Solving Captcha (" + attempts + ")";
  } else {
    t = "Solving Captcha...";
  }

  if (captchaFollowers) {
    document.getElementById("followers-button").innerText = t;
  }

  if (captchaParty) {
    document.getElementById("party-button").innerText = t;
  }

  if (captchaFollowPeople) {
    document.getElementById("follow-people-button").innerText = t;
  }

  if (captchaUnfollowPeople) {
    document.getElementById("unfollow-people-button").innerText = t;
  }

  if (captchaOrganize) {
    document.getElementById("organizer-button").innerText = t;
  }

  document.title = t;
}

function editCallback() {
  captchaRetry = 1;

  if (runningEdit) {
    runningEdit = false;
    document.getElementById("edit-button").innerText = "Pausing Edit + Share...";
  } else {
    runningEdit = true;
    editShare();
  }
}

function scheduleCallback() {
  if (document.getElementById("scheduleSettings")) {
    if (document.getElementById("scheduleSettings").style.display == "none") {
      document.getElementById("schedule-button").textContent = "Close ✘";
      document.getElementById("scheduleSettings").style.display = "block";
    } else {
      document.getElementById("schedule-button").textContent = "Schedule Action";
      document.getElementById("scheduleSettings").style.display = "none";
    }
  } else {
    var scheduleButton = document.getElementById("schedule-button");
    scheduleButton.textContent = "Close ✘";
    var scheduleSettings = createScheduleSettings();
    scheduleButton.parentNode.insertBefore(scheduleSettings, scheduleButton.nextSibling);
  }
}

function createScheduleSettings() {
  //settings div
  var scheduleSettings = document.createElement("div");
  scheduleSettings.id = "scheduleSettings";
  scheduleSettings.classList.add("psa-form"); //Title buttons

  var scheduleTitle = document.createElement("p");
  scheduleTitle.className = "psa-p";
  scheduleTitle.textContent = "Schedule Options";
  var scheduleTypes = {};

  if (!is_closet) {
    scheduleTypes = {
      followers: 'Share To Followers',
      party: 'Share To Party'
    };
  } else {
    scheduleTypes = {
      followers: 'Share To Followers',
      party: 'Share To Party',
      offer: 'Offer To Likers'
    };
  }

  var scheduleTypeLabel = document.createElement("label");
  scheduleTypeLabel.for = "schedule-type";
  scheduleTypeLabel.textContent = "Select Type:";
  scheduleTypeLabel.className = "psa-p";
  var scheduleType = document.createElement("select");
  scheduleType.className = "psa-select";
  scheduleType.id = "schedule-type";

  for (var index in scheduleTypes) {
    scheduleType.options[scheduleType.options.length] = new Option(scheduleTypes[index], index);
  }

  var scheduleTimeLabel = document.createElement("label");
  scheduleTimeLabel.for = "schedule-time";
  scheduleTimeLabel.textContent = "Set Time:";
  scheduleTimeLabel.className = "psa-p";
  var scheduleTime = document.createElement("input");
  scheduleTime.className = "psa-time-input";
  scheduleTime.type = "time";
  scheduleTime.name = "schedule-time";
  var d = new Date();
  var currentTime = d.toTimeString();
  currentTime = currentTime.split(' ')[0];
  currentTime = currentTime.slice(0, -3);
  scheduleTime.value = currentTime;
  var scheduleSubmit = document.createElement("button");
  scheduleSubmit.id = "schedule-submit";
  scheduleSubmit.type = "button";
  scheduleSubmit.innerText = "Schedule Action";
  scheduleSubmit.className += "psa-button-pink";

  scheduleSubmit.onclick = function () {
    var scheduledTime = scheduleTime.value;
    var type = scheduleType.value;
    var [h, m] = scheduledTime.split(':'); // Get time gap

    var now = new Date();
    var actionTime = new Date();
    actionTime.setHours(h, m, 0, 0);
    var difference = actionTime.getTime() - now.getTime(); // if the difference is negative, do it tomorrow (not now)

    if (difference < 0) {
      actionTime.setDate(actionTime.getDate() + 1);
      difference = actionTime.getTime() - now.getTime();
    }

    var id;

    if (type == "offer") {
      id = workerTimers.setTimeout(function () {
        runningOffer = false;

        if (!document.getElementById("offerSettings")) {
          var offerSettings = createOfferSettings();
          document.getElementById("offer-button").parentNode.insertBefore(offerSettings, document.getElementById("offer-button").nextSibling);
          document.getElementById("offerSettings").style.display = "none";
        }

        document.getElementById("offer-submit").click();
        removeAction(id);
      }, difference);
    }

    if (type == "followers") {
      id = workerTimers.setTimeout(function () {
        runningFollowers = false;
        runningParty = false;
        followersCallback();
        removeAction(id);
      }, difference);
    }

    if (type == "party") {
      id = workerTimers.setTimeout(function () {
        runningFollowers = false;
        runningParty = false;
        partyCallback();
        removeAction(id);
      }, difference);
    } //signal scheduled


    if (id) {
      scheduleSubmit.textContent = "Scheduled ✔";
      workerTimers.setTimeout(function () {
        scheduleSubmit.textContent = "Schedule Action";
      }, 1000);
      addScheduledAction(id, scheduleType.options[scheduleType.selectedIndex].text, actionTime);
    } else {
      scheduleSubmit.textContent = "Not Scheduled ✘";
    }
  }; //Make groups


  var scheduleTypeGroup = document.createElement("div");
  scheduleTypeGroup.appendChild(scheduleTypeLabel);
  scheduleTypeGroup.appendChild(scheduleType);
  var scheduleTimeGroup = document.createElement("div");
  scheduleTimeGroup.appendChild(scheduleTimeLabel);
  scheduleTimeGroup.appendChild(scheduleTime); // Group groups together

  scheduleSettings.appendChild(scheduleTitle);
  scheduleSettings.appendChild(scheduleTypeGroup);
  scheduleSettings.appendChild(scheduleTimeGroup);
  scheduleSettings.appendChild(scheduleSubmit);
  return scheduleSettings;
}

function addScheduledAction(intervalId, type, t) {
  //make div
  var actionDiv = document.createElement("div");
  actionDiv.setAttribute("interval", intervalId);
  var time = t.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }); //make button

  var actionButton = document.createElement("button");
  actionButton.className = "psa-button";
  var text = type + " @ " + time;
  actionButton.textContent = text;

  actionButton.onmouseover = function () {
    actionButton.textContent = "Cancel This Action";
  };

  actionButton.onmouseleave = function () {
    actionButton.textContent = text;
  };

  actionButton.onclick = function () {
    removeAction(intervalId);
  };

  actionDiv.appendChild(actionButton);
  document.getElementById("schedule-submit").parentNode.insertBefore(actionDiv, document.getElementById("schedule-submit").nextSibling);

  if (!document.getElementById("action-message")) {
    var actionsMessage = document.createElement("div");
    actionsMessage.classList.add("psa-form");
    actionsMessage.id = "action-message";
    actionsMessage.textContent = "ℹ️ Actions use current tool settings.";
    actionDiv.parentNode.insertBefore(actionsMessage, actionDiv.nextSibling);
  }
}

function removeAction(intervalId) {
  clearInterval(intervalId);
  var element = document.querySelector('[interval="' + intervalId + '"]');
  element.remove(); //if there's no more intervals, take out the "settings message"

  if (!document.querySelector('[interval]')) {
    document.getElementById("action-message").remove();
  }
}

function offerCallback() {
  if (document.getElementById("offerSettings")) {
    if (document.getElementById("offerSettings").style.display == "none") {
      document.getElementById("offer-button").textContent = "Close ✘";
      document.getElementById("offerSettings").style.display = "block";
    } else {
      document.getElementById("offer-button").textContent = "Offer To Likers";
      document.getElementById("offerSettings").style.display = "none";
    }
  } else {
    var offerButton = document.getElementById("offer-button");
    offerButton.textContent = "Close ✘";
    var offerSettings = createOfferSettings();
    offerButton.parentNode.insertBefore(offerSettings, offerButton.nextSibling);
  }
}

var discountOption = 0.1; //10%

var freeShipping = false; //%5.99 shipping

function createOfferSettings() {
  //Discount buttons
  var discountTitle = document.createElement("p");
  discountTitle.className = "psa-p";
  discountTitle.textContent = "Offer Discount";
  var tenPercentButton = document.createElement("button");
  tenPercentButton.innerText = "10%";
  tenPercentButton.id = "ten-percent-button";
  tenPercentButton.style.border = "5px solid #e684df";
  tenPercentButton.className = "psa-button-inline-third";

  tenPercentButton.onclick = function () {
    discountOption = 0.1; //Style button

    tenPercentButton.style.border = "5px solid #e684df"; //remove styles from other buttons

    twentyPercentButton.style.border = "0px";
    thirtyPercentButton.style.border = "0px";
    customPercentage.checked = false;
  };

  var twentyPercentButton = document.createElement("button");
  twentyPercentButton.innerText = "20%";
  twentyPercentButton.id = "twenty-percent-button";
  twentyPercentButton.className = "psa-button-inline-third";

  twentyPercentButton.onclick = function () {
    discountOption = 0.2; //Style button

    twentyPercentButton.style.border = "5px solid #e684df"; //remove styles from other buttons

    tenPercentButton.style.border = "0px";
    thirtyPercentButton.style.border = "0px";
    customPercentage.checked = false;
  };

  var thirtyPercentButton = document.createElement("button");
  thirtyPercentButton.innerText = "30%";
  thirtyPercentButton.id = "thirty-percent-button";
  thirtyPercentButton.className = "psa-button-inline-third";

  thirtyPercentButton.onclick = function () {
    discountOption = 0.3; //Style button

    thirtyPercentButton.style.border = "5px solid #e684df"; //remove styles from other buttons

    tenPercentButton.style.border = "0px";
    twentyPercentButton.style.border = "0px";
    customPercentage.checked = false;
  };

  var customPercentage = document.createElement("input");
  customPercentage.type = "checkBox";
  customPercentage.id = "customPercentage";
  customPercentage.className = "psa-input";
  customPercentage.checked = false;
  customPercentage.addEventListener('input', function () {
    if (customPercentage.checked) {
      //remove styles from other buttons
      tenPercentButton.style.border = "0px";
      twentyPercentButton.style.border = "0px";
      thirtyPercentButton.style.border = "0px";
    } else {
      tenPercentButton.style.border = "5px solid #e684df";
      discountOption = 0.1;
    }
  }, false);
  var customPercentageLabel = document.createElement("label");
  customPercentageLabel.innerText = "Custom Percentage";
  customPercentageLabel.className = "psa-label";
  customPercentageLabel.setAttribute("for", "customPercentage");
  var customPercentageInput = document.createElement("input");
  customPercentageInput.id = "customPercentageInput";
  customPercentageInput.name = "customPercentage";
  customPercentageInput.placeholder = "10%";
  customPercentageInput.min = "10";
  customPercentageInput.max = "80";
  customPercentageInput.step = 1;
  customPercentageInput.type = "number";
  customPercentageInput.className = "psa-text-input-inline";
  var customPercentageDiv = document.createElement("div");
  customPercentageDiv.style.marginBottom = "10px";
  customPercentageDiv.appendChild(customPercentage);
  customPercentageDiv.appendChild(customPercentageLabel);
  customPercentageDiv.appendChild(customPercentageInput);
  var discountButtons = document.createElement("div");
  discountButtons.appendChild(discountTitle);
  discountButtons.appendChild(customPercentageDiv);
  discountButtons.appendChild(tenPercentButton);
  discountButtons.appendChild(twentyPercentButton);
  discountButtons.appendChild(thirtyPercentButton); //Shipping buttons

  var shippingTitle = document.createElement("p");
  shippingTitle.className = "psa-p";
  shippingTitle.textContent = "Shipping Discount";
  var fourNinetyNineButton = document.createElement("button");

  if (country_url == "poshmark.com") {
    fourNinetyNineButton.innerText = "$4.99";
  }

  if (country_url == "poshmark.ca") {
    fourNinetyNineButton.innerText = "C$9.99";
  }

  fourNinetyNineButton.id = "five-ninety-nine-button";
  fourNinetyNineButton.style.border = "5px solid #e684df";
  fourNinetyNineButton.className = "psa-button-inline";

  fourNinetyNineButton.onclick = function () {
    freeShipping = false; //Style button

    fourNinetyNineButton.style.border = "5px solid #e684df"; //remove styles from other buttons

    freeShippingButton.style.border = "0px";
  };

  var freeShippingButton = document.createElement("button");
  freeShippingButton.innerText = "Free Shipping";
  freeShippingButton.id = "twenty-percent-button";
  freeShippingButton.className = "psa-button-inline";

  freeShippingButton.onclick = function () {
    freeShipping = true; //Style button

    freeShippingButton.style.border = "5px solid #e684df"; //remove styles from other buttons

    fourNinetyNineButton.style.border = "0px";
  };

  var shippingButtons = document.createElement("div");
  shippingButtons.appendChild(shippingTitle);
  shippingButtons.appendChild(fourNinetyNineButton);
  shippingButtons.appendChild(freeShippingButton); //make settings div

  var offerSettings = document.createElement("div");
  offerSettings.id = "offerSettings";
  offerSettings.classList.add("psa-form");
  var offerSubmit = document.createElement("button");
  offerSubmit.id = "offer-submit";
  offerSubmit.type = "button";
  offerSubmit.innerText = "Send Offers";
  offerSubmit.className += "psa-button-pink";

  offerSubmit.onclick = function () {
    if (customPercentage.checked) {
      if (customPercentageInput.value > 99) {
        alert("The maximum percentage must be less than 99%");
      } else if (customPercentageInput.value < 10) {
        alert("The minimum percentage must be more than 10%");
      } else {
        discountOption = customPercentageInput.value / 100; // console.log(discountOption);
        //get the current settings for offer

        if (!runningOffer) {
          runningOffer = true;
          offer(discountOption, freeShipping);
        } else {
          offerSubmit.innerText = "Pausing offers...";
          runningOffer = false;
        }
      }
    } else {
      //get the current settings for offer
      if (!runningOffer) {
        runningOffer = true;
        offer(discountOption, freeShipping);
      } else {
        offerSubmit.innerText = "Pausing offers...";
        runningOffer = false;
      }
    }
  };

  offerSettings.appendChild(discountButtons);
  offerSettings.appendChild(shippingButtons);
  offerSettings.appendChild(offerSubmit);
  return offerSettings;
}

function organizeContinue() {
  runningOrganize = true;
  continuousOption = false;
  orderOption = 0;
  document.getElementById("organizer-text").innerText = "Your closet is organizing.\nDon't leave the page until finished.";
  shareItems(currentFollowers, ORGANIZE);
} // if !runningorganize && !sortable.options.disabled
//organize enabled
// if !runningOrganize && organizeEnabled
//disable organize
//runningOrganize true
// if runningOrganize
//runningOrganize false


function organizeCallback() {
  captchaRetry = 1;

  if (!runningFollowers && !runningParty && !runningEdit && !runningOffer) {
    if (!runningOrganize) {
      if (sortable) {
        if (sortable.options.disabled) {
          organizeButtonsEnable(true);
        } else {
          organizeButtonsEnable(false);
          runningOrganize = true;
          continuousOption = false;
          orderOption = 0;
          document.getElementById("organizer-button").innerText = "Starting organizing...";
          document.getElementById("organizer-button").classList.add("psa-button");
          document.getElementById("organizer-button").classList.remove("psa-button-pink");
          document.getElementById("organizer-text").innerText = "Your closet is organizing.\nDon't leave the page until finished.";
          shareItems(-1, ORGANIZE);
        }
      } else {
        organizeButtonsEnable(true);
      }
    } else {
      document.getElementById("organizer-button").innerText = "Stopping organizing...";
      document.getElementById("organizer-text").innerText = "";
      runningOrganize = false;
      updateOptions();
    }
  }
}

function organizeButtonsEnable(isEnabled) {
  // document.querySelector("[data-test=tiles_container]"); tile col-x12 col-l6 col-s8"
  var grid = null;
  var blocks = null;
  var items = null;
  var handle = null;

  if (document.querySelector("[data-test=tiles_container]")) {
    grid = document.querySelector("[data-test=tiles_container]");
    items = document.querySelectorAll(".tile,.col-x12,.col-16,.col-s8");
    blocks = document.querySelectorAll(".card");
    handle = ".tile__covershot";
  }

  if (document.querySelector("#tiles-con")) {
    grid = document.querySelector("#tiles-con");
    items = document.querySelectorAll(".col-x12,.col-16,.col-s8");
    blocks = document.querySelectorAll(".tile");
    handle = ".covershot-con";
  }

  var main_column = document.getElementsByClassName("main__column");

  if (main_column.length > 0) {
    // console.log("allocate grid");
    grid = document.querySelector(".main__column").querySelector(".m--t--1");
    items = document.querySelectorAll(".tile.col-x12,.col-16,.col-s8");
    blocks = document.querySelector(".main__column").querySelector(".m--t--1").querySelectorAll(".card"); // handle = ".img__container.img__container--square";

    handle = ".tile__covershot";
  }

  if (isEnabled) {
    if (items) {
      items.forEach(item => {
        //create to-top and to-bottom buttons
        var tt = document.createElement("div");
        tt.classList.add("top-bottom");
        tt.textContent = "Top ⇧";
        var tb = document.createElement("div");
        tb.classList.add("top-bottom");
        tb.textContent = "Bottom ⇩";
        tt.addEventListener("click", function () {
          toTop(this.parentElement);
        });
        tb.addEventListener("click", function () {
          toBottom(this.parentElement);
        });
        var el = item.querySelector(handle); // create wrapper container

        var wrapper = document.createElement('div');
        wrapper.classList.add("drag"); // insert wrapper before el in the DOM tree

        el.parentNode.insertBefore(wrapper, el); // move el into wrapper

        wrapper.appendChild(el);
        item.prepend(tt);
        item.append(tb);
        var links = item.querySelectorAll("a");
        links.forEach(link => {
          link.style.pointerEvents = "none";
          link.cursor = "default";
        });
      });
    }

    if (grid) {
      if (sortable) {
        sortable.option("disabled", false);
      } else {
        // console.log("create sortable")
        sortable = _sortablejs.default.create(grid, {
          animation: 150,
          handle: ".drag",
          ghostClass: 'drag',
          scroll: true,
          // Enable the plugin. Can be HTMLElement.
          scrollSensitivity: 100,
          // px, how near the mouse must be to an edge to start scrolling.
          scrollSpeed: 30,
          // px, speed of the scrolling
          forceFallback: true,
          sort: true
        }); // console.log(sortable);
      }
    }

    if (blocks) {
      blocks.forEach(block => {
        if (document.querySelector("#tiles-con")) {
          //create to-top and to-bottom buttons
          var tt = document.createElement("div");
          tt.classList.add("top-bottom");
          tt.textContent = "Top ⇧";
          var tb = document.createElement("div");
          tb.classList.add("top-bottom");
          tb.textContent = "Bottom ⇩";
          tt.addEventListener("click", function () {
            toTop(this.parentElement.parentElement);
          });
          tb.addEventListener("click", function () {
            toBottom(this.parentElement.parentElement);
          });
          var el = block.querySelector(handle); // create wrapper container

          var wrapper = document.createElement('div');
          wrapper.classList.add("drag"); // insert wrapper before el in the DOM tree

          el.parentNode.insertBefore(wrapper, el); // move el into wrapper

          wrapper.appendChild(el);
          block.prepend(tt);
          block.append(tb);
        }

        block.style.border = "5px solid #3d17a5";
      });
    }

    if (items && blocks && grid) {
      document.getElementById("organizer-button").innerText = "Organize Closet";
      document.getElementById("organizer-button").classList.remove("psa-button");
      document.getElementById("organizer-button").classList.add("psa-button-pink");
      document.getElementById("organizer-text").innerText = "Drag items around in your closet!\nGrab the image to move them.\n\nThen, click the 'Organize Closet' button\nwhen you're ready to save.";
    }
  } else {
    if (!sortable) {
      runningOrganize = false;
      document.getElementById("organizer-button").innerText = "Enable Organizer";
      document.getElementById("organizer-text").innerText = "";
      updateOptions(); // updateAnalytics();
    } else {
      if (items) {
        items.forEach(item => {
          var links = item.querySelectorAll("a");
          links.forEach(link => {
            link.style.pointerEvents = "auto";
            link.cursor = "auto";
          });
        });
      }

      if (grid) {
        sortable.option("disabled", true);
      }

      if (blocks) {
        blocks.forEach(block => {
          //remove the top and bottom buttons
          block.style.border = "0px";
        });
      }

      if (items && blocks && grid) {
        //remove top and bottom buttons
        var tb_buttons = document.querySelectorAll(".top-bottom");
        tb_buttons.forEach(button => {
          button.remove();
        });
      }
    }
  }
}

function toTop(item) {
  if (item.parentElement) {
    item.parentElement.prepend(item);
  }
}

function toBottom(item) {
  if (item.parentElement) {
    item.parentElement.appendChild(item);
  }
}

function post(path, params, method) {
  method = method || "post"; // Set method to post by default if not specified.
  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
} // function continueSubscription(user) {
// 	if (confirm("Are you sure you want to continue your subscription?\n\nYou will be billed on your existing billing date unless you end your subscription before that date.\n\nClick 'OK' to continue your subscription.\nClick 'Cancel' to not change anything.")) {
// 		document.getElementById('end-sub').disabled = true;
// 		document.getElementById('end-sub').textContent = "Continuing...";
//
// 		fetch(continueURL, {
// 			method: 'post',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({
// 				sub: user.stripe.subscription,
// 				uid: uid
// 			})
// 		})
// 			.then(function (response) {
// 				if (response.status == "200") {
// 					return response;
// 				} else {
// 					throw new Error('Something went wrong.');
// 				}
// 			})
// 			.then((response) => {
// 				document.getElementById('end-sub').classList.replace("btn-primary", "btn-success");
// 				document.getElementById('end-sub').textContent = "Success ✅";
// 				workerTimers.setTimeout(function () {
// 					location.reload()
// 				}, 1000)
// 			})
// 			.catch((error) => {
// 				document.getElementById('end-sub').classList.replace("btn-primary", "btn-warning");
// 				document.getElementById('end-sub').textContent = "Something went wrong 🚫";
// 				workerTimers.setTimeout(function () {
// 					document.getElementById('end-sub').disabled = false;
// 					document.getElementById('end-sub').textContent = "Continue Subscription";
// 					document.getElementById('end-sub').classList.replace("btn-warning", "btn-primary");
// 				}, 2000)
// 			});
// 	}
// }
// function endSubscription(user) {
// 	if (confirm("Are you sure you want to end your subscription?\n\nIf you do end your subscription, you will have access to the tool until the end of the billing period (or your free trial).\n\nClick 'OK' to end your subscription.\nClick 'Cancel' to not change anything.")) {
// 		document.getElementById('end-sub').disabled = true;
// 		document.getElementById('end-sub').textContent = "Ending...";
//
// 		fetch(endURL, {
// 			method: 'post',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({
// 				sub: user.stripe.subscription,
// 				uid: uid,
// 				email: email
// 			})
// 		})
// 			.then(function (response) {
// 				if (response.status == "200") {
// 					return response;
// 				} else {
// 					throw new Error('Something went wrong.');
// 				}
// 			})
// 			.then((response) => {
// 				document.getElementById('end-sub').classList.replace("btn-primary", "btn-success");
// 				document.getElementById('end-sub').textContent = "Success ✅";
// 				workerTimers.setTimeout(function () {
// 					location.reload()
// 				}, 1000)
// 			})
// 			.catch((error) => {
// 				document.getElementById('end-sub').classList.replace("btn-primary", "btn-warning");
// 				document.getElementById('end-sub').textContent = "Something went wrong 🚫";
// 				workerTimers.setTimeout(function () {
// 					document.getElementById('end-sub').disabled = false;
// 					document.getElementById('end-sub').textContent = "End Subscription";
// 					document.getElementById('end-sub').classList.replace("btn-warning", "btn-primary");
// 				}, 2000)
// 			});
// 	}
// }
// function initAuthTab() {
// 	if (document.getElementById("login-tab")) {
// 		//if the login tab exists, clear it out.
// 		document.getElementById("login-tab").parentNode.removeChild(document.getElementById("login-tab"));
// 	}
//
// 	var appBody = document.getElementById("appBody");
// 	//setup authentication tab
// 	var loginTab = document.createElement("div");
// 	loginTab.id = "login-tab";
// 	loginTab.className = "tabcontent";
// 	appBody.appendChild(loginTab);
// 	loginTab.style.display = "block";
//
// 	var loginForm = document.createElement("div");
// 	loginForm.className = "psa-div";
// 	loginForm.id = "loginForm";
//
// 	var loginInfo = document.createElement("p");
// 	loginInfo.className = "psa-form";
// 	loginInfo.id = "login-info";
// 	loginInfo.innerText = "Log into Poshmark to get started!";
// 	loginTab.appendChild(loginInfo);
//
// 	// var email = document.createElement("input");
// 	// email.id = "email";
// 	// email.name = "email";
// 	// email.placeholder = "Email";
// 	// email.type = "text";
// 	// email.className = "psa-text-input";
// 	// loginForm.appendChild(email);
// 	//
// 	// var password = document.createElement("input");
// 	// password.id = "password";
// 	// password.name = "password";
// 	// password.placeholder = "Password";
// 	// password.type = "password";
// 	// password.className = "psa-text-input";
// 	// loginForm.appendChild(password);
//
// 	// var signInSignUp = document.createElement("div");
// 	// signInSignUp.id = "sign-in-sign-up";
// 	// signInSignUp.className = "psa-button-div";
// 	//
// 	// var forgotEndSub = document.createElement("div");
// 	// forgotEndSub.id = "forgot-end-sub";
// 	// forgotEndSub.className = "psa-button-div";
//
// 	// var loginButton = document.createElement("button");
// 	// loginButton.id = "sign-in";
// 	// loginButton.innerText = "Sign In";
// 	// signInSignUp.appendChild(loginButton);
// 	// loginButton.className += "psa-button-inline";
// 	//
// 	// var signUpButton = document.createElement("button");
// 	// signUpButton.id = "sign-up";
// 	// signUpButton.innerText = "Sign Up";
// 	// signInSignUp.appendChild(signUpButton);
// 	// signUpButton.className += "psa-button-pink-inline";
// 	//
// 	// loginForm.appendChild(signInSignUp);
// 	// loginTab.appendChild(loginForm);
// 	//
// 	// document
// 	// 	.getElementById("sign-in")
// 	// 	.addEventListener("click", toggleSignIn, false);
// 	// document
// 	// 	.getElementById("sign-up")
// 	// 	.addEventListener("click", handleSignUp, false);
// 	//
// 	// var forgot = document.createElement("a");
// 	// forgot.id = "forgot";
// 	// forgot.innerText = "Forgot Password ↗️";
// 	// forgot.className += "psa-button";
// 	// forgot.href = "https://closet.tools/reset-password";
// 	// forgot.target = "_blank";
// 	// forgot.style.display = "block";
// 	// forgotEndSub.appendChild(forgot);
// 	// loginTab.appendChild(forgotEndSub);
//
// 	// Get the input field
// 	// var singInKey = document.getElementById("password");
// 	//
// 	// // Execute a function when the user releases a key on the keyboard
// 	// singInKey.addEventListener("keyup", function (event) {
// 	// 	// Cancel the default action, if needed
// 	// 	event.preventDefault();
// 	// 	// Number 13 is the "Enter" key on the keyboard
// 	// 	if (event.keyCode === 13) {
// 	// 		// Trigger the button element with a click
// 	// 		document.getElementById("sign-in").click();
// 	// 	}
// 	// });
//
// }


function initSharingTab() {
  if (document.getElementById("sharing")) {
    //if the login tab exists, clear it out.
    document.getElementById("sharing").parentNode.removeChild(document.getElementById("sharing"));
  } // console.log("initSharingTab()")


  var appBody = document.getElementById("appBody"); // set up sharing tab

  var sharingTab = document.createElement("div");
  sharingTab.id = "sharing";
  sharingTab.className = "tabcontent";
  appBody.appendChild(sharingTab);
  sharingTab.style.display = "block"; // if (!user_closet_id) {
  // 	//logged out warning
  // 	var loggedOut = document.createElement("div");
  // 	loggedOut.classList.add("psa-form-card-pink");
  // 	loggedOut.textContent = "⚠️ You're not logged into Poshmark";
  // 	document.getElementById("sharing").prepend(loggedOut);
  // } else {
  // 	document.getElementById("sharing").innerText = "Welcome, " + user_closet_id + "! 👋";
  // 	document.getElementById("sharing").style.color = "white";
  // 	document.getElementById("sharing").style.textAlign = "center"
  // }
  //select items

  var selectButtons = document.createElement("div");
  selectButtons.id = "select-buttons";
  selectButtons.className = "psa-button-div";
  selectButtons.style.display = "block";
  sharingTab.appendChild(selectButtons);
  var selectTitle = document.createElement("p");
  selectTitle.className = "psa-t";
  selectTitle.innerText = "Selection";
  selectButtons.appendChild(selectTitle);
  var selectItemsButton = document.createElement("button");
  selectItemsButton.innerText = "Select Items";
  selectItemsButton.className = "psa-button";
  selectItemsButton.id = "select-items-button";
  selectButtons.appendChild(selectItemsButton);
  document.getElementById("select-items-button").addEventListener("click", selectItemsCallback, false);
  var selectAllItems = document.createElement("input");
  selectAllItems.type = "checkBox";
  selectAllItems.id = "selectAllItems";
  selectAllItems.className = "psa-input";
  selectAllItems.checked = false;
  selectAllItems.addEventListener('input', function () {
    if (selectAllItems.checked) {
      //select all items
      document.getElementById("selectAllItemsLabel").innerText = "Deselect All Items";
      selectAllCallback(true);
    } else {
      //deselect all items
      document.getElementById("selectAllItemsLabel").innerText = "Select All Items";
      selectAllCallback(false);
    }
  }, false);
  var selectAllItemsLabel = document.createElement("label");
  selectAllItemsLabel.innerText = "Select All Items";
  selectAllItemsLabel.id = "selectAllItemsLabel";
  selectAllItemsLabel.className = "psa-label";
  selectAllItemsLabel.setAttribute("for", "selectAllItems");
  var selectAll = document.createElement("div");
  selectAll.id = "selectAll";
  selectAll.style.textAlign = "center";
  selectAll.appendChild(selectAllItems);
  selectAll.appendChild(selectAllItemsLabel);
  sharingTab.appendChild(selectAll);
  var selectItemsMessage = document.createElement("p");
  selectItemsMessage.className = "psa-form";
  selectItemsMessage.id = "selectMessage";
  selectItemsMessage.textContent = "⚠️ No items selected";
  sharingTab.appendChild(selectItemsMessage); // hide the select buttons and reveal later if the select mode is enabled

  selectButtons.style.display = "none";
  selectItemsMessage.style.display = "none";
  selectAll.style.display = "none"; // sharing buttons

  var sharingButtons = document.createElement("div");
  sharingButtons.id = "sharing-buttons";
  sharingButtons.className = "psa-button-div";
  sharingTab.appendChild(sharingButtons);
  var sharingTitle = document.createElement("p");
  sharingTitle.className = "psa-t";
  sharingTitle.innerText = "Sharing";
  console.log(sharingTitle);
  var followersButton = document.createElement("button");
  followersButton.innerText = "Share To Followers";
  followersButton.className = "psa-button";
  followersButton.id = "followers-button";
  var partyButton = document.createElement("button");
  partyButton.innerText = "Share To Party";
  partyButton.id = "party-button";
  partyButton.className = "psa-button";
  sharingButtons.appendChild(sharingTitle);
  sharingButtons.appendChild(followersButton);
  document.getElementById("followers-button").addEventListener("click", function () {
    followersCallback();

    if (runningFollowers) {} else {}
  }, false);
  sharingButtons.appendChild(partyButton);
  document.getElementById("party-button").addEventListener("click", function () {
    partyCallback();

    if (runningParty) {} else {}
  }, false);
  var followButtons = document.createElement("div");
  followButtons.id = "follow-buttons";
  followButtons.className = "psa-button-div";
  sharingTab.appendChild(followButtons);
  var followingTitle = document.createElement("p");
  followingTitle.className = "psa-t";
  followingTitle.innerText = "Following";
  var followPeopleButton = document.createElement("button");
  followPeopleButton.innerText = "Follow Closets";
  followPeopleButton.id = "follow-people-button";
  followPeopleButton.className = "psa-button-inline";
  var unfollowPeopleButton = document.createElement("button");
  unfollowPeopleButton.innerText = "Unfollow Closets";
  unfollowPeopleButton.id = "unfollow-people-button";
  unfollowPeopleButton.className = "psa-button-inline";
  followButtons.appendChild(followingTitle);
  followButtons.appendChild(followPeopleButton);
  followButtons.appendChild(unfollowPeopleButton);
  document.getElementById("follow-people-button").addEventListener("click", function () {
    followCallback();

    if (runningFollowPeople) {} else {}
  }, false);
  document.getElementById("unfollow-people-button").addEventListener("click", function () {
    unfollowCallback();

    if (runningUnfollowPeople) {} else {}
  }, false); //Analytics

  var sharesLeft = document.createElement("p");
  sharesLeft.className = "psa-p shares-left";
  sharesLeft.id = "shares-left";
  var followsLeft = document.createElement("p");
  followsLeft.className = "psa-p follows-left";
  followsLeft.id = "follows-left";
  var analyticsTitle = document.createElement("p");
  analyticsTitle.className = "psa-t";
  analyticsTitle.innerText = "Analytics";
  var analyticsForm = document.createElement("form");
  analyticsForm.className = "psa-form"; //Add analytics
  // analyticsForm.appendChild(analyticsTitle);

  analyticsForm.appendChild(sharesLeft);
  analyticsForm.appendChild(followsLeft);
  sharingTab.appendChild(analyticsForm); //Speed

  var speedTitle = document.createElement("p");
  speedTitle.className = "psa-t";
  speedTitle.innerText = "Speed";
  var shareSpeed = document.createElement("form");
  shareSpeed.className = "psa-form";
  var speedOptions = document.createElement("div");
  speedOptions.className = "psa-p";
  var customSpeed = document.createElement("input");
  var speed0 = document.createElement("input");
  var speed1 = document.createElement("input");
  var speed2 = document.createElement("input");
  var speed3 = document.createElement("input");
  var customSpeedLabel = document.createElement("label");
  var speedLabel0 = document.createElement("label");
  var speedLabel1 = document.createElement("label");
  var speedLabel2 = document.createElement("label");
  var speedLabel3 = document.createElement("label");
  customSpeed.type = "radio";
  customSpeed.id = "custom_speed";
  customSpeed.value = "10";
  customSpeed.name = "speed";
  customSpeed.className = "psa-input";
  customSpeedLabel.innerText = "Custom";
  customSpeedLabel.className = "psa-label";
  customSpeedLabel.setAttribute("for", "custom_speed");
  speedOptions.appendChild(customSpeed);
  speedOptions.appendChild(customSpeedLabel);
  speed0.type = "radio";
  speed0.id = "super_slow";
  speed0.value = "5";
  speed0.name = "speed";
  speed0.className = "psa-input";
  speedLabel0.innerText = "Sloth";
  speedLabel0.className = "psa-label";
  speedLabel0.setAttribute("for", "super_slow");
  speedOptions.appendChild(speed0);
  speedOptions.appendChild(speedLabel0);
  speed1.type = "radio";
  speed1.id = "slow";
  speed1.value = "2";
  speed1.name = "speed";
  speed1.className = "psa-input";
  speedLabel1.innerText = "Slow";
  speedLabel1.className = "psa-label";
  speedLabel1.setAttribute("for", "slow");
  speedOptions.appendChild(speed1);
  speedOptions.appendChild(speedLabel1);
  var speed_break = document.createElement("br");
  speedOptions.appendChild(speed_break);
  speed2.type = "radio";
  speed2.id = "medium";
  speed2.value = "1.25";
  speed2.name = "speed";
  speed2.className = "psa-input";
  speed2.checked = true;
  speedLabel2.innerText = "Medium";
  speedLabel2.className = "psa-label";
  speedLabel2.setAttribute("for", "medium");
  speedOptions.appendChild(speed2);
  speedOptions.appendChild(speedLabel2);
  speed3.type = "radio";
  speed3.id = "fast";
  speed3.value = "0.5";
  speed3.name = "speed";
  speed3.className = "psa-input";
  speedLabel3.innerText = "Fast";
  speedLabel3.className = "psa-label";
  speedLabel3.setAttribute("for", "fast");
  speedOptions.appendChild(speed3);
  speedOptions.appendChild(speedLabel3); //Misc

  var miscForm = document.createElement("form");
  miscForm.className = "psa-form";
  var miscOptions = document.createElement("div");
  miscOptions.className = "psa-p";
  var continuousCheck = document.createElement("input");
  var continuousLabel = document.createElement("label");
  continuousCheck.type = "checkBox";
  continuousCheck.id = "continuous";
  continuousCheck.className = "psa-input";
  continuousCheck.checked = true;
  continuousLabel.innerText = "Continuous";
  continuousLabel.className = "psa-label";
  continuousLabel.setAttribute("for", "continuous");
  miscOptions.appendChild(continuousCheck);
  miscOptions.appendChild(continuousLabel);
  var alarmCheck = document.createElement("input");
  var alarmLabel = document.createElement("label");
  alarmCheck.type = "checkBox";
  alarmCheck.id = "alarm";
  alarmCheck.className = "psa-input";
  alarmCheck.checked = true;
  alarmLabel.innerText = "Captcha Alarm";
  alarmLabel.className = "psa-label";
  alarmLabel.setAttribute("for", "alarm");
  miscOptions.appendChild(alarmCheck);
  miscOptions.appendChild(alarmLabel);
  var misc_break = document.createElement("br");
  miscOptions.appendChild(misc_break);
  var selectItems = document.createElement("input");
  var selectItemsLabel = document.createElement("label");
  selectItems.type = "checkBox";
  selectItems.id = "selectItems";
  selectItems.className = "psa-input";
  selectItemsLabel.innerText = "Select Items";
  selectItemsLabel.className = "psa-label";
  selectItemsLabel.id = "selectItemsLabel";
  selectItemsLabel.setAttribute("for", "selectItems");
  miscOptions.appendChild(selectItems);
  miscOptions.appendChild(selectItemsLabel);
  var misc_break = document.createElement("br");
  miscOptions.appendChild(misc_break);
  var bgSharing = document.createElement("input");
  var bgSharingLabel = document.createElement("label");
  bgSharing.type = "checkBox";
  bgSharing.id = "bgSharing";
  bgSharing.className = "psa-input";
  bgSharingLabel.innerText = "Background Sharing (Followers)";
  bgSharingLabel.className = "psa-label";
  bgSharingLabel.id = "bgSharingLabel";
  bgSharingLabel.setAttribute("for", "bgSharing");
  miscOptions.appendChild(bgSharing);
  miscOptions.appendChild(bgSharingLabel); // var orderTitle = document.createElement("p");
  // orderTitle.className = "psa-t";
  // orderTitle.innerText = "Order";
  // sharingTab.appendChild(orderTitle);

  var orderForm = document.createElement("form");
  orderForm.className = "psa-form";
  var orderOptions = document.createElement("div");
  orderOptions.className = "psa-p";
  var bottomUp = document.createElement("input");
  var topDown = document.createElement("input");
  var randomOrder = document.createElement("input");
  var bottomUpLabel = document.createElement("label");
  var topDownLabel = document.createElement("label");
  var randomLabel = document.createElement("label");
  bottomUp.type = "radio";
  bottomUp.id = "bottomUp";
  bottomUp.value = "0";
  bottomUp.name = "order";
  bottomUp.className = "psa-input";
  bottomUp.checked = true;
  bottomUpLabel.innerText = "Bottom Up";
  bottomUpLabel.className = "psa-label";
  bottomUpLabel.setAttribute("for", "bottomUp");
  orderOptions.appendChild(bottomUp);
  orderOptions.appendChild(bottomUpLabel);
  topDown.type = "radio";
  topDown.id = "topDown";
  topDown.value = "1";
  topDown.name = "order";
  topDown.className = "psa-input";
  topDownLabel.innerText = "Top Down";
  topDownLabel.className = "psa-label";
  topDownLabel.setAttribute("for", "topDown");
  orderOptions.appendChild(topDown);
  orderOptions.appendChild(topDownLabel);
  var order_break = document.createElement("br");
  orderOptions.appendChild(order_break);
  randomOrder.type = "radio";
  randomOrder.id = "randomOrder";
  randomOrder.value = "2";
  randomOrder.name = "order";
  randomOrder.className = "psa-input";
  randomLabel.innerText = "Random";
  randomLabel.className = "psa-label";
  randomLabel.setAttribute("for", "randomOrder");
  orderOptions.appendChild(randomOrder);
  orderOptions.appendChild(randomLabel);
  var miscTitle = document.createElement("p");
  miscTitle.className = "psa-t";
  miscTitle.innerText = "Other Options"; //add speed options
  // shareSpeed.appendChild(speedTitle);

  shareSpeed.appendChild(speedOptions);
  sharingTab.appendChild(shareSpeed); //add order options
  // orderForm.appendChild(orderTitle);

  orderForm.appendChild(orderOptions);
  sharingTab.appendChild(orderForm); //add misc options
  // miscForm.appendChild(miscTitle);

  miscForm.appendChild(miscOptions);
  sharingTab.appendChild(miscForm);
}

function initActionsTab() {
  if (document.getElementById("actions")) {
    //if the login tab exists, clear it out.
    document.getElementById("actions").parentNode.removeChild(document.getElementById("actions"));
  }

  var appBody = document.getElementById("appBody");
  var actionsTab = document.createElement("div");
  actionsTab.id = "actions";
  actionsTab.className = "tabcontent";
  appBody.appendChild(actionsTab); // if (!user_closet_id) {
  // 	//logged out warning
  // 	var loggedOut = document.createElement("div");
  // 	loggedOut.classList.add("psa-form-card-pink");
  // 	loggedOut.textContent = "⚠️ You're not logged into Poshmark";
  // 	document.getElementById("actions").prepend(loggedOut);
  // } else {
  // 	document.getElementById("actions").innerText = "Welcome, " + user_closet_id + "! 👋";
  // 	document.getElementById("actions").style.color = "white";
  // 	document.getElementById("actions").style.textAlign = "center"
  // }

  var actionsTitle = document.createElement("p");
  actionsTitle.className = "psa-t";
  actionsTitle.innerText = "Special Functions";
  actionsTab.appendChild(actionsTitle);

  if (!is_closet) {
    var notCloset = document.createElement("div");
    notCloset.classList.add("psa-form");
    notCloset.textContent = "ℹ️ Closet only actions disabled here.";
    actionsTab.appendChild(notCloset);
  }

  var editShare = document.createElement("button");
  editShare.innerText = "Edit + Share Items";
  editShare.id = "edit-button";
  editShare.className = "psa-button";
  actionsTab.appendChild(editShare);
  document.getElementById("edit-button").addEventListener("click", function () {
    editCallback();
  }, false);

  if (current_market != "All") {
    editShare.disabled = true;
  }

  if (!is_closet) {
    editShare.disabled = true;
  }

  var offerButton = document.createElement("button");
  offerButton.innerText = "Offer To Likers";
  offerButton.id = "offer-button";
  offerButton.className = "psa-button";
  actionsTab.appendChild(offerButton);
  document.getElementById("offer-button").addEventListener("click", function () {
    offerCallback();
  }, false);

  if (!is_closet) {
    offerButton.disabled = true;
  }

  var organizeButton = document.createElement("button");
  organizeButton.innerText = "Enable Organizer";
  organizeButton.id = "organizer-button";
  organizeButton.className = "psa-button";
  actionsTab.appendChild(organizeButton);
  document.getElementById("organizer-button").addEventListener("click", function () {
    organizeCallback();
  }, false);

  if (!is_closet) {
    organizeButton.disabled = true;
  }

  var scheduleButton = document.createElement("button");
  scheduleButton.innerText = "Schedule Action";
  scheduleButton.id = "schedule-button";
  scheduleButton.className = "psa-button";
  actionsTab.appendChild(scheduleButton);
  document.getElementById("schedule-button").addEventListener("click", function () {
    scheduleCallback();
  }, false);
  var autoScroll = document.createElement("button");
  autoScroll.innerText = "Auto Scroll Page";
  autoScroll.id = "scroll-button";
  autoScroll.className = "psa-button";
  actionsTab.appendChild(autoScroll);
  document.getElementById("scroll-button").addEventListener("click", function () {
    if (scrolling == false) {
      scrolling = true;
      scrollToLoad();
    } else {
      scrolling = false;
      scrollToLoad();
    }
  }, false);
  var organizeText = document.createElement("p");
  organizeText.className = "psa-p";
  organizeText.id = "organizer-text";
  organizeText.innerText = "";
  actionsTab.appendChild(organizeText);

  if (current_market != "All") {
    organizeText.innerText = "Edit + Share is disabled in\nmarkets other than 'All'.";
  }
}

function initSettingsTab() {
  if (document.getElementById("settings")) {
    //if the login tab exists, clear it out.
    document.getElementById("settings").parentNode.removeChild(document.getElementById("settings"));
  }

  var appBody = document.getElementById("appBody");
  var settingsTab = document.createElement("div");
  settingsTab.id = "settings";
  settingsTab.className = "tabcontent";
  appBody.appendChild(settingsTab); // if (!user_closet_id) {
  // 	//logged out warning
  // 	var loggedOut = document.createElement("div");
  // 	loggedOut.classList.add("psa-form-card-pink");
  // 	loggedOut.textContent = "⚠️ You're not logged into Poshmark";
  // 	document.getElementById("settings").prepend(loggedOut);
  // } else {
  // 	document.getElementById("settings").innerText = "Welcome, " + user_closet_id + "! 👋";
  // 	document.getElementById("settings").style.color = "white";
  // 	document.getElementById("settings").style.textAlign = "center"
  // }

  var availableSetting = document.createElement("form");
  availableSetting.className = "psa-form";
  var filterSetting = document.createElement("form");
  filterSetting.className = "psa-form";
  var scrollSetting = document.createElement("form");
  scrollSetting.className = "psa-form";
  var captchaSetting = document.createElement("form");
  captchaSetting.className = "psa-form";
  var shareLimitSetting = document.createElement("form");
  shareLimitSetting.className = "psa-form";
  var customSpeedSetting = document.createElement("form");
  customSpeedSetting.className = "psa-form";
  var continuousDelayForm = document.createElement("form");
  continuousDelayForm.className = "psa-form";
  var continuousLimitForm = document.createElement("form");
  continuousLimitForm.className = "psa-form";
  var other_title = document.createElement("p");
  other_title.className = "psa-t";
  other_title.innerText = "Options";
  settingsTab.appendChild(other_title);
  var availableCheck = document.createElement("input");
  var availableLabel = document.createElement("label");
  availableCheck.type = "checkBox";
  availableCheck.id = "available";
  availableCheck.className = "psa-input";
  availableCheck.checked = true;
  availableLabel.innerText = "Available Items Only";
  availableLabel.className = "psa-label";
  availableLabel.setAttribute("for", "available");
  var filterItemsCheck = document.createElement("input");
  var filterItemsLabel = document.createElement("label");
  filterItemsCheck.type = "checkBox";
  filterItemsCheck.id = "filterItems";
  filterItemsCheck.className = "psa-input";
  filterItemsCheck.checked = true;
  filterItemsLabel.innerText = "Filter Items";
  filterItemsLabel.className = "psa-label";
  filterItemsLabel.id = "selectItemsLabel";
  filterItemsLabel.setAttribute("for", "filterItems");
  var filterItemsTextFiled = document.createElement("input");
  filterItemsTextFiled.id = "filterItemsInput";
  filterItemsTextFiled.placeholder = "Enter filter word";
  filterItemsTextFiled.type = "text";
  filterItemsTextFiled.className = "psa-text-input";
  filterItemsTextFiled.value = filterInput;
  filterItemsTextFiled.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      filterInput = document.getElementById("filterItemsInput").value;
      updateOptions();
    }, 200);
  }, false); // hide the filter input and reveal later if the filter mode is enabled

  filterItemsTextFiled.style.display = "none"; // var filteredCheck = document.createElement("input");
  // var filteredLabel = document.createElement("label");
  // filteredCheck.type = "checkBox";
  // filteredCheck.id = "filtered";
  // filteredCheck.className = "psa-input";
  // filteredCheck.checked = true;
  // filteredLabel.innerText = "Filtered Items Only";
  // filteredLabel.className = "psa-label";
  // filteredLabel.setAttribute("for", "filtered");
  //
  // availableSetting.appendChild(filteredCheck);
  // availableSetting.appendChild(filteredLabel);
  //
  // if (document.getElementById("filtered").checked) {
  // 	var filter = document.createElement("input");
  // 	filter.id = "filter";
  // 	filter.name = "filter";
  // 	filter.placeholder = "Enter filter word";
  // 	filter.type = "text";
  // 	filter.className = "psa-text-input";
  // 	filter.addEventListener('input', function () {
  // 		workerTimers.setTimeout(function () {
  // 			updateOptions();
  // 		}, 200);
  // 	}, false);
  // 	availableSetting.appendChild(filter);
  // }

  var scrollClosetCheck = document.createElement("input");
  var scrollClosetLabel = document.createElement("label");
  scrollClosetCheck.type = "checkBox";
  scrollClosetCheck.id = "scrollCloset";
  scrollClosetCheck.className = "psa-input";
  scrollClosetCheck.checked = true;
  scrollClosetLabel.innerText = "Automatically Scroll Your Closet";
  scrollClosetLabel.className = "psa-label";
  scrollClosetLabel.setAttribute("for", "scrollCloset");
  var scrollTypes = {};
  scrollTypes = {
    nothing: 'Do Nothing',
    followers: 'Share To Followers',
    party: 'Share To Party',
    offer: 'Offer To Likers'
  };
  var scrollTypeLabel = document.createElement("label");
  scrollTypeLabel.for = "scroll-type";
  scrollTypeLabel.textContent = "After scrolling:";
  scrollTypeLabel.className = "psa-p";
  var scrollType = document.createElement("select");
  scrollType.className = "psa-select";
  scrollType.id = "scroll-type";

  for (var index in scrollTypes) {
    scrollType.options[scrollType.options.length] = new Option(scrollTypes[index], index);
  }

  scrollType.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  var scrollMessage = document.createElement("div");
  scrollMessage.classList.add("psa-form");
  scrollMessage.id = "scroll-message";
  scrollMessage.textContent = "⚠️ Configure settings before scrolling.";
  var captchaCheck = document.createElement("input");
  var captchaLabel = document.createElement("label");
  captchaCheck.type = "checkBox";
  captchaCheck.id = "captcha";
  captchaCheck.className = "psa-input";
  captchaCheck.checked = false;
  captchaLabel.innerText = "Solve Captchas";
  captchaLabel.className = "psa-label";
  captchaLabel.setAttribute("for", "captcha"); //custom speed inout

  var customSpeedLabel = document.createElement("label");
  customSpeedLabel.innerText = "Custom Speed";
  customSpeedLabel.className = "psa-label";
  var customSpeedMin = document.createElement("input");
  customSpeedMin.id = "customSpeedMin";
  customSpeedMin.name = "customSpeedMin";
  customSpeedMin.placeholder = "Min (s)";
  customSpeedMin.type = "number";
  customSpeedMin.className = "psa-text-input-inline";
  customSpeedMin.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  var customSpeedMax = document.createElement("input");
  customSpeedMax.id = "customSpeedMax";
  customSpeedMax.name = "customSpeedMax";
  customSpeedMax.placeholder = "Max (s)";
  customSpeedMax.type = "number";
  customSpeedMax.className = "psa-text-input-inline";
  customSpeedMax.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false); //custom continuouus delay

  var continuousDelayLabel = document.createElement("label");
  continuousDelayLabel.innerText = "Continuous Delay";
  continuousDelayLabel.className = "psa-label";
  var continuousMinInput = document.createElement("input");
  continuousMinInput.id = "continuousMin";
  continuousMinInput.name = "continuousMin";
  continuousMinInput.placeholder = "Min (s)";
  continuousMinInput.type = "number";
  continuousMinInput.className = "psa-text-input-inline";
  continuousMinInput.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  var continuousMaxInput = document.createElement("input");
  continuousMaxInput.id = "continuousMax";
  continuousMaxInput.name = "continuousMax";
  continuousMaxInput.placeholder = "Max (s)";
  continuousMaxInput.type = "number";
  continuousMaxInput.className = "psa-text-input-inline";
  continuousMaxInput.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false); //custom continuouus Limit

  var continuousLimitCheck = document.createElement("input");
  continuousLimitCheck.type = "checkBox";
  continuousLimitCheck.id = "continuousLimitCheck";
  continuousLimitCheck.className = "psa-input";
  continuousLimitCheck.checked = false;
  continuousLimitCheck.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  var continuousLimitLabel = document.createElement("label");
  continuousLimitLabel.innerText = "Continuous Loop Limit";
  continuousLimitLabel.className = "psa-label";
  continuousLimitLabel.setAttribute("for", "continuousLimitCheck");
  var continuousLimitInput = document.createElement("input");
  continuousLimitInput.id = "continuousLimit";
  continuousLimitInput.name = "continuousLimit";
  continuousLimitInput.placeholder = "Loops";
  continuousLimitInput.type = "number";
  continuousLimitInput.className = "psa-text-input-inline";
  continuousLimitInput.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  var shareLimitCheck = document.createElement("input");
  var shareLimitLabel = document.createElement("label");
  shareLimitCheck.type = "checkBox";
  shareLimitCheck.id = "shareLimit";
  shareLimitCheck.className = "psa-input";
  shareLimitCheck.checked = false;
  shareLimitLabel.innerText = "Daily Sharing Limit";
  shareLimitLabel.className = "psa-label";
  shareLimitLabel.setAttribute("for", "shareLimit");
  var shareLimitNum = document.createElement("input");
  shareLimitNum.id = "shareLimitNum";
  shareLimitNum.name = "shareLimitNum";
  shareLimitNum.placeholder = "Shares";
  shareLimitNum.type = "number";
  shareLimitNum.className = "psa-text-input-inline";
  shareLimitNum.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  var captcha_id = document.createElement("input");
  captcha_id.id = "captcha_id";
  captcha_id.name = "captcha_id";
  captcha_id.placeholder = "2Captcha API Key 🔑";
  captcha_id.type = "text";
  captcha_id.className = "psa-text-input";
  captcha_id.addEventListener('input', function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  availableSetting.appendChild(availableCheck);
  availableSetting.appendChild(availableLabel);
  filterSetting.appendChild(filterItemsCheck);
  filterSetting.appendChild(filterItemsLabel);
  filterSetting.appendChild(filterItemsTextFiled);
  captchaSetting.appendChild(captchaCheck);
  captchaSetting.appendChild(captchaLabel);
  captchaSetting.appendChild(captcha_id);
  customSpeedSetting.appendChild(customSpeedLabel);
  customSpeedSetting.appendChild(customSpeedMin);
  customSpeedSetting.appendChild(customSpeedMax);
  continuousDelayForm.appendChild(continuousDelayLabel);
  continuousDelayForm.appendChild(continuousMinInput);
  continuousDelayForm.appendChild(continuousMaxInput);
  shareLimitSetting.appendChild(shareLimitCheck);
  shareLimitSetting.appendChild(shareLimitLabel);
  shareLimitSetting.appendChild(shareLimitNum);
  continuousLimitForm.appendChild(continuousLimitCheck);
  continuousLimitForm.appendChild(continuousLimitLabel);
  continuousLimitForm.appendChild(continuousLimitInput);
  var scrollGroup = document.createElement("div");
  scrollGroup.appendChild(scrollTypeLabel);
  scrollGroup.appendChild(scrollType);
  scrollSetting.appendChild(scrollClosetCheck);
  scrollSetting.appendChild(scrollClosetLabel);
  scrollSetting.appendChild(scrollGroup);
  scrollSetting.appendChild(scrollMessage);
  settingsTab.appendChild(filterSetting);
  settingsTab.appendChild(availableSetting);
  settingsTab.appendChild(captchaSetting);
  settingsTab.appendChild(shareLimitSetting);
  settingsTab.appendChild(scrollSetting);
  settingsTab.appendChild(customSpeedSetting);
  settingsTab.appendChild(continuousDelayForm);
  settingsTab.appendChild(continuousLimitForm); //event listeners for settings

  document.getElementById("bottomUp").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("topDown").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("randomOrder").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("selectItems").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("bgSharing").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("custom_speed").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("super_slow").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("slow").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("medium").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("fast").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("continuous").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("alarm").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("available").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("filterItems").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("scrollCloset").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("captcha").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
  document.getElementById("shareLimit").addEventListener("click", function () {
    workerTimers.setTimeout(function () {
      updateOptions();
    }, 200);
  }, false);
} // function initAboutTab() {
// 	var appBody = document.getElementById("appBody");
//
// 	var aboutTab = document.createElement("div");
// 	aboutTab.id = "about";
// 	aboutTab.className = "tabcontent";
// 	appBody.appendChild(aboutTab);
//
// 	var logoLink = document.createElement("a");
// 	logoLink.href = "https://closet.tools";
// 	logoLink.target = "_blank";
//
// 	var logo = document.createElement("img");
// 	logo.className = "psa-img";
// 	logo.src = logoSVGURL;
//
// 	logoLink.appendChild(logo);
// 	aboutTab.appendChild(logoLink);
//
// 	var website = document.createElement("a");
// 	website.href = assistantURL;
// 	website.target = "_blank";
//
// 	var editAccount = document.createElement("a");
// 	editAccount.id = "edit-account";
// 	editAccount.innerText = "Manage Your Account ↗️";
// 	editAccount.className += "psa-button";
// 	editAccount.href = "https://closet.tools/account";
// 	editAccount.target = "_blank";
// 	aboutTab.appendChild(editAccount);
//
// 	// var a = document.createElement("button");
// 	// a.className = "psa-button";
// 	// a.innerText = "About Closet Tools";
// 	// website.appendChild(a);
// 	// aboutTab.appendChild(website);
//
// 	var documentation = document.createElement("a");
// 	documentation.href = docsURL;
// 	documentation.target = "_blank";
//
// 	var b = document.createElement("button");
// 	b.innerText = "Documentation & Troubleshooting";
// 	b.className = "psa-button";
// 	documentation.appendChild(b);
// 	aboutTab.appendChild(documentation);
//
// 	var contact = document.createElement("a");
// 	contact.href = "mailto:jordan@closet.tools";
// 	contact.target = "_blank";
//
// 	var c = document.createElement("button");
// 	c.className = "psa-button";
// 	c.innerText = "Submit a Bug or Feedback";
// 	contact.appendChild(c);
// 	aboutTab.appendChild(contact);
//
// 	var infoForm = document.createElement("div");
// 	infoForm.className = "psa-form";
//
// 	var version = document.createElement("p");
// 	version.className = "psa-p";
// 	version.innerText = "Version: " + app_version;
// 	infoForm.appendChild(version);
//
// 	var update = document.createElement("p");
// 	update.className = "psa-p";
//
// 	var love = document.createElement("p");
// 	love.className = "psa-p";
// 	love.innerText = "Made with 💜 by Closet Tools";
// 	infoForm.appendChild(love);
//
// 	aboutTab.appendChild(infoForm);
// }


function createInterface() {
  if (!document.getElementById("appBody")) {
    var appBody = document.createElement("div");
    appBody.className = "appBody";
    appBody.id = "appBody";
    appBody.style.display = "block";
    document.body.appendChild(appBody);
    var tabBox = document.createElement("div");
    tabBox.className = "tab";
    tabBox.id = "tab-box";
    appBody.appendChild(tabBox);
    user_closet_id = getCurrentUserClosetName();

    if (user_closet_id) {
      poshmark_id = getCurrentUserId(); // console.log(poshmark_id);
      // if (poshmark_id) {
      // 	var poshmark_data = getPoshmarkData();
      // 	if (poshmark_data) {
      // 		savePoshmarkData(poshmark_data);
      // 	}
      // }
    } // userScore();


    current_market = getMarket(); // console.log(user_closet_id);
    //make the minimized version of the app

    var hideApp = document.createElement("div");
    hideApp.className = "hideApp";
    hideApp.id = "hideApp";
    hideApp.style.display = "none";
    var logo = document.createElement("img");
    logo.className = "hideAppLogo";
    logo.id = "hideAppLogo";
    logo.src = 'https://closet.tools/assets/logos/logo-square-pink.png';
    hideApp.appendChild(logo);
    document.body.appendChild(hideApp);

    hideApp.onclick = function () {
      toggleApp();
    }; // var tab1 = document.createElement("button");
    // tab1.id = "loginTab";
    // tab1.className = "tablinks active";
    // tab1.innerText = "🔑";
    // tabBox.appendChild(tab1);
    // tab1.onclick = function () {
    // 	openTab("loginTab", "login-tab");
    // };


    var tab2 = document.createElement("button");
    tab2.id = "sharingTab";
    tab2.className = "tablinks active";
    tab2.innerText = "🔁";
    tabBox.appendChild(tab2);

    tab2.onclick = function () {
      if (!audioPlayed) {
        audio.play();
        captcha_success.play();
        captcha_failed.play();
        captcha_waiting.play();
        audioPlayed = true;
      }

      openTab("sharingTab", "sharing");
    };

    var tab3 = document.createElement("button");
    tab3.id = "actionsTab";
    tab3.className = "tablinks";
    tab3.innerText = "⚡";
    tabBox.appendChild(tab3);

    tab3.onclick = function () {
      if (!audioPlayed) {
        audio.play();
        captcha_success.play();
        captcha_failed.play();
        captcha_waiting.play();
        audioPlayed = true;
      }

      openTab("actionsTab", "actions");
    };

    var tab4 = document.createElement("button");
    tab4.id = "settingsTab";
    tab4.className = "tablinks";
    tab4.innerText = "⚙️";
    tabBox.appendChild(tab4);

    tab4.onclick = function () {
      openTab("settingsTab", "settings");
    }; // var tab5 = document.createElement("button");
    // tab5.id = "aboutTab";
    // tab5.className = "tablinks";
    // tab5.innerText = "ℹ️";
    // tabBox.appendChild(tab5);
    // tab5.onclick = function () {
    // 	openTab("aboutTab", "about");
    // };
    //create auth tab
    // initAuthTab();


    initSharingTab();
    initActionsTab();
    initSettingsTab();
    openTab("sharingTab", "sharing"); // initAboutTab();

    var move = document.createElement("button");
    move.id = "appBodyMove";
    move.className = "psa-move";
    tabBox.appendChild(move);

    if (document.getElementById("appBodyMove")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById("appBodyMove").onclick = toggleApp;
    }
  }
}

function notifyCaptcha() {
  // Play a sound:
  showApp();

  if (alarmOption) {
    audio.src = "https://closet.tools/assets/sounds/alarm.mp3";
    audio.volume = 1.0;
    audio.play();
  } // Let's check if the browser supports notifications


  if (!("Notification" in window)) {} // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var rand = getRandomInt(3);

      if (rand == 0) {
        var notification = new Notification("A wild CAPTCHA appeared!");
      }

      if (rand == 1) {
        var notification = new Notification("Are you a robot?");
      }

      if (rand == 2) {
        var notification = new Notification("CAPTCHA alert!");
      }
    } // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("You've enabled notifications!");
          }
        });
      } // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function hideApp() {
  hide_app = true;
  document.getElementById("appBody").style.display = "none";
  document.getElementById("hideApp").style.display = "block";
}

function showApp() {
  hide_app = false;
  document.getElementById("appBody").style.display = "block";
  document.getElementById("hideApp").style.display = "none";
}

function toggleApp() {
  if (hide_app) {
    // the app is hidden
    //make it not hidden
    showApp(); // if (this_user) {
    // 	var userRef = firebase
    // 		.firestore()
    // 		.collection("users")
    // 		.doc(uid);
    // 	var userData = userRef.update({
    // 		"settings.auto_open": true
    // 	});
    // 	this_user.settings.auto_open = true;
    // }
  } else {
    //make it not hidden
    hideApp(); // if (this_user) {
    // 	var userRef = firebase
    // 		.firestore()
    // 		.collection("users")
    // 		.doc(uid);
    // 	var userData = userRef.update({
    // 		"settings.auto_open": false
    // 	});
    // 	this_user.settings.auto_open = false;
    // }
  }
} //random speed function


function actionInterval() {
  if (location.protocol + '//' + location.host + location.pathname == "https://" + country_url + "/feed") {
    if (document.getElementById("fast").checked) {
      speedOption = 1250;
    }
  } else {
    if (document.getElementById("fast").checked) {
      speedOption = 500;
    }

    if (document.getElementById("medium").checked) {
      speedOption = 1250;
    }
  }

  if (speedOption == 0) {
    var interval = Math.random() * (speedMax * 1000 - speedMin * 1000) + speedMin * 1000;

    if (!bgSharing) {
      return interval;
    } else {
      return interval * 2;
    }
  } else {
    if (!bgSharing) {
      return Math.random() * (speedOption + 150 - (speedOption - 150)) + (speedOption - 150);
    } else {
      return (Math.random() * (speedOption + 150 - (speedOption - 150)) + (speedOption - 150)) * 2;
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex; // While there remain elements to shuffle...

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; // And swap it with the current element.

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function isVisible(element) {
  var el = element;
  console.log(el);

  if (/body/i.test(el)) {
    return true;
  } else {
    var t1 = el.style ? el.style.visibility : getComputedStyle(el, null).visibility;
    var t2 = el.style ? el.style.display : getComputedStyle(el, null).display;

    if (t1 === "hidden" || t2 === "none") {
      return false;
    } else {
      return isVisible(el.parentNode);
    }
  }
}

function getModalButtons() {
  var buttons;
  console.log("getModalButtons()");

  if (!selectOption || selectedItems.length == 0) {
    buttons = document.querySelectorAll('.share');

    if (buttons.length == 0) {
      buttons = document.querySelectorAll('.social-action-bar__share, .share-white-large');
    }

    buttons = Array.from(buttons); //remove invisible

    buttons = buttons.filter(function (button) {
      console.log("button");
      return isVisible(button);
    });
  } else {
    buttons = [];
    var tiles = document.querySelectorAll('.select-item.selected');

    for (const tile of tiles) {
      var this_tile = document.getElementById(tile.id);

      if (isVisible(this_tile)) {
        if (document.getElementsByClassName("share").length > 0) {
          buttons.push(this_tile.querySelector(".share"));
        }

        if (document.getElementsByClassName("social-action-bar__share").length > 0) {
          buttons.push(tile.parentElement.getElementsByClassName("social-action-bar__share")[0]);
        }
      }
    }
  } //random


  if (orderOption == 2) {
    buttons = shuffle(buttons);
  } //topDown


  if (orderOption == 1) {
    buttons = buttons.reverse();
  }

  console.log("BUTTONS");
  console.log(buttons);
  return buttons;
}

function getShareButton(mode, checkedAgain) {
  var shareLink;

  if (mode == FOLLOWERS || mode == ORGANIZE) {
    shareLink = document.querySelectorAll(".pm-followers-share-link");

    if (shareLink.length == 0) {
      shareLink = document.querySelectorAll('.share-wrapper-container');

      if (shareLink.length == 0) {
        shareLink = undefined;
      } else {
        shareLink = document.querySelectorAll('.share-wrapper-container')[0];
      }
    } else {
      shareLink = document.querySelectorAll(".pm-followers-share-link")[0];
    }
  }

  if (mode == PARTY) {
    shareLink = document.querySelectorAll(".pm-party-share-link");

    if (shareLink.length == 0) {
      shareLink = document.querySelectorAll('.share-wrapper-container');

      if (shareLink.length == 0) {
        shareLink = undefined;
      } else {
        shareLink = document.querySelectorAll('.share-wrapper-container')[1];
      }
    } else {
      shareLink = document.querySelectorAll(".pm-party-share-link")[0];
    }
  } //console.log("Share link:");
  //console.log(shareLink);


  return shareLink;
}

function getCaptchaState() {
  var isCaptcha;
  var isActive;
  isCaptcha = document.getElementById("captcha-popup");

  if (isCaptcha) {
    if (isCaptcha.style.display == 'none') {
      isActive = false;
    } else {
      isActive = true;
    }
  } else {
    isCaptcha = document.getElementsByClassName("g-recaptcha"); // get element for new feed

    if (isCaptcha.length > 0) {
      isActive = true;
    } else {
      isActive = false;
    }
  }

  return isActive;
}

function getItemIds() {
  var items = [];
  var item_counter = 0;
  console.log("getItemIds()");

  if (selectedItems.length != 0) {
    items = selectedItems;
  } else {
    var tiles = document.getElementsByClassName("tile");

    if (tiles.length > 0) {
      for (var i = 0; i < tiles.length; i++) {
        if (isVisible(tiles[i])) {
          items[item_counter] = tiles[i].id;
          item_counter++;
        }
      }
    }

    var main_column = document.getElementsByClassName("main__column");

    if (main_column.length > 0) {
      var links = document.getElementsByClassName("main__column")[0].getElementsByTagName("a");

      for (var i = 0; i < links.length; i++) {
        if (isVisible(links[i])) {
          var isListing = links[i].href.indexOf("/listing/");

          if (isListing > 0) {
            var item_id = links[i].href.split('-').pop();
            items[item_counter] = item_id;
            item_counter++;
          }
        }
      }
    }
  } //convert node list to array


  items = Array.from(items); // console.log(items)
  //remove duplicates

  const uniqueItems = new Set(items);
  items = [...uniqueItems]; //remove empty items

  items = items.filter(function (e) {
    return e;
  }); //random

  if (orderOption == 2) {
    items = shuffle(items);
  } //topDown


  if (orderOption == 1) {
    items = items.reverse();
  }

  return items;
} //TODO Fail more gracefully. If there's no share buttons or no modal buttons make it more obvious or try again.
//TODO Background sharing
//TODO Google Recaptcha on the new main feed


function shareItems(currentItem, mode) {
  // console.log("shareItems()")
  var otherRunning = false;
  var itemsSharing;
  var itemIDs;
  var captchaBlocking = false; //Check if other thread is already running

  if (mode == FOLLOWERS) {
    if (!runningParty) {
      otherRunning = false;
    } else {
      otherRunning = true;
    }
  }

  if (mode == PARTY) {
    if (!runningFollowers) {
      otherRunning = false;
    } else {
      otherRunning = true;
    }
  }

  if (mode == ORGANIZE) {
    if (!runningFollowers && !runningParty) {
      otherRunning = false;
    } else {
      otherRunning = true;
    }
  }

  if (!otherRunning) {
    if (bgSharing && is_closet && mode == FOLLOWERS) {
      // console.log("1")
      itemsSharing = getItemIds();
    } else {
      // console.log("2")
      itemsSharing = getModalButtons();
    } // console.log(itemsSharing)


    if (itemsSharing.length > 0) {
      if (currentItem < 0) {
        currentItem = itemsSharing.length - 1;
      } else {
        currentItem = currentItem + 2;

        if (currentItem > itemsSharing.length - 1) {
          currentItem = itemsSharing.length - 1;
        }
      }
    } else {//no share buttons found
      //console.log("no share buttons found");
    }

    captchaBlocking = getCaptchaState();

    if (!captchaBlocking) {
      workerTimers.setTimeout(function () {
        if (shareLimitOption) {
          if (shareLimitReached) {
            if (is_closet) {// updateAnalytics();
            }

            if (confirm('Share limit has been reached.\n\nTurn off share limit and continue?\n\nClick OK to continue sharing.\nClick Cancel to stop sharing.')) {
              shareLimitOption = false;
              document.getElementById('shareLimit').checked = false;

              if (bgSharing && is_closet && mode == FOLLOWERS) {
                bgShareInit(user_closet_id, availableOption, null, currentFollowers);
              } else {
                initSharing(mode, currentItem, itemsSharing);
              }
            } else {
              //Just cancels
              if (mode == FOLLOWERS) {
                if (selectOption) {
                  if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
                } else {
                  document.getElementById('followers-button').innerText = 'Share To Followers';
                }

                runningFollowers = false;
              }

              if (mode == PARTY) {
                if (selectOption) {
                  if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
                } else {
                  document.getElementById('party-button').innerText = 'Share To Party';
                }

                runningParty = false;
              }

              if (mode == ORGANIZE) {
                document.getElementById('organizer-button').innerText = 'Enable Organizer';
                runningOrganize = false;
              }

              document.title = originalTitle;
            }
          } else {
            if (bgSharing && is_closet && mode == FOLLOWERS) {
              bgShareInit(user_closet_id, availableOption, null, currentFollowers);
            } else {
              // console.log("Init sharing");
              initSharing(mode, currentItem, itemsSharing);
            }
          }
        } else {
          if (bgSharing && is_closet && mode == FOLLOWERS) {
            // console.log("3");
            bgShareInit(user_closet_id, availableOption, null, currentFollowers);
          } else {
            // console.log("Init sharing");
            initSharing(mode, currentItem, itemsSharing);
          }
        }
      }, actionInterval());
    } else {
      if (alarmOption) {
        notifyCaptcha();
      }

      if (captchaOption) {
        if (mode == FOLLOWERS) {
          captchaFollowers = true;
        }

        if (mode == PARTY) {
          captchaParty = true;
        }

        if (mode == ORGANIZE) {
          captchaOrganize = true;
        }

        captchaState();
        workerTimers.setTimeout(function () {
          solveCaptcha();
        }, 1000);
      }

      if (mode == FOLLOWERS) {
        if (selectOption) {
          if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
        } else {
          document.getElementById('followers-button').innerText = 'Share To Followers';
        }
      }

      if (mode == PARTY) {
        if (selectOption) {
          if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
        } else {
          document.getElementById('party-button').innerText = 'Share To Party';
        }
      }

      if (mode == ORGANIZE) {
        document.getElementById('organizer-button').innerText = 'Enable Organizer';
        runningOrganize = false;
      }

      document.title = originalTitle;
    }
  }
}

function initSharing(mode, currentItem, itemsSharing) {
  //if it's the first item
  if (currentItem < 0) {
    if (continuousOption) {
      if (continuousLimitOn) {
        continuousLimitCounter++;

        if (continuousLimitCounter + 1 > continuousLimit) {
          if (confirm('Continuous loop limit has been reached.\n\nTurn off loop limit and continue?\n\nClick OK to continue sharing.\nClick Cancel to stop sharing.')) {
            continuousLimitOn = false;
            continuousLimitCounter = 0;
            document.getElementById('continuousLimitCheck').checked = false;
          } else {
            continuousLimitCounter = 0; //Just cancels

            if (mode == FOLLOWERS) {
              if (selectOption) {
                if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
              } else {
                document.getElementById('followers-button').innerText = 'Share To Followers';
              }

              runningFollowers = false;
              currentFollowers = -1;
            }

            if (mode == PARTY) {
              if (selectOption) {
                if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
              } else {
                document.getElementById('party-button').innerText = 'Share To Party';
              }

              runningParty = false;
              currentParty = -1;
            }

            if (mode == ORGANIZE) {
              document.getElementById('organizer-button').innerText = 'Enable Organizer';
              runningOrganize = false;
              currentFollowers = -1;
            }

            document.title = originalTitle;
            return;
          }
        }
      } //if it's a closet, get all of the share buttons


      if (window.location.pathname.includes('/closet/') || selectMode) {
        // add continuous delay
        // console.log("Get modal links");
        itemsSharing = getModalButtons();

        if (itemsSharing.length > 0) {
          currentItem = itemsSharing.length - 1;
          var interval = Math.random() * (continuousMax * 1000 - continuousMin * 1000) + continuousMin * 1000;

          if (!runningOrganize) {
            if (interval > 0) {
              if (mode == FOLLOWERS) {
                document.getElementById('followers-button').innerText = 'Continuous delay ' + (interval / 1000).toFixed(1) + " seconds...";
              }

              if (mode == PARTY) {
                document.getElementById('party-button').innerText = 'Continuous delay ' + (interval / 1000).toFixed(1) + " seconds...";
              }
            }
          }

          workerTimers.setTimeout(function () {
            openShareModal(mode, currentItem, itemsSharing);
          }, interval);
        }
      } else {
        //load new items
        if (mode == FOLLOWERS) {
          document.getElementById('followers-button').innerText = 'Loading New Items';
        }

        if (mode == PARTY) {
          document.getElementById('party-button').innerText = 'Loading New Items';
        }

        if (loadNewItems()) {
          var reload_items = workerTimers.setTimeout(function () {
            itemsSharing = getModalButtons();

            if (itemsSharing.length > 0) {
              currentItem = itemsSharing.length - 1;
              openShareModal(mode, currentItem, itemsSharing);
            }
          }, 5000);
        } else {
          if (mode == FOLLOWERS) {
            if (selectOption) {
              if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
            } else {
              document.getElementById('followers-button').innerText = 'Share To Followers';
            }

            runningFollowers = false;
            currentFollowers = -1;
          }

          if (mode == PARTY) {
            if (selectOption) {
              if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
            } else {
              document.getElementById('party-button').innerText = 'Share To Party';
            }

            runningParty = false;
            currentParty = -1;
          }

          if (mode == ORGANIZE) {
            document.getElementById('organizer-button').innerText = 'Enable Organizer';
            runningOrganize = false;
            currentFollowers = -1;
          }

          document.title = originalTitle;
        }
      }
    } else {
      if (mode == FOLLOWERS) {
        if (selectOption) {
          if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
        } else {
          document.getElementById('followers-button').innerText = 'Share To Followers';
        }

        runningFollowers = false;
        currentFollowers = -1;
      }

      if (mode == PARTY) {
        if (selectOption) {
          if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
        } else {
          document.getElementById('party-button').innerText = 'Share To Party';
        }

        runningParty = false;
        currentParty = -1;
      }

      if (mode == ORGANIZE) {
        document.getElementById('organizer-button').innerText = 'Enable Organizer';
        document.getElementById("organizer-text").innerText = "Done organizing.";
        runningOrganize = false;
        currentFollowers = -1;
      }

      document.title = originalTitle;
      updateOptions();
    }
  } else {
    openShareModal(mode, currentItem, itemsSharing);
  }
}

function openShareModal(mode, currentItem, itemsSharing) {
  var captchaBlocking;
  var isRunning = false; //if it's still running

  if (mode == FOLLOWERS) {
    if (runningFollowers) {
      isRunning = true;
    }
  }

  if (mode == PARTY) {
    if (runningParty) {
      isRunning = true;
    }
  }

  if (mode == ORGANIZE) {
    if (runningOrganize) {
      isRunning = true;
    }
  }

  if (isRunning) {
    captchaBlocking = getCaptchaState(); //if there's no captcha

    if (!captchaBlocking) {
      //set the button text
      if (mode == FOLLOWERS) {
        document.getElementById("followers-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Pause";
        document.title = "Sharing: " + (itemsSharing.length - currentItem) + " / " + itemsSharing.length;
      }

      if (mode == PARTY) {
        document.getElementById("party-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Pause";
        document.title = "Sharing: " + (itemsSharing.length - currentItem) + " / " + itemsSharing.length;
      }

      if (mode == ORGANIZE) {
        document.getElementById("organizer-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " (Stop)";
        document.title = "Sharing: " + (itemsSharing.length - currentItem) + " / " + itemsSharing.length;
      }

      if (availableOption) {
        var isSold = [];
        var isNotForSale = [];
        var isSoldOut = []; //if there's a sold tag, skip it.
        //TODO Better Sold Tag Verification

        var closest = itemsSharing[currentItem].closest(".tile");

        if (closest) {
          isSold = closest.getElementsByClassName("sold-tag");
          isNotForSale = closest.getElementsByClassName("not-for-sale-tag");
          isSoldOut = closest.getElementsByClassName("sold-out-tag");
        }

        if (isSold.length == 0 && isNotForSale.length == 0 && isSoldOut.length == 0) {
          if (itemsSharing.length > 0) {
            // console.log("Open modal");
            itemsSharing[currentItem].click();
            workerTimers.setTimeout(function () {
              if (isModal()) {
                shareItem(mode, currentItem, itemsSharing);
              } else {
                openShareModal(mode, currentItem, itemsSharing);
              }
            }, actionInterval());
          } else {
            if (mode == FOLLOWERS) {
              if (selectOption) {
                if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
              } else {
                document.getElementById('followers-button').innerText = 'Share To Followers';
              }

              runningFollowers = false;
              currentFollowers = currentItem;
            }

            if (mode == PARTY) {
              if (selectOption) {
                if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
              } else {
                document.getElementById('party-button').innerText = 'Share To Party';
              }

              runningParty = false;
              currentParty = currentItem;
            }

            if (mode == ORGANIZE) {
              document.getElementById('organizer-button').innerText = 'Enable Organizer';
              runningOrganize = false;
              currentFollowers = currentItem;
            }

            document.title = originalTitle;
          }
        } else {
          //skip the sold item
          if (currentItem > -1) {
            workerTimers.setTimeout(function () {
              currentItem--;

              if (isModal()) {
                shareItem(mode, currentItem, itemsSharing);
              } else {
                openShareModal(mode, currentItem, itemsSharing);
              }
            }, actionInterval());
          } else {
            initSharing(mode, currentItem, itemsSharing);
          }
        }
      } else {
        //open the modal
        if (itemsSharing.length > 0) {
          // console.log("Open the modal");
          itemsSharing[currentItem].click();
          workerTimers.setTimeout(function () {
            if (isModal()) {
              shareItem(mode, currentItem, itemsSharing);
            } else {
              openShareModal(mode, currentItem, itemsSharing);
            }
          }, actionInterval());
        } else {
          if (mode == FOLLOWERS) {
            if (selectOption) {
              if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
            } else {
              document.getElementById('followers-button').innerText = 'Share To Followers';
            }

            runningFollowers = false;
            currentFollowers = currentItem;
          }

          if (mode == PARTY) {
            if (selectOption) {
              if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
            } else {
              document.getElementById('party-button').innerText = 'Share To Party';
            }

            runningParty = false;
            currentParty = currentItem;
          }

          if (mode == ORGANIZE) {
            document.getElementById('organizer-button').innerText = 'Enable Organizer';
            runningOrganize = false;
            currentFollowers = currentItem;
          }

          document.title = originalTitle;
        }
      }
    } else {
      //there was a captcha
      if (alarmOption) {
        notifyCaptcha();
      }

      if (captchaOption) {
        if (mode == FOLLOWERS) {
          captchaFollowers = true;
        }

        if (mode == PARTY) {
          captchaParty = true;
        }

        if (mode == ORGANIZE) {
          captchaOrganize = true;
        }

        captchaState();
        workerTimers.setTimeout(function () {
          solveCaptcha();
        }, 1000);
      }

      if (mode == FOLLOWERS) {
        document.getElementById("followers-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Continue";
        runningFollowers = false;
        currentFollowers = currentItem;
      }

      if (mode == PARTY) {
        document.getElementById("party-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Continue";
        runningParty = false;
        currentParty = currentItem;
      }

      if (mode == ORGANIZE) {
        document.getElementById("organizer-button").innerText = "Enable Organizer";
        runningOrganize = false;
        currentFollowers = currentItem;
      }

      document.title = originalTitle;
    }
  } else {
    if (mode == FOLLOWERS) {
      document.getElementById("followers-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Continue";
      runningFollowers = false;
      currentFollowers = currentItem;
    }

    if (mode == PARTY) {
      document.getElementById("party-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Continue";
      runningParty = false;
      currentParty = currentItem;
    }

    if (mode == ORGANIZE) {
      document.getElementById("organizer-button").innerText = "Enable Organizer";
      runningOrganize = false;
      currentFollowers = currentItem;
    }
  }
}

function isModal() {
  if (document.getElementsByClassName("modal hide in").length > 0 || document.getElementsByClassName("share-modal").length > 0) {
    return true;
  } else {
    return false;
  }
}

var linkClicked = false;

function shareItem(mode, currentItem, itemsSharing) {
  var captchaBlocking;
  var isRunning = false;
  var shareLink; // console.log("shareItem()")
  // console.log(mode)
  // console.log(currentItem)
  // console.log(itemsSharing)
  //if it's still running

  if (mode == FOLLOWERS) {
    if (runningFollowers) {
      isRunning = true;
    }
  }

  if (mode == PARTY) {
    if (runningParty) {
      isRunning = true;
    }
  }

  if (mode == ORGANIZE) {
    if (runningOrganize) {
      isRunning = true;
    }
  }

  if (isRunning) {
    captchaBlocking = getCaptchaState(); //if there's no captcha

    if (!captchaBlocking) {
      //set the button text
      if (mode == FOLLOWERS) {
        document.getElementById("followers-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Pause";
        document.title = "Sharing: " + (itemsSharing.length - currentItem) + " / " + itemsSharing.length;
      }

      if (mode == PARTY) {
        document.getElementById("party-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Pause";
        document.title = "Sharing: " + (itemsSharing.length - currentItem) + " / " + itemsSharing.length;
      }

      if (mode == ORGANIZE) {
        document.getElementById("organizer-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " (Stop)";
        document.title = "Sharing: " + (itemsSharing.length - currentItem) + " / " + itemsSharing.length;
      }

      if (isModal()) {
        shareLink = getShareButton(mode, false);

        if (shareLink) {
          if (!linkClicked) {
            // console.log("Click the modal share link");
            shareLink.click();
            shareLink = null;
            linkClicked = true;
            workerTimers.setTimeout(function () {
              shareItem(mode, currentItem, itemsSharing);
            }, 500);
          } else {
            // console.log("Link was already clicked");
            workerTimers.setTimeout(function () {
              shareItem(mode, currentItem, itemsSharing);
            }, 500);
          }
        } else {
          // console.log("There's a modal but no share button");
          // Probably shouldn't quit here...
          if (isModal()) {
            //make sure there is a modal
            //If there's a modal, then just quit.
            if (mode == FOLLOWERS) {
              document.getElementById('followers-button').innerText = 'Share To Followers';
              runningFollowers = false;
              currentFollowers = currentItem;
            }

            if (mode == PARTY) {
              document.getElementById('party-button').innerText = 'Share To Party';
              runningParty = false;
              currentParty = currentItem;
            }

            if (mode == ORGANIZE) {
              document.getElementById('organizer-button').innerText = 'Enable Organizer';
              runningOrganize = false;
              currentFollowers = currentItem;
            }

            document.title = originalTitle;
          } else {
            //if there's no modal, then run the funciton again.
            workerTimers.setTimeout(function () {
              shareItem(mode, currentItem, itemsSharing);
            }, 1000);
          }
        }
      } else {
        //If there's no modal, continue
        // console.log("Continue");
        linkClicked = false;
        shareLink = null;
        currentItem--;
        incrementShareCounter();
        workerTimers.setTimeout(function () {
          if (shareLimitOption) {
            if (shareLimitReached) {
              if (is_closet) {// updateAnalytics();
              }

              if (confirm("Share limit has been reached.\n\nTurn off share limit and continue?\n\nClick OK to continue sharing.\nClick Cancel to stop sharing.")) {
                shareLimitOption = false;
                document.getElementById("shareLimit").checked = false;
                initSharing(mode, currentItem, itemsSharing);
              } else {
                //Just cancels
                if (mode == FOLLOWERS) {
                  if (selectOption) {
                    if (selectedItems.length > 0) document.getElementById('followers-button').innerText = 'Share Selected To Followers';else document.getElementById('followers-button').innerText = 'Share All To Followers';
                  } else {
                    document.getElementById('followers-button').innerText = 'Share To Followers';
                  }

                  runningFollowers = false;
                  currentFollowers = -1;
                }

                if (mode == PARTY) {
                  if (selectOption) {
                    if (selectedItems.length > 0) document.getElementById('party-button').innerText = 'Share Selected To Party';else document.getElementById('party-button').innerText = 'Share All To Party';
                  } else {
                    document.getElementById('party-button').innerText = 'Share To Party';
                  }

                  runningParty = false;
                  currentParty = -1;
                }

                if (mode == ORGANIZE) {
                  document.getElementById('organizer-button').innerText = 'Enable Organizer';
                  runningOrganize = false;
                  currentFollowers = -1;
                }

                document.title = originalTitle;
                return;
              }
            } else {
              initSharing(mode, currentItem, itemsSharing);
            }
          } else {
            initSharing(mode, currentItem, itemsSharing);
          }
        }, actionInterval());
      }
    } else {
      //there was a captcha
      if (alarmOption) {
        notifyCaptcha();
      }

      if (captchaOption) {
        if (mode == FOLLOWERS) {
          captchaFollowers = true;
        }

        if (mode == PARTY) {
          captchaParty = true;
        }

        if (mode == ORGANIZE) {
          captchaOrganize = true;
        }

        captchaState();
        workerTimers.setTimeout(function () {
          solveCaptcha();
        }, 1000);
      }

      if (mode == FOLLOWERS) {
        document.getElementById("followers-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Continue";
        runningFollowers = false;
        currentFollowers = currentItem;
      }

      if (mode == PARTY) {
        document.getElementById("party-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Continue";
        runningParty = false;
        currentParty = currentItem;
      }

      if (mode == ORGANIZE) {
        document.getElementById("organizer-button").innerText = "Enable Organizer";
        runningOrganize = false;
        currentFollowers = currentItem;
      }

      document.title = originalTitle;
    }
  } else {
    if (mode == FOLLOWERS) {
      document.getElementById("followers-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Continue";
      runningFollowers = false;
      currentFollowers = currentItem;
    }

    if (mode == PARTY) {
      document.getElementById("party-button").innerText = itemsSharing.length - currentItem + " / " + itemsSharing.length + " Continue";
      runningParty = false;
      currentParty = currentItem;
    }

    if (mode == ORGANIZE) {
      document.getElementById("organizer-button").innerText = "Enable Organizer";
      runningOrganize = false;
      currentFollowers = currentItem;
    }

    document.title = originalTitle;
  }
}

function getFollowButtons() {
  var buttons = document.querySelectorAll('.auth-required.btn.blue:not(.f-hide)');

  if (buttons.length == 0) {
    buttons = document.querySelectorAll('[data-et-name="follow_user"]');
  }

  return buttons;
}

function getUnfollowButtons() {
  var buttons = document.querySelectorAll('.auth-required.btn.t-btn:not(.f-hide)');

  if (buttons.length == 0) {
    buttons = document.querySelectorAll('[data-et-name="unfollow_user"]');
  }

  return buttons;
}

function followPeople() {
  if (runningFollowPeople) {
    var captchaBlocking = getCaptchaState();

    if (!captchaBlocking) {
      var buttons = getFollowButtons();

      if (buttons.length > 1) {
        document.getElementById("follow-people-button").innerText = "Stop Following";
        clickFollowPeople(buttons, 1);
      } else {
        document.getElementById("follow-people-button").innerText = "Follow Closets";
        runningFollowPeople = false;
      }
    } else {
      if (alarmOption) {
        notifyCaptcha();
      }

      if (captchaOption) {
        captchaFollowPeople = true;
        captchaState();
        workerTimers.setTimeout(function () {
          solveCaptcha();
        }, 1000);
      }

      document.getElementById("follow-people-button").innerText = "Follow Closets";
      runningFollowPeople = false; // updateAnalytics();
    }
  } else {
    document.getElementById("follow-people-button").innerText = "Follow Closets";
    runningFollowPeople = false;
  }
}

function unfollowPeople() {
  if (runningUnfollowPeople) {
    var captchaBlocking = getCaptchaState();

    if (!captchaBlocking) {
      var buttons = getUnfollowButtons();

      if (buttons.length > 1) {
        document.getElementById("unfollow-people-button").innerText = "Stop Unfollowing";
        clickUnfollowPeople(buttons, 1);
      } else {
        document.getElementById("unfollow-people-button").innerText = "Unfollow Closets";
        runningFollowPeople = false;
      }
    } else {
      if (alarmOption) {
        notifyCaptcha();
      }

      if (captchaOption) {
        captchaFollowPeople = true;
        captchaState();
        workerTimers.setTimeout(function () {
          solveCaptcha();
        }, 1000);
      }

      document.getElementById("unfollow-people-button").innerText = "Unfollow Closets";
      runningFollowPeople = false; // updateAnalytics();
    }
  } else {
    document.getElementById("unfollow-people-button").innerText = "Unfollow Closets";
    runningUnfollowPeople = false;
  }
}

function clickFollowPeople(buttons, i) {
  if (runningFollowPeople) {
    var captchaBlocking = getCaptchaState();

    if (!captchaBlocking) {
      if (i < buttons.length) {
        buttons[i].scrollIntoView({
          block: "center",
          inline: "nearest"
        });
        buttons[i].click();
        i++;
        incrementFollowCounter();
        workerTimers.setTimeout(function () {
          clickFollowPeople(buttons, i);
        }, actionInterval());
      } else {
        //load more people to follow
        window.scrollTo(0, document.body.scrollHeight);
        document.getElementById("follow-people-button").innerText = "Loading More...";
        workerTimers.setTimeout(function () {
          followPeople();
        }, 5000);
      }
    } else {
      if (alarmOption) {
        notifyCaptcha();
      }

      if (captchaOption) {
        captchaFollowPeople = true;
        captchaState();
        workerTimers.setTimeout(function () {
          solveCaptcha();
        }, 1000);
      }

      document.getElementById("follow-people-button").innerText = "Follow Closets";
      runningFollowPeople = false; // updateAnalytics();
    }
  } else {
    document.getElementById("follow-people-button").innerText = "Follow Closets";
    runningFollowPeople = false;
  }
}

function clickUnfollowPeople(buttons, i) {
  if (runningUnfollowPeople) {
    var captchaBlocking = getCaptchaState();

    if (!captchaBlocking) {
      if (i < buttons.length) {
        buttons[i].scrollIntoView({
          block: "center",
          inline: "nearest"
        });
        buttons[i].click();
        i++;
        incrementUnfollowCounter();
        workerTimers.setTimeout(function () {
          clickUnfollowPeople(buttons, i);
        }, actionInterval());
      } else {
        //load more people to follow
        window.scrollTo(0, document.body.scrollHeight);
        document.getElementById("unfollow-people-button").innerText = "Loading More...";
        workerTimers.setTimeout(function () {
          unfollowPeople();
        }, 5000);
      }
    } else {
      if (alarmOption) {
        notifyCaptcha();
      }

      if (captchaOption) {
        captchaUnfollowPeople = true;
        captchaState();
        workerTimers.setTimeout(function () {
          solveCaptcha();
        }, 1000);
      }

      document.getElementById("unfollow-people-button").innerText = "Unfollow Closets";
      runningFollowPeople = false; // updateAnalytics();
    }
  } else {
    document.getElementById("unfollow-people-button").innerText = "Unfollow Closets";
    runningFollowPeople = false;
  }
}

function organizeItems() {
  //initialize
  var items = document.getElementsByClassName("tile");
  var i = items.length - 1;
  var totalItems = items.length;
  var progress = 0;

  if (shareLimitOption) {
    if (shareLimitReached) {
      if (is_closet) {// updateAnalytics();
      }

      if (confirm("Share limit has been reached.\n\nTurn off share limit and continue?\n\nClick OK to continue sharing.\nClick Cancel to stop sharing.")) {
        shareLimitOption = false;
        document.getElementById("shareLimit").checked = false;
        bgShareItemOrganizer(items, i);
      } else {
        //Just cancels
        // TODO update the UI to show the sharing has stopped
        document.getElementById("organizer-button").innerText = "Enable Organizer";
        return;
      }
    } else {
      bgShareItemOrganizer(items, i);
    }
  } else {
    bgShareItemOrganizer(items, i);
  }
}

async function bgShareItemOrganizer(items, i) {
  var totalItems = items.length; // console.log("Sharing item: " + i);

  if (i >= 0) {
    document.getElementById("organizer-button").innerText = "Organizing..."; // console.log(items[i].id);

    const status = await bgShareFollowers(items[i].id); // console.log(status);

    if (status) {
      document.getElementById("organizer-button").innerText = "Organizing...";
      incrementShareCounter(); // update the progress bar

      progress = (totalItems - i) / totalItems * 100;
      document.getElementById("organizer-text").innerText = "Progress: " + (totalItems - i) + "/" + totalItems + " " + Math.round(progress) + "%";
      document.title = "Progress: " + (totalItems - i) + "/" + totalItems + " " + Math.round(progress) + "%";
      workerTimers.setTimeout(function () {
        i--;
        bgShareItemOrganizer(items, i);
      }, actionInterval());
    } else {
      document.getElementById("organizer-button").innerText = "Enable Organizer";
      document.getElementById("organizer-text").innerText = "There was an error.\nTry sharing a few items manually.\nSee documentation ℹ️ for more help."; //document.getElementById('captcha-popup').style.display = 'block';
      // TODO is there a way to get the captcha modal to pop up?
    }

    ;
  } else {
    // updateAnalytics();
    document.getElementById("organizer-button").innerText = "Enable Organizer";
    document.getElementById("organizer-text").innerText = "Done! Refresh the page\nto verify the changes.";
  }
}

function editShare() {
  //initialize
  var items = getItemIds();
  var i;

  if (currentEdit >= 0) {
    i = currentEdit;
  } else {
    i = items.length - 1;
  }

  var totalItems = items.length;
  var progress = items.length - i;
  current_market = getMarket();

  if (current_market == "All") {
    if (shareLimitOption) {
      if (shareLimitReached) {
        if (is_closet) {// updateAnalytics();
        }

        if (confirm("Share limit has been reached.\n\nTurn off share limit and continue?\n\nClick OK to continue sharing.\nClick Cancel to stop sharing.")) {
          shareLimitOption = false;
          document.getElementById("shareLimit").checked = false;
          workerTimers.setTimeout(function () {
            if (runningEdit) {
              editShareItems();
            } else {
              document.getElementById("edit-button").innerText = "Edit + Share (Continue)";
              document.title = "Paused edit + sharing";
            }
          }, speedOption);
        } else {
          //Just cancels
          document.getElementById("edit-button").innerText = "Edit + Share Items";
          return;
        }
      } else {
        document.getElementById("edit-button").innerText = "Edit + Sharing " + totalItems + " items...";
        workerTimers.setTimeout(function () {
          if (runningEdit) {
            editShareItems();
          } else {
            document.getElementById("edit-button").innerText = "Edit + Share (Continue)";
            document.title = "Paused edit + sharing";
          }
        }, speedOption);
      }
    } else {
      document.getElementById("edit-button").innerText = "Edit + Sharing " + totalItems + " items...";
      workerTimers.setTimeout(function () {
        if (runningEdit) {
          editShareItems();
        } else {
          document.getElementById("edit-button").innerText = "Edit + Share (Continue)";
          document.title = "Paused edit + sharing";
        }
      }, speedOption);
    }
  }

  async function editShareItems() {
    if (i >= 0) {
      currentEdit = i;
      document.getElementById("edit-button").innerText = progress + " / " + totalItems + " (Pause)";
      document.title = "Edit + sharing: " + progress + " / " + totalItems;
      const status = await bgEditShareItem(items[i]);

      if (status) {
        incrementShareCounter();
        document.getElementById("edit-button").innerText = progress + " / " + totalItems + " (Pause) ✔";
      } else {
        document.getElementById("edit-button").innerText = progress + " / " + totalItems + " (Pause) ✘";
      }

      if (shareLimitOption) {
        if (shareLimitReached) {
          if (is_closet) {// updateAnalytics();
          }

          if (confirm("Share limit has been reached.\n\nTurn off share limit and continue?\n\nClick OK to continue sharing.\nClick Cancel to stop sharing.")) {
            shareLimitOption = false;
            document.getElementById("shareLimit").checked = false;
            workerTimers.setTimeout(function () {
              if (runningEdit) {
                progress++;
                editShareItems();
              } else {
                document.getElementById("edit-button").innerText = "Edit + Share (Continue)";
                document.title = "Paused edit + sharing";
              }
            }, speedOption, i--);
          } else {
            //Just cancels
            document.getElementById("edit-button").innerText = "Edit + Share Items";
            return;
          }
        } else {
          workerTimers.setTimeout(function () {
            if (runningEdit) {
              progress++;
              editShareItems();
            } else {
              document.getElementById("edit-button").innerText = "Edit + Share (Continue)";
              document.title = "Paused edit + sharing";
            }
          }, speedOption, i--);
        }
      } else {
        workerTimers.setTimeout(function () {
          if (runningEdit) {
            progress++;
            editShareItems();
          } else {
            document.getElementById("edit-button").innerText = "Edit + Share (Continue)";
            document.title = "Paused edit + sharing";
          }
        }, speedOption, i--);
      }
    } else {
      document.getElementById("edit-button").innerText = "Edit + Share Items";
      document.title = "Done edit + sharing";
      currentEdit = -1;
      runningEdit = false; // updateAnalytics();
    }
  }
}

function offer(percentage, freeShipping) {
  //initialize
  var items = getItemIds();
  var i;

  if (currentOffer >= 0) {
    i = currentOffer;
  } else {
    i = items.length - 1;
  }

  var totalItems = items.length;
  var progress = items.length - i;
  document.getElementById("offer-submit").innerText = "Offering " + totalItems + " items to likers...";
  workerTimers.setTimeout(function () {
    if (runningOffer) {
      offerItems();
    } else {
      document.getElementById("offer-submit").innerText = "Send Offers";
      document.title = "Stopped sending offers";
    }
  }, speedOption);

  async function offerItems() {
    if (i >= 0) {
      document.getElementById("offer-submit").innerText = progress + " / " + totalItems + " (Pause)";
      document.title = "Offering: " + progress + " / " + totalItems;
      const status = await offerToLikers(items[i], percentage, freeShipping);

      if (status) {
        document.getElementById("offer-submit").innerText = progress + " / " + totalItems + " (Pause) ✔";
      } else {
        document.getElementById("offer-submit").innerText = progress + " / " + totalItems + " (Pause) ✘";
      }

      workerTimers.setTimeout(function () {
        if (runningOffer) {
          progress++;
          currentOffer = i;
          offerItems();
        } else {
          document.getElementById("offer-submit").innerText = "Send Offers (Continue)";
          document.title = "Paused sending offers";
        }
      }, speedOption, i--);
    } else {
      document.getElementById("offer-submit").innerText = "Send Offers";
      document.title = "Done sending offers";
      currentOffer = -1;
      runningOffer = false;
    }
  }
}

var scrollCounter = 0;

function scrollToLoad() {
  if (scrolling) {
    document.getElementById("scroll-button").innerText = "Stop Auto Scroll";
  } else {
    document.getElementById("scroll-button").innerText = "Auto Scroll Page";
  }

  if (scrolling) {
    var currentItems = getModalButtons();

    if (currentItems.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
      document.title = "Scrolling again.";
      var scroll_down = workerTimers.setTimeout(function () {
        if (scrolling) {
          if (!isLoadingMoreItems(currentItems)) {
            //new items are loaded
            var newItems = getModalButtons();

            if (newItems.length > currentItems.length) {
              workerTimers.setTimeout(function () {
                scrollToLoad();
              }, 1000);
            } else {
              // Auto scroll finished
              document.getElementById("scroll-button").innerText = "Auto Scroll Page";
              document.body.scrollTop = document.documentElement.scrollTop = 0;
              scrolling = false;
              document.title = "Done loading " + newItems.length + " items"; //If there's an option to do something after scrolling:

              if (scrollOption && afterScroll != "nothing" && is_closet) {
                if (afterScroll == "offer") {
                  workerTimers.setTimeout(function () {
                    runningOffer = false;

                    if (!document.getElementById("offerSettings")) {
                      var offerSettings = createOfferSettings();
                      document.getElementById("offer-button").parentNode.insertBefore(offerSettings, document.getElementById("offer-button").nextSibling);
                      document.getElementById("offerSettings").style.display = "none";
                    }

                    document.getElementById("offer-submit").click();
                  }, 1000);
                }

                if (afterScroll == "followers") {
                  workerTimers.setTimeout(function () {
                    runningFollowers = false;
                    runningParty = false;
                    followersCallback();
                  }, 1000);
                }

                if (afterScroll == "party") {
                  workerTimers.setTimeout(function () {
                    runningFollowers = false;
                    runningParty = false;
                    partyCallback();
                  }, 1000);
                }
              }
            }
          } else {
            //Wait for items to load.
            workerTimers.setTimeout(function () {
              scrollToLoad();
            }, 1000);
          }
        } else {
          document.getElementById("scroll-button").innerText = "Auto Scroll Page";
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          scrolling = false;
        }
      }, 1000);
    } else {
      workerTimers.setTimeout(function () {
        scrollToLoad();
      }, 1000);
    }
  } else {
    document.getElementById("scroll-button").innerText = "Auto Scroll Page";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
} //get current number of items
//jump to the bottom
//wait a second
//is still loading? wait a second
//Not loading? compare current number with old number
//if numnber is bigger, back to step 1
//else, we're done scrolling


function isLoadingMoreItems(currentItems) {
  var newItems = getModalButtons();
  document.title = "Loading: " + newItems.length; // console.log("check loading");
  // //old style

  if (document.getElementById("load-more")) {
    if (document.getElementById("load-more").style.display == "block") {// return true;
      // console.log("loading indicator");
    } else {// return false;
        // console.log("no indicator");
      }
  } // // new style


  if (document.getElementsByClassName("infinite__scroll").length > 0) {// return true;
    // console.log("loading indicator");
  } else {// return false;
      // console.log("no indicator");
    }

  if (newItems.length > currentItems.length) {
    // console.log("more items");
    scrollCounter = 0;
    return false;
  } else {
    // console.log("no more items");
    scrollCounter++;

    if (scrollCounter > 10) {
      //stop scrolling to load
      return false;
    } else {
      //keep waiting
      window.scrollTo(0, document.body.scrollHeight);
      return true;
    }
  }
}

async function bgShareFollowers(item_id) {
  const res = await fetch("https://" + country_url + "/listing/share?post_id=" + item_id, {
    method: 'POST' // *GET, POST, PUT, DELETE, etc.

  });
  const status = res.status; // console.log(status);

  if (status == "200") {
    incrementShareCounter();
    return true;
  } else {
    return false;
  }
}

window.bgFollowersShowCaptcha = function () {
  var itemsSharing = getModalButtons();
  itemsSharing[0].click();
  workerTimers.setTimeout(function () {
    if (isModal()) {
      var shareLink = getShareButton(FOLLOWERS, false);
      shareLink.click();
      workerTimers.setTimeout(function () {
        var captchaBlocking = getCaptchaState();

        if (captchaBlocking) {
          if (alarmOption) {
            notifyCaptcha();
          }

          captchaFollowers = true;
          captchaState();
          workerTimers.setTimeout(function () {
            solveCaptcha();
          }, 500);
        }
      }, 500);
    } else {
      openShareModal(FOLLOWERS, 0, itemsSharing);
    }
  }, 500);
};

window.bgPartyShowCaptcha = function () {
  var itemsSharing = getModalButtons();
  itemsSharing[0].click();
  workerTimers.setTimeout(function () {
    if (isModal()) {
      var shareLink = getShareButton(PARTY, false);
      shareLink.click();
      workerTimers.setTimeout(function () {
        var captchaBlocking = getCaptchaState();

        if (captchaBlocking) {
          if (alarmOption) {
            notifyCaptcha();
          }

          captchaParty = true;
          captchaState();
          workerTimers.setTimeout(function () {
            solveCaptcha();
          }, 500);
        }
      }, 500);
    } else {
      openShareModal(PARTY, currentItem, itemsSharing);
    }
  }, 500);
};

window.bgFollowingShowCaptcha = function () {};

async function bgSelfShare(item_id) {
  var proceed = false;
  const res = await fetch("https://" + country_url + "/vm-rest/users/self/shared_posts/" + item_id, {
    method: 'PUT',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({})
  }).then(response => response.json()).then(data => {
    // console.log(data);
    if (data.error) {
      // console.log(data.error.errorType); //if bot, start recovery
      if (data.error.errorType == "SuspectedBotError") {
        bgFollowersShowCaptcha();
        proceed = false;
      } //if other error, stop sharing

    } else {
      proceed = true;
    }
  }).catch(error => {
    //try again?
    // console.log(error);
    proceed = false;
  });
  return proceed;
}

async function bgShareParty(item_id, event_id) {
  const res = await fetch("https://" + country_url + "/listing/share?post_id=" + item_id + "&event_id=" + event_id, {
    method: 'POST' // *GET, POST, PUT, DELETE, etc.

  });
  const status = res.status; // console.log(status);

  if (status == "200") {
    incrementShareCounter();
    return true;
  } else {
    return false;
  }
}

async function bgEditShareItem(item_id) {
  var status;
  const res = await fetch("https://" + country_url + "/vm-rest/posts/" + item_id, {
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    referer: 'https://' + country_url + '/edit-listing/' + item_id,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(data => {
    if (data.error) {
      if (data.error.statusCode == 403) {//insuficient priveleges
      }

      status = true;
    } else {
      // console.log("Shared successfully.");
      status = true;
    }
  }).catch(error => {
    // console.error('Other error:', error);
    status = true;
  });
  return status;
}

async function bgFollowCloset(closet_id) {
  const res = await fetch("https://" + country_url + "/user/" + closet_id + "/follow_user", {
    method: 'POST' // *GET, POST, PUT, DELETE, etc.

  });
  const status = res.status; // console.log(status);

  if (status == "200") {
    return true;
  } else {
    return false;
  }
}

async function bgUnFollowCloset(closet_id) {
  const res = await fetch("https://" + country_url + "/user/" + closet_id + "/unfollow_user", {
    method: 'POST' // *GET, POST, PUT, DELETE, etc.

  });
  const status = res.status; // console.log(status);

  if (status == "200") {
    return true;
  } else {
    return false;
  }
} //https://poshmark.com/vm-rest/posts/5c70bb4f5c44525a1eea9585/likes/users/offers
// var itemPrice = await getItemPrice("5e4d8e89689ebcd01214f19").then(price => {
// 	return itemPrice = price;
// });


async function offerToLikers(item_id, percentage, freeShipping) {
  var itemPrice = await getItemPrice(item_id).then(price => {
    return itemPrice = price;
  });

  if (itemPrice) {
    var status = await offerItem(item_id, itemPrice, percentage, freeShipping);
    return status;
  } else {
    return false;
  }
}

async function getItemPrice(item_id) {
  var price = 0;
  return fetch("https://" + country_url + "/vm-rest/posts/" + item_id, {
    method: 'GET',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Server response wasn\'t OK');
    }
  }).then(data => {
    price = data.price;
    return price;
  }).catch(error => {
    price = 0;
    return price;
  });
}

async function offerItem(item_id, price, percentage, freeShipping) {
  var offer = Math.floor(price - price * percentage);
  var shipping = 2.12;
  var country = "USD";

  if (freeShipping) {
    shipping = 7.11;
  }

  if (country_url == "poshmark.ca") {
    country = "CAD";
    shipping = 3;

    if (freeShipping) {
      shipping = 12.99;
    }
  }

  const res = await fetch("https://" + country_url + "/vm-rest/posts/" + item_id + "/likes/users/offers", {
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "offer_amount": {
        "val": offer,
        "currency_code": country
      },
      "seller_shipping_discount": {
        "val": shipping,
        "currency_code": country
      },
      "offer_api_version": 3,
      "offer_shipping_discount_type": "default_discount"
    })
  });
  const status = res.status;

  if (status == "200") {
    return true;
  } else {
    return false;
  }
}

function loadNewItems() {
  if (document.querySelectorAll("[data-test=filter-dropdown-toggle]").length > 0) {
    if (document.querySelectorAll("[data-test=filter-dropdown-toggle]")[0].classList.contains("dropdown--expanded")) {
      //find the dropdown
      var el = document.getElementsByClassName("filter__dropdown-menu")[0]; //find out which one is highlighted

      var parent = el.parentElement.parentElement;
      var currentSelection = parent.querySelector(".dropdown__menu__item--selected").querySelector(".dropdown__link");
      workerTimers.setTimeout(function () {
        parent.querySelector(".dropdown__menu__item:not(.dropdown__menu__item--selected)").querySelector(".dropdown__link").click();
      }, 1000);
    } else {
      var el = null; //click the dropdown

      if (document.getElementsByClassName("filter__dropdown-menu").length > 0) {
        el = document.getElementsByClassName("filter__dropdown-menu")[0];
        el.click();
      }

      if (document.querySelectorAll("[data-test=filter-dropdown-toggle]").length > 0) {
        if (document.querySelectorAll("[data-test=filter-dropdown-toggle]")[0].getElementsByClassName("btn btn--tertiary btn--small tr--uppercase").length > 0) {
          el = document.querySelectorAll("[data-test=filter-dropdown-toggle]")[0].getElementsByClassName("btn btn--tertiary btn--small tr--uppercase")[0];
          el.click();
        }
      } //find out which one is highlighted


      if (el) {
        var parent = el.parentElement.parentElement; // var currentSelection = parent.querySelector(".dropdown__menu__item--selected").querySelector(".dropdown__link");

        workerTimers.setTimeout(function () {
          parent.querySelector(".dropdown__menu__item:not(.dropdown__menu__item--selected)").querySelector(".dropdown__link").click();
        }, 1000);
        return true;
      } else {
        return false;
      }
    }
  }

  if (document.querySelectorAll(".sort-by").length > 0) {
    if (document.querySelectorAll(".sort-by")[0].getElementsByClassName("dropdown")[0].classList.contains("dropdown--expanded")) {
      //find the dropdown
      var el = null;

      if (document.getElementsByClassName("filter__dropdown-menu").length > 0) {
        el = document.getElementsByClassName("filter__dropdown-menu")[0];
      }

      if (document.querySelectorAll(".sort-by")[0].getElementsByClassName("dropdown__selector").length > 0) {
        el = document.querySelectorAll(".sort-by")[0].getElementsByClassName("dropdown__selector")[0];
      } //find out which one is highlighted


      workerTimers.setTimeout(function () {
        document.querySelectorAll(".sort-by")[0].querySelector(".dropdown__menu__item:not(.dropdown__menu__item--selected)").querySelector(".dropdown__link").click();
      }, 1000);
    } else {
      //click the dropdown
      var el = null;

      if (document.getElementsByClassName("filter__dropdown-menu").length > 0) {
        el = document.getElementsByClassName("filter__dropdown-menu")[0];
        el.click();
      }

      if (document.querySelectorAll(".sort-by")[0].getElementsByClassName("dropdown__selector").length > 0) {
        el = document.querySelectorAll(".sort-by")[0].getElementsByClassName("dropdown__selector")[0];
        el.click();
      }

      if (document.querySelectorAll("[data-test=filter-dropdown-toggle]").length > 0) {
        if (document.querySelectorAll("[data-test=filter-dropdown-toggle]")[0].getElementsByClassName("btn btn--tertiary btn--small tr--uppercase").length > 0) {
          el = document.querySelectorAll("[data-test=filter-dropdown-toggle]")[0].getElementsByClassName("btn btn--tertiary btn--small tr--uppercase")[0];
          el.click();
        }
      } //find out which one is highlighted


      if (el) {
        workerTimers.setTimeout(function () {
          document.querySelectorAll(".sort-by")[0].querySelector(".dropdown__menu__item:not(.dropdown__menu__item--selected)").querySelector(".dropdown__link").click();
        }, 1000);
        return true;
      } else {
        return false;
      }
    }
  }

  if (document.getElementById("tiles-con")) {
    var d = new Date().getTime() / 1000;

    if (location.search.includes("?")) {
      var param = "&_=" + d;
    } else {
      var param = "?_=" + d;
    }

    fetch(window.location.href + param, {
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (items) {
      var clean = _dompurify.default.sanitize(items.html);

      document.getElementById("tiles-con").innerHTML = clean;
    });
    return true;
  }

  return false;
}

async function solveCaptcha() {
  var solved_counter = 0;
  solved = false;
  var iframe_url;
  var posh_key = "";
  var api_key = document.getElementById("captcha_id").value;

  if (document.getElementById("captcha-popup")) {
    iframe_url = new URL(document.getElementById("grecaptcha").getElementsByTagName('iframe')[0].src);
    posh_key = iframe_url.searchParams.get("k");
  }

  if (document.querySelector('[data-sitekey]')) {
    if (document.querySelector("[name=g-recaptcha-response]")) {
      posh_key = document.querySelector('[data-sitekey]').getAttribute("data-sitekey");
    } else {
      posh_key = "";
    }
  }

  if (api_key !== "" && posh_key !== "") {
    var url = "https://2captcha.com/in.php?key=" + api_key + "&header_acao=1&json=1&method=userrecaptcha&googlekey=" + posh_key + "&pageurl=" + window.location.href; // console.log(url);

    const res = await fetch(url);
    const data = await res.json(); //update the button text

    captchaState(captchaRetry);
    const req_id = data.request;
    var captcha_timer = setInterval(async () => {
      var captchaBlocking = getCaptchaState();

      if (!captchaBlocking) {
        clearInterval(captcha_timer);
        solved = true;
        workerTimers.setTimeout(function () {
          resumeAction();
        }, 2000);
      } else {
        url = "https://2captcha.com/res.php?key=" + api_key + "&header_acao=1&json=1&action=get&id=" + req_id;
        const solution = await fetch(url);
        const solution_data = await solution.json();

        if (solution_data.status) {
          if (!solved) {
            clearInterval(captcha_timer);
            var resp = solution_data.request;

            if (document.getElementById("captcha-popup")) {
              var clean = _dompurify.default.sanitize(resp);

              document.querySelector("[name=g-recaptcha-response]").innerHTML = clean;
              grecaptcha_callback(resp);
            }

            if (document.querySelector('[data-sitekey]')) {
              if (document.querySelector("[name=g-recaptcha-response]")) {
                var clean = _dompurify.default.sanitize(resp);

                document.querySelector("[name=g-recaptcha-response]").innerHTML = clean;
                validateResponse(resp);
              } else {
                captchaFailed();
              }
            }

            solved = true;

            if (alarmOption) {
              captcha_success.volume = 1.0;
              captcha_success.src = "https://closet.tools/assets/sounds/captcha-success.mp3";
              captcha_success.play();
            }

            workerTimers.setTimeout(function () {
              resumeAction();
            }, 2000);
          }
        } else {
          if (solution_data.request == "ERROR_CAPTCHA_UNSOLVABLE") {
            captchaFailed();
          }

          if (alarmOption) {
            captcha_waiting.volume = 1.0;
            captcha_waiting.src = "https://closet.tools/assets/sounds/captcha-waiting.mp3";
            captcha_waiting.play();
          }

          if (solved_counter < 60) {
            solved_counter++;
          } else {
            clearInterval(captcha_timer);
            captchaFailed();
          }
        }
      }
    }, 5000);
  } else {
    captchaFailed();
  }
}

function getServerHour() {
  var shareHour = new Date(firebase.firestore.Timestamp.now().seconds * 1000);
  shareHour.setHours(shareHour.getHours(), 0, 0);
  var syncHour = shareHour.getTime() / 1000;
  return syncHour.toString();
} // function getPastDayTotals() {
// 	//init back to 0 since we're recalculating
// 	totalShares = 0;
// 	totalFollows = 0;
// 	totalUnfollows = 0;
//
// 	var today = new Date(firebase.firestore.Timestamp.now().seconds * 1000);
// 	today.setHours(24, 0, 0, 0); //midnight tonight
// 	var yesterday = new Date();
// 	yesterday.setHours(0, 0, 0, 0); //midnight last night
// 	if (this_user) {
// 		if (this_user.analytics) {
// 			if (this_user.analytics[user_closet_id]) {
// 				Object.keys(this_user.analytics[user_closet_id].shares).forEach(function (key) {
// 					// //console.log(key, this_user.shares[key]);
// 					if (key > Math.round(yesterday.getTime() / 1000) && key < Math.round(today.getTime() / 1000)) {
// 						// var shareDate = new Date(Number(key) * 1000);
// 						totalShares += this_user.analytics[user_closet_id].shares[key];
// 					} else {
// 						// delete data that's not relevant to keep DB slim
// 						delete this_user.analytics[user_closet_id].shares[key];
// 					}
// 				});
//
// 				Object.keys(this_user.analytics[user_closet_id].follows).forEach(function (key) {
// 					// //console.log(key, this_user.follows[key]);
// 					if (key > Math.round(yesterday.getTime() / 1000) && key < Math.round(today.getTime() / 1000)) {
// 						// var shareDate = new Date(Number(key) * 1000);
// 						totalFollows += this_user.analytics[user_closet_id].follows[key];
// 					} else {
// 						// delete data that's not relevant to keep DB slim
// 						delete this_user.analytics[user_closet_id].follows[key];
// 					}
// 				});
//
// 				Object.keys(this_user.analytics[user_closet_id].unfollows).forEach(function (key) {
// 					// //console.log(key, this_user.unfollows[key]);
// 					if (key > Math.round(yesterday.getTime() / 1000) && key < Math.round(today.getTime() / 1000)) {
// 						// var shareDate = new Date(Number(key) * 1000);
// 						totalUnfollows += this_user.analytics[user_closet_id].unfollows[key];
// 					} else {
// 						// delete data that's not relevant to keep DB slim
// 						delete this_user.analytics[user_closet_id].unfollows[key];
// 					}
// 				});
// 			} else {
// 				// allocate analytics for the user.
// 				allocateUserAnalytics();
// 				//try again
// 				getPastDayTotals();
// 			}
// 		} else {
// 			// allocate analytics for the user.
// 			allocateUserAnalytics();
// 			//try again
// 			getPastDayTotals();
// 		}
// 	}
// }
// function allocateUserAnalytics() {
// 	var currentHour = getServerHour();
//
// 	if (this_user.analytics) {
// 		if (this_user.analytics[user_closet_id]) {
// 			//there should be data there
// 		} else {
// 			this_user.analytics[user_closet_id] = {
// 				shares: {
// 					[currentHour]: 0
// 				},
// 				follows: {
// 					[currentHour]: 0
// 				},
// 				unfollows: {
// 					[currentHour]: 0
// 				}
// 			}
// 		}
// 	} else {
// 		this_user.analytics = {
// 			[user_closet_id]: {
// 				shares: {
// 					[currentHour]: 0
// 				},
// 				follows: {
// 					[currentHour]: 0
// 				},
// 				unfollows: {
// 					[currentHour]: 0
// 				}
// 			}
// 		}
// 	}
//
// 	if (this_user.shares) {
// 		delete this_user.shares;
// 	}
//
// 	if (this_user.self_shares) {
// 		delete this_user.self_shares;
// 	}
// 	if (this_user.analyics) {
// 		delete this_user.analyics;
// 	}
// 	//sync up the new analytics structure
// 	syncUser();
// }
// function updateAnalytics() {
// 	var currentHour = getServerHour();
// 	if (user_closet_id) {
// 		//update user shares
// 		if (this_user.analytics[user_closet_id].total_shares) {
// 			this_user.analytics[user_closet_id].total_shares += hourly_share_counter;
// 		} else {
// 			this_user.analytics[user_closet_id].total_shares = hourly_share_counter;
// 		}
//
// 		if (this_user.analytics[user_closet_id].shares[currentHour]) {
// 			this_user.analytics[user_closet_id].shares[currentHour] += hourly_share_counter;
// 		} else {
// 			this_user.analytics[user_closet_id].shares[currentHour] = hourly_share_counter;
// 		}
//
// 		//update user follows
// 		if (this_user.analytics[user_closet_id].total_follows) {
// 			this_user.analytics[user_closet_id].total_follows += hourly_follow_counter;
// 		} else {
// 			this_user.analytics[user_closet_id].total_follows = hourly_follow_counter;
// 		}
//
// 		if (this_user.analytics[user_closet_id].follows[currentHour]) {
// 			this_user.analytics[user_closet_id].follows[currentHour] += hourly_follow_counter;
// 		} else {
// 			this_user.analytics[user_closet_id].follows[currentHour] = hourly_follow_counter;
// 		}
//
// 		//update user unfollows
// 		if (this_user.analytics[user_closet_id].total_unfollows) {
// 			this_user.analytics[user_closet_id].total_unfollows += hourly_unfollow_counter;
// 		} else {
// 			this_user.analytics[user_closet_id].total_unfollows = hourly_unfollow_counter;
// 		}
//
// 		if (this_user.analytics[user_closet_id].unfollows[currentHour]) {
// 			this_user.analytics[user_closet_id].unfollows[currentHour] += hourly_unfollow_counter;
// 		} else {
// 			this_user.analytics[user_closet_id].unfollows[currentHour] = hourly_unfollow_counter;
// 		}
//
// 		hourly_share_counter = 0;
// 		hourly_follow_counter = 0;
// 		hourly_unfollow_counter = 0;
// 		//update the total shares
// 		getPastDayTotals();
// 		//update the user data in the DB
// 		syncAnalytics();
// 	}
// }
//
// function syncAnalytics() {
// 	var userRef = firebase
// 		.firestore()
// 		.collection("users")
// 		.doc(uid);
//
// 	var userData = userRef.update({
// 		analytics: this_user.analytics
// 	});
// }
// function syncUser() {
// 	var userRef = firebase
// 		.firestore()
// 		.collection("users")
// 		.doc(uid);
//
// 	var userData = userRef.set(this_user);
// }


function incrementShareCounter() {
  hourly_share_counter++; // if (hourly_share_counter > 47) {
  // 	updateAnalytics();
  // }

  updateAnalyticsUI();
}

function incrementFollowCounter() {
  hourly_follow_counter++; // if (hourly_follow_counter > 47) {
  // 	updateAnalytics();
  // }

  updateAnalyticsUI();
}

function incrementUnfollowCounter() {
  hourly_unfollow_counter++; // if (hourly_unfollow_counter > 47) {
  // 	updateAnalytics();
  // }

  updateAnalyticsUI();
}

function updateAnalyticsUI() {
  //console.log("Update Share Gap")
  var shareGap = shareLimitNumber - totalShares - hourly_share_counter;
  var past24hrsShare = totalShares + hourly_share_counter;

  if (shareGap > 0) {
    if (shareLimitOption) {
      if (document.getElementById("shares-left")) {
        document.getElementById("shares-left").textContent = "Shares left today: " + shareGap;
      } // document.getElementById("shares-left-sharing").textContent = "Shares left today: " + shareGap;

    } else {
      if (document.getElementById("shares-left")) {
        document.getElementById("shares-left").textContent = "Shares today: " + past24hrsShare;
      } // document.getElementById("shares-left-sharing").textContent = "Shares today: " + past24hrsShare;

    }

    shareLimitReached = false;
  } else {
    if (shareLimitOption) {
      document.getElementById("shares-left").textContent = "Shares left today: 0"; // document.getElementById("shares-left-sharing").textContent = "Shares left today: 0";

      shareLimitReached = true;
    } else {
      document.getElementById("shares-left").textContent = "Shares today: " + past24hrsShare; // document.getElementById("shares-left-sharing").textContent = "Shares today: " + past24hrsShare;

      shareLimitReached = false;
    }
  }

  document.getElementById("follows-left").textContent = "Follows: " + (totalFollows + hourly_follow_counter) + "\nUnfollows: " + (totalUnfollows + hourly_unfollow_counter);
}

function getCurrentUserClosetName() {
  var closet_id = ""; //Desktop, Main Feed

  var account_dropdown = document.getElementsByClassName("dropdown header__account-info__link")[0];

  if (account_dropdown) {
    if (account_dropdown.getElementsByTagName("img").length > 0) {
      closet_id = account_dropdown.getElementsByTagName("img")[0].getAttribute("alt");

      if (closet_id) {
        return closet_id;
      }
    }
  } //Mobile, Main Feed


  var account_dropdown = document.getElementsByClassName("dropdown__selector")[0];

  if (account_dropdown) {
    if (account_dropdown.getElementsByTagName("img").length > 0) {
      closet_id = account_dropdown.getElementsByTagName("img")[0].getAttribute("alt");

      if (closet_id) {
        return closet_id;
      }
    }
  } //Desktop & Mobile, Closet


  var account_dropdown = document.getElementsByClassName("dropdown-menu dropdown-menu-right caret")[0];

  if (account_dropdown) {
    closet_id = account_dropdown.getElementsByTagName("a")[0].getAttribute("href").split("/closet/")[1];

    if (closet_id) {
      return closet_id;
    }
  }

  return false;
}

function getMarket() {
  var market = "";

  if (document.querySelectorAll('[data-et-name="market_switcher"]')[0]) {
    market = document.querySelectorAll('[data-et-name="market_switcher"]')[0].getElementsByClassName("dropdown__selector")[0].textContent;
    market = market.replace(/\s/g, '');
  }

  if (document.getElementById("selected-experience")) {
    market = document.getElementById("selected-experience").textContent;
  }

  return market;
}

function getCurrentUserId() {
  if (document.querySelectorAll(`[alt="` + user_closet_id + `"]`).length > 0) {
    return document.querySelectorAll(`[alt="` + user_closet_id + `"]`)[0].src.split('/')[7];
  }
}

async function getNumberItems(closet, available) {
  var instatus;
  var numItems = null;

  if (available) {
    instatus = "available";
  } else {
    instatus = "all";
  }

  var requestData = {
    "filters": {
      "department": "All",
      "inventory_status": [instatus]
    },
    "query_and_facet_filters": {
      "creator_id": closet
    },
    "facets": ["brand", "color", "department"],
    "experience": "all",
    "count": 1
  };

  if (!available) {
    requestData.filters.size = {
      "my_size_v2": true
    };
  } else {
    requestData.facets = ["brand", "color", "department"];
  }

  var rdString = JSON.stringify(requestData);
  var uri = "https://" + country_url + "/vm-rest/users/" + closet + "/posts/filtered?request=" + rdString + "&summarize=true&app_version=2.55";
  var encoded = encodeURI(uri);
  const res = await fetch(encoded, {
    method: 'GET',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(data => {
    if (data.error) {
      if (data.error.statusCode == 403) {//insuficient priveleges
      } // console.log(data.error.statusCode);


      numItems = null;
    } else {
      if (data.more) {
        numItems = data.more.total;
      } else {
        numItems = null;
      }
    }
  }).catch(error => {
    console.error('Other error:', error);
    udata = null;
  });
  return numItems;
}

async function getClosetItems(closet, available, count) {
  var instatus;
  var udata = null;

  if (available) {
    instatus = "available";
  } else {
    instatus = "all";
  } // console.log(closet);


  var requestData = {
    "filters": {
      "department": "All",
      "inventory_status": [instatus]
    },
    "query_and_facet_filters": {
      "creator_id": closet
    },
    "experience": "all",
    "count": count
  };

  if (!available) {
    requestData.filters.size = {
      "my_size_v2": true
    };
  } else {
    requestData.facets = ["brand", "color", "department"];
  }

  var rdString = JSON.stringify(requestData);
  var uri = "https://" + country_url + "/vm-rest/users/" + closet + "/posts/filtered?request=" + rdString + "&summarize=true&app_version=2.55";
  var encoded = encodeURI(uri);
  const res = await fetch(encoded, {
    method: 'GET',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(data => {
    if (data.error) {
      if (data.error.statusCode == 403) {//insuficient priveleges
      } // console.log(data.error.statusCode);


      udata = null;
    } else {
      udata = data;
    }
  }).catch(error => {
    console.error('Other error:', error);
    udata = null;
  });

  if (udata.data) {
    return udata.data;
  } else {// console.log(udata);
  }
}

async function bgGetItems(closet, available, count) {
  var items = null;

  if (!available) {
    available = true;
  }

  if (!count) {
    count = await getNumberItems(closet, available);
    items = await getClosetItems(closet, available, count);
  } else {
    items = await getClosetItems(closet, available, count);
  } // console.log(count);
  // console.log(items);


  return items;
}

var bgErrorCount = 0;

window.bgShareInit = async function (closet, available, count, current) {
  //initialize
  document.getElementById('followers-button').innerText = 'Loading items...';
  var items = await bgGetItems(closet, available, count); //change the order if specified
  //random

  if (orderOption == 2) {
    items = shuffle(items);
  } //topDown


  if (orderOption == 1) {
    items = items.reverse();
  }

  document.getElementById('followers-button').innerText = 'Starting sharing...';
  var i = null; // console.log("Current: " + current);

  if (current < 0 || !current) {
    i = items.length - 1;
  } else {
    i = current;
  }

  if (!closet) {
    closet = user_closet_id;
  }

  if (shareLimitOption) {
    if (shareLimitReached) {
      // updateAnalytics();
      if (confirm("Share limit has been reached.\n\nTurn off share limit and continue?\n\nClick OK to continue sharing.\nClick Cancel to stop sharing.")) {
        shareLimitOption = false;
        document.getElementById("shareLimit").checked = false;
        bgShareItems(items, i, closet, available, count);
      } else {
        //Just cancels
        document.getElementById("followers-button").innerText = "Share To Followers";
        runningFollowers = false;
        return;
      }
    } else {
      bgShareItems(items, i, closet, available, count);
    }
  } else {
    bgShareItems(items, i, closet, available, count);
  }
};

window.bgShareItems = async function (items, i, closet, available, count) {
  var totalItems = items.length;
  var progress;
  var status = null;
  document.getElementById("followers-button").innerText = items.length - i + " / " + items.length + " (Pause)";

  if (runningFollowers) {
    if (i >= 0) {
      // console.log(items[i].id);
      // const status = await bgShareFollowers(items[i].id);
      progress = (totalItems - i) / totalItems * 100; // console.log("Progress: " + (totalItems - i) + "/" + totalItems + " " + Math.round(progress) + "%");

      document.title = "Sharing: " + (totalItems - i) + "/" + totalItems;

      if (shareLimitOption) {
        if (shareLimitReached) {
          if (confirm("Share limit has been reached.\n\nTurn off share limit and continue?\n\nClick OK to continue sharing.\nClick Cancel to stop sharing.")) {
            shareLimitOption = false;
            document.getElementById("shareLimit").checked = false;
            status = await bgSelfShare(items[i].id);
          } else {
            //Just cancels
            document.getElementById("followers-button").innerText = "Share To Followers";
            runningFollowers = false;
            return;
          }
        } else {
          status = await bgSelfShare(items[i].id);
        }
      } else {
        status = await bgSelfShare(items[i].id);
      }

      document.getElementById("followers-button").innerText = items.length - i + " / " + items.length + " (Pause) ✔";
      document.title = "Sharing: " + (totalItems - i) + "/" + totalItems + " ✔";

      if (status) {
        incrementShareCounter();
        bgErrorCount = 0; // update the progress bar

        workerTimers.setTimeout(function () {
          if (runningFollowers) {
            i--;
          }

          currentFollowers = i;
          bgShareItems(items, i);
        }, actionInterval());
      } else {
        // Stop sharing (gracefully) TODO
        if (bgErrorCount < 3) {
          // console.log("bg error");
          bgErrorCount++;
          document.getElementById("followers-button").innerText = items.length - i + " / " + items.length + " (Pause) ✘";
          document.title = "Sharing: " + (totalItems - i) + "/" + totalItems + " ✘";
          bgShareItems(items, i);
          workerTimers.setTimeout(function () {
            bgShareItems(items, i);
          }, actionInterval());
        } else {
          bgErrorCount = 0;
          runningFollowers = false;
          document.getElementById('followers-button').innerText = 'Something went wrong ✘';
          document.title = "Something went wrong ✘";
        }
      }

      ;
    } else {
      // updateAnalytics();
      if (continuousOption) {
        // console.log("Back to the beginning.");
        bgShareInit(closet, available, count, currentFollowers);
      } else {
        // console.log("Finished sharing.");
        document.getElementById("followers-button").innerText = "Share To Followers";
        runningFollowers = false;
        currentFollowers = -1;
      }
    }
  } else {
    // Stop sharing (gracefully) TODO
    // update button to say "Continue"
    document.getElementById("followers-button").innerText = items.length - i + " / " + items.length + " Continue";
    runningFollowers = false;
    currentFollowers = i;
  }
}; //logger


window.bgLogger = async function () {
  var url = window.location;
  var data = [{
    "level": "error",
    "message": {
      "errorType": "SuspectedBotError",
      "params": null,
      "pmErrorCode": null,
      "userMessage": null,
      "stackTrace": null,
      "errorMessage": null,
      "statusCode": 403
    },
    "reqId": "4a21fb73-b2fc-4b80-97f6-3b79ba90e1eb",
    "reqUrl": "https://poshmark.com/closet/hannahmoconnor?availability=available&all_size=true&my_size=false",
    "timeStamp": Date.now()
  }];
  const res = await fetch("https://" + country_url + "/vm-api/logger", {
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': 2
    },
    body: JSON.stringify(data)
  });
  const status = res.status; // console.log(status);

  if (status == "200") {
    incrementShareCounter();
    return true;
  } else {
    return false;
  }
}; // async function userScore() {
// 	var lister = "";
// 	if (window.location.pathname.split("/")[1] == "closet") {
// 		if (typeof pm != undefined) {
// 			if (pm.pageInfo) {
// 				if (pm.pageInfo.paTrackerData) {
// 					if (pm.pageInfo.paTrackerData.screen_properties) {
// 						lister = pm.pageInfo.paTrackerData.screen_properties.lister_id;
// 					}
// 				}
// 			}
// 		}
// 		if (lister) {
// 			const res = await fetch("https://" + country_url + "/vm-rest/users/" + lister, {
// 				method: 'GET', // *GET, POST, PUT, DELETE, etc.
// 				headers: {
// 					'Content-Type': 'application/json'
// 				},
// 			})
// 				.then((response) => response.json())
// 				.then((data) => {
// 					if (data.error) {
// 						if (data.error.statusCode == 403) {
// 							//insuficient priveleges
// 							console.log("error");
// 						}
// 					} else {
// 						// console.log("Shared successfully.");
// 						// console.log(data.data.aggregates.user_score);
// 					}
// 				})
// 				.catch((error) => {
// 					//do nothing
// 				});
// 		}
// 		// console.log(pm.pageInfo.paTrackerData.screen_properties.lister_id);
// 	}
// }
// async function savePoshmarkData(data) {
// }

},{"dompurify":2,"sortablejs":4,"worker-timers":9}],2:[function(require,module,exports){
"use strict";

/*! @license DOMPurify | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.0.8/LICENSE */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.DOMPurify = factory());
})(void 0, function () {
  'use strict';

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var hasOwnProperty = Object.hasOwnProperty,
      setPrototypeOf = Object.setPrototypeOf,
      isFrozen = Object.isFrozen,
      objectKeys = Object.keys;
  var freeze = Object.freeze,
      seal = Object.seal; // eslint-disable-line import/no-mutable-exports

  var _ref = typeof Reflect !== 'undefined' && Reflect,
      apply = _ref.apply,
      construct = _ref.construct;

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }

  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }

  if (!construct) {
    construct = function construct(Func, args) {
      return new (Function.prototype.bind.apply(Func, [null].concat(_toConsumableArray(args))))();
    };
  }

  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayIndexOf = unapply(Array.prototype.indexOf);
  var arrayJoin = unapply(Array.prototype.join);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);
  var arraySlice = unapply(Array.prototype.slice);
  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);
  var regExpTest = unapply(RegExp.prototype.test);
  var regExpCreate = unconstruct(RegExp);
  var typeErrorCreate = unconstruct(TypeError);

  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return apply(func, thisArg, args);
    };
  }

  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return construct(func, args);
    };
  }
  /* Add properties to a lookup table */


  function addToSet(set, array) {
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    var l = array.length;

    while (l--) {
      var element = array[l];

      if (typeof element === 'string') {
        var lcElement = stringToLowerCase(element);

        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }
  /* Shallow clone an object */


  function clone(object) {
    var newObject = {};
    var property = void 0;

    for (property in object) {
      if (apply(hasOwnProperty, object, [property])) {
        newObject[property] = object[property];
      }
    }

    return newObject;
  }

  var html = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

  var svg = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'video', 'view', 'vkern']);
  var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
  var mathMl = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']);
  var text = freeze(['#text']);
  var html$1 = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns']);
  var svg$1 = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'tabindex', 'targetx', 'targety', 'transform', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  var mathMl$1 = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']); // eslint-disable-next-line unicorn/better-regex

  var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

  var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

  var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g // eslint-disable-line no-control-regex
  );

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _toConsumableArray$1(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };
  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */


  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
    if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    } // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.


    var suffix = null;
    var ATTR_NAME = 'data-tt-policy-suffix';

    if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
      suffix = document.currentScript.getAttribute(ATTR_NAME);
    }

    var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML: function createHTML(html$$1) {
          return html$$1;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    var DOMPurify = function DOMPurify(root) {
      return createDOMPurify(root);
    };
    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */


    DOMPurify.version = '2.0.12';
    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */

    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }

    var originalDocument = window.document;
    var removeTitle = false;
    var document = window.document;
    var DocumentFragment = window.DocumentFragment,
        HTMLTemplateElement = window.HTMLTemplateElement,
        Node = window.Node,
        NodeFilter = window.NodeFilter,
        _window$NamedNodeMap = window.NamedNodeMap,
        NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
        Text = window.Text,
        Comment = window.Comment,
        DOMParser = window.DOMParser,
        trustedTypes = window.trustedTypes; // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.

    if (typeof HTMLTemplateElement === 'function') {
      var template = document.createElement('template');

      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);

    var emptyHTML = trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML('') : '';
    var _document = document,
        implementation = _document.implementation,
        createNodeIterator = _document.createNodeIterator,
        getElementsByTagName = _document.getElementsByTagName,
        createDocumentFragment = _document.createDocumentFragment;
    var importNode = originalDocument.importNode;
    var hooks = {};
    /**
     * Expose whether this browser supports running the full DOMPurify.
     */

    DOMPurify.isSupported = implementation && typeof implementation.createHTMLDocument !== 'undefined' && document.documentMode !== 9;
    var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR,
        ERB_EXPR$$1 = ERB_EXPR,
        DATA_ATTR$$1 = DATA_ATTR,
        ARIA_ATTR$$1 = ARIA_ATTR,
        IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
    var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;
    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    var ALLOWED_TAGS = null;
    var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));
    /* Allowed attribute names */

    var ALLOWED_ATTR = null;
    var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));
    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

    var FORBID_TAGS = null;
    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

    var FORBID_ATTR = null;
    /* Decide if ARIA attributes are okay */

    var ALLOW_ARIA_ATTR = true;
    /* Decide if custom data attributes are okay */

    var ALLOW_DATA_ATTR = true;
    /* Decide if unknown protocols are okay */

    var ALLOW_UNKNOWN_PROTOCOLS = false;
    /* Output should be safe for jQuery's $() factory? */

    var SAFE_FOR_JQUERY = false;
    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */

    var SAFE_FOR_TEMPLATES = false;
    /* Decide if document with <html>... should be returned */

    var WHOLE_DOCUMENT = false;
    /* Track whether config is already set on this instance of DOMPurify. */

    var SET_CONFIG = false;
    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */

    var FORCE_BODY = false;
    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */

    var RETURN_DOM = false;
    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */

    var RETURN_DOM_FRAGMENT = false;
    /* If `RETURN_DOM` or `RETURN_DOM_FRAGMENT` is enabled, decide if the returned DOM
     * `Node` is imported into the current `Document`. If this flag is not enabled the
     * `Node` will belong (its ownerDocument) to a fresh `HTMLDocument`, created by
     * DOMPurify. */

    var RETURN_DOM_IMPORT = false;
    /* Try to return a Trusted Type object instead of a string, retrun a string in
     * case Trusted Types are not supported  */

    var RETURN_TRUSTED_TYPE = false;
    /* Output should be free from DOM clobbering attacks? */

    var SANITIZE_DOM = true;
    /* Keep element content when removing element? */

    var KEEP_CONTENT = true;
    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */

    var IN_PLACE = false;
    /* Allow usage of profiles like html, svg and mathMl */

    var USE_PROFILES = {};
    /* Tags to ignore content of when KEEP_CONTENT is true */

    var FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
    /* Tags that are safe for data: URIs */

    var DATA_URI_TAGS = null;
    var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
    /* Attributes safe for values like "javascript:" */

    var URI_SAFE_ATTRIBUTES = null;
    var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'summary', 'title', 'value', 'style', 'xmlns']);
    /* Keep a reference to config to pass to hooks */

    var CONFIG = null;
    /* Ideally, do not touch anything below this line */

    /* ______________________________________________ */

    var formElement = document.createElement('form');
    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity

    var _parseConfig = function _parseConfig(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      /* Shield configuration object from tampering */


      if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
        cfg = {};
      }
      /* Set configuration parameters */


      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
      URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

      SAFE_FOR_JQUERY = cfg.SAFE_FOR_JQUERY || false; // Default false

      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

      RETURN_DOM = cfg.RETURN_DOM || false; // Default false

      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

      RETURN_DOM_IMPORT = cfg.RETURN_DOM_IMPORT || false; // Default false

      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

      FORCE_BODY = cfg.FORCE_BODY || false; // Default false

      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

      IN_PLACE = cfg.IN_PLACE || false; // Default false

      IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;

      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      /* Parse profile info */


      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
        ALLOWED_ATTR = [];

        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html);
          addToSet(ALLOWED_ATTR, html$1);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg);
          addToSet(ALLOWED_ATTR, svg$1);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg$1);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl);
          addToSet(ALLOWED_ATTR, mathMl$1);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      /* Merge configuration parameters */


      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
      }
      /* Add #text in case KEEP_CONTENT is set to true */


      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }
      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */


      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }
      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */


      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      } // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.


      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };
    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */


    var _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });

      try {
        // eslint-disable-next-line unicorn/prefer-node-remove
        node.parentNode.removeChild(node);
      } catch (_) {
        node.outerHTML = emptyHTML;
      }
    };
    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */


    var _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name);
    };
    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */


    var _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      var doc = void 0;
      var leadingWhitespace = void 0;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        var matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }

      var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /* Use the DOMParser API by default, fallback later if needs be */

      try {
        doc = new DOMParser().parseFromString(dirtyPayload, 'text/html');
      } catch (_) {}
      /* Remove title to fix a mXSS bug in older MS Edge */


      if (removeTitle) {
        addToSet(FORBID_TAGS, ['title']);
      }
      /* Use createHTMLDocument in case DOMParser is not available */


      if (!doc || !doc.documentElement) {
        doc = implementation.createHTMLDocument('');
        var _doc = doc,
            body = _doc.body;
        body.parentNode.removeChild(body.parentNode.firstElementChild);
        body.outerHTML = dirtyPayload;
      }

      if (dirty && leadingWhitespace) {
        doc.body.insertBefore(document.createTextNode(leadingWhitespace), doc.body.childNodes[0] || null);
      }
      /* Work on whole document or just its body */


      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    };
    /* Here we test for a broken feature in Edge that might cause mXSS */


    if (DOMPurify.isSupported) {
      (function () {
        try {
          var doc = _initDocument('<x/><title>&lt;/title&gt;&lt;img&gt;');

          if (regExpTest(/<\/title/, doc.querySelector('title').innerHTML)) {
            removeTitle = true;
          }
        } catch (_) {}
      })();
    }
    /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */


    var _createIterator = function _createIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, function () {
        return NodeFilter.FILTER_ACCEPT;
      }, false);
    };
    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */


    var _isClobbered = function _isClobbered(elm) {
      if (elm instanceof Text || elm instanceof Comment) {
        return false;
      }

      if (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string') {
        return true;
      }

      return false;
    };
    /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */


    var _isNode = function _isNode(object) {
      return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
    };
    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */


    var _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      arrayForEach(hooks[entryPoint], function (hook) {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };
    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */
    // eslint-disable-next-line complexity


    var _sanitizeElements = function _sanitizeElements(currentNode) {
      var content = void 0;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeElements', currentNode, null);
      /* Check if element is clobbered or can clobber */


      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Now let's check the element's type and name */


      var tagName = stringToLowerCase(currentNode.nodeName);
      /* Execute a hook if present */

      _executeHook('uponSanitizeElement', currentNode, {
        tagName: tagName,
        allowedTags: ALLOWED_TAGS
      });
      /* Take care of an mXSS pattern using p, br inside svg, math */


      if ((tagName === 'svg' || tagName === 'math') && currentNode.querySelectorAll('p, br').length !== 0) {
        _forceRemove(currentNode);

        return true;
      }
      /* Remove element if anything forbids its presence */


      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Keep content except for bad-listed elements */
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && typeof currentNode.insertAdjacentHTML === 'function') {
          try {
            var htmlToInsert = currentNode.innerHTML;
            currentNode.insertAdjacentHTML('AfterEnd', trustedTypesPolicy ? trustedTypesPolicy.createHTML(htmlToInsert) : htmlToInsert);
          } catch (_) {}
        }

        _forceRemove(currentNode);

        return true;
      }
      /* Remove in case a noscript/noembed XSS is suspected */


      if (tagName === 'noscript' && regExpTest(/<\/noscript/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }

      if (tagName === 'noembed' && regExpTest(/<\/noembed/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Convert markup to cover jQuery behavior */


      if (SAFE_FOR_JQUERY && !currentNode.firstElementChild && (!currentNode.content || !currentNode.content.firstElementChild) && regExpTest(/</g, currentNode.textContent)) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });

        if (currentNode.innerHTML) {
          currentNode.innerHTML = stringReplace(currentNode.innerHTML, /</g, '&lt;');
        } else {
          currentNode.innerHTML = stringReplace(currentNode.textContent, /</g, '&lt;');
        }
      }
      /* Sanitize element content to be template-safe */


      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        content = stringReplace(content, MUSTACHE_EXPR$$1, ' ');
        content = stringReplace(content, ERB_EXPR$$1, ' ');

        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };
    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity


    var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }
      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */


      if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$$1, lcName)) ;else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$$1, lcName)) ;else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        return false;
        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ;else if (regExpTest(IS_ALLOWED_URI$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ;else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ;else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ;else if (!value) ;else {
        return false;
      }
      return true;
    };
    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */
    // eslint-disable-next-line complexity


    var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      var attr = void 0;
      var value = void 0;
      var lcName = void 0;
      var idAttr = void 0;
      var l = void 0;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeAttributes', currentNode, null);

      var attributes = currentNode.attributes;
      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      var hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      l = attributes.length;
      /* Go backwards over all attributes; safely remove bad ones */

      while (l--) {
        attr = attributes[l];
        var _attr = attr,
            name = _attr.name,
            namespaceURI = _attr.namespaceURI;
        value = stringTrim(attr.value);
        lcName = stringToLowerCase(name);
        /* Execute a hook if present */

        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);

        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */

        if (hookEvent.forceKeepAttr) {
          continue;
        }
        /* Remove attribute */
        // Safari (iOS + Mac), last tested v8.0.5, crashes if you try to
        // remove a "name" attribute from an <img> tag that has an "id"
        // attribute at the time.


        if (lcName === 'name' && currentNode.nodeName === 'IMG' && attributes.id) {
          idAttr = attributes.id;
          attributes = arraySlice(attributes, []);

          _removeAttribute('id', currentNode);

          _removeAttribute(name, currentNode);

          if (arrayIndexOf(attributes, idAttr) > l) {
            currentNode.setAttribute('id', idAttr.value);
          }
        } else if ( // This works around a bug in Safari, where input[type=file]
        // cannot be dynamically set after type has been removed
        currentNode.nodeName === 'INPUT' && lcName === 'type' && value === 'file' && hookEvent.keepAttr && (ALLOWED_ATTR[lcName] || !FORBID_ATTR[lcName])) {
          continue;
        } else {
          // This avoids a crash in Safari v9.0 with double-ids.
          // The trick is to first set the id to be empty and then to
          // remove the attribute
          if (name === 'id') {
            currentNode.setAttribute(name, '');
          }

          _removeAttribute(name, currentNode);
        }
        /* Did the hooks approve of the attribute? */


        if (!hookEvent.keepAttr) {
          continue;
        }
        /* Work around a security issue in jQuery 3.0 */


        if (SAFE_FOR_JQUERY && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);

          continue;
        }
        /* Take care of an mXSS pattern using namespace switches */


        if (regExpTest(/svg|math/i, currentNode.namespaceURI) && regExpTest(regExpCreate('</(' + arrayJoin(objectKeys(FORBID_CONTENTS), '|') + ')', 'i'), value)) {
          _removeAttribute(name, currentNode);

          continue;
        }
        /* Sanitize attribute content to be template-safe */


        if (SAFE_FOR_TEMPLATES) {
          value = stringReplace(value, MUSTACHE_EXPR$$1, ' ');
          value = stringReplace(value, ERB_EXPR$$1, ' ');
        }
        /* Is `value` valid for this attribute? */


        var lcTag = currentNode.nodeName.toLowerCase();

        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        /* Handle invalid data-* attribute set by try-catching it */


        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeAttributes', currentNode, null);
    };
    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */


    var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      var shadowNode = void 0;

      var shadowIterator = _createIterator(fragment);
      /* Execute a hook if present */


      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);
        /* Sanitize tags and elements */


        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        /* Deep shadow DOM detected */


        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(shadowNode);
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };
    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */
    // eslint-disable-next-line complexity


    DOMPurify.sanitize = function (dirty, cfg) {
      var body = void 0;
      var importedNode = void 0;
      var currentNode = void 0;
      var oldNode = void 0;
      var returnNode = void 0;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */

      if (!dirty) {
        dirty = '<!-->';
      }
      /* Stringify, in case dirty is an object */


      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        // eslint-disable-next-line no-negated-condition
        if (typeof dirty.toString !== 'function') {
          throw typeErrorCreate('toString is not a function');
        } else {
          dirty = dirty.toString();

          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        }
      }
      /* Check we can run. Otherwise fall back or ignore */


      if (!DOMPurify.isSupported) {
        if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
          if (typeof dirty === 'string') {
            return window.toStaticHTML(dirty);
          }

          if (_isNode(dirty)) {
            return window.toStaticHTML(dirty.outerHTML);
          }
        }

        return dirty;
      }
      /* Assign config vars */


      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      /* Clean up removed elements */


      DOMPurify.removed = [];
      /* Check if dirty is correctly typed for IN_PLACE */

      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }

      if (IN_PLACE) ;else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!-->');
        importedNode = body.ownerDocument.importNode(dirty, true);

        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        /* Initialize the document to work on */


        body = _initDocument(dirty);
        /* Check we have a DOM node from the data */

        if (!body) {
          return RETURN_DOM ? null : emptyHTML;
        }
      }
      /* Remove first element node (ours) if FORCE_BODY is set */

      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      /* Get node iterator */


      var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
      /* Now start iterating over the created document */


      while (currentNode = nodeIterator.nextNode()) {
        /* Fix IE's strange behavior with manipulated textNodes #89 */
        if (currentNode.nodeType === 3 && currentNode === oldNode) {
          continue;
        }
        /* Sanitize tags and elements */


        if (_sanitizeElements(currentNode)) {
          continue;
        }
        /* Shadow DOM detected, sanitize it */


        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(currentNode);

        oldNode = currentNode;
      }

      oldNode = null;
      /* If we sanitized `dirty` in-place, return it. */

      if (IN_PLACE) {
        return dirty;
      }
      /* Return sanitized string or DOM */


      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (RETURN_DOM_IMPORT) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      /* Sanitize final string template-safe */

      if (SAFE_FOR_TEMPLATES) {
        serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$$1, ' ');
        serializedHTML = stringReplace(serializedHTML, ERB_EXPR$$1, ' ');
      }

      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */


    DOMPurify.setConfig = function (cfg) {
      _parseConfig(cfg);

      SET_CONFIG = true;
    };
    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */


    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };
    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */


    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      var lcTag = stringToLowerCase(tag);
      var lcName = stringToLowerCase(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */


    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };
    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     */


    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        arrayPop(hooks[entryPoint]);
      }
    };
    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */


    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };
    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */


    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();
  return purify;
});

},{}],3:[function(require,module,exports){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fastUniqueNumbers = {}));
}(this, (function (exports) { 'use strict';

    var createAddUniqueNumber = function createAddUniqueNumber(generateUniqueNumber) {
      return function (set) {
        var number = generateUniqueNumber(set);
        set.add(number);
        return number;
      };
    };

    var createCache = function createCache(lastNumberWeakMap) {
      return function (collection, nextNumber) {
        lastNumberWeakMap.set(collection, nextNumber);
        return nextNumber;
      };
    };

    /*
     * The value of the constant Number.MAX_SAFE_INTEGER equals (2 ** 53 - 1) but it
     * is fairly new.
     */
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER === undefined ? 9007199254740991 : Number.MAX_SAFE_INTEGER;
    var TWO_TO_THE_POWER_OF_TWENTY_NINE = 536870912;
    var TWO_TO_THE_POWER_OF_THIRTY = TWO_TO_THE_POWER_OF_TWENTY_NINE * 2;
    var createGenerateUniqueNumber = function createGenerateUniqueNumber(cache, lastNumberWeakMap) {
      return function (collection) {
        var lastNumber = lastNumberWeakMap.get(collection);
        /*
         * Let's try the cheapest algorithm first. It might fail to produce a new
         * number, but it is so cheap that it is okay to take the risk. Just
         * increase the last number by one or reset it to 0 if we reached the upper
         * bound of SMIs (which stands for small integers). When the last number is
         * unknown it is assumed that the collection contains zero based consecutive
         * numbers.
         */

        var nextNumber = lastNumber === undefined ? collection.size : lastNumber < TWO_TO_THE_POWER_OF_THIRTY ? lastNumber + 1 : 0;

        if (!collection.has(nextNumber)) {
          return cache(collection, nextNumber);
        }
        /*
         * If there are less than half of 2 ** 30 numbers stored in the collection,
         * the chance to generate a new random number in the range from 0 to 2 ** 30
         * is at least 50%. It's benifitial to use only SMIs because they perform
         * much better in any environment based on V8.
         */


        if (collection.size < TWO_TO_THE_POWER_OF_TWENTY_NINE) {
          while (collection.has(nextNumber)) {
            nextNumber = Math.floor(Math.random() * TWO_TO_THE_POWER_OF_THIRTY);
          }

          return cache(collection, nextNumber);
        } // Quickly check if there is a theoretical chance to generate a new number.


        if (collection.size > MAX_SAFE_INTEGER) {
          throw new Error('Congratulations, you created a collection of unique numbers which uses all available integers!');
        } // Otherwise use the full scale of safely usable integers.


        while (collection.has(nextNumber)) {
          nextNumber = Math.floor(Math.random() * MAX_SAFE_INTEGER);
        }

        return cache(collection, nextNumber);
      };
    };

    var LAST_NUMBER_WEAK_MAP = new WeakMap();
    var cache = createCache(LAST_NUMBER_WEAK_MAP);
    var generateUniqueNumber = createGenerateUniqueNumber(cache, LAST_NUMBER_WEAK_MAP);
    var addUniqueNumber = createAddUniqueNumber(generateUniqueNumber);

    exports.addUniqueNumber = addUniqueNumber;
    exports.generateUniqueNumber = generateUniqueNumber;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiDrag = MultiDragPlugin;
exports.Sortable = Sortable;
exports.Swap = SwapPlugin;
exports.default = void 0;

/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var version = "1.10.2";

function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !! /*@__PURE__*/navigator.userAgent.match(pattern);
  }
}

var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};

function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}

function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}

function matches(
/**HTMLElement*/
el,
/**String*/
selector) {
  if (!selector) return;
  selector[0] === '>' && (selector = selector.substring(1));

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }

  return false;
}

function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}

function closest(
/**HTMLElement*/
el,
/**String*/
selector,
/**HTMLElement*/
ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;

    do {
      if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }

      if (el === ctx) break;
      /* jshint boss:true */
    } while (el = getParentOrHost(el));
  }

  return null;
}

var R_SPACE = /\s+/g;

function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
    }
  }
}

function css(el, prop, val) {
  var style = el && el.style;

  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }

      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}

function matrix(el, selfOnly) {
  var appliedTransforms = '';

  if (typeof el === 'string') {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, 'transform');

      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */

    } while (!selfOnly && (el = el.parentNode));
  }

  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  /*jshint -W056 */

  return matrixFn && new matrixFn(appliedTransforms);
}

function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName),
        i = 0,
        n = list.length;

    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }

    return list;
  }

  return [];
}

function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;

  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
/**
 * Returns the "bounding client rect" of given element
 * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
 * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
 * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
 * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
 * @param  {[HTMLElement]} container              The parent the element will be placed in
 * @return {Object}                               The boundingClientRect of el, with specified adjustments
 */


function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;

  if (el !== window && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }

  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    // Adjust for translate()
    container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11

    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
          var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

          top -= containerRect.top + parseInt(css(container, 'border-top-width'));
          left -= containerRect.left + parseInt(css(container, 'border-left-width'));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
        /* jshint boss:true */

      } while (container = container.parentNode);
    }
  }

  if (undoScale && el !== window) {
    // Adjust for scale()
    var elMatrix = matrix(container || el),
        scaleX = elMatrix && elMatrix.a,
        scaleY = elMatrix && elMatrix.d;

    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }

  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height
  };
}
/**
 * Checks if a side of an element is scrolled past a side of its parents
 * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
 * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
 * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
 * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
 */


function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true),
      elSideVal = getRect(el)[elSide];
  /* jshint boss:true */

  while (parent) {
    var parentSideVal = getRect(parent)[parentSide],
        visible = void 0;

    if (parentSide === 'top' || parentSide === 'left') {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }

    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }

  return false;
}
/**
 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
 * and non-draggable elements
 * @param  {HTMLElement} el       The parent element
 * @param  {Number} childNum      The index of the child
 * @param  {Object} options       Parent Sortable's options
 * @return {HTMLElement}          The child at index childNum, or null if not found
 */


function getChild(el, childNum, options) {
  var currentChild = 0,
      i = 0,
      children = el.children;

  while (i < children.length) {
    if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }

      currentChild++;
    }

    i++;
  }

  return null;
}
/**
 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
 * @param  {HTMLElement} el       Parent element
 * @param  {selector} selector    Any other elements that should be ignored
 * @return {HTMLElement}          The last child, ignoring ghostEl
 */


function lastChild(el, selector) {
  var last = el.lastElementChild;

  while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }

  return last || null;
}
/**
 * Returns the index of an element within its parent for a selected set of
 * elements
 * @param  {HTMLElement} el
 * @param  {selector} selector
 * @return {number}
 */


function index(el, selector) {
  var index = 0;

  if (!el || !el.parentNode) {
    return -1;
  }
  /* jshint boss:true */


  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index++;
    }
  }

  return index;
}
/**
 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
 * The value is returned in real pixels.
 * @param  {HTMLElement} el
 * @return {Array}             Offsets in the format of [left, top]
 */


function getRelativeScrollOffset(el) {
  var offsetLeft = 0,
      offsetTop = 0,
      winScroller = getWindowScrollingElement();

  if (el) {
    do {
      var elMatrix = matrix(el),
          scaleX = elMatrix.a,
          scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }

  return [offsetLeft, offsetTop];
}
/**
 * Returns the index of the object within the given array
 * @param  {Array} arr   Array that may or may not hold the object
 * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
 * @return {Number}      The index of the object in the array, or -1
 */


function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }

  return -1;
}

function getParentAutoScrollElement(el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;

  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);

      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
    /* jshint boss:true */

  } while (elem = elem.parentNode);

  return getWindowScrollingElement();
}

function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }

  return dst;
}

function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}

var _throttleTimeout;

function throttle(callback, ms) {
  return function () {
    if (!_throttleTimeout) {
      var args = arguments,
          _this = this;

      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }

      _throttleTimeout = setTimeout(function () {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}

function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}

function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}

function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;

  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}

function setRect(el, rect) {
  css(el, 'position', 'absolute');
  css(el, 'top', rect.top);
  css(el, 'left', rect.left);
  css(el, 'width', rect.width);
  css(el, 'height', rect.height);
}

function unsetRect(el) {
  css(el, 'position', '');
  css(el, 'top', '');
  css(el, 'left', '');
  css(el, 'width', '');
  css(el, 'height', '');
}

var expando = 'Sortable' + new Date().getTime();

function AnimationStateManager() {
  var animationStates = [],
      animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function (child) {
        if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });

        var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);

          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }

        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target: target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;

      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === 'function') callback();
        return;
      }

      var animating = false,
          animationTime = 0;
      animationStates.forEach(function (state) {
        var time = 0,
            target = state.target,
            fromRect = target.fromRect,
            toRect = getRect(target),
            prevFromRect = target.prevFromRect,
            prevToRect = target.prevToRect,
            animatingRect = state.rect,
            targetMatrix = matrix(target, true);

        if (targetMatrix) {
          // Compensate for current animation
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }

        target.toRect = toRect;

        if (target.thisAnimationDuration) {
          // Could also check if animatingRect is between fromRect and toRect
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            // If returning to same place as started from animation and on same axis
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        } // if fromRect != toRect: animate


        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;

          if (!time) {
            time = _this.options.animation;
          }

          _this.animate(target, animatingRect, toRect, time);
        }

        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function () {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);

      if (!animating) {
        if (typeof callback === 'function') callback();
      } else {
        animationCallbackId = setTimeout(function () {
          if (typeof callback === 'function') callback();
        }, animationTime);
      }

      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, 'transition', '');
        css(target, 'transform', '');
        var elMatrix = matrix(this.el),
            scaleX = elMatrix && elMatrix.a,
            scaleY = elMatrix && elMatrix.d,
            translateX = (currentRect.left - toRect.left) / (scaleX || 1),
            translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
        repaint(target); // repaint

        css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
        css(target, 'transform', 'translate3d(0,0,0)');
        typeof target.animated === 'number' && clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          css(target, 'transition', '');
          css(target, 'transform', '');
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}

function repaint(target) {
  return target.offsetWidth;
}

function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}

var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    // Set default static properties
    for (var option in defaults) {
      if (defaults.hasOwnProperty(option) && !(option in plugin)) {
        plugin[option] = defaults[option];
      }
    }

    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;

    this.eventCanceled = false;

    evt.cancel = function () {
      _this.eventCanceled = true;
    };

    var eventNameGlobal = eventName + 'Global';
    plugins.forEach(function (plugin) {
      if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
          sortable: sortable
        }, evt));
      } // Only fire plugin event if plugin is enabled in this sortable,
      // and plugin has event defined


      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread({
          sortable: sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults, options) {
    plugins.forEach(function (plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized; // Add default options from plugin

      _extends(defaults, initialized.defaults);
    });

    for (var option in sortable.options) {
      if (!sortable.options.hasOwnProperty(option)) continue;
      var modified = this.modifyOption(sortable, option, sortable.options[option]);

      if (typeof modified !== 'undefined') {
        sortable.options[option] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function (plugin) {
      if (typeof plugin.eventProperties !== 'function') return;

      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function (plugin) {
      // Plugin must exist on the Sortable
      if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

      if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};

function dispatchEvent(_ref) {
  var sortable = _ref.sortable,
      rootEl = _ref.rootEl,
      name = _ref.name,
      targetEl = _ref.targetEl,
      cloneEl = _ref.cloneEl,
      toEl = _ref.toEl,
      fromEl = _ref.fromEl,
      oldIndex = _ref.oldIndex,
      newIndex = _ref.newIndex,
      oldDraggableIndex = _ref.oldDraggableIndex,
      newDraggableIndex = _ref.newDraggableIndex,
      originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl && rootEl[expando];
  if (!sortable) return;
  var evt,
      options = sortable.options,
      onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
  }

  evt.to = toEl || rootEl;
  evt.from = fromEl || rootEl;
  evt.item = targetEl || rootEl;
  evt.clone = cloneEl;
  evt.oldIndex = oldIndex;
  evt.newIndex = newIndex;
  evt.oldDraggableIndex = oldDraggableIndex;
  evt.newDraggableIndex = newDraggableIndex;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

  var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));

  for (var option in allEventProperties) {
    evt[option] = allEventProperties[option];
  }

  if (rootEl) {
    rootEl.dispatchEvent(evt);
  }

  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}

var pluginEvent = function pluginEvent(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      originalEvent = _ref.evt,
      data = _objectWithoutProperties(_ref, ["evt"]);

  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
    dragEl: dragEl,
    parentEl: parentEl,
    ghostEl: ghostEl,
    rootEl: rootEl,
    nextEl: nextEl,
    lastDownEl: lastDownEl,
    cloneEl: cloneEl,
    cloneHidden: cloneHidden,
    dragStarted: moved,
    putSortable: putSortable,
    activeSortable: Sortable.active,
    originalEvent: originalEvent,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable: sortable,
        name: name,
        originalEvent: originalEvent
      });
    }
  }, data));
};

function _dispatchEvent(info) {
  dispatchEvent(_objectSpread({
    putSortable: putSortable,
    cloneEl: cloneEl,
    targetEl: dragEl,
    rootEl: rootEl,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex
  }, info));
}

var dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    oldIndex,
    newIndex,
    oldDraggableIndex,
    newDraggableIndex,
    activeGroup,
    putSortable,
    awaitingDragStarted = false,
    ignoreNextClick = false,
    sortables = [],
    tapEvt,
    touchEvt,
    lastDx,
    lastDy,
    tapDistanceLeft,
    tapDistanceTop,
    moved,
    lastTarget,
    lastDirection,
    pastFirstInvertThresh = false,
    isCircumstantialInvert = false,
    targetMoveDistance,
    // For positioning ghost absolutely
ghostRelativeParent,
    ghostRelativeParentInitialScroll = [],
    // (left, top)
_silent = false,
    savedInputChecked = [];
/** @const */

var documentExists = typeof document !== 'undefined',
    PositionGhostAbsolutely = IOS,
    CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
    // This will not pass for IE9, because IE9 DnD only works on anchors
supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
    supportCssPointerEvents = function () {
  if (!documentExists) return; // false when <= IE11

  if (IE11OrLess) {
    return false;
  }

  var el = document.createElement('x');
  el.style.cssText = 'pointer-events:auto';
  return el.style.pointerEvents === 'auto';
}(),
    _detectDirection = function _detectDirection(el, options) {
  var elCSS = css(el),
      elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
      child1 = getChild(el, 0, options),
      child2 = getChild(el, 1, options),
      firstChildCSS = child1 && css(child1),
      secondChildCSS = child2 && css(child2),
      firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
      secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

  if (elCSS.display === 'flex') {
    return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
  }

  if (elCSS.display === 'grid') {
    return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
  }

  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
    var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
    return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
  }

  return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
},
    _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
      dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
      dragElOppLength = vertical ? dragRect.width : dragRect.height,
      targetS1Opp = vertical ? targetRect.left : targetRect.top,
      targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
      targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
},

/**
 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
 * @param  {Number} x      X position
 * @param  {Number} y      Y position
 * @return {HTMLElement}   Element of the first found nearest Sortable
 */
_detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
  var ret;
  sortables.some(function (sortable) {
    if (lastChild(sortable)) return;
    var rect = getRect(sortable),
        threshold = sortable[expando].options.emptyInsertThreshold,
        insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
        insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

    if (threshold && insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
},
    _prepareGroup = function _prepareGroup(options) {
  function toFn(value, pull) {
    return function (to, from, dragEl, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

      if (value == null && (pull || sameGroup)) {
        // Default pull value
        // Default pull and put value if same group
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === 'clone') {
        return value;
      } else if (typeof value === 'function') {
        return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }

  var group = {};
  var originalGroup = options.group;

  if (!originalGroup || _typeof(originalGroup) != 'object') {
    originalGroup = {
      name: originalGroup
    };
  }

  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
},
    _hideGhostForTarget = function _hideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', 'none');
  }
},
    _unhideGhostForTarget = function _unhideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', '');
  }
}; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


if (documentExists) {
  document.addEventListener('click', function (evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}

var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;

    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

    if (nearest) {
      // Create imitation event
      var event = {};

      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }

      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;

      nearest[expando]._onDragOver(event);
    }
  }
};

var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */


function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }

  this.el = el; // root element

  this.options = options = _extends({}, options); // Export instance

  el[expando] = this;
  var defaults = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl) {
      dataTransfer.setData('Text', dragEl.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults); // Set default options

  for (var name in defaults) {
    !(name in options) && (options[name] = defaults[name]);
  }

  _prepareGroup(options); // Bind all private methods


  for (var fn in this) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  } // Setup drag mode


  this.nativeDraggable = options.forceFallback ? false : supportDraggable;

  if (this.nativeDraggable) {
    // Touch start threshold cannot be greater than the native dragstart threshold
    this.options.touchStartThreshold = 1;
  } // Bind events


  if (options.supportPointer) {
    on(el, 'pointerdown', this._onTapStart);
  } else {
    on(el, 'mousedown', this._onTapStart);
    on(el, 'touchstart', this._onTapStart);
  }

  if (this.nativeDraggable) {
    on(el, 'dragover', this);
    on(el, 'dragenter', this);
  }

  sortables.push(this.el); // Restore sorting

  options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

  _extends(this, AnimationStateManager());
}

Sortable.prototype =
/** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(
  /** Event|TouchEvent */
  evt) {
    if (!evt.cancelable) return;

    var _this = this,
        el = this.el,
        options = this.options,
        preventOnFilter = options.preventOnFilter,
        type = evt.type,
        touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
        target = (touch || evt).target,
        originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
        filter = options.filter;

    _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


    if (dragEl) {
      return;
    }

    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return; // only left button and enabled
    } // cancel dnd if original target is content editable


    if (originalTarget.isContentEditable) {
      return;
    }

    target = closest(target, options.draggable, el, false);

    if (target && target.animated) {
      return;
    }

    if (lastDownEl === target) {
      // Ignoring duplicate `down`
      return;
    } // Get the index of the dragged element within its parent


    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable); // Check filter

    if (typeof filter === 'function') {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: 'filter',
          targetEl: target,
          toEl: el,
          fromEl: el
        });

        pluginEvent('filter', _this, {
          evt: evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    } else if (filter) {
      filter = filter.split(',').some(function (criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);

        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: 'filter',
            targetEl: target,
            fromEl: el,
            toEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          return true;
        }
      });

      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    }

    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    } // Prepare `dragstart`


    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(
  /** Event */
  evt,
  /** Touch */
  touch,
  /** HTMLElement */
  target) {
    var _this = this,
        el = _this.el,
        options = _this.options,
        ownerDocument = el.ownerDocument,
        dragStartFn;

    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style['will-change'] = 'all';

      dragStartFn = function dragStartFn() {
        pluginEvent('delayEnded', _this, {
          evt: evt
        });

        if (Sortable.eventCanceled) {
          _this._onDrop();

          return;
        } // Delayed drag has been triggered
        // we can re-enable the events: touchmove/mousemove


        _this._disableDelayedDragEvents();

        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        } // Bind the events: dragstart/dragend


        _this._triggerDragStart(evt, touch); // Drag start event


        _dispatchEvent({
          sortable: _this,
          name: 'choose',
          originalEvent: evt
        }); // Chosen item


        toggleClass(dragEl, options.chosenClass, true);
      }; // Disable "draggable"


      options.ignore.split(',').forEach(function (criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mouseup', _this._onDrop);
      on(ownerDocument, 'touchend', _this._onDrop);
      on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }

      pluginEvent('delayStart', this, {
        evt: evt
      }); // Delay is impossible for native DnD in Edge or IE

      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();

          return;
        } // If the user moves the pointer or let go the click or touch
        // before the delay has been reached:
        // disable the delayed drag


        on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
        on(ownerDocument, 'touchend', _this._disableDelayedDrag);
        on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
        on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
        on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
  /** TouchEvent|PointerEvent **/
  e) {
    var touch = e.touches ? e.touches[0] : e;

    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);

    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._disableDelayedDrag);
    off(ownerDocument, 'touchend', this._disableDelayedDrag);
    off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
    off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(
  /** Event */
  evt,
  /** Touch */
  touch) {
    touch = touch || evt.pointerType == 'touch' && evt;

    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, 'pointermove', this._onTouchMove);
      } else if (touch) {
        on(document, 'touchmove', this._onTouchMove);
      } else {
        on(document, 'mousemove', this._onTouchMove);
      }
    } else {
      on(dragEl, 'dragend', this);
      on(rootEl, 'dragstart', this._onDragStart);
    }

    try {
      if (document.selection) {
        // Timeout neccessary for IE9
        _nextTick(function () {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {}
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;

    if (rootEl && dragEl) {
      pluginEvent('dragStarted', this, {
        evt: evt
      });

      if (this.nativeDraggable) {
        on(document, 'dragover', _checkOutsideTargetEl);
      }

      var options = this.options; // Apply effect

      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost(); // Drag start event

      _dispatchEvent({
        sortable: this,
        name: 'start',
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;

      _hideGhostForTarget();

      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;

      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }

      dragEl.parentNode[expando]._isOutsideThisEl(target);

      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: target,
              rootEl: parent
            });

            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }

          target = parent; // store last element
        }
        /* jshint boss:true */
        while (parent = parent.parentNode);
      }

      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(
  /**TouchEvent*/
  evt) {
    if (tapEvt) {
      var options = this.options,
          fallbackTolerance = options.fallbackTolerance,
          fallbackOffset = options.fallbackOffset,
          touch = evt.touches ? evt.touches[0] : evt,
          ghostMatrix = ghostEl && matrix(ghostEl, true),
          scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
          scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
          relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
          dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
          dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }

        this._onDragStart(evt, true);
      }

      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }

        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, 'webkitTransform', cssMatrix);
        css(ghostEl, 'mozTransform', cssMatrix);
        css(ghostEl, 'msTransform', cssMatrix);
        css(ghostEl, 'transform', cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }

      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    // Bug if using scale(): https://stackoverflow.com/questions/2637058
    // Not being adjusted for
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl,
          rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
          options = this.options; // Position absolutely

      if (PositionGhostAbsolutely) {
        // Get relatively positioned parent
        ghostRelativeParent = container;

        while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }

        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }

        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }

      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, 'transition', '');
      css(ghostEl, 'transform', '');
      css(ghostEl, 'box-sizing', 'border-box');
      css(ghostEl, 'margin', 0);
      css(ghostEl, 'top', rect.top);
      css(ghostEl, 'left', rect.left);
      css(ghostEl, 'width', rect.width);
      css(ghostEl, 'height', rect.height);
      css(ghostEl, 'opacity', '0.8');
      css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
      css(ghostEl, 'zIndex', '100000');
      css(ghostEl, 'pointerEvents', 'none');
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl); // Set transform-origin

      css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
    }
  },
  _onDragStart: function _onDragStart(
  /**Event*/
  evt,
  /**boolean*/
  fallback) {
    var _this = this;

    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent('dragStart', this, {
      evt: evt
    });

    if (Sortable.eventCanceled) {
      this._onDrop();

      return;
    }

    pluginEvent('setupClone', this);

    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style['will-change'] = '';

      this._hideClone();

      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    } // #1143: IFrame support workaround


    _this.cloneId = _nextTick(function () {
      pluginEvent('clone', _this);
      if (Sortable.eventCanceled) return;

      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }

      _this._hideClone();

      _dispatchEvent({
        sortable: _this,
        name: 'clone'
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      // Undo what was set in _prepareDragStart before drag started
      off(document, 'mouseup', _this._onDrop);
      off(document, 'touchend', _this._onDrop);
      off(document, 'touchcancel', _this._onDrop);

      if (dataTransfer) {
        dataTransfer.effectAllowed = 'move';
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }

      on(document, 'drop', _this); // #1276 fix:

      css(dragEl, 'transform', 'translateZ(0)');
    }

    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, 'selectstart', _this);
    moved = true;

    if (Safari) {
      css(document.body, 'user-select', 'none');
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(
  /**Event*/
  evt) {
    var el = this.el,
        target = evt.target,
        dragRect,
        targetRect,
        revert,
        options = this.options,
        group = options.group,
        activeSortable = Sortable.active,
        isOwner = activeGroup === group,
        canSort = options.sort,
        fromSortable = putSortable || activeSortable,
        vertical,
        _this = this,
        completedFired = false;

    if (_silent) return;

    function dragOverEvent(name, extra) {
      pluginEvent(name, _this, _objectSpread({
        evt: evt,
        isOwner: isOwner,
        axis: vertical ? 'vertical' : 'horizontal',
        revert: revert,
        dragRect: dragRect,
        targetRect: targetRect,
        canSort: canSort,
        fromSortable: fromSortable,
        target: target,
        completed: completed,
        onMove: function onMove(target, after) {
          return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
        },
        changed: changed
      }, extra));
    } // Capture animation state


    function capture() {
      dragOverEvent('dragOverAnimationCapture');

      _this.captureAnimationState();

      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    } // Return invocation when dragEl is inserted (or completed)


    function completed(insertion) {
      dragOverEvent('dragOverCompleted', {
        insertion: insertion
      });

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }

        if (_this !== fromSortable) {
          // Set ghost class to new sortable's ghost class
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }

        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        } // Animation


        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }

        _this.animateAll(function () {
          dragOverEvent('dragOverAnimationComplete');
          _this._ignoreWhileAnimating = null;
        });

        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      } // Null lastTarget if it is not inside a previously swapped element


      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      } // no bubbling and not fallback


      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


        !insertion && nearestEmptyInsertDetectEvent(evt);
      }

      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    } // Call when dragEl has been inserted


    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      _dispatchEvent({
        sortable: _this,
        name: 'change',
        toEl: el,
        newIndex: newIndex,
        newDraggableIndex: newDraggableIndex,
        originalEvent: evt
      });
    }

    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }

    target = closest(target, options.draggable, el, true);
    dragOverEvent('dragOver');
    if (Sortable.eventCanceled) return completedFired;

    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }

    ignoreNextClick = false;

    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
    : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === 'vertical';
      dragRect = getRect(dragEl);
      dragOverEvent('dragOverValid');
      if (Sortable.eventCanceled) return completedFired;

      if (revert) {
        parentEl = rootEl; // actualization

        capture();

        this._hideClone();

        dragOverEvent('revert');

        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }

        return completed(true);
      }

      var elLastChild = lastChild(el, options.draggable);

      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        // If already at end of list: Do not insert
        if (elLastChild === dragEl) {
          return completed(false);
        } // assign target only if condition is true


        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }

        if (target) {
          targetRect = getRect(target);
        }

        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0,
            targetBeforeFirstSwap,
            differentLevel = dragEl.parentNode !== el,
            differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
            side1 = vertical ? 'top' : 'left',
            scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
            scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }

        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;

        if (direction !== 0) {
          // Check if target is beside dragEl in respective direction (ignoring hidden elements)
          var dragIndex = index(dragEl);

          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
        } // If dragEl is already beside target: Do not insert


        if (direction === 0 || sibling === target) {
          return completed(false);
        }

        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling,
            after = false;
        after = direction === 1;

        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }

          _silent = true;
          setTimeout(_unsilent, 30);
          capture();

          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          } // Undo chrome's scroll adjustment (has no effect on other browsers)


          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }

          parentEl = dragEl.parentNode; // actualization
          // must be done before animation

          if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }

          changed();
          return completed(true);
        }
      }

      if (el.contains(dragEl)) {
        return completed(false);
      }
    }

    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, 'mousemove', this._onTouchMove);
    off(document, 'touchmove', this._onTouchMove);
    off(document, 'pointermove', this._onTouchMove);
    off(document, 'dragover', nearestEmptyInsertDetectEvent);
    off(document, 'mousemove', nearestEmptyInsertDetectEvent);
    off(document, 'touchmove', nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._onDrop);
    off(ownerDocument, 'touchend', this._onDrop);
    off(ownerDocument, 'pointerup', this._onDrop);
    off(ownerDocument, 'touchcancel', this._onDrop);
    off(document, 'selectstart', this);
  },
  _onDrop: function _onDrop(
  /**Event*/
  evt) {
    var el = this.el,
        options = this.options; // Get the index of the dragged element within its parent

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent('drop', this, {
      evt: evt
    });
    parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);

    if (Sortable.eventCanceled) {
      this._nulling();

      return;
    }

    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);

    _cancelNextTick(this.cloneId);

    _cancelNextTick(this._dragStartId); // Unbind events


    if (this.nativeDraggable) {
      off(document, 'drop', this);
      off(el, 'dragstart', this._onDragStart);
    }

    this._offMoveEvents();

    this._offUpEvents();

    if (Safari) {
      css(document.body, 'user-select', '');
    }

    css(dragEl, 'transform', '');

    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }

      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        // Remove clone(s)
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }

      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, 'dragend', this);
        }

        _disableDraggable(dragEl);

        dragEl.style['will-change'] = ''; // Remove classes
        // ghostClass is added in dragStarted

        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }

        toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

        _dispatchEvent({
          sortable: this,
          name: 'unchoose',
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });

        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            // Add event
            _dispatchEvent({
              rootEl: parentEl,
              name: 'add',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            }); // Remove event


            _dispatchEvent({
              sortable: this,
              name: 'remove',
              toEl: parentEl,
              originalEvent: evt
            }); // drag from one list and drop into another


            _dispatchEvent({
              rootEl: parentEl,
              name: 'sort',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });

            _dispatchEvent({
              sortable: this,
              name: 'sort',
              toEl: parentEl,
              originalEvent: evt
            });
          }

          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              // drag & drop within the same list
              _dispatchEvent({
                sortable: this,
                name: 'update',
                toEl: parentEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }

        if (Sortable.active) {
          /* jshint eqnull:true */
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }

          _dispatchEvent({
            sortable: this,
            name: 'end',
            toEl: parentEl,
            originalEvent: evt
          }); // Save sorting


          this.save();
        }
      }
    }

    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent('nulling', this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function (el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(
  /**Event*/
  evt) {
    switch (evt.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(evt);

        break;

      case 'dragenter':
      case 'dragover':
        if (dragEl) {
          this._onDragOver(evt);

          _globalDragOver(evt);
        }

        break;

      case 'selectstart':
        evt.preventDefault();
        break;
    }
  },

  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [],
        el,
        children = this.el.children,
        i = 0,
        n = children.length,
        options = this.options;

    for (; i < n; i++) {
      el = children[i];

      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }

    return order;
  },

  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order) {
    var items = {},
        rootEl = this.el;
    this.toArray().forEach(function (id, i) {
      var el = rootEl.children[i];

      if (closest(el, this.options.draggable, rootEl, false)) {
        items[id] = el;
      }
    }, this);
    order.forEach(function (id) {
      if (items[id]) {
        rootEl.removeChild(items[id]);
        rootEl.appendChild(items[id]);
      }
    });
  },

  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },

  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;

    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);

      if (typeof modifiedValue !== 'undefined') {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }

      if (name === 'group') {
        _prepareGroup(options);
      }
    }
  },

  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent('destroy', this);
    var el = this.el;
    el[expando] = null;
    off(el, 'mousedown', this._onTapStart);
    off(el, 'touchstart', this._onTapStart);
    off(el, 'pointerdown', this._onTapStart);

    if (this.nativeDraggable) {
      off(el, 'dragover', this);
      off(el, 'dragenter', this);
    } // Remove draggable attributes


    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
      el.removeAttribute('draggable');
    });

    this._onDrop();

    this._disableDelayedDragEvents();

    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent('hideClone', this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, 'display', 'none');

      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }

      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable) {
    if (putSortable.lastPutMode !== 'clone') {
      this._hideClone();

      return;
    }

    if (cloneHidden) {
      pluginEvent('showClone', this);
      if (Sortable.eventCanceled) return; // show clone at dragEl or original position

      if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }

      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }

      css(cloneEl, 'display', '');
      cloneHidden = false;
    }
  }
};

function _globalDragOver(
/**Event*/
evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }

  evt.cancelable && evt.preventDefault();
}

function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt,
      sortable = fromEl[expando],
      onMoveFn = sortable.options.onMove,
      retVal; // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent('move', {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);
  }

  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);

  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }

  return retVal;
}

function _disableDraggable(el) {
  el.draggable = false;
}

function _unsilent() {
  _silent = false;
}

function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}

function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
      targetLength = vertical ? targetRect.height : targetRect.width,
      targetS1 = vertical ? targetRect.top : targetRect.left,
      targetS2 = vertical ? targetRect.bottom : targetRect.right,
      invert = false;

  if (!invertSwap) {
    // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
      // check if past first invert threshold on side opposite of lastDirection
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        // past first invert threshold, do not restrict inverted threshold to dragEl shadow
        pastFirstInvertThresh = true;
      }

      if (!pastFirstInvertThresh) {
        // dragEl shadow (target move distance shadow)
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
        : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      // Regular
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }

  invert = invert || invertSwap;

  if (invert) {
    // Invert of regular
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }

  return 0;
}
/**
 * Gets the direction dragEl must be swapped relative to target in order to make it
 * seem that dragEl has been "inserted" into that element's position
 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
 * @return {Number}                   Direction dragEl must be swapped
 */


function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
/**
 * Generate id
 * @param   {HTMLElement} el
 * @returns {String}
 * @private
 */


function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent,
      i = str.length,
      sum = 0;

  while (i--) {
    sum += str.charCodeAt(i);
  }

  return sum.toString(36);
}

function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName('input');
  var idx = inputs.length;

  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}

function _nextTick(fn) {
  return setTimeout(fn, 0);
}

function _cancelNextTick(id) {
  return clearTimeout(id);
} // Fixed #973:


if (documentExists) {
  on(document, 'touchmove', function (evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
} // Export utils


Sortable.utils = {
  on: on,
  off: off,
  css: css,
  find: find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend,
  throttle: throttle,
  closest: closest,
  toggleClass: toggleClass,
  clone: clone,
  index: index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild: getChild
};
/**
 * Get the Sortable instance of an element
 * @param  {HTMLElement} element The element
 * @return {Sortable|undefined}         The instance of Sortable
 */

Sortable.get = function (element) {
  return element[expando];
};
/**
 * Mount a plugin to Sortable
 * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
 */


Sortable.mount = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins[0].constructor === Array) plugins = plugins[0];
  plugins.forEach(function (plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }

    if (plugin.utils) Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
    PluginManager.mount(plugin);
  });
};
/**
 * Create sortable instance
 * @param {HTMLElement}  el
 * @param {Object}      [options]
 */


Sortable.create = function (el, options) {
  return new Sortable(el, options);
}; // Export


Sortable.version = version;
var autoScrolls = [],
    scrollEl,
    scrollRootEl,
    scrolling = false,
    lastAutoScrollX,
    lastAutoScrollY,
    touchEvt$1,
    pointerElemChangedInterval;

function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    }; // Bind all private methods

    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
  }

  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;

      if (this.sortable.nativeDraggable) {
        on(document, 'dragover', this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, 'touchmove', this._handleFallbackAutoScroll);
        } else {
          on(document, 'mousemove', this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent; // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)

      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop() {
      if (this.sortable.nativeDraggable) {
        off(document, 'dragover', this._handleAutoScroll);
      } else {
        off(document, 'pointermove', this._handleFallbackAutoScroll);
        off(document, 'touchmove', this._handleFallbackAutoScroll);
        off(document, 'mousemove', this._handleFallbackAutoScroll);
      }

      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;

      var x = (evt.touches ? evt.touches[0] : evt).clientX,
          y = (evt.touches ? evt.touches[0] : evt).clientY,
          elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt; // IE does not seem to have native autoscroll,
      // Edge's autoscroll seems too conditional,
      // MACOS Safari does not have autoscroll,
      // Firefox and Chrome are good

      if (fallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

        var ogElemScroller = getParentAutoScrollElement(elem, true);

        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

          pointerElemChangedInterval = setInterval(function () {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }

            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }

        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: 'scroll',
    initializeByDefault: true
  });
}

function clearAutoScrolls() {
  autoScrolls.forEach(function (autoScroll) {
    clearInterval(autoScroll.pid);
  });
  autoScrolls = [];
}

function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}

var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
  // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX,
      y = (evt.touches ? evt.touches[0] : evt).clientY,
      sens = options.scrollSensitivity,
      speed = options.scrollSpeed,
      winScroller = getWindowScrollingElement();
  var scrollThisInstance = false,
      scrollCustomFn; // New scroll root, set scrollEl

  if (scrollRootEl !== rootEl) {
    scrollRootEl = rootEl;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;

    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl, true);
    }
  }

  var layersOut = 0;
  var currentParent = scrollEl;

  do {
    var el = currentParent,
        rect = getRect(el),
        top = rect.top,
        bottom = rect.bottom,
        left = rect.left,
        right = rect.right,
        width = rect.width,
        height = rect.height,
        canScrollX = void 0,
        canScrollY = void 0,
        scrollWidth = el.scrollWidth,
        scrollHeight = el.scrollHeight,
        elCSS = css(el),
        scrollPosX = el.scrollLeft,
        scrollPosY = el.scrollTop;

    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
    }

    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }

    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);

      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        /* jshint loopfunc:true */

        autoScrolls[layersOut].pid = setInterval(function () {
          // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

          }

          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

          if (typeof scrollCustomFn === 'function') {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
              return;
            }
          }

          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }

    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

  scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
}, 30);

var drop = function drop(_ref) {
  var originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      dragEl = _ref.dragEl,
      activeSortable = _ref.activeSortable,
      dispatchSortableEvent = _ref.dispatchSortableEvent,
      hideGhostForTarget = _ref.hideGhostForTarget,
      unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();

  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent('spill');
    this.onSpill({
      dragEl: dragEl,
      putSortable: putSortable
    });
  }
};

function Revert() {}

Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl = _ref3.dragEl,
        putSortable = _ref3.putSortable;
    this.sortable.captureAnimationState();

    if (putSortable) {
      putSortable.captureAnimationState();
    }

    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl);
    }

    this.sortable.animateAll();

    if (putSortable) {
      putSortable.animateAll();
    }
  },
  drop: drop
};

_extends(Revert, {
  pluginName: 'revertOnSpill'
});

function Remove() {}

Remove.prototype = {
  onSpill: function onSpill(_ref4) {
    var dragEl = _ref4.dragEl,
        putSortable = _ref4.putSortable;
    var parentSortable = putSortable || this.sortable;
    parentSortable.captureAnimationState();
    dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
    parentSortable.animateAll();
  },
  drop: drop
};

_extends(Remove, {
  pluginName: 'removeOnSpill'
});

var lastSwapEl;

function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: 'sortable-swap-highlight'
    };
  }

  Swap.prototype = {
    dragStart: function dragStart(_ref) {
      var dragEl = _ref.dragEl;
      lastSwapEl = dragEl;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed,
          target = _ref2.target,
          onMove = _ref2.onMove,
          activeSortable = _ref2.activeSortable,
          changed = _ref2.changed,
          cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el,
          options = this.options;

      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;

        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }

        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }

      changed();
      completed(true);
      cancel();
    },
    drop: function drop(_ref3) {
      var activeSortable = _ref3.activeSortable,
          putSortable = _ref3.putSortable,
          dragEl = _ref3.dragEl;
      var toSortable = putSortable || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

      if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: 'swap',
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}

function swapNodes(n1, n2) {
  var p1 = n1.parentNode,
      p2 = n2.parentNode,
      i1,
      i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);

  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }

  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

var multiDragElements = [],
    multiDragClones = [],
    lastMultiDragSelect,
    // for selection with modifier key down (SHIFT)
multiDragSortable,
    initialFolding = false,
    // Initial multi-drag fold when drag started
folding = false,
    // Folding any other time
dragStarted = false,
    dragEl$1,
    clonesFromRect,
    clonesHidden;

function MultiDragPlugin() {
  function MultiDrag(sortable) {
    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }

    if (sortable.options.supportPointer) {
      on(document, 'pointerup', this._deselectMultiDrag);
    } else {
      on(document, 'mouseup', this._deselectMultiDrag);
      on(document, 'touchend', this._deselectMultiDrag);
    }

    on(document, 'keydown', this._checkKeyDown);
    on(document, 'keyup', this._checkKeyUp);
    this.defaults = {
      selectedClass: 'sortable-selected',
      multiDragKey: null,
      setData: function setData(dataTransfer, dragEl) {
        var data = '';

        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function (multiDragElement, i) {
            data += (!i ? '' : ', ') + multiDragElement.textContent;
          });
        } else {
          data = dragEl.textContent;
        }

        dataTransfer.setData('Text', data);
      }
    };
  }

  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable,
          cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;

      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style['will-change'] = '';
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }

      sortable._hideClone();

      cancel();
    },
    clone: function clone(_ref3) {
      var sortable = _ref3.sortable,
          rootEl = _ref3.rootEl,
          dispatchSortableEvent = _ref3.dispatchSortableEvent,
          cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;

      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl);
          dispatchSortableEvent('clone');
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown,
          rootEl = _ref4.rootEl,
          cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl);
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', '');
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;

      var sortable = _ref5.sortable,
          cloneNowHidden = _ref5.cloneNowHidden,
          cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', 'none');

        if (_this.options.removeCloneOnHide && clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;

      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }

      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      }); // Sort multi-drag elements

      multiDragElements = multiDragElements.sort(function (a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted(_ref7) {
      var _this2 = this;

      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;

      if (this.options.sort) {
        // Capture rects,
        // hide multi drag elements (by positioning them absolute),
        // set multi drag elements rects to dragRect,
        // show multi drag elements,
        // animate to rects,
        // unset rects & remove from DOM
        sortable.captureAnimationState();

        if (this.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, 'position', 'absolute');
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }

      sortable.animateAll(function () {
        folding = false;
        initialFolding = false;

        if (_this2.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
        } // Remove all auxiliary multidrag items from el, if sorting enabled


        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target,
          completed = _ref8.completed,
          cancel = _ref8.cancel;

      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable,
          rootEl = _ref9.rootEl,
          sortable = _ref9.sortable,
          dragRect = _ref9.dragRect;

      if (multiDragElements.length > 1) {
        // Setup unfold animation
        multiDragElements.forEach(function (multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable,
          isOwner = _ref10.isOwner,
          insertion = _ref10.insertion,
          activeSortable = _ref10.activeSortable,
          parentEl = _ref10.parentEl,
          putSortable = _ref10.putSortable;
      var options = this.options;

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        }

        initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
          // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
            // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

            parentEl.appendChild(multiDragElement);
          });
          folding = true;
        } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


        if (!isOwner) {
          // Only remove if not folding (folding will remove them anyways)
          if (!folding) {
            removeMultiDragElements();
          }

          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;

            activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function (clone) {
                activeSortable.addAnimationState({
                  target: clone,
                  rect: clonesFromRect
                });
                clone.fromRect = clonesFromRect;
                clone.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect,
          isOwner = _ref11.isOwner,
          activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });

      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop(_ref12) {
      var evt = _ref12.originalEvent,
          rootEl = _ref12.rootEl,
          parentEl = _ref12.parentEl,
          sortable = _ref12.sortable,
          dispatchSortableEvent = _ref12.dispatchSortableEvent,
          oldIndex = _ref12.oldIndex,
          putSortable = _ref12.putSortable;
      var toSortable = putSortable || this.sortable;
      if (!evt) return;
      var options = this.options,
          children = parentEl.children; // Multi-drag selection

      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }

        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'select',
            targetEl: dragEl$1,
            originalEvt: evt
          }); // Modifier activated, select from last to dragEl

          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect),
                currentIndex = index(dragEl$1);

            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              // Must include lastMultiDragSelect (select it), in case modified selection from no selection
              // (but previous selection existed)
              var n, i;

              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }

              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: children[i],
                  originalEvt: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }

          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'deselect',
            targetEl: dragEl$1,
            originalEvt: evt
          });
        }
      } // Multi-drag drop


      if (dragStarted && this.isMultiDrag) {
        // Do not "unfold" after around dragEl if reverted
        if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1),
              multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();

          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function (multiDragElement) {
                multiDragElement.thisAnimationDuration = null;

                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect; // Prepare unfold animation

                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect: rect
                  });
                }
              });
            } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
            // properly they must all be removed


            removeMultiDragElements();
            multiDragElements.forEach(function (multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl.appendChild(multiDragElement);
              }

              multiDragIndex++;
            }); // If initial folding is done, the elements may have changed position because they are now
            // unfolding around dragEl, even though dragEl may not have his index changed, so update event
            // must be fired here as Sortable will not.

            if (oldIndex === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function (multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });

              if (update) {
                dispatchSortableEvent('update');
              }
            }
          } // Must be done after capturing individual rects (scroll bar)


          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }

        multiDragSortable = toSortable;
      } // Remove clones if necessary


      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        multiDragClones.forEach(function (clone) {
          clone.parentNode && clone.parentNode.removeChild(clone);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();

      off(document, 'pointerup', this._deselectMultiDrag);
      off(document, 'mouseup', this._deselectMultiDrag);
      off(document, 'touchend', this._deselectMultiDrag);
      off(document, 'keydown', this._checkKeyDown);
      off(document, 'keyup', this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

      if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

      if (evt && evt.button !== 0) return;

      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: 'deselect',
          targetEl: el,
          originalEvt: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: 'multiDrag',
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();

          multiDragSortable = sortable;
        }

        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },

      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando],
            index = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;

      var oldIndicies = [],
          newIndicies = [];
      multiDragElements.forEach(function (multiDragElement) {
        oldIndicies.push({
          multiDragElement: multiDragElement,
          index: multiDragElement.sortableIndex
        }); // multiDragElements will already be sorted if folding

        var newIndex;

        if (folding && multiDragElement !== dragEl$1) {
          newIndex = -1;
        } else if (folding) {
          newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
        } else {
          newIndex = index(multiDragElement);
        }

        newIndicies.push({
          multiDragElement: multiDragElement,
          index: newIndex
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: oldIndicies,
        newIndicies: newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();

        if (key === 'ctrl') {
          key = 'Control';
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }

        return key;
      }
    }
  });
}

function insertMultiDragElements(clonesInserted, rootEl) {
  multiDragElements.forEach(function (multiDragElement, i) {
    var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(multiDragElement, target);
    } else {
      rootEl.appendChild(multiDragElement);
    }
  });
}
/**
 * Insert multi-drag clones
 * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
 * @param  {HTMLElement} rootEl
 */


function insertMultiDragClones(elementsInserted, rootEl) {
  multiDragClones.forEach(function (clone, i) {
    var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(clone, target);
    } else {
      rootEl.appendChild(clone);
    }
  });
}

function removeMultiDragElements() {
  multiDragElements.forEach(function (multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}

Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
var _default = Sortable;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCallNotification = void 0;

const isCallNotification = message => {
  return message.method !== undefined && message.method === 'call';
};

exports.isCallNotification = isCallNotification;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isClearResponse = void 0;

const isClearResponse = message => {
  return message.error === null && typeof message.id === 'number';
};

exports.isClearResponse = isClearResponse;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = void 0;

var _fastUniqueNumbers = require("fast-unique-numbers");

var _callNotification = require("./guards/call-notification");

var _clearResponse = require("./guards/clear-response");

const load = url => {
  // Prefilling the Maps with a function indexed by zero is necessary to be compliant with the specification.
  const scheduledIntervalFunctions = new Map([[0, () => {}]]); // tslint:disable-line no-empty

  const scheduledTimeoutFunctions = new Map([[0, () => {}]]); // tslint:disable-line no-empty

  const unrespondedRequests = new Map();
  const worker = new Worker(url);
  worker.addEventListener('message', ({
    data
  }) => {
    if ((0, _callNotification.isCallNotification)(data)) {
      const {
        params: {
          timerId,
          timerType
        }
      } = data;

      if (timerType === 'interval') {
        const idOrFunc = scheduledIntervalFunctions.get(timerId);

        if (typeof idOrFunc === 'number') {
          const timerIdAndTimerType = unrespondedRequests.get(idOrFunc);

          if (timerIdAndTimerType === undefined || timerIdAndTimerType.timerId !== timerId || timerIdAndTimerType.timerType !== timerType) {
            throw new Error('The timer is in an undefined state.');
          }
        } else if (typeof idOrFunc !== 'undefined') {
          idOrFunc();
        } else {
          throw new Error('The timer is in an undefined state.');
        }
      } else if (timerType === 'timeout') {
        const idOrFunc = scheduledTimeoutFunctions.get(timerId);

        if (typeof idOrFunc === 'number') {
          const timerIdAndTimerType = unrespondedRequests.get(idOrFunc);

          if (timerIdAndTimerType === undefined || timerIdAndTimerType.timerId !== timerId || timerIdAndTimerType.timerType !== timerType) {
            throw new Error('The timer is in an undefined state.');
          }
        } else if (typeof idOrFunc !== 'undefined') {
          idOrFunc(); // A timeout can be savely deleted because it is only called once.

          scheduledTimeoutFunctions.delete(timerId);
        } else {
          throw new Error('The timer is in an undefined state.');
        }
      }
    } else if ((0, _clearResponse.isClearResponse)(data)) {
      const {
        id
      } = data;
      const timerIdAndTimerType = unrespondedRequests.get(id);

      if (timerIdAndTimerType === undefined) {
        throw new Error('The timer is in an undefined state.');
      }

      const {
        timerId,
        timerType
      } = timerIdAndTimerType;
      unrespondedRequests.delete(id);

      if (timerType === 'interval') {
        scheduledIntervalFunctions.delete(timerId);
      } else {
        scheduledTimeoutFunctions.delete(timerId);
      }
    } else {
      const {
        error: {
          message
        }
      } = data;
      throw new Error(message);
    }
  });

  const clearInterval = timerId => {
    const id = (0, _fastUniqueNumbers.generateUniqueNumber)(unrespondedRequests);
    unrespondedRequests.set(id, {
      timerId,
      timerType: 'interval'
    });
    scheduledIntervalFunctions.set(timerId, id);
    worker.postMessage({
      id,
      method: 'clear',
      params: {
        timerId,
        timerType: 'interval'
      }
    });
  };

  const clearTimeout = timerId => {
    const id = (0, _fastUniqueNumbers.generateUniqueNumber)(unrespondedRequests);
    unrespondedRequests.set(id, {
      timerId,
      timerType: 'timeout'
    });
    scheduledTimeoutFunctions.set(timerId, id);
    worker.postMessage({
      id,
      method: 'clear',
      params: {
        timerId,
        timerType: 'timeout'
      }
    });
  };

  const setInterval = (func, delay) => {
    const timerId = (0, _fastUniqueNumbers.generateUniqueNumber)(scheduledIntervalFunctions);
    scheduledIntervalFunctions.set(timerId, () => {
      func(); // Doublecheck if the interval should still be rescheduled because it could have been cleared inside of func().

      if (typeof scheduledIntervalFunctions.get(timerId) === 'function') {
        worker.postMessage({
          id: null,
          method: 'set',
          params: {
            delay,
            now: performance.now(),
            timerId,
            timerType: 'interval'
          }
        });
      }
    });
    worker.postMessage({
      id: null,
      method: 'set',
      params: {
        delay,
        now: performance.now(),
        timerId,
        timerType: 'interval'
      }
    });
    return timerId;
  };

  const setTimeout = (func, delay) => {
    const timerId = (0, _fastUniqueNumbers.generateUniqueNumber)(scheduledTimeoutFunctions);
    scheduledTimeoutFunctions.set(timerId, func);
    worker.postMessage({
      id: null,
      method: 'set',
      params: {
        delay,
        now: performance.now(),
        timerId,
        timerType: 'timeout'
      }
    });
    return timerId;
  };

  return {
    clearInterval,
    clearTimeout,
    setInterval,
    setTimeout
  };
};

exports.load = load;

},{"./guards/call-notification":5,"./guards/clear-response":6,"fast-unique-numbers":3}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLoadWorkerTimers = void 0;
let workerTimers = null;

const createLoadWorkerTimers = (load, worker) => {
  return () => {
    if (workerTimers !== null) {
      return workerTimers;
    }

    const blob = new Blob([worker], {
      type: 'application/javascript; charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    workerTimers = load(url); // Bug #1: Edge doesn't like the URL to be revoked directly.

    workerTimers.setTimeout(() => URL.revokeObjectURL(url), 0);
    return workerTimers;
  };
};

exports.createLoadWorkerTimers = createLoadWorkerTimers;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  clearInterval: true,
  clearTimeout: true,
  setInterval: true,
  setTimeout: true
};
exports.setTimeout = exports.setInterval = exports.clearTimeout = exports.clearInterval = void 0;

var _workerTimersBroker = require("worker-timers-broker");

var _loadWorkerTimers = require("./factories/load-worker-timers");

var _worker = require("./worker/worker");

var _index = require("./types/index");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
const loadWorkerTimers = (0, _loadWorkerTimers.createLoadWorkerTimers)(_workerTimersBroker.load, _worker.worker);

const clearInterval = timerId => loadWorkerTimers().clearInterval(timerId);

exports.clearInterval = clearInterval;

const clearTimeout = timerId => loadWorkerTimers().clearTimeout(timerId);

exports.clearTimeout = clearTimeout;

const setInterval = (func, delay) => loadWorkerTimers().setInterval(func, delay);

exports.setInterval = setInterval;

const setTimeout = (func, delay) => loadWorkerTimers().setTimeout(func, delay);

exports.setTimeout = setTimeout;

},{"./factories/load-worker-timers":8,"./types/index":10,"./worker/worker":14,"worker-timers-broker":7}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadWorkerTimersFactory = require("./load-worker-timers-factory");

Object.keys(_loadWorkerTimersFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _loadWorkerTimersFactory[key];
    }
  });
});

var _loadWorkerTimersFunction = require("./load-worker-timers-function");

Object.keys(_loadWorkerTimersFunction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _loadWorkerTimersFunction[key];
    }
  });
});

var _workerTimers = require("./worker-timers");

Object.keys(_workerTimers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _workerTimers[key];
    }
  });
});

},{"./load-worker-timers-factory":11,"./load-worker-timers-function":12,"./worker-timers":13}],11:[function(require,module,exports){

},{}],12:[function(require,module,exports){

},{}],13:[function(require,module,exports){

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.worker = void 0;
// This is the minified and stringified code of the worker-timers-worker package.
const worker = `!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=14)}([function(e,n,t){"use strict";t.d(n,"a",(function(){return i})),t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return a})),t.d(n,"d",(function(){return d}));const r=new Map,o=new Map,i=e=>{const n=r.get(e);if(void 0===n)throw new Error('There is no interval scheduled with the given id "'.concat(e,'".'));clearTimeout(n),r.delete(e)},u=e=>{const n=o.get(e);if(void 0===n)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(n),o.delete(e)},f=(e,n)=>{let t,r;if("performance"in self){const o=performance.now();t=o,r=e-Math.max(0,o-n)}else t=Date.now(),r=e;return{expected:t+r,remainingDelay:r}},c=(e,n,t,r)=>{const o="performance"in self?performance.now():Date.now();o>t?postMessage({id:null,method:"call",params:{timerId:n,timerType:r}}):e.set(n,setTimeout(c,t-o,e,n,t,r))},a=(e,n,t)=>{const{expected:o,remainingDelay:i}=f(e,t);r.set(n,setTimeout(c,i,r,n,o,"interval"))},d=(e,n,t)=>{const{expected:r,remainingDelay:i}=f(e,t);o.set(n,setTimeout(c,i,o,n,r,"timeout"))}},function(e,n,t){"use strict";t.r(n);var r=t(2);for(var o in r)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(o);var i=t(3);for(var o in i)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(o);var u=t(4);for(var o in u)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(o);var f=t(5);for(var o in f)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return f[e]}))}(o);var c=t(6);for(var o in c)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return c[e]}))}(o);var a=t(7);for(var o in a)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(o);var d=t(8);for(var o in d)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return d[e]}))}(o);var s=t(9);for(var o in s)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return s[e]}))}(o)},function(e,n){},function(e,n){},function(e,n){},function(e,n){},function(e,n){},function(e,n){},function(e,n){},function(e,n){},function(e,n,t){"use strict";t.r(n);var r=t(11);for(var o in r)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(o);var i=t(12);for(var o in i)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(o);var u=t(13);for(var o in u)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(o)},function(e,n){},function(e,n){},function(e,n){},function(e,n,t){"use strict";t.r(n);var r=t(0),o=t(1);for(var i in o)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(i);var u=t(10);for(var i in u)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(i);addEventListener("message",({data:e})=>{try{if("clear"===e.method){const{id:n,params:{timerId:t,timerType:o}}=e;if("interval"===o)Object(r.a)(t),postMessage({error:null,id:n});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));Object(r.b)(t),postMessage({error:null,id:n})}}else{if("set"!==e.method)throw new Error('The given method "'.concat(e.method,'" is not supported'));{const{params:{delay:n,now:t,timerId:o,timerType:i}}=e;if("interval"===i)Object(r.c)(n,o,t);else{if("timeout"!==i)throw new Error('The given type "'.concat(i,'" is not supported'));Object(r.d)(n,o,t)}}}}catch(n){postMessage({error:{message:n.message},id:e.id,result:null})}})}]);`; // tslint:disable-line:max-line-length

exports.worker = worker;

},{}]},{},[1]);

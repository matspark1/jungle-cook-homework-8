import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF1zJ1GlT5MNcwXnLR-fCTR6RYUKpv8E0",
  authDomain: "n315-matspark.firebaseapp.com",
  projectId: "n315-matspark",
  storageBucket: "n315-matspark.appspot.com",
  messagingSenderId: "433038809376",
  appId: "1:433038809376:web:9e60aa02eec927b7231f45",
  measurementId: "G-T0SXRYDX9P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

var signedIn = false;
var initalIngreCount = 3;
var initalInstrCount = 3;
var recipes = [];

$(document).on("click", ".signOut", function (e) {
  signOut(auth)
    .then(() => {
      signedIn = false;
      $("nav ul").html(
        `<li><a href="#home" class="nav-links">Home</a></li>
            <li><a href="#browse" class="nav-links">Browse</a></li>
            <li><a href="#create" class="nav-links">Create Recipe</a></li>
            <li><a href="#login" class="login" id="loginbtn">Login</a></li>
            `
      );
      $(".mobile-menu").html(
        `<li><a href="#home" class="nav-links">Home</a></li>
            <li><a href="#browse" class="nav-links">Browse</a></li>
            <li><a href="#create" class="nav-links">Create Recipe</a></li>
            <li><a href="#login" class="login" id="loginbtn">Login</a></li>
            `
      );
      $(".login").html("Login");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message: " + errorMessage);
    });
});

$(document).on("click", "#signIn", function (e) {
  e.preventDefault();
  let email = $("#email").val();
  let pw = $("#pw").val();
  signInWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
      const user = userCredential.user;
      signedIn = true;
      $("nav ul").html(
        `<li><a href="#home" class="nav-links">Home</a></li>
            <li><a href="#browse" class="nav-links">Browse</a></li>
            <li><a href="#create" class="nav-links">Create Recipe</a></li>
            <li><a href="#yourrecipes" class="nav-links">Your Recipes</a></li>
            <li><a href="#login" class="login signOut" id="loginbtn">Login</a></li>
            `
      );
      $(".mobile-menu").html(
        `<li><a href="#home" class="nav-links">Home</a></li>
            <li><a href="#browse" class="nav-links">Browse</a></li>
            <li><a href="#create" class="nav-links">Create Recipe</a></li>
            <li><a href="#yourrecipes" class="nav-links">Your Recipes</a></li>
            <li><a href="#login" class="login signOut" id="loginbtn">Login</a></li>
            `
      );
      $(".login").html("Logout");
      window.location.hash = "#yourrecipes";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message: " + errorMessage);
    });
});

$(document).on("click", "#createAcctBtn", function (e) {
  e.preventDefault();
  let emailSignUp = $("#emailSignUp").val();
  let pwSignUp = $("#pwSignUp").val();
  createUserWithEmailAndPassword(auth, emailSignUp, pwSignUp)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      signedIn = true;
      $("nav ul").html(
        `<li><a href="#home" class="nav-links">Home</a></li>
            <li><a href="#browse" class="nav-links">Browse</a></li>
            <li><a href="#create" class="nav-links">Create Recipe</a></li>
            <li><a href="#yourrecipes" class="nav-links">Your Recipes</a></li>
            <li><a href="#login" class="login signOut" id="loginbtn">Login</a></li>
            `
      );
      $(".mobile-menu").html(
        `<li><a href="#home" class="nav-links">Home</a></li>
            <li><a href="#browse" class="nav-links">Browse</a></li>
            <li><a href="#create" class="nav-links">Create Recipe</a></li>
            <li><a href="#yourrecipes" class="nav-links">Your Recipes</a></li>
            <li><a href="#login" class="login signOut" id="loginbtn">Login</a></li>
            `
      );
      $(".login").html("Logout");
      window.location.hash = "#yourrecipes";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message: " + errorMessage);
    });
});

function getPage() {
  let hash = window.location.hash;
  let pageID = hash.replace("#", "");

  if (pageID == "home") {
    $.get(`pages/${pageID}.html`, (data) => {
      $("#app").html(data);
    });
  } else if (pageID == "browse") {
    $.get(`pages/${pageID}.html`, (data) => {
      $("#app").html(data);
    });
  } else if (pageID == "login") {
    $.get(`pages/${pageID}.html`, (data) => {
      $("#app").html(data);
    });
  } else if (pageID == "viewrecipe") {
    $.get(`pages/${pageID}.html`, (data) => {
      $("#app").html(data);
    });
  } else if (pageID == "create") {
    $.get(`pages/${pageID}.html`, (data) => {
      $("#app").html(data);
      formAdders();
    }).fail((error) => {
      console.log("Error: " + error);
    });
  } else if (pageID == "yourrecipes") {
    $.get(`pages/${pageID}.html`, (data) => {
      $("#app").html(data);
      recipes = JSON.parse(localStorage.getItem("recipes")) || [];

      if (recipes.length === 0) {
        $(".norecipe").append(`<h4>You have no recipes.</h4>`);
      } else {
        $.each(recipes, (idx, recipe) => {
          $(".recipe-boxes").append(`<div class="recipe-box-ED">
      <div class="recipe-box">
        <div class="recipe-img">
          <a href="#viewrecipe">View</a>
          <img src="${recipe.imagePath}" alt="your recipe" />
        </div>
        <div class="recipe-info">
          <h4>${recipe.recipeName}</h4>
          <p class="recipe-info-desc">
            ${recipe.recipeDesc}
          </p>
          <div class="time">
            <img src="images/time.svg" alt="time" />
            <p>${recipe.recipeTime}</p>
          </div>
          <div class="servings">
            <img src="images/servings.svg" alt="servings" />
            <p>${recipe.recipeServingSize} servings</p>
          </div>
        </div>
      </div>
      <div class="edit-delete-buttons">
        <a href="#">Edit Recipe</a>
        <a href="#">Delete</a>
      </div>
    </div>`);
        });
      }
    }).fail((error) => {
      console.log("Error: " + error);
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    });
  }
}

function addRecipe(newRecipe) {
  recipes.push(newRecipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function formAdders() {
  $(".ingreBtn").on("click", (e) => {
    initalIngreCount++;
    $(".formDesc").append(
      `<input id="ingre${(initalIngreCount -= 1)}" type="text" placeholder="Ingredient #${(initalIngreCount += 1)}" />`
    );
  });
  $(".instrBtn").on("click", (e) => {
    initalInstrCount++;
    $(".formInstr").append(
      `<input id="instr${(initalInstrCount -= 1)}" type="text" placeholder="Instruction #${(initalInstrCount += 1)}" />`
    );
  });

  $(".submit").on("click", (e) => {
    let newItemObj = {};

    let imagePath = $("#imagePath").val();
    let recipeName = $("#recipeName").val();
    let recipeDesc = $("#recipeDesc").val();
    let recipeTime = $("#recipeTime").val();
    let recipeServingSize = $("#recipeServingSize").val();

    newItemObj.imagePath = imagePath;
    newItemObj.recipeName = recipeName;
    newItemObj.recipeDesc = recipeDesc;
    newItemObj.recipeTime = recipeTime;
    newItemObj.recipeServingSize = recipeServingSize;

    newItemObj.ingredients = [];

    $(".formDesc input").each(function (index, data) {
      var value = $(this).val();
      if (value != "") {
        let keyName = "ingredients" + index;
        let ingreObj = {};
        ingreObj[keyName] = value;
        newItemObj.ingredients.push(ingreObj);
      }
    });

    newItemObj.instructions = [];

    $(".formInstr input").each(function (index, data) {
      var value = $(this).val();
      if (value != "") {
        let keyName = "instruction" + index;
        let instrObj = {};
        instrObj[keyName] = value;
        newItemObj.instructions.push(instrObj);
      }
    });

    addRecipe(newItemObj);
    window.location.hash = "#yourrecipes";
  });
}

$(".hamburger-icon").on("click", () => {
  $(".hamburger-icon").toggleClass("open");
  $("body").toggleClass("mobile-overflow");
});

function initListeners() {
  $(window).on("hashchange", getPage);
  getPage();
}

$(document).ready(function () {
  initListeners();
});

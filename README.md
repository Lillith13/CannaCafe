# CannaCafe

![statusBadge](https://img.shields.io/badge/demo-Live-green)

Your One Stop Shop For All Things Relating To Cannabis
Welcome to CannaCafe, the place where your inner child can finally be let loose! This platform is a lively online shop designed for fellow lovers and connoisseurs of the amazing and weirdly controversial herb with calming and healing properties. If you're passionate about the potent and smelly healing herb and an opposer to the government imposed hate directed at the kind and lovely sweetheart that is Cannabis, CannaCafe is the place for you.

[![splashPage](assets/SplashScreen%20-%20logged%20out.png)]("https://cannacafe.onrender.com/")

## Table of Contents

- [CannaCafe](#cannacafe)
  - [Table of Contents](#table-of-contents)
  - [General info](#general-info)
  - [Languages, Frameworks, and Tools](#languages-frameworks-and-tools)
  - [Setup](#setup)
  - [What to Expect](#what-to-expect)
    - [Sign-Up Modal](#sign-up-modal)
    - [Log In Modal](#log-in-modal)
    - [Home Page](#home-page)
    - [Products](#products)
    - [Place Order](#place-order)
    - [Member Profile](#member-profile)
    - [Employee Profile](#employee-profile)
    - [Manager Profile](#manager-profile)
    - [Owner Profile](#owner-profile)
  - [Documetation](#documetation)
  - [Current Features](#current-features)
  - [Future Plans](#future-plans)

## General info

CannaCafe will be a versatile platform seamlessly integrating staff management, e-commerce, and restaurant functionalities. Tailored for businesses, it offers robust staff management tools, ensuring efficient organization. Members enjoy a user-friendly e-commerce and restaurant frontend, streamlining their experience. Additionally, our age-restricted displays provide a secure environment for guests, enhancing user safety and compliance.

## Languages, Frameworks, and Tools

    Python
    JavaScript
    HTML
    CSS
    Flask
    React
    Docker
    AWS
    Node.js
    NPM

## Setup

<!-- how to install if cloned down -->

Startup Backend - from the root of this repository, run the following in the terminal:

- pipenv install -r requirements.txt && pipenv shell
- flask db upgrade && flask seed all && flask run

Startup Frontend - from the file frontend, make sure you are using nvm v16 then run the following in the terminal:

- npm install
- npm start

## What to Expect

### Sign-Up Modal

![SignUpForm](/assets/SignUp/SignUp%20Modal.png)
<!-- show sign-up modal, details requirements & example inputs n outputs -->
<!-- display event of error for all errors -->
Signup Errors display

![SignUpFormErrors](/assets/SignUp/SignUp%20Errors.png)

Birthday is also a requirement (styling to display this will be added soon)

### Log In Modal

![LoginModel](/assets/LogIn/LogInModal.png)

![LoginDemoUsers](/assets/LogIn/showingOffDemoUserDropDown.png)

<!-- ! FIX LOGIN ERROR HANDLING!!! -->
<!-- display modal & show event of error for all errors -->

### Home Page

After clicking the Enter button on the splash page youll be brought here. You can roam as a guest, sign up, or log in.

Roaming as a guest, you can till view some products (non-age-restricted products only) & place orders (takeout & cart)

![Logged out HomePage](/assets/loggedOut_homePage.png)

### Products

![Products By Category]()

Image above is of products rendered by clicking the "Food" button

![Products by Type]()

Image above is of products rendered by clicking on the "View All Products button"

### Place Order

- Shopping Cart
![Empty Cart](/assets/Cart/empty/noItemsInCart.png)
![Filled Cart](/assets/Cart/filled/cart.png)
![Cart Checkout Modal](/assets/Cart/checkout/cartCheckoutModal.png)

- Takeaway Bag
![Empty Takeout Bag](/assets/Cart/empty/noItemsInBag.png)
![Filled Takeout Bag](/assets/Cart/filled/takeoutPT1.png)
![Filled Takeout Bag](/assets/Cart/filled/takeoutPT2.png)
![Takeout Bag Checkout Modal](/assets/Cart/checkout/takeoutCheckoutModal.png)
![Bag Checkout Options Available](/assets/Cart/checkout/OptionsAvailable.png)
![Back Checkout Option Chosen](/assets/Cart/checkout/OptionChosen.png)


<!-- home page logged out -->

<!-- ! Fix conditional for product filtering if not logged in ( @ /products && /menu ) -->
<!-- view all (view all all should not be accessible as guest) -->

### Member Profile

- Edit Account
  - modal
  - errors
- Delete Account
  - modal
- Tabs
  - Your Orders
  - Your Reviews (order by newest)
  - Your Complaints
  - Your Wishlist (shippable products)
  - Your Favorites (menu items)

### Employee Profile

+ Clock in
+ Clock out
+ View paystubs
+ Tabs =>
  - Your Reviews -> null
  - Staff -> Staff Name links to Staff Profile (view only)


### Manager Profile

+ Create New Product/Menu Item Buttons (only difference is whether or not quantity required or not and what categories render to the dropdown)
+ Hire New Employee
- Tab
  - Your Reviews -> View Member Reviews (order by newest)
  - Sent Complaints -> View Member Complaints (order by newest)
  + Staff => Employee Profile, edit button opened to edit role Employee instances

### Owner Profile

<!--  -->


## Documetation

<!-- Links directly to wiki pages for each listed here -->

## Current Features

<!-- group by most universally accessible to least -->

## Future Plans

<!-- order by priority -->

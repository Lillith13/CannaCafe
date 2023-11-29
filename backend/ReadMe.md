# Backend Documentation

## Users

#### GET api/users/

- Returns the information for all users
- Example return ->

  ```js
    { "Users" : {
            `${user.id}`: {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "role": Role.query.get(user.role_id).name,
                "member_since": user.created_at
            }
        }
    }
  ```

#### GET api/users/:userId

- Returns the information for one user
- Login Required
- Example return ->

  ```js
    { "User": {
            "id",
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username": user.username,
            "email": user.email,
            "role": Role.query.get(user.role_id).name,
            "full_address": {
                "address": user.address,
                "city": user.city,
                "state": user.state,
                "zip": user.zipcode
            },
            "member_since": user.created_at
        }
    }
  ```

## Shopping Cart

#### GET api/cart/

- Returns the user's cart
- Example return ->

  ```js
    { "Cart": [
            {
                "id": item.id,
                "preview_image": item.previewImage,
                "name": item.name,
                "description": item.description,
                "price": item.price
            }
        ]
    }
  ```

#### POST api/cart/:itemId

- Adds item to cart based on item id
- Successful example return ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "Age_Restricted": "user must be signed in to add this item",
        "Sold_Out": "item is sold out",
        "Low_Availability": "not enough available"
    }
  }
  ```

#### PUT api/cart/:itemId

- Changes quantity of item in cart
- Successful example return ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "Low_Availability": "not enough available"
    }
  }
  ```

#### DELETE api/cart/:itemId

- Removes item from cart
- Successful example return ->

  ```js
  { "message": "success" }
  ```

## Products

#### GET api/products/

- Different returns dependent on if user logged in or not
- User not logged in returns only items that are not age-restricted
- Example return ->

  ```js
    { "Products": {
            `${product.id}`: {
                "preview_image": item.previewImage,
                "name": product.name,
                "description": product.description,
                "price": product.price
            }
        }
    }
  ```

- User logged in returns ALL items
- Login Required
- Example return ->

  ```js
    { "Products": {
            `${product.id}`: {
                "preview_image": item.previewImage,
                "otherImages": [ product.image1, product.image2 ... ],
                "name": product.name,
                "description": product.description,
                "price": product.price,
            }
        }
    }
  ```

#### GET api/products/:productId

- Different returns dependent on if user logged in or not
- User not logged only has access to non-age-restricted items
- Successful example return ->

  ```js
    { "Products": {
            `${product.id}`: {
                "preview_image": item.previewImage,
                "name": product.name,
                "description": product.description,
                "price": product.price
            }
        }
    }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "Age_Restricted": "user must be signed in to add this item",
        "bad_request": "item doesn't exist"
    }
  }
  ```

- User logged in has access to all items
- Login Required
- Successful example return ->

  ```js
    { "Products": {
            `${product.id}`: {
                "preview_image": item.previewImage,
                "otherImages": [ product.image1, product.image2 ... ],
                "name": product.name,
                "description": product.description,
                "price": product.price,
            }
        }
    }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "item doesn't exist"
    }
  }
  ```

#### POST api/products/

- Creates a new product
- Manager role required
- Log in required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "Not_Authorized": "you do not have the correct role permissions to perform this action"
    }
  }
  ```

#### PUT api/products/:itemId

- Updates/Edits a product based on the item id
- Manager role required
- Log in required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "Not_Authorized": "you do not have the correct role permissions to perform this action"
    }
  }
  ```

#### DELETE api/products/:itemId

- Deletes a product based on the item id
- Manager role required
- Log in required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "Not_Authorized": "you do not have the correct role permissions to perform this action"
    }
  }
  ```

## Wishlist

#### GET api/wishlist/

- Returns all items in user's wishlist
- Login Required
- Example return ->

  ```js
    { "Wishlist": [
            {
                "id": item.id,
                "preview_image": item.previewImage,
                "name": item.name,
                "description": item.description,
                "price": item.price
            }
        ]
    }
  ```

#### POST api/wishlist/:itemId

- Adds item to user's wishlist
- Login Required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "item doesn't exist"
    }
  }
  ```

## Favorites

#### GET api/favorites/

- Returns all items in user's favorites
- Login Required
- Example return ->

  ```js
    { "Favorites": [
            {
                "id": item.id,
                "preview_image": item.previewImage,
                "name": item.name,
                "description": item.description,
                "price": item.price
            }
        ]
    }
  ```

#### POST api/favorites/:itemId

- Adds item to user's favorites
- Login Required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "item doesn't exist"
    }
  }
  ```

## Orders

#### GET api/orders/

- Get all past orders
- Login required
- Example return ->

  ```js
    { "Past_Orders": {
            `${order_id}`: {
                "items_ordered": [
                    `${item.id}`: {
                        "preview_image": item.previewImage,
                        "name": item.name,
                        "description": item.description,
                        "price": item.price,
                        "quantity"
                    },
                ]
                "order_total"
            }
        }
    }
  ```

#### POST api/orders/

- Add items from cart to orders & clears cart
  Cart items stored in local memory not on database
- Login required
  Users not logged in can order but orders for guests are not tracked
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "item doesn't exist",
        "Age_Restricted": "user must be signed in to add this item",
        "Sold_Out": "item is sold out",
        "Low_Availability": "not enough available"
    }
  }
  ```

#### DELETE api/orders/:itemId

- Item returned -> Removes item from orders
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->
  Below errors wont ever trigger at the same time, it's either one or the other

  ```js
  { "errors": {
        "bad_request": "item never ordered",
        "bad_request": "item already returned"
    }
  }
  ```

## Categories

#### GET api/categories/

- Gets all categories
- For displaying on product creation (role:manager use only)
- Example return ->

  ```js
  { "Categories": {
        `${category.id}`: category.name,
    }
  }
  ```

#### GET api/category/:catName

- Gets a category by it's id
- For display on product details (query purposes)
- Returns category name

## Reviews

#### GET api/products/:itemId/reviews

- Get reviews by item id
- Example return ->

  ```js
    { "Product_Reviews": [
            {
                "body": review.review,
                "rating": review.rating
            }
        ]
    }
  ```

- Product has no reviews example return ->

  ```js
    { "Product_Reviews": null }
  ```

#### GET api/reviews/:userId

- Get reviews by user id
- Login required
- For purposes of user access to their posted reviews
- Example return ->

  ```js
    { "User_Reviews": {
            `${item.id}`: {
                "body": review.review,
                "rating": review.rating
            }
        }
    }
  ```

- User has no reviews example return ->

  ```js
    { "User_Reviews": null }
  ```

#### POST api/item/reviews

- Allows users to post reviews on products and menu items
- Login required
- Users can only post one review per item
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->
  never ordered error only triggers for products, not for menu items - because not all menu orders will be in database, user could've ordered at location

  ```js
  { "errors": {
        "bad_request": "item doesn't exist",
        "never_ordered": "you have to have ordered this product to post a review on it"
    }
  }
  ```

## Comlaints

#### GET api/complaints/

- Returns all complaints
- Manager role required
- Log in required
- Example return ->

  ```js
    { "User_Complaints": {
            `${item.id}`: {
                "body": review.review,
                "rating": review.rating
            }
        }
    }
  ```

- User has no reviews example return ->

  ```js
    { "User_Complaints": null }
  ```

#### POST api/complaints/

- Allows members to post a complaint
- Login Required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "body_required": "complaint body is required",
    }
  }
  ```

#### PUT api/complaints/:compId

- Allows members to edit their complaint
- Login required
- Cannot edit a complaint after it has been marked as reviewed
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "complaint doesn't exist",
        "body_required": "complaint body is required"
    }
  }
  ```

#### DELETE api/complaints/:compId

- Allows users to delete their complaint
- Login required
- Can delete complaints at any point in the process
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "complaint doesn't exist",
    }
  }
  ```

## Timecard

#### GET api/timecard/

- Gets the currently signed in employee's current timecard
- Manager or Employee role required
- Login required
- Successful ->

  ```js
  { "message": "success" }
  ```

#### POST api/timecard/clockin

- Allows employee to clockin
- Creates new timecard
- Sets timecard.clock_in to time at moment of button click
- Manager or Employee role required
- Login required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "time_conflict": "already clocked in"
    }
  }
  ```

#### PUT api/timecard/clockout

- Allows employee to clockout
- Sets current timecard.clock_out to time at moment of button click
- Manager or Employee role required
- Login required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "timecard doesn't exist",
        "time_conflict": "not clocked in, cannot clock out before clocking in"
    }
  }
  ```

#### POST api/timecard/new

- Allows management to create a new timecard for past or current date
- Requires all fields filled if timecard date in the past
- Requried only clockin time for timecard date.today()
- Manager role required
- Login Required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "time_conflict": "clock out time cannot come before clock in time"
    }
  }
  ```

#### PUT api/timecard/:empId/:cardId

- Allows management to edit employee timecard
  Locates by employee and timecard ids
- Manager role required
- Login Required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "timecard doesn't exist",
        "time_conflict": "clock out time cannot come before clock in time"
    }
  }
  ```

#### DELETE api/timecard

- Allows management to delete a timecard in instance of mistaken clockin
- Manager role required
- Login Required
- Successful ->

  ```js
  { "message": "success" }
  ```

- Errors example return ->

  ```js
  { "errors": {
        "bad_request": "timecard doesn't exist",
    }
  }
  ```

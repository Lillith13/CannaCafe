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

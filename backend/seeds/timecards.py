#seed_timecards()
# # will update table structure when additional functionality has been added to timecards. As it stands, they only display per day. Update when new table or routes created for weekly/biweekly/monthly paystubs

#seed_timecard_entries()

#
# TABLE STRUCTURE :
#
# user_id = #; --- random from seeded users (bias on members vs employees)
# clocked_in = #; -- random date within the past month
# clocked_out = #; -- random date between clocked_in and clocked_in + 12 hours
# day_pay = #; -- calculated by clocked_out - clocked_in * user's payrate
#

#seed_timecards()

#
# TABLE STRUCTURE :
#
# user_id = #; --- random from seeded users (bias on members vs employees)
# clocked_in = #; -- random date within the past month
# clocked_out = #; -- random date between clocked_in and clocked_in + 12 hours
# day_pay = #; -- calculated by clocked_out - clocked_in * user's payrate
#

# undo_timecards() -- will delete all seeded timecards

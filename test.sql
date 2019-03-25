
-- Step 0.
use burn_notice_db;

-- Step 1. Generate users
insert into users (chief, eligible_for_transfer, email, first_name, last_name, password, sap) values
(false, true, 'mail@mail.mail', 'Kevin', 'Malone', 'pass', '123459'),
(false, true, 'mail@mail.mail', 'Dwight', 'Schrutte', 'pass', '123450'),
(false, true, 'mail@mail.mail', 'Stanley', 'Hudson', 'pass', '123451'),
(false, true, 'mail@mail.mail', 'Angela', 'Martin', 'pass', '123458'),
(false, true, 'mail@mail.mail', 'Kelly', 'Kapur', 'pass', '123489'),
(false, true, 'mail@mail.mail', 'Ryan', 'Howard', 'pass', '123412'),
(false, true, 'mail@mail.mail', 'Jim', 'Halpert', 'pass', '123422'),
(false, true, 'mail@mail.mail', 'Pam', 'Beasley', 'pass', '12222'),
(false, true, 'mail@mail.mail', 'Jan', 'Levinson', 'pass', '12232'),
(false, true, 'mail@mail.mail', 'Phyllis', 'Vance', 'pass', '122111'),
(false, true, 'mail@mail.mail', 'Meridith', 'Palmer', 'pass', '122544'),
(false, true, 'mail@mail.mail', 'Creed', 'Bratton', 'pass', '122594'),
(false, true, 'mail@mail.mail', 'Oscar', 'Martinez', 'pass', '122654'),
(false, true, 'mail@mail.mail', 'Andy', 'Bernard', 'pass', '12224'),
(false, true, 'mail@mail.mail', 'Michael', 'Scott', 'pass', '1134'),
(false, true, 'mail@mail.mail', 'Jermaine', 'Cole', 'pass', '123421'),
(false, true, 'mail@mail.mail', 'Christopher', 'Wallace', 'pass', '98765'),
(false, true, 'mail@mail.mail', 'Biggie', 'Smalls', 'pass', '847364'),
(false, true, 'mail@mail.mail', 'Chris', 'Bridges', 'pass', '832476'),
(false, true, 'mail@mail.mail', 'Kanye', 'West', 'pass', '823465'),
(false, true, 'mail@mail.mail', 'Marshall', 'Mathers', 'pass', '63523'),
(false, true, 'mail@mail.mail', 'Kendrick', 'Lamar', 'pass', '123576'),
(false, true, 'mail@mail.mail', 'Donald', 'Glover', 'pass', '746455'),
(false, true, 'mail@mail.mail', 'Childish', 'Gambino', 'pass', '65544'),
(false, true, 'mail@mail.mail', 'Post', 'Malone', 'pass', '88852'),
(false, true, 'mail@mail.mail', 'Snoop', 'Dogg', 'pass', '88832'),
(false, true, 'mail@mail.mail', 'Lil', 'Dicky', 'pass', '882212'),
(false, true, 'mail@mail.mail', 'Rick', 'Ross', 'pass', '8822221'),
(false, true, 'mail@mail.mail', 'Wiz', 'Khalifa', 'pass', '88221'),
(false, true, 'mail@mail.mail', 'Andre', '3000', 'pass', '88231'),
(false, true, 'mail@mail.mail', 'Kodak', 'Black', 'pass', '88521');

-- Step 2. Make report categories
insert into types (id, name) values
(1, 'Single Family Dwelling Fire'),
(2, 'MultiFamily Dwelling Fire'),
(3, 'Overhaul'),
(4, 'Semi-Truck Fire'),
(5, 'High Rise Fire'),
(6, 'Train Derailment'),
(7, 'Trash Fire');

-- Step 3. Make a new user through the website, make that user a chief manually
UPDATE users SET chief = true WHERE id = 32;

-- Step 4. Make a district
insert into districts(name, chief_id) values ('8-0', 32);

-- Step 5. Generate stations
insert into fire_stations (name, captain_id, district_id) VALUES
('11', 6 , 1),
('38', 7, 1),
('40', 15, 1),
('24', 16, 1);

-- Step 6. Associate users with stations
insert into station_users (station_id, user_id) values
(1, 30),
(1, 25),
(1, 20),
(1, 8),
(1, 4),
(2, 2),
(2, 12),
(2, 21),
(2, 23),
(2, 29),
(3, 31),
(3, 26),
(3, 24),
(3, 31),
(3, 18),
(3, 8),
(4, 28),
(4, 13),
(4, 5),
(4, 1);



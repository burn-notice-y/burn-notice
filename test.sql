drop database burn_notice_db;

create database if not exists burn_notice_db;
use burn_notice_db;



select * from users;

insert into types (id, name) values (1, 'Overhaul');

insert into districts(name, chief_id) values ('8-0', 1);


delete from reports;


select * from reports;

use burn_notice_db;


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
(false, true, 'mail@mail.mail', 'Michael', 'Scott', 'pass', '1134');



insert into types (id, name) values
(1, 'Single Family Dwelling Fire'),
(2, 'MultiFamily Dwelling Fire'),
(3, 'Overhaul'),
(4, 'Semi-Truck Fire'),
(5, 'High Rise Fire'),
(6, 'Train Derailment'),
(7, 'Trash Fire');

insert into districts(name, chief_id) values ('8-0', 16);

insert into fire_stations (name, captain_id, district_id) VALUES
('11', 6 , 1),
('38', 7, 1),
('40', 15, 1);
# note-backe

KOMANDE ZA POKRETANJE APLIKACIJE

1. npm install (instalacija svih neophodinh paketa)

2.Napraviti .env file koji se ne nalazi na projektu

3.Ubaciti sledece podatke u .env file.

DB_NAME=ime_vase_baze

DB_USERNAME=vas_username

DB_PASSWORD=vasa_sifra

DB_HOST=vasa_host_adresa

DB_SECRET = vas_secret_za_pravljenje_tokena

HOST=email_host

SERVICE=email_service

EMAIL= vas_email

PASSWORD= vasa_email_sifra

4 Instalirati postgres bazu

5.Napraviti 2 tabele notes, users

create table notes
(
id                integer default nextval('note_id_seq'::regclass) not null
constraint note_pk
primary key,
note_title        varchar,
note_description  varchar,
created_at        date,
user_id           integer
constraint note_users_id_fk
references users,
notification_time timestamp
);

create table users
(
id         serial
constraint users_pk
primary key,
first_name varchar,
last_name  varchar,
email      varchar,
password   varchar
);

6.Pokrenuti aplikaciju komandom npm start



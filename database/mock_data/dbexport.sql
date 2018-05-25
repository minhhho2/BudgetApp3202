--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: budgets; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE budgets (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    description text,
    amount numeric NOT NULL,
    frequency integer NOT NULL,
    timeunit text NOT NULL,
    end_date timestamp without time zone
);


ALTER TABLE budgets OWNER TO budgetapp;

--
-- Name: budgets_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE budgets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE budgets_id_seq OWNER TO budgetapp;

--
-- Name: budgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE budgets_id_seq OWNED BY budgets.id;


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE expenses (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    description text,
    amount numeric NOT NULL,
    frequency integer,
    timeunit text,
    end_date timestamp without time zone
);


ALTER TABLE expenses OWNER TO budgetapp;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE expenses_id_seq OWNER TO budgetapp;

--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE expenses_id_seq OWNED BY expenses.id;


--
-- Name: incomes; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE incomes (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    description text,
    amount numeric NOT NULL,
    frequency integer,
    timeunit text,
    end_date timestamp without time zone
);


ALTER TABLE incomes OWNER TO budgetapp;

--
-- Name: incomes_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE incomes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE incomes_id_seq OWNER TO budgetapp;

--
-- Name: incomes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE incomes_id_seq OWNED BY incomes.id;


--
-- Name: personal_information; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE personal_information (
    id integer NOT NULL,
    user_id integer,
    first_name text,
    last_name text,
    birthday timestamp without time zone,
    gender text,
    phone_number text,
    email_address text,
    home_address text
);


ALTER TABLE personal_information OWNER TO budgetapp;

--
-- Name: personal_information_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE personal_information_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE personal_information_id_seq OWNER TO budgetapp;

--
-- Name: personal_information_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE personal_information_id_seq OWNED BY personal_information.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE roles (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE roles OWNER TO budgetapp;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE roles_id_seq OWNER TO budgetapp;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE roles_id_seq OWNED BY roles.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE transactions (
    id integer NOT NULL,
    user_id integer,
    description text,
    amount numeric NOT NULL,
    dt timestamp without time zone
);


ALTER TABLE transactions OWNER TO budgetapp;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transactions_id_seq OWNER TO budgetapp;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE transactions_id_seq OWNED BY transactions.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE user_roles (
    id integer NOT NULL,
    user_id integer,
    role_id integer
);


ALTER TABLE user_roles OWNER TO budgetapp;

--
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE user_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_roles_id_seq OWNER TO budgetapp;

--
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE user_roles_id_seq OWNED BY user_roles.id;


--
-- Name: user_settings; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE user_settings (
    id integer NOT NULL,
    user_id integer,
    text_notification boolean,
    email_notification boolean,
    share_data boolean
);


ALTER TABLE user_settings OWNER TO budgetapp;

--
-- Name: user_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE user_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_settings_id_seq OWNER TO budgetapp;

--
-- Name: user_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE user_settings_id_seq OWNED BY user_settings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: budgetapp
--

CREATE TABLE users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    user_name text NOT NULL,
    password_hash text NOT NULL
);


ALTER TABLE users OWNER TO budgetapp;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: budgetapp
--

CREATE SEQUENCE users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO budgetapp;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: budgetapp
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: budgets id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY budgets ALTER COLUMN id SET DEFAULT nextval('budgets_id_seq'::regclass);


--
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY expenses ALTER COLUMN id SET DEFAULT nextval('expenses_id_seq'::regclass);


--
-- Name: incomes id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY incomes ALTER COLUMN id SET DEFAULT nextval('incomes_id_seq'::regclass);


--
-- Name: personal_information id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY personal_information ALTER COLUMN id SET DEFAULT nextval('personal_information_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY transactions ALTER COLUMN id SET DEFAULT nextval('transactions_id_seq'::regclass);


--
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY user_roles ALTER COLUMN id SET DEFAULT nextval('user_roles_id_seq'::regclass);


--
-- Name: user_settings id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY user_settings ALTER COLUMN id SET DEFAULT nextval('user_settings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: budgets; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY budgets (id, user_id, name, description, amount, frequency, timeunit, end_date) FROM stdin;
69	6	Apartment units	purchase that first investment property.	17000.0	0		2021-03-20 00:00:00
70	6	Living home	First home purchase	650000.0	0		2030-02-22 00:00:00
71	6	First car	purchase hilux	55000.0	0		2201-02-22 00:00:00
72	10	Car	Mazda 3	15000.0	0		2019-03-21 00:00:00
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY expenses (id, user_id, name, description, amount, frequency, timeunit, end_date) FROM stdin;
24	6	social food	food	100.0	1	Monthly	2018-09-22 00:00:00
25	10	Auchenflower	rent	160.0	1	Weekly	2018-11-30 00:00:00
23	6	rentals	rent	200.0	1	Weekly	2021-01-20 00:00:00
\.


--
-- Data for Name: incomes; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY incomes (id, user_id, name, description, amount, frequency, timeunit, end_date) FROM stdin;
17	6	practice manual	petrol	25.0	1	Weekly	2019-01-02 00:00:00
18	6	door to door sale	work	20.0	1	Monthly	2020-01-21 00:00:00
20	6	share market booming	investment	25000.0	1	Annually	2019-05-05 00:00:00
19	6	main job	work	500000.0	1	Weekly	2012-02-21 00:00:00
21	10	Amazon	work	2000.0	1	Weekly	\N
22	10	Amazon	bonus	10000.0	1	Annually	\N
\.


--
-- Data for Name: personal_information; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY personal_information (id, user_id, first_name, last_name, birthday, gender, phone_number, email_address, home_address) FROM stdin;
3	9			\N	\N		\N	\N
1	6	Minh	Nguyen	0001-02-18 16:00:00		+61401409922		
4	10			1970-01-01 00:00:00	\N	+61401409922		
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY roles (id, name) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY transactions (id, user_id, description, amount, dt) FROM stdin;
135	6	rent	2133.0	2018-05-25 05:01:07.571116
137	6	work	-2990.0	2018-05-25 05:02:44.54814
138	6	gift	999.0	2018-05-25 05:03:06.13211
139	10	bonus	40000.0	2018-05-25 15:03:40.587254
125	6	petrol	200.0	2018-05-25 04:00:47.699161
129	10	Coffee	5.0	2018-05-25 14:53:11.406594
130	10	food	10.0	2018-05-25 14:53:18.164637
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY user_roles (id, user_id, role_id) FROM stdin;
\.


--
-- Data for Name: user_settings; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY user_settings (id, user_id, text_notification, email_notification, share_data) FROM stdin;
2	9	f	f	f
1	6	f	t	t
3	10	t	f	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: budgetapp
--

COPY users (id, first_name, last_name, user_name, password_hash) FROM stdin;
5	Nik	C	budgetlogin	$2b$12$MzeeLT6UFH8ruouGIu7xeODBn8oYKPucPjBH/rokr.rNIttBivNaq
6	Nik	Chao	budgetapp	$2b$12$1V6M4mPFko6rI2IFIpYw8ewWBiM3NDpn9Pb14wWmD4AMiTvgO3b/O
9			nik123	$2b$12$OR8tYzs.WUZhICHkMauFh.e2dkLH42uxI3Sqt66Jwf/UQ0o.Ib8Ai
10			NikChao	$2b$12$bZecJAFUNkL7SdvPnVYjMuSOeyIPOQZQ7fETrQVJkowzL220YQDma
\.


--
-- Name: budgets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('budgets_id_seq', 72, true);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('expenses_id_seq', 25, true);


--
-- Name: incomes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('incomes_id_seq', 22, true);


--
-- Name: personal_information_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('personal_information_id_seq', 4, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('roles_id_seq', 1, false);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('transactions_id_seq', 139, true);


--
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('user_roles_id_seq', 1, false);


--
-- Name: user_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('user_settings_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: budgetapp
--

SELECT pg_catalog.setval('users_id_seq', 10, true);


--
-- Name: budgets budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: incomes incomes_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY incomes
    ADD CONSTRAINT incomes_pkey PRIMARY KEY (id);


--
-- Name: personal_information personal_information_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY personal_information
    ADD CONSTRAINT personal_information_pkey PRIMARY KEY (id);


--
-- Name: personal_information personal_information_user_id_key; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY personal_information
    ADD CONSTRAINT personal_information_user_id_key UNIQUE (user_id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_settings user_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY user_settings
    ADD CONSTRAINT user_settings_pkey PRIMARY KEY (id);


--
-- Name: user_settings user_settings_user_id_key; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY user_settings
    ADD CONSTRAINT user_settings_user_id_key UNIQUE (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_user_name_key; Type: CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_user_name_key UNIQUE (user_name);


--
-- Name: budgets budgets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY budgets
    ADD CONSTRAINT budgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: expenses expenses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY expenses
    ADD CONSTRAINT expenses_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: incomes incomes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY incomes
    ADD CONSTRAINT incomes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: personal_information personal_information_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY personal_information
    ADD CONSTRAINT personal_information_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id);


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: user_settings user_settings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: budgetapp
--

ALTER TABLE ONLY user_settings
    ADD CONSTRAINT user_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: budgetapp
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO budgetapp;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


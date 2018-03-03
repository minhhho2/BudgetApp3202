CREATE DATABASE budgetapp;

\connect budgetapp postgres

-- All relo tables and other relations are stored in the relo schema
CREATE SCHEMA budgetapp;

-- Look for relations in the relo schema rather than the public schema
ALTER DATABASE budgetapp SET SEARCH_PATH = budgetapp;
SET SEARCH_PATH = budgetapp;
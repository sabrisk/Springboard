DROP DATABASE soccer IF EXISTS

CREATE DATABASE soccer

\c soccer

CREATE TABLE teams (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    team_name TEXT UNIQUE NOT NULL,
    ranking INT
);

CREATE TABLE players (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    player_name TEXT NOT NULL,
    team_id INT NOT NULL REFERENCES teams(id)
);

CREATE TABLE matches (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    season_id INT NOT NULL REFERENCES seasons(id),
    team1_id INT NOT NULL REFERENCES teams(id),
    team2_id INT NOT NULL REFERENCES teams(id),
    team1_score INT NOT NULL,
    team2_score INT NOT NULL
);

CREATE TABLE goals (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    team_id INT NOT NULL REFERENCES teams(id),
    player_id INT NOT NULL REFERENCES players(id),
    match_id INT NOT NULL REFERENCES matches(id),
    team_name TEXT NOT NULL,
    player_name TEXT NOT NULL

);

CREATE TABLE referees (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    referee_name TEXT UNIQUE NOT NULL
);

create table match_referee (
    match_id INT NOT NULL REFERENCES matches(id),
    referee_id INT NOT NULL REFERENCES referees(id),
    PRIMARY KEY (match_id, referee_id)
);

CREATE TABLE seasons (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);
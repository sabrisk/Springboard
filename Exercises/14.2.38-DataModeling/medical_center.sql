DROP DATABASE IF EXISTS medical;

CREATE DATABASE medical;

\c medical

CREATE TABLE centers (id SERIAL PRIMARY KEY, name TEXT, addr TEXT);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    center_id INT NOT NULL,
    FOREIGN KEY (center_id)
        REFERENCES centers(id)
        ON DELETE CASCADE
);


CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL
);

CREATE TABLE doctor_patient (
    doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    PRIMARY KEY (doctor_id, patient_id)
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
    patient_id INTEGER NOT NULL,
    FOREIGN KEY (patient_id)
        REFERENCES patients(id)
        ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL,
    FOREIGN KEY (doctor_id)
        REFERENCES doctors(id)
        ON DELETE CASCADE
);

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE visit_disease (
    visit_id INTEGER NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
    disease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    PRIMARY KEY (visit_id, disease_id)
);
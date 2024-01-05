-- Create schemas

-- Create tables
CREATE TABLE IF NOT EXISTS Conturi
(
    id BIGSERIAL NOT NULL,
    numarCont VARCHAR(20),
    nume VARCHAR(200),
    CAR BOOLEAN,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Persoane
(
    id BIGSERIAL NOT NULL,
    nume VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Tranzactii
(
    id BIGSERIAL NOT NULL,
    explicatii VARCHAR(250),
    debitoare INTEGER,
    creditoare INTEGER,
    suma INTEGER,
    data DATE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Depuneri
(
    id BIGSERIAL NOT NULL,
    persoana INTEGER,
    cont INTEGER,
    suma INTEGER,
    data DATE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Plati
(
    id BIGSERIAL NOT NULL,
    persoana INTEGER,
    cont INTEGER,
    suma INTEGER,
    data DATE,
    PRIMARY KEY(id)
);


-- Create FKs
ALTER TABLE Tranzactii
    ADD    FOREIGN KEY (debitoare)
    REFERENCES Conturi(id)
    MATCH SIMPLE
;
    
ALTER TABLE Tranzactii
    ADD    FOREIGN KEY (creditoare)
    REFERENCES Conturi(id)
    MATCH SIMPLE
;
    
ALTER TABLE Plati
    ADD    FOREIGN KEY (cont)
    REFERENCES Conturi(id)
    MATCH SIMPLE
;
    
ALTER TABLE Depuneri
    ADD    FOREIGN KEY (cont)
    REFERENCES Conturi(id)
    MATCH SIMPLE
;
    
ALTER TABLE Plati
    ADD    FOREIGN KEY (persoana)
    REFERENCES Persoane(id)
    MATCH SIMPLE
;
    
ALTER TABLE Depuneri
    ADD    FOREIGN KEY (persoana)
    REFERENCES Persoane(id)
    MATCH SIMPLE
;
    

-- Create Indexes


1.Felhasználók

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    vezeteknev VARCHAR(50) NOT NULL,
    keresztnev VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    irsz CHAR(4),
    telepules VARCHAR(50),
    cim VARCHAR(100),
    telefon VARCHAR(20),
    jelszo_hash VARCHAR(255) NOT NULL,
    role ENUM('lakos', 'ugyintezo', 'admin', 'fonok') DEFAULT 'lakos'
);

2 Bejelentések

CREATE TABLE problems (
    problem_id INT AUTO_INCREMENT PRIMARY KEY,
    helyszin VARCHAR(100) NOT NULL,         <-:3 legördülő lista értékei
    idopont DATETIME DEFAULT CURRENT_TIMESTAMP,
    kep_url VARCHAR(255),                   
    leiras TEXT,
    assigned_to INT,                       
    status ENUM('Felvéve', 'Folyamatban', 'Kész') DEFAULT 'Felvéve'
);

3. Felhasználó–Bejelentés kapcsolat

CREATE TABLE user_problems (
    user_id INT,
    problem_id INT,
    PRIMARY KEY (user_id, problem_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (problem_id) REFERENCES problems(problem_id)
);
4. Üzenetek

CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    kuldo_id INT,
    cimzett_id INT,
    targy VARCHAR(100),
    uzenet TEXT,
    olvasva BOOLEAN DEFAULT FALSE,
    kuldes_ideje DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kuldo_id) REFERENCES users(user_id),
    FOREIGN KEY (cimzett_id) REFERENCES users(user_id)
);
5. Hírek

CREATE TABLE news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    cim VARCHAR(150),
    datum DATETIME DEFAULT CURRENT_TIMESTAMP,
    tartalom TEXT
);


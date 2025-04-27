-- Fichier insert.sql pour la base de données de gestion de club de basket

-- 1. Insertion des utilisateurs
INSERT INTO "User" ("id", "email", "firstName", "lastName", "role", "createdAt", "updatedAt") VALUES
('admin1', 'admin@club.com', 'Jean', 'Dupont', 'ADMIN', NOW(), NOW()),
('admin2', 'secretary@club.com', 'Marie', 'Martin', 'ADMIN', NOW(), NOW()),
('coach1', 'coach1@club.com', 'Pierre', 'Durand', 'COACH', NOW(), NOW()),
('coach2', 'coach2@club.com', 'Sophie', 'Leroy', 'COACH', NOW(), NOW()),
('coach3', 'coach3@club.com', 'Thomas', 'Moreau', 'COACH', NOW(), NOW()),
('player1', 'player1@club.com', 'Lucas', 'Petit', 'PLAYER', NOW(), NOW()),
('player2', 'player2@club.com', 'Emma', 'Bernard', 'PLAYER', NOW(), NOW()),
('player3', 'player3@club.com', 'Hugo', 'Robert', 'PLAYER', NOW(), NOW()),
('player4', 'player4@club.com', 'Chloé', 'Richard', 'PLAYER', NOW(), NOW()),
('player5', 'player5@club.com', 'Nathan', 'Dubois', 'PLAYER', NOW(), NOW()),
('player6', 'player6@club.com', 'Léa', 'Simon', 'PLAYER', NOW(), NOW()),
('player7', 'player7@club.com', 'Mathis', 'Laurent', 'PLAYER', NOW(), NOW()),
('player8', 'player8@club.com', 'Manon', 'Michel', 'PLAYER', NOW(), NOW()),
('player9', 'player9@club.com', 'Louis', 'Garcia', 'PLAYER', NOW(), NOW()),
('player10', 'player10@club.com', 'Camille', 'David', 'PLAYER', NOW(), NOW());

-- 2. Insertion des entraîneurs
INSERT INTO "Coach" ("id", "userId", "licenseDate") VALUES
('coach1', 'coach1', '2018-06-15'),
('coach2', 'coach2', '2020-03-22'),
('coach3', 'coach3', '2019-11-10');

-- 3. Insertion des joueurs
INSERT INTO "Player" ("id", "userId", "birthDate", "gender", "category", "position", "jerseyNumber", "licenseDate", "licenseExpiry", "isActive") VALUES
('player1', 'player1', '2005-03-12', 'MALE', 'U18', 'Point Guard', 4, '2022-09-01', '2023-08-31', true),
('player2', 'player2', '2004-07-25', 'FEMALE', 'U20', 'Shooting Guard', 8, '2022-09-01', '2023-08-31', true),
('player3', 'player3', '2006-11-03', 'MALE', 'U16', 'Small Forward', 10, '2022-09-01', '2023-08-31', true),
('player4', 'player4', '2007-05-18', 'FEMALE', 'U16', 'Power Forward', 12, '2022-09-01', '2023-08-31', true),
('player5', 'player5', '2003-09-30', 'MALE', 'N1B', 'Center', 15, '2022-09-01', '2023-08-31', true),
('player6', 'player6', '2008-02-14', 'FEMALE', 'U14', 'Point Guard', 5, '2022-09-01', '2023-08-31', true),
('player7', 'player7', '2009-08-22', 'MALE', 'U12', 'Shooting Guard', 7, '2022-09-01', '2023-08-31', true),
('player8', 'player8', '2010-04-05', 'FEMALE', 'U10', 'Small Forward', 9, '2022-09-01', '2023-08-31', true),
('player9', 'player9', '2012-01-19', 'MALE', 'MINI_BASKET', 'Power Forward', 11, '2022-09-01', '2023-08-31', true),
('player10', 'player10', '2004-12-08', 'FEMALE', 'U20', 'Center', 14, '2022-09-01', '2023-08-31', true);

-- 4. Insertion des équipes
INSERT INTO "Team" ("id", "name", "category", "season", "coachId") VALUES
('team1', 'Équipe Senior A', 'N1A', '2022-2023', 'coach1'),
('team2', 'Équipe U20 Masculine', 'U20', '2022-2023', 'coach2'),
('team3', 'Équipe U16 Féminine', 'U16', '2022-2023', 'coach3');

-- 5. Insertion des relations joueurs-équipes
INSERT INTO "_PlayerTeam" ("A", "B") VALUES
('player5', 'team1'),
('player1', 'team2'),
('player10', 'team2'),
('player4', 'team3');

-- 6. Insertion des entraînements
INSERT INTO "Training" ("id", "date", "startTime", "endTime", "teamId", "location", "description", "type") VALUES
('training1', '2023-04-10', '2023-04-10 18:00:00', '2023-04-10 20:00:00', 'team1', 'Gymnase Principal', 'Entraînement tactique', 'TACTICAL'),
('training2', '2023-04-11', '2023-04-11 17:30:00', '2023-04-11 19:30:00', 'team2', 'Gymnase Secondaire', 'Perfectionnement technique', 'TECHNICAL'),
('training3', '2023-04-12', '2023-04-12 19:00:00', '2023-04-12 21:00:00', 'team3', 'Gymnase Principal', 'Match de préparation', 'SCRIMMAGE'),
('training4', '2023-04-13', '2023-04-13 18:00:00', '2023-04-13 20:00:00', 'team1', 'Gymnase Principal', 'Condition physique', 'PHYSICAL'),
('training5', '2023-04-14', '2023-04-14 17:00:00', '2023-04-14 19:00:00', 'team2', 'Gymnase Secondaire', 'Récupération active', 'RECOVERY');

-- 7. Insertion des relations joueurs-entraînements
INSERT INTO "_PlayerTraining" ("A", "B") VALUES
('player5', 'training1'),
('player1', 'training2'),
('player10', 'training2'),
('player4', 'training3'),
('player5', 'training4'),
('player1', 'training5'),
('player10', 'training5');

-- 8. Insertion des équipements
INSERT INTO "Equipment" ("id", "name", "type", "status", "condition", "playerId", "assignedAt", "purchaseDate", "lastMaintenance") VALUES
('equip1', 'Ballon Match', 'BALL', 'AVAILABLE', 'Neuf', NULL, NULL, '2023-01-15', NULL),
('equip2', 'Ballon Entraînement', 'BALL', 'IN_USE', 'Bon état', NULL, NULL, '2022-09-01', '2023-03-20'),
('equip3', 'Maillot Domicile', 'JERSEY', 'AVAILABLE', 'Neuf', NULL, NULL, '2023-02-10', NULL),
('equip4', 'Maillot Extérieur', 'JERSEY', 'IN_USE', 'Bon état', 'player1', '2023-03-01', '2023-02-10', NULL),
('equip5', 'Chaussures Nike', 'SHOES', 'IN_USE', 'Usé', 'player5', '2023-02-15', '2022-11-20', NULL),
('equip6', 'Trousse Médicale', 'MEDICAL', 'AVAILABLE', 'Complète', NULL, NULL, '2023-01-05', '2023-04-01'),
('equip7', 'Kettlebell 12kg', 'OTHER', 'AVAILABLE', 'Neuf', NULL, NULL, '2023-03-15', NULL),
('equip8', 'Plot d''entraînement', 'OTHER', 'IN_USE', 'Bon état', NULL, NULL, '2022-10-10', NULL);

-- 9. Insertion des matchs
INSERT INTO "Match" ("id", "date", "location", "homeTeamId", "awayTeamId", "homeScore", "awayScore", "status", "quarter", "notes") VALUES
('match1', '2023-04-15', 'Gymnase Principal', 'team1', 'team2', 78, 65, 'COMPLETED', 4, 'Match amical'),
('match2', '2023-04-22', 'Gymnase Ville Rivale', 'team3', 'team1', 0, 0, 'SCHEDULED', 1, 'Championnat régional'),
('match3', '2023-04-08', 'Gymnase Secondaire', 'team2', 'team3', 82, 76, 'COMPLETED', 4, 'Match très serré');

-- 10. Insertion des statistiques de match
INSERT INTO "MatchStats" ("id", "matchId", "playerId", "points", "rebounds", "assists", "steals", "blocks", "fouls", "mvp", "playingTime") VALUES
('stats1', 'match1', 'player5', 22, 10, 5, 2, 1, 3, true, 32),
('stats2', 'match1', 'player1', 18, 4, 7, 3, 0, 2, false, 28),
('stats3', 'match3', 'player10', 15, 8, 4, 1, 2, 4, false, 30),
('stats4', 'match3', 'player4', 12, 6, 2, 2, 0, 3, true, 26);

-- 11. Insertion des transports
INSERT INTO "Transport" ("id", "vehicleId", "name", "type", "model", "registration", "capacity") VALUES
('trans1', 'VH123456', 'Bus Club', 'BUS', 'Mercedes Sprinter', 'AB-123-CD', 20),
('trans2', 'VH654321', 'Minibus Equipe', 'MINIBUS', 'Volkswagen Caravelle', 'EF-456-GH', 9),
('trans3', 'VH987654', 'Voiture Coach', 'CAR', 'Peugeot 5008', 'IJ-789-KL', 7);

-- 12. Insertion des maintenances de transport
INSERT INTO "TransportMaintenance" ("id", "transportId", "date", "type", "cost", "description", "mileage", "nextDueDate") VALUES
('maint1', 'trans1', '2023-03-15', 'OIL_CHANGE', 120.50, 'Vidange complète', 125000, '2023-09-15'),
('maint2', 'trans2', '2023-02-28', 'INSPECTION', 85.00, 'Contrôle technique', 87650, '2024-02-28'),
('maint3', 'trans3', '2023-04-01', 'TIRE_CHANGE', 320.75, 'Changement pneus hiver/été', 54320, NULL);

-- 13. Insertion des utilisations de transport
INSERT INTO "TransportUsage" ("id", "transportId", "date", "distance", "purpose", "fuelCost", "totalCost") VALUES
('usage1', 'trans1', '2023-04-02', 120.5, 'Déplacement pour match à Lyon', 45.30, 180.00),
('usage2', 'trans2', '2023-03-25', 85.0, 'Tournoi jeunes à Grenoble', 32.00, 120.50),
('usage3', 'trans3', '2023-04-05', 45.5, 'Réunion fédération', 18.20, 50.00);

-- 14. Insertion des relations joueurs-transports
INSERT INTO "_PlayerTransport" ("A", "B") VALUES
('player1', 'trans1'),
('player5', 'trans1'),
('player10', 'trans1'),
('player4', 'trans2'),
('player1', 'trans2');

-- 15. Insertion des statistiques individuelles
INSERT INTO "Stats" ("id", "playerId", "date", "points", "rebounds", "assists", "steals", "blocks") VALUES
('indiv1', 'player1', '2023-03-15', 12, 4, 6, 2, 0),
('indiv2', 'player4', '2023-03-18', 8, 7, 3, 1, 1),
('indiv3', 'player5', '2023-03-22', 20, 9, 4, 3, 2),
('indiv4', 'player10', '2023-03-25', 14, 5, 5, 2, 0);
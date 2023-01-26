-- Tables
CREATE TABLE exercises (
  id INT PRIMARY KEY AUTO_INCREMENT ,
  name VARCHAR(255),
  body_part VARCHAR(255)
)

CREATE TABLE workouts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at DATE,
  name VARCHAR(255),
  body_parts VARCHAR(255)
)

CREATE TABLE workouts_exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  workout_id INT,
  exercise_id INT,
  set_id INT,
  reps INT,
  weight INT,
  FOREIGN KEY(workout_id) REFERENCES workouts(id),
  FOREIGN KEY(exercise_id) REFERENCES exercises(id)
)

-- Inserts
INSERT INTO exercises (name, body_part) 
VALUES 
  ( "push ups","chest" ),
  ( "pull ups","back" ),
  ( "rows","back" ),
  ( "bench press","chest" ),
  ( "shoulder press","shoulders" ),
  ( "squats","legs" ),
  ( "front squats","legs" ),
  ( "back squats","legs" ),
  ( "flor press","chest" ),
  (  "bicep curls","biceps" ),
  (  "tricep extensions","triceps" ),
  (  "tricep pushdown","triceps" ),
  (  "lat pulldown","back" ),
  (  "weighted rows","back" ),
  (  "barbell rows","back" ),
  (  "dumbell rows","back" ),
  (  "declined push ups","chest" ),
  (  "inclined push ups","chest" )
;

INSERT INTO workouts (name) 
VALUES ("Entrenamiento 1"),
       ("Entrenamiento 2"),
       ("Entrenamiento 3"),
       ("Entrenamiento 4"),
       ("Entrenamiento 5"),
       ("Entrenamiento 6"),
       ("Entrenamiento 7"),
       ("Entrenamiento 8"),
       ("Entrenamiento 9")
;

INSERT INTO workouts_exercises (workout_id, exercise_id, set_id, reps, weight) 
VALUES (1, 1,0,10,10),
       (1, 1,1,10,10),
       (1, 1,2,10,10),
       (1, 4,0,6,10),
       (1, 4,1,6,10),
       (1, 4,2,6,10),
       (1, 7,0,10,0),
       (1, 7,1,10,0),
       (1, 7,2,10,0),
       (1, 7,3,10,0),
       (2, 2,0,10,0),
       (2, 2,1,10,0),
       (2, 2,2,10,0),
       (2, 6,0,3,50),
       (2, 6,1,3,50),
       (2, 6,2,3,50),
       (2, 6,3,3,50),
       (3, 1,0,10,20),
       (3, 1,1,8,25),
       (3, 2,0,12,8),
       (3, 2,1,12,8),
       (3,6,0,10,10),
       (3,6,1,10,10),
       (3,6,2,10,10)
;

-- Views








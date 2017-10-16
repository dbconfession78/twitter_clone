CREATE DATABASE IF NOT EXISTS twitter_clone;
USE twitter_clone
CREATE TABLE IF NOT EXISTS tweets (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, user_id VARCHAR(64) NOT NULL, name VARCHAR(64) NOT NULL, tweet VARCHAR(64) NOT NULL);
DROP USER IF EXISTS 'twitter_admin'@'localhost';
CREATE USER 'twitter_admin'@'localhost';
SET PASSWORD FOR 'twitter_admin'@'localhost' = 'twitter_admin_pwd';
GRANT ALL PRIVILEGES ON twitter_clone.* TO 'twitter_admin'@'localhost';
GRANT SELECT ON performance_schema.* TO 'twitter_admin'@'localhost';

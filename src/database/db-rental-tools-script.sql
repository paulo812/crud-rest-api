-- MySQL Workbench Synchronization
-- Generated: 2020-04-07 20:32
-- Model: toolrentaldb
-- Version: 1.0
-- Project: Projeto Estágio Supera
-- Author: Paulo Cabral

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `toolrentaldb` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE IF NOT EXISTS `toolrentaldb`.`tools` (
  `id_tools` INT(11) NOT NULL AUTO_INCREMENT,
  `tool_id_users` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` FLOAT(11) NULL DEFAULT NULL,
  `owner` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_tools`),
  INDEX `fk_tools_users_idx` (`tool_id_users` ASC),
  CONSTRAINT `fk_tools_users`
    FOREIGN KEY (`tool_id_users`)
    REFERENCES `toolrentaldb`.`users` (`id_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `toolrentaldb`.`users` (
  `id_users` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_users`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `toolrentaldb`.`rentals` (
  `id_rentals` INT(11) NOT NULL AUTO_INCREMENT,
  `rental_id_users` INT(11) NOT NULL,
  `date` DATE NOT NULL,
  `days` SMALLINT(2) NOT NULL,
  PRIMARY KEY (`id_rentals`),
  INDEX `fk_rentals_users1_idx` (`rental_id_users` ASC),
  CONSTRAINT `fk_rentals_users1`
    FOREIGN KEY (`rental_id_users`)
    REFERENCES `toolrentaldb`.`users` (`id_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `toolrentaldb`.`rentals_has_tools` (
  `rentals_id_rentals` INT(11) NOT NULL,
  `tools_id_tools` INT(11) NOT NULL,
  PRIMARY KEY (`rentals_id_rentals`, `tools_id_tools`),
  INDEX `fk_rentals_has_tools_tools1_idx` (`tools_id_tools` ASC),
  INDEX `fk_rentals_has_tools_rentals1_idx` (`rentals_id_rentals` ASC),
  CONSTRAINT `fk_rentals_has_tools_rentals1`
    FOREIGN KEY (`rentals_id_rentals`)
    REFERENCES `toolrentaldb`.`rentals` (`id_rentals`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rentals_has_tools_tools1`
    FOREIGN KEY (`tools_id_tools`)
    REFERENCES `toolrentaldb`.`tools` (`id_tools`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

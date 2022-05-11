-- MySQL Script generated by MySQL Workbench
-- Ср 11 мая 2022 18:23:40
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema PIZZA
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema PIZZA
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PIZZA` ;
USE `PIZZA` ;

-- -----------------------------------------------------
-- Table `PIZZA`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIZZA`.`pizzas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`pizzas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(510) NULL,
  `imageUrl` VARCHAR(510) NULL,
  `price` INT NULL,
  `category` INT NULL,
  `rating` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pizzas_category_idx` (`category` ASC) VISIBLE,
  CONSTRAINT `fk_pizzas_category`
    FOREIGN KEY (`category`)
    REFERENCES `PIZZA`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIZZA`.`types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIZZA`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`sizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIZZA`.`pizzaTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`pizzaTypes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pizzaID` INT NULL,
  `typeID` INT NULL,
  INDEX `fk_pizzaTypes_type_idx` (`typeID` ASC) VISIBLE,
  INDEX `fk_pizzaTypes_pizza_idx` (`pizzaID` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pizzaTypes_type`
    FOREIGN KEY (`typeID`)
    REFERENCES `PIZZA`.`types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pizzaTypes_pizza`
    FOREIGN KEY (`pizzaID`)
    REFERENCES `PIZZA`.`pizzas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIZZA`.`pizzaSizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`pizzaSizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pizzaID` INT NULL,
  `sizeID` INT NULL,
  INDEX `fk_pizzaSizes_size_idx` (`sizeID` ASC) VISIBLE,
  INDEX `fk_pizzaSizes_pizza_idx` (`pizzaID` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pizzaSizes_size`
    FOREIGN KEY (`sizeID`)
    REFERENCES `PIZZA`.`sizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pizzaSizes_pizza`
    FOREIGN KEY (`pizzaID`)
    REFERENCES `PIZZA`.`pizzas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIZZA`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `phoneNumber` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PIZZA`.`userOrders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`userOrders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userID` INT NULL,
  `status` VARCHAR(225) NULL DEFAULT 'processing',
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_userOrders_userID_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_userOrders_userID`
    FOREIGN KEY (`userID`)
    REFERENCES `PIZZA`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `PIZZA`.`pizzaOrders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PIZZA`.`pizzaOrders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orderID` INT NULL,
  `pizzaID` INT NULL,
  `props` VARCHAR(225) NULL,
  `count` INT NULL,
  `totalPrice` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pizzaOrders_pizzaID_idx` (`pizzaID` ASC) VISIBLE,
  INDEX `fk_pizzaOrders_orders_idx` (`orderID` ASC) VISIBLE,
  CONSTRAINT `fk_pizzaOrders_pizzaID`
    FOREIGN KEY (`pizzaID`)
    REFERENCES `PIZZA`.`pizzas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pizzaOrders_orders`
    FOREIGN KEY (`orderID`)
    REFERENCES `PIZZA`.`userOrders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

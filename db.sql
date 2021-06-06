CREATE TABLE `products` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT NOT NULL,
	`price` DECIMAL(14,2) NOT NULL,
	`image` VARCHAR(255) NULL DEFAULT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`) USING BTREE
) COLLATE='latin1_swedish_ci'
ENGINE=InnoDB;
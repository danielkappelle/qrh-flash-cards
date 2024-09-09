CREATE TABLE `access_token` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`token` varchar(255) NOT NULL,
	`used` boolean DEFAULT false,
	CONSTRAINT `access_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `access_token_token_unique` UNIQUE(`token`)
);

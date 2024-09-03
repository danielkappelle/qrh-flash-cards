CREATE TABLE `aircraft` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`slug` varchar(256) NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `aircraft_id` PRIMARY KEY(`id`),
	CONSTRAINT `aircraft_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `checklist` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`slug` varchar(256) NOT NULL,
	`aircraft_id` bigint unsigned NOT NULL,
	`name` varchar(256) NOT NULL,
	`content` varchar(2000),
	CONSTRAINT `checklist_id` PRIMARY KEY(`id`),
	CONSTRAINT `checklist_slug_unique` UNIQUE(`slug`)
);

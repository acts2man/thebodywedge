CREATE TABLE `email_subscribers` (
	`email` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`consent_text` text NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` text NOT NULL,
	`status` text DEFAULT 'subscribed' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lead_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`attempts` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_lead_rate_limits_expires_at` ON `lead_rate_limits` (`expires_at`);--> statement-breakpoint
CREATE TABLE `practitioner_inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`business` text NOT NULL,
	`profession` text NOT NULL,
	`country` text NOT NULL,
	`interest` text NOT NULL,
	`message` text NOT NULL,
	`consent_text` text NOT NULL,
	`created_at` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shorty`
-- CREATE DATABASE `shorty` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
--

-- --------------------------------------------------------

--
-- Table structure for table `shortlinks`
--

CREATE TABLE `shortlinks` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `shortlink` varchar(255) DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shortlinks`
--

INSERT INTO `shortlinks` (`id`, `shortlink`, `user_id`, `url`, `description`, `status`, `tags`, `created_at`, `updated_at`) VALUES
('0f0c7bd7-e91f-4956-b4b8-9289aaf95c04', 'commit-message', 'ddc80231-3f31-4f61-ba07-c56fa431c4cb', 'https://gist.github.com/parmentf/035de27d6ed1dce0b36a', 'git commit emojis', 'active', 'git,backend', '2022-09-17 14:15:36', '2022-09-17 14:15:36'),
('6dff5377-5056-46e1-ab56-dbf2a4711736', 'gmail', 'ddc80231-3f31-4f61-ba07-c56fa431c4cb', 'https://mail.google.com/mail/u/0/#inbox', 'my professional gmail account', 'active', 'mail,backend', '2022-09-17 14:22:26', '2022-09-17 14:22:26'),
('6e24c0b7-ed17-4c17-93fe-924f1c6a3542', 'yahoo-mail', 'ddc80231-3f31-4f61-ba07-c56fa431c4cb', 'https://mail.yahoo.com', 'my yahoo mail account', 'active', 'mail,yahoo', '2022-09-17 14:27:32', '2022-09-17 14:27:32'),
('d8feaa79-fecf-428f-a0f2-86014ef5feed', 'json-minify', 'ddc80231-3f31-4f61-ba07-c56fa431c4cb', 'https://codebeautify.org/jsonminifier', 'minifies json object', 'active', NULL, '2022-09-18 05:10:57', '2022-09-18 05:10:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
('51a218ef-d809-4b12-96be-8d1a15e63d12', 'John', 'john@doe.com', '$2a$12$7ArGXPAfa1GewdElelcoRufKMWy9h/Ax0IMRt8QA2J/gG5j3.wisu', '2022-09-17 16:25:57', '2022-09-17 16:25:57'),
('ddc80231-3f31-4f61-ba07-c56fa431c4cb', 'Sohail', 'sohail@doe.com', '$2a$12$0ilMVSO4OyMUbnavXCP2IeaftQPwvpEQ6qElUgYP9IyuynS6LfLLy', '2022-09-17 07:26:02', '2022-09-17 07:26:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shortlinks`
--
ALTER TABLE `shortlinks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shortlink_un` (`shortlink`,`user_id`),
  ADD KEY `user_id` (`user_id`);
ALTER TABLE `shortlinks` ADD FULLTEXT KEY `full_text_idx` (`shortlink`,`description`,`tags`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `shortlinks`
--
ALTER TABLE `shortlinks`
  ADD CONSTRAINT `shortlinks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

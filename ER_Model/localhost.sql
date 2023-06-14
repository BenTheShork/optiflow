-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 14, 2023 at 12:30 PM
-- Server version: 10.3.39-MariaDB
-- PHP Version: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gpchosting_optiflowdb`
--
CREATE DATABASE IF NOT EXISTS `gpchosting_optiflowdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `gpchosting_optiflowdb`;

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `process_version_id` int(11) NOT NULL,
  `sequence_number` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `num_people` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `process_version_id`, `sequence_number`, `name`, `description`, `duration`, `num_people`, `created_at`, `updated_at`) VALUES
(81, 65, 1, 'Activity 1', 'Some description 1', 24, 6, '2023-06-13 20:44:13', '2023-06-13 21:00:21'),
(82, 65, 2, 'Activity 2', 'Some description 2', 34, 5, '2023-06-13 20:44:38', '2023-06-13 20:44:38'),
(83, 65, 3, 'Activity 3', 'Some description 3', 25, 4, '2023-06-13 20:44:53', '2023-06-13 20:44:53'),
(84, 65, 4, 'Activity 4', 'Some description 4', 54, 3, '2023-06-13 20:45:04', '2023-06-13 20:45:33'),
(85, 65, 5, 'Activity 5', 'Some description 5', 52, 4, '2023-06-13 20:45:43', '2023-06-13 20:45:43'),
(86, 65, 6, 'Activity 6', 'Some description 6', 25, 3, '2023-06-13 20:46:18', '2023-06-13 20:46:18'),
(87, 65, 7, 'Activity 7', 'Some description 7', 52, 2, '2023-06-13 20:46:27', '2023-06-13 20:46:27'),
(88, 65, 8, 'Activity 8', 'Some description 8', 23, 5, '2023-06-13 20:46:36', '2023-06-13 20:46:36'),
(89, 65, 9, 'Activity 9', 'Some description 9', 23, 1, '2023-06-13 20:47:08', '2023-06-13 20:47:08'),
(90, 65, 10, 'Activity 10', 'Some description 10', 52, 1, '2023-06-13 20:47:15', '2023-06-13 20:47:15'),
(101, 76, 1, 'Activity 1', 'Some description 1', 24, 6, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(102, 76, 2, 'Activity 2', 'Some description 2', 34, 5, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(103, 76, 3, 'Activity 3', 'Some description 3', 25, 4, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(104, 76, 4, 'Activity 4', 'Some description 4', 54, 3, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(105, 76, 5, 'Activity 5', 'Some description 5', 52, 4, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(106, 76, 6, 'Activity 6', 'Some description 6', 25, 3, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(107, 76, 7, 'Activity 7', 'Some description 7', 52, 2, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(108, 76, 8, 'Activity 8', 'Some description 8', 23, 5, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(109, 76, 9, 'Activity 9', 'Some description 9', 23, 1, '2023-06-14 08:06:22', '2023-06-14 08:06:22'),
(110, 76, 10, 'Activity 10', 'Some description 10', 52, 1, '2023-06-14 08:06:22', '2023-06-14 08:06:22');

--
-- Triggers `activity`
--
DELIMITER $$
CREATE TRIGGER `version_num_activities_delete` AFTER DELETE ON `activity` FOR EACH ROW BEGIN
    UPDATE process_version
    SET num_activities = num_activities - 1
    WHERE id = OLD.process_version_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `version_num_activities_insert` AFTER INSERT ON `activity` FOR EACH ROW BEGIN
    UPDATE process_version
    SET num_activities = num_activities + 1
    WHERE id = NEW.process_version_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `version_total_num_people_delete` AFTER DELETE ON `activity` FOR EACH ROW UPDATE process_version
SET total_duration = (SELECT SUM(duration) FROM activity WHERE process_version_id = OLD.process_version_id),
total_num_people = (SELECT SUM(num_people) FROM activity WHERE process_version_id = OLD.process_version_id)
WHERE id = OLD.process_version_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `version_total_num_people_insert` AFTER INSERT ON `activity` FOR EACH ROW UPDATE process_version
SET total_duration = (SELECT SUM(duration) FROM activity WHERE process_version_id = NEW.process_version_id),
total_num_people = (SELECT SUM(num_people) FROM activity WHERE process_version_id = NEW.process_version_id)
WHERE id = NEW.process_version_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `table_name` varchar(20) NOT NULL,
  `record` varchar(45) NOT NULL,
  `action` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `user_id`, `table_name`, `record`, `action`, `created_at`, `updated_at`) VALUES
(224, 4, 'project', 'Project 1', 'created', '2023-06-13 21:34:33', '2023-06-13 21:34:33'),
(225, 4, 'project', 'Project 2', 'created', '2023-06-13 21:34:47', '2023-06-13 21:34:47'),
(226, 4, 'project', 'Project 1', 'updated', '2023-06-13 21:34:50', '2023-06-13 21:34:50'),
(227, 4, 'project', 'Project 3', 'created', '2023-06-13 21:35:00', '2023-06-13 21:35:00'),
(228, 4, 'project', 'Project 4', 'created', '2023-06-13 21:35:11', '2023-06-13 21:35:11'),
(229, 4, 'project', 'Project 5', 'created', '2023-06-13 21:35:20', '2023-06-13 21:35:20'),
(230, 4, 'project', 'Project 6', 'created', '2023-06-13 21:35:27', '2023-06-13 21:35:27'),
(231, 4, 'project', 'Project 7', 'created', '2023-06-13 21:35:35', '2023-06-13 21:35:35'),
(232, 4, 'project', 'Project 8', 'created', '2023-06-13 21:35:44', '2023-06-13 21:35:44'),
(233, 4, 'project', 'Project 9', 'created', '2023-06-13 21:35:51', '2023-06-13 21:35:51'),
(234, 4, 'project', 'Project 10', 'created', '2023-06-13 21:35:59', '2023-06-13 21:35:59'),
(235, 4, 'process', 'Process 1', 'created', '2023-06-13 21:36:37', '2023-06-13 21:36:37'),
(236, 4, 'process', 'Process 2', 'created', '2023-06-13 21:37:01', '2023-06-13 21:37:01'),
(237, 4, 'process', 'Process 3', 'created', '2023-06-13 21:37:11', '2023-06-13 21:37:11'),
(238, 4, 'process', 'Process 3', 'updated', '2023-06-13 21:37:14', '2023-06-13 21:37:14'),
(239, 4, 'process', 'Process 2', 'updated', '2023-06-13 21:37:18', '2023-06-13 21:37:18'),
(240, 4, 'process', 'Process 4', 'created', '2023-06-13 21:37:39', '2023-06-13 21:37:39'),
(241, 4, 'process', 'Process 5', 'created', '2023-06-13 21:37:47', '2023-06-13 21:37:47'),
(242, 4, 'process', 'Process 6', 'created', '2023-06-13 21:37:54', '2023-06-13 21:37:54'),
(243, 4, 'process', 'Process 7', 'created', '2023-06-13 21:38:04', '2023-06-13 21:38:04'),
(244, 4, 'process', 'Process 8', 'created', '2023-06-13 21:38:14', '2023-06-13 21:38:14'),
(245, 4, 'process', 'Process 9', 'created', '2023-06-13 21:38:24', '2023-06-13 21:38:24'),
(246, 4, 'process', 'Process 10', 'created', '2023-06-13 21:38:34', '2023-06-13 21:38:34'),
(247, 4, 'process_version', '1.0.0', 'created', '2023-06-13 21:39:15', '2023-06-13 21:39:15'),
(248, 4, 'process_version', '1.0.1', 'created', '2023-06-13 21:39:24', '2023-06-13 21:39:24'),
(249, 4, 'process_version', '1.0.2', 'created', '2023-06-13 21:39:35', '2023-06-13 21:39:35'),
(250, 4, 'process_version', '1.0.3', 'created', '2023-06-13 21:40:00', '2023-06-13 21:40:00'),
(251, 4, 'process_version', '1.0.5', 'created', '2023-06-13 21:40:37', '2023-06-13 21:40:37'),
(252, 4, 'process_version', '1.1.0', 'created', '2023-06-13 21:40:52', '2023-06-13 21:40:52'),
(253, 4, 'process_version', '1.1.1', 'created', '2023-06-13 21:41:05', '2023-06-13 21:41:05'),
(254, 4, 'process_version', '2.0.0', 'created', '2023-06-13 21:41:35', '2023-06-13 21:41:35'),
(255, 4, 'process_version', '2.0.1', 'created', '2023-06-13 21:41:54', '2023-06-13 21:41:54'),
(256, 4, 'process_version', '2.1.0', 'created', '2023-06-13 21:42:11', '2023-06-13 21:42:11'),
(257, 4, 'process_version', '2.1.0', 'updated', '2023-06-13 21:42:30', '2023-06-13 21:42:30'),
(258, 4, 'process_version', '2.1.0', 'updated', '2023-06-13 21:42:38', '2023-06-13 21:42:38'),
(259, 4, 'process_version', '2.1.0', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(260, 4, 'process_version', '2.0.1', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(261, 4, 'process_version', '2.0.0', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(262, 4, 'process_version', '1.1.1', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(263, 4, 'process_version', '1.1.0', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(264, 4, 'process_version', '1.0.5', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(265, 4, 'process_version', '1.0.3', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(266, 4, 'process_version', '1.0.2', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(267, 4, 'process_version', '1.0.1', 'deleted', '2023-06-13 21:43:29', '2023-06-13 21:43:29'),
(268, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:43:52', '2023-06-13 21:43:52'),
(269, 4, 'activity', 'Activity 1', 'created', '2023-06-13 21:44:13', '2023-06-13 21:44:13'),
(270, 4, 'activity', 'Activity 2', 'created', '2023-06-13 21:44:38', '2023-06-13 21:44:38'),
(271, 4, 'activity', 'Activity 3', 'created', '2023-06-13 21:44:53', '2023-06-13 21:44:53'),
(272, 4, 'activity', 'Activity 4', 'created', '2023-06-13 21:45:04', '2023-06-13 21:45:04'),
(273, 4, 'activity', 'Activity 4', 'updated', '2023-06-13 21:45:11', '2023-06-13 21:45:11'),
(274, 4, 'activity', 'Activity 4', 'updated', '2023-06-13 21:45:33', '2023-06-13 21:45:33'),
(275, 4, 'activity', 'Activity 5', 'created', '2023-06-13 21:45:43', '2023-06-13 21:45:43'),
(276, 4, 'activity', 'Activity 6', 'created', '2023-06-13 21:46:18', '2023-06-13 21:46:18'),
(277, 4, 'activity', 'Activity 7', 'created', '2023-06-13 21:46:27', '2023-06-13 21:46:27'),
(278, 4, 'activity', 'Activity 8', 'created', '2023-06-13 21:46:36', '2023-06-13 21:46:36'),
(279, 4, 'activity', 'Activity 9', 'created', '2023-06-13 21:47:08', '2023-06-13 21:47:08'),
(280, 4, 'activity', 'Activity 10', 'created', '2023-06-13 21:47:15', '2023-06-13 21:47:15'),
(281, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:50:51', '2023-06-13 21:50:51'),
(282, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:50:59', '2023-06-13 21:50:59'),
(283, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:51:06', '2023-06-13 21:51:06'),
(284, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:51:24', '2023-06-13 21:51:24'),
(285, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:52:10', '2023-06-13 21:52:10'),
(286, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:52:31', '2023-06-13 21:52:31'),
(287, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:54:26', '2023-06-13 21:54:26'),
(288, 4, 'activity', 'Activity 1', 'updated', '2023-06-13 21:57:16', '2023-06-13 21:57:16'),
(289, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 21:58:10', '2023-06-13 21:58:10'),
(290, 4, 'activity', 'Activity 1', 'updated', '2023-06-13 22:00:21', '2023-06-13 22:00:21'),
(291, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 22:02:20', '2023-06-13 22:02:20'),
(292, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 22:02:35', '2023-06-13 22:02:35'),
(293, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 22:02:42', '2023-06-13 22:02:42'),
(294, 4, 'project', 'Project 11', 'created', '2023-06-13 22:03:30', '2023-06-13 22:03:30'),
(295, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 22:03:52', '2023-06-13 22:03:52'),
(296, 4, 'project', 'Project 12', 'created', '2023-06-13 22:04:03', '2023-06-13 22:04:03'),
(297, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 22:04:04', '2023-06-13 22:04:04'),
(298, 4, 'project', 'Project 13', 'created', '2023-06-13 22:04:19', '2023-06-13 22:04:19'),
(299, 4, 'project', 'Project 14', 'created', '2023-06-13 22:04:23', '2023-06-13 22:04:23'),
(300, 4, 'project', 'Project 15', 'created', '2023-06-13 22:04:28', '2023-06-13 22:04:28'),
(301, 4, 'project', 'Project 1', 'updated', '2023-06-13 22:07:42', '2023-06-13 22:07:42'),
(302, 4, 'process_version', '1.0.1', 'created', '2023-06-13 22:07:42', '2023-06-13 22:07:42'),
(303, 4, 'process_version', '1.0.1', 'deleted', '2023-06-13 22:07:52', '2023-06-13 22:07:52'),
(304, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 22:22:33', '2023-06-13 22:22:33'),
(305, 4, 'process_version', '1.0.0', 'updated', '2023-06-13 22:30:12', '2023-06-13 22:30:12'),
(306, 4, 'process_version', '1.0.0', 'updated', '2023-06-14 07:30:09', '2023-06-14 07:30:09'),
(307, 4, 'process_version', '1.0.0', 'updated', '2023-06-14 09:03:14', '2023-06-14 09:03:14'),
(308, 4, 'process_version', '1.0.1', 'created', '2023-06-14 09:06:22', '2023-06-14 09:06:22'),
(309, 4, 'process_version', '1.0.0', 'updated', '2023-06-14 09:06:54', '2023-06-14 09:06:54'),
(310, 4, 'process_version', '1.0.0', 'updated', '2023-06-14 09:24:26', '2023-06-14 09:24:26');

-- --------------------------------------------------------

--
-- Table structure for table `process`
--

CREATE TABLE `process` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `num_versions` int(11) NOT NULL DEFAULT 0,
  `best_version` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `process`
--

INSERT INTO `process` (`id`, `project_id`, `name`, `description`, `num_versions`, `best_version`, `status`, `created_at`, `updated_at`) VALUES
(39, 56, 'Process 1', 'Some description 1', 2, NULL, 1, '2023-06-13 20:36:37', '2023-06-14 09:06:22'),
(40, 56, 'Process 2', 'Some description 2', 0, NULL, 0, '2023-06-13 20:37:01', '2023-06-13 20:37:18'),
(41, 56, 'Process 3', 'Some description 3', 0, NULL, 0, '2023-06-13 20:37:11', '2023-06-13 20:37:14'),
(42, 56, 'Process 4', 'Some description 4', 0, NULL, 1, '2023-06-13 20:37:39', '2023-06-13 20:37:39'),
(43, 56, 'Process 5', 'Some description 5', 0, NULL, 1, '2023-06-13 20:37:47', '2023-06-13 20:37:47'),
(44, 56, 'Process 6', 'Some description 6', 0, NULL, 0, '2023-06-13 20:37:54', '2023-06-13 20:37:54'),
(45, 56, 'Process 7', 'Some description 7', 0, NULL, 0, '2023-06-13 20:38:04', '2023-06-13 20:38:04'),
(46, 56, 'Process 8', 'Some description 8', 0, NULL, 1, '2023-06-13 20:38:14', '2023-06-13 20:38:14'),
(47, 56, 'Process 9', 'Some description 9', 0, NULL, 1, '2023-06-13 20:38:24', '2023-06-13 20:38:24'),
(48, 56, 'Process 10', 'Some description 10', 0, NULL, 0, '2023-06-13 20:38:34', '2023-06-13 20:38:34');

--
-- Triggers `process`
--
DELIMITER $$
CREATE TRIGGER `project_num_processes_delete` AFTER DELETE ON `process` FOR EACH ROW BEGIN
    UPDATE project
    SET num_processes = num_processes - 1
    WHERE id = OLD.project_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `project_num_processes_insert` AFTER INSERT ON `process` FOR EACH ROW BEGIN
    UPDATE project
    SET num_processes = num_processes + 1
    WHERE id = NEW.project_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `process_version`
--

CREATE TABLE `process_version` (
  `id` int(11) NOT NULL,
  `process_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `major` int(11) NOT NULL DEFAULT 1,
  `minor` int(11) NOT NULL DEFAULT 0,
  `patch` int(11) NOT NULL DEFAULT 0,
  `num_activities` int(11) NOT NULL DEFAULT 0,
  `total_duration` int(11) DEFAULT 0,
  `total_num_people` int(11) DEFAULT 0,
  `grade` int(11) NOT NULL DEFAULT 0,
  `file` text DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `process_version`
--

INSERT INTO `process_version` (`id`, `process_id`, `description`, `major`, `minor`, `patch`, `num_activities`, `total_duration`, `total_num_people`, `grade`, `file`, `status`, `created_at`, `updated_at`) VALUES
(65, 39, 'Some description 1', 1, 0, 0, 10, 364, 34, 4, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" targetNamespace=\"\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd\">\n  <collaboration id=\"sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424\">\n    <participant id=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F\" name=\"Sample stage\" processRef=\"sid-C3803939-0872-457F-8336-EAE484DC4A04\" />\n  </collaboration>\n  <process id=\"sid-C3803939-0872-457F-8336-EAE484DC4A04\" name=\"Customer\" processType=\"None\" isClosed=\"false\" isExecutable=\"false\">\n    <extensionElements />\n    <laneSet id=\"sid-b167d0d7-e761-4636-9200-76b7f0e8e83a\">\n      <lane id=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254\">\n        <flowNodeRef>Event_0f6evzq</flowNodeRef>\n        <flowNodeRef>Activity_04g20em</flowNodeRef>\n        <flowNodeRef>Activity_036fh8w</flowNodeRef>\n        <flowNodeRef>Activity_075aq2r</flowNodeRef>\n        <flowNodeRef>Activity_1vk9y6x</flowNodeRef>\n        <flowNodeRef>Event_0t4jbek</flowNodeRef>\n        <flowNodeRef>Activity_1bxmur5</flowNodeRef>\n        <flowNodeRef>Activity_1pxwzoy</flowNodeRef>\n      </lane>\n    </laneSet>\n    <startEvent id=\"Event_0f6evzq\">\n      <outgoing>Flow_1k8skgb</outgoing>\n    </startEvent>\n    <task id=\"Activity_04g20em\" name=\"Sample task\">\n      <incoming>Flow_1k8skgb</incoming>\n      <outgoing>Flow_1ktrtjo</outgoing>\n    </task>\n    <task id=\"Activity_036fh8w\" name=\"ewrewrwe\">\n      <incoming>Flow_1ktrtjo</incoming>\n      <outgoing>Flow_18kl7iz</outgoing>\n    </task>\n    <task id=\"Activity_075aq2r\" name=\"ssss\">\n      <incoming>Flow_18kl7iz</incoming>\n      <outgoing>Flow_0jwgcan</outgoing>\n    </task>\n    <task id=\"Activity_1vk9y6x\" name=\"aaa\">\n      <incoming>Flow_0jwgcan</incoming>\n      <outgoing>Flow_0nupi0z</outgoing>\n    </task>\n    <sequenceFlow id=\"Flow_0nupi0z\" sourceRef=\"Activity_1vk9y6x\" targetRef=\"Activity_1bxmur5\" />\n    <sequenceFlow id=\"Flow_0jwgcan\" sourceRef=\"Activity_075aq2r\" targetRef=\"Activity_1vk9y6x\" />\n    <sequenceFlow id=\"Flow_18kl7iz\" sourceRef=\"Activity_036fh8w\" targetRef=\"Activity_075aq2r\" />\n    <sequenceFlow id=\"Flow_1ktrtjo\" sourceRef=\"Activity_04g20em\" targetRef=\"Activity_036fh8w\" />\n    <sequenceFlow id=\"Flow_1k8skgb\" sourceRef=\"Event_0f6evzq\" targetRef=\"Activity_04g20em\" />\n    <endEvent id=\"Event_0t4jbek\">\n      <incoming>Flow_1r8srua</incoming>\n    </endEvent>\n    <task id=\"Activity_1bxmur5\">\n      <incoming>Flow_0nupi0z</incoming>\n      <outgoing>Flow_1r8srua</outgoing>\n    </task>\n    <sequenceFlow id=\"Flow_1r8srua\" sourceRef=\"Activity_1bxmur5\" targetRef=\"Event_0t4jbek\" />\n    <task id=\"Activity_1pxwzoy\" />\n  </process>\n  <bpmndi:BPMNDiagram id=\"sid-74620812-92c4-44e5-949c-aa47393d3830\">\n    <bpmndi:BPMNPlane id=\"sid-cdcae759-2af7-4a6d-bd02-53f3352a731d\" bpmnElement=\"sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424\">\n      <bpmndi:BPMNShape id=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F_gui\" bpmnElement=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F\" isHorizontal=\"true\">\n        <omgdc:Bounds x=\"58\" y=\"105\" width=\"1072\" height=\"250\" />\n        <bpmndi:BPMNLabel labelStyle=\"sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b\">\n          <omgdc:Bounds x=\"47.49999999999999\" y=\"170.42857360839844\" width=\"12.000000000000014\" height=\"59.142852783203125\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254_gui\" bpmnElement=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254\" isHorizontal=\"true\">\n        <omgdc:Bounds x=\"88\" y=\"105\" width=\"1042\" height=\"250\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"Flow_1r8srua_di\" bpmnElement=\"Flow_1r8srua\">\n        <omgdi:waypoint x=\"940\" y=\"230\" />\n        <omgdi:waypoint x=\"992\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_1k8skgb_di\" bpmnElement=\"Flow_1k8skgb\">\n        <omgdi:waypoint x=\"183\" y=\"230\" />\n        <omgdi:waypoint x=\"235\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_1ktrtjo_di\" bpmnElement=\"Flow_1ktrtjo\">\n        <omgdi:waypoint x=\"335\" y=\"230\" />\n        <omgdi:waypoint x=\"405\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_18kl7iz_di\" bpmnElement=\"Flow_18kl7iz\">\n        <omgdi:waypoint x=\"505\" y=\"230\" />\n        <omgdi:waypoint x=\"565\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_0jwgcan_di\" bpmnElement=\"Flow_0jwgcan\">\n        <omgdi:waypoint x=\"665\" y=\"230\" />\n        <omgdi:waypoint x=\"705\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_0nupi0z_di\" bpmnElement=\"Flow_0nupi0z\">\n        <omgdi:waypoint x=\"805\" y=\"230\" />\n        <omgdi:waypoint x=\"840\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"Event_0f6evzq_di\" bpmnElement=\"Event_0f6evzq\">\n        <omgdc:Bounds x=\"147\" y=\"212\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_04g20em_di\" bpmnElement=\"Activity_04g20em\">\n        <omgdc:Bounds x=\"235\" y=\"190\" width=\"100\" height=\"80\" />\n        <bpmndi:BPMNLabel />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_036fh8w_di\" bpmnElement=\"Activity_036fh8w\">\n        <omgdc:Bounds x=\"405\" y=\"190\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_075aq2r_di\" bpmnElement=\"Activity_075aq2r\">\n        <omgdc:Bounds x=\"565\" y=\"190\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1vk9y6x_di\" bpmnElement=\"Activity_1vk9y6x\">\n        <omgdc:Bounds x=\"705\" y=\"190\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Event_0t4jbek_di\" bpmnElement=\"Event_0t4jbek\">\n        <omgdc:Bounds x=\"992\" y=\"212\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1bxmur5_di\" bpmnElement=\"Activity_1bxmur5\">\n        <omgdc:Bounds x=\"840\" y=\"190\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1pxwzoy_di\" bpmnElement=\"Activity_1pxwzoy\">\n        <omgdc:Bounds x=\"320\" y=\"200\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n    <bpmndi:BPMNLabelStyle id=\"sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581\">\n      <omgdc:Font name=\"Arial\" size=\"11\" isBold=\"false\" isItalic=\"false\" isUnderline=\"false\" isStrikeThrough=\"false\" />\n    </bpmndi:BPMNLabelStyle>\n    <bpmndi:BPMNLabelStyle id=\"sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b\">\n      <omgdc:Font name=\"Arial\" size=\"12\" isBold=\"false\" isItalic=\"false\" isUnderline=\"false\" isStrikeThrough=\"false\" />\n    </bpmndi:BPMNLabelStyle>\n  </bpmndi:BPMNDiagram>\n</definitions>', 1, '2023-06-13 20:39:15', '2023-06-14 08:24:26'),
(76, 39, 'erfrefe', 1, 0, 1, 10, 364, 34, 8, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" targetNamespace=\"\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd\">\n  <collaboration id=\"sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424\">\n    <participant id=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F\" name=\"Sample stage\" processRef=\"sid-C3803939-0872-457F-8336-EAE484DC4A04\" />\n  </collaboration>\n  <process id=\"sid-C3803939-0872-457F-8336-EAE484DC4A04\" name=\"Customer\" processType=\"None\" isClosed=\"false\" isExecutable=\"false\">\n    <extensionElements />\n    <laneSet id=\"sid-b167d0d7-e761-4636-9200-76b7f0e8e83a\">\n      <lane id=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254\">\n        <flowNodeRef>Event_0f6evzq</flowNodeRef>\n        <flowNodeRef>Activity_04g20em</flowNodeRef>\n        <flowNodeRef>Activity_036fh8w</flowNodeRef>\n        <flowNodeRef>Activity_075aq2r</flowNodeRef>\n        <flowNodeRef>Activity_1vk9y6x</flowNodeRef>\n        <flowNodeRef>Event_0t4jbek</flowNodeRef>\n        <flowNodeRef>Activity_1bxmur5</flowNodeRef>\n        <flowNodeRef>Activity_1pxwzoy</flowNodeRef>\n      </lane>\n    </laneSet>\n    <startEvent id=\"Event_0f6evzq\">\n      <outgoing>Flow_1k8skgb</outgoing>\n    </startEvent>\n    <task id=\"Activity_04g20em\" name=\"Sample task\">\n      <incoming>Flow_1k8skgb</incoming>\n      <outgoing>Flow_1ktrtjo</outgoing>\n    </task>\n    <task id=\"Activity_036fh8w\" name=\"ewrewrwe\">\n      <incoming>Flow_1ktrtjo</incoming>\n      <outgoing>Flow_18kl7iz</outgoing>\n    </task>\n    <task id=\"Activity_075aq2r\" name=\"ssss\">\n      <incoming>Flow_18kl7iz</incoming>\n      <outgoing>Flow_0jwgcan</outgoing>\n    </task>\n    <task id=\"Activity_1vk9y6x\" name=\"aaa\">\n      <incoming>Flow_0jwgcan</incoming>\n      <outgoing>Flow_0nupi0z</outgoing>\n    </task>\n    <sequenceFlow id=\"Flow_0nupi0z\" sourceRef=\"Activity_1vk9y6x\" targetRef=\"Activity_1bxmur5\" />\n    <sequenceFlow id=\"Flow_0jwgcan\" sourceRef=\"Activity_075aq2r\" targetRef=\"Activity_1vk9y6x\" />\n    <sequenceFlow id=\"Flow_18kl7iz\" sourceRef=\"Activity_036fh8w\" targetRef=\"Activity_075aq2r\" />\n    <sequenceFlow id=\"Flow_1ktrtjo\" sourceRef=\"Activity_04g20em\" targetRef=\"Activity_036fh8w\" />\n    <sequenceFlow id=\"Flow_1k8skgb\" sourceRef=\"Event_0f6evzq\" targetRef=\"Activity_04g20em\" />\n    <endEvent id=\"Event_0t4jbek\">\n      <incoming>Flow_1r8srua</incoming>\n    </endEvent>\n    <task id=\"Activity_1bxmur5\">\n      <incoming>Flow_0nupi0z</incoming>\n      <outgoing>Flow_1r8srua</outgoing>\n    </task>\n    <sequenceFlow id=\"Flow_1r8srua\" sourceRef=\"Activity_1bxmur5\" targetRef=\"Event_0t4jbek\" />\n    <task id=\"Activity_1pxwzoy\" />\n  </process>\n  <bpmndi:BPMNDiagram id=\"sid-74620812-92c4-44e5-949c-aa47393d3830\">\n    <bpmndi:BPMNPlane id=\"sid-cdcae759-2af7-4a6d-bd02-53f3352a731d\" bpmnElement=\"sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424\">\n      <bpmndi:BPMNShape id=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F_gui\" bpmnElement=\"sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F\" isHorizontal=\"true\">\n        <omgdc:Bounds x=\"58\" y=\"105\" width=\"1072\" height=\"250\" />\n        <bpmndi:BPMNLabel labelStyle=\"sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b\">\n          <omgdc:Bounds x=\"47.49999999999999\" y=\"170.42857360839844\" width=\"12.000000000000014\" height=\"59.142852783203125\" />\n        </bpmndi:BPMNLabel>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254_gui\" bpmnElement=\"sid-57E4FE0D-18E4-478D-BC5D-B15164E93254\" isHorizontal=\"true\">\n        <omgdc:Bounds x=\"88\" y=\"105\" width=\"1042\" height=\"250\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"Flow_1r8srua_di\" bpmnElement=\"Flow_1r8srua\">\n        <omgdi:waypoint x=\"940\" y=\"230\" />\n        <omgdi:waypoint x=\"992\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_1k8skgb_di\" bpmnElement=\"Flow_1k8skgb\">\n        <omgdi:waypoint x=\"183\" y=\"230\" />\n        <omgdi:waypoint x=\"235\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_1ktrtjo_di\" bpmnElement=\"Flow_1ktrtjo\">\n        <omgdi:waypoint x=\"335\" y=\"230\" />\n        <omgdi:waypoint x=\"405\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_18kl7iz_di\" bpmnElement=\"Flow_18kl7iz\">\n        <omgdi:waypoint x=\"505\" y=\"230\" />\n        <omgdi:waypoint x=\"565\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_0jwgcan_di\" bpmnElement=\"Flow_0jwgcan\">\n        <omgdi:waypoint x=\"665\" y=\"230\" />\n        <omgdi:waypoint x=\"705\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_0nupi0z_di\" bpmnElement=\"Flow_0nupi0z\">\n        <omgdi:waypoint x=\"805\" y=\"230\" />\n        <omgdi:waypoint x=\"840\" y=\"230\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"Event_0f6evzq_di\" bpmnElement=\"Event_0f6evzq\">\n        <omgdc:Bounds x=\"147\" y=\"212\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_04g20em_di\" bpmnElement=\"Activity_04g20em\">\n        <omgdc:Bounds x=\"235\" y=\"190\" width=\"100\" height=\"80\" />\n        <bpmndi:BPMNLabel />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_036fh8w_di\" bpmnElement=\"Activity_036fh8w\">\n        <omgdc:Bounds x=\"405\" y=\"190\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_075aq2r_di\" bpmnElement=\"Activity_075aq2r\">\n        <omgdc:Bounds x=\"565\" y=\"190\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1vk9y6x_di\" bpmnElement=\"Activity_1vk9y6x\">\n        <omgdc:Bounds x=\"705\" y=\"190\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Event_0t4jbek_di\" bpmnElement=\"Event_0t4jbek\">\n        <omgdc:Bounds x=\"992\" y=\"212\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1bxmur5_di\" bpmnElement=\"Activity_1bxmur5\">\n        <omgdc:Bounds x=\"840\" y=\"190\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_1pxwzoy_di\" bpmnElement=\"Activity_1pxwzoy\">\n        <omgdc:Bounds x=\"320\" y=\"200\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n    <bpmndi:BPMNLabelStyle id=\"sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581\">\n      <omgdc:Font name=\"Arial\" size=\"11\" isBold=\"false\" isItalic=\"false\" isUnderline=\"false\" isStrikeThrough=\"false\" />\n    </bpmndi:BPMNLabelStyle>\n    <bpmndi:BPMNLabelStyle id=\"sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b\">\n      <omgdc:Font name=\"Arial\" size=\"12\" isBold=\"false\" isItalic=\"false\" isUnderline=\"false\" isStrikeThrough=\"false\" />\n    </bpmndi:BPMNLabelStyle>\n  </bpmndi:BPMNDiagram>\n</definitions>', 0, '2023-06-14 08:06:22', '2023-06-14 08:24:26');

--
-- Triggers `process_version`
--
DELIMITER $$
CREATE TRIGGER `process_num_versions_create` AFTER INSERT ON `process_version` FOR EACH ROW BEGIN
    UPDATE process
    SET num_versions = num_versions + 1
    WHERE id = NEW.process_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `process_num_versions_delete` AFTER DELETE ON `process_version` FOR EACH ROW BEGIN
    UPDATE process
    SET num_versions = num_versions - 1
    WHERE id = OLD.process_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text DEFAULT NULL,
  `num_processes` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `user_id`, `name`, `description`, `num_processes`, `created_at`, `updated_at`) VALUES
(56, 4, 'Project 1', 'Some descriptiion 1', 10, '2023-06-13 20:34:33', '2023-06-14 08:12:24'),
(57, 4, 'Project 2', 'Some description 2', 0, '2023-06-13 20:34:47', '2023-06-14 08:12:24'),
(58, 4, 'Project 3', 'Some description 3', 0, '2023-06-13 20:35:00', '2023-06-14 08:12:24'),
(59, 4, 'Project 4', 'Some description 4', 0, '2023-06-13 20:35:11', '2023-06-14 08:12:24'),
(60, 4, 'Project 5', 'Some description 5', 0, '2023-06-13 20:35:20', '2023-06-14 08:12:24'),
(61, 4, 'Project 6', 'Some description 6', 0, '2023-06-13 20:35:27', '2023-06-14 08:12:24'),
(62, 4, 'Project 7', 'Some description 7', 0, '2023-06-13 20:35:35', '2023-06-14 08:12:24'),
(63, 4, 'Project 8', 'Some description 8', 0, '2023-06-13 20:35:44', '2023-06-14 08:12:24'),
(64, 4, 'Project 9', 'Some description 9', 0, '2023-06-13 20:35:51', '2023-06-14 08:12:24'),
(65, 4, 'Project 10', 'Some description 10', 0, '2023-06-13 20:35:59', '2023-06-14 08:12:24'),
(66, 4, 'Project 11', 'Some description 11', 0, '2023-06-13 21:03:30', '2023-06-14 08:12:24'),
(67, 4, 'Project 12', 'Some description 12', 0, '2023-06-13 21:04:03', '2023-06-14 08:12:24'),
(68, 4, 'Project 13', 'Some description 13', 0, '2023-06-13 21:04:19', '2023-06-14 08:12:24'),
(69, 4, 'Project 14', 'Some description 14', 0, '2023-06-13 21:04:23', '2023-06-14 08:12:24'),
(70, 4, 'Project 15', 'Some description 15', 0, '2023-06-13 21:04:28', '2023-06-14 08:12:24');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `created_at`, `updated_at`) VALUES
(0, 'test@user.com', '2023-06-14 08:07:16', '2023-06-14 08:07:51'),
(4, 'test', '2023-05-18 20:04:05', '2023-06-12 08:38:32'),
(5, 'test2', '2023-05-18 21:13:32', '2023-05-18 21:13:32'),
(21, 'testUser', '2023-06-13 12:08:13', '2023-06-13 12:08:13'),
(22, 'ivan.sergejev@student.um.si', '2023-06-13 12:18:00', '2023-06-13 12:18:00'),
(23, 'ivan.sergejev2002c@outlook.com', '2023-06-13 16:53:21', '2023-06-13 16:53:21'),
(26, 'vsolakov@yahoo.com', '2023-06-13 17:14:50', '2023-06-13 17:14:50'),
(27, 'vsolakov@yahoo.coem', '2023-06-13 18:04:17', '2023-06-13 18:04:17'),
(28, 'ivan.sergejev2002c@gmail.com', '2023-06-13 18:55:33', '2023-06-13 18:55:33'),
(29, 'test@test.com', '2023-06-13 20:51:28', '2023-06-13 20:51:28'),
(30, 'ivan.sergejev2002m@gmail.com', '2023-06-13 21:00:34', '2023-06-13 21:00:34'),
(31, 'ivkovicolga@gmail.com', '2023-06-13 21:37:47', '2023-06-13 21:37:47'),
(32, 'olga.ivkovic@student.um.si', '2023-06-14 06:40:15', '2023-06-14 06:40:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Activities_Processes_version1_idx` (`process_version_id`);

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_log_users` (`user_id`);

--
-- Indexes for table `process`
--
ALTER TABLE `process`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Processes_Projects_idx` (`project_id`);

--
-- Indexes for table `process_version`
--
ALTER TABLE `process_version`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Processes_version_Processes1_idx` (`process_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Project_User1_idx` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;

--
-- AUTO_INCREMENT for table `process`
--
ALTER TABLE `process`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `process_version`
--
ALTER TABLE `process_version`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `fk_Activities_Process_versions` FOREIGN KEY (`process_version_id`) REFERENCES `process_version` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD CONSTRAINT `activity_log_users` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `process`
--
ALTER TABLE `process`
  ADD CONSTRAINT `fk_Processes_Projects` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `process_version`
--
ALTER TABLE `process_version`
  ADD CONSTRAINT `fk_Processes_versions_Processes` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `fk_Project_User1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

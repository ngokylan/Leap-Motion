-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Sep 09, 2013 at 03:10 PM
-- Server version: 5.5.28
-- PHP Version: 5.4.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `leap_motion`
--

-- --------------------------------------------------------

--
-- Table structure for table `testing_files`
--

CREATE TABLE IF NOT EXISTS `testing_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `testing_files`
--

INSERT INTO `testing_files` (`id`, `url`, `created_date`, `userid`) VALUES
(2, '04/09/2013-23:40:21-7', '2013-09-04 13:40:21', 7),
(3, '04/09/2013-23:47:01-7', '2013-09-04 13:47:01', 7),
(4, '05/09/2013-00:08:02-7', '2013-09-04 14:08:02', 7),
(5, '05/09/2013-00:08:59-7', '2013-09-04 14:08:59', 7),
(6, '05/09/2013-00:11:29-8', '2013-09-04 14:11:29', 8),
(7, '05/09/2013-00:11:46-8', '2013-09-04 14:11:46', 8),
(8, '05/09/2013-00:12:05-8', '2013-09-04 14:12:05', 8),
(9, '05/09/2013-00:13:28-8', '2013-09-04 14:13:28', 8),
(10, '05/09/2013-00:14:37-8', '2013-09-04 14:14:37', 8),
(11, '05/09/2013-00:15:16-8', '2013-09-04 14:15:16', 8),
(12, '05/09/2013-00:15:58-8', '2013-09-04 14:15:58', 8),
(13, '05/09/2013-00:16:35-8', '2013-09-04 14:16:35', 8),
(14, '05/09/2013-00:17:16-8', '2013-09-04 14:17:16', 8),
(15, '05/09/2013-00:18:14-8', '2013-09-04 14:18:14', 8),
(16, '05/09/2013-00:18:49-8', '2013-09-04 14:18:49', 8),
(17, '05/09/2013-00:19:27-8', '2013-09-04 14:19:27', 8),
(18, '05/09/2013-00:19:46-8', '2013-09-04 14:19:46', 8),
(19, '05/09/2013-00:21:55-8', '2013-09-04 14:21:55', 8),
(20, '05/09/2013-00:22:31-8', '2013-09-04 14:22:31', 8),
(21, '05/09/2013-00:22:49-8', '2013-09-04 14:22:49', 8),
(22, '05/09/2013-00:22:52-8', '2013-09-04 14:22:52', 8),
(23, '05/09/2013-00:23:17-8', '2013-09-04 14:23:17', 8),
(24, '05/09/2013-00:23:56-8', '2013-09-04 14:23:56', 8),
(25, '05/09/2013-00:24:15-8', '2013-09-04 14:24:15', 8),
(26, '05/09/2013-00:24:57-8', '2013-09-04 14:24:57', 8),
(27, '05/09/2013-00:26:06-8', '2013-09-04 14:26:06', 8),
(28, '05/09/2013-00:26:30-8', '2013-09-04 14:26:30', 8);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`) VALUES
(7, 'test'),
(8, 'Minh'),
(9, 'Josh'),
(10, 'Peter'),
(11, 'Tran');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

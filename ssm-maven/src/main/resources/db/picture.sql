
DROP TABLE IF EXISTS `ssm_picture`;

CREATE TABLE `ssm_picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(150) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ssm_picture` WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS `ssm_article`;

CREATE TABLE `ssm_article` (
  `articleID` int(4) NOT NULL AUTO_INCREMENT,
  `articleTitle` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `articleCreateDate` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `articleContent` longtext COLLATE utf8_bin,
  `articleclassID` int(4) DEFAULT NULL,
  `istop` int(4) DEFAULT NULL,
  `addname` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`articleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

LOCK TABLES `whg168_article` WRITE;
/*!40000 ALTER TABLE `whg168_article` DISABLE KEYS */;

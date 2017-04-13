
# Dump of table ssm_store
# ------------------------------------------------------------

CREATE TABLE `ssm_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(10) DEFAULT NULL,
  `number` varchar(100) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  `page` varchar(10) DEFAULT '0',
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table ssm_storebook
# ------------------------------------------------------------

CREATE TABLE `ssm_storebook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(20) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `inDate` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_whg168_storebook_id` (`storeId`),
  CONSTRAINT `FK_whg168_storebook_id` FOREIGN KEY (`storeId`) REFERENCES `ssm_store` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

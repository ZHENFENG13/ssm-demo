DROP TABLE IF EXISTS `ssm_article`;

CREATE TABLE `ssm_article` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `article_create_date` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `article_content` longtext COLLATE utf8_bin,
  `article_class_id` int(4) DEFAULT NULL,
  `is_top` int(4) DEFAULT NULL,
  `add_name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



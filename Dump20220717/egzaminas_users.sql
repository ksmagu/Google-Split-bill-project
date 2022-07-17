-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: egzaminas
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `reg_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Kristina','kristina@test.com','$2b$10$fj3JSKME1bL2iGlBX2GLROV2h8fM65YVaOKy0LXWShS3/QUvGX8wi','2022-07-13 17:57:59'),(2,'Agne','agne@test.com','$2b$10$.20lP3Rx9Rd.QOTf64FPW.kI.nlBczh9ZRAUaxyVlojY/of4FW4dy','2022-07-13 17:58:53'),(3,'Jonas','jonas@test.com','$2b$10$BO8pfamLjvMFSFwvAOJNTOQ8oAEdPW.cZP/hk/qIHLQAWLTAfFHO6','2022-07-13 18:19:52'),(4,'test','test@test.com','$2b$10$Sq1Eay/qsFoufQ3GcySXu.4HBa8z9vQ8OHu244/rotMsmryRdiFX.','2022-07-13 18:34:11'),(7,'testtest','test2@test.com','$2b$10$c6Nws36/ePyui5Fjh2WHaOt1M1980fx1gUh/kGXCbn/bgmIQ8f.VG','2022-07-15 15:09:07'),(8,'Testtest','test3@test.com','$2b$10$tu5a9HuGSfjYI7ESU8X4puhmy.Usm.PuJlnRONj7hAJWWQ.t1aXzi','2022-07-16 16:49:33'),(9,'testtest','test4@test.com','$2b$10$HMvyKS2GE.f6E9Sefuz8g.ViYWx9XcnYkU3GahxtTzt8m0zVWOP8a','2022-07-16 17:01:36');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-17 22:15:51

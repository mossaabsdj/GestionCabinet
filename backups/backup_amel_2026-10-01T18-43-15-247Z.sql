-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: amel
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('119e9246-19ab-4381-819b-f197e51aedb5','9181e79757e16948ca752e702097228d6924a724fc2cb274e3e49cef76aca16e','2025-11-07 13:57:11.863','20251107135711_add_sexe_field',NULL,NULL,'2025-11-07 13:57:11.591',1),('2d26ddce-ec96-4c3b-b899-f89198640f2c','c1fab3c0abbc503fd510596cce811724e1f0a06c2948ba7839bd869956548c08','2025-09-29 22:07:08.878','20250929220707_init',NULL,NULL,'2025-09-29 22:07:07.201',1),('39a76dc5-83bf-4e99-9ecf-e36281b052bd','18e588454d0c1b7126bb4885912794e7d0b7d9ca9664d8da5e619d94046f7c7d','2025-10-06 20:05:03.355','20251006200501_init',NULL,NULL,'2025-10-06 20:05:01.858',1),('51a440c6-2ecd-494e-929c-9e019bc59fe8','960e527a5e0b122813623fdb5ab846a87ba3f0811800038d47f07fdd12036f14','2025-10-06 22:14:02.598','20251006221402_init',NULL,NULL,'2025-10-06 22:14:02.529',1),('5c0dfca0-8ad9-40c6-845b-92f7fe44704f','79d80236471b1dc85a324190367a8ce5e7fc1777b20743142e06394605248636','2025-10-18 20:29:51.114','20251018202951_sexe',NULL,NULL,'2025-10-18 20:29:51.039',1),('66e780b9-a025-4656-a7fe-e59ae1f7d017','0c63634825983dde99192fe6107808e3250d1a59009b42ce7f47c2f429c1bb00','2025-10-12 20:52:51.942','20251012205251_remove_consultation_from_bilanfile',NULL,NULL,'2025-10-12 20:52:51.375',1),('7a4b67cf-3468-4141-ac06-fe8ce24d13b6','481067acb4f7d4ba3e9fe35b7ad99fc522de468ab155662d933907be05effe6d','2025-10-12 20:32:44.475','20251012203244_remove_consultation_from_bilanfile',NULL,NULL,'2025-10-12 20:32:44.146',1),('810e0551-5157-43f2-a403-57dc1982f7f0','166a78de623ddbcf9ea71fc81f48ad093a38cafb760a88572098fa67c6592004','2026-06-18 21:25:07.721','20260618212507_add_consultation_justification',NULL,NULL,'2026-06-18 21:25:07.579',1),('82eae2ff-11d8-48aa-b918-9d0e85c4e6d2','3e5e750de2a45564a62940fa7e7fd9a80444cfe42b27d9c30a14486509a80f96','2025-10-14 23:03:50.865','20251014230350_more',NULL,NULL,'2025-10-14 23:03:50.755',1),('a62c9659-88f4-4b59-9ffe-e0a22e6b6d84','093932af3fa5fc86c3d4a8eae781eb25391e939d5b85c18ee252a4b19a8d6fa2','2025-10-06 20:21:25.561','20251006202125_init',NULL,NULL,'2025-10-06 20:21:25.470',1),('aaf9d1f8-5705-4e0e-bfd2-389400f191b6','15b64ecdbd1c1d9d103023582ed895ea9ae3a114b26dd9c209978981369848fc','2025-10-17 13:55:12.708','20251017135512_cascade',NULL,NULL,'2025-10-17 13:55:12.501',1),('bbe5f88a-dc40-4ed3-a385-55f5a8d2242b','d26df8389029fcfecdddcee519b35ee1b99d420b0e4877b7c5ab3ab81bb67073','2025-10-15 22:01:14.955','20251015220112_cascade',NULL,NULL,'2025-10-15 22:01:12.084',1),('c8605222-0a67-469a-8b60-d32900e29160','10e8eccc150910f931777ce91ff6ef13175975067ae46044ff06f584c390cff0','2025-11-06 11:51:16.083','20251106115115_add_sexe_field',NULL,NULL,'2025-11-06 11:51:15.367',1),('e3f60ef1-1c6c-4362-9c3c-bf5b8e798da3','0449442e03949791053bd4db3aa683fd53056aab567feee3b5c5f33216aa5d43','2025-10-12 20:41:18.113','20251012204118_remove_consultation_from_bilanfile',NULL,NULL,'2025-10-12 20:41:18.058',1),('e901166c-2535-42c7-a683-7e847bc2aa36','b22ca7fad3209669d332ec61205666b3d41d4364240492a59ed2e8f2c3187487','2025-10-11 22:51:55.650','20251011225155_init',NULL,NULL,'2025-10-11 22:51:55.266',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bilan`
--

DROP TABLE IF EXISTS `bilan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bilan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Bilan_nom_key` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bilan`
--

LOCK TABLES `bilan` WRITE;
/*!40000 ALTER TABLE `bilan` DISABLE KEYS */;
INSERT INTO `bilan` VALUES (8,'m6','2025-10-06 20:33:01.014'),(12,'m','2025-10-13 19:54:29.295'),(13,'a','2025-10-13 20:00:50.219'),(20,'ksal','2026-06-17 00:18:55.675'),(21,'ala','2026-06-17 00:18:55.870'),(22,'MP','2026-06-17 00:18:56.219'),(23,'M56','2026-06-17 00:18:56.473'),(24,'M65','2026-06-17 00:18:56.684');
/*!40000 ALTER TABLE `bilan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bilanfile`
--

DROP TABLE IF EXISTS `bilanfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bilanfile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultationId` int DEFAULT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fichier` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `patientId` int DEFAULT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BilanFile_consultationId_fkey` (`consultationId`),
  KEY `BilanFile_patientId_fkey` (`patientId`),
  CONSTRAINT `BilanFile_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BilanFile_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bilanfile`
--

LOCK TABLES `bilanfile` WRITE;
/*!40000 ALTER TABLE `bilanfile` DISABLE KEYS */;
INSERT INTO `bilanfile` VALUES (9,NULL,'','450066389_122117371418348414_4029770236321205619_n.jpg','2025-11-10 10:01:38.072',55,''),(10,NULL,'Bilan','48.jpg','2025-11-28 22:21:30.229',61,'x');
/*!40000 ALTER TABLE `bilanfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bilanitem`
--

DROP TABLE IF EXISTS `bilanitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bilanitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bilanRecipId` int NOT NULL,
  `bilanId` int NOT NULL,
  `resultat` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarque` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BilanItem_bilanRecipId_fkey` (`bilanRecipId`),
  KEY `BilanItem_bilanId_fkey` (`bilanId`),
  CONSTRAINT `BilanItem_bilanId_fkey` FOREIGN KEY (`bilanId`) REFERENCES `bilan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BilanItem_bilanRecipId_fkey` FOREIGN KEY (`bilanRecipId`) REFERENCES `bilanrecip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bilanitem`
--

LOCK TABLES `bilanitem` WRITE;
/*!40000 ALTER TABLE `bilanitem` DISABLE KEYS */;
INSERT INTO `bilanitem` VALUES (131,34,13,NULL,NULL),(132,34,12,NULL,NULL),(133,34,8,NULL,NULL);
/*!40000 ALTER TABLE `bilanitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bilanrecip`
--

DROP TABLE IF EXISTS `bilanrecip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bilanrecip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patientId` int NOT NULL,
  `consultationId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `BilanRecip_consultationId_key` (`consultationId`),
  KEY `BilanRecip_patientId_fkey` (`patientId`),
  CONSTRAINT `BilanRecip_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BilanRecip_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bilanrecip`
--

LOCK TABLES `bilanrecip` WRITE;
/*!40000 ALTER TABLE `bilanrecip` DISABLE KEYS */;
INSERT INTO `bilanrecip` VALUES (34,56,191,'2025-11-28 21:11:00.000');
/*!40000 ALTER TABLE `bilanrecip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bilantype`
--

DROP TABLE IF EXISTS `bilantype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bilantype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bilantype`
--

LOCK TABLES `bilantype` WRITE;
/*!40000 ALTER TABLE `bilantype` DISABLE KEYS */;
INSERT INTO `bilantype` VALUES (14,'b1');
/*!40000 ALTER TABLE `bilantype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bilantypeitem`
--

DROP TABLE IF EXISTS `bilantypeitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bilantypeitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bilanTypeId` int NOT NULL,
  `bilanId` int NOT NULL,
  `remarque` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BilanTypeItem_bilanTypeId_fkey` (`bilanTypeId`),
  KEY `BilanTypeItem_bilanId_fkey` (`bilanId`),
  CONSTRAINT `BilanTypeItem_bilanId_fkey` FOREIGN KEY (`bilanId`) REFERENCES `bilan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BilanTypeItem_bilanTypeId_fkey` FOREIGN KEY (`bilanTypeId`) REFERENCES `bilantype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bilantypeitem`
--

LOCK TABLES `bilantypeitem` WRITE;
/*!40000 ALTER TABLE `bilantypeitem` DISABLE KEYS */;
INSERT INTO `bilantypeitem` VALUES (34,14,13,NULL),(35,14,12,NULL),(36,14,8,NULL);
/*!40000 ALTER TABLE `bilantypeitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultation`
--

DROP TABLE IF EXISTS `consultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patientId` int NOT NULL,
  `note` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taille` double DEFAULT NULL,
  `poids` double DEFAULT NULL,
  `tensionSystolique` int DEFAULT NULL,
  `tensionDiastolique` int DEFAULT NULL,
  `temperature` double DEFAULT NULL,
  `frequenceCardiaque` int DEFAULT NULL,
  `frequenceRespiratoire` int DEFAULT NULL,
  `saturationOxygene` int DEFAULT NULL,
  `glycemie` double DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `developpementPsychomoteur` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `motifDeConsultation` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `perimetreCranien` double DEFAULT NULL,
  `rendezVousId` int DEFAULT NULL,
  `justification` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Consultation_patientId_fkey` (`patientId`),
  KEY `Consultation_rendezVousId_fkey` (`rendezVousId`),
  CONSTRAINT `Consultation_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Consultation_rendezVousId_fkey` FOREIGN KEY (`rendezVousId`) REFERENCES `rendezvous` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation`
--

LOCK TABLES `consultation` WRITE;
/*!40000 ALTER TABLE `consultation` DISABLE KEYS */;
INSERT INTO `consultation` VALUES (159,57,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:46:00.000',NULL,'j',NULL,NULL,NULL),(160,57,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:47:00.000',NULL,'l',NULL,NULL,NULL),(161,57,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:47:00.000',NULL,'l',NULL,NULL,NULL),(162,56,'l',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:47:00.000',NULL,NULL,NULL,NULL,NULL),(163,56,'l',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:47:00.000',NULL,NULL,NULL,NULL,NULL),(164,56,'l',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:47:00.000',NULL,NULL,NULL,NULL,NULL),(167,56,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:48:00.000',NULL,'k',NULL,NULL,NULL),(168,59,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:48:00.000',NULL,'a',NULL,NULL,NULL),(169,59,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:49:00.000',NULL,'bb',NULL,NULL,NULL),(172,58,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:50:00.000',NULL,'a',NULL,NULL,NULL),(176,56,'1',1,1,1,1,1,1,1,1,1,'2025-11-23 20:51:00.000','1','1',1,NULL,NULL),(177,56,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-23 21:01:00.000',NULL,'mossaab0',NULL,NULL,NULL),(181,60,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-23 22:50:00.000',NULL,'mk',NULL,NULL,NULL),(182,60,'1',1,1,1,1,1,1,1,1,1,'2025-11-23 22:50:00.000','1','2',1,NULL,NULL),(183,55,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-23 22:51:00.000',NULL,'m',NULL,NULL,NULL),(184,55,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-23 22:51:00.000',NULL,'kkkk',NULL,NULL,NULL),(186,63,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-22 23:00:00.000',NULL,'m',NULL,NULL,NULL),(187,56,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-28 21:04:00.000',NULL,'a',NULL,NULL,NULL),(188,56,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-28 21:04:00.000',NULL,'k',NULL,NULL,NULL),(189,56,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-28 21:04:00.000',NULL,'l',NULL,NULL,NULL),(190,56,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-28 21:04:00.000',NULL,',',NULL,NULL,NULL),(191,56,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-28 21:11:00.000',NULL,NULL,NULL,NULL,NULL),(192,63,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-28 21:41:00.000',NULL,'s',NULL,NULL,NULL),(193,59,'',NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,'2025-11-28 21:41:00.000',NULL,NULL,NULL,NULL,NULL),(194,57,'',NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,'2025-11-28 21:41:00.000',NULL,NULL,NULL,NULL,NULL),(195,59,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,'2025-11-28 21:42:00.000',NULL,NULL,NULL,NULL,NULL),(196,63,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-12 10:02:00.000',NULL,NULL,NULL,NULL,NULL),(197,64,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-12 19:52:00.000',NULL,'s',NULL,NULL,NULL),(198,69,'dslsh',12,12,12,12,12,12,12,12,12,'2026-03-06 21:23:00.000','sldk','klaslsd',12,NULL,NULL),(199,69,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-03-08 01:31:00.000',NULL,NULL,NULL,NULL,NULL),(200,71,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-03-08 01:49:00.000',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `consultation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicament`
--

DROP TABLE IF EXISTS `medicament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicament` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Medicament_nom_key` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=12497 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicament`
--

LOCK TABLES `medicament` WRITE;
/*!40000 ALTER TABLE `medicament` DISABLE KEYS */;
INSERT INTO `medicament` VALUES (11839,'Paracetamol','2025-10-25 23:18:10.944'),(11840,'Doliprane','2025-10-25 23:18:10.944'),(11841,'Efferalgan','2025-10-25 23:18:10.944'),(11842,'Panadol','2025-10-25 23:18:10.944'),(11843,'Ibuprofen','2025-10-25 23:18:10.944'),(11844,'Nurofen','2025-10-25 23:18:10.944'),(11845,'Advil','2025-10-25 23:18:10.944'),(11846,'Brufen','2025-10-25 23:18:10.944'),(11847,'Ketoprofen','2025-10-25 23:18:10.944'),(11848,'Profenid','2025-10-25 23:18:10.944'),(11849,'Diclofenac','2025-10-25 23:18:10.944'),(11850,'Voltarene','2025-10-25 23:18:10.944'),(11851,'Amoxicillin','2025-10-25 23:18:10.944'),(11852,'Clamoxyl','2025-10-25 23:18:10.944'),(11853,'Augmentin','2025-10-25 23:18:10.944'),(11854,'Clavulin','2025-10-25 23:18:10.944'),(11855,'Cefixime','2025-10-25 23:18:10.944'),(11856,'Oroken','2025-10-25 23:18:10.944'),(11857,'Suprax','2025-10-25 23:18:10.944'),(11858,'Cefpodoxime','2025-10-25 23:18:10.944'),(11859,'Orelox','2025-10-25 23:18:10.944'),(11860,'Cefuroxime','2025-10-25 23:18:10.944'),(11861,'Zinnat','2025-10-25 23:18:10.944'),(11862,'Ceftriaxone','2025-10-25 23:18:10.944'),(11863,'Rocephin','2025-10-25 23:18:10.944'),(11864,'Cefotaxime','2025-10-25 23:18:10.944'),(11865,'Claforan','2025-10-25 23:18:10.944'),(11866,'Azithromycin','2025-10-25 23:18:10.944'),(11867,'Zithromax','2025-10-25 23:18:10.944'),(11868,'Azomax','2025-10-25 23:18:10.944'),(11869,'Clarithromycin','2025-10-25 23:18:10.944'),(11870,'Klacid','2025-10-25 23:18:10.944'),(11871,'Erythromycin','2025-10-25 23:18:10.944'),(11872,'Erythrocin','2025-10-25 23:18:10.944'),(11873,'Spiramycin','2025-10-25 23:18:10.944'),(11874,'Rovamycine','2025-10-25 23:18:10.944'),(11875,'Metronidazole','2025-10-25 23:18:10.944'),(11876,'Flagyl','2025-10-25 23:18:10.944'),(11877,'Cotrimoxazole','2025-10-25 23:18:10.944'),(11878,'Bactrim','2025-10-25 23:18:10.944'),(11879,'Septrin','2025-10-25 23:18:10.944'),(11880,'Gentamicin','2025-10-25 23:18:10.944'),(11881,'Amikacin','2025-10-25 23:18:10.944'),(11882,'Vancomycin','2025-10-25 23:18:10.944'),(11883,'Meropenem','2025-10-25 23:18:10.944'),(11884,'Imipenem','2025-10-25 23:18:10.944'),(11885,'Ciprofloxacin','2025-10-25 23:18:10.944'),(11886,'Ofloxacin','2025-10-25 23:18:10.944'),(11887,'Levofloxacin','2025-10-25 23:18:10.944'),(11888,'Doxycycline','2025-10-25 23:18:10.944'),(11889,'Tetracycline','2025-10-25 23:18:10.944'),(11890,'Clindamycin','2025-10-25 23:18:10.944'),(11891,'Rifampicin','2025-10-25 23:18:10.944'),(11892,'Isoniazid','2025-10-25 23:18:10.944'),(11893,'Pyrazinamide','2025-10-25 23:18:10.944'),(11894,'Ethambutol','2025-10-25 23:18:10.944'),(11895,'Hydrocortisone','2025-10-25 23:18:10.944'),(11896,'Prednisolone','2025-10-25 23:18:10.944'),(11897,'Solupred','2025-10-25 23:18:10.944'),(11898,'Dexamethasone','2025-10-25 23:18:10.944'),(11899,'Betamethasone','2025-10-25 23:18:10.944'),(11900,'Budesonide','2025-10-25 23:18:10.944'),(11901,'Fluticasone','2025-10-25 23:18:10.944'),(11902,'Montelukast','2025-10-25 23:18:10.944'),(11903,'Singulair','2025-10-25 23:18:10.944'),(11904,'Salbutamol','2025-10-25 23:18:10.944'),(11905,'Ventolin','2025-10-25 23:18:10.944'),(11906,'Terbutaline','2025-10-25 23:18:10.944'),(11907,'Bricanyl','2025-10-25 23:18:10.944'),(11908,'Ipratropium','2025-10-25 23:18:10.944'),(11909,'Atrovent','2025-10-25 23:18:10.944'),(11910,'Ambroxol','2025-10-25 23:18:10.944'),(11911,'Mucosolvan','2025-10-25 23:18:10.944'),(11912,'Bromhexine','2025-10-25 23:18:10.944'),(11913,'Bisolvon','2025-10-25 23:18:10.944'),(11914,'Acetylcysteine','2025-10-25 23:18:10.944'),(11915,'Fluimucil','2025-10-25 23:18:10.944'),(11916,'Exomuc','2025-10-25 23:18:10.944'),(11917,'Carbocisteine','2025-10-25 23:18:10.944'),(11918,'Rhinathiol','2025-10-25 23:18:10.944'),(11919,'Dextromethorphan','2025-10-25 23:18:10.944'),(11920,'Toplexil','2025-10-25 23:18:10.944'),(11921,'Guaifenesin','2025-10-25 23:18:10.944'),(11922,'Mucofluid','2025-10-25 23:18:10.944'),(11923,'Oxomemazine','2025-10-25 23:18:10.944'),(11924,'Toplexil sirop','2025-10-25 23:18:10.944'),(11925,'Pseudoephedrine','2025-10-25 23:18:10.944'),(11926,'Sudafed','2025-10-25 23:18:10.944'),(11927,'Cetirizine','2025-10-25 23:18:10.944'),(11928,'Zyrtec','2025-10-25 23:18:10.944'),(11929,'Loratadine','2025-10-25 23:18:10.944'),(11930,'Clarityne','2025-10-25 23:18:10.944'),(11931,'Desloratadine','2025-10-25 23:18:10.944'),(11932,'Aerius','2025-10-25 23:18:10.944'),(11933,'Fexofenadine','2025-10-25 23:18:10.944'),(11934,'Telfast','2025-10-25 23:18:10.944'),(11935,'Chlorpheniramine','2025-10-25 23:18:10.944'),(11936,'Piriton','2025-10-25 23:18:10.944'),(11937,'Hydroxyzine','2025-10-25 23:18:10.944'),(11938,'Atarax','2025-10-25 23:18:10.944'),(11939,'Levocetirizine','2025-10-25 23:18:10.944'),(11940,'Xyzal','2025-10-25 23:18:10.944'),(11941,'Omeprazole','2025-10-25 23:18:10.944'),(11942,'Mopral','2025-10-25 23:18:10.944'),(11943,'Losec','2025-10-25 23:18:10.944'),(11944,'Esomeprazole','2025-10-25 23:18:10.944'),(11945,'Nexium','2025-10-25 23:18:10.944'),(11946,'Ranitidine','2025-10-25 23:18:10.944'),(11947,'Azantac','2025-10-25 23:18:10.944'),(11948,'Domperidone','2025-10-25 23:18:10.944'),(11949,'Motilium','2025-10-25 23:18:10.944'),(11950,'Metoclopramide','2025-10-25 23:18:10.944'),(11951,'Primperan','2025-10-25 23:18:10.944'),(11952,'Smectite','2025-10-25 23:18:10.944'),(11953,'Smecta','2025-10-25 23:18:10.944'),(11954,'Oral Rehydration Salts','2025-10-25 23:18:10.944'),(11955,'Adiaril','2025-10-25 23:18:10.944'),(11956,'Hydralin','2025-10-25 23:18:10.944'),(11957,'Lactulose','2025-10-25 23:18:10.944'),(11958,'Duphalac','2025-10-25 23:18:10.944'),(11959,'Magnesium Hydroxide','2025-10-25 23:18:10.944'),(11960,'Probiotics','2025-10-25 23:18:10.944'),(11961,'Ultra-Levure','2025-10-25 23:18:10.944'),(11962,'Enterogermina','2025-10-25 23:18:10.944'),(11963,'Lactibiane','2025-10-25 23:18:10.944'),(11964,'Zinc sulfate','2025-10-25 23:18:10.944'),(11965,'ZinCure','2025-10-25 23:18:10.944'),(11966,'Nystatin','2025-10-25 23:18:10.944'),(11967,'Mycostatin','2025-10-25 23:18:10.944'),(11968,'Miconazole','2025-10-25 23:18:10.944'),(11969,'Daktarin','2025-10-25 23:18:10.944'),(11970,'Clotrimazole','2025-10-25 23:18:10.944'),(11971,'Canesten','2025-10-25 23:18:10.944'),(11972,'Fluconazole','2025-10-25 23:18:10.944'),(11973,'Triflucan','2025-10-25 23:18:10.944'),(11974,'Ketoconazole','2025-10-25 23:18:10.944'),(11975,'Acyclovir','2025-10-25 23:18:10.944'),(11976,'Zovirax','2025-10-25 23:18:10.944'),(11977,'Oseltamivir','2025-10-25 23:18:10.944'),(11978,'Tamiflu','2025-10-25 23:18:10.944'),(11979,'Albendazole','2025-10-25 23:18:10.944'),(11980,'Zentel','2025-10-25 23:18:10.944'),(11981,'Mebendazole','2025-10-25 23:18:10.944'),(11982,'Vermox','2025-10-25 23:18:10.944'),(11983,'Nitazoxanide','2025-10-25 23:18:10.944'),(11984,'Annita','2025-10-25 23:18:10.944'),(11985,'Praziquantel','2025-10-25 23:18:10.944'),(11986,'Biltricide','2025-10-25 23:18:10.944'),(11987,'Mupirocin','2025-10-25 23:18:10.944'),(11988,'Bactroban','2025-10-25 23:18:10.944'),(11989,'Fusidic acid','2025-10-25 23:18:10.944'),(11990,'Fucidin','2025-10-25 23:18:10.944'),(11991,'Neomycin','2025-10-25 23:18:10.944'),(11992,'Gentamicin cream','2025-10-25 23:18:10.944'),(11993,'Hydrocortisone cream','2025-10-25 23:18:10.944'),(11994,'Zinc oxide','2025-10-25 23:18:10.944'),(11995,'Bepanthen','2025-10-25 23:18:10.944'),(11996,'Sudocrem','2025-10-25 23:18:10.944'),(11997,'Eosin solution','2025-10-25 23:18:10.944'),(11998,'Calamine lotion','2025-10-25 23:18:10.944'),(11999,'Permethrin','2025-10-25 23:18:10.944'),(12000,'Elimite','2025-10-25 23:18:10.944'),(12001,'Vitamin D','2025-10-25 23:18:10.944'),(12002,'Uvedose','2025-10-25 23:18:10.944'),(12003,'ZymaD','2025-10-25 23:18:10.944'),(12004,'Vitamin C','2025-10-25 23:18:10.944'),(12005,'Cevarol','2025-10-25 23:18:10.944'),(12006,'Redoxon','2025-10-25 23:18:10.944'),(12007,'Iron','2025-10-25 23:18:10.944'),(12008,'Tardyferon','2025-10-25 23:18:10.944'),(12009,'Tot’Héma','2025-10-25 23:18:10.944'),(12010,'Folic acid','2025-10-25 23:18:10.944'),(12011,'Multivitamin drops','2025-10-25 23:18:10.944'),(12012,'Pediavit','2025-10-25 23:18:10.944'),(12013,'Tonovit','2025-10-25 23:18:10.944'),(12014,'Vitamin B complex','2025-10-25 23:18:10.944'),(12015,'Calcium gluconate','2025-10-25 23:18:10.944'),(12016,'Magnesium sulfate','2025-10-25 23:18:10.944'),(12017,'Paraffin oil','2025-10-25 23:18:10.944'),(12018,'ORS','2025-10-25 23:18:10.944'),(12019,'Hydrocortisone injectable','2025-10-25 23:18:10.944'),(12020,'Cefepime','2025-10-25 23:18:10.944'),(12021,'Linezolid','2025-10-25 23:18:10.944'),(12022,'Colistin','2025-10-25 23:18:10.944'),(12023,'Aztreonam','2025-10-25 23:18:10.944'),(12024,'Ampicillin','2025-10-25 23:18:10.944'),(12025,'Penicillin V','2025-10-25 23:18:10.944'),(12026,'Penicillin G','2025-10-25 23:18:10.944'),(12027,'Chloramphenicol','2025-10-25 23:18:10.944'),(12028,'Vancomycin syrup','2025-10-25 23:18:10.944'),(12029,'Cefdinir','2025-10-25 23:18:10.944'),(12030,'Roxithromycin','2025-10-25 23:18:10.944'),(12031,'Telithromycin','2025-10-25 23:18:10.944'),(12032,'Nitrofurantoin','2025-10-25 23:18:10.944'),(12033,'Cefaclor','2025-10-25 23:18:10.944'),(12034,'Cefalexin','2025-10-25 23:18:10.944'),(12035,'Cephalexin','2025-10-25 23:18:10.944'),(12036,'Ofloxacin drops','2025-10-25 23:18:10.944'),(12037,'Cefotetan','2025-10-25 23:18:10.944'),(12038,'Ceftazidime','2025-10-25 23:18:10.944'),(12039,'Cefoperazone','2025-10-25 23:18:10.944'),(12040,'Cefazolin','2025-10-25 23:18:10.944'),(12041,'Amlodipine','2025-10-25 23:18:10.944'),(12042,'Norvasc','2025-10-25 23:18:10.944'),(12043,'Lisinopril','2025-10-25 23:18:10.944'),(12044,'Enalapril','2025-10-25 23:18:10.944'),(12045,'Captopril','2025-10-25 23:18:10.944'),(12046,'Perindopril','2025-10-25 23:18:10.944'),(12047,'Ramipril','2025-10-25 23:18:10.944'),(12048,'Losartan','2025-10-25 23:18:10.944'),(12049,'Valsartan','2025-10-25 23:18:10.944'),(12050,'Telmisartan','2025-10-25 23:18:10.944'),(12051,'Olmesartan','2025-10-25 23:18:10.944'),(12052,'Irbesartan','2025-10-25 23:18:10.944'),(12053,'Bisoprolol','2025-10-25 23:18:10.944'),(12054,'Metoprolol','2025-10-25 23:18:10.944'),(12055,'Atenolol','2025-10-25 23:18:10.944'),(12056,'Carvedilol','2025-10-25 23:18:10.944'),(12057,'Propranolol','2025-10-25 23:18:10.944'),(12058,'Furosemide','2025-10-25 23:18:10.944'),(12059,'Lasix','2025-10-25 23:18:10.944'),(12060,'Hydrochlorothiazide','2025-10-25 23:18:10.944'),(12061,'Spironolactone','2025-10-25 23:18:10.944'),(12062,'Aldactone','2025-10-25 23:18:10.944'),(12063,'Indapamide','2025-10-25 23:18:10.944'),(12064,'Clopidogrel','2025-10-25 23:18:10.944'),(12065,'Plavix','2025-10-25 23:18:10.944'),(12066,'Aspirin','2025-10-25 23:18:10.944'),(12067,'CardioAspirin','2025-10-25 23:18:10.944'),(12068,'Atorvastatin','2025-10-25 23:18:10.944'),(12069,'Lipitor','2025-10-25 23:18:10.944'),(12070,'Rosuvastatin','2025-10-25 23:18:10.944'),(12071,'Crestor','2025-10-25 23:18:10.944'),(12072,'Simvastatin','2025-10-25 23:18:10.944'),(12073,'Zocor','2025-10-25 23:18:10.944'),(12074,'Ezetimibe','2025-10-25 23:18:10.944'),(12075,'Fenofibrate','2025-10-25 23:18:10.944'),(12076,'Gemfibrozil','2025-10-25 23:18:10.944'),(12077,'Nitroglycerin','2025-10-25 23:18:10.944'),(12078,'Isosorbide dinitrate','2025-10-25 23:18:10.944'),(12079,'Isosorbide mononitrate','2025-10-25 23:18:10.944'),(12080,'Digoxin','2025-10-25 23:18:10.944'),(12081,'Amiodarone','2025-10-25 23:18:10.944'),(12082,'Warfarin','2025-10-25 23:18:10.944'),(12083,'Heparin','2025-10-25 23:18:10.944'),(12084,'Enoxaparin','2025-10-25 23:18:10.944'),(12085,'Clexane','2025-10-25 23:18:10.944'),(12086,'Apixaban','2025-10-25 23:18:10.944'),(12087,'Eliquis','2025-10-25 23:18:10.944'),(12088,'Rivaroxaban','2025-10-25 23:18:10.944'),(12089,'Xarelto','2025-10-25 23:18:10.944'),(12090,'Dabigatran','2025-10-25 23:18:10.944'),(12091,'Pradaxa','2025-10-25 23:18:10.944'),(12092,'Insulin','2025-10-25 23:18:10.944'),(12093,'Metformin','2025-10-25 23:18:10.944'),(12094,'Glucophage','2025-10-25 23:18:10.944'),(12095,'Gliclazide','2025-10-25 23:18:10.944'),(12096,'Diamicron','2025-10-25 23:18:10.944'),(12097,'Glimepiride','2025-10-25 23:18:10.944'),(12098,'Amaryl','2025-10-25 23:18:10.944'),(12099,'Sitagliptin','2025-10-25 23:18:10.944'),(12100,'Januvia','2025-10-25 23:18:10.944'),(12101,'Vildagliptin','2025-10-25 23:18:10.944'),(12102,'Galvus','2025-10-25 23:18:10.944'),(12103,'Empagliflozin','2025-10-25 23:18:10.944'),(12104,'Jardiance','2025-10-25 23:18:10.944'),(12105,'Dapagliflozin','2025-10-25 23:18:10.944'),(12106,'Forxiga','2025-10-25 23:18:10.944'),(12107,'Pioglitazone','2025-10-25 23:18:10.944'),(12108,'Actos','2025-10-25 23:18:10.944'),(12109,'Insulin glargine','2025-10-25 23:18:10.944'),(12110,'Lantus','2025-10-25 23:18:10.944'),(12111,'Insulin aspart','2025-10-25 23:18:10.944'),(12112,'NovoRapid','2025-10-25 23:18:10.944'),(12113,'Insulin lispro','2025-10-25 23:18:10.944'),(12114,'Humalog','2025-10-25 23:18:10.944'),(12115,'Insulin detemir','2025-10-25 23:18:10.944'),(12116,'Levemir','2025-10-25 23:18:10.944'),(12117,'Insulin NPH','2025-10-25 23:18:10.944'),(12118,'Protaphane','2025-10-25 23:18:10.944'),(12119,'Insulin regular','2025-10-25 23:18:10.944'),(12120,'Actrapid','2025-10-25 23:18:10.944'),(12121,'Vitamin B12','2025-10-25 23:18:10.944'),(12122,'Cyanocobalamin','2025-10-25 23:18:10.944'),(12123,'Thiamine','2025-10-25 23:18:10.944'),(12124,'Pyridoxine','2025-10-25 23:18:10.944'),(12125,'Riboflavin','2025-10-25 23:18:10.944'),(12126,'Ascorbic acid','2025-10-25 23:18:10.944'),(12127,'Biotin','2025-10-25 23:18:10.944'),(12128,'Vitamin E','2025-10-25 23:18:10.944'),(12129,'Vitamin A','2025-10-25 23:18:10.944'),(12130,'Retinol','2025-10-25 23:18:10.944'),(12131,'Calcium carbonate','2025-10-25 23:18:10.944'),(12132,'Ferrous sulfate','2025-10-25 23:18:10.944'),(12133,'Potassium chloride','2025-10-25 23:18:10.944'),(12134,'Sodium chloride','2025-10-25 23:18:10.944'),(12135,'Oral electrolytes','2025-10-25 23:18:10.944'),(12136,'Magnesium citrate','2025-10-25 23:18:10.944'),(12137,'Loperamide','2025-10-25 23:18:10.944'),(12138,'Imodium','2025-10-25 23:18:10.944'),(12139,'Racecadotril','2025-10-25 23:18:10.944'),(12140,'Hidrasec','2025-10-25 23:18:10.944'),(12141,'Ondansetron','2025-10-25 23:18:10.944'),(12142,'Zofran','2025-10-25 23:18:10.944'),(12143,'Granisetron','2025-10-25 23:18:10.944'),(12144,'Metopimazine','2025-10-25 23:18:10.944'),(12145,'Vogalene','2025-10-25 23:18:10.944'),(12146,'Pantoprazole','2025-10-25 23:18:10.944'),(12147,'Lansoprazole','2025-10-25 23:18:10.944'),(12148,'Rabeprazole','2025-10-25 23:18:10.944'),(12149,'Itopride','2025-10-25 23:18:10.944'),(12150,'Mosapride','2025-10-25 23:18:10.944'),(12151,'Linaclotide','2025-10-25 23:18:10.944'),(12152,'Lubiprostone','2025-10-25 23:18:10.944'),(12153,'Mesalazine','2025-10-25 23:18:10.944'),(12154,'Asacol','2025-10-25 23:18:10.944'),(12155,'Sulfasalazine','2025-10-25 23:18:10.944'),(12156,'Prednisone','2025-10-25 23:18:10.944'),(12157,'Corticotropin','2025-10-25 23:18:10.944'),(12158,'Methotrexate','2025-10-25 23:18:10.944'),(12159,'Azathioprine','2025-10-25 23:18:10.944'),(12160,'Cyclophosphamide','2025-10-25 23:18:10.944'),(12161,'Cyclosporine','2025-10-25 23:18:10.944'),(12162,'Tacrolimus','2025-10-25 23:18:10.944'),(12163,'Mycophenolate mofetil','2025-10-25 23:18:10.944'),(12164,'Hydroxychloroquine','2025-10-25 23:18:10.944'),(12165,'Chloroquine','2025-10-25 23:18:10.944'),(12166,'Allopurinol','2025-10-25 23:18:10.944'),(12167,'Colchicine','2025-10-25 23:18:10.944'),(12168,'Febuxostat','2025-10-25 23:18:10.944'),(12169,'Alendronate','2025-10-25 23:18:10.944'),(12170,'Risedronate','2025-10-25 23:18:10.944'),(12171,'Calcitonin','2025-10-25 23:18:10.944'),(12172,'Teriparatide','2025-10-25 23:18:10.944'),(12173,'Denosumab','2025-10-25 23:18:10.944'),(12174,'Diazepam','2025-10-25 23:18:10.944'),(12175,'Valium','2025-10-25 23:18:10.944'),(12176,'Lorazepam','2025-10-25 23:18:10.944'),(12177,'Alprazolam','2025-10-25 23:18:10.944'),(12178,'Xanax','2025-10-25 23:18:10.944'),(12179,'Clonazepam','2025-10-25 23:18:10.944'),(12180,'Rivotril','2025-10-25 23:18:10.944'),(12181,'Fluoxetine','2025-10-25 23:18:10.944'),(12182,'Prozac','2025-10-25 23:18:10.944'),(12183,'Sertraline','2025-10-25 23:18:10.944'),(12184,'Zoloft','2025-10-25 23:18:10.944'),(12185,'Paroxetine','2025-10-25 23:18:10.944'),(12186,'Paxil','2025-10-25 23:18:10.944'),(12187,'Escitalopram','2025-10-25 23:18:10.944'),(12188,'Cipralex','2025-10-25 23:18:10.944'),(12189,'Citalopram','2025-10-25 23:18:10.944'),(12190,'Celexa','2025-10-25 23:18:10.944'),(12191,'Amitriptyline','2025-10-25 23:18:10.944'),(12192,'Mirtazapine','2025-10-25 23:18:10.944'),(12193,'Venlafaxine','2025-10-25 23:18:10.944'),(12194,'Duloxetine','2025-10-25 23:18:10.944'),(12195,'Bupropion','2025-10-25 23:18:10.944'),(12196,'Trazodone','2025-10-25 23:18:10.944'),(12197,'Quetiapine','2025-10-25 23:18:10.944'),(12198,'Seroquel','2025-10-25 23:18:10.944'),(12199,'Olanzapine','2025-10-25 23:18:10.944'),(12200,'Zyprexa','2025-10-25 23:18:10.944'),(12201,'Risperidone','2025-10-25 23:18:10.944'),(12202,'Risperdal','2025-10-25 23:18:10.944'),(12203,'Aripiprazole','2025-10-25 23:18:10.944'),(12204,'Abilify','2025-10-25 23:18:10.944'),(12205,'Haloperidol','2025-10-25 23:18:10.944'),(12206,'Clozapine','2025-10-25 23:18:10.944'),(12207,'Lithium carbonate','2025-10-25 23:18:10.944'),(12208,'Lamotrigine','2025-10-25 23:18:10.944'),(12209,'Valproate','2025-10-25 23:18:10.944'),(12210,'Depakine','2025-10-25 23:18:10.944'),(12211,'Carbamazepine','2025-10-25 23:18:10.944'),(12212,'Tegretol','2025-10-25 23:18:10.944'),(12213,'Levetiracetam','2025-10-25 23:18:10.944'),(12214,'Keppra','2025-10-25 23:18:10.944'),(12215,'Phenytoin','2025-10-25 23:18:10.944'),(12216,'Phenobarbital','2025-10-25 23:18:10.944'),(12217,'Topiramate','2025-10-25 23:18:10.944'),(12218,'Gabapentin','2025-10-25 23:18:10.944'),(12219,'Pregabalin','2025-10-25 23:18:10.944'),(12220,'Lyrica','2025-10-25 23:18:10.944'),(12221,'Sumatriptan','2025-10-25 23:18:10.944'),(12222,'Rizatriptan','2025-10-25 23:18:10.944'),(12223,'Ergotamine','2025-10-25 23:18:10.944'),(12224,'Betahistine','2025-10-25 23:18:10.944'),(12225,'Cinnarizine','2025-10-25 23:18:10.944'),(12226,'Flunarizine','2025-10-25 23:18:10.944'),(12227,'Meclizine','2025-10-25 23:18:10.944'),(12228,'Dimenhydrinate','2025-10-25 23:18:10.944'),(12229,'Hyoscine','2025-10-25 23:18:10.944'),(12230,'Scopolamine','2025-10-25 23:18:10.944'),(12231,'Tamsulosin','2025-10-25 23:18:10.944'),(12232,'Finasteride','2025-10-25 23:18:10.944'),(12233,'Dutasteride','2025-10-25 23:18:10.944'),(12234,'Silodosin','2025-10-25 23:18:10.944'),(12235,'Oxybutynin','2025-10-25 23:18:10.944'),(12236,'Tolterodine','2025-10-25 23:18:10.944'),(12237,'Solifenacin','2025-10-25 23:18:10.944'),(12238,'Mirabegron','2025-10-25 23:18:10.944'),(12239,'Sildenafil','2025-10-25 23:18:10.944'),(12240,'Viagra','2025-10-25 23:18:10.944'),(12241,'Tadalafil','2025-10-25 23:18:10.944'),(12242,'Cialis','2025-10-25 23:18:10.944'),(12243,'Vardenafil','2025-10-25 23:18:10.944'),(12244,'Levitra','2025-10-25 23:18:10.944'),(12245,'Salmeterol','2025-10-25 23:18:10.944'),(12246,'Formoterol','2025-10-25 23:18:10.944'),(12247,'Theophylline','2025-10-25 23:18:10.944'),(12248,'Beclomethasone','2025-10-25 23:18:10.944'),(12249,'Mometasone','2025-10-25 23:18:10.944'),(12250,'Fluocinolone','2025-10-25 23:18:10.944'),(12251,'Hydrocortisone ointment','2025-10-25 23:18:10.944'),(12252,'Triamcinolone','2025-10-25 23:18:10.944'),(12253,'Clobetasol','2025-10-25 23:18:10.944'),(12254,'Betnovate','2025-10-25 23:18:10.944'),(12255,'Tacrolimus ointment','2025-10-25 23:18:10.944'),(12256,'Pimecrolimus','2025-10-25 23:18:10.944'),(12257,'Desonide','2025-10-25 23:18:10.944'),(12258,'Isotretinoin','2025-10-25 23:18:10.944'),(12259,'Tretinoin','2025-10-25 23:18:10.944'),(12260,'Adapalene','2025-10-25 23:18:10.944'),(12261,'Benzoyl peroxide','2025-10-25 23:18:10.944'),(12262,'Clindamycin gel','2025-10-25 23:18:10.944'),(12263,'Erythromycin gel','2025-10-25 23:18:10.944'),(12264,'Ketoconazole shampoo','2025-10-25 23:18:10.944'),(12265,'Minoxidil','2025-10-25 23:18:10.944'),(12266,'Finasteride oral','2025-10-25 23:18:10.944'),(12267,'Methyldopa','2025-10-25 23:18:10.944'),(12268,'Hydralazine','2025-10-25 23:18:10.944'),(12269,'Nifedipine','2025-10-25 23:18:10.944'),(12270,'Verapamil','2025-10-25 23:18:10.944'),(12271,'Diltiazem','2025-10-25 23:18:10.944'),(12272,'Nicardipine','2025-10-25 23:18:10.944'),(12273,'Ivabradine','2025-10-25 23:18:10.944'),(12274,'Ranolazine','2025-10-25 23:18:10.944'),(12275,'Trimetazidine','2025-10-25 23:18:10.944'),(12276,'Oxycodone','2025-10-25 23:18:10.944'),(12277,'Morphine','2025-10-25 23:18:10.944'),(12278,'Tramadol','2025-10-25 23:18:10.944'),(12279,'Codeine','2025-10-25 23:18:10.944'),(12280,'Naloxone','2025-10-25 23:18:10.944'),(12281,'Buprenorphine','2025-10-25 23:18:10.944'),(12282,'Fentanyl','2025-10-25 23:18:10.944'),(12283,'Tapentadol','2025-10-25 23:18:10.944'),(12284,'Methadone','2025-10-25 23:18:10.944'),(12285,'Ketamine','2025-10-25 23:18:10.944'),(12286,'Midazolam','2025-10-25 23:18:10.944'),(12287,'Propofol','2025-10-25 23:18:10.944'),(12288,'Etomidate','2025-10-25 23:18:10.944'),(12289,'Thiopental','2025-10-25 23:18:10.944'),(12290,'Isoflurane','2025-10-25 23:18:10.944'),(12291,'Sevoflurane','2025-10-25 23:18:10.944'),(12292,'Lidocaine','2025-10-25 23:18:10.944'),(12293,'Bupivacaine','2025-10-25 23:18:10.944'),(12294,'Ropivacaine','2025-10-25 23:18:10.944'),(12295,'Articaine','2025-10-25 23:18:10.944'),(12296,'Ketorolac','2025-10-25 23:18:10.944'),(12297,'Celecoxib','2025-10-25 23:18:10.944'),(12298,'Etoricoxib','2025-10-25 23:18:10.944'),(12299,'Meloxicam','2025-10-25 23:18:10.944'),(12300,'Piroxicam','2025-10-25 23:18:10.944'),(12301,'Naproxen','2025-10-25 23:18:10.944'),(12302,'Sulindac','2025-10-25 23:18:10.944'),(12303,'Tolmetin','2025-10-25 23:18:10.944'),(12304,'Indomethacin','2025-10-25 23:18:10.944'),(12305,'Mesna','2025-10-25 23:18:10.944'),(12306,'Ondansetron ODT','2025-10-25 23:18:10.944'),(12307,'Granisetron injection','2025-10-25 23:18:10.944'),(12308,'Palonosetron','2025-10-25 23:18:10.944'),(12309,'Dexamethasone injection','2025-10-25 23:18:10.944'),(12310,'Betahistine dihydrochloride','2025-10-25 23:18:10.944'),(12311,'Baclofen','2025-10-25 23:18:10.944'),(12312,'Tizanidine','2025-10-25 23:18:10.944'),(12313,'Cyclobenzaprine','2025-10-25 23:18:10.944'),(12314,'Methocarbamol','2025-10-25 23:18:10.944'),(12315,'Carisoprodol','2025-10-25 23:18:10.944'),(12316,'Riluzole','2025-10-25 23:18:10.944'),(12317,'Memantine','2025-10-25 23:18:10.944'),(12318,'Donepezil','2025-10-25 23:18:10.944'),(12319,'Rivastigmine','2025-10-25 23:18:10.944'),(12320,'Galantamine','2025-10-25 23:18:10.944'),(12321,'Selegiline','2025-10-25 23:18:10.944'),(12322,'Rasagiline','2025-10-25 23:18:10.944'),(12323,'Entacapone','2025-10-25 23:18:10.944'),(12324,'Levodopa','2025-10-25 23:18:10.944'),(12325,'Carbidopa','2025-10-25 23:18:10.944'),(12326,'Pramipexole','2025-10-25 23:18:10.944'),(12327,'Ropinirole','2025-10-25 23:18:10.944'),(12328,'Amantadine','2025-10-25 23:18:10.944'),(12329,'Dantrolene','2025-10-25 23:18:10.944'),(12330,'Prednisolone acetate','2025-10-25 23:18:10.944'),(12331,'Ciprofloxacin eye drops','2025-10-25 23:18:10.944'),(12332,'Tobramycin','2025-10-25 23:18:10.944'),(12333,'Dexamethasone eye drops','2025-10-25 23:18:10.944'),(12334,'Timolol','2025-10-25 23:18:10.944'),(12335,'Brimonidine','2025-10-25 23:18:10.944'),(12336,'Latanoprost','2025-10-25 23:18:10.944'),(12337,'Travoprost','2025-10-25 23:18:10.944'),(12338,'Dorzolamide','2025-10-25 23:18:10.944'),(12339,'Acetazolamide','2025-10-25 23:18:10.944'),(12340,'Glycerin','2025-10-25 23:18:10.944'),(12341,'Mannitol','2025-10-25 23:18:10.944'),(12342,'Hypertonic saline','2025-10-25 23:18:10.944'),(12343,'Erythropoietin','2025-10-25 23:18:10.944'),(12344,'Darbepoetin','2025-10-25 23:18:10.944'),(12345,'Filgrastim','2025-10-25 23:18:10.944'),(12346,'Pegfilgrastim','2025-10-25 23:18:10.944'),(12347,'Granulocyte CSF','2025-10-25 23:18:10.944'),(12348,'Azathioprine oral','2025-10-25 23:18:10.944'),(12349,'Methotrexate injection','2025-10-25 23:18:10.944'),(12350,'Cyclophosphamide IV','2025-10-25 23:18:10.944'),(12351,'Bleomycin','2025-10-25 23:18:10.944'),(12352,'Vincristine','2025-10-25 23:18:10.944'),(12353,'Vinblastine','2025-10-25 23:18:10.944'),(12354,'Paclitaxel','2025-10-25 23:18:10.944'),(12355,'Docetaxel','2025-10-25 23:18:10.944'),(12356,'Cisplatin','2025-10-25 23:18:10.944'),(12357,'Carboplatin','2025-10-25 23:18:10.944'),(12358,'Oxaliplatin','2025-10-25 23:18:10.944'),(12359,'5-Fluorouracil','2025-10-25 23:18:10.944'),(12360,'Capecitabine','2025-10-25 23:18:10.944'),(12361,'Gemcitabine','2025-10-25 23:18:10.944'),(12362,'Irinotecan','2025-10-25 23:18:10.944'),(12363,'Topotecan','2025-10-25 23:18:10.944'),(12364,'Doxorubicin','2025-10-25 23:18:10.944'),(12365,'Epirubicin','2025-10-25 23:18:10.944'),(12366,'Daunorubicin','2025-10-25 23:18:10.944'),(12367,'Trastuzumab','2025-10-25 23:18:10.944'),(12368,'Bevacizumab','2025-10-25 23:18:10.944'),(12369,'Pembrolizumab','2025-10-25 23:18:10.944'),(12370,'Nivolumab','2025-10-25 23:18:10.944'),(12371,'Ipilimumab','2025-10-25 23:18:10.944'),(12372,'Imatinib','2025-10-25 23:18:10.944'),(12373,'Dasatinib','2025-10-25 23:18:10.944'),(12374,'Nilotinib','2025-10-25 23:18:10.944'),(12375,'Erlotinib','2025-10-25 23:18:10.944'),(12376,'Gefitinib','2025-10-25 23:18:10.944'),(12377,'Sorafenib','2025-10-25 23:18:10.944'),(12378,'Sunitinib','2025-10-25 23:18:10.944'),(12379,'Pazopanib','2025-10-25 23:18:10.944'),(12380,'Anastrozole','2025-10-25 23:18:10.944'),(12381,'Letrozole','2025-10-25 23:18:10.944'),(12382,'Tamoxifen','2025-10-25 23:18:10.944'),(12383,'Raloxifene','2025-10-25 23:18:10.944'),(12384,'Clomiphene','2025-10-25 23:18:10.944'),(12385,'Cabergoline','2025-10-25 23:18:10.944'),(12386,'Bromocriptine','2025-10-25 23:18:10.944'),(12387,'Leuprolide','2025-10-25 23:18:10.944'),(12388,'Goserelin','2025-10-25 23:18:10.944'),(12389,'Buserelin','2025-10-25 23:18:10.944'),(12390,'Tripotorelin','2025-10-25 23:18:10.944'),(12391,'Oxytocin','2025-10-25 23:18:10.944'),(12392,'Misoprostol','2025-10-25 23:18:10.944'),(12393,'Mifepristone','2025-10-25 23:18:10.944'),(12394,'Methylergometrine','2025-10-25 23:18:10.944'),(12395,'Nifedipine retard','2025-10-25 23:18:10.944'),(12396,'Magnesium sulfate injection','2025-10-25 23:18:10.944'),(12397,'Calcium gluconate injection','2025-10-25 23:18:10.944'),(12398,'Tranexamic acid','2025-10-25 23:18:10.944'),(12399,'Aminocaproic acid','2025-10-25 23:18:10.944'),(12400,'Folic acid tablets','2025-10-25 23:18:10.944'),(12401,'Ferrous fumarate','2025-10-25 23:18:10.944'),(12402,'Vitamin K','2025-10-25 23:18:10.944'),(12403,'Phytonadione','2025-10-25 23:18:10.944'),(12404,'Acetazolamide tablets','2025-10-25 23:18:10.944'),(12405,'Hydroxyzine syrup','2025-10-25 23:18:10.944'),(12406,'Diphenhydramine','2025-10-25 23:18:10.944'),(12407,'Promethazine','2025-10-25 23:18:10.944'),(12408,'Meclizine hydrochloride','2025-10-25 23:18:10.944'),(12409,'Desmopressin','2025-10-25 23:18:10.944'),(12410,'Vasopressin','2025-10-25 23:18:10.944'),(12411,'Levothyroxine','2025-10-25 23:18:10.944'),(12412,'Liothyronine','2025-10-25 23:18:10.944'),(12413,'Methimazole','2025-10-25 23:18:10.944'),(12414,'Propylthiouracil','2025-10-25 23:18:10.944'),(12415,'Prednisone acetate','2025-10-25 23:18:10.944'),(12416,'Hydrocortisone sodium succinate','2025-10-25 23:18:10.944'),(12417,'Triamcinolone acetonide','2025-10-25 23:18:10.944'),(12418,'Dexamethasone sodium phosphate','2025-10-25 23:18:10.944'),(12419,'Insulin glulisine','2025-10-25 23:18:10.944'),(12420,'Insulin degludec','2025-10-25 23:18:10.944'),(12421,'Insulin mix 30/70','2025-10-25 23:18:10.944'),(12422,'Empagliflozin metformin','2025-10-25 23:18:10.944'),(12423,'Canagliflozin','2025-10-25 23:18:10.944'),(12424,'Ertugliflozin','2025-10-25 23:18:10.944'),(12425,'Alogliptin','2025-10-25 23:18:10.944'),(12426,'Linagliptin','2025-10-25 23:18:10.944'),(12427,'Liraglutide','2025-10-25 23:18:10.944'),(12428,'Semaglutide','2025-10-25 23:18:10.944'),(12429,'Dulaglutide','2025-10-25 23:18:10.944'),(12430,'Exenatide','2025-10-25 23:18:10.944'),(12431,'Bromazepam','2025-10-25 23:18:10.944'),(12432,'Oxazepam','2025-10-25 23:18:10.944'),(12433,'Nitrazepam','2025-10-25 23:18:10.944'),(12434,'Temazepam','2025-10-25 23:18:10.944'),(12435,'Midazolam syrup','2025-10-25 23:18:10.944'),(12436,'Phenylephrine','2025-10-25 23:18:10.944'),(12437,'Xylometazoline','2025-10-25 23:18:10.944'),(12438,'Oxymetazoline','2025-10-25 23:18:10.944'),(12439,'Naphazoline','2025-10-25 23:18:10.944'),(12440,'Fluticasone nasal spray','2025-10-25 23:18:10.944'),(12441,'Mometasone nasal spray','2025-10-25 23:18:10.944'),(12442,'Beclomethasone nasal spray','2025-10-25 23:18:10.944'),(12443,'Ipratropium nasal spray','2025-10-25 23:18:10.944'),(12444,'Montelukast chewable','2025-10-25 23:18:10.944'),(12445,'Cetirizine syrup','2025-10-25 23:18:10.944'),(12446,'Fexofenadine suspension','2025-10-25 23:18:10.944'),(12447,'Levocetirizine drops','2025-10-25 23:18:10.944'),(12448,'Loratadine syrup','2025-10-25 23:18:10.944'),(12449,'Ranitidine syrup','2025-10-25 23:18:10.944'),(12450,'Omeprazole suspension','2025-10-25 23:18:10.944'),(12451,'Esomeprazole granules','2025-10-25 23:18:10.944'),(12452,'Smecta sachets','2025-10-25 23:18:10.944'),(12453,'ORS sachets','2025-10-25 23:18:10.944'),(12454,'Vitamin B complex syrup','2025-10-25 23:18:10.944'),(12455,'Iron syrup','2025-10-25 23:18:10.944'),(12456,'Vitamin D drops','2025-10-25 23:18:10.944'),(12457,'Pediavit drops','2025-10-25 23:18:10.944'),(12458,'Polybion','2025-10-25 23:18:10.944'),(12459,'Vicks','2025-10-25 23:18:10.944'),(12460,'Calpol','2025-10-25 23:18:10.944'),(12461,'Tylenol','2025-10-25 23:18:10.944'),(12462,'Panadeine','2025-10-25 23:18:10.944'),(12463,'Voltfast','2025-10-25 23:18:10.944'),(12464,'Voltaren SR','2025-10-25 23:18:10.944'),(12465,'Movicol','2025-10-25 23:18:10.944'),(12466,'Dulcolax','2025-10-25 23:18:10.944'),(12467,'Senna','2025-10-25 23:18:10.944'),(12468,'Bisacodyl','2025-10-25 23:18:10.944'),(12469,'Glycerin suppository','2025-10-25 23:18:10.944'),(12470,'Fleet enema','2025-10-25 23:18:10.944'),(12471,'Microlax','2025-10-25 23:18:10.944'),(12472,'Anusol','2025-10-25 23:18:10.944'),(12473,'Proctolog','2025-10-25 23:18:10.944'),(12474,'Preparation H','2025-10-25 23:18:10.944'),(12475,'Cortizone','2025-10-25 23:18:10.944'),(12476,'Emla cream','2025-10-25 23:18:10.944'),(12477,'Betadine','2025-10-25 23:18:10.944'),(12478,'Dettol','2025-10-25 23:18:10.944'),(12479,'Savlon','2025-10-25 23:18:10.944'),(12480,'Hydrogen peroxide','2025-10-25 23:18:10.944'),(12481,'Alcohol swab','2025-10-25 23:18:10.944'),(12482,'Normal saline','2025-10-25 23:18:10.944'),(12483,'Sterile water','2025-10-25 23:18:10.944'),(12484,'Glucose 5%','2025-10-25 23:18:10.944'),(12485,'Glucose 10%','2025-10-25 23:18:10.944'),(12486,'NaCl 0.9%','2025-10-25 23:18:10.944'),(12487,'Ringer lactate','2025-10-25 23:18:10.944'),(12489,'kd','2025-11-07 20:15:29.164'),(12490,'oio','2025-11-07 20:15:42.432'),(12491,'mossaab','2025-11-07 20:26:48.402'),(12492,'mossaabl','2025-11-07 20:29:24.394'),(12493,'mossaaboi','2025-11-07 20:32:21.139'),(12494,'paracetamolo','2025-11-07 20:35:52.969'),(12495,'sd','2025-11-10 10:02:18.429'),(12496,'hj','2025-11-24 07:43:03.907');
/*!40000 ALTER TABLE `medicament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordonnance`
--

DROP TABLE IF EXISTS `ordonnance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordonnance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patientId` int NOT NULL,
  `consultationId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Ordonnance_consultationId_key` (`consultationId`),
  KEY `Ordonnance_patientId_fkey` (`patientId`),
  CONSTRAINT `Ordonnance_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Ordonnance_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordonnance`
--

LOCK TABLES `ordonnance` WRITE;
/*!40000 ALTER TABLE `ordonnance` DISABLE KEYS */;
INSERT INTO `ordonnance` VALUES (64,56,177,'2025-11-23 21:01:00.000'),(66,63,196,'2025-12-12 10:02:00.000'),(67,69,198,'2026-03-06 21:23:00.000'),(68,69,199,'2026-03-08 01:31:00.000'),(69,71,200,'2026-03-08 01:49:00.000');
/*!40000 ALTER TABLE `ordonnance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordonnanceitem`
--

DROP TABLE IF EXISTS `ordonnanceitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordonnanceitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ordonnanceId` int NOT NULL,
  `medicamentId` int NOT NULL,
  `dosage` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `frequence` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duree` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OrdonnanceItem_ordonnanceId_fkey` (`ordonnanceId`),
  KEY `OrdonnanceItem_medicamentId_fkey` (`medicamentId`),
  CONSTRAINT `OrdonnanceItem_medicamentId_fkey` FOREIGN KEY (`medicamentId`) REFERENCES `medicament` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `OrdonnanceItem_ordonnanceId_fkey` FOREIGN KEY (`ordonnanceId`) REFERENCES `ordonnance` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordonnanceitem`
--

LOCK TABLES `ordonnanceitem` WRITE;
/*!40000 ALTER TABLE `ordonnanceitem` DISABLE KEYS */;
INSERT INTO `ordonnanceitem` VALUES (131,64,12204,'1 fois/jour','','5 jours',1),(134,66,11975,'—',NULL,NULL,0),(135,66,12260,'—',NULL,NULL,0),(136,67,12260,'10 mg','1 fois / jour','5 jours',1),(137,68,11975,'—',NULL,NULL,0),(138,68,12260,'—',NULL,NULL,0),(139,69,11975,'—',NULL,NULL,0),(140,69,12260,'—',NULL,NULL,0);
/*!40000 ALTER TABLE `ordonnanceitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paiement`
--

DROP TABLE IF EXISTS `paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paiement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patientId` int NOT NULL,
  `montant` double NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Paiement_patientId_fkey` (`patientId`),
  CONSTRAINT `Paiement_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paiement`
--

LOCK TABLES `paiement` WRITE;
/*!40000 ALTER TABLE `paiement` DISABLE KEYS */;
/*!40000 ALTER TABLE `paiement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int DEFAULT NULL,
  `telephone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adresse` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `antecedents` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `groupeSanguin` enum('A_POS','A_NEG','B_POS','B_NEG','AB_POS','AB_NEG','O_POS','O_NEG') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `dateDeNaissance` datetime(3) NOT NULL,
  `poidsDeNaissance` double DEFAULT NULL,
  `sexe` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Patient_nom_key` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (55,'MOSSAAB SAAD',NULL,'0549059825','HARROUCH','DIABET ','A_NEG','2025-10-25 23:31:59.132','2024-12-12 00:00:00.000',3.2,'garçon'),(56,'s',NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:46:09.855','2000-12-12 00:00:00.000',NULL,'garçon'),(57,'h',NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:46:30.687','2000-12-12 00:00:00.000',NULL,'garçon'),(58,'a',NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:48:24.280','2222-12-12 00:00:00.000',NULL,'garçon'),(59,'b',NULL,NULL,NULL,NULL,NULL,'2025-11-18 21:48:34.670','2222-12-12 00:00:00.000',NULL,'garçon'),(60,'m',NULL,NULL,NULL,NULL,NULL,'2025-11-23 20:22:02.848','2000-12-12 00:00:00.000',NULL,'garçon'),(61,'e',NULL,'2','2','2','A_NEG','2025-11-23 20:28:26.775','1999-12-12 00:00:00.000',3.2,'garçon'),(63,'saad',NULL,NULL,NULL,NULL,NULL,'2025-11-23 22:59:47.450','2003-12-12 00:00:00.000',NULL,'fille'),(64,'l',NULL,NULL,NULL,NULL,NULL,'2025-11-28 22:23:07.926','2000-12-12 00:00:00.000',NULL,'garçon'),(68,'q',NULL,NULL,NULL,NULL,NULL,'2025-12-12 19:53:37.158','2000-12-12 00:00:00.000',NULL,'fille'),(69,'mossaab sdjk',NULL,'0549059825',NULL,NULL,'A_POS','2026-03-06 21:22:23.272','2020-02-11 00:00:00.000',3.2,'garçon'),(71,'ld',NULL,NULL,NULL,NULL,NULL,'2026-03-08 01:39:08.226','2026-03-04 00:00:00.000',NULL,'garçon');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `radio`
--

DROP TABLE IF EXISTS `radio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultationId` int DEFAULT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fichier` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `patientId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Radio_consultationId_fkey` (`consultationId`),
  KEY `Radio_patientId_fkey` (`patientId`),
  CONSTRAINT `Radio_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Radio_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `radio`
--

LOCK TABLES `radio` WRITE;
/*!40000 ALTER TABLE `radio` DISABLE KEYS */;
INSERT INTO `radio` VALUES (20,NULL,'s','48.jpg','2025-11-28 21:17:36.196',56),(22,NULL,'k','48.jpg','2025-11-28 22:20:41.834',60);
/*!40000 ALTER TABLE `radio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recettetype`
--

DROP TABLE IF EXISTS `recettetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recettetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recettetype`
--

LOCK TABLES `recettetype` WRITE;
/*!40000 ALTER TABLE `recettetype` DISABLE KEYS */;
INSERT INTO `recettetype` VALUES (13,'diabet');
/*!40000 ALTER TABLE `recettetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recettetypeitem`
--

DROP TABLE IF EXISTS `recettetypeitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recettetypeitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recetteId` int NOT NULL,
  `medicamentId` int NOT NULL,
  `dosage` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `frequence` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duree` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RecetteTypeItem_recetteId_fkey` (`recetteId`),
  KEY `RecetteTypeItem_medicamentId_fkey` (`medicamentId`),
  CONSTRAINT `RecetteTypeItem_medicamentId_fkey` FOREIGN KEY (`medicamentId`) REFERENCES `medicament` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RecetteTypeItem_recetteId_fkey` FOREIGN KEY (`recetteId`) REFERENCES `recettetype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recettetypeitem`
--

LOCK TABLES `recettetypeitem` WRITE;
/*!40000 ALTER TABLE `recettetypeitem` DISABLE KEYS */;
INSERT INTO `recettetypeitem` VALUES (51,13,11975,NULL,NULL,NULL,NULL),(52,13,12260,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `recettetypeitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rendezvous`
--

DROP TABLE IF EXISTS `rendezvous`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rendezvous` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime(3) NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rendezvous`
--

LOCK TABLES `rendezvous` WRITE;
/*!40000 ALTER TABLE `rendezvous` DISABLE KEYS */;
INSERT INTO `rendezvous` VALUES (1,'2002-02-02 01:02:00.000','2'),(2,'2001-01-01 00:01:00.000','1'),(3,'2001-01-01 01:01:00.000','01'),(4,'2000-12-12 11:12:00.000','hiiiii'),(5,'2000-12-11 23:12:00.000','hiii'),(6,'2000-12-11 23:12:00.000','hiii'),(7,'2000-12-11 23:12:00.000','hiii'),(8,'2000-12-11 23:12:00.000','hiii'),(9,'2000-12-11 23:12:00.000','hiii'),(10,'2000-12-11 23:12:00.000','hiii'),(11,'2000-12-11 23:12:00.000','hiii'),(12,'2000-12-11 23:12:00.000','hiii'),(13,'2000-12-11 23:12:00.000','hiii'),(14,'2000-12-11 23:12:00.000','hiii'),(15,'2003-12-11 23:12:00.000','hi'),(16,'2003-12-11 23:12:00.000','hi'),(17,'2003-12-11 23:12:00.000','hi'),(18,'2003-12-11 23:12:00.000','hi'),(19,'2003-12-11 23:12:00.000','hi'),(20,'2003-12-11 23:12:00.000','hi'),(21,'2025-11-23 22:05:00.000','hi'),(22,'2003-12-11 23:12:00.000','hi'),(23,'2003-12-11 23:12:00.000','hii'),(24,'2003-12-11 23:12:00.000','');
/*!40000 ALTER TABLE `rendezvous` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccination`
--

DROP TABLE IF EXISTS `vaccination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patientId` int NOT NULL,
  `vaccineId` int NOT NULL,
  `dateGiven` datetime(3) NOT NULL,
  `doseNumber` int DEFAULT NULL,
  `notes` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Vaccination_vaccineId_fkey` (`vaccineId`),
  KEY `Vaccination_patientId_fkey` (`patientId`),
  CONSTRAINT `Vaccination_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Vaccination_vaccineId_fkey` FOREIGN KEY (`vaccineId`) REFERENCES `vaccine` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccination`
--

LOCK TABLES `vaccination` WRITE;
/*!40000 ALTER TABLE `vaccination` DISABLE KEYS */;
INSERT INTO `vaccination` VALUES (10,55,1,'2025-12-12 00:00:00.000',20,NULL,'2025-10-25 23:32:24.575'),(11,56,1,'2003-12-12 00:00:00.000',12,'l','2025-11-28 21:18:26.924'),(13,69,9,'2017-12-12 00:00:00.000',1,'good','2026-03-08 01:37:20.842');
/*!40000 ALTER TABLE `vaccination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccine`
--

DROP TABLE IF EXISTS `vaccine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Vaccine_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine`
--

LOCK TABLES `vaccine` WRITE;
/*!40000 ALTER TABLE `vaccine` DISABLE KEYS */;
INSERT INTO `vaccine` VALUES (1,'v1','2025-10-11 22:59:14.557'),(3,'m','2025-11-28 21:21:55.321'),(4,'kh','2025-11-28 21:22:29.423'),(5,'a1','2025-11-28 21:29:30.822'),(6,'k1','2025-11-28 21:30:01.099'),(7,'r1','2025-11-28 21:30:06.022'),(8,'n','2025-11-28 21:32:23.163'),(9,'kmossaab','2026-03-08 01:35:39.997');
/*!40000 ALTER TABLE `vaccine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-01 19:43:15

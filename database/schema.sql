CREATE DATABASE  IF NOT EXISTS `flash_sale_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `flash_sale_db`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: flash_sale_db
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_cart_product` (`cart_id`,`product_id`),
  KEY `fk_cart_items_product` (`product_id`),
  CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cart_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (4,2,3,4),(5,3,3,8),(6,4,3,1),(7,5,3,1),(10,8,3,1),(13,11,3,1),(15,13,3,1),(21,19,3,1),(22,20,3,1),(23,21,3,1),(24,22,3,1),(25,23,3,1);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `status` enum('ACTIVE','ABANDONED') NOT NULL DEFAULT 'ACTIVE',
  `last_updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_cart_customer` (`customer_id`),
  CONSTRAINT `fk_carts_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (2,10,'ABANDONED','2026-10-20 08:47:00'),(3,11,'ABANDONED','2026-10-20 09:48:00'),(4,12,'ABANDONED','2026-10-20 10:02:00'),(5,13,'ABANDONED','2026-10-20 10:02:00'),(6,14,'ACTIVE','2026-10-20 10:00:32'),(7,15,'ACTIVE','2026-10-20 10:00:32'),(8,16,'ABANDONED','2026-10-20 10:02:00'),(9,17,'ACTIVE','2026-10-20 10:00:32'),(10,18,'ACTIVE','2026-10-20 10:00:32'),(11,19,'ABANDONED','2026-10-20 10:02:00'),(12,20,'ACTIVE','2026-10-20 10:00:33'),(13,21,'ABANDONED','2026-10-20 10:02:00'),(14,22,'ACTIVE','2026-10-20 10:07:53'),(15,23,'ACTIVE','2026-10-20 10:07:53'),(16,24,'ACTIVE','2026-10-20 10:07:53'),(17,25,'ACTIVE','2026-10-20 10:07:53'),(18,26,'ACTIVE','2026-10-20 10:07:54'),(19,27,'ABANDONED','2026-10-20 10:09:00'),(20,28,'ABANDONED','2026-10-20 10:09:00'),(21,29,'ABANDONED','2026-10-20 10:09:00'),(22,30,'ABANDONED','2026-10-20 10:09:00'),(23,31,'ABANDONED','2026-10-20 10:09:00');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('ADMIN','CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (10,'abdalaziz','abdalazizalkassir@gmail.com','$2b$10$7OQqX3crBVGibGqFYg8mHeF8DwtBav5F4VTP9bgtjoN0IaWVk56nW','CUSTOMER'),(11,'admin','admin@gmail.com','$2b$10$LQizEAUfcWykc550BnM6eelLJEgbSHLwK/BkbrwAfmovtA1b9mRLe','ADMIN'),(12,'Flash User A','flash1792490431567_0@example.com','$2b$10$BmLTljBNabeVKetcvQjG0.tlzBgXBEdPl0jzx/6QNdPhSAGicPnmy','CUSTOMER'),(13,'Flash User B','flash1792490431567_1@example.com','$2b$10$oy3vAQ3HBbT5dz5qgtlD8ORRUYFVeLLF363jOpQzRS5ctLuhdu3/q','CUSTOMER'),(14,'Flash User C','flash1792490431567_2@example.com','$2b$10$bpbPAWvWP4uvrjP8SZOYbOb2ZFClYimggtxoW.ckUA7t10cdxWqFm','CUSTOMER'),(15,'Flash User D','flash1792490431567_3@example.com','$2b$10$xx/j1KzGPMUzvqVBhh04felXLIcZsh2vWdhodR8J.73I/hXpFPzF.','CUSTOMER'),(16,'Flash User E','flash1792490431567_4@example.com','$2b$10$hJTNQlhblQ1SL4kOa63RfuRFkyOuAlAJVrfETCPQRoW/DgnPvHJvu','CUSTOMER'),(17,'Flash User F','flash1792490431567_5@example.com','$2b$10$S.n75NLlqQ63NAy4vyTV6eszYHirjzlU1BCevs2mZoCbHacP4ObLS','CUSTOMER'),(18,'Flash User G','flash1792490431567_6@example.com','$2b$10$P/5HJlhOOwOpLFdOYcxu3.luV/V/KF0DUXGGodmp7teQs015jOtmW','CUSTOMER'),(19,'Flash User H','flash1792490431567_7@example.com','$2b$10$BrrzG03HkfYFCDXFE3ZZl.W3gkdVG1Ln.3b9z7w78Hj.6TZ/eKj3m','CUSTOMER'),(20,'Flash User I','flash1792490431567_8@example.com','$2b$10$3rYJVSDFCoh5Vhy.G0xBruuKtwqat0zO0hxBbS42jrvct0aqrviqW','CUSTOMER'),(21,'Flash User J','flash1792490431567_9@example.com','$2b$10$rLa8QAZDHxiwcVHf5BQJRuqiqs9P/m2qpasoUHzMhSToUP54K6ksm','CUSTOMER'),(22,'Flash User A','flash1792490873064_0@example.com','$2b$10$.1v1/0gfexOLxbW7gP7PPuhLhLMWdLIrJTw7M5wXURMB8.rn6MF1S','CUSTOMER'),(23,'Flash User B','flash1792490873064_1@example.com','$2b$10$ivLC/KJ9niZQBSnt.FoD7uYhKCSx8A8bAfrpV4xGqaX9C08p7GggS','CUSTOMER'),(24,'Flash User C','flash1792490873064_2@example.com','$2b$10$d2qYPofvAVNP918reQooPeNH0HQmj3JzVE7tA4x56OUgtWe4jyo.K','CUSTOMER'),(25,'Flash User D','flash1792490873064_3@example.com','$2b$10$lhDjScgJn6UvoWNubSYiLubgZIGk/Goa/iwqQasqNEfeWKEg1d5i6','CUSTOMER'),(26,'Flash User E','flash1792490873064_4@example.com','$2b$10$rngmWrLSDajEXnSK2Q/iF.qekuHn7/gP/V.pkzdV92OWmYmrJZBlq','CUSTOMER'),(27,'Flash User F','flash1792490873064_5@example.com','$2b$10$yI2vG1jIhh.qTZm0XMhbSueaYl60RH/mwTR9SHbqbqcUE5M/8YM9u','CUSTOMER'),(28,'Flash User G','flash1792490873064_6@example.com','$2b$10$dTL2vRAzMqxhCFmi00B5zOolbkrYA46qemjbNyrGqG6eRE5WdRjBO','CUSTOMER'),(29,'Flash User H','flash1792490873064_7@example.com','$2b$10$1njyGWbCRvacb5godnTPn.DUWX1qTPRBVhAnSrlznduXlziNlmwve','CUSTOMER'),(30,'Flash User I','flash1792490873064_8@example.com','$2b$10$b7U39sOSvZIqhlQjoQZoTePcvJp3X6nuJsL0nFCCIYAmprodiTH/.','CUSTOMER'),(31,'Flash User J','flash1792490873064_9@example.com','$2b$10$30k7VFFWlRsw4xWdLoUKReR72tEbvZzd3c4HwWkT.dwihMuURRanK','CUSTOMER');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `unit_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `fk_order_items_order` (`order_id`),
  KEY `fk_order_items_product` (`product_id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,3,4,999.00),(2,2,3,6,999.00),(3,3,3,2,999.00),(6,6,3,1,999.00),(9,9,3,1,999.00),(10,10,3,1,999.00),(11,11,3,1,999.00),(12,12,3,1,999.00),(13,13,3,1,999.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_orders_customer` (`customer_id`),
  CONSTRAINT `fk_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,10,3996.00,'2026-10-20 08:20:08'),(2,10,5994.00,'2026-10-20 08:25:45'),(3,10,1998.00,'2026-10-20 08:29:23'),(6,17,999.00,'2026-10-20 10:00:33'),(9,22,999.00,'2026-10-20 10:07:54'),(10,23,999.00,'2026-10-20 10:07:54'),(11,26,999.00,'2026-10-20 10:07:54'),(12,25,999.00,'2026-10-20 10:07:54'),(13,24,999.00,'2026-10-20 10:07:54');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Iphone',3000.00,0),(3,'iPhone 15',999.00,0),(4,'hamdi',3000.00,55);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-20 13:24:19

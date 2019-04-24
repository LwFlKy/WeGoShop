-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-04-24 16:06:38
-- 服务器版本： 5.7.21
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WeGoShop_admin`
--

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_admin_group`
--

CREATE TABLE `WeGoShop_admin_group` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `WeGoShop_admin_group`
--

INSERT INTO `WeGoShop_admin_group` (`id`, `name`, `content`) VALUES
(1, '系统管理员', '{\"AuthorityManage\":{\"icon\":\"el-icon-menu\",\"type\":\"multiple\",\"name\":\"权限管理\",\"submenu\":{\"GroupManage\":{\"name\":\"分组管理\",\"targetCom\":\"GroupManage\"}}},\"ShopManage\":{\"icon\":\"el-icon-menu\",\"type\":\"single\",\"name\":\"商家管理\",\"targetCom\":\"ShopManage\"},\"CategoryManage\":{\"icon\":\"el-icon-menu\",\"type\":\"single\",\"name\":\"分类管理\",\"targetCom\":\"CategoryManage\"},\"ApplyManage\":{\"icon\":\"el-icon-menu\",\"type\":\"multiple\",\"name\":\"申请审核\",\"submenu\":{\"GoliveApplyManage\":{\"name\":\"商户上线申请\",\"targetCom\":\"GoliveApplyManage\"},\"ModifyApplyManage\":{\"name\":\"资料修改申请\",\"targetCom\":\"ModifyApplyManage\"},\"GoodsApplyManage\":{\"name\":\"商品上架申请\",\"targetCom\":\"GoodsApplyManage\"}}},\"RechargeManage\":{\"icon\":\"el-icon-menu\",\"type\":\"multiple\",\"name\":\"充值管理\",\"submenu\":{\"RechargeItemManage\":{\"name\":\"充值金额设置\",\"targetCom\":\"RechargeItemManage\"},\"RechargeRecordManage\":{\"name\":\"充值记录\",\"targetCom\":\"RechargeRecordManage\"}}},\"DataReport\":{\"icon\":\"el-icon-document\",\"type\":\"multiple\",\"name\":\"数据报表\",\"submenu\":{\"ShopDataReport\":{\"name\":\"商户数据\",\"targetCom\":\"ShopDataReport\"}}}}'),
(2, '商家管理员', '{\"ShopInfoManage\":{\"icon\":\"el-icon-menu\",\"type\":\"single\",\"name\":\"商家信息\",\"targetCom\":\"ShopInfoManage\"},\"ShopVolumeReport\":{\"icon\":\"el-icon-menu\",\"type\":\"single\",\"name\":\"销量报表\",\"targetCom\":\"ShopVolumeReport\"},\"GoodsManage\":{\"icon\":\"el-icon-menu\",\"type\":\"multiple\",\"name\":\"商品管理\",\"submenu\":{\"PromotionManage\":{\"name\":\"套餐管理\",\"targetCom\":\"PromotionManage\"},\"VoucherManage\":{\"name\":\"代金券管理\",\"targetCom\":\"PromotionManage\"}}}}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `WeGoShop_admin_group`
--
ALTER TABLE `WeGoShop_admin_group`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `WeGoShop_admin_group`
--
ALTER TABLE `WeGoShop_admin_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-04-24 19:51:33
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
-- Database: `WeGoShop`
--

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_ad`
--

CREATE TABLE `WeGoShop_ad` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `ad_position_id` smallint(5) UNSIGNED NOT NULL DEFAULT '0',
  `media_type` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `name` varchar(60) NOT NULL DEFAULT '',
  `link` varchar(255) NOT NULL DEFAULT '',
  `image_url` text NOT NULL,
  `content` varchar(255) NOT NULL DEFAULT '',
  `end_time` int(11) NOT NULL DEFAULT '0',
  `enabled` tinyint(3) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `WeGoShop_ad`
--

INSERT INTO `WeGoShop_ad` (`id`, `ad_position_id`, `media_type`, `name`, `link`, `image_url`, `content`, `end_time`, `enabled`) VALUES
(1, 1, 1, '合作 谁是你的菜', '', 'http://yanxuan.nosdn.127.net/65091eebc48899298171c2eb6696fe27.jpg', '合作 谁是你的菜', 0, 1),
(2, 1, 1, '活动 美食节', '', 'http://yanxuan.nosdn.127.net/bff2e49136fcef1fd829f5036e07f116.jpg', '活动 美食节', 0, 1),
(3, 1, 1, '活动 母亲节', '', 'http://yanxuan.nosdn.127.net/8e50c65fda145e6dd1bf4fb7ee0fcecc.jpg', '活动 母亲节', 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_admin`
--

CREATE TABLE `WeGoShop_admin` (
  `id` int(11) NOT NULL,
  `username` varchar(10) NOT NULL DEFAULT '''''',
  `password` varchar(255) NOT NULL DEFAULT '''''',
  `password_salt` varchar(255) NOT NULL DEFAULT '''''',
  `last_login_ip` varchar(60) NOT NULL DEFAULT '''''',
  `last_login_time` int(11) NOT NULL DEFAULT '0',
  `add_time` int(11) NOT NULL DEFAULT '0',
  `update_time` int(11) NOT NULL DEFAULT '0',
  `avatar` varchar(255) NOT NULL DEFAULT '''''',
  `admin_role_id` int(11) NOT NULL DEFAULT '0',
  `shop_id` varchar(32) NOT NULL DEFAULT '0',
  `phoneNum` varchar(20) DEFAULT NULL,
  `init` int(11) NOT NULL DEFAULT '0',
  `is_binding` tinyint(1) NOT NULL DEFAULT '0',
  `weixin_openid` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `WeGoShop_admin`
--

INSERT INTO `WeGoShop_admin` (`id`, `username`, `password`, `password_salt`, `last_login_ip`, `last_login_time`, `add_time`, `update_time`, `avatar`, `admin_role_id`, `shop_id`, `phoneNum`, `init`, `is_binding`, `weixin_openid`) VALUES
(1000000, 'admin', '042f9636b102786c74eb9430027652e1', 'RZ6luJ', '::ffff:127.0.0.1', 1556135181, 0, 0, '\'\'', 1, '0', NULL, 1, 0, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_category`
--

CREATE TABLE `WeGoShop_category` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(90) NOT NULL DEFAULT '',
  `parent_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `sort_order` tinyint(1) UNSIGNED NOT NULL DEFAULT '50',
  `show_index` tinyint(1) NOT NULL DEFAULT '0',
  `is_show` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  `banner_url` varchar(255) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `WeGoShop_category`
--

INSERT INTO `WeGoShop_category` (`id`, `name`, `parent_id`, `sort_order`, `show_index`, `is_show`, `banner_url`, `type`) VALUES
(21, '休闲娱乐', 0, 50, 0, 1, '', 0),
(15, '美食', 0, 50, 0, 1, '', 0),
(22, '足疗/按摩', 21, 50, 0, 1, '', 0),
(23, '洗浴/汗蒸', 21, 50, 0, 1, '', 0),
(16, '火锅', 15, 50, 0, 1, '', 0),
(17, '生日蛋糕', 15, 50, 0, 1, '', 0),
(18, '甜点饮品', 15, 50, 0, 1, '', 0),
(19, '自助餐', 15, 50, 0, 1, '', 0),
(20, '日韩料理', 15, 50, 0, 1, '', 0),
(24, 'KTV', 21, 50, 0, 1, '', 0),
(25, '酒吧', 21, 50, 0, 1, '', 0),
(26, '电玩/游戏厅', 21, 50, 0, 1, '', 0),
(27, '丽人', 0, 50, 0, 1, '', 0),
(28, '美发', 27, 50, 0, 1, '', 0),
(29, '美容美体', 27, 50, 0, 1, '', 0),
(30, '美甲美瞳', 27, 50, 0, 1, '', 0),
(31, '瑜伽舞蹈', 27, 50, 0, 1, '', 0),
(32, '瘦身纤体', 27, 50, 0, 1, '', 0),
(33, '纹身', 27, 50, 0, 1, '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_comment`
--

CREATE TABLE `WeGoShop_comment` (
  `id` int(11) UNSIGNED NOT NULL,
  `type_id` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `value_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `content` varchar(6550) NOT NULL COMMENT '储存为base64编码',
  `add_time` bigint(12) UNSIGNED NOT NULL DEFAULT '0',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `user_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `new_content` varchar(6550) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_comment_picture`
--

CREATE TABLE `WeGoShop_comment_picture` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `pic_url` varchar(255) NOT NULL DEFAULT '',
  `sort_order` tinyint(1) UNSIGNED NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_config`
--

CREATE TABLE `WeGoShop_config` (
  `item` varchar(127) NOT NULL,
  `value` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `WeGoShop_config`
--

INSERT INTO `WeGoShop_config` (`item`, `value`, `time`) VALUES
('miniprogram_accesstoken', '20_c9ZU9nK3_d-UXD6wY9PnnYgS7edLTbzoV5uCn8zEozW6ExofwSO6CJofUZd1NZPbB2K4-S10uGrGnr0SYsCGlq6tJ7YUk8V2uJ3EJiqVPWVSbDEvlFBw2L4BM_klcjEcukFSKNfAb7ALcr1WIDNaADAPKU', '2019-04-22 13:30:20'),
('mp_accesstoken', '12_BsqJQwU6SPYdDjdD1KBr55MqeGskU-ZUUCAxhH7fzhSPfjBcrwuZLyZf5b72BMQkenrNqtc6sQbvlEdpFocwBahBPfLeo7dENIKXa22U7ABY2Sz8lShhS5ZzuTlBbPl034dR4yfNhP0C103lUPCjAFAJER', '2018-08-08 07:11:06');

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_coupon`
--

CREATE TABLE `WeGoShop_coupon` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `type_money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `send_type` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `min_amount` decimal(10,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `max_amount` decimal(10,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `send_start_date` int(11) NOT NULL DEFAULT '0',
  `send_end_date` int(11) NOT NULL DEFAULT '0',
  `use_start_date` int(11) NOT NULL DEFAULT '0',
  `use_end_date` int(11) NOT NULL DEFAULT '0',
  `min_goods_amount` decimal(10,2) UNSIGNED NOT NULL DEFAULT '0.00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_feedback`
--

CREATE TABLE `WeGoShop_feedback` (
  `msg_id` mediumint(8) UNSIGNED NOT NULL,
  `parent_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0',
  `user_name` varchar(60) NOT NULL DEFAULT '',
  `user_email` varchar(60) NOT NULL DEFAULT '',
  `msg_title` varchar(200) NOT NULL DEFAULT '',
  `msg_type` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `msg_status` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `msg_content` text NOT NULL,
  `msg_time` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `message_img` varchar(255) NOT NULL DEFAULT '0',
  `order_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `msg_area` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_footprint`
--

CREATE TABLE `WeGoShop_footprint` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `goods_id` int(11) NOT NULL DEFAULT '0',
  `add_time` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_order`
--

CREATE TABLE `WeGoShop_order` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `order_sn` varchar(20) NOT NULL DEFAULT '',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0',
  `order_status` smallint(2) UNSIGNED NOT NULL DEFAULT '0',
  `pay_status` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `pay_name` varchar(120) NOT NULL DEFAULT '',
  `pay_id` tinyint(3) NOT NULL DEFAULT '0',
  `actual_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '实际需要支付的金额',
  `order_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '订单总价',
  `goods_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品总价',
  `add_time` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  `confirm_time` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `pay_time` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `coupon_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0' COMMENT '使用的优惠券id',
  `promotion_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0',
  `num` smallint(6) NOT NULL,
  `shop_id` mediumint(9) NOT NULL DEFAULT '0',
  `coupon_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `callback_status` enum('true','false') DEFAULT 'true'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_promotion`
--

CREATE TABLE `WeGoShop_promotion` (
  `id` int(11) UNSIGNED NOT NULL,
  `promotion_sn` varchar(60) NOT NULL DEFAULT '',
  `shop_id` varchar(30) NOT NULL,
  `name` varchar(120) NOT NULL DEFAULT '',
  `promotion_brief` varchar(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `is_on_sale` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `sort_order` smallint(4) UNSIGNED NOT NULL DEFAULT '100',
  `allow_time` varchar(255) NOT NULL DEFAULT '[]',
  `is_delete` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `attribute_category` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `is_new` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `price` decimal(10,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `sell_volume` int(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '销售量',
  `is_hot` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_promotion_gallery`
--

CREATE TABLE `WeGoShop_promotion_gallery` (
  `id` int(11) UNSIGNED NOT NULL,
  `promotion_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `img_url` varchar(255) NOT NULL DEFAULT '',
  `img_desc` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(11) UNSIGNED NOT NULL DEFAULT '5'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_recharge`
--

CREATE TABLE `WeGoShop_recharge` (
  `id` int(11) NOT NULL,
  `fee` decimal(10,2) NOT NULL,
  `point` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `WeGoShop_recharge`
--

INSERT INTO `WeGoShop_recharge` (`id`, `fee`, `point`) VALUES
(10, 0.01, 1);

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_shop_gallery`
--

CREATE TABLE `WeGoShop_shop_gallery` (
  `id` int(11) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `shop_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `WeGoShop_shop_gallery`
--

INSERT INTO `WeGoShop_shop_gallery` (`id`, `img_url`, `shop_id`) VALUES
(52, 'shopPrimaryPic/gallery/5cc09f1a54ad1d2e5fc2d148/rZmRzyn5DYt5Q3Qnm5Yr6rGmb5pXJjGM', '5cc09f1a54ad1d2e5fc2d148'),
(53, 'shopPrimaryPic/gallery/5cc09f1a54ad1d2e5fc2d148/7C7PjxT3J2B382KAza33bnbj7TrYCQYP', '5cc09f1a54ad1d2e5fc2d148'),
(54, 'shopPrimaryPic/gallery/5cc09f1a54ad1d2e5fc2d148/XB5tFdfQZFPKMWBS3yDH5dZPCSWXMhFC', '5cc09f1a54ad1d2e5fc2d148');

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_specification`
--

CREATE TABLE `WeGoShop_specification` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `sort_order` tinyint(3) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='规格表';

--
-- 转存表中的数据 `WeGoShop_specification`
--

INSERT INTO `WeGoShop_specification` (`id`, `name`, `sort_order`) VALUES
(1, '颜色', 1),
(2, '规格', 2);

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_user`
--

CREATE TABLE `WeGoShop_user` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `username` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `gender` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `point` int(11) NOT NULL DEFAULT '0',
  `birthday` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `register_time` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `last_login_time` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `last_login_ip` varchar(15) NOT NULL DEFAULT '',
  `user_level_id` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `nickname` varchar(60) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `register_ip` varchar(45) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `weixin_openid` varchar(50) DEFAULT NULL,
  `miniprogram_openid` varchar(50) DEFAULT NULL,
  `union_id` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_user_coupon`
--

CREATE TABLE `WeGoShop_user_coupon` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `coupon_id` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `coupon_number` varchar(20) NOT NULL DEFAULT '',
  `user_id` int(11) UNSIGNED NOT NULL DEFAULT '0',
  `used_time` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `order_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_user_level`
--

CREATE TABLE `WeGoShop_user_level` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `WeGoShop_user_level`
--

INSERT INTO `WeGoShop_user_level` (`id`, `name`, `description`) VALUES
(1, '普通用户', '0'),
(2, 'vip', '10000');

-- --------------------------------------------------------

--
-- 表的结构 `WeGoShop_voucher`
--

CREATE TABLE `WeGoShop_voucher` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `order_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0',
  `code` varchar(16) NOT NULL,
  `promotion_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `WeGoShop_ad`
--
ALTER TABLE `WeGoShop_ad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `position_id` (`ad_position_id`),
  ADD KEY `enabled` (`enabled`);

--
-- Indexes for table `WeGoShop_admin`
--
ALTER TABLE `WeGoShop_admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `weixin_openid` (`weixin_openid`);

--
-- Indexes for table `WeGoShop_category`
--
ALTER TABLE `WeGoShop_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `WeGoShop_comment`
--
ALTER TABLE `WeGoShop_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_value` (`value_id`);

--
-- Indexes for table `WeGoShop_comment_picture`
--
ALTER TABLE `WeGoShop_comment_picture`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `WeGoShop_config`
--
ALTER TABLE `WeGoShop_config`
  ADD PRIMARY KEY (`item`),
  ADD UNIQUE KEY `item` (`item`);

--
-- Indexes for table `WeGoShop_coupon`
--
ALTER TABLE `WeGoShop_coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `WeGoShop_feedback`
--
ALTER TABLE `WeGoShop_feedback`
  ADD PRIMARY KEY (`msg_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `WeGoShop_footprint`
--
ALTER TABLE `WeGoShop_footprint`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `WeGoShop_order`
--
ALTER TABLE `WeGoShop_order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_sn` (`order_sn`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `order_status` (`order_status`),
  ADD KEY `pay_status` (`pay_status`),
  ADD KEY `pay_id` (`pay_id`);

--
-- Indexes for table `WeGoShop_promotion`
--
ALTER TABLE `WeGoShop_promotion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goods_sn` (`promotion_sn`),
  ADD KEY `sort_order` (`sort_order`);

--
-- Indexes for table `WeGoShop_promotion_gallery`
--
ALTER TABLE `WeGoShop_promotion_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goods_id` (`promotion_id`);

--
-- Indexes for table `WeGoShop_recharge`
--
ALTER TABLE `WeGoShop_recharge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `WeGoShop_shop_gallery`
--
ALTER TABLE `WeGoShop_shop_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `WeGoShop_specification`
--
ALTER TABLE `WeGoShop_specification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `WeGoShop_user`
--
ALTER TABLE `WeGoShop_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`username`),
  ADD KEY `weixin_openid` (`weixin_openid`);

--
-- Indexes for table `WeGoShop_user_coupon`
--
ALTER TABLE `WeGoShop_user_coupon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `WeGoShop_user_level`
--
ALTER TABLE `WeGoShop_user_level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `WeGoShop_voucher`
--
ALTER TABLE `WeGoShop_voucher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `goods_id` (`promotion_id`),
  ADD KEY `code` (`code`),
  ADD KEY `add_time` (`add_time`,`end_time`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `WeGoShop_ad`
--
ALTER TABLE `WeGoShop_ad`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `WeGoShop_admin`
--
ALTER TABLE `WeGoShop_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000048;

--
-- 使用表AUTO_INCREMENT `WeGoShop_category`
--
ALTER TABLE `WeGoShop_category`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- 使用表AUTO_INCREMENT `WeGoShop_comment`
--
ALTER TABLE `WeGoShop_comment`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `WeGoShop_comment_picture`
--
ALTER TABLE `WeGoShop_comment_picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `WeGoShop_coupon`
--
ALTER TABLE `WeGoShop_coupon`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `WeGoShop_feedback`
--
ALTER TABLE `WeGoShop_feedback`
  MODIFY `msg_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `WeGoShop_footprint`
--
ALTER TABLE `WeGoShop_footprint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- 使用表AUTO_INCREMENT `WeGoShop_order`
--
ALTER TABLE `WeGoShop_order`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- 使用表AUTO_INCREMENT `WeGoShop_promotion`
--
ALTER TABLE `WeGoShop_promotion`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- 使用表AUTO_INCREMENT `WeGoShop_promotion_gallery`
--
ALTER TABLE `WeGoShop_promotion_gallery`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- 使用表AUTO_INCREMENT `WeGoShop_recharge`
--
ALTER TABLE `WeGoShop_recharge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `WeGoShop_shop_gallery`
--
ALTER TABLE `WeGoShop_shop_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- 使用表AUTO_INCREMENT `WeGoShop_specification`
--
ALTER TABLE `WeGoShop_specification`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `WeGoShop_user`
--
ALTER TABLE `WeGoShop_user`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- 使用表AUTO_INCREMENT `WeGoShop_user_coupon`
--
ALTER TABLE `WeGoShop_user_coupon`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- 使用表AUTO_INCREMENT `WeGoShop_user_level`
--
ALTER TABLE `WeGoShop_user_level`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `WeGoShop_voucher`
--
ALTER TABLE `WeGoShop_voucher`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

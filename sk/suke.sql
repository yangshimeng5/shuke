#设置客户端连接服务器端的编码
set names utf8;
#丢弃数据库，如果存在
drop database if exists suke;
#创建新的数据库，设置存储的编码
create database suke charset=utf8;
#进入数据库
use suke;
#创建用户信息表
create table sk_user(
  uid INT  PRIMARY KEY AUTO_INCREMENT NOT NULL ,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR (64),
  phone VARCHAR (11) NOT NULL UNIQUE ,
  avatar VARCHAR (128),
  user_name VARCHAR (32),
  gender INT 
);
#创建用户地址表
create table sk_receiver_address(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT ,
    receiver VARCHAR (16),   
    province VARCHAR (16),
    city VARCHAR (16),
    county VARCHAR (16),
    address VARCHAR (128),
    cellphone VARCHAR (16),
    fixedphone VARCHAR (16),
    postcode CHAR (6),
    tag VARCHAR (16),
    is_default BOOLEAN
);

#创建用户购物车表
CREATE TABLE sk_shopping_cart(
    cid INT PRIMARY KEY AUTO_INCREMENT ,
    user_id INT ,
    count INT 
);

#创建用户订单表
CREATE TABLE sk_order(
    aid INT PRIMARY KEY AUTO_INCREMENT ,
    user_id INT , #用户编号
    address_id INT, 
    status INT , #订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消  
    order_time BIGINT , #下单时间
    pay_time BIGINT , #付款时间
    deliver_time BIGINT , #发货时间
    received_time BIGINT  #签收时间
);

#创建用户订单详情表
CREATE TABLE sk_order_detail(
    did INT PRIMARY KEY AUTO_INCREMENT ,
    order_id INT , #订单编号
    product_id INT , #产品编号
    count INT  #购买数量
);

#创建商品类别表
CREATE TABLE sk_laptop_family(
    fid INT PRIMARY KEY AUTO_INCREMENT ,
    name VARCHAR (32) #类别名称 
);

#创建商品表
CREATE TABLE  sk_laptop(
    lid INT  PRIMARY KEY AUTO_INCREMENT ,
    family_id INT , #所属类别编号
    product_id INT , #产品编号
    author_id INT , #所属作者编号
    title VARCHAR (128), #主标题
    subtitle VARCHAR (128), #副标题
    price DECIMAL (10,2), #价格
    promise VARCHAR (64), #服务承诺
    publisher VARCHAR (64), #出版社
    Publication_Date  BIGINT , #出版时间
    name VARCHAR (32), #商品名称
    author VARCHAR (32), #作者
    category VARCHAR (32), #所属分类
    details VARCHAR (1024), #详细说明
    sold_count INT , #已售出数量
    is_onsale BOOLEAN #是否促销中
);
#创建商品详情图表
CREATE TABLE sk_laptop_pic(
    pid INT  PRIMARY KEY  AUTO_INCREMENT,
    laptop_id INT , #书本编号
    sm VARCHAR (128), #小图片路径
    md VARCHAR (128), #中图片路径
    lg VARCHAR (12) #大图片路径
);

#创建首页轮播图表
CREATE TABLE sk_index_carousel(
    cid INT  PRIMARY  KEY AUTO_INCREMENT ,
    img VARCHAR (128), #图片路径
    title VARCHAR (64), #图片描述
    href VARCHAR (128) #图片超链接
);

#创建首页商品栏表
CREATE TABLE sk_index_product(
    pid INT PRIMARY KEY AUTO_INCREMENT ,
    title VARCHAR (64), #商品标题
    details VARCHAR (128),#详细描述
    pic VARCHAR (128),#图片
    price DECIMAL (10,2),#商品价格
    href VARCHAR (128),
    seq_recommended TINYINT ,
    seq_new_arrival TINYINT ,
    seq_top_sale TINYINT 
);
#创建国籍表
CREATE TABLE sk_country(
    coid INT PRIMARY KEY AUTO_INCREMENT ,
    country VARCHAR (18)
);
#创建出版社表
CREATE TABLE  sk_publisher(
    pid INT PRIMARY KEY AUTO_INCREMENT ,
    publisher VARCHAR (32),
    publisher_deta VARCHAR (1024)
);
#创建作者表
CREATE TABLE sk_author(
    auid INT  PRIMARY KEY AUTO_INCREMENT ,
    author VARCHAR (32),
    author_deta VARCHAR (1024)
);
/* 创建数据库 */
CREATE DATABASE storage_manage;
/* 创建用户表 */
CREATE TABLE user(
	id CHAR(20) PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	phone VARCHAR(20) UNIQUE,
	password VARCHAR(20) ,
	power int CHECK(power in (0,1))
);
/* 创建仓库表 */
CREATE TABLE storageData(
	id CHAR(20) PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	address VARCHAR(20),
	status int check(status in (0,1)),
	openDate CHAR(20)
);
/* 创建供应商表 */
CREATE TABLE provider(
	id CHAR(20) PRIMARY KEY,
	name VARCHAR(20) NOT null,
	address VARCHAR(20),
	phone VARCHAR(20)
);
/* 创建客户表 */
CREATE TABLE customer(
	id CHAR(20) PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	address VARCHAR(20),
	phone VARCHAR(20)
 );
/* 创建货物表 */
CREATE TABLE goods(
	id CHAR(20) PRIMARY KEY,
	name CHAR(20) UNIQUE,
	type VARCHAR(5) NOT NULL,
	providerId CHAR(20) NOT NULL,
	FOREIGN KEY (providerId) REFERENCES provider(id)
);
/* 创建入库表 */
CREATE TABLE in_storage(
	id CHAR(20) PRIMARY KEY,
	goodsId CHAR(20) NOT null,
	storageId CHAR(20) NOT null,
	total int CHECK(total > 0),
	userId CHAR(20) NOT null,
	time CHAR(20) NOT null,
	FOREIGN KEY (goodsId) REFERENCES goods(id),
	FOREIGN KEY (storageId) REFERENCES storageData(id),
	FOREIGN KEY (userId) REFERENCES user(id)
);
/* 创建出库表 */
CREATE TABLE out_storage(
	id CHAR(20) PRIMARY KEY,
	goodsId CHAR(20) NOT null,
	storageId CHAR(20) NOT null,
	total int CHECK(total > 0),
	customerId CHAR(20) NOT null,
	userId CHAR(20) NOT null,
	time CHAR(20) NOT null,
	FOREIGN KEY (goodsId) REFERENCES goods(id),
	FOREIGN KEY (storageId) REFERENCES storageData(id),
	FOREIGN KEY (customerId) REFERENCES customer(id),
	FOREIGN KEY (userId) REFERENCES user(id)
);
/* 创建库存表 */
CREATE TABLE inventory(
	goodsId CHAR(20) NOT NULL ,
	storageId CHAR(20) NOT NULL ,
	total int CHECK(total > 0),
	PRIMARY KEY(goodsId,storageId),
	FOREIGN KEY (goodsId) REFERENCES goods(id),
	FOREIGN KEY (storageId) REFERENCES storageData(id)
);
/* 创建日志表 */
CREATE TABLE logData(
	id CHAR(20) PRIMARY KEY,
	userId CHAR(20) NOT null,
	operation VARCHAR(10) NOT null,
	operationDate CHAR(20),
	FOREIGN KEY (userId) REFERENCES user(id)
);

/* 在插入入库数据时触发的触发器 */
CREATE TRIGGER in_storage_insert_trigger
AFTER INSERT ON in_storage
FOR EACH ROW
BEGIN
    INSERT INTO inventory (goodsId, storageId, total)
    VALUES (NEW.goodsId, NEW.storageId, NEW.total)
		ON DUPLICATE KEY UPDATE total = total + NEW.total;
END;

/* 在更新入库数据时触发的触发器 */
CREATE TRIGGER in_storage_update_trigger
AFTER UPDATE ON in_storage
FOR EACH ROW
BEGIN
    UPDATE inventory SET total = total - OLD.total + NEW.total
		WHERE goodsId=NEW.goodsId AND storageId = NEW.storageId;
END;

/* 在删除入库数据时触发的触发器 */
CREATE TRIGGER in_storage_delete_trigger
AFTER DELETE ON in_storage
FOR EACH ROW
BEGIN
   UPDATE inventory
    SET total = total - OLD.total
    WHERE goodsId = OLD.goodsId AND storageId = OLD.storageId;
END;

/* 在插入出库数据时触发的触发器 */
CREATE TRIGGER out_storage_insert_trigger
AFTER INSERT ON out_storage
FOR EACH ROW
BEGIN
    INSERT INTO inventory (goodsId, storageId, total)
    VALUES (NEW.goodsId, NEW.storageId, NEW.total)
    ON DUPLICATE KEY UPDATE total = total - NEW.total;
END;

/* 在更新出库数据时触发的触发器 */
CREATE TRIGGER out_storage_update_trigger
AFTER UPDATE ON out_storage
FOR EACH ROW
BEGIN
    UPDATE inventory SET total = total + OLD.total - NEW.total
		WHERE goodsId=NEW.goodsId AND storageId = NEW.storageId;
END;

/* 在删除出库数据时触发的触发器 */
CREATE TRIGGER out_storage_delete_trigger
AFTER DELETE ON out_storage
FOR EACH ROW
BEGIN
   UPDATE inventory
    SET total = total + OLD.total
    WHERE goodsId = OLD.goodsId AND storageId = OLD.storageId;
END;

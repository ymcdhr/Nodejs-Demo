SELECT * FROM account.sales;
SELECT * FROM account.sales where saleTime>=1447382962 and saleTime<=1447382968;


SELECT * FROM users;
SELECT s.* FROM users u,shop s where u.id=s.userId and u.userName='ymcdhr' and u.password='a7743af4ae3385a1a508f80a7ec56e9a';


SELECT * FROM shop ;

SELECT * FROM products;

SELECT shop.id
FROM users, shop
WHERE users.userId = 'ymcdhr' AND users.shopId = shop.id;

/*
 * 根据shopId查询有哪些大类和小类
 */
SELECT * FROM bigclass b where b.shopId=2;
SELECT * FROM smallclass s where s.bigId=1;
 
 
/*
 * 根据shopId，查询sales中的产品
 */
SELECT * FROM sales where sales.productId in
(SELECT products.id FROM shop, products WHERE products.shopId=2);

/*
 * 根据shopId和时间段，查询sales中的产品
 */
SELECT * FROM sales where productId in
(SELECT products.id FROM shop, products WHERE products.shopId=2) and saleTime>=1447382962 and saleTime<=1447382968;

/*
 * 根据userId查询products中的产品
 */
SELECT * FROM sales where sales.productId in
(SELECT products.id FROM shop, products WHERE products.shopId=2);



select * from products p where p.shopId in
(select s.id from shop s,users u where u.shopId=s.id and u.userId='ymcdhr');



SELECT * FROM account.stock;

/*
 * 根据shopId，查询sales中的销售记录
 */
SELECT * FROM stock where productId in
(SELECT products.id FROM shop, products WHERE products.shopId=2);

SELECT s.*,p.smallId,p.bigId FROM sales s,products p where s.productid=p.id and p.shopid=2;

SELECT s.*,p.smallId,p.bigId FROM sales s,products p where s.productid=p.id and p.shopid=2 and p.smallId=1 and p.bigId =1 and saleTime>=1447382962 and saleTime<=1447382968;

SELECT s.*,p.smallId,p.bigId FROM sales s,products p where s.productid=p.id and p.shopid=2 and p.smallId=1 and p.bigId =1;

/*
 * 根据shopId和时间段，查询stock中的库存数据记录
 */
SELECT * FROM stock where productId in
(SELECT products.id FROM shop, products WHERE products.shopId=2) and stockTime>=1447382902 and stockTime<=1447382902;

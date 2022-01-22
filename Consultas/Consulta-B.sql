SELECT 
	product_id,
	product_name,
	model_year,
	list_price
FROM
	products
WHERE
	product_name LIKE '%Ladies%'
ORDER BY
	list_price DESC;
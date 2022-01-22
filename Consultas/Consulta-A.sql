SELECT 
	product_id,
	product_name,
	model_year,
	list_price
FROM
	products
WHERE
	model_year = 2016
ORDER BY
	product_name ASC;
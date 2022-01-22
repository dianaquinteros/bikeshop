SELECT 
	p.product_id,
	p.product_name,
	s.quantity
FROM
	products p
JOIN 
	stocks s ON
	s.product_id = p.product_id
JOIN
	categories c ON
	c.category_id = p.category_id
JOIN
	stores st ON
	st.store_id = s.store_id
WHERE
	c.category_name = 'Electric Bikes'
	AND
	st.store_name = 'Santa Cruz Bikes'
ORDER BY
	p.product_name ASC;
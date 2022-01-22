SELECT 
	b.brand_id,
	b.brand_name,
	SUM(s.quantity)
FROM
	brands b
JOIN 
	products p on
	p.brand_id = b.brand_id
JOIN
	stocks s ON
	s.product_id = p.product_id
GROUP BY 
	b.brand_id
ORDER BY	
	SUM(s.quantity) DESC;
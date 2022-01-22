SELECT 
	c.category_id,
	c.category_name,
	COUNT(*)
FROM
	categories c
JOIN 
	products p ON
	p.category_id = c.category_id
GROUP BY 
	c.category_id
ORDER BY	
	COUNT(*) DESC;
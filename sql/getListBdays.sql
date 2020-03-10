SELECT
 t.*
FROM
 Generate_series(1, 12) i
 CROSS JOIN LATERAL (
  SELECT
   (Array_to_json(Array_agg(Row_to_json(t.*)))) AS month
  FROM (
   SELECT
    "id",
    "firstName",
    "lastName",
    CONCAT("firstName", ' ', "lastName") AS "fullName",
    "data",
    extract(day FROM date) AS "day"
   FROM
    "Bdays"
   WHERE
    extract(month FROM date) = i
   ORDER BY
    "day",
    "lastName",
    "firstName" ASC
   LIMIT 1000) t) t;


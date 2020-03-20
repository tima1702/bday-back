CREATE PROCEDURE "checkBdays" ()
LANGUAGE SQL
AS $$
  INSERT INTO "BdaySchedules" ("bdayId", "date", "isCongratulate", "createdAt", "updatedAt")
  SELECT
    "id" AS "bdayId",
    "date",
    FALSE,
    CURRENT_DATE,
    CURRENT_DATE
  FROM
    "Bdays"
  WHERE
    EXTRACT(DAY FROM date) = EXTRACT(DAY FROM CURRENT_DATE)
  ON CONFLICT
    DO NOTHING;

  DELETE FROM "BdaySchedules"
  WHERE EXTRACT(DAY FROM date) < EXTRACT(DAY FROM CURRENT_DATE - interval '3 DAY')
$$;


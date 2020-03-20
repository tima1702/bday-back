CREATE PROCEDURE "checkBdays" ()
LANGUAGE SQL
AS $$
  INSERT INTO "BdaySchedules" ("bdayId", "date", "isCongratulate")
  SELECT
    "id" AS "bdayId",
    "date",
    FALSE,
  FROM
    "Bdays"
  WHERE
    "date" = CURRENT_DATE
  ON CONFLICT
    DO NOTHING;

  DELETE FROM "BdaySchedules"
    WHERE "date" < CURRENT_DATE - interval '3 DAY';
$$;

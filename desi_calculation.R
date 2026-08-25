# DESI demo data validation and summary
# Base R only; no third-party packages are required.
# All values are fictional test data for website/deployment testing.

data_path <- file.path("assets", "data", "desi", "desi_series_2016-2026.csv")

if (!file.exists(data_path)) {
  stop("Data file not found: ", data_path)
}

desi <- read.csv(
  data_path,
  fileEncoding = "UTF-8-BOM",
  stringsAsFactors = FALSE,
  check.names = FALSE
)

required_columns <- c(
  "period",
  "desi_index",
  "digital_industrialization",
  "industrial_digitization",
  "sample_regions",
  "version",
  "is_test_data",
  "note"
)

missing_columns <- setdiff(required_columns, names(desi))
if (length(missing_columns) > 0) {
  stop("Missing columns: ", paste(missing_columns, collapse = ", "))
}

if (!all(desi$is_test_data)) {
  stop("This demo script expects every row to be marked as test data.")
}

reference <- desi[desi$period == "2026-06", ]
if (nrow(reference) != 1) {
  stop("Expected exactly one 2026-06 reference row.")
}

stopifnot(
  isTRUE(all.equal(reference$desi_index, 104.2)),
  isTRUE(all.equal(reference$digital_industrialization, 112.5)),
  isTRUE(all.equal(reference$industrial_digitization, 98.6))
)

summary_table <- data.frame(
  metric = c(
    "observations",
    "first_period",
    "last_period",
    "desi_mean",
    "desi_min",
    "desi_max"
  ),
  value = c(
    nrow(desi),
    desi$period[1],
    desi$period[nrow(desi)],
    round(mean(desi$desi_index), 2),
    min(desi$desi_index),
    max(desi$desi_index)
  ),
  stringsAsFactors = FALSE
)

print(reference[, c(
  "period",
  "desi_index",
  "digital_industrialization",
  "industrial_digitization"
)])
print(summary_table)

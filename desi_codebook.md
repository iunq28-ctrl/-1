# DESI 示例数据字典

> 重要：本数据包中的全部数值均为虚构测试数据，仅用于网页展示、下载功能与 GitHub Pages 部署测试，不得用于真实研究推断。

## 文件

- `desi_series_2016-2026.csv`：UTF-8（带 BOM）的机器可读月度示例数据。
- `desi_series_2016-2026.xlsx`：包含 `Raw Data`、`Summary`、`Codebook` 三个工作表。
- `desi_calculation.R`：无第三方依赖的读取、校验与汇总代码。

## 字段

| 字段 | 类型 | 单位 | 含义 |
| --- | --- | --- | --- |
| `period` | 文本 | YYYY-MM | 观测月份，范围为 2016-01 至 2026-07 |
| `desi_index` | 数值 | 指数点 | DESI 综合景气指数示例值 |
| `digital_industrialization` | 数值 | 指数点 | 数字产业化分项示例值 |
| `industrial_digitization` | 数值 | 指数点 | 产业数字化分项示例值 |
| `sample_regions` | 整数 | 个 | 覆盖的省级行政区数量，演示中固定为 31 |
| `version` | 文本 | — | 示例数据版本，固定为 `3.2-demo` |
| `is_test_data` | 布尔 | — | 测试数据标记，所有记录均为 `TRUE` |
| `note` | 文本 | — | 使用限制说明 |

## 复核值

网页中 2026Q2 的三个展示值对应 2026-06：

- DESI 总指数：104.2
- 数字产业化分项：112.5
- 产业数字化分项：98.6

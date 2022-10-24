---
layout: post
title: A long documentation page worth reading
---

![raw_entry]({{ site.url }}/assets/images/2022_10_24_read_csv/pandas_meme.jpg)

This meme floated across data engineering LinkedIn recently, and I have to say I disagree with
throwing the docs into the fire here. It's absolutely true that the reference page
[pd.read_csv](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html)
has an overwhelming number of options --  I counted 52 (including the deprecated ones), but all those options mean that this function can handle just about any file you want to throw at it!

If you're not going to memorize all of those options, here are some of the ones I use most frequently:

* `usecols`

  One easy way to speed up reading a csv file is to not process the columns you don't need, rather than reading
  the whole file and dropping columns later. You can also designate one of the columns as the index with `index_col` (which, despite the singular name, can also take a list if you want a multicolumn index).

* `dtype`

  Setting the datatypes of certain columns can save on memory or clarify whether a column represents a floating point,
  integer, or boolean value.

* `converters`
* `on_bad_lines` (especially setting it to a callback function)

  Writing your own per-column data converters and/or adding an on_bad_lines callback means you can load a file and do data cleaning or unit conversions in one step. The argument to your converter lambda function will be the raw string contents
  of the column, while the on_bad_lines callback will get a list of all the column values. 

Many of the other options on that long documentation page are actually ways of doing simple conversions without having to type up your own lambda function: `true_values` and `false_values` convert values to booleans, and `na_values` marks values that
are nulls/nans. Arguments `parse_dates`, `infer_datetime_format`, `date_parser`, `day_first` and `cache_dates` control automatically converting columns to dates/times, and `thousands` and `decimal` control how strings are converted to numbers.

* `nrows`
* `chunksize` 

  These optiona are useful for large files to get a sniff or to process the data in chunks. `nrows` will read a subset of the data, while `chunksize` will turn the output of `read_csv` into an interator to process in chunks:

  ```python
  for chunk in read_csv('my_file.csv`, chunksize=10_000):
      process_next_chunk(chunk)
  ```

A powerful function for such a common operation is worth spending the time to understand in depth.  If the
reference page is too terse, 
there more details and examples in the I/O guide 
[here](https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html#csv-text-files).
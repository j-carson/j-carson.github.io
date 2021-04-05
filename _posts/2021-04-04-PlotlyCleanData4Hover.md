---
layout: post
title: Cleaning Data for Plotly Hover tool
---

I'm learning [plotly](https://plotly.com/python/) 
and trying to decide if the next version of my data processing
website should use it instead of [bokeh](https://bokeh.org/)

One bug I've noticed is that when putting fields in a hover tool,
if the data can contain nulls, nans, or other non-float values
like np.inf mixed in with numeric data, those rows are not 
displayed correctly. The `%{customdata[#]}` slot in your
format string is not replaced at all. Very ugly.

This little function works around the bug, at the expense of
not being able to
use a format string in the hovertext template as the
data is now a mix of floats and strings. In order to work
around that, I do the decimal-rounding in my data cleaner
as well.

```python
from typing import Optional
import pandas as pd

def clean_data_for_hover(data: pd.Series, places: Optional[int] =None) -> pd.Series:
    """
    Takes floating data that may have nulls, nans, or infs, and reformats
    to display in a plotly hover window.

    Paramteters
    -----------
    data: pd.Series of float-like (np.float32, np.float64, etc)
        The data to be displayed on hover
    places: int or None 
        The number of decimal places to round to, or None for
        no rounding

    Returns
    -------
    pd.Series
        Transformed so that all null-like and inf-like values are
        replaced with strings, and all floats are rounded to given number
        of places.
    """
    if places:
        result = data.round(places)
    else:
        result = data.copy()
        
    # None, pd.NA, np.nan...
    nulls = result.isna()
    result[nulls] = result[nulls].apply(str)
    
    # np.inf, -np.inf
    infs = (result*0).isna()
    result[infs] = result[infs].apply(str)
    
    return result
```

And here's a little notebook cell to try it:

{% highlight python %}
import pandas as pd
import numpy as np
from plotly import express as px

# Setting up the data to plot
x = pd.Series(name="x", data=[1,2,3,4,5,])
y = pd.Series(name="y", data=[1,2,3,4,5,])
bad = pd.Series(name="bad", data=[1.234, None, np.nan, np.inf, -np.inf])
fixed = pd.Series(name="fixed", data=clean_data_for_hover(bad, 2).values)
df = pd.concat([x,y,bad,fixed], axis=1)

# Plotting with plotly express api
fig = px.scatter(
     data_frame=df,
     x="x",
     y="y",
     hover_data=["bad", "fixed"]
)

# for notebook display only
from IPython.display import display,HTML
display(HTML(fig.to_html()))
{% endhighlight %}

You should get a plot that looks like this:

<div style="width: 100%; height: 450px; resize:both; overflow:auto">
{% include 2021_04_04/plotly_hover.html  %}
</div>
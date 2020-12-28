---
layout: post
title: Selecting lines in a Bokeh plot
---

So, I haven't actually wanted to be a web developer, but 
I'm kind of the data chef, cook, and bottle-washer at work at the 
moment, so spinning up some web code it is, then. 

The existing code base is written in Bokeh which I hadn't used
in over a year, 
but [pyLadies Amsterdam](https://github.com/pyladiesams/Bokeh-visualisation-beginner-aug2020) 
did a web-training
that I attended to get going again.

This is a mockup of a plot I need for my work website, where
we want to be able to select lines from a plot. 
You can use the box select tool in the upper left to select lines, then 
click the button on the bottom to change the line color to cyan.
The two sides of the plot are linked (which is the feature I wanted 
to play with), so if you box-select
the yellow line on the left, the yellow line on the right
also selects.
The reset tool in the upper left will put the colors back.

<div style="width: 100%; height: 450px; resize:both; overflow:auto">
{% include 2020_11_23/two_plots.html  %}
</div>

In order to use the selection styling functionality built into Bokeh,
I've bunched all my lines in each plot into a single MultiLine glyph.
Getting the data into the right format takes up a most of the code
below.

{% highlight python %}
import random

from bokeh.plotting import figure
from bokeh.models import CustomJS, ColumnDataSource
from bokeh.events import SelectionGeometry, Reset
from bokeh.layouts import column, gridplot
from bokeh.models.widgets import Button
from bokeh.embed import autoload_static
from bokeh.resources import CDN

from palettable.cartocolors.qualitative import Bold_8
import numpy as np
import pandas as pd

# generate a bunch of lines in "long" format
def make_line(line_id):
    line_size = random.choice(range(5,15))
    line_start = random.choice(range(10))
    xs = list(range(line_start, line_start + line_size))
    ys = np.random.sample((line_size)) * random.choice(range(1,3)) \
                + random.choice(range(3))
    zs = np.random.sample((line_size)) * random.choice(range(1,3)) \
                + random.choice(range(3))
    
    df = pd.DataFrame(
        dict(
            x=xs,
            y=ys,
            z=zs,
        )
    )
    df['line_id'] = line_id
    return df
    
line_df = pd.concat(
    [
        make_line(i) for i in range(8)
    ],
    ignore_index = True
).sort_values('x').reset_index(drop=True)

# pack the lines into a format that bokeh MultiLine glyph expects
line_group = line_df.groupby('line_id')
def per_line_data(group, column):
    return [group[column].get_group(i) for i in group.indices]
    
column_data = dict(
    xs=per_line_data(line_group, 'x'),
    ys=per_line_data(line_group, 'y'),
    zs=per_line_data(line_group, 'z'),
    colors=Bold_8.hex_colors, 
    line_id=list(line_group.indices.keys())
)

s1 = ColumnDataSource(column_data)
{% endhighlight %}

Now that I have my data, let's plot.
Since I want my plots to be linked, I use the same ColumnDataSource for both the 
left and right sides.  The two plots also have the same x-axis.

{% highlight python %}
common_plot_args = dict(
    plot_width=400, 
    plot_height=400, 
    tools = 'box_select,box_zoom,wheel_zoom,pan,save,reset',
)

xy_plot = figure(title="XY view", **common_plot_args)
xy_plot.xaxis.axis_label = "The mysterious X"
xy_plot.yaxis.axis_label = "The variable Y"

xz_plot = figure(title="XZ view", **common_plot_args)
xz_plot.xaxis.axis_label = "The mysterious X"
xz_plot.yaxis.axis_label = "The parameter Z"

common_multiline_args = dict(
    source=s1, 
    line_color="colors", 
    line_width=3,
    # This is the cool selection styling :-)
    selection_color="black",
    selection_line_width=3,
    nonselection_alpha=.8,
    nonselection_line_width=1,
)

xy_plot.multi_line(xs="xs", ys="ys", **common_multiline_args)
xz_plot.multi_line(xs="xs", ys="zs", **common_multiline_args)
{% endhighlight %}

The box select callback finds the data points in the box
boundaries and marks those lines associated with those points as selected.

{% highlight python %}
select_code ="""
// box selet callback for both plots
// args:
// s1 = column data source
// xy_names = which column is plotted on x and y axis of current plot
// cb_obj = provided by bokeh showing selected box extent

const x0 = cb_obj['geometry']['x0']
const x1 = cb_obj['geometry']['x1']
const y0 = cb_obj['geometry']['y0']
const y1 = cb_obj['geometry']['y1']
const xs = s1.data[xy_names[0]]
const ys = s1.data[xy_names[1]]

var new_selection = []

// for each line
for (var j=0;j<xs.length;j+=1) {
    
    // grab the points in line j
    const xj = xs[j]
    const yj = ys[j]
    
    // if one point in the line is in the selection
    // box select that line
    
    for (var jj=0;jj<xj.length;jj+=1) {
        const xjj = xj[jj]
        const yjj = yj[jj]
    
        if ((xjj >= x0) && (xjj <= x1) && (yjj >= y0) && (yjj <= y1)) {
            new_selection.push(j)
            break 
        }
        
        // lines are in sorted-by-x order, 
        // no need to search past end of the box
        else if (xjj > x1) {
            break
        }
    }
}

// update s1 with selection
s1.selected['indices'] = new_selection
s1.change.emit()
"""

xy_select_callback =  CustomJS(
                        args=dict(s1=s1, xy_names=['xs','ys']), 
                        code=select_code)
xy_plot.js_on_event(SelectionGeometry, xy_select_callback)

xz_select_callback =  CustomJS(
                        args=dict(s1=s1, xy_names=['xs','zs']),
                        code=select_code)
xz_plot.js_on_event(SelectionGeometry, xz_select_callback)
{% endhighlight %}

These last two callbacks
-  Reset the plot to it's original state
-  Change the color of the selected plots when you press the button below the plots

{% highlight python %}
reset_callback = CustomJS(args=dict(s1=s1), 
code=f"""
// reset callback restores original colors and 
// clears the selection
// args = s1 = column data source
s1.data['colors'] = {Bold_8.hex_colors}
s1.selected['indices'] = []
s1.change.emit()"""
    )

xy_plot.js_on_event(Reset, reset_callback)
xz_plot.js_on_event(Reset, reset_callback)

b = Button(label="Change the color!")
b.js_on_click(CustomJS(args=dict(s1=s1), code="""
// button select callback changes the color of the selected
// lines from whatever they are to 'cyan'
// args = s1 = column data source
    const selection = s1.selected['indices']

    if (selection.length == 0) {
        alert("No line selected")
    }
    for (var j = 0; j < selection.length; j+= 1) {
        s1.data['colors'][selection[j]] = 'cyan'
    }
    s1.selected['indices'] = []
    s1.change.emit()
"""))
{% endhighlight %}

The last trick was to get the plot on my blog so I could show it off.
Bokeh's autoload_static method creates two outputs: the body of a script to 
display your plot, and a `<script>` tag that loads the script. In order
for the script to load properly, you have to give autoload_static the 
location where you are going to store your script so that the html tag
part knows what to put for `src=`.

{% highlight python %}
bothviews = gridplot([[xy_plot, xz_plot]], sizing_mode='scale_both')
plot_with_button = column(bothviews, b)

script_body, html_tag = autoload_static(plot_with_button, CDN, "/scripts/2020_11_23/two_plots.js")

with open ("two_plots.html",'w') as fp:
    fp.write(html_tag)

with open("two_plots.js",'w') as fp:
    fp.write(script_body)
{% endhighlight %}

When I incorporated the script tag into the blog, I wrapped the html part
in a div to set the size (and included a resize corner in case you need it - the plot is 
a bit wider than the default display width of the blog). This 
blog is in jekyll, so I put the html tag in the _includes/
directory (where jekyll looks when I use the include directive) and the code body in 
scripts/ where I told bokeh it would be when I created the html.

(Since the include is only one line, I could've just pasted it into the post as well.)

{% highlight markdown %}
<div style="width: 100%; height: 450px; resize:both; overflow:auto">
{% raw %}
{% include 2020_11_23/two_plots.html  %}
{% endraw %}
</div>
{% endhighlight %}
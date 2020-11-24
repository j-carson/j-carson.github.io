---
layout: post
title: Selecting lines in a Bokeh plot
bokeh: true
category: python,bokeh
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
The two sides of the plot are linked, so if you box-select
the yellow line on the left, the yellow line on the right
also selects.
The reset tool in the upper left will put the colors back.

{% include bokeh_2.3.3_includes.html %}
{% include 2020_11_23_two_plot/two_plots_div.html  %}
{% include 2020_11_23_two_plot/two_plots_script.html  %}

In order to use the built-in selection color functionality,
I've bunched all my lines into a single MultiLine glyph.
Getting the data into the right format takes up a bunch of the code
below.
Then, the box select callback finds the points in the box
boundaries and marks the lines associated with those points as selected.


```python
from bokeh.plotting import figure
from bokeh.models import CustomJS, ColumnDataSource
from bokeh.events import SelectionGeometry, Reset
from bokeh.layouts import column, gridplot
from bokeh.models.widgets import Button
from palettable.cartocolors.qualitative import Bold_8
from bokeh.embed import components

import pandas as pd
import numpy as np

# Let's try to do this more like a track set would look
def make_track(track_id):
    track_size = random.choice(range(5,15))
    start_time = random.choice(range(10))
    xs = list(range(start_time,start_time + track_size))
    ys = np.random.sample((track_size)) * random.choice(range(1,3)) + random.choice(range(3))
    zs = np.random.sample((track_size)) * random.choice(range(1,3)) + random.choice(range(3))
    
    df = pd.DataFrame(
        dict(
            x=xs,
            y=ys,
            z=zs,
        )
    )
    df['track_id'] = track_id
    return df
    
track_df = pd.concat(
    [
        make_track(i) for i in range(8)
    ],
    ignore_index = True
).sort_values('x').reset_index(drop=True)


track_group = track_df.groupby('track_id')
def per_track_data(group, column):
    return [group[column].get_group(i) for i in group.indices]
    
column_data = dict(
    xs=per_track_data(track_group, 'x'),
    ys=per_track_data(track_group, 'y'),
    zs=per_track_data(track_group, 'z'),
    colors=Bold_8.hex_colors, 
    track_id=list(track_group.indices.keys())
)

s1 = ColumnDataSource(column_data)

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
    selection_color="black",
    selection_line_width=3,
    nonselection_alpha=.8,
    nonselection_line_width=1,
)

xy_plot.multi_line(xs="xs", ys="ys", **common_multiline_args)
xz_plot.multi_line(xs="xs", ys="zs", **common_multiline_args)

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
        
        // lines are in sorted-by-x order, no need to search past end of the box
        else if (xjj > x1) {
            break
        }
    }
}

// update s1 with selection
s1.selected['indices'] = new_selection
s1.change.emit()
"""

xy_select_callback =  CustomJS(args=dict(s1=s1,xy_names=['xs','ys']), code=select_code)
xy_plot.js_on_event(SelectionGeometry, xy_select_callback)

xz_select_callback =  CustomJS(args=dict(s1=s1,xy_names=['xs','zs']), code=select_code)
xz_plot.js_on_event(SelectionGeometry, xz_select_callback)

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

bothviews = gridplot([[xy_plot, xz_plot]], sizing_mode='stretch_both')
plot_with_button = column(bothviews, b)

script, div = components(plot_with_button)
# My blog was really messing up the size of the plot, so I wrapped it in a div
# of reasonable size
wrap_div = f'<div id="plot_wrapper" style="width: 100%; height: 425px;"> {div} </div>'

with open ("two_plots_script.html",'w') as fp:
    fp.write(script)

with open("two_plots_div.html",'w') as fp:
    fp.write(wrap_div)
```


The last trick was to get the plot on my blog so I could show it off.
Turns out, it's not so bad: You just copy the magic incantations below from
the [Bokeh documentation](https://docs.bokeh.org/en/latest/docs/user_guide/embed.html#userguide-embed-standalone)
into the post before you include your div and script in the code for the post.
Easy peasy. (Substitude x.y.z for whatever version of Bokeh you built with.)

```html
<script src="https://cdn.bokeh.org/bokeh/release/bokeh-x.y.z.min.js"
        crossorigin="anonymous"></script>
<script src="https://cdn.bokeh.org/bokeh/release/bokeh-widgets-x.y.z.min.js"
        crossorigin="anonymous"></script>
<script src="https://cdn.bokeh.org/bokeh/release/bokeh-tables-x.y.z.min.js"
        crossorigin="anonymous"></script>
```
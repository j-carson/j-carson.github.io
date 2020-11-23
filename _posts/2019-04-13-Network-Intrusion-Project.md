For my final project at Metis, I worked on a dataset for
detecting network intrusions.

By the end of the bootcamp, I was starting to get good at 
designing a presentation PowerPoint... or at least at letting the 
auto-design feature of PowerPoint design a presentation for me.  
My intruder looks 
too well-dressed, though. Maybe he's an FBI agent trying to catch the 
hacker?  

![slide1]({{ site.url }}/images/project5/Slide1.png)

One of the key things the bootcamp emphasized was  not to bog down 
a general
audience with too many technical details, so I didn't get into
TCP packet types and fields.  I motivated the talk
with some examples of recent network breaches. There were/are 
too many stories to choose from. 

![slide2]({{ site.url }}/images/project5/Slide2.png)

And explained vaguely what network logs were and where my data 
came from.

![slide3]({{ site.url }}/images/project5/Slide3.png)
![slide4]({{ site.url }}/images/project5/Slide4.png)

This was a challenging graphic to make with my 
newly minted matplotlib skills! The dataset was twice-imbalanced.
The normal data versus attack data was imbalanced, and then
within the attack data, the types of attacks were also imbalanced.

To deal with the imbalances, I used two classifiers: one that
separated attack from non-attack, then a second classifier took 
the attack output and applied a label.

![slide5]({{ site.url }}/images/project5/Slide5.png)

Every classification report needs a [ROC curve](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_curve.html)

![slide6]({{ site.url }}/images/project5/Slide6.png)

The advisors recommended **not** doing the confusion matrix
because it is overwhelming with so many labels, but I didn't
really know a better way to summarize my results graphically.
So, I broke the matrix down over a few slides. 

![slide7]({{ site.url }}/images/project5/Slide7.png)

I was able to classify 99% of the normal traffic as normal traffic.

![slide8]({{ site.url }}/images/project5/Slide8.png)

But I marked 1% of normal traffic as an attack. This sounds good 
percentage wise, but if you think about the number of packets
flying across the internet everyday, this would be a lot of false alarms!

![slide9]({{ site.url }}/images/project5/Slide9.png)
The attacks were mostly labeled as some kind of attack, but 
only 87% of the attacks got the correct label. 

![slide10]({{ site.url }}/images/project5/Slide10.png)

Cluster maps are cool! But, again for a general audience, I needed
to explain them more conceptually than with lots of detail.
Again, I did it over several slides...

![slide11]({{ site.url }}/images/project5/Slide11.png)
![slide12]({{ site.url }}/images/project5/Slide12.png)
![slide13]({{ site.url }}/images/project5/Slide13.png)

Each feature was colored by skew. Some features had strong positive
or negative skew only for certain labels. That made it easier 
for a machine learning algorithm to label them correctly.

![slide14]({{ site.url }}/images/project5/Slide14.png)

But there are  also labels where the colors are all "blah." 
If there are only subtle differences in 
the distributions of the feature values between one row and
another, it's going to be harder for a program to get the labels correct. 

![slide15]({{ site.url }}/images/project5/Slide15.png)

The last slide I briefly mentioned over-fitting. It is likely
my model over-fitted on just a few features on these 
last rows, because the dataset had only a few training examples
for these last few labels only a few featurs were distinctive.

![slide16]({{ site.url }}/images/project5/Slide16.png)
![slide17]({{ site.url }}/images/project5/Slide17.png)
![slide18]({{ site.url }}/images/project5/Slide18.png)
![slide19]({{ site.url }}/images/project5/Slide19.png)

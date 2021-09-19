---
layout: post
title: Type hints update
---

Type hints were my [New Year's Resolution for 2021]({% post_url 2020-12-27-advent-of-code %})
and I've learned a lot this year.

Whatever you want to know about typing, try to find it in the mypy documentation,
not by googling.  Typing has been evolving and continues to evolve, and anything you
don't find by checking the current docs is quite likely out of date.

What mypy catches for me:

1. Sloppy thinking - if the correct type declaration for something exceeds the 
   line length limit in your flake8 settings, you have written a truly terrible API.
2. Sloppy error checking - did you declare something as `Optional` and then forget 
   to have a `None` code path? You did, didn't you... 
3. Actual type mistakes (duh)
4. False alarms or stuff I don't quite know how to type hint correctly... Judicious use of 
   `# type: ignore` is nothing to be ashamed of, IMHO.  Especially if the problem is localized
   to a screenful of code that can be checked by inspection.

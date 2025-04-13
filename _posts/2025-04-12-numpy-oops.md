---
layout: post
title: An unexpected numpy overflow
---


Just a little "today I learned" post about a surprising bug I hit last week.


```python
import numpy as np
np.__version__

```


    '2.2.4'



## Today I learned that `+=` can change the type of a variable!

Turns out you need to be careful mixing python types and numpy types, or you could have an overflow error.


```python
total = 0
type(total)
```


    int


```python
increment = np.int32(1234)
type(increment)
```

    numpy.int32


```python
total += increment
type(total)
```

    numpy.int32


Yep, that's right the data type of `total` changed! And, wouldn't you know it, `total` in the program eventually exceeded the limits of an np.int32 and caused a problem.

## Fixing it

The fix was simple. Use a numpy type instead of a python int.


```python
total = np.int64(0)
type(total)
```


    numpy.int64


```python
total += increment
type(total)
```


    numpy.int64



## Catching it

I was also reminded of some subtleties regarding an overflow exception versus an overflow warning.

If you try to **assign** a number that's too big to a numpy variable, it will throw an exception on the spot. Just catch it and look at the stack trace.


```python
max_value = np.iinfo(np.int32).max
max_value
```


    2147483647


```python
np.int32(int(max_value) + 1)
```


<pre style="color: red">
---------------------------------------------------------------------------

OverflowError                             Traceback (most recent call last)

Cell In[8], line 1
----> 1 np.int32(int(max_value) + 1)


OverflowError: Python integer 2147483648 out of bounds for int32
</pre>


But if you're **adding** values in a loop and overflow, that's not an exception, just a warning.


```python
np.int32(max_value) + 1
```

<pre style="color: red">
/var/folders/kq/fgbc8_jd3l95syqbjbhrt0b00000gn/T/ipykernel_64451/122681540.py:1: RuntimeWarning: overflow encountered in scalar add
    np.int32(max_value) + 1

</pre>

    np.int32(-2147483648)



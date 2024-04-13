February 28th, 2024

`pympler` is a library that displays the size of a python object in bytes.
It is able to recursevily analyse child-objects linked through pointers and
grab their sizes too.

## asizeof

> pympler.asizeof can be used to investigate how much memory certain Python
> objects consume. In contrast to sys.getsizeof, asizeof sizes objects
> recursively. You can use one of the asizeof functions to get the size of
> these objects and all associated referents:

[Source](http://web.archive.org/web/20231217210011/https://pympler.readthedocs.io/en/latest/intro.html)

```
>>> from pympler import asizeof
>>> obj = [1, 2, (3, 4), 'text']
>>> asizeof.asizeof(obj)
176
>>> print(asizeof.asized(obj, detail=1).format())
[1, 2, (3, 4), 'text'] size=176 flat=48
    (3, 4) size=64 flat=32
    'text' size=32 flat=32
    1 size=16 flat=16
    2 size=16 flat=16
```

## clastracker

> The basic tools of the ClassTracker are tracking objects or classes, taking
> snapshots, and printing or dumping statistics. The first step is to decide
> what to track. Then spots of interest for snapshot creation have to be
> identified. Finally, the gathered data can be printed or saved:

The below doesn't work quite well with Django querysets, go to the next section
on `muppy` for an alternative.

```python
from pympler.classtracker import ClassTracker
tracker = ClassTracker()
tracker.track_object(AccountQuerySet)
tracker.create_snapshot()

list(Account.objects.all())

tracker.create_snapshot()
tracker.stats.print_summary()
```

## muppy

```python
import pympler

start = pympler.muppy.get_objects()

result = list(Account.objects.all())

end = pympler.muppy.get_objects()

sum_start = pympler.muppy.summary.summarize(start)
sum_end = pympler.muppy.summary.summarize(end)
diff = pympler.muppy.summary.get_diff(sum_start, sum_end)
pympler.muppy.summary.print_(diff)

# Below may fail without tkinter
# print(f"Size start in bytes: {pympler.asizeof.asizeof(start)}")
# print(f"Size end in bytes: {pympler.asizeof.asizeof(end)}")
```

Result:

```
                                    types |   # objects |   total size
========================================= | =========== | ============
                                     list |          75 |     16.36 MB
                                     dict |       25268 |      9.83 MB
                                      str |       42416 |      2.47 MB
                                     type |         604 |    631.62 KB
                    weakref.ReferenceType |        7020 |    493.59 KB
                                      set |         258 |    469.17 KB
               builtin_function_or_method |        6100 |    428.91 KB
                        datetime.datetime |        6180 |    289.69 KB
                                      int |        8696 |    238.16 KB
                                     code |        1032 |    178.02 KB
                                    tuple |        2390 |    151.93 KB
         django.db.models.base.ModelState |        3090 |    144.84 KB
  octoenergy.data.accounts.models.Account |        3090 |    144.84 KB
                              abc.ABCMeta |         111 |    116.20 KB
                            datetime.date |        3084 |     96.38 KB
```

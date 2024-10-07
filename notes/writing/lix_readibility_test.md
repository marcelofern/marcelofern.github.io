# LIX Readability Test

The LIX readability test measures the reading-level difficulty of a text.

Computing the LIX value involves summing two numbers:

- Average sentence length.
- Percentage of words with more than 6 letters.

The formula is:

```
LIX = (A/B) + (C*100)/A
```

- A = the number of words.
- B = number of periods (defined by period, colon or capital first letter).
- C = the number of long words (more than 6 letters).

A score of 20 means the text reads well.
A score of 60 means the text reads difficultly.

Try to keep the score below 35.

[source](http://web.archive.org/web/20221004162741/https://en.wikipedia.org/wiki/Lix_(readability_test))

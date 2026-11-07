2024-06-12

# Memory Hierarchy

The table below gives some approximate guidelines about performance comparison
across different caching layers.

The `speed vs disk` refers to how quick the processor can fetch an instruction
from the specific memory layer in comparison to fetching it from disk.

```
| layer | name                 | speed vs disk | description                     |
|-------|----------------------|---------------|---------------------------------|
| l0    | registers            | 10**9         | holds words from cache memory.  |
| l1    | L1 cache (SRAM)      | ~10**9        | holds cache lines from L2 cache |
| l2    | L2 cache (SRAM)      | ~10**8        | holds cache lines from L3 cache |
| l3    | L3 cache (SRAM)      | ~10**8 / 2    | holds cache lines from memory   |
| l4    | Main memory (DRAM)   | 10**7         | holds disk blocks from disk     |
| l5    | local storage (disk) | BASE          | holds files.                    |
| l6    | remote storage       | N/A           | distributed servers - etc.      |
```

These numbers have been taken from the CS:APP book.

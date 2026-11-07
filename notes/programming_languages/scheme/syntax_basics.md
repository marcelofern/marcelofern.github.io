## Define

### Variables

```scm
(define size 2)
```

### Procedures

```scm
(define (cube x) (* x x x))
```

### Lambdas

```scm
(lambda (x) (+ x 1))

; define and call
((lambda (x) (+ x 1)) 1)

; same as above, but with syntax sugar.
; defining x == 1 locally.
(let ((x 1)) (+ x 1))

; or with more local variables
(let ((x 1) (y 3)) (+ x y)) ; == 4
```

### Pairs

Know as "tuples" in other languages, can be defined using the `cons` keyword
which is short for "construct".

```scm
(define x (cons 1 2))

; a list
(define my_list (cons 1 (cons 2 (cons 3 4))))

```

The first argument can be fetched with the keyword `car` which is legacy from
the IBM 704 days and means "Contents of Address part of Register".

TO fetch the scond argument, we use `cdr` which means "Contents of Decrement
part of Register"

```scm
(car x)
1

(cdr x)
2
```

## Conditionals

Here are three different options:

### `cond` only

```scm
(define (mod x)
  (cond
    ((> x 0) x)
    ((< x 0) (- x))
    ((= x 0) 0)
  )
)
```

### `cond` and `else`

```scm
(define (mod x)
  (cond
    ((< x 0) (- x))
    (else x)
  )
)
```

### `if` only

```scm
(define (mod x)
  (if (< x 0) (- x) x)
)
```

## Printing

```scm
(display "hello world")
(newline)
```

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

# Left diff
An array utility to calculate differences amongs arrays. Support array & nested array with string/number data

## Installation
```
npm install left-diff
```


## Usage

### leftDiff
> returns a new array contains elements that are available in first array, but not in others
```ts
import { leftDiff } from 'left-diff'

leftDiff([1,2,3], [3,4,5])
// => [1,2]

leftDiff([1,2,3], [3,4,5], [1])
// => [2]
```

### leftDiffDeep
> returns a new array contains elements that are available in first array, but not in others - with all nested values counted

```ts
import { leftDiffDeep } from 'left-diff'

leftDiff([1,[2,3]], [3,4,5])
// => [1,2]

leftDiff([1,2,3], [[3,4],5], [1])
// => [2]
```
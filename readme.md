## dayjs-jp-calendar

[![](https://img.shields.io/npm/dm/dayjs-jp-calendar)](https://www.npmjs.com/package/dayjs-jp-calendar)

> Jpanese Calendar Plugin for Day.js

### Installation

```bash
npm i dayjs-jp-calendar --save
# OR
pnpm i dayjs-jp-calendar

```

### Usage

```typescript
import dayjs from 'dayjs'
import jpCalendar from 'dayjs-jp-calendar'
// OR
import { jpCalendar } from 'dayjs-jp-calendar'

dayjs.extend(jpCalendar)

const date = '2023-11-13'

dayjs(date).format('RRRR') // --> 令和5
dayjs(date).format('RRR') // --> 令和
dayjs(date).format('RR') // --> R5
dayjs(date).format('R') // --> R

dayjs(date).format('YYYY(RR)/MM/DD') // --> 2023(R5)/11/13
```

### Test Coverage
```
 % Coverage report from v8
----------|---------|----------|---------|---------|----------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s    
----------|---------|----------|---------|---------|----------------------
All files |   91.25 |     82.6 |     100 |   91.25 |                      
 index.ts |   91.25 |     82.6 |     100 |   91.25 | 18-19,46,51-52,71-72 
 ```

 ### For Dev
 ```bash
#Install
pnpm i
#Test
pnpm run test
#Build
pnpm run build  
 ```

 ### Example case
 > with antd
 todo
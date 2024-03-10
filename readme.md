### dayjs-jp-calendar

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

dayjs(date).format('rrrr') // --> 令和5
dayjs(date).format('rrr') // --> 令和
dayjs(date).format('rr') // --> R5
dayjs(date).format('r') // --> R
```

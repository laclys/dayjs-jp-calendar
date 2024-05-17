import { expect, test } from 'vitest'
import dayjs from 'dayjs'
import jpCalendar from '../index'

dayjs.extend(jpCalendar)

test(`令和のCase: format("RRRR")`, () => {
  const date = '2023-11-13'
  expect(dayjs(date).format('RRRR')).toBe('令和5')
})

test(`令和のCase: format("RRR")`, () => {
  const date = '2023-11-13'
  expect(dayjs(date).format('RRR')).toBe('令和')
})

test(`令和のCase: format("RR")`, () => {
  const date = '2023-11-13'
  expect(dayjs(date).format('RR')).toBe('R5')
})

test(`令和のCase: 令和のCase: format("R")`, () => {
  const date = '2023-11-13'
  expect(dayjs(date).format('R')).toBe('R')
})

test(`令和のCase: format("YYYY(RR)/MM/DD")`, () => {
  const date = '2023-11-13'
  expect(dayjs(date).format('YYYY(RR)/MM/DD')).toBe('2023(R5)/11/13')
})

test(`令和のCase: format("YYYY(rr)/MM/DD")`, () => {
  const date = '2023-11-13'
  expect(dayjs(date).format('YYYY(rr)/MM/DD')).toBe('2023(㋿5)/11/13')
})

test(`令和のCase: format("r")`, () => {
  const date = '2023-11-13'
  expect(dayjs(date).format('r')).toBe('㋿')
})

test(`平成のCase: format("RRRR")`, () => {
  const date = '1994-11-13'
  expect(dayjs(date).format('RRRR')).toBe('平成6')
})

test(`平成のCase: format("YYYY(RR)")`, () => {
  const date = '1994-11-13'
  expect(dayjs(date).format('YYYY(RR)')).toBe('1994(H6)')
})

test(`平成のCase: format("YYYY(rr)")`, () => {
  const date = '1994-11-13'
  expect(dayjs(date).format('YYYY(rr)')).toBe('1994(㍻6)')
})

test(`昭和のCase: format("YYYY(RR)")`, () => {
  const date = '1973-11-13'
  expect(dayjs(date).format('YYYY(RR)')).toBe('1973(S48)')
})

test(`昭和のCase: format("YYYY(RR)rr")`, () => {
  const date = '1973-11-13'
  expect(dayjs(date).format('YYYY(RR)rr')).toBe('1973(S48)㍼48')
})

test(`大正のCase`, () => {
  const date = '1920-11-13'
  expect(dayjs(date).format('YYYY(RR)')).toBe('1920(T9)')
})

test(`大正のCase`, () => {
  const date = '1920-11-13'
  expect(dayjs(date).format('YYYY(rr)')).toBe('1920(㍽9)')
})

test(`明治のCase`, () => {
  const date = '1889-11-13'
  expect(dayjs(date).format('YYYY(RR)')).toBe('1889(M22)')
})

test(`明治のCase`, () => {
  const date = '1889-11-13'
  expect(dayjs(date).format('YYYY(rr)')).toBe('1889(㍾22)')
})

test(`The year is below the minimum year(明治元年) - format('YYYY(RR)')`, () => {
  const date = '199-11-13'
  expect(dayjs(date).format('YYYY(RR)')).toBe('0199(-)')
})

test(`The year is below the minimum year(明治元年) - format('YYYY(R)'))`, () => {
  const date = '199-11-13'
  expect(dayjs(date).format('YYYY(R)')).toBe('0199(-)')
})

test(`The year is below the minimum year(明治元年) - format('YYYY(RRRR)')`, () => {
  const date = '1773-11-13'
  expect(dayjs(date).format('YYYY(RRRR)')).toBe('1773(-)')
})

test(`The year is below the minimum year(明治元年)`, () => {
  const date = '1773-11-13'
  expect(dayjs(date).format('YYYY(RR)')).toBe('1773(-)')
})

test(`The year is below the minimum year(明治元年) - 'YYYY(rr)`, () => {
  const date = '1773-11-13'
  expect(dayjs(date).format('YYYY(rr)')).toBe('1773(-)')
})

test(`Unknow`, () => {
  const date = '1993-11-13'
  expect(dayjs(date).format('YYYY(RRRRR)')).toBe('1993(平成5H)')
})

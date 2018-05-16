import {QueryConfig} from 'src/types'
import {ColorString} from 'src/types/colors'

interface Axis {
  bounds: [string, string]
  label: string
  prefix: string
  suffix: string
  base: string
  scale: string
}

export interface Axes {
  x: Axis
  y: Axis
}

export interface FieldName {
  internalName: string
  displayName: string
  visible: boolean
}

export interface TableOptions {
  verticalTimeAxis: boolean
  sortBy: FieldName
  wrapping: string
  fixFirstColumn: boolean
}

interface CellLinks {
  self: string
}

export interface CellQuery {
  query: string
  queryConfig: QueryConfig
}

export interface Legend {
  type?: string
  orientation?: string
}

export interface DecimalPlaces {
  isEnforced: boolean
  digits: number
}

export interface Cell {
  id: string
  x: number
  y: number
  w: number
  h: number
  name: string
  queries: CellQuery[]
  type: CellType
  axes: Axes
  colors: ColorString[]
  tableOptions: TableOptions
  fieldOptions: FieldName[]
  timeFormat: string
  decimalPlaces: DecimalPlaces
  links: CellLinks
  legend: Legend
}

export enum CellType {
  Line = 'line',
  Stacked = 'line-stacked',
  StepPlot = 'line-stepplot',
  Bar = 'bar',
  LinePlusSingleStat = 'line-plus-single-stat',
  SingleStat = 'single-stat',
  Gauge = 'gauge',
  Table = 'table',
}

interface TemplateValue {
  value: string
  type: string
  selected: boolean
}

interface TemplateQuery {
  command: string
  db?: string
  rp?: string
  measurement: string
  tagKey: string
  fieldKey: string
}

export interface Template {
  id: string
  tempVar: string
  values: TemplateValue[]
  type: string
  label: string
  query?: TemplateQuery
}

interface DashboardLinks {
  self: string
  cells: string
  templates: string
}

export interface Dashboard {
  id: number
  cells: Cell[]
  templates: Template[]
  name: string
  organization: string
  links?: DashboardLinks
}

export interface Lecture {
  title: string;
  semester: Semester;
  year: number;
  teachers: string[];
  dayAndPeriodTimes: string;
  faculties?: string[];
  campus?: string;
  room?: string;
  options?: {
    [key: string]: string;
  }[];
}

export enum Semester {
  YearRound = '通年',
  PreviousTerm = '前期',
  LateTerm = '後期'
}

export interface DayAndPeriodTime {
  day: Day;
  periodTime: PeriodTime;
}

export enum Day {
  Sunday = '日',
  Monday = '月',
  Tuesday = '火',
  Wednesday = '水',
  Thursday = '木',
  Friday = '金',
  Saturday = '土'
}

export type PeriodTime = 1 | 2 | 3 | 4 | 5 | 6 | 7;
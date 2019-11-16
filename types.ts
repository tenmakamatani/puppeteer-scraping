export interface Lecture {
  title: string;
  semester: Semester;
  year: number;
  teachers: string[];
  dayAndPeriodTimes: DayAndPeriodTime[];
  faculties?: string[];
  campus?: string;
  room?: string;
  options?: {
    [key: string]: string;
  }[];
}

export enum Semester {
  Spring = '春学期',
  Fall = '秋学期',
  YearRound = '通年',
  SpringIntensive = '春学期集中',
  FallIntensive = '秋学期集中',
  One = '1学期',
  Two = '2学期',
  Three = '3学期',
  Four = '4学期'
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
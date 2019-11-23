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

enum Semester {
  YearRound = '通年',
  PreviousTerm = '前期',
  LateTerm = '後期'
}

interface DayAndPeriodTime {
  day: Day;
  periodTime: PeriodTime;
}

enum Day {
  Sunday = '日',
  Monday = '月',
  Tuesday = '火',
  Wednesday = '水',
  Thursday = '木',
  Friday = '金',
  Saturday = '土'
}

type PeriodTime = 1 | 2 | 3 | 4 | 5 | 6 | 7;
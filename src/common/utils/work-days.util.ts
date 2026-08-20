import { DayOfWeek } from '../types';

const DAY_INDEX: Record<DayOfWeek, number> = {
  [DayOfWeek.SUN]: 0,
  [DayOfWeek.MON]: 1,
  [DayOfWeek.TUE]: 2,
  [DayOfWeek.WED]: 3,
  [DayOfWeek.THU]: 4,
  [DayOfWeek.FRI]: 5,
  [DayOfWeek.SAT]: 6,
};

export function datesInRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const cur = new Date(`${start}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);
  while (cur <= last) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

export function datesMatchingDayOfWeek(start: string, end: string, dayOfWeek: DayOfWeek): string[] {
  const target = DAY_INDEX[dayOfWeek];
  return datesInRange(start, end).filter((d) => new Date(`${d}T00:00:00`).getDay() === target);
}

// O'quv markaz odatda dushanba-shanba ishlaydi deb olinadi (faqat yakshanba
// dam olish kuni). Aniq ish jadvali kelgusida sozlanishi mumkin.
export function workingDaysInRange(start: string, end: string): string[] {
  return datesInRange(start, end).filter((d) => new Date(`${d}T00:00:00`).getDay() !== 0);
}

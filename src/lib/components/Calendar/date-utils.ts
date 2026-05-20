export const startOfLocalDay = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const todayLocalDay = (): Date => startOfLocalDay(new Date());

const pad2 = (n: number) => String(n).padStart(2, "0");

/** `yyyy-MM-dd` for API / form state */
export const toYmdString = (d: Date): string =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

export const formatDdMmYyyy = (d: Date): string =>
  `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;

export const parseYmdToLocalDay = (
  value: string | null | undefined,
): Date | undefined => {
  if (value == null || value === "") {
    return undefined;
  }
  const s = String(value).trim();
  const ymd = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (ymd) {
    const y = Number(ymd[1]);
    const m = Number(ymd[2]) - 1;
    const day = Number(ymd[3]);
    const d = new Date(y, m, day);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }
  const t = new Date(s);
  if (Number.isNaN(t.getTime())) {
    return undefined;
  }
  return startOfLocalDay(t);
};

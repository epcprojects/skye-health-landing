"use client";

import { ThemeButton } from "@/app/components";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { Images } from "@/app/images";
import { clearAuth } from "@/app/Redux/slices/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

type AppointmentType = "15min" | "30min" | "45min" | "60min";

const MIN_DATE = new Date(2026, 3, 1);

function getInitialSelectedDate() {
  const today = startOfDay(new Date());
  const min = startOfDay(MIN_DATE);
  return today.getTime() < min.getTime() ? min : today;
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

// Monday-based index (Mon=0 ... Sun=6)
function mondayIndex(jsDay: number) {
  // JS: Sun=0..Sat=6 => Mon=1 becomes 0
  return (jsDay + 6) % 7;
}

function formatMonthYear(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function formatLongDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function toTimeLabel(hours24: number, minutes: number) {
  const ampm = hours24 >= 12 ? "PM" : "AM";
  const h12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${h12}:${pad2(minutes)} ${ampm}`;
}

function toScheduledAtTimestamp(date: Date, timeLabel: string) {
  const m = timeLabel.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!m) throw new Error("Invalid time format");

  let hours = Number(m[1]);
  const minutes = Number(m[2]);
  const ampm = m[3].toUpperCase();

  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  // USE Date.UTC instead of new Date()
  // This creates a timestamp where 12:00 is exactly 12:00 UTC
  const utcTimestamp = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0,
  );

  return utcTimestamp;
}

function generateTimes(type: AppointmentType) {
  // Example slots: 9:30 AM → 7:00 PM
  // step depends on appointment type (15/30/60).
  const step =
    type === "15min" ? 15 : type === "30min" ? 30 : type === "60min" ? 60 : 30;

  const slots: string[] = [];
  // start at 9:30
  let h = 9;
  let m = 30;

  // end at 19:00
  const end = 19 * 60; // minutes

  while (h * 60 + m <= end) {
    slots.push(toTimeLabel(h, m));
    const total = h * 60 + m + step;
    h = Math.floor(total / 60);
    m = total % 60;
  }
  return slots;
}

export default function AppointmentSchedulePage() {
  const [appointmentType, setAppointmentType] =
    useState<AppointmentType>("45min");

  // initial view month: MIN_DATE's month (so user doesn't land in disabled months)
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(getInitialSelectedDate()),
  );

  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getInitialSelectedDate(),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = useMemo(
    () => generateTimes(appointmentType),
    [appointmentType],
  );

  // Build calendar grid (Mon-first), including leading blanks
  const calendarCells = useMemo(() => {
    const first = startOfMonth(viewMonth);
    const last = endOfMonth(viewMonth);

    const leadingBlanks = mondayIndex(first.getDay()); // 0..6
    const daysInMonth = last.getDate();

    const cells: Array<{ date: Date | null }> = [];

    for (let i = 0; i < leadingBlanks; i++) cells.push({ date: null });

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({
        date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
      });
    }

    // trailing blanks to fill 6 rows nicely (optional)
    while (cells.length % 7 !== 0) cells.push({ date: null });

    return cells;
  }, [viewMonth]);

  const canGoPrev = useMemo(() => {
    // Can't navigate to months earlier than MIN_DATE's month
    const minMonth = startOfMonth(MIN_DATE);
    const current = startOfMonth(viewMonth);
    return current.getTime() > minMonth.getTime();
  }, [viewMonth]);

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const goNextMonth = () => {
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const isDisabledDate = (d: Date) => {
    // Disable anything before MIN_DATE (day precision)
    return startOfDay(d).getTime() < startOfDay(MIN_DATE).getTime();
  };

  const onPickDate = (d: Date) => {
    if (isDisabledDate(d)) return;
    setSelectedDate(d);
    setSelectedTime(null); // reset time when date changes
  };

  const userId = useAppSelector((s) => s.auth.me?.user.id);
  const me = useAppSelector((s) => s.auth.me);

  const productIds = me?.products?.map((p) => p.productId) || [];

  const dispatch = useAppDispatch();
  const router = useRouter();

  async function bookAppointment(payload: {
    userId: number;
    productId: string[];
    scheduledAt: string; // ISO
  }) {
    const res = await fetch("/api/paramount/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg =
        data?.body?.message || data?.message || "Failed to create appointment";
      throw new Error(msg);
    }

    return data;
  }

  // function toLocalDateTime(date: Date, timeLabel: string) {
  //   // timeLabel like "2:00 PM"
  //   const m = timeLabel.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  //   if (!m) throw new Error("Invalid time format");

  //   let hours = Number(m[1]);
  //   const minutes = Number(m[2]);
  //   const ampm = m[3].toUpperCase();

  //   if (ampm === "PM" && hours !== 12) hours += 12;
  //   if (ampm === "AM" && hours === 12) hours = 0;

  //   // ✅ local wall time (no timezone conversion)
  //   const yyyy = date.getFullYear();
  //   const mm = String(date.getMonth() + 1).padStart(2, "0");
  //   const dd = String(date.getDate()).padStart(2, "0");
  //   const hh = String(hours).padStart(2, "0");
  //   const min = String(minutes).padStart(2, "0");

  //   // Send ISO-like local string that many backends parse easily:
  //   // "2026-03-25T14:00:00"
  //   return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;
  // }

  const onConfirm = async () => {
    try {
      if (!userId) throw new Error("User not logged in");
      if (!selectedDate) throw new Error("Please select a date");
      if (!selectedTime) throw new Error("Please select a time");

      const scheduledAtTimestamp = toScheduledAtTimestamp(
        selectedDate,
        selectedTime,
      );

      await bookAppointment({
        userId,
        productId: productIds,
        scheduledAt: scheduledAtTimestamp.toString(),
      });

      dispatch(clearAuth());
      await fetch("/api/paramount/auth/logout", { method: "POST" });

      router.push(
        `/success-page?ts=${scheduledAtTimestamp}&time=${encodeURIComponent(selectedTime)}`,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log("Booking error:", e.message);
    }
  };

  const titleDate =
    selectedDate ?? new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);

  const isMobile = useIsMobile();

  const [showSlots, setShowSlots] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-4 md:p-6 flex flex-col gap-5 md:gap-10 items-center justify-center">
      <Image alt="" src={Images.layout.logo} className="w-32 md:w-48" />
      <div className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-4 shadow-sm">
        <div className="text-lg font-semibold text-neutral-900">
          Schedule an Appointment
        </div>

        <div className="mt-2 md:mt-4 grid grid-cols-1 md:gap-6 lg:grid-cols-5">
          {/* LEFT */}
          {(!showSlots || !isMobile) && (
            <div className="col-span-2">
              {/* <div className="text-sm font-medium text-slate-700">
                Appointment Type <span className="text-rose-500">*</span>
              </div> */}

              {/* <div className="mt-2">
                <Dropdown
                  options={[
                    { label: "15min", value: "15min" },
                    { label: "30min", value: "30min" },
                    { label: "45min", value: "45min" },
                    { label: "60min", value: "60min" },
                  ]}
                  value={appointmentType}
                  placeholder="Sort By"
                  onChange={(e) => setAppointmentType(e as AppointmentType)}
                />
              </div> */}

              {/* CALENDAR */}
              <div className="text-base font-semibold text-neutral-900">
                Select Day
              </div>
              <div className="mt-2 rounded-lg border border-neutral-200 p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={goPrevMonth}
                    disabled={!canGoPrev}
                    className={`rounded-lg p-2 transition ${
                      canGoPrev
                        ? "hover:bg-slate-100"
                        : "cursor-not-allowed opacity-40"
                    }`}
                    aria-label="Previous month"
                  >
                    <span className="block rotate-180">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.55735 17.3952C8.71873 17.2733 9.20047 16.9094 9.47818 16.6927C10.0344 16.2586 10.7735 15.6655 11.5104 15.0257C12.251 14.3826 12.9723 13.7071 13.5025 13.107C13.7684 12.8061 13.9704 12.5418 14.1019 12.3236C14.2256 12.1185 14.2513 11.9973 14.2513 11.9973C14.2513 11.9973 14.2256 11.8797 14.1019 11.6745C13.9704 11.4564 13.7684 11.1921 13.5025 10.8911C12.9723 10.291 12.251 9.61552 11.5104 8.97248C10.7735 8.33267 10.0344 7.73956 9.47815 7.30549C9.20043 7.08876 8.71937 6.72536 8.55799 6.60348C8.22447 6.35784 8.15254 5.88784 8.39817 5.55432C8.6438 5.22079 9.1133 5.14954 9.44682 5.39518L9.44936 5.39709C9.61862 5.52493 10.1176 5.90184 10.401 6.12297C10.9698 6.56684 11.7307 7.17727 12.4938 7.83983C13.2532 8.49915 14.0319 9.22482 14.6266 9.89794C14.9232 10.2336 15.1899 10.5739 15.3866 10.9001C15.5708 11.2057 15.7521 11.5926 15.7521 11.9991C15.7521 12.4056 15.5708 12.7925 15.3866 13.0981C15.1899 13.4242 14.9232 13.7645 14.6266 14.1002C14.0319 14.7733 13.2532 15.499 12.4938 16.1583C11.7307 16.8209 10.9698 17.4313 10.401 17.8752C10.1175 18.0965 9.61844 18.4734 9.44953 18.601L9.44735 18.6026C9.11383 18.8483 8.64385 18.7774 8.39822 18.4438C8.15259 18.1103 8.22386 17.6408 8.55735 17.3952Z"
                          fill="#737373"
                        />
                      </svg>
                    </span>
                  </button>

                  <div className="text-lg font-semibold text-neutral-900">
                    {formatMonthYear(viewMonth)}
                  </div>

                  <button
                    onClick={goNextMonth}
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                    aria-label="Next month"
                  >
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.55735 17.3952C8.71873 17.2733 9.20047 16.9094 9.47818 16.6927C10.0344 16.2586 10.7735 15.6655 11.5104 15.0257C12.251 14.3826 12.9723 13.7071 13.5025 13.107C13.7684 12.8061 13.9704 12.5418 14.1019 12.3236C14.2256 12.1185 14.2513 11.9973 14.2513 11.9973C14.2513 11.9973 14.2256 11.8797 14.1019 11.6745C13.9704 11.4564 13.7684 11.1921 13.5025 10.8911C12.9723 10.291 12.251 9.61552 11.5104 8.97248C10.7735 8.33267 10.0344 7.73956 9.47815 7.30549C9.20043 7.08876 8.71937 6.72536 8.55799 6.60348C8.22447 6.35784 8.15254 5.88784 8.39817 5.55432C8.6438 5.22079 9.1133 5.14954 9.44682 5.39518L9.44936 5.39709C9.61862 5.52493 10.1176 5.90184 10.401 6.12297C10.9698 6.56684 11.7307 7.17727 12.4938 7.83983C13.2532 8.49915 14.0319 9.22482 14.6266 9.89794C14.9232 10.2336 15.1899 10.5739 15.3866 10.9001C15.5708 11.2057 15.7521 11.5926 15.7521 11.9991C15.7521 12.4056 15.5708 12.7925 15.3866 13.0981C15.1899 13.4242 14.9232 13.7645 14.6266 14.1002C14.0319 14.7733 13.2532 15.499 12.4938 16.1583C11.7307 16.8209 10.9698 17.4313 10.401 17.8752C10.1175 18.0965 9.61844 18.4734 9.44953 18.601L9.44735 18.6026C9.11383 18.8483 8.64385 18.7774 8.39822 18.4438C8.15259 18.1103 8.22386 17.6408 8.55735 17.3952Z"
                          fill="#737373"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between text-center  text-xs font-medium text-slate-500">
                  {WEEKDAYS.map((d) => (
                    <div
                      className="h-9 w-9 md:h-12 md:w-12 font-medium text-base text-neutral-700 "
                      key={d}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-7 gap-2">
                  {calendarCells.map((cell, idx) => {
                    if (!cell.date) {
                      return <div key={idx} className="h-10" />;
                    }

                    const d = cell.date;
                    const disabled = isDisabledDate(d);
                    const selected = selectedDate
                      ? isSameDay(d, selectedDate)
                      : false;

                    return (
                      <button
                        key={idx}
                        onClick={() => onPickDate(d)}
                        disabled={disabled}
                        className={[
                          "h-8 w-8 md:h-12 md:w-12 rounded-full cursor-pointer text-xs md:text-sm transition",
                          disabled
                            ? "cursor-not-allowed bg-slate-50 text-slate-300"
                            : "hover:bg-slate-100 text-slate-700",
                          selected
                            ? "bg-secondary text-white hover:bg-secondary!"
                            : "",
                        ].join(" ")}
                        aria-label={`Day ${d.getDate()}`}
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isMobile && (
                <div className="mt-2">
                  <ThemeButton
                    label="Continue"
                    variant="secondary"
                    onClick={() => setShowSlots(true)}
                  />
                </div>
              )}
            </div>
          )}

          {/* RIGHT */}
          {(showSlots || !isMobile) && (
            <div className="rounded-lg col-span-3">
              <div className="text-base font-semibold text-neutral-900">
                Available times for{" "}
                <span className="font-semibold">
                  {formatLongDate(titleDate)}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {times.map((t) => {
                  const active = selectedTime === t;
                  const disabled = !selectedDate; // require date first, like many schedulers

                  return (
                    <button
                      key={t}
                      onClick={() => {
                        if (disabled) return;
                        setSelectedTime(t);
                      }}
                      disabled={disabled}
                      className={[
                        "rounded-lg  border px-3 py-2 text-sm transition cursor-pointer",
                        disabled
                          ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                          : "border-slate-200 bg-neutral-50 text-slate-700 hover:bg-slate-50",
                        active
                          ? "bg-secondary text-white border-secondary hover:bg-secondary!"
                          : "",
                      ].join(" ")}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-2">
                <ThemeButton
                  onClick={onConfirm}
                  variant="secondary"
                  label=" Confirm Booking"
                  disabled={!selectedDate || !selectedTime ? true : false}
                />
                {isMobile && (
                  <ThemeButton
                    onClick={() => setShowSlots(false)}
                    variant="outline"
                    label=" Change date"
                  />
                )}
              </div>

              {/* Optional small status line */}
              <div className="mt-3 text-xs text-slate-500">
                {selectedDate ? (
                  selectedTime ? (
                    <>
                      Selected:{" "}
                      <span className="font-medium text-slate-700">
                        {formatLongDate(selectedDate)} • {selectedTime}
                      </span>
                    </>
                  ) : (
                    <>Pick a time to continue.</>
                  )
                ) : (
                  <>Pick a date to see/select a time.</>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

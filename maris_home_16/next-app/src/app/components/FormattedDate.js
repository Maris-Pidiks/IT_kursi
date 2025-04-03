"use client";

export default function FormattedDate({ date }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <time dateTime={date} className="text-gray-600">
      {formattedDate}
    </time>
  );
}

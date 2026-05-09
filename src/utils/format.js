export function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function averageScore(items) {
  if (!items.length) return 0;
  return Math.round(items.reduce((sum, item) => sum + item.atsScore, 0) / items.length);
}

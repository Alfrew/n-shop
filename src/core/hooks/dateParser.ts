export default function useDateParser() {
  function isValidDate(stringDate: string) {
    const timestamp = Date.parse(stringDate);
    return !isNaN(timestamp);
  }

  function getLang() {
    if (navigator.languages != undefined) {
      return navigator.languages[0];
    }
    return navigator.language;
  }

  function formatDate(stringDate: string): string {
    const locale = getLang();
    const dateFormat: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    if (isValidDate(stringDate)) {
      return new Date(stringDate).toLocaleDateString(locale, dateFormat);
    } else {
      return stringDate;
    }
  }

  return { formatDate };
}

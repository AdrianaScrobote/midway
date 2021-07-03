exports.getLocalDate = (date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)

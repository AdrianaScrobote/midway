exports.isValidNumber = (number) => {
  if (!/^(\d+)$/.test(number)) {
    return false
  }
  return true
}

exports.getDatetimeString = (datetimeString) => {
  if (
    !/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(datetimeString)
  ) {
    throw new Error(
      `o valor ${datetimeString} é inválido. Por favor envie no formato YYYY-MM-DD hh:mm:ss`
    )
  }

  let datetime = new Date(datetimeString)
  datetime = new Date(
    datetime.getTime() - datetime.getTimezoneOffset() * 60 * 1000
  )
  datetime = datetime.toISOString()

  let date = datetime.split('T')
  date = date[0]

  let dateString = datetimeString.split(' ')
  dateString = dateString[0]

  if (date === dateString) {
    return datetime
  }

  return false
}

exports.isValidDifferenceDates = (date1, date2) => {
  const differenceDates = date1.getTime() - date2.getTime()

  if (differenceDates > 0) {
    return true
  }
  return false
}

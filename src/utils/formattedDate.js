function formattedDate(strDate) {
  const date = new Date(strDate)

  const formattedDateDMY = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedDateHMS = new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  const formattedDateString = `${formattedDateDMY.format(date).replace(/\s*г\./, "")} в ${formattedDateHMS.format(date)}`

  return formattedDateString
}

export default formattedDate
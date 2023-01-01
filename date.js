module.exports.getDate = function () {
  const today = new Date()

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }
  // format the date and add to variable
  return today.toLocaleDateString('en-US', options)
}

module.exports.getDay = function () {
  const today = new Date()

  const options = {
    weekday: 'long',
  }
  // format the date
  return today.toLocaleDateString('en-US', options)
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const statusNameChanger = (status) => {
  if (status === "to_do") {
    return "To Do"
  } else if (status === "in_progress") {
    return "In Progress"
  } else {
    return "Finished"
  }
}

export const changeDateFormat = (str) => {
  return str.slice(5, 7) + '/' + str.slice(8, 10) + '/' + str.slice(2, 4)
}

export const changeTimeFormat = (str) => {
  let hoursOfTime = parseInt(str.slice(11, 13))
  let minutesOfTime = str.slice(14, 16)
  if (hoursOfTime > 12) {
    let newHoursOfTime = hoursOfTime - 12
    let finalHoursOfTime = newHoursOfTime.toString()
    let finalTime = finalHoursOfTime + ':' + minutesOfTime + ' PM'
    return finalTime
  } else {
    let hoursOfTime = parseInt(str.slice(12, 13))
    let finalHoursOfTime = hoursOfTime.toString()
    let finalTime = finalHoursOfTime + ':' + minutesOfTime + ' AM'
    return finalTime
  }
}
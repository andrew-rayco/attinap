import moment from 'moment'

// Required for moment().duration().format() method. See below
import momentDurationFormatSetup from 'moment-duration-format'

export function formatTime(time) {
    return time ? moment(time).format('ddd, h:mm a') : 'No time yet today'
}

export function formatAgo(time) {
    const moTime = moment(time)
    const moNow = moment()

    // https://momentjs.com/docs/#/durations/diffing/
    const timeDiff = moment.duration(moNow.diff(moTime))

    // `moment-duration-format` allows this formatting with `x hrs, y mins`
    // https://github.com/jsmreese/moment-duration-format#template
    const humanise = moment
        .duration(timeDiff, 'minutes')
        .format('h [hrs], m [min]')

    return time ? humanise : ''
}

export function getTimeDiff(before, after) {
    const moBefore = moment(before)
    const moAfter = moment(after)
    const timeDiff = moment.duration(moAfter.diff(moBefore))
    const humanise = moment
        .duration(timeDiff, 'minutes')
        .format('h [hrs], m [min]')
    return humanise
}

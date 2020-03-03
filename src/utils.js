import moment from 'moment'

export function formatTime(time) {
    return time ? moment(time).format('dddd, h:mm:ss a') : 'No time yet today'
}

export function formatAgo(time) {
    return time ? moment(time).fromNow() : ''
}

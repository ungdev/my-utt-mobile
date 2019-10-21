import React from 'react'
import { View } from 'react-native'
import ScheduleItem from './ScheduleItem'
import ScheduleHalfItem from './ScheduleHalfItem'
const ScheduleItems = props => {
  const hours = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00'
  ]
  let courses = {}
  for (let i = 0; i < hours.length; i++) {
    courses[hours[i]] = { type: 'void', size: 1 }
    /*let hourCourses = props.courses.filter(c => c.start === hours[i])
    if (hourCourses.length > 0) {
      let j = 1
      while (course.end !== hours[i + j] && i + j < hours.length) {
        j++
      }
      i += j - 1
      courses.push({
        size: j,
        title: course.uv,
        room: course.room,
        type: course.type,
        week: course.week,
        backgroundColor: '#4098ff',
        textColor: 'white'
      })
    } else {
      courses.push({ size: 1 })
    }*/
  }
  props.courses.forEach(course => {
    if (course.week === 'T') {
      courses[course.start] = {
        type: 'course',
        size: getBlockSize(course),
        course,
        backgroundColor: '#4098ff',
        textColor: 'white'
      }
    } else {
      if (!courses[course.start].courses) {
        courses[course.start] = {
          type: 'course_half',
          courses: { a: { ...course, size: getBlockSize(course) } },
          backgroundColor: '#4098ff',
          textColor: 'white'
        }
      } else {
        courses[course.start].courses.b = {
          ...course,
          size: getBlockSize(course)
        }
      }
    }
  })
  let deleteCount = 0
  for (let [key, course] of Object.entries(courses)) {
    if (course.type === 'course' || course.type == 'course_half') {
      deleteCount = course.size - 1
    } else if (deleteCount > 0) {
      --deleteCount
      delete courses[key]
    }
  }
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10
      }}
    >
      {Object.values(courses).map((item, index) =>
        item.type === 'course' ? (
          <ScheduleItem key={index} {...item} />
        ) : item.type === 'course_half' ? (
          <ScheduleHalfItem key={index} {...item} />
        ) : (
          <ScheduleItem key={index} {...item} />
        )
      )}
    </View>
  )
}

const getBlockSize = course => {
  const partsStart = course.start.split(':')
  const partsEnd = course.end.split(':')
  const hours = partsEnd[0] - partsStart[0]
  const minutes = partsEnd[1] - partsStart[1]
  let size = hours * 2
  if (minutes == 30) {
    size++
  }
  if (minutes == -30) {
    size--
  }
  return size
}
export default ScheduleItems

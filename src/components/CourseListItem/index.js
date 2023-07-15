import {Link} from 'react-router-dom'

import './index.css'

const CourseListItem = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails
  return (
    <li className="course-item">
      <Link className="link-item" to={`courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default CourseListItem

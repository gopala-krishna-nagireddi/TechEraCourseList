import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseListItem from '../CourseListItem'

import './index.css'

const apiStatusCodes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiStatusCodes.initial}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusCodes.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const {courses} = data

      const updatedCourses = courses.map(course => ({
        id: course.id,
        logoUrl: course.logo_url,
        name: course.name,
      }))

      this.setState({
        coursesList: updatedCourses,
        apiStatus: apiStatusCodes.success,
      })
    } else {
      this.setState({apiStatus: apiStatusCodes.failure})
    }
  }

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="program-languages-container">
        <h1>Courses</h1>
        <ul className="courses-list">
          {coursesList.map(course => (
            <CourseListItem key={course.id} courseDetails={course} />
          ))}
        </ul>
      </div>
    )
  }

  onClickRetryBtn = () => {
    this.getCoursesList()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <div className="faillure-container">
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-note">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="retry-btn"
          type="button"
          onClick={this.onClickRetryBtn}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" width="50px" height="50px" color="" />
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCodes.success:
        return this.renderSuccessView()
      case apiStatusCodes.failure:
        return this.renderFailureView()
      case apiStatusCodes.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default Home

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusCodes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
}

class CourseDetailedView extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusCodes.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusCodes.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedCourse = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }

      this.setState({
        courseDetails: updatedCourse,
        apiStatus: apiStatusCodes.success,
      })
    } else {
      this.setState({apiStatus: apiStatusCodes.failure})
    }
  }

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails

    return (
      <div className="course-body-container">
        <div className="course-detailed-container">
          <img className="course-img" src={imageUrl} alt={name} />
          <div className="course-description-container">
            <h1>{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  onClickRetryBtn = () => {
    this.getCourseDetails()
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

export default CourseDetailedView

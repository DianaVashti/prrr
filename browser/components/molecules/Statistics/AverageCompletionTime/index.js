import React, { Component } from 'react'
import request from '../../../../request'
import moment from 'moment'

export default class AverageCompletionTime extends Component {
  constructor( props ) {
    super( props )

    this.state = { loading: true }
  }

  componentDidMount() {
    request( 'GET', '/api/statistics/averageTimeUntilCompleted' )
      .then( result => {
        this.setState( Object.assign( { loading: false }, { avg: result.json }))
      })
  }

  displayAverageTime() {
    if( this.state.loading ) {
      return 'Fetching'
    } else {
      return moment.duration( this.state.avg ).humanize()
    }
  }

  render() {
    const { averageTime } = this.props

    return (
      <div>
        <h5>Average time for PR to be completed last week: {this.displayAverageTime()}</h5>
      </div>
    )
  }
}

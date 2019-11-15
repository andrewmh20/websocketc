/* eslint-disable react/prop-types */
import React from 'react'

class WSHeader extends React.Component {


  render() {
    return (
      this.props.user ?
        <div>
          <h1>
          Welcome {this.props.user}!
          </h1>
        </div> : 
        <h2>Retrieving User Data...</h2> 
    )
  }
}



export default WSHeader;
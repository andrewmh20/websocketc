import React from 'react'
import WSContainer from './WSContainer';

class App extends React.Component {

  render() {
    console.log('Hello From JSX');
    return (
      <div><h2>Hello From React</h2>
        <WSContainer />
      </div>
    )
  }
}


export default App;
import React from 'react'
import WSContainer from './WSContainer';

class App extends React.Component {

  //TODO this is an extra layer of abstraction we can probably remove
  
  
  render() {
    return (
      <div>
        <WSContainer/>
      </div>
    )
  }
}


export default App;
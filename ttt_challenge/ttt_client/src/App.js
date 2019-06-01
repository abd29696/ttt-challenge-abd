import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{

  render(){

    return(
      <div>
        <div className="col-md-12">
        <div id="valueContainer" className="col-md-6"></div>
        <div id="tableContainer" className="col-md-6"></div>
        </div> 

      </div>

      );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));


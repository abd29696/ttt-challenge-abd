import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Demo from './gridTopN';


class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            number: 0,
            value: '',
            showGrid: false,
            GridFont: false,
            topNdata: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
  handleChange(event){
    this.setState({number: event.target.value});
  }
  
  handleClick(){
      var value_n = this.state.number;
      var data = {topnvalue: value_n};
      console.dir(value_n);
      fetch('https://ttt-challenge-server.herokuapp.com/logicapi/topn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
        },  
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        var topNData = {
            tableValues: []
        };
        
        var count = 1;
        for(var i in response){
            topNData.tableValues.push({
                ID: count,
                Word: i,
                Frequency: response[i]
            });
            count++;
          }
          this.setState({topNdata: topNData});
          //console.log(this.state.topNdata);
          
    });



    this.setState({ showGrid: true });
    this.setState({GridFont: true});
 
  }

  render(){

    return(
          <div className="container col-md-12 col-sm-12 col-xs-12 main-container row">
            <div className="col-md-6 col-sm-12 col-xs-12 valueContainer">
                <span className="ttt_font_logo">ttt</span><span className="ttt_font_c"> challenge</span>
                <div className="valueBoxContainer">
                    <span className="ttt_font_valueContainer">top n most frequently occurring words </span>
                    <div className="valueContainerInner">
                        <div className="textbox-container">
                            <input className="textbox" type="number" placeholder="enter value for n" onChange={this.handleChange}></input>
                        </div>
                        <div className="submitBtn-container">
                            <input type="button" className="btn btn-primary submitBtn" value="submit" onClick={this.handleClick} ></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12 gridContainer">
                <div className={"hide-"+this.state.GridFont}>
                    <div className="ttt_font_gridContainer ">
                        <span className="ttt_font_grid">your grid appears here</span>
                    </div>
                </div>
                {this.state.showGrid ? <TopNGrid gridValuesApp = {this.state.topNdata}/> : null}
                {/* {console.log(this.state.topNdata)} */}
        
            </div>
          </div>
      );
  }

}

class TopNGrid extends React.Component{
    
    render(){      
        return(
            <div className="gridContainerInner">
                <Demo gridValuesTopNGrid = {this.props.gridValuesApp.tableValues}/> 
                {/* {console.log(this.props.gridValuesApp.tableValues)} */}
            </div>
        );
    }

}
ReactDOM.render(<App />, document.getElementById('root'));

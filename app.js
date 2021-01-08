class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      equation: "0"
    };

    this.handleNums = this.handleNums.bind(this);
    this.handleSymbols = this.handleSymbols.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleDot = this.handleDot.bind(this);

  }

  handleNums(e)
  {
    const input = e.target.innerText;
    this.setState(prevState => {
      if (prevState.equation == "0"){
          return({
            equation: input
          });
      }
      else {
        return({
        equation: prevState.equation + input
        });
      }

    });
  }

  handleSymbols(e){
    const input = e.target.innerText;
    const symbols = ['+', '*', '/', '-'];
    const currentEquation = this.state.equation.toString();
    console.log(`current equation: ${currentEquation}`);

    console.log(currentEquation.slice(-1));  //abc => c
    console.log(currentEquation.slice(0, -1)); //abc => ab

    const lastInput = currentEquation.slice(-1);
    const secondToLastInput = currentEquation[currentEquation.length - 2];

    this.setState(prevState => {
      if (symbols.includes(lastInput) && symbols.includes(secondToLastInput)){
        console.log("last input and secondtolastinput is a symbol");
        return({
          equation: prevState.equation.slice(0, -2) + input
        });
      }
      else if (symbols.includes(lastInput) && input != '-'){
        return({
          equation: prevState.equation.slice(0, -1) + input
        });

      }
      else if (prevState.equation != "0"){
        return({
        equation: prevState.equation + input
        });
      }

    });

  }

  handleClear()
  {
    this.setState({
      equation: "0"
    });
  }

  handleEquals(){
    const result = eval(this.state.equation);
    this.setState({
      equation: result
    });
  }

  handleDot(){
    const symbols = ['+', '-', '*', '/'];
    const currentEquation = this.state.equation;
    let lastNum = "";
    let indexOfLastNum = 0;
    let hasDot = false;

    // loop through the equation string and find the starting index of the last number in the equation
    for (let i = 0; i < currentEquation.length; i++){
      if (symbols.includes(currentEquation[i]))
        {
          lastNum = currentEquation.slice(i + 1);
          indexOfLastNum = i + 1;
        }
    }

    //if there is a dot after the index, set hasDot = true so that no more dots can be entered
    for (let i = indexOfLastNum; i < currentEquation.length; i++){
        if (currentEquation[i] == "."){
          hasDot = true;
        }
     }

    if (hasDot == false){
      this.setState(prevState => {
        return({
          equation: prevState.equation + "."
        });
      });
    } else{
      console.log("cant input the dot");
    }


  }

  render(){
    return(
      <div>
        <Title />

        <div id="container">

          <div id="display">{this.state.equation}</div>

          <div id="buttons">
            <button id="equals" onClick={this.handleEquals}>=</button>

            <button id="zero" className="num" onClick={this.handleNums}>0</button>
            <button id="one" className="num" onClick={this.handleNums}>1</button>
            <button id="two" className="num" onClick={this.handleNums}>2</button>
            <button id="three" className="num" onClick={this.handleNums}>3</button>
            <button id="four" className="num" onClick={this.handleNums}>4</button>
            <button id="five" className="num" onClick={this.handleNums}>5</button>
            <button id="six" className="num" onClick={this.handleNums}>6</button>
            <button id="seven" className="num" onClick={this.handleNums}>7</button>
            <button id="eight" className="num" onClick={this.handleNums}>8</button>
            <button id="nine" className="num" onClick={this.handleNums}>9</button>

            <button id="decimal" className="num" onClick={this.handleDot}>.</button>

            <button id="add" className="operator" onClick={this.handleSymbols}>+</button>
            <button id="subtract" className="operator" onClick={this.handleSymbols}>-</button>
            <button id="multiply" className="operator" onClick={this.handleSymbols}>*</button>
            <button id="divide" className="operator" onClick={this.handleSymbols}>/</button>

            <button id="clear" onClick={this.handleClear}>AC</button>
          </div>

        </div>

      </div>
    );
  }

}


function Title()
{
  return(
    <h1>React Calculator</h1>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
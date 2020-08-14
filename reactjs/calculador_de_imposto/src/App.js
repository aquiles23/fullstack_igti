import React from 'react';
import './styles.css';
import Bar from './Bar';
import ReadOnlyInput from './readOnlyInput';
import { calculateSalaryFrom } from './salary';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      bar1: 50,
      bar2: 20,
      bar3: 30,
      salBruto: 0,
      inss: 0,
      irpf: 0,
      salLiq: 0,
    };
  }

  calcPorcentagen = (half,all) =>{
    return (half*100)/all;
  }

  handleSalario = (event) => {
    let { bar1, bar2, bar3, inss, irpf, salLiq } = this.state,
      salBruto = event.target.value;
    const obj = calculateSalaryFrom(salBruto);
    bar1 = this.calcPorcentagen(obj.discountINSS,salBruto);
    bar2 = this.calcPorcentagen(obj.discountIRPF,salBruto);
    bar3 = this.calcPorcentagen(obj.netSalary,salBruto);
    inss = `${obj.discountINSS} (${bar1})`;
    irpf = `${obj.discountIRPF} (${bar2})`;
    salLiq = `${obj.netSalary} (${bar3})`;
    
    this.setState({ bar1, bar2, bar3, inss, irpf, salLiq })
  };
  render() {
    const { bar1, bar2, bar3, inss, irpf, salLiq } = this.state;

    return (
      <div>
        <div className="App">
          <h1>React barras</h1>
          <div>
            <label>
              Sálario Bruto: &nbsp;
              <input type="number" step="0.5" onChange={this.handleSalario} />
            </label>
          </div>
          Desconto INSS
          <ReadOnlyInput
            value={inss}
            
            color="#e67e22"
          />
          &nbsp;
          Desconto IRPF
          <ReadOnlyInput
            value={irpf}
            color="#c0392b"
          />
          &nbsp;
          Salario líquido
          <ReadOnlyInput
            value={salLiq}           
            color="#16a085"
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bar value={bar1} color="#e67e22" />
          <Bar value={bar2} color="#c0392b" />
          <Bar value={bar3} color="#16a085" />
        </div>
      </div>
    );
  }
}

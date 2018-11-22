import React, { Component } from 'react';
import Chart from './component/chart'
// import axios from 'axios'
import { Container, Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import './App.css';
import '../node_modules/react-vis/dist/style.css';


const API_URL = "https://nataliia-radina.github.io/react-vis-example/";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown: false,
            selectValue: 'Select a Language',
            results: [],
        };
    }

    api = () => {
        fetch(API_URL)
            .then(response => {
                if (response.ok) {
                    return  response.json();
                }
                else {
                    throw new Error ('something went wrong')
                }
            })
            .then(response => this.setState({
                    results: response.results.filter((r)=>{
                        return r.name === this.state.selectValue;
                    })
                })
            )
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleChange = (e) => {
        console.log('handle clicked')
        this.setState({selectValue:e.target.value}, () => this.api());
        console.log(this.state.selectValue,'select value')
    }

    render() {
      return (
        <Container>
            <Row><h1>Programming Language Pull-Requests across year</h1></Row>
            <Row>
                <Col md="3">
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                        <DropdownToggle caret size="sm">
                            {this.state.selectValue}
                        </DropdownToggle>
                        <DropdownMenu onClick={this.handleChange}>
                            <DropdownItem value='Ruby'>RUBY</DropdownItem>
                            <DropdownItem value='Python'>PYTHON</DropdownItem>
                            <DropdownItem value='JavaScript'>JAVASCRIPT</DropdownItem>
                            <DropdownItem value='PHP'>PHP</DropdownItem>
                            <DropdownItem value='Java'>JAVA</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </Col>
                <Col className="graphArea">
                    <Chart data={this.state.results} />
                </Col>
            </Row>
        </Container>
      );
    }
}

export default App;

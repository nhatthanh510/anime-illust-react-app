import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {name: 'John'};
    }

    changeTitle (name) {
        this.setState({name})
    }

    render() {
        return (
            <div>
                <Header/>
                <Content changeTitle={this.changeTitle.bind(this)} title={this.state.name} />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Ranking Header</h1>
            </div>
        );
    }
}

class Content extends React.Component {
    handleChange(e) {
        const title = e.target.value;
        this.props.changeTitle(title);
    }
    render() {
        return (
            <div>
                <h2>Hello {this.props.title}</h2>
                <input type="text" onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

export default App;
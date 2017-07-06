import React, { Component } from 'react';


function topBarHOC(...WrappedComponents) {
  return class TopBar extends Component {
    constructor(props) {
      super(props);
    }

    createSubComponent = (SubComponent) => {
      return <SubComponent/>;
    };

    createSubComponents = (SubComponents) => {
      return SubComponents.map(this.createSubComponent);
    };

    render() {
      return(
          <div className="page-head">
            {this.createSubComponents(WrappedComponents)}
          </div>
      );
    }
  };
}


export default topBarHOC;

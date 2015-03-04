/** @jsx React.DOM */

var React = require("react");

var App = React.createClass({
  render: function (){
    console.log("Render");
    return (
        <div>
          Hello World.
        </div>
      )
  }
});

window.onload = function (){
  console.log("loading");
  React.renderComponent((
    <App />
  ), document.getElementById("container"));
};

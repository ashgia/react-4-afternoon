import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ClassList extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:3005/students?class=${this.props.match.params.class}`
      )
      //One of them is called match. It is an object with a bunch of useful information. One of the properties on match is called params. This is where we can see the value of any route parameters. Our route parameter is called class. Therefore, we can access it by using this.props.match.params.class.
      .then(results => {
        this.setState({
          students: results.data
        });
      });
  }

  render() {
    const students = this.state.students.map((student, i) => (
      <Link to={`/student/${student.id}`} key={i}>
        <h3>
          {student.first_name} {student.last_name}
        </h3>
      </Link>
    ));

    return (
      <div className="box">
        <h1>{this.props.match.params.class}</h1>
        <h2>ClassList:</h2>
        {students}
      </div>
    );
  }
}

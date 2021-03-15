import React from "react";


const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_\-\.\#\@])[_\-\@\#\.0-9a-zA-Z]{8,32}$/;
const userValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,32}$/;
 
class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",


      password: "",

      firstNameError: "",

      passwordError: "",

      isFormSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
      
    this.validatePassword = this.validatePassword.bind(this);

    this.validateField = this.validateField.bind(this);
    this.retrieveFu = this.retrieveFu.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    return;
  }
  
  handleBlur(event) {
    const { name } = event.target;

    this.validateField(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formFields = [
      "firstName",

      "password",

    ];
    let isValid = true;
    formFields.forEach(field => {
      isValid = this.validateField(field) && isValid;
    });

    if (isValid) this.setState({ isFormSubmitted: true });
    else this.setState({ isFormSubmitted: false });

    return this.state.isFormSubmitted;
  }

  validateField(name) {
    let isValid = false;

    if (name === "firstName") isValid = this.validateFirstName();

    else if (name === "password") isValid = this.validatePassword();

    return isValid;
  }

  validateFirstName() {
    let firstNameError = "";
    const value = this.state.firstName;
    if (value.trim() === "") firstNameError = "First Name is required";
    else if (!userValidator.test(value))
      firstNameError =
        "user must contain  3-32 characters , 1 number, 1 lowercase or uppercase!";
    this.setState({
      firstNameError
    });
    return firstNameError === "";
  }
  retrieveFu(e){
    const { name, value } = e.target;

    this.setState({
      [name]: ""
    });

    return;
   }


  validatePassword() {
    let passwordError = "";
    const value = this.state.password;
    if (value.trim === "") passwordError = "Password is required";
    else if (!passwordValidator.test(value))
      passwordError =
        "Password must contain  8-32 characters, 1 number, 1 upper and 1 lowercase and one unique key like {@,#,_,.,-}";

    this.setState({
      passwordError
    });
    return passwordError === "";
  }
  
     


  render() {
    return (
      <div className="main" >
        <h3>task is to implement a login page</h3>
        {this.state.isFormSubmitted ? (
          <div className="details">
            <h3>Thanks for signing up, find your details below:</h3>
            <div>User Name: {this.state.firstName}</div>

          </div>
        ) : (
          <div style={{ textAlign: "center", margin: "auto" }}>
            <form  >
              <div style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <h1>UserName</h1>
                <button onClick={this.retrieveFu}  className="bt">Retrieve</button>

              </div>
              <input
                type="text"
                placeholder="User Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />

              <br />
              {this.state.firstNameError && (
                <div className="errorMsg">{this.state.firstNameError}</div>
              )}
              <div style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <h1>pASSWORD</h1>
                <button className="bt">reset</button>

              </div>

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              
              <br />
              {this.state.passwordError && (
                <div className="errorMsg">{this.state.passwordError}</div>
              )}

              <button onClick={this.handleSubmit} className="but">Login</button>
            </form>
          </div>

        )}
        <div style={{display:"flex"}}>

        <button className="btt">New User ?</button>
        <button className="btt">Sign Up</button>
        </div>
      </div>
    );
  }
}
export default FormComponent;

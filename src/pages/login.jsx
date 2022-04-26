import React from 'react';
import logo from '../images/luigi.jpg'
import { auth } from "../firebase";
import Firebase from "../firebase";
import '../css/login.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            this.setState({email: value})
        }
        else if(name === 'userPassword'){
            this.setState({password: value})
        }
    }

    signInWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        const history = this.props
        await auth.signInWithEmailAndPassword(email, password)
        .then((data) => {
            Firebase.checkAdmin(data.user.uid, response => {
                if(response === true) {
                    history.history.push('/')
                } else if(response === false) {
                    auth()
                    .signOut()
                }
            })
        })
        .catch(error => {
            console.error("Error signing in with password and email", error);
            alert("Eroare")
        });
    };

    render() {
        return(
            <div className="login">
                <div className="login__container">
                    <div className="login__wrapper">
                        <img className="login__image" src={logo} alt="luigi" />
                    </div>
                    <h2 className="login__title">Bun venit! Eu sunt Luigi, asistentul dumneavoastră.</h2>
                    <div className="login__content">
                        <form className="login__form">
                            <label className="login__label">Email:
                                <input className="login__input" type="text" placeholder="E.g: nume@ulbsibiu.ro" name="userEmail" value={this.state.email} onChange={this.handleChange} />
                            </label>
                            <label className="login__label">Password:
                                <input className="login__input" type="password" name="userPassword" placeholder="Your Password" value={this.state.password} onChange={this.handleChange} />
                            </label>
                            <button className="login__submit"
                                onClick = {(event) => { this.signInWithEmailAndPasswordHandler(event, this.state.email, this.state.password)}}
                            >Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage
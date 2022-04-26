import React from 'react';
import { auth } from "../firebase";
import homeImage from '../images/luigiHome.png'
import Firebase from "../firebase";
import "../css/home.css"

class HomePage extends React.Component {
    logOutHandler() {
        const history = this.props
        auth.signOut()
        history.history.push('/login')
    }

    goToUsers() {
        const history = this.props
        history.history.push('/users')
    }

    goToFaculty() {
        const history = this.props
        history.history.push('/faculties')
    }

    startNewYear() {
        try {
            Firebase.createNewYear(response => {
                if(response === true) {
                    alert("Succes=")
                } else if(response === false) {
                    alert("Eroare")
                }
            })
        } catch(err) {
            console.log(err)
            alert('eroare')
        }
    }

    goToCourses() {
        const history = this.props
        history.history.push('/courses')
    }

    goToHistory() {
        const history = this.props
        history.history.push('/histories')
    }
    
    render() {
        return(
            <div className="home">
                <div className="home__header">
                    <div className="home__nav">         
                        <button className="home__button"
                            onClick = {(event) => { this.logOutHandler()}}
                            >logout
                        </button>
                    </div>
                </div>
                <div className="home__container">
                    <div className="home__menu">
                        <button className="home__button --menu"
                            onClick = {() => { this.goToUsers()}}
                            >Administrare users
                        </button> 
                        <button className="home__button --menu"
                            onClick = {(event) => { this.goToFaculty()}}
                            >Administrare facultăți
                        </button>
                        <h3 className="home__title">Prin apăsarea butonului se va crea un nou an universitar pentru toată lumea:</h3>
                        <button className="home__button --menu"
                            onClick = {(event) => { this.startNewYear()}}
                            >Incepe un nou an nou universitar
                        </button>
                        <button className="home__button --menu"
                            onClick = {(event) => { this.goToCourses()}}
                            >Administrare cursuri
                        </button>
                        <button className="home__button --menu"
                            onClick = {(event) => { this.goToHistory()}}
                            >Nr puncte credit si medii finale
                        </button>
                    </div>
                    <div className="home__wrapper">
                        <h1 className="home__title">Alege o opțiune!</h1>
                        <img className="home__image" src={homeImage} alt="luigi" />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage
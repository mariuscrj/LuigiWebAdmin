import React from 'react';
import Firebase from "../firebase";

class FacultyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faculty: '',
            faculties: '',
            specialities: '',
            facultyYear: '',
            speciality: '',
            facultyArr: null,
            specialitiesArr: null,
        };
    }

    componentDidMount() {
        Firebase.getFaculties(response => {
            this.setState({
                facultyArr: response
            })
        })
    }

    handleChange = async (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'facultyInput') {
            this.setState({faculty: value})
        } else if(name === 'facultySelect') {
            this.state.facultyArr.forEach((item) => {
                if(item[0] === value) {
                    let fArray = null
                    if(item[1].domains) {
                        fArray = Object.keys(item[1].domains).map((key) => [key, item[1].domains[key]]);
                    }

                    this.setState({
                        faculties: value,
                        specialitiesArr: fArray
                    })
                }
            })
        } else if(name === 'specialityInput') {
            this.setState({speciality: value})
        } else if(name === 'specialitySelect') {
            this.state.specialitiesArr.forEach((item) => {
                if(item[0] === value) {
                    this.setState({
                        specialities: value,
                    })
                }
            })
        } else if(name === 'facultyYear') {
            this.setState({
                facultyYear: value,
            })
        }
    }

    createFaculty = async (event) => {
        event.preventDefault()
        if((this.state.faculty !== '') && (this.state.faculty.length> 4) && (this.state.facultyYear !== '')) {
            try {
                Firebase.createFaculty(this.state.faculty, this.state.facultyYear,response => {
                    if(response === true) {
                        const inputs = document.getElementsByClassName("input")
                        Array.from(inputs).forEach((item) => {
                            item.value = ''
                        })
                        alert("Succes")
                    } else {
                        alert("Eroare")
                    }
                })
            } catch (err) {
                console.log(err)
                alert('Eroare')
            }
        } else {
            alert("Introduceți o facultate/Minim 4 caractere")
        }
    }

    deleteFaculty = async (event) => {
        event.preventDefault()
        if(this.state.faculties !== '') {
            try {
                Firebase.deleteFaculty(this.state.faculties, response => {
                    if(response === true) {
                        alert("Succes")
                    } else {
                        alert("Eroare")
                    }
                })   
            } catch(err) {
                console.log(err)
                alert('error')
            }
        }
    }

    createSpeciality = async (event) => {
        event.preventDefault()
        if((this.state.speciality !== '') && (this.state.speciality.length> 4)) {
            try {
                Firebase.createSpeciality(this.state.faculties, this.state.speciality, response => {
                    if(response === true) {
                        const inputs = document.getElementsByClassName("input")
                        Array.from(inputs).forEach((item) => {
                            item.value = ''
                        })
                        alert("Succes")
                    } else {
                        alert("Eroare")
                    }
                })
            } catch (err) {
                console.log(err)
                alert('error')
            }
        } else {
            alert("Introduceți o facultate/Minim 4 caractere")
        }
    }

    deleteSpeciality = async (event) => {
        event.preventDefault()
        if(this.state.specialities !== '') {
            try {
                Firebase.deleteSpeciality(this.state.faculties, this.state.specialities, response => {
                    if(response === true) {
                        alert("Succes")
                    } else {
                        alert("Eroare")
                    }
                })
            } catch(err) {
                console.log(err)
                alert('eroare')
            }
        }
    }

    goToHome () {
        const history = this.props
        history.history.push('/')
    }

    render() {
        return(
            <div className="faculty">
                <div className="faculty__container">
                    <div className="home__header">
                        <div className="home__nav">         
                            <button className="home__button"
                                onClick = {(event) => { this.goToHome()}}
                                >Home
                            </button>
                        </div>
                    </div>
                    <form className="faculties__forms form">
                        <div className="column">
                            <label className="label">Numele facultății:
                                <input className="input" type="text" placeholder="E.g: Facultatea de inginerie" name="facultyInput" value={this.state.faculty} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Nr de ani de studiu:
                                <input className="input" type="number" placeholder="E.g: 4" name="facultyYear" value={this.state.facultyYear} onChange={this.handleChange} required/>
                            </label>
                            <button className="submit"
                                onClick = {(event) => { this.createFaculty(event)}}
                            >Adaugăți o facultate
                            </button>
                        </div>
                        <div className="column">
                            <label className="label">Facultăți disponibile(Pentru a adăuga o specializare selectați):
                                <select className="select" name="facultySelect" value={this.state.faculties} onChange={this.handleChange}>
                                    <option value="" disabled hidden>Selectați</option>
                                    {
                                        this.state.facultyArr?.map((item) => {
                                            return(
                                                <option key={item[0]} value={item[0]}>{item[1].name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                            <button className="submit"
                                onClick = {(event) => { this.deleteFaculty(event)}}
                            >Ștergeți o facultate
                            </button>
                            <label className="label">Specializări disponibile:
                                        <select className="select" name="specialitySelect" value={this.state.specialities} onChange={this.handleChange}>
                                            <option value="" disabled hidden>Selectați</option>
                                            {
                                                this.state.specialitiesArr?.map((item) => {
                                                    return(
                                                        <option key={item[0]} value={item[0]}>{item[1]}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </label>
                                    <button className="submit"
                                        onClick = {(event) => { this.deleteSpeciality(event)}}
                                    >Șterge specializarea selectata
                                    </button>
                            {
                                this.state.faculties !== '' ?
                                <div>
                                    <label className="label">Adăugați o specializare pentru facultatea selectată:
                                        <input className="input" type="text" placeholder="E.g: Calculatoare" name="specialityInput" value={this.state.speciality} onChange={this.handleChange} required/>
                                    </label>
                                    <button className="submit"
                                        onClick = {(event) => { this.createSpeciality(event)}}
                                    >Adaugă specializare
                                    </button>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default FacultyPage
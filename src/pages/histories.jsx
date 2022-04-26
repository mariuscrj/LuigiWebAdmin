import React from 'react';
import Firebase from "../firebase";
import "../css/histories.css"

class HistoriesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facultiesD: '',
            specialitiesD: '',
            specialitiesDArr: null,
            facultyArr: null,
            students: '',
            studentsArr: null,
            historyVal: '',
            historyArr: null,
            arithmetic1: '',
            arithmetic2: '',
            average1: '',
            average2: '',
            credit1: '',
            credit2: '',
            nrpunct1: '',
            nrpunct2: '',
            year: '',
            arithmetic3: '',
            average3: '',
            credit3: '',
            nrpunct3: '',
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

        if(name === 'nameInput') {
            this.setState({name: value})
        } else if(name === 'facultyDSelect') {
            this.state.facultyArr.forEach((item) => {
                if(item[0] === value) {
                    let fArray = null
                    if(item[1].domains) {
                        fArray = Object.keys(item[1].domains).map((key) => [key, item[1].domains[key]]);
                    }

                    this.setState({
                        facultiesD: value,
                        specialitiesDArr: fArray
                    })
                }
            })
        } else if(name === 'specialityDSelect') {
            this.state.specialitiesDArr.forEach((item) => {
                if(item[0] === value) {
                    try {
                        Firebase.getStudentsByDomain(value, response => {
                            this.setState({
                                studentsArr: response
                            })
                        })
                    } catch(err) {
                        alert('Nu sunt studenti pentru acest domeniu')
                    }

                    this.setState({
                        specialitiesD: value,
                    })
                }
            })
        } else if(name === 'studentSelect') {
            let fArray = null
            this.state.studentsArr.forEach((item) => {
                if(item[0] === value) {
                    if(item[1].history) {
                        fArray = Object.keys(item[1].history).map((key) => [key, item[1].history[key]]);
                    }
                }
            })

            this.setState({
                students: value,
                historyArr: fArray
            })
        } else if(name === 'historySelect') {
            this.setState({
                historyVal: value
            })
        } else if(name === 'arithmetic1Input') {
            this.setState({arithmetic1: value})
        }  else if(name === 'arithmetic2Input') {
            this.setState({arithmetic2: value})
        } else if(name === 'arithmetic3Input') {
            this.setState({arithmetic3: value})
        } else if(name === 'average1Input') {
            this.setState({average1: value})
        } else if(name === 'average2Input') {
            this.setState({average2: value})
        } else if(name === 'average3Input') {
            this.setState({average3: value})
        } else if(name === 'credit1Input') {
            this.setState({credit1: value})
        } else if(name === 'credit2Input') {
            this.setState({credit2: value})
        } else if(name === 'credit3Input') {
            this.setState({credit3: value})
        } else if(name === 'nrPunct1Input') {
            this.setState({nrpunct1: value})
        } else if(name === 'nrPunct2Input') {
            this.setState({nrpunct2: value})
        } else if(name === 'nrPunct3Input') {
            this.setState({nrpunct3: value})
        } else if(name === 'yearInput') {
            this.setState({year: value})
        }
    }

    addHistory = (event) => {
        event.preventDefault()
        if(this.state.students !== '') {
            try {
                Firebase.addHistory(this.state, response => {
                    if(response === true) {
                        alert("Succes")
                    } else {
                        alert("Eroare")
                    }
                })
            } catch(err) {
                console.log(err)
                alert('Eroare')
            }
        } else {
            alert('Alegeti un student')
        }
    }

    goToHome () {
        const history = this.props
        history.history.push('/')
    }
    
    render() {
        return(
            <div className="histories paddingBot">
                <div className="home__header">
                    <div className="home__nav">         
                        <button className="home__button"
                            onClick = {(event) => { this.goToHome()}}
                            >Home
                        </button>
                    </div>
                </div>
                <h1 className="histories__title">Completați doar câmpurile pe care vreți să le modificați</h1>
                <form className="histories__form form">
                    <div className="column">
                        <label className="label">Facultăți disponibile:
                                <select className="select" name="facultyDSelect" value={this.state.facultiesD} onChange={this.handleChange}>
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
                            <label className="label">Specializări disponibile:
                                <select className="select" name="specialityDSelect" value={this.state.specialitiesD} onChange={this.handleChange}>
                                    <option value="" disabled hidden>Selectați</option>
                                    {
                                        this.state.specialitiesDArr?.map((item) => {
                                            return(
                                                <option key={item[0]} value={item[0]}>{item[1]}</option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                            <label className="label">Studenți disponibili:
                                <select className="select" name="studentSelect" value={this.state.students} onChange={this.handleChange}>
                                    <option value="" disabled hidden>Selectați</option>
                                    {
                                        this.state.studentsArr?.map((item) => {
                                            return(
                                                <option key={item[0]} value={item[0]}>{item[1].first_name} {item[1].last_name} : {item[1].email}</option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                            <label className="label">Selecteaza anul pentru istoric:
                                <select className="select" name="historySelect" value={this.state.historyVal} onChange={this.handleChange}>
                                    <option value="" disabled hidden>Selectați</option>
                                    {
                                        this.state.historyArr?.map((item) => {
                                            return(
                                                <option key={item[0]} value={item[0]}>{item[0]}</option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                        </div>
                        <div className="column">
                            <label className="label">Media Aritmetica Semestru I: 
                                <input className="input" type="text" placeholder="E.g: 9,3" name="arithmetic1Input" value={this.state.arithmetic1} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Media Ponderata Semestru I: 
                                <input className="input" type="text" placeholder="E.g: 9,3" name="average1Input" value={this.state.average1} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Credite Semestru I: 
                                <input className="input" type="text" placeholder="E.g: 30" name="credit1Input" value={this.state.credit1} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Nr. puncte credit I: 
                                <input className="input" type="text" placeholder="E.g: 400" name="nrPunct1Input" value={this.state.nrpunct1} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Media Aritmetica Semestru II: 
                                <input className="input" type="text" placeholder="E.g: 9,3" name="arithmetic2Input" value={this.state.arithmetic2} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Media Ponderata Semestru II: 
                                <input className="input" type="text" placeholder="E.g: 9,3" name="average2Input" value={this.state.average2} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Credite Semestru II: 
                                <input className="input" type="text" placeholder="E.g: 30" name="credit2Input" value={this.state.credit2} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Nr. puncte credit II: 
                                <input className="input" type="text" placeholder="E.g: 400" name="nrPunct2Input" value={this.state.nrpunct2} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Media Aritmetica Anuala: 
                                <input className="input" type="text" placeholder="E.g: 9,3" name="arithmetic3Input" value={this.state.arithmetic3} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Media Ponderata Anuala: 
                                <input className="input" type="text" placeholder="E.g: 9,3" name="average3Input" value={this.state.average3} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Credite Semestru Anuale: 
                                <input className="input" type="text" placeholder="E.g: 30" name="credit3Input" value={this.state.credit3} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Nr. puncte credit Anuale: 
                                <input className="input" type="text" placeholder="E.g: 400" name="nrPunct3Input" value={this.state.nrpunct3} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Anul universitar: 
                                <input className="input" type="text" placeholder="E.g: 2017-2018" name="yearInput" value={this.state.year} onChange={this.handleChange} required/>
                            </label>
                            <button className="submit"
                            onClick = {(event) => { this.addHistory(event)}}
                            >Adaugă istoric
                            </button>
                        </div>
                </form>
            </div>
        )
    }
}

export default  HistoriesPage
import React from 'react';
import Firebase from "../firebase";

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            year: '',
            credit: '',
            data: '',
            facultyArr: null,
            faculties: '',
            specialities: '',
            specialitiesArr: null,
            teachersArr: null,
            teachers: '',
            facultiesD: '',
            specialitiesD: '',
            specialitiesDArr: null,
            coursesArr: null,
            courses: '',
        };
    }

    componentDidMount() {
        Firebase.getFaculties(response => {
            this.setState({
                facultyArr: response
            })
        })

        Firebase.getTeachers(response => {
            this.setState({
                teachersArr: response
            })
        })

        Firebase.getCourses(response => {
            this.setState({
                coursesArr: response
            })
        })
    }

    handleChange = async (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'nameInput') {
            this.setState({name: value})
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
        } else if(name === 'specialitySelect') {
            this.state.specialitiesArr.forEach((item) => {
                if(item[0] === value) {
                    this.setState({
                        specialities: value,
                    })
                }
            })
        } else if(name === 'courseYear') {
            this.setState({
                year: value,
            })
        } else if(name === 'creditInput') {
            this.setState({
                credit: value,
            })
        } else if(name === 'dataInput') {
            this.setState({
                data: value,
            })
        } else if(name === 'teacherSelect') {
            this.state.teachersArr.forEach((item) => {
                if(item[0] === value) {
                    this.setState({
                        teachers: value,
                    })
                }
            })
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
                    this.setState({
                        specialitiesD: value,
                    })
                }
            })
        } else if(name === 'courseSelect') {
            this.state.coursesArr.forEach((item) => {
                if(item[0] === value) {
                    this.setState({
                        courses: value,
                    })
                }
            })
        }
    }

    createCourse = (event) => {
        event.preventDefault()
        if((this.state.name !== '') && (this.state.year !== '') && (this.state.data !== '') && (this.state.credit !== '') && (this.state.specialities !== '') && (this.state.teachers !== '')) {
            try {
                Firebase.createCourse(this.state.name, this.state.year, this.state.data, this.state.credit, this.state.specialities, this.state.teachers, response => {
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
            } catch(err) {
                console.log(err)
                alert('eroare')
            }
        } else {
            alert("Completati toate campurile")
        }
    }

    deleteCourse = (event) => {
        event.preventDefault()
        if(this.state.courses !== '') {
            try {
                Firebase.deleteCourse(this.state.courses, response => {
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
            <div className="courses">
                <div className="home__header">
                    <div className="home__nav">         
                        <button className="home__button"
                            onClick = {(event) => { this.goToHome()}}
                            >Home
                        </button>
                    </div>
                </div>
                <form className="courses__form form">
                    <div className="column">
                        <label className="label">Numele curs:
                            <input className="input" type="text" placeholder="E.g: Sisteme" name="nameInput" value={this.state.name} onChange={this.handleChange} required/>
                        </label>
                        <label className="label">Anul de studiu:
                            <input className="input" type="number" placeholder="E.g: 4" name="courseYear" value={this.state.year} onChange={this.handleChange} required/>
                        </label>
                        <label className="label">Credite:
                            <input className="input" type="number" placeholder="E.g: 4" name="creditInput" value={this.state.credit} onChange={this.handleChange} required/>
                        </label>
                        <label className="label">Data examen:
                            <input className="input" type="text" placeholder="E.g: 15-07-2021" name="dataInput" value={this.state.data} onChange={this.handleChange} required/>
                        </label>
                        <label className="label">Facultăți disponibile:
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
                        <label className="label">Profesori disponibili:
                            <select className="select" name="teacherSelect" value={this.state.teachers} onChange={this.handleChange}>
                                <option value="" disabled hidden>Selectați</option>
                                {
                                    this.state.teachersArr?.map((item) => {
                                        return(
                                            <option key={item[0]} value={item[0]}>{item[1].last_name} {item[1].first_name} : {item[1].email}</option>
                                        )
                                    })
                                }
                            </select>
                        </label>
                        <button className="submit"
                            onClick = {(event) => { this.createCourse(event)}}
                        >Adaugați curs
                        </button>
                    </div>
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
                        <label className="label">Cursuri disponibile:
                            <select className="select" name="courseSelect" value={this.state.courses} onChange={this.handleChange}>
                                <option value="" disabled hidden>Selectați</option>
                                {
                                    this.state.coursesArr?.map((item) => {
                                        if(item[1][1] === this.state.specialitiesD) {
                                            return(
                                                <option key={item[0]} value={item[0]}>{item[1][0]} | anul: {item[1][2]} | data: {item[1][3]} | credite: {item[1][4]}</option>
                                            )
                                        } else {
                                            return null
                                        }
                                    })
                                }
                            </select>
                        </label>
                        <button className="submit"
                            onClick = {(event) => { this.deleteCourse(event)}}
                        >Șterge cursul selectata
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CoursesPage
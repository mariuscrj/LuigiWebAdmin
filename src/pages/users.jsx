import React from 'react';
import "../css/form.css"
import Firebase from "../firebase";

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            cStatus: '',
            specialty: '',
            domainId: null,
            domainsArr: null,
            facultiesArr: null,
            faculty: '',
            email: '',
            password: '',
            type: '',
            typeS: null,
            name: '',
            fName: '',
            mName: '',
            bDate: '',
            bCountry: '',
            bRegion: '',
            bCity: '',
            sex: '',
            religion: '',
            environment: '',
            minority: '',
            citizenship: '',
            nationality: '',
            cnp: '',
            series: '',
            marital: '',
            military: '',
            category: '',
            graduate: '',
            bacalaureat: '',
            performance: '',
            provenance: '',
            aData: '',
            promotion: '',
            sType: '',
            profile: '',
            group: '',
            fi: '',
            matricol: '',
            pType: '',
            father: '',
            mother: '',
            city: '',
            region: '',
            country: '',
            facultiesD: '',
            specialitiesD: '',
            specialitiesDArr: null,
            facultyArr: null,
            students: '',
            studentsArr: null,
            teachersArr: null,
            teachers: '',
        }; 

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        Firebase.getFaculties(response => {
            this.setState({
                facultiesArr: response
            })
        })

        Firebase.getTeachers(response => {
            this.setState({
                teachersArr: response
            })
        })
    }

    handleChange = async (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            this.setState({email: value})
        }
        else if(name === 'userPassword'){
            this.setState({password: value})
        } else if(name === 'userName') {
            this.setState({name: value})
        } else if(name === 'userFName') {
            this.setState({fName: value})   
        }
        else if(name === 'userType') {
            if(value === "teacher") {
                this.setState({
                    type: value,
                    typeS: true
                })
            } else if(value === "student") {
                this.setState({
                    type: value,
                    typeS: false
                })
            }
        } else if(name === 'userMName') {
            this.setState({
                mName: value,
            })
        } else if(name === 'userBDate') {
            this.setState({
                bDate: value,
            })
        } else if(name === 'userBCountry') {
            this.setState({
                bCountry: value,
            })
        } else if(name === 'userBRegion') {
            this.setState({
                bRegion: value,
            })
        } else if(name === 'userBCity') {
            this.setState({
                bCity: value,
            })
        } else if(name === 'userSex') {
            this.setState({
                sex: value,
            })
        } else if(name === 'userReligion') {
            this.setState({
                religion: value,
            })
        } else if(name === 'userEnvironment') {
            this.setState({
                environment: value,
            })
        } else if(name === 'userMinority') {
            this.setState({
                minority: value,
            })
        } else if(name === 'userCitizenship') {
            this.setState({
                citizenship: value,
            })
        } else if(name === 'userNationality') {
            this.setState({
                nationality: value,
            })
        } else if(name === 'userCnp') {
            this.setState({
                cnp: value,
            })
        } else if(name === 'userSeries') {
            this.setState({
                series: value,
            })
        } else if(name === 'userMarital') {
            this.setState({
                marital: value,
            })
        } else if(name === 'userMilitary') {
            this.setState({
                military: value,
            })
        } else if(name === 'userCategory') {
            this.setState({
                category: value,
            })
        } else if(name === 'userGraduate') {
            this.setState({
                graduate: value,
            })
        } else if(name === 'userBacalaureat') {
            this.setState({
                bacalaureat: value,
            })
        } else if(name === 'userPerformance') {
            this.setState({
                performance: value,
            })
        } else if(name === 'userProvenance') {
            this.setState({
                provenance: value,
            })
        } else if(name === 'userAdata') {
            this.setState({
                aData: value,
            })
        } else if(name === 'userPromotion') {
            this.setState({
                promotion: value,
            })
        } else if(name === 'userSType') {
            this.setState({
                sType: value,
            })
        } else if(name === 'userProfile') {
            this.setState({
                profile: value,
            })
        } else if(name === 'userGroup') {
            this.setState({
                group: value,
            })
        } else if(name === 'userFi') {
            this.setState({
                fi: value,
            })
        } else if(name === 'userMatricol') {
            this.setState({
                matricol: value,
            })
        } else if(name === 'userPType') {
            this.setState({
                pType: value,
            })
        } else if(name === 'userFather') {
            this.setState({
                father: value,
            })
        } else if(name === 'userMother') {
            this.setState({
                mother: value,
            })
        } else if(name === 'userAddress') {
            this.setState({
                address: value,
            })
        } else if(name === 'userCity') {
            this.setState({
                city: value,
            })
        } else if(name === 'userRegion') {
            this.setState({
                region: value,
            })
        } else if(name === 'userCountry') {
            this.setState({
                country: value,
            })
        } else if(name === 'faculty') {
            this.state.facultiesArr.forEach((item) => {
                if(item[0] === value) {
                    const fArray = Object.keys(item[1].domains).map((key) => [key, item[1].domains[key]]);
                    this.setState({
                        domainsArr: fArray,
                        faculty: item[1].name
                    })
                }
            })
        } else if(name === 'specialty') {
            this.state.domainsArr.forEach((item) => {
                if(item[0] === value) {
                    this.setState({
                        domainId: item[0],
                        specialty: item[1]
                    })
                }
            })
        } else if(name === 'userCStatus') {
            this.setState({
                cStatus: value,
            })
        } else if(name === 'facultyDSelect') {
            this.state.facultiesArr.forEach((item) => {
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
        } else if(name === 'teacherSelect') {
            this.state.teachersArr.forEach((item) => {
                if(item[0] === value) {
                    this.setState({
                        teachers: value,
                    })
                }
            })
        }
    }

    chooseFieldsHandler () {
        if (this.state.typeS === true ) {
            return(
                <div>
                    <label className="label">Nume:
                        <input className="input" type="text" placeholder="E.g: Popescu" name="userName" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label className="label">Prenume:
                        <input className="input" type="text" placeholder="E.g: Andrei" name="userFName" value={this.state.fName} onChange={this.handleChange} />
                    </label>
                </div> 
            );
        } else if(this.state.typeS === false) {
            return(
                <div>
                    <label className="label">Nume:
                        <input className="input" type="text" placeholder="E.g: Popescu" name="userName" value={this.state.name} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Prenume:
                        <input className="input" type="text" placeholder="E.g: Andrei" name="userFName" value={this.state.fName} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Nume după căsătorie:
                        <input className="input" type="text" placeholder="E.g: Nume" name="userMName" value={this.state.mName} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Data de naștere:
                        <input className="input" type="text" placeholder="E.g: 15-07-1998" name="userBDate" value={this.state.bDate} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Țară de nastere:
                        <input className="input" type="text" placeholder="E.g: România" name="userBCountry" value={this.state.bCountry} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Județ de naștere:
                        <input className="input" type="text" placeholder="E.g: Sibiu" name="userBRegion" value={this.state.bRegion} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Localitate de naștere:
                        <input className="input" type="text" placeholder="E.g: Sibiu" name="userBCity" value={this.state.bCity} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Sex:
                        <input className="input" type="text" placeholder="E.g: Bărbat/Femeie" name="userSex" value={this.state.sex} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Religie:
                        <input className="input" type="text" placeholder="E.g: Ortodox" name="userReligion" value={this.state.religion} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Mediu:
                        <input className="input" type="text" placeholder="E.g: Urban/Rural" name="userEnvironment" value={this.state.environment} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Minoritar:
                        <input className="input" type="text" placeholder="E.g: Nu" name="userMinority" value={this.state.minority} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Cetățenie:
                        <input className="input" type="text" placeholder="E.g: română" name="userCitizenship" value={this.state.citizenship} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Naționalitate:
                        <input className="input" type="text" placeholder="E.g: română" name="userNationality" value={this.state.nationality} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">CNP:
                        <input className="input" type="number" placeholder="E.g: XXXXXXX" name="userCnp" value={this.state.cnp} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Serie BI/CI:
                        <input className="input" type="text" placeholder="E.g: XX 1111" name="userSeries" value={this.state.series} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Stare civilă:
                        <input className="input" type="text" placeholder="E.g: căsătorit" name="userMarital" value={this.state.marital} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Situație militară:
                        <input className="input" type="text" placeholder="E.g: incorporabil" name="userMilitary" value={this.state.military} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Categorii studii:
                        <input className="input" type="text" placeholder="E.g: licenta" name="userCategory" value={this.state.category} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">An absolvire liceu:
                        <input className="input" type="text" placeholder="E.g: 2017" name="userGraduate" value={this.state.graduate} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Medie bacalaureat:
                        <input className="input" type="text" placeholder="E.g: 9,5" name="userBacalaureat" value={this.state.bacalaureat} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Olimpic:
                        <input className="input" type="text" placeholder="E.g: nu" name="userPerformance" value={this.state.performance} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Provenienta:
                        <input className="input" type="text" placeholder="E.g: admitere" name="userProvenance" value={this.state.provenance} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Sesiune admitere:
                        <input className="input" type="text" placeholder="E.g: iulie 2017" name="userAdata" value={this.state.aData} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Promotie:
                        <input className="input" type="text" placeholder="E.g: 2017-2021" name="userPromotion" value={this.state.promotion} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Tip studii:
                        <input className="input" type="text" placeholder="E.g: ZI" name="userSType" value={this.state.sType} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Facultate:
                        <select className="select" name="faculty" value={this.state.faculty} onChange={this.handleChange}>
                            <option value="" disabled hidden>Selectați</option>
                            {
                                this.state.facultiesArr.map((item) => {
                                    return(
                                        <option key={item[0]} value={item[0]}>{item[1].name}</option>
                                    )
                                })
                            }
                        </select>
                    </label>
                    <label className="label">Profil:
                        <input className="input" type="text" placeholder="E.g: CTI" name="userProfile" value={this.state.profile} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Specializare:
                        <select className="select" name="specialty" value={this.state.speciality} onChange={this.handleChange} required>
                                <option value="" disabled hidden>Selectați o facultate mai intai</option>
                                {
                                    this.state.domainsArr?.map((item) => {
                                        return(
                                            <option key={item[0]} value={item[0]}>{item[1]}</option>
                                        )
                                    })
                                }
                        </select>
                    </label>
                    <label className="label">Grupa:
                        <input className="input" type="text" placeholder="E.g: 244" name="userGroup" value={this.state.group} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">FI:
                        <input className="input" type="text" placeholder="E.g: ZI" name="userFi" value={this.state.fi} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Nr matricol:
                        <input className="input" type="text" placeholder="E.g: 169" name="userMatricol" value={this.state.matricol} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Tip loc:
                        <input className="input" type="text" placeholder="E.g: roman bugetat" name="userPType" value={this.state.pType} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Status Curent:
                        <input className="input" type="text" placeholder="E.g: inmatriculat" name="userCStatus" value={this.state.cStatus} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Nume tata:
                        <input className="input" type="text" placeholder="E.g: Alex" name="userFather" value={this.state.father} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Nume mama:
                        <input className="input" type="text" placeholder="E.g: Alina" name="userMother" value={this.state.mother} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Adresa:
                        <input className="input" type="text" placeholder="E.g: str Florilor" name="userAddress" value={this.state.address} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Localitate:
                        <input className="input" type="text" placeholder="E.g: Sibiu" name="userCity" value={this.state.city} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Judet
                        <input className="input" type="text" placeholder="E.g: 15-07-1998" name="userRegion" value={this.state.region} onChange={this.handleChange} required/>
                    </label>
                    <label className="label">Tara:
                        <input className="input" type="text" placeholder="E.g: 15-07-1998" name="userCountry" value={this.state.country} onChange={this.handleChange} required/>
                    </label>
                </div>
            );
        } else {
            return(<div></div>);
        }
    }

    CreateUser = async (event, email, password,  fName, name) => {
        event.preventDefault()
        const checkEmail = email.includes("@ulbsibiu.ro")
        if(this.state.typeS === false) {
            if((checkEmail ===true) 
            && (password.length > 5) 
            && (fName !== '') 
            && (name !== '')
            && (password.length > 5) 
            && (fName !== '') 
            && (name !== '')
            && (this.state.address !== '')
            && (this.state.cStatus !== '')
            && (this.state.specialty !== '')
            && (this.state.faculty !== '')
            && (this.state.password !== '')
            && (this.state.type !== '')
            && (this.state.mName !=='')
            && (this.state.bDate !== '')
            && (this.state.bCountry !== '')
            && (this.state.bRegion !== '')
            && (this.state.bCity !== '')
            && (this.state.sex !== '')
            && (this.state.religion !== '')
            && (this.state.environment !== '')
            && (this.state.minority !== '')
            && (this.state.citizenship !== '')
            && (this.state.nationality !== '')
            && (this.state.cnp !== '')
            && (this.state.series !== '')
            && (this.state.marital !== '')
            && (this.state.military !== '')
            && (this.state.category !== '')
            && (this.state.graduate !== '')
            && (this.state.bacalaureat !== '')
            && (this.state.performance !== '')
            && (this.state.provenance !== '')
            && (this.state.aData !== '')
            && (this.state.promotion !== '')
            && (this.state.sType !== '')
            && (this.state.profile !== '')
            && (this.state.group !== '')
            && (this.state.fi !== '')
            && (this.state.matricol !== '')
            && (this.state.pType !== '')
            && (this.state.father !== '')
            && (this.state.mother !== '')
            && (this.state.city !== '')
            && (this.state.region !== '')
            && (this.state.country !== '')
            ) {
                try {
                    Firebase.createNewStudent(this.state,
                        response => {
                        if(response === true) {
                            alert("Succes")
                            const inputs = document.getElementsByClassName("input")
                            Array.from(inputs).forEach((item) => {
                                item.value = ''
                            })
                        } else if (response === false) {
                            alert("Eroare")
                        }
                    })
                } catch(err) {
                    console.log(err)
                    alert("something went wrong");
                }
            } else { 
                alert("Verificați mailul de ulbs/parola min 6 caractere/toate campurile trebuie completate")
            }
        } else if(this.state.typeS === true) {
            if((checkEmail ===true) 
                && (password.length > 5) 
                && (fName !== '') 
                && (name !== '')
                && (password.length > 5) 
                && (fName !== '') 
                && (name !== '')
                ) 
            {
                    Firebase.createNewTeacher(email, password, name, fName, response => {
                        if(response === true) {
                            alert("Succes")
                            const inputs = document.getElementsByClassName("input")
                            Array.from(inputs).forEach((item) => {
                                item.value = ''
                            })
                        } else if (response === false) {
                            alert("Eroare")
                        }
                    })
            } else { 
                alert("Verificați mailul de ulbs/parola min 6 caractere/toate campurile trebuie completate")
            }
        }
    }

    goToHome () {
        const history = this.props
        history.history.push('/')
    }

    render() {
        return(
            <div className="users paddingBot">
                <div className="users__container">
                <div className="home__header">
                        <div className="home__nav">         
                            <button className="home__button"
                                onClick = {(event) => { this.goToHome()}}
                                >Home
                            </button>
                        </div>
                    </div>
                    <form className="users__form form">
                        <div className="column">
                            <label className="label">Facultăți disponibile:
                                <select className="select" name="facultyDSelect" value={this.state.facultiesD} onChange={this.handleChange}>
                                    <option value="" disabled hidden>Selectați</option>
                                    {
                                        this.state.facultiesArr?.map((item) => {
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
                        </div>
                        <div className="column">
                            <label className="label">Email:
                                <input className="input" type="text" placeholder="E.g: nume@ulbsibiu.ro" name="userEmail" value={this.state.email} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Password:
                                <input className="input" type="text" name="userPassword" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                            </label>
                            <label className="label">Tipul de cont:
                                <select className="select" name="userType" value={this.state.type} onChange={this.handleChange}>
                                    <option value="" disabled hidden>Selectați</option>
                                    <option value="teacher">Profesor</option>
                                    <option value="student">Student</option>
                                </select>
                            </label>
                            {
                                this.chooseFieldsHandler()
                            }
                            <button className="submit"
                                onClick = {(event) => { this.CreateUser(event, this.state.email, this.state.password, this.state.fName, this.state.name)}}
                            >Crează user
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UsersPage
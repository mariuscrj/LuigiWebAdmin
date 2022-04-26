import firebase from "firebase/app";
import firebaseConfig from "./config/firebase"
import "firebase/database";
import "firebase/auth";

class Firebase {
    client = null
    client2 = null
    con = null

    constructor() {
        if (!firebase.apps.length) {
            this.client = firebase.initializeApp(firebaseConfig)
        } else {
            this.client = firebase.app()
        }
    }

    parserFaculties = (faculties) => {
        const fArray = Object.keys(faculties).map((key) => [key, faculties[key]]);
        return fArray
    }

    parserTeacher = (teachers) => {
        const fArray = Object.keys(teachers).map((key) => [key, teachers[key]]);
        return fArray
    }

    parserCourses = (courses) => {
        const fArray = Object.keys(courses).map((key) => [key, [
            courses[key].name, 
            courses[key].domain_id,
            courses[key].year,
            courses[key].exam_date,
            courses[key].credits
        ]
        ]);
        return fArray
    }

    parserStudentsByCourse = (students) => {
        const fArray = Object.keys(students).map((key) => [key, students[key]]);
        return fArray
    }

    checkAdmin = (userId, callback) => {
        const ref = this.client.database().ref('admins');
        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {
                if(snapshot.hasChild(userId)) {
                    callback(true)
                } else {
                    callback(false)
                }
            }

            callback(null)
        })
    }

    createNewTeacher = (email, password, name, fname, callback) => {
        const client = firebase.initializeApp(firebaseConfig, email);
        const cAuth = client.auth()
        cAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const ref = client.database().ref('teachers');
            ref.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    ref.child(userCredential.user.uid).set({
                        email: email,
                        first_name: fname,
                        last_name: name,
                        profile_picture: '-'
                    })
                    
                    callback(true)
                }
            })
        })
        .catch((error) => {
            console.log(error)
            callback(false)
        });

        callback(null)
    }

    createNewStudent = (obj, callback) => {
        const client = firebase.initializeApp(firebaseConfig, obj.email);
        const cAuth = client.auth()
        try {
            cAuth.createUserWithEmailAndPassword(obj.email, obj.password)
            .then((userCredential) => {
                const ref = client.database().ref('students');
                ref.once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        ref.child(userCredential.user.uid).set({
                            email: obj.email,
                            first_name: obj.fName,
                            last_name: obj.name,
                            address: obj.address,
                            bacalaureat: obj.bacalaureat,
                            birth_city: obj.bCity,
                            birth_country: obj.bCountry,
                            birth_date: obj.bDate,
                            birth_region: obj.bRegion,
                            citizenship: obj.citizenship,
                            city: obj.city,
                            cnp: obj.cnp,
                            country: obj.country,
                            current_status: obj.cStatus,
                            data_admittance: obj.aData,
                            environment: obj.environment,
                            father_name: obj.father,
                            fi: obj.fi,
                            graduate_year: obj.graduate,
                            group: obj.group,
                            marital_status: obj.marital,
                            marriage_name: obj.mName,
                            matricol_nr: obj.matricol,
                            military_status: obj.military,
                            minority: obj.minority,
                            mother_name: obj.mother,
                            nationality: obj.nationality,
                            performance: obj.performance,
                            profile_image: '-',
                            promotion: obj.promotion,
                            provenance: obj.provenance,
                            region: obj.region,
                            religion: obj.religion,
                            series: obj.series,
                            sex: obj.sex,
                            study_category: obj.category,
                            study_type: obj.sType,
                            type: obj.pType,
                            faculty: obj.faculty,
                            domain: obj.profile,
                            domain_id: obj.domainId,
                            speciality: obj.specialty
                        })
                        
                        callback(true)
                    }
                })
            })
            .catch((error) => {
                console.log(error)
                callback(false)
            });
        }
        catch(err) {
            console.log(err)
            callback(false)
        }

        callback(null)
    }

    getFaculties = (callback) => {
        const ref = this.client.database().ref('faculties');
        ref.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const faculties = this.parserFaculties(snapshot.val())
                callback(faculties)
            }
        })
    }

    getTeachers = (callback) => {
        const ref = this.client.database().ref('teachers');
        ref.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const teachers = this.parserTeacher(snapshot.val())
                callback(teachers)
            }
        })
    }

    getCourses = (callback) => {
        const ref = this.client.database().ref('courses');
        ref.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const courses = this.parserCourses(snapshot.val())
                callback(courses)
            }
        })
    }

    getStudentsByDomain = (id, callback) => {
        const ref = this.client.database().ref('students');
        ref.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const students = this.parserStudentsByCourse(snapshot.val(), id)
                callback(students)
            }
        })
    }

    createFaculty = (name, year, callback) => {
        const ref = this.client.database().ref('faculties');
        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {
                ref.push({
                    name: name,
                    year: year
                })
                
                callback(true)
            }
        })
    }

    deleteFaculty = (id, callback) => {
        const ref = this.client.database().ref('faculties');
        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {    
                if(snapshot.hasChild(id)) {
                    ref.child(id).remove();
                }
                callback(true)
            }
        })
    }

    createSpeciality = (id, name, callback) => {
        const ref = this.client.database().ref('faculties');

        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {
                if(snapshot.hasChild(id)) {
                    if(snapshot.child(id).hasChild('domains')) {
                        ref.child(id).ref.child('domains').push(name)
                    } else {
                        ref.child(id).update({
                            domains: {
                                test: 'init'
                            }
                        })

                        ref.child(id).child('domains').push(name)
                        ref.child(id).child('domains').child('test').remove()
                    }
                } else {
                    callback(false)
                }
                
                callback(true)
            }
        })
    }

    deleteSpeciality = (idF, idS, callback) => {
        const ref = this.client.database().ref('faculties');
        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {    
                if(ref.child(idF).child('domains').child(idS)) {
                    ref.child(idF).child('domains').child(idS).remove()
                }
                callback(true)
            }
        })
    }

    createNewYear = (callback) => {
        const ref = this.client.database().ref('students');
        const refToF = this.client.database().ref('faculties');
        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {    
                snapshot.forEach(function(child) {
                    if(child.hasChild('history')) {
                        try {
                            ref.child(child.key).ref.child('history').limitToLast(1).once('child_added', function(snapshot2) {
                                refToF.once('value', (snapshot3) => {
                                    snapshot3.forEach(function(item){
                                        let domainId = child.child('domain_id').val() //id domeniu
                                        if(item.child('domains').child(domainId).val()) {
                                            if(snapshot2.key < item.val().year) {
                                                const yearToAdd = parseInt(snapshot2.key) + 1
                                                child.child('history').child(`${yearToAdd}`).ref.set(
                                                    {
                                                        arithmetic_1: '-',
                                                        arithmetic_2: '-',
                                                        average_1: '-',
                                                        average_2: '-',
                                                        credits_1: '-',
                                                        credits_2: '-',
                                                        nr_credits_1: '-',
                                                        nr_credits_2: '-',
                                                        study_year: '-',
                                                        year: yearToAdd,
                                                        year_arithmetic: '-',
                                                        year_average: '-',
                                                        year_credits: '-',
                                                        year_nr_credits: '-',
                                                    }
                                                )

                                                callback(true)
                                            }
                                        }
                                    })
                                })
                            })
                        } catch(err) {
                            callback(false)
                        }
                    } else {
                        try {
                            ref.child(child.key).update({
                                history: {
                                    1: {
                                        arithmetic_1: '-',
                                        arithmetic_2: '-',
                                        average_1: '-',
                                        average_2: '-',
                                        credits_1: '-',
                                        credits_2: '-',
                                        nr_credits_1: '-',
                                        nr_credits_2: '-',
                                        study_year: '-',
                                        year: '-',
                                        year_arithmetic: '-',
                                        year_average: '-',
                                        year_credits: '-',
                                        year_nr_credits: '-',
                                    }
                                }
                            })
                            callback(true)
                        } catch(errr) {
                            callback(false)
                        }
                    }
                })
            }
        })
    } 

    createCourse = (name, year, data, credit, domain, teacher, callback) => {
        const ref = this.client.database().ref('courses');
        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {
                const pushKey = ref.push().getKey();
                try {
                    ref.child(pushKey).update({
                        name: name,
                        year: year,
                        exam_date: data,
                        credits: credit,
                        domain_id: domain,
                        teacher_id: teacher,
                        course_id: pushKey,
                    });
                    callback(true)
                } catch(err) {
                    console.log(err)
                    callback(false)
                }
            
            }
        })
    }

    deleteCourse = (id, callback) => {
        const ref = this.client.database().ref('courses');
        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {    
                try {
                    if(ref.child(id)) {
                        ref.child(id).remove()
                    }
                    callback(true)
                } catch(err) {
                    console.log(err)
                    callback(false)
                }
            }
        })
    }

    addHistory = (obj, callback) => {
        const ref = this.client.database().ref(`students/${ obj.students }`);
        ref.once('value', (snapshot) => {
            if (snapshot.exists()) {
                try {
                    if(obj.arithmetic1 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            arithmetic_1: obj.arithmetic1
                        })
                    }

                    if(obj.arithmetic2 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            arithmetic_2: obj.arithmetic2
                        })
                    }

                    if(obj.arithmetic3 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            year_arithmetic: obj.arithmetic3
                        })
                    }

                    if(obj.average1 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            average_1: obj.average1
                        })
                    }

                    if(obj.average2 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            average_2: obj.average2
                        })
                    }

                    if(obj.average3 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            year_average: obj.average3
                        })
                    }

                    if(obj.credit1 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            credits_1: obj.credit1
                        })
                    }

                    if(obj.credit2 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            credits_2: obj.credit2
                        })
                    }

                    if(obj.credit3 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            year_credits: obj.credit3
                        })
                    }

                    if(obj.nrpunct1 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            nr_credits_1: obj.nrpunct1
                        })
                    }

                    
                    if(obj.nrpunct2 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            nr_credits_2: obj.nrpunct2
                        })
                    }

                    
                    if(obj.nrpunct3 !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            year_nr_credits: obj.nrpunct3
                        })
                    }
                    
                    if(obj.year !== '') {
                        snapshot.child('history').child(obj.historyVal).ref.update({
                            study_year: obj.year
                        })
                    }

                    callback(true)
                } catch(err) {
                    console.log(err)
                    callback(false)
                }
            
            }
        })
    }
}

const Client = new Firebase()
export const auth = firebase.auth();
export default Client
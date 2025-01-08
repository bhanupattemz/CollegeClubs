import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAcademicBooks } from "../../Actions/libraryAction"
export default function LibraryAcademicForm({ setCurrentSubject }) {
    const dispatch = useDispatch()
    let [formData, setFormData] = useState({})
    const formSubmitHandler = (e) => {
        e.preventDefault();
        setCurrentSubject("all")
        dispatch(getAcademicBooks(formData))
    }
    return (
        <Fragment>
            {formData &&
                <div className="resource-page-academic-form">
                    <form onSubmit={formSubmitHandler}>
                        <div>
                            <select name="degree" id="degree" onChange={e => setFormData(prev => ({ ...prev, degree: e.target.value == "Remove" ? undefined : e.target.value }))}>
                                <option >{formData.degree ? "Remove" : "Select Degree"}</option>
                                <option value="btech">B-tech</option>
                            </select>
                        </div>

                        <div>
                            <select name="branch" id="branch" onChange={e => setFormData(prev => ({ ...prev, branch: e.target.value == "Remove" ? undefined : e.target.value }))}>
                                <option>{formData.branch ? "Remove" : "Select Branch"}</option>
                                <option value="cse">CSE</option>
                                <option value="ece">ECE</option>
                                <option value="eee">EEE</option>
                                <option value="civil">Civil</option>
                                <option value="mech">Mech</option>
                                <option value="chem">Chem</option>
                            </select>
                        </div>
                        <div>

                            <select name="year" id="year" onChange={e => setFormData(prev => ({ ...prev, year: e.target.value == "Remove" ? undefined : e.target.value }))}>
                                <option>{formData.year ? "Remove" : "Select Year"}</option>
                                <option value="1">1<sup>st</sup> Year</option>
                                <option value="2">2<sup>nd</sup> Year</option>
                                <option value="3">3<sup>rd</sup> Year</option>
                                <option value="4">4<sup>th</sup> Year</option>

                            </select>
                        </div>
                        <div>
                            <select name="sem" id="sem" onChange={e => setFormData(prev => ({ ...prev, sem: e.target.value == "Remove" ? undefined : e.target.value }))}>
                                <option>{formData.sem ? "Remove" : "Select Semister"}</option>
                                <option value="1">1<sup>st</sup> Sem</option>
                                <option value="2">2<sup>nd</sup> Sem</option>
                            </select>
                        </div>
                        <div>

                            <select name="type" id="type" onChange={e => setFormData(prev => ({ ...prev, type: e.target.value == "Remove" ? undefined : e.target.value }))}>
                                <option>{formData.type ? "Remove" : "Select Type"}</option>
                                <option value="books">Books PDFs</option>
                                <option value="papers">Question Papers</option>
                            </select>
                        </div>
                        <div>
                            <button >Submit</button>
                        </div>
                    </form>
                </div>}
        </Fragment>
    )
}
/* eslint-disable no-lone-blocks */
import React from 'react'
import './Admission.css'
import { Container } from 'react-bootstrap'
import { FaWallet } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { LuShieldPlus } from "react-icons/lu";


const Admission = () => {
    return (
        <div className="admission">
            <Container className="py-5 text-start">
                <h1 className="fw-bold">Admission In Three Steps</h1>
                <span className="text-light">
                    Get the optimal physiotherapy treatment tailored to your
                    <br />
                    specific needs while minimizing out-of-pocket expenses
                </span>

                <div className="row mt-5 text-white">

                    <div className="col-12 col-md-4 mb-4">
                        <div className="admission-block p-4 h-100">
                            <FaWallet className="admission-icon mb-4 d-flex justify-content-center align-items-center p-4" />
                            <h3>Discuss payment <br /> Options</h3>
                            <p>Reclaim your health. Overcome pain and limitations. Embrace a life without boundaries.</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mb-4">
                        <div className="admission-block p-4 h-100">
                            <MdPersonalInjury className="admission-icon mb-4 d-flex justify-content-center align-items-center p-4" />
                            <h3>Personal <br /> Consultation</h3>
                            <p>Personalized consultations with our rehab experts for your unique addiction.</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mb-4">
                        <div className="admission-block p-4 h-100">
                            <LuShieldPlus className="admission-icon mb-4 d-flex justify-content-center align-items-center p-4" />
                            <h3>Choose your <br /> Rehab program</h3>
                            <p>Our admission team guides you through program differences for informed decisions.</p>
                        </div>
                    </div>

                </div>
            </Container>
        </div>

    )
}

export default Admission
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"
import { GiCarWheel } from 'react-icons/gi';

export function Login() {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/pokelist")
    }
    return (

        <div className="containe-fluid login row">
            <div className="container left col-4 d-flex justify-content-center  align-items-center">
                <div className="container">
                <GiCarWheel className="extra-size"/>
                    <label className="label-login bold clean-my-car margin-form">
                        CleanMyCar
                    </label>
                    <label className="label-login bold label-inputs"> India's first waterless car cleaning company</label>
                </div>
            </div>
            <div className="container right col-8">
                <label className="need-help bold"> Need help?</label>
                <label className="margin-login bold bold-login"> Log in</label>
                <label className="label-login allign-left bold label-inputs">
                    Email
                </label>
                <input type="text" className="form-control margin-form" placeholder="Joe@email.com" required>
                </input>
                <label className="label-login allign-left bold label-inputs">
                    Password
                </label>
                <input type="password" className="form-control margin-password" placeholder="Enter your Password" required>

                </input>
                <label className="label-login allign-right bold">
                    forgot password?
                </label>
                <button type="submit" className="btnn margin-button bold" onClick={() => handleClick()}>Login</button>
            </div>
        </div>)
}
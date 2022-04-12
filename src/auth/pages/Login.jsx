import React, {useState} from 'react';

import './Login.css'

function Login (props){

    const [loginInput, setloginInput] = useState(
        {email: "", password: "", remember: true}
    );

    // handle user typing
    function handleChange(event) {
        const { name, value } = event.target;
    
        setloginInput(prevValue => {
          return {
            ...prevValue,
            [name]: value
          };
        });

        console.log(loginInput)
      }

    return(
        <form className='loginForm'>
            <h1>Sign in</h1>
            <p>Sign in to MyFoodPrint to see the footprint of your past purchases</p>


            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
                <input type="email" id="form2Example1" className="form-control" name="email" value={loginInput.email} onChange={handleChange}/>
                <label className="form-label" htmlFor="form2Example1">Email address</label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control" name="password" value={loginInput.password} onChange={handleChange}/>
                <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>

            {/* <!-- 2 column grid layout for inline styling --> */}
            {/* <div className="row mb-4">
                <div className="col d-flex justify-content-center"> */}
                {/* <!-- Checkbox --> */}
                {/* <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                    <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                </div>
                </div> */}

                {/* <div className="col"> */}
                {/* <!-- Simple link --> */}
                {/* <a href="#!">Forgot password?</a>
                </div>
            </div> */}

            {/* <!-- Submit button --> */}
            <button type="button" className="btn btn-primary btn-block mb-4 mx-auto">Sign in</button>

        </form>
    )
}

export default Login;
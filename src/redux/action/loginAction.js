import axios from "axios"


export const onLogin = (form, navigate) =>  (dispatch) => {
    dispatch ({
        type: "IS_LOAD",
        isLoading : true,
    })

    let apiUrl = `https://api-car-rental.binaracademy.org/admin/auth/login`

    axios.post(apiUrl, form)
    .then(res => {
        localStorage.setItem("admin_token", res.data.access_token)
        localStorage.setItem("role", res.data.role)
        const role = localStorage.getItem("role")
        if (role === "admin" || role === "Admin") {
          navigate('/list-cars')
        }
        dispatch ({
            type: "IS_LOGGED_IN",
            payload: res.data.access_token,
            isLoading : false,
        })
    }).catch(err => {
        console.log(err.message)
        dispatch ({
            type: "IS_FAILED",
            payload: err.message,
            isLoading : false,
        })
    })
}
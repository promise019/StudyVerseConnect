export function NameError(name) {
    const Error = []

    if (name.length < 1) {
        Error.push('username required')
    }

    return Error
}

export function EmailError(email) {
    const Error = []

    if (email.length < 1) {
     Error.push('email required')   
    } else if (!/@(gmail\.com|yahoomail\.com)$/.test(email)) {
        Error.push('@gmail.com or @yahoomail.com')
    }

    return Error
}

export function PasswordError(password) {
    const Error = []

    if (password.length < 6) {
        Error.push('password must be above 5 digits')
    } else if (!password.match(/[0-9]/)) {
        Error.push('password must include atleast 1 number')
    } else if (!password.match(/[a-z]/)) {
        Error.push('password must include lowerCase')
    } else if (!password.match(/[A-Z]/)) {
        Error.push('password must include upperCase')
    }

    return Error
}
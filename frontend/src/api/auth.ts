const fetchFromAPI = async (request: Request) => {
    const response = await fetch(request);
    if (response.status === 500) {
        throw new Error('Internal server error');
    }

    const data = await response.json();

    if (response.status > 400 && response.status < 500) {
        if (data.detail) {
            throw data.detail;
        }
        throw data;
    }
    return data;
}

export const login = async (email: string, password: string) => {

    if (!(email.length > 0) || !(password.length > 0)) {
        throw new Error('Email or password was not provided');
    }
    const formData = new FormData();

    // OAuth2 expects form data
    formData.append('username', email);
    formData.append('password', password);

    const request = new Request('/api/token', {
        method: 'POST',
        body: formData,
    });

    return fetchFromAPI(request);
};

export const confirm_otp_token = async (access_token: string | null, otp_token: string) => {

    if (!(access_token && access_token.length > 0) && !(otp_token.length > 0)) {
        throw new Error('Access token or otp token was not provided');
    }

    const request = new Request('/api/token/confirm', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + access_token},
        body: JSON.stringify({otp_token})
    });

    return fetchFromAPI(request);
}
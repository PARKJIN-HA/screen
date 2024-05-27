export const AuthProvider = {
        isAuthenticated: false,
        user: null,
        async signIn(idToken) {
            let options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(idToken),
            };
            fetch('http://localhost:9000/api/login', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    AuthProvider.user = response.json().userName;
                    AuthProvider.isAuthenticated = true;
                    return response.json();
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
            // window.location.href = "https://accounts.google.com/o/oauth2/auth?client_id=711179595342-nkfve6rbulc846pmhdqteint0fch7jt5.apps.googleusercontent.com&redirect_uri=http://localhost:8080/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
        },
        async getUserInfo() {
            try {
                fetch('http://localhost:9000/api/auth/user/info', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('There has been a problem with your fetch operation:', error);
                    });
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                return false;
            }
        },
        async signOut(idToken) {
            AuthProvider.isAuthenticated = false;
        },
    }
;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
         setMessage('');
        try {
            const result = await login({ variables: { email, password } });
             if (result.data.login.token) {
                localStorage.setItem('authToken', result.data.login.token);               
                setMessage(`Login successful! Welcome back ${result.data.login.user.username}. You might need to refresh or navigate to see changes.`);               
             }
        } catch (err) {
             console.error("Login error:", err);
             setMessage(err.message || 'Failed to log in.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
             {message && <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </Button>
            </Form>
        </div>
    );
}

export default Login;
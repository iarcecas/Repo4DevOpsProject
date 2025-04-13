import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../graphql/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('resident');
    const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const result = await signup({ variables: { username, email, password, role } });
             if (result.data.signup.token) {
               localStorage.setItem('authToken', result.data.signup.token);
               setMessage(`Signup successful! Welcome ${result.data.signup.user.username}. You might need to refresh or navigate to see changes.`);            
             }
        } catch (err) {
             console.error("Signup error:", err);
             setMessage(err.message || 'Failed to sign up.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
             {message && <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                 <Form.Group className="mb-3">
                     <Form.Label>Role</Form.Label>
                     <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                         <option value="resident">Resident</option>
                         <option value="business_owner">Business Owner</option>
                         <option value="community_organizer">Community Organizer</option>
                     </Form.Select>
                 </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </Form>
        </div>
    );
}

export default Signup;
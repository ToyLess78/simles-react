import React from 'react';
import SignUpForm from './components/SignUpForm/SignUpForm';

const App: React.FC = () => (
    <div className="main">
        <h1>Sign Up</h1>
        <SignUpForm isFullName/>
    </div>
);

export default App;

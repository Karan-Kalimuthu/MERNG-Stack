import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../util/hooks';

function Register(props) {
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    });

    function registerUser() {
        addUser()
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Register</h1>
                <Form.Input label="username" type="text" placeholder="Username" name="username" value={values.username} error={errors.username ? true : false} onChange={onChange} />
                <Form.Input label="Email" type="email" placeholder="Email" name="email" value={values.email} error={errors.email ? true : false} onChange={onChange} />
                <Form.Input label="Password" type="password" placeholder="Password" name="password" value={values.password} error={errors.password ? true : false} onChange={onChange} />
                <Form.Input label="Confirm Password" type="password" placeholder="Confirm Password" name="confirmPassword" value={values.confirmPassword} error={errors.confirmPassword ? true : false} onChange={onChange} />
                <Button type="submit" primary>Register</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            < li key={value} > { value}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div >
    )
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username,
        email: $email,
        password: $password,
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Register;

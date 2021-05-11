import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { 
	Input, 
	Button, 
	ErrorBlock, 
	IErrorBlockProps,
	Logo
} from 'components';

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Form = styled.form`
	width: 520px;
	height: auto;
	left: calc(50% - 520px / 2);
	top: 222px;
	background: #ffffff;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	padding: 40px 30px;
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 400;
	line-height: 30px;
	margin: 0px 0px 20px 0px;
`;

const initValidateErrors: TValidateErrors = {
	login: false,
	sublogin: false,
	password: false
};

const initialFormData: ILogin = {
	login: 'karinalol854@gmail.com',
	sublogin: '',
	password: 'jo2Fadaqu'
};

const Login = ({ onLogin, loading, loginError }: IProps) => {
	const [formData, setFormData] = useState(initialFormData);
	const [validateErrors, setValidateErrors] = useState(initValidateErrors);
	const isValidForm = useCallback(() => Boolean(!validateErrors.login && !validateErrors.password), [validateErrors]);

	const formDataReducer = (field: keyof ILogin) => (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
		const value = event?.target.value || '';

		if(value && field === 'password' && /[а-яА-ЯЁё]/.test(value)) {
			return;
		}

		setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
		setValidateErrors((prevValidateErrors) => ({ ...prevValidateErrors, [field]: false }));
	};

	const validate = () => {
		let newValidateErrors: Partial<TValidateErrors> | null = null;

		if (!formData.login) {
			newValidateErrors = { login: true };
		}

		if (!formData.password) {
			newValidateErrors = { ...newValidateErrors, password: true };
		}

		return newValidateErrors;
	};

	const onSubmitForm = (event: React.FormEvent<HTMLFormElement> | undefined) => {
		event?.preventDefault();

		if (!loading) {
			const newValidateErrors = validate();

			if (!newValidateErrors) {
				onLogin(formData);
			} else {
				setValidateErrors((prevValidateErrors) => ({ ...prevValidateErrors, ...newValidateErrors }));
			}
		}
	};

	return (
		<Wrapper>
			<Logo mb />
			<Form onSubmit={onSubmitForm} action="/">
				<Title>API-консолька</Title>

				<ErrorBlock error={loginError} errorTitle='Вход не вышел' />

				<Input
					value={formData.login}
					onChange={formDataReducer('login')}
					placeholder="Логин"
					id={EInputLabelId.LoginId}
					isInvalid={validateErrors.login}
					labelText='Логин'
				/>
				<Input
					value={formData.sublogin}
					onChange={formDataReducer('sublogin')}
					placeholder="Сублогин"
					id={EInputLabelId.SubloginId}
					isInvalid={validateErrors.sublogin}
					labelText='Сублогин'
					isOptional
				/>
				<Input
					value={formData.password}
					onChange={formDataReducer('password')}
					placeholder="Пароль"
					id={EInputLabelId.PasswordId}
					isInvalid={validateErrors.password}
					labelText='Пароль'
					type='password'
				/>
				<Button
					type="submit"
					disabled={!isValidForm()}
					isLoading={loading}
				>
					Войти
				</Button>
			</Form>
		</Wrapper>
	);
};

export default React.memo(Login);

export interface IProps {
	loading: boolean;
	loginError: IErrorBlockProps['error'];
	onLogin: (data: ILogin) => void;
}

interface ILogin {
	login: string;
	sublogin?: string;
	password: string;
}

type TValidateErrors = Record<keyof ILogin, boolean>;

enum EInputLabelId {
	LoginId = 'loginInput',
	SubloginId = 'subloginInput',
	PasswordId = 'passwordInput'
}

import React, {useState} from 'react';
import {Button, Ring, TextBox} from "@nexts-stack/desktop-uix";
import global from "../global";

/**
 * The login page.
 * @returns The login page.
 */
export default function Login() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
		}}>
			<div style={{
				maxWidth: '400px',
				width: '100%',
				...(loading ? {
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				} : {}),
			}}>
				{!loading ? <>
					<h1 style={{
						width: '100%',
						textAlign: 'center',
					}}>Login</h1>

					{error.length > 0 && <div style={{
						background: 'var(--error2)',
						color: 'var(--text2)',
						borderRadius: '3px',
						padding: '5px 10px',
					}}>
						{error}
					</div>}

					<p>Username or Email Address</p>
					<TextBox onChange={() => setError('')} placeholder={'Username or Email Address'} />

					<br />

					<p>Password</p>
					<TextBox placeholder={'Password'} onChange={() => setError('')} type={'password'} />

					<br />

					<div style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
						gap: '10px',
					}}>
						<Button onClick={() => global.router?.navigate('/')} mode={'text'}>Back</Button>
						<Button onClick={() => {
							setLoading(true);

							setTimeout(() => {
								setError('Invalid username or password.');
								setLoading(false);
							}, 2000);
						}}>Login</Button>
					</div>
				</> : <Ring size={30} />}
			</div>
		</div>
	)
}

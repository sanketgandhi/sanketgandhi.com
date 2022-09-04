import React from 'react';
import { Link } from 'gatsby';
import useSound from 'use-sound';
import switchOn from '../../static/sounds/switch-on.mp3';
import switchOff from '../../static/sounds/switch-off.mp3';

import floppy from '../../static/logos/logo-48.png';

export default function Nav() {
	const [playOn] = useSound(switchOn, {
		volume: 1,
	});
	const [playOff] = useSound(switchOff, {
		volume: 1,
	});

	return (
		<nav className="navbar">
			<div className="container">
				<div className="flex">
					<div>
						<Link to="/" className="brand">
							<span className="emoji">
								<img src={floppy} alt="Floppy Diskette" />
							</span>{' '}
							Sanket Gandhi
						</Link>
					</div>
					<div className="flex">
						<Link to="/posts">Posts</Link>
						<Link to="/snippets">Snippets</Link>
						<Link to="/tools">Tools</Link>
						<Link to="/me">About me</Link>
						<button
							id="dark-mode-button"
							onClick={(event) => {
								const theme = typeof window !== 'undefined' && localStorage.getItem('theme');

								if (theme === 'dark') {
									playOn();
									typeof window !== 'undefined' && localStorage.removeItem('theme');
									const link = document.querySelectorAll('#dark-mode');

									if (link) {
										link.forEach((el) => el.remove());
										event.target.textContent = '🌙';
									}
								} else {
									playOff();
									typeof window !== 'undefined' && localStorage.setItem('theme', 'dark');
									event.target.textContent = '☀️';
									const head = document.getElementsByTagName('head')[0];
									const link = document.createElement('link');
									link.rel = 'stylesheet';
									link.id = 'dark-mode';
									link.href = '../dark.css';

									head.appendChild(link);
								}
							}}
						>
							{typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? '☀️' : '🌙'}
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

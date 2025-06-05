import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	// Состояние формы (открыта/закрыта)
	const [isOpen, setIsOpen] = useState(false);
	// Обработчик клика на кнопку стрелки
	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	// Условное применение классов при открытии формы
	const formStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside className={formStyle}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

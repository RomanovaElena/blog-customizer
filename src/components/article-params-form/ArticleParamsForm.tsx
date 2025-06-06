import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState, useRef } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	setArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setArticleState } = props;

	// Состояние формы (открыта/закрыта)
	const [isOpen, setIsOpen] = useState(false);

	// Обработчик клика на кнопку стрелки
	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	// Состояние полей формы
	const [formState, setFormState] = useState(defaultArticleState);

	// Обработчик изменения полей формы
	const handleOptionChange = (option: keyof ArticleStateType | string) => {
		return (value: OptionType) => {
			setFormState((actualFormState) => ({
				...actualFormState,
				[option]: value,
			}));
		};
	};

	// Обработчик отправки формы
	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
		toggleIsOpen();
	};
	// Обработчик сброса настроек формы
	const handleFormReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	// Условное применение классов при открытии формы
	const formStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		rootRef: rootRef,
		onClose: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside className={formStyle} ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOptionChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name={''}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleOptionChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleOptionChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleOptionChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleOptionChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

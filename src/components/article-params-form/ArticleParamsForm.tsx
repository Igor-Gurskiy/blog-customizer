import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, useRef, SyntheticEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOverlayClickClose } from './hooks/useOverlayClickClose';

export const ArticleParamsForm = ({
	onParamsChange,
}: {
	onParamsChange: (params: Partial<ArticleStateType>) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => setIsOpen(!isOpen);

	const className = clsx(styles.container, { [styles.container_open]: isOpen });

	useOverlayClickClose({
		isOpen,
		sidebarRef,
		onChange: setIsOpen,
	});

	const [articleState, setState] = useState(defaultArticleState);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (option: OptionType) => {
			setState((prevState: ArticleStateType) => ({
				...prevState,
				[field]: option,
			}));
		};
	};
	const handleSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault();
		onParamsChange(articleState);
	};
	const handleReset = () => {
		setState(defaultArticleState);
		onParamsChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside className={className} ref={sidebarRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='span' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={'Выберите шрифт'}
						onChange={handleOnChange('fontFamilyOption')}
						title={'Шрифт'}
					/>
					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title='Размер'
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						placeholder={'Выберите цвет шрифта'}
						onChange={handleOnChange('fontColor')}
						title={'Размер шрифта'}
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						placeholder={'Выберите цвет фона'}
						onChange={handleOnChange('backgroundColor')}
						title={'Цвет фона'}
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						placeholder={'Выберите ширину контента'}
						onChange={handleOnChange('contentWidth')}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

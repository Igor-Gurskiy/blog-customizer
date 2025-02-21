import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, useEffect, useRef, SyntheticEvent } from 'react';
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

export const ArticleParamsForm = ({
	onParamsChange,
}: {
	onParamsChange: (params: Partial<ArticleStateType>) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => setIsOpen(!isOpen);

	const className = clsx(styles.container, { [styles.container_open]: isOpen });

	useEffect(() => {
		const handleClickOutside = (evt: globalThis.MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(evt.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const [isSelectedFont, setSelectedFont] = useState(fontFamilyOptions[0]);
	const handleFontChange = (option: OptionType) => {
		setSelectedFont(option);
	};

	const [isSelectedFontSize, setSelectedFontSize] = useState(
		fontSizeOptions[0]
	);
	const handleFontSizeChange = (option: OptionType) => {
		setSelectedFontSize(option);
	};

	const [isSelectedFontColor, setSelectedFontColor] = useState(fontColors[0]);
	const handleFontColorChange = (option: OptionType) => {
		setSelectedFontColor(option);
	};

	const [isSelectedBackgroundColor, setSelectedBackgroundColor] = useState(
		backgroundColors[0]
	);
	const handleBackgroundColorChange = (option: OptionType) => {
		setSelectedBackgroundColor(option);
	};

	const [isSelectedContentWidth, setSelectedContentWidth] = useState(
		contentWidthArr[0]
	);
	const handleContentWidthChange = (option: OptionType) => {
		setSelectedContentWidth(option);
	};

	const handleSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault();
		const option = {
			fontFamilyOption: isSelectedFont,
			fontSizeOption: isSelectedFontSize,
			fontColor: isSelectedFontColor,
			backgroundColor: isSelectedBackgroundColor,
			contentWidth: isSelectedContentWidth,
		};
		onParamsChange(option);
	};
	const handleReset = () => {
		setSelectedFont(fontFamilyOptions[0]);
		setSelectedFontSize(fontSizeOptions[0]);
		setSelectedFontColor(fontColors[0]);
		setSelectedBackgroundColor(backgroundColors[0]);
		setSelectedContentWidth(contentWidthArr[0]);
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
						selected={isSelectedFont}
						options={fontFamilyOptions}
						placeholder={'Выберите шрифт'}
						onChange={handleFontChange}
						title={'Шрифт'}
					/>
					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={isSelectedFontSize}
						onChange={handleFontSizeChange}
						title='Размер'
					/>
					<Select
						selected={isSelectedFontColor}
						options={fontColors}
						placeholder={'Выберите цвет шрифта'}
						onChange={handleFontColorChange}
						title={'Размер шрифта'}
					/>
					<Separator />
					<Select
						selected={isSelectedBackgroundColor}
						options={backgroundColors}
						placeholder={'Выберите цвет фона'}
						onChange={handleBackgroundColorChange}
						title={'Цвет фона'}
					/>
					<Select
						selected={isSelectedContentWidth}
						options={contentWidthArr}
						placeholder={'Выберите ширину контента'}
						onChange={handleContentWidthChange}
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

import { CSSProperties, useState } from 'react';

import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from './App.module.scss';

export const App = () => {
	const [articleOptions, setArticleOptions] = useState(defaultArticleState);
	const handleOptionChange = (option: Partial<ArticleStateType>) => {
		setArticleOptions((prevState) => ({ ...prevState, ...option }));
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleOptions.fontFamilyOption.value,
					'--font-size': articleOptions.fontSizeOption.value,
					'--font-color': articleOptions.fontColor.value,
					'--container-width': articleOptions.contentWidth.value,
					'--bg-color': articleOptions.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onParamsChange={handleOptionChange} />
			<Article />
		</main>
	);
};

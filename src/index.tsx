import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleOptions, setArticleOptions] = useState(defaultArticleState);
	const handleOptionChange = (option: Partial<ArticleStateType>) => {
		setArticleOptions((prevState) => ({ ...prevState, ...option }));
	};
	return (
		<main
			className={clsx(styles.main)}
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
